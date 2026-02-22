import { useState } from 'react';

function DatasetsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  const datasets = [
    { 
      id: 1, 
      name: 'student-mat.csv', 
      records: 395, 
      features: 33, 
      size: '42 KB',
      status: 'Active',
      lastUpdated: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'student-por.csv', 
      records: 649, 
      features: 33, 
      size: '68 KB',
      status: 'Available',
      lastUpdated: '2024-01-10'
    },
  ];

  const features = [
    'school', 'sex', 'age', 'address', 'famsize', 'Pstatus', 'Medu', 'Fedu',
    'Mjob', 'Fjob', 'reason', 'guardian', 'traveltime', 'studytime', 'failures',
    'schoolsup', 'famsup', 'paid', 'activities', 'nursery', 'higher', 'internet',
    'romantic', 'famrel', 'freetime', 'goout', 'Dalc', 'Walc', 'health', 
    'absences', 'G1', 'G2', 'G3'
  ];

  const handleViewDataset = (dataset) => {
    setSelectedDataset(dataset);
    setShowViewModal(true);
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (uploadFile) {
      alert(`Uploading ${uploadFile.name}...`);
      // Add actual upload logic here
      setShowUploadModal(false);
      setUploadFile(null);
    }
  };

  const handleDownload = async (dataset) => {
    try {
      // Fetch the actual dataset file from the backend
      const response = await fetch(`http://localhost:8000/api/datasets/${dataset.name}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download dataset');
      }

      // Get the file as blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = dataset.name;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert(`✓ Downloaded ${dataset.name} successfully!\n\nThe file contains ${dataset.records} records with ${dataset.features} features.`);
    } catch (error) {
      console.error('Download error:', error);
      alert(`❌ Failed to download ${dataset.name}. Please ensure the backend server is running.`);
    }
  };

  const handleDelete = (dataset) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${dataset.name}"?\n\nThis action cannot be undone.`
    );
    
    if (confirmDelete) {
      alert(`Deleting ${dataset.name}...\n\nNote: This is a demo - actual deletion would require backend API integration.`);
      setShowViewModal(false);
      // In production, you would call an API endpoint here:
      // await fetch(`/api/datasets/${dataset.id}`, { method: 'DELETE' });
    }
  };

  return (
    <>
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-label">Total Datasets</div>
          <div className="stat-value">2</div>
          <div className="stat-change">Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Records</div>
          <div className="stat-value">1044</div>
          <div className="stat-change">Combined</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Features</div>
          <div className="stat-value">33</div>
          <div className="stat-change">Per dataset</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Storage</div>
          <div className="stat-value">110 KB</div>
          <div className="stat-change">Total size</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title">
            <span className="card-title-icon">📁</span>
            Available Datasets
          </div>
          <button className="btn" onClick={handleUploadClick} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            + Upload Dataset
          </button>
        </div>
        
        {datasets.map((dataset) => (
          <div key={dataset.id} style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px', borderRadius: '12px', marginBottom: '12px',
            background: 'rgba(15, 15, 26, 0.5)', border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '2rem' }}>📊</div>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{dataset.name}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {dataset.records} records • {dataset.features} features • {dataset.size}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                color: dataset.status === 'Active' ? '#10b981' : '#a855f7',
                fontSize: '0.85rem'
              }}>
                {dataset.status === 'Active' ? '● Active' : '○ Available'}
              </span>
              <button style={{
                background: 'transparent', border: '1px solid var(--border-color)',
                padding: '8px 16px', borderRadius: '8px', color: 'var(--text-primary)',
                cursor: 'pointer'
              }} onClick={() => handleViewDataset(dataset)}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span className="card-title-icon">📋</span>
            Dataset Features
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {features.map((feature) => (
            <span key={feature} style={{
              background: feature === 'G3' ? 'var(--accent-gradient)' : 'rgba(168, 85, 247, 0.1)',
              border: '1px solid var(--border-color)',
              padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem',
              color: feature === 'G3' ? 'white' : 'var(--text-primary)'
            }}>
              {feature}
            </span>
          ))}
        </div>
        <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '0.9rem' }}>
          <strong>Target Variable:</strong> G3 (Final Grade) - highlighted in gradient
        </p>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => setShowUploadModal(false)}>
          <div className="card" style={{ 
            maxWidth: '500px', width: '90%', margin: '20px',
            animation: 'slideIn 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <div className="card-title">
                <span className="card-title-icon">📤</span>
                Upload Dataset
              </div>
              <button onClick={() => setShowUploadModal(false)} style={{
                background: 'transparent', border: 'none', fontSize: '1.5rem',
                color: 'var(--text-secondary)', cursor: 'pointer'
              }}>×</button>
            </div>
            
            <div style={{ padding: '20px 0' }}>
              <div style={{
                border: '2px dashed var(--border-color)', borderRadius: '12px',
                padding: '40px', textAlign: 'center', marginBottom: '20px',
                background: 'rgba(168, 85, 247, 0.05)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📁</div>
                <p style={{ marginBottom: '12px' }}>Drop your CSV file here or</p>
                <label style={{
                  background: 'var(--accent-gradient)', color: 'white',
                  padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                  display: 'inline-block'
                }}>
                  Choose File
                  <input type="file" accept=".csv" onChange={handleFileChange}
                    style={{ display: 'none' }} />
                </label>
                {uploadFile && (
                  <p style={{ marginTop: '12px', color: 'var(--accent-primary)' }}>
                    ✓ {uploadFile.name}
                  </p>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn" onClick={handleUpload} disabled={!uploadFile}
                  style={{ flex: 1, opacity: uploadFile ? 1 : 0.5 }}>
                  Upload
                </button>
                <button onClick={() => setShowUploadModal(false)} style={{
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

      {/* View Dataset Modal */}
      {showViewModal && selectedDataset && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => setShowViewModal(false)}>
          <div className="card" style={{ 
            maxWidth: '700px', width: '90%', margin: '20px', maxHeight: '80vh',
            overflow: 'auto', animation: 'slideIn 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <div className="card-title">
                <span className="card-title-icon">📊</span>
                {selectedDataset.name}
              </div>
              <button onClick={() => setShowViewModal(false)} style={{
                background: 'transparent', border: 'none', fontSize: '1.5rem',
                color: 'var(--text-secondary)', cursor: 'pointer'
              }}>×</button>
            </div>
            
            <div style={{ padding: '20px 0' }}>
              <div className="stats-grid" style={{ marginBottom: '24px' }}>
                <div className="stat-card">
                  <div className="stat-label">Records</div>
                  <div className="stat-value">{selectedDataset.records}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Features</div>
                  <div className="stat-value">{selectedDataset.features}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Size</div>
                  <div className="stat-value">{selectedDataset.size}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Status</div>
                  <div className="stat-value" style={{ fontSize: '1.2rem' }}>
                    {selectedDataset.status === 'Active' ? '✓' : '○'}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '12px' }}>📋 Dataset Information</h4>
                <div style={{ 
                  background: 'rgba(15, 15, 26, 0.5)', padding: '16px',
                  borderRadius: '12px', border: '1px solid var(--border-color)'
                }}>
                  <p style={{ marginBottom: '8px' }}>
                    <strong>File:</strong> {selectedDataset.name}
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    <strong>Last Updated:</strong> {selectedDataset.lastUpdated}
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    <strong>Total Records:</strong> {selectedDataset.records}
                  </p>
                  <p>
                    <strong>Features:</strong> {selectedDataset.features} columns
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '12px' }}>📊 Sample Data Preview</h4>
                <div style={{ 
                  background: 'rgba(15, 15, 26, 0.5)', padding: '16px',
                  borderRadius: '12px', border: '1px solid var(--border-color)',
                  overflowX: 'auto'
                }}>
                  <table style={{ width: '100%', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>school</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>sex</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>age</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>G1</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>G2</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>G3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(168, 85, 247, 0.1)' }}>
                        <td style={{ padding: '8px' }}>GP</td>
                        <td style={{ padding: '8px' }}>F</td>
                        <td style={{ padding: '8px' }}>18</td>
                        <td style={{ padding: '8px' }}>5</td>
                        <td style={{ padding: '8px' }}>6</td>
                        <td style={{ padding: '8px' }}>6</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(168, 85, 247, 0.1)' }}>
                        <td style={{ padding: '8px' }}>GP</td>
                        <td style={{ padding: '8px' }}>F</td>
                        <td style={{ padding: '8px' }}>17</td>
                        <td style={{ padding: '8px' }}>5</td>
                        <td style={{ padding: '8px' }}>5</td>
                        <td style={{ padding: '8px' }}>6</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px' }}>GP</td>
                        <td style={{ padding: '8px' }}>F</td>
                        <td style={{ padding: '8px' }}>15</td>
                        <td style={{ padding: '8px' }}>7</td>
                        <td style={{ padding: '8px' }}>8</td>
                        <td style={{ padding: '8px' }}>10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn" onClick={() => handleDownload(selectedDataset)} style={{ flex: 1 }}>
                  📥 Download
                </button>
                <button onClick={() => handleDelete(selectedDataset)} style={{ 
                  flex: 1, background: 'rgba(255, 107, 107, 0.1)', 
                  border: '1px solid #ff6b6b', color: '#ff6b6b',
                  padding: '12px', borderRadius: '8px', cursor: 'pointer',
                  fontWeight: '500'
                }}>
                  🗑️ Delete
                </button>
                <button onClick={() => setShowViewModal(false)} style={{
                  flex: 1, background: 'transparent', border: '1px solid var(--border-color)',
                  padding: '12px', borderRadius: '8px', color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DatasetsPage;

