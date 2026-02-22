import { useState } from 'react';

function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    autoSave: true,
    apiEndpoint: 'http://localhost:8000/api',
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title">
            <span className="card-title-icon">🎨</span>
            Appearance
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>Dark Mode</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Use dark theme for the interface</div>
          </div>
          <button 
            onClick={() => handleToggle('darkMode')}
            style={{
              width: '50px', height: '28px', borderRadius: '14px', border: 'none',
              background: settings.darkMode ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer', position: 'relative', transition: 'all 0.2s'
            }}
          >
            <span style={{
              position: 'absolute', top: '4px',
              left: settings.darkMode ? '26px' : '4px',
              width: '20px', height: '20px', borderRadius: '50%',
              background: 'white', transition: 'all 0.2s'
            }} />
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title">
            <span className="card-title-icon">🔔</span>
            Notifications
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>Enable Notifications</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Get notified about predictions and updates</div>
          </div>
          <button 
            onClick={() => handleToggle('notifications')}
            style={{
              width: '50px', height: '28px', borderRadius: '14px', border: 'none',
              background: settings.notifications ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer', position: 'relative', transition: 'all 0.2s'
            }}
          >
            <span style={{
              position: 'absolute', top: '4px',
              left: settings.notifications ? '26px' : '4px',
              width: '20px', height: '20px', borderRadius: '50%',
              background: 'white', transition: 'all 0.2s'
            }} />
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>Auto-save Predictions</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Automatically save all predictions to history</div>
          </div>
          <button 
            onClick={() => handleToggle('autoSave')}
            style={{
              width: '50px', height: '28px', borderRadius: '14px', border: 'none',
              background: settings.autoSave ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer', position: 'relative', transition: 'all 0.2s'
            }}
          >
            <span style={{
              position: 'absolute', top: '4px',
              left: settings.autoSave ? '26px' : '4px',
              width: '20px', height: '20px', borderRadius: '50%',
              background: 'white', transition: 'all 0.2s'
            }} />
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span className="card-title-icon">⚙️</span>
            API Configuration
          </div>
        </div>
        
        <div className="form-group">
          <label>Backend API Endpoint</label>
          <input 
            type="text" 
            value={settings.apiEndpoint}
            onChange={(e) => setSettings(prev => ({ ...prev, apiEndpoint: e.target.value }))}
          />
        </div>

        <div style={{ marginTop: '16px' }}>
          <button className="btn">Save Settings</button>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;

