import { useState } from 'react';

function ModelsPage({ modelInfo }) {
  const [showTrainModal, setShowTrainModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [activeModelId, setActiveModelId] = useState(1);
  const [isTraining, setIsTraining] = useState(false);

  const models = [
    { 
      id: 1, 
      name: 'Linear Regression', 
      type: 'Regression',
      status: 'Active',
      r2: modelInfo?.metrics?.r2_score || 0.724,
      mse: modelInfo?.metrics?.mean_squared_error || 5.66,
      trained: '2024-01-15',
      description: 'Simple and interpretable model for linear relationships'
    },
    { 
      id: 2, 
      name: 'Random Forest', 
      type: 'Regression',
      status: 'Available',
      r2: 0.88,
      mse: 0.95,
      trained: 'Not trained',
      description: 'Ensemble method using multiple decision trees'
    },
    { 
      id: 3, 
      name: 'Neural Network', 
      type: 'Deep Learning',
      status: 'Available',
      r2: 0.91,
      mse: 0.78,
      trained: 'Not trained',
      description: 'Deep learning model for complex patterns'
    },
  ];

  const handleActivateModel = (model) => {
    setSelectedModel(model);
    setShowActivateModal(true);
  };

  const confirmActivate = () => {
    setActiveModelId(selectedModel.id);
    setShowActivateModal(false);
    // In a real app, you would send this to the backend
  };

  const handleTrainModel = () => {
    setShowTrainModal(true);
  };

  const startTraining = (modelName) => {
    setIsTraining(true);
    // Simulate training process
    setTimeout(() => {
      setIsTraining(false);
      setShowTrainModal(false);
      alert(`${modelName} training completed!`);
    }, 3000);
  };

  return (
    <>
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-label">Active Model</div>
          <div className="stat-value">Linear</div>
          <div className="stat-change">Regression</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">R² Score</div>
          <div className="stat-value">{modelInfo?.metrics?.r2_score?.toFixed(3) || 'N/A'}</div>
          <div className="stat-change">↑ Good fit</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">MSE</div>
          <div className="stat-value">{modelInfo?.metrics?.mean_squared_error?.toFixed(2) || 'N/A'}</div>
          <div className="stat-change">Error metric</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Training Data</div>
          <div className="stat-value">{modelInfo?.dataset?.train_samples || 'N/A'}</div>
          <div className="stat-change">Samples</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span className="card-title-icon">🤖</span>
            Available Models
          </div>
          <button className="btn" onClick={handleTrainModel} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            + Train New Model
          </button>
        </div>
        
        {models.map((model) => (
          <div key={model.id} style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '20px', borderRadius: '12px', marginBottom: '12px',
            background: model.id === activeModelId
              ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
              : 'rgba(15, 15, 26, 0.5)',
            border: model.id === activeModelId
              ? '1px solid rgba(168, 85, 247, 0.3)'
              : '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '12px',
                background: model.id === activeModelId ? 'var(--accent-gradient)' : 'rgba(168, 85, 247, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
              }}>
                🤖
              </div>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{model.name}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {model.type} • R²: {model.r2.toFixed(2)} • MSE: {model.mse.toFixed(2)}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                color: model.id === activeModelId ? '#10b981' : 'var(--text-secondary)',
                fontSize: '0.85rem'
              }}>
                {model.id === activeModelId ? '● Active' : '○ Available'}
              </span>
              <button onClick={() => model.id !== activeModelId && handleActivateModel(model)} style={{
                background: model.id === activeModelId ? 'var(--accent-gradient)' : 'transparent',
                border: model.id === activeModelId ? 'none' : '1px solid var(--border-color)',
                padding: '8px 16px', borderRadius: '8px', color: 'var(--text-primary)',
                cursor: model.id === activeModelId ? 'default' : 'pointer',
                fontWeight: model.id === activeModelId ? '600' : '400',
                opacity: model.id === activeModelId ? 1 : 1
              }}>
                {model.id === activeModelId ? 'Using' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Train New Model Modal */}
      {showTrainModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => !isTraining && setShowTrainModal(false)}>
          <div className="card" style={{ 
            maxWidth: '600px', width: '90%', margin: '20px',
            animation: 'slideIn 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <div className="card-title">
                <span className="card-title-icon">🎓</span>
                Train New Model
              </div>
              {!isTraining && (
                <button onClick={() => setShowTrainModal(false)} style={{
                  background: 'transparent', border: 'none', fontSize: '1.5rem',
                  color: 'var(--text-secondary)', cursor: 'pointer'
                }}>×</button>
              )}
            </div>
            
            {!isTraining ? (
              <div style={{ padding: '20px 0' }}>
                <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
                  Select a model architecture to train on your dataset
                </p>
                
                {models.map((model) => (
                  <div key={model.id} style={{
                    padding: '16px', borderRadius: '12px', marginBottom: '12px',
                    background: 'rgba(15, 15, 26, 0.5)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  onClick={() => startTraining(model.name)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                          {model.name}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          {model.description}
                        </div>
                      </div>
                      <div style={{ fontSize: '1.5rem' }}>🚀</div>
                    </div>
                  </div>
                ))}
                
                <button onClick={() => setShowTrainModal(false)} style={{
                  width: '100%', marginTop: '16px',
                  background: 'transparent', border: '1px solid var(--border-color)',
                  padding: '12px', borderRadius: '8px', color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}>
                  Cancel
                </button>
              </div>
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔄</div>
                <h3 style={{ marginBottom: '8px' }}>Training in Progress...</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Please wait while we train your model
                </p>
                <div style={{
                  width: '100%', height: '4px', background: 'rgba(168, 85, 247, 0.2)',
                  borderRadius: '2px', overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%', background: 'var(--accent-gradient)',
                    animation: 'progress 2s ease-in-out infinite',
                    width: '50%'
                  }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Activate Model Modal */}
      {showActivateModal && selectedModel && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => setShowActivateModal(false)}>
          <div className="card" style={{ 
            maxWidth: '500px', width: '90%', margin: '20px',
            animation: 'slideIn 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <div className="card-title">
                <span className="card-title-icon">⚡</span>
                Activate Model
              </div>
              <button onClick={() => setShowActivateModal(false)} style={{
                background: 'transparent', border: 'none', fontSize: '1.5rem',
                color: 'var(--text-secondary)', cursor: 'pointer'
              }}>×</button>
            </div>
            
            <div style={{ padding: '20px 0' }}>
              <div style={{
                background: 'rgba(168, 85, 247, 0.1)', padding: '20px',
                borderRadius: '12px', marginBottom: '24px',
                border: '1px solid rgba(168, 85, 247, 0.3)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🤖</div>
                <h3 style={{ marginBottom: '8px' }}>{selectedModel.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
                  {selectedModel.description}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ 
                    background: 'rgba(15, 15, 26, 0.5)', padding: '12px',
                    borderRadius: '8px', border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>R² Score</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{selectedModel.r2.toFixed(3)}</div>
                  </div>
                  <div style={{ 
                    background: 'rgba(15, 15, 26, 0.5)', padding: '12px',
                    borderRadius: '8px', border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>MSE</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{selectedModel.mse.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <p style={{ marginBottom: '24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                ⚠️ Activating this model will replace the current active model. All future predictions will use this model.
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn" onClick={confirmActivate} style={{ flex: 1 }}>
                  ✓ Activate
                </button>
                <button onClick={() => setShowActivateModal(false)} style={{
                  flex: 1, background: 'transparent', border: '1px solid var(--border-color)',
                  padding: '12px', borderRadius: '8px', color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModelsPage;

