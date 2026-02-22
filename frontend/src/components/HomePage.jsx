function HomePage({ setActiveTab, modelInfo }) {
  const quickActions = [
    { id: 'predict', icon: '🎯', title: 'Predict Grade', desc: 'Make a new prediction' },
    { id: 'analytics', icon: '📊', title: 'View Analytics', desc: 'See model performance' },
    { id: 'history', icon: '📋', title: 'History', desc: 'View past predictions' },
    { id: 'models', icon: '🤖', title: 'ML Models', desc: 'Manage models' },
  ];

  return (
    <>
      <div className="card welcome-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
              Welcome to Student AI 👋
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>
              Predict student performance using machine learning. Our Linear Regression model 
              analyzes various factors to forecast final grades (G3) with high accuracy.
            </p>
            <button 
              className="btn" 
              style={{ marginTop: '20px' }}
              onClick={() => setActiveTab('predict')}
            >
              🚀 Get Started
            </button>
          </div>
          <div style={{ fontSize: '6rem', opacity: 0.8 }}>🎓</div>
        </div>
      </div>

      <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>Quick Actions</h3>
      <div className="stats-grid">
        {quickActions.map((action) => (
          <div 
            key={action.id} 
            className="stat-card" 
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveTab(action.id)}
          >
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{action.icon}</div>
            <div className="stat-label" style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
              {action.title}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              {action.desc}
            </div>
          </div>
        ))}
      </div>

      {modelInfo && (
        <>
          <h3 style={{ margin: '32px 0 16px', color: 'var(--text-secondary)' }}>Model Overview</h3>
          <div className="card">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {modelInfo.metrics?.r2_score?.toFixed(2) || 'N/A'}
                </div>
                <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>R² Score</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {modelInfo.dataset?.train_samples || 'N/A'}
                </div>
                <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Training Samples</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Linear
                </div>
                <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Model Type</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;

