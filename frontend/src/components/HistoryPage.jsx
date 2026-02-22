function HistoryPage({ predictions }) {
  const getGradeClass = (grade) => {
    if (grade >= 16) return '#10b981';
    if (grade >= 12) return '#a855f7';
    if (grade >= 10) return '#f59e0b';
    return '#ef4444';
  };

  if (!predictions || predictions.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
        <h3 style={{ marginBottom: '8px' }}>No Prediction History</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Your prediction history will appear here after making predictions
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <span className="card-title-icon">📋</span>
          Recent Predictions
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {predictions.length} total predictions
        </div>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: '500' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: '500' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: '500' }}>G1</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: '500' }}>G2</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: '500' }}>Predicted G3</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: '500' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((pred, index) => (
              <tr key={pred.id || index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>#{pred.id || index + 1}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                  {new Date(pred.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px' }}>{pred.input_data?.G1 || '-'}</td>
                <td style={{ padding: '12px' }}>{pred.input_data?.G2 || '-'}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    background: getGradeClass(pred.predicted_grade),
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontWeight: '600'
                  }}>
                    {pred.predicted_grade?.toFixed(1)}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ color: '#10b981' }}>✓ Completed</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryPage;

