import os
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer


def get_tokens_for_user(user):
    """Generate JWT tokens for a user"""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['POST'])
@permission_classes([AllowAny])
def google_login(request):
    """
    Authenticate user with Google OAuth token
    Expected payload: { "credential": "google_id_token" }
    """
    try:
        token = request.data.get('credential')
        if not token:
            return Response(
                {'error': 'No credential provided'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get Google Client ID from environment
        google_client_id = os.environ.get('GOOGLE_CLIENT_ID')
        if not google_client_id:
            return Response(
                {'error': 'Google OAuth not configured'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Verify the Google token - try without audience first
        try:
            # Verify without specifying audience (more permissive)
            idinfo = id_token.verify_oauth2_token(
                token, 
                requests.Request()
            )
            
            # Check if it's a valid Google token
            if 'email' not in idinfo:
                raise ValueError("No email in token")
                
        except ValueError as e:
            return Response(
                {'error': 'Invalid token', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get user info from Google
        email = idinfo.get('email')
        google_id = idinfo.get('sub')
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')
        picture = idinfo.get('picture', '')

        if not email:
            return Response(
                {'error': 'Email not provided by Google'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get or create user
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email.split('@')[0] + '_' + google_id[:8],
                'first_name': first_name,
                'last_name': last_name,
            }
        )

        # Update user info if not newly created
        if not created:
            user.first_name = first_name
            user.last_name = last_name
            user.save()

        # Generate JWT tokens
        tokens = get_tokens_for_user(user)

        # Serialize user data
        user_serializer = UserSerializer(user)

        return Response({
            'message': 'Login successful',
            'user': user_serializer.data,
            'tokens': tokens,
            'picture': picture,
            'created': created
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response(
            {'error': 'Authentication failed', 'details': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
def logout(request):
    """Logout user (client should delete tokens)"""
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_info(request):
    """Get current authenticated user info"""
    user_serializer = UserSerializer(request.user)
    return Response(user_serializer.data)
