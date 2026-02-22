function ModelInfo({ info }) {
  if (!info) return null;

  const stats = [
    {
      label: 'Model Type',
      value: 'Linear Reg.',
      change: 'Active'
    },
    {
      label: 'R² Score',
      value: info.metrics?.r2_score?.toFixed(3) || 'N/A',
      change: '↑ 12%'
    },
    {
      label: 'MSE',
      value: info.metrics?.mean_squared_error?.toFixed(2) || 'N/A',
      change: '↓ 5%'
    },
    {
      label: 'Training Samples',
      value: info.dataset?.train_samples || 'N/A',
      change: 'Dataset'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-label">{stat.label}</div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-change">{stat.change}</div>
        </div>
      ))}
    </div>
  );
}

export default ModelInfo;

