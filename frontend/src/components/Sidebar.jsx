function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  const menuItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'predict', icon: '🎯', label: 'Predict Grade' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'history', icon: '📋', label: 'History' },
    { id: 'students', icon: '👥', label: 'Students' },
  ];

  const workstationItems = [
    { id: 'datasets', icon: '📁', label: 'Datasets' },
    { id: 'models', icon: '🤖', label: 'ML Models' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">🎓</div>
        <div className="logo-text">
          Student <span>AI</span>
        </div>
      </div>

      <nav className="nav-section">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-item-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      <div className="nav-section">
        <div className="nav-section-title">Workstation</div>
        {workstationItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-item-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      {onLogout && (
        <div className="sidebar-footer">
          <div className="nav-item logout-btn" onClick={onLogout}>
            <span className="nav-item-icon">🚪</span>
            Logout
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;

