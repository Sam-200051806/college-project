import { useState, useEffect } from 'react';
import ModelInfo from './ModelInfo';

function AnalyticsPage({ predictions, modelInfo }) {
  const [selectedChart, setSelectedChart] = useState('distribution');

  if (!predictions || predictions.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
        <h3 style={{ marginBottom: '8px' }}>No Predictions Yet</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Go to "Predict Grade" to make your first prediction
        </p>
      </div>
    );
  }

  // Calculate statistics
  const grades = predictions.map(p => p.predicted_grade);
  const avgGrade = (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2);
  const maxGrade = Math.max(...grades).toFixed(1);
  const minGrade = Math.min(...grades).toFixed(1);
  
  // Grade distribution
  const gradeRanges = {
    'Excellent (16-20)': grades.filter(g => g >= 16).length,
    'Good (12-15)': grades.filter(g => g >= 12 && g < 16).length,
    'Average (10-11)': grades.filter(g => g >= 10 && g < 12).length,
    'Below Average (<10)': grades.filter(g => g < 10).length
  };

  const maxCount = Math.max(...Object.values(gradeRanges));

  // G1 vs G2 correlation data
  const g1Data = predictions.map(p => p.input_data?.G1 || 0);
  const g2Data = predictions.map(p => p.input_data?.G2 || 0);
  const g3Data = predictions.map(p => p.predicted_grade);

  // Trend over time
  const trendData = predictions.slice(0, 10).reverse().map((p, i) => ({
    index: i + 1,
    grade: p.predicted_grade,
    date: new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  const maxTrendGrade = Math.max(...trendData.map(d => d.grade));

  // Simple bar chart component
  const BarChart = ({ data, colors }) => (
    <div style={{ padding: '20px' }}>
      {Object.entries(data).map(([label, value], index) => (
        <div key={label} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.9rem' }}>{label}</span>
            <span style={{ fontWeight: '600', color: colors[index] }}>{value}</span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '32px', 
            background: 'rgba(15, 15, 26, 0.5)', 
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ 
              width: `${(value / maxCount) * 100}%`, 
              height: '100%', 
              background: colors[index],
              transition: 'width 0.5s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '12px',
              fontWeight: '600'
            }}>
              {value > 0 && value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Line chart component for trends
  const LineChart = ({ data }) => (
    <div style={{ padding: '20px', height: '300px', position: 'relative' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        height: '240px',
        borderLeft: '2px solid var(--border-color)',
        borderBottom: '2px solid var(--border-color)',
        paddingLeft: '20px',
        paddingBottom: '10px',
        gap: '12px'
      }}>
        {data.map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <div style={{
                width: '40px',
                height: `${(item.grade / maxTrendGrade) * 200}px`,
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                borderRadius: '8px 8px 0 0',
                transition: 'height 0.5s ease',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '8px'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'white' }}>
                  {item.grade.toFixed(1)}
                </span>
              </div>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Scatter plot for G1 vs G3 correlation
  const ScatterPlot = () => {
    const maxG1 = Math.max(...g1Data);
    const maxG3 = Math.max(...g3Data);
    
    return (
      <div style={{ padding: '20px', height: '300px', position: 'relative' }}>
        <div style={{
          position: 'relative',
          height: '100%',
          borderLeft: '2px solid var(--border-color)',
          borderBottom: '2px solid var(--border-color)',
          padding: '20px'
        }}>
          {/* Y-axis labels */}
          <div style={{ position: 'absolute', left: '-40px', top: '0', bottom: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <span>20</span>
            <span>15</span>
            <span>10</span>
            <span>5</span>
            <span>0</span>
          </div>
          
          {/* X-axis labels */}
          <div style={{ position: 'absolute', left: '0', right: '0', bottom: '-30px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', paddingLeft: '20px' }}>
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
          </div>

          {/* Scatter points */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {predictions.slice(0, 50).map((pred, index) => {
              const g1 = pred.input_data?.G1 || 0;
              const g3 = pred.predicted_grade;
              const x = (g1 / 20) * 100;
              const y = 100 - (g3 / 20) * 100;
              
              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translate(-50%, -50%) scale(1.5)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translate(-50%, -50%) scale(1)'}
                  title={`G1: ${g1}, G3: ${g3.toFixed(1)}`}
                />
              );
            })}
          </div>

          {/* Axis labels */}
          <div style={{ position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
            First Period Grade (G1)
          </div>
          <div style={{ position: 'absolute', left: '-80px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
            Predicted Final Grade (G3)
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {modelInfo && <ModelInfo info={modelInfo} />}

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div className="card">
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Total Predictions</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {predictions.length}
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Average Grade</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#a855f7' }}>
              {avgGrade}
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Highest Grade</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10b981' }}>
              {maxGrade}
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Lowest Grade</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#ef4444' }}>
              {minGrade}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span className="card-title-icon">📈</span>
            Analytics Charts
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setSelectedChart('distribution')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: selectedChart === 'distribution' ? '1px solid #a855f7' : '1px solid var(--border-color)',
                background: selectedChart === 'distribution' ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                color: selectedChart === 'distribution' ? '#a855f7' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}
            >
              Distribution
            </button>
            <button
              onClick={() => setSelectedChart('trend')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: selectedChart === 'trend' ? '1px solid #a855f7' : '1px solid var(--border-color)',
                background: selectedChart === 'trend' ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                color: selectedChart === 'trend' ? '#a855f7' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}
            >
              Trend
            </button>
            <button
              onClick={() => setSelectedChart('correlation')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: selectedChart === 'correlation' ? '1px solid #a855f7' : '1px solid var(--border-color)',
                background: selectedChart === 'correlation' ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                color: selectedChart === 'correlation' ? '#a855f7' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}
            >
              Correlation
            </button>
          </div>
        </div>

        {selectedChart === 'distribution' && (
          <div>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Grade Distribution</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Distribution of predicted grades across different performance categories
              </p>
            </div>
            <BarChart 
              data={gradeRanges} 
              colors={['#10b981', '#a855f7', '#f59e0b', '#ef4444']}
            />
          </div>
        )}

        {selectedChart === 'trend' && (
          <div>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Prediction Trend</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Recent prediction results over time (last 10 predictions)
              </p>
            </div>
            <LineChart data={trendData} />
          </div>
        )}

        {selectedChart === 'correlation' && (
          <div>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>G1 vs G3 Correlation</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Relationship between first period grades and predicted final grades
              </p>
            </div>
            <ScatterPlot />
          </div>
        )}
      </div>

      {/* Performance Insights */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span className="card-title-icon">💡</span>
            Insights
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ 
              padding: '16px', 
              background: 'rgba(168, 85, 247, 0.1)', 
              borderRadius: '12px',
              border: '1px solid rgba(168, 85, 247, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>🎯</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>Performance Trend</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {avgGrade >= 14 ? 'Excellent performance! Most predictions show strong academic results.' : 
                     avgGrade >= 12 ? 'Good performance with room for improvement in some areas.' :
                     'Focus on improving G1 and G2 grades for better final outcomes.'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              padding: '16px', 
              background: 'rgba(16, 185, 129, 0.1)', 
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>📊</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>Model Accuracy</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    R² Score of {modelInfo?.r2_score?.toFixed(3) || '0.724'} indicates the model explains {((modelInfo?.r2_score || 0.724) * 100).toFixed(1)}% of grade variance.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              padding: '16px', 
              background: 'rgba(245, 158, 11, 0.1)', 
              borderRadius: '12px',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>🔍</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>Key Finding</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Strong correlation between G1, G2, and final grades. Consistent early performance is crucial.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnalyticsPage;
