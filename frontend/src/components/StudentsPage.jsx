import { useState } from 'react';

function StudentsPage() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students] = useState([
    { id: 1, name: 'Alex Johnson', age: 17, grade: 'A', school: 'GP', status: 'Active', email: 'alex.j@school.com', phone: '123-456-7890' },
    { id: 2, name: 'Maria Silva', age: 16, grade: 'B+', school: 'MS', status: 'Active', email: 'maria.s@school.com', phone: '123-456-7891' },
    { id: 3, name: 'James Chen', age: 18, grade: 'A-', school: 'GP', status: 'Active', email: 'james.c@school.com', phone: '123-456-7892' },
    { id: 4, name: 'Emma Wilson', age: 17, grade: 'B', school: 'MS', status: 'Inactive', email: 'emma.w@school.com', phone: '123-456-7893' },
    { id: 5, name: 'Lucas Brown', age: 16, grade: 'A', school: 'GP', status: 'Active', email: 'lucas.b@school.com', phone: '123-456-7894' },
  ]);

  const sampleStudents = students;

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  return (
    <>
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-label">Total Students</div>
          <div className="stat-value">395</div>
          <div className="stat-change">From dataset</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">GP School</div>
          <div className="stat-value">349</div>
          <div className="stat-change">Gabriel Pereira</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">MS School</div>
          <div className="stat-value">46</div>
          <div className="stat-change">Mousinho da Silveira</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg. Grade</div>
          <div className="stat-value">10.4</div>
          <div className="stat-change">Out of 20</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span className="card-title-icon">👥</span>
            Student Directory
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Student</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Age</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)' }}>School</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Grade</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleStudents.map((student) => (
                <tr key={student.id} style={{ 
                  borderBottom: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(168, 85, 247, 0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                onClick={() => handleViewStudent(student)}>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '36px', height: '36px', borderRadius: '50%', 
                      background: 'var(--accent-gradient)', display: 'flex', 
                      alignItems: 'center', justifyContent: 'center', fontWeight: '600' 
                    }}>
                      {student.name.charAt(0)}
                    </div>
                    {student.name}
                  </td>
                  <td style={{ padding: '12px' }}>{student.age}</td>
                  <td style={{ padding: '12px' }}>{student.school}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      background: 'var(--accent-gradient)', padding: '4px 12px', 
                      borderRadius: '20px', fontWeight: '600' 
                    }}>
                      {student.grade}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      color: student.status === 'Active' ? '#10b981' : '#ef4444'
                    }}>
                      {student.status === 'Active' ? '● Active' : '○ Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Student Modal */}
      {showViewModal && selectedStudent && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => setShowViewModal(false)}>
          <div className="card" style={{ 
            maxWidth: '600px', width: '90%', margin: '20px',
            animation: 'slideIn 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <div className="card-title">
                <span className="card-title-icon">👤</span>
                Student Details
              </div>
              <button onClick={() => setShowViewModal(false)} style={{
                background: 'transparent', border: 'none', fontSize: '1.5rem',
                color: 'var(--text-secondary)', cursor: 'pointer'
              }}>×</button>
            </div>
            
            <div style={{ padding: '20px 0' }}>
              <div style={{ 
                textAlign: 'center', marginBottom: '24px',
                padding: '24px', background: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.3)'
              }}>
                <div style={{ 
                  width: '80px', height: '80px', borderRadius: '50%', 
                  background: 'var(--accent-gradient)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', fontWeight: '600',
                  fontSize: '2rem', margin: '0 auto 16px'
                }}>
                  {selectedStudent.name.charAt(0)}
                </div>
                <h2 style={{ marginBottom: '8px' }}>{selectedStudent.name}</h2>
                <span style={{ 
                  color: selectedStudent.status === 'Active' ? '#10b981' : '#ef4444'
                }}>
                  {selectedStudent.status === 'Active' ? '● Active' : '○ Inactive'}
                </span>
              </div>

              <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                <div style={{ 
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'
                }}>
                  <div style={{ 
                    background: 'rgba(15, 15, 26, 0.5)', padding: '16px',
                    borderRadius: '12px', border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Age</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{selectedStudent.age}</div>
                  </div>
                  <div style={{ 
                    background: 'rgba(15, 15, 26, 0.5)', padding: '16px',
                    borderRadius: '12px', border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>School</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{selectedStudent.school}</div>
                  </div>
                </div>

                <div style={{ 
                  background: 'rgba(15, 15, 26, 0.5)', padding: '16px',
                  borderRadius: '12px', border: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Current Grade</div>
                  <span style={{ 
                    background: 'var(--accent-gradient)', padding: '8px 20px', 
                    borderRadius: '20px', fontWeight: '600', fontSize: '1.2rem'
                  }}>
                    {selectedStudent.grade}
                  </span>
                </div>

                <div style={{ 
                  background: 'rgba(15, 15, 26, 0.5)', padding: '16px',
                  borderRadius: '12px', border: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>📧 Email</div>
                  <div>{selectedStudent.email}</div>
                </div>

                <div style={{ 
                  background: 'rgba(15, 15, 26, 0.5)', padding: '16px',
                  borderRadius: '12px', border: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>📞 Phone</div>
                  <div>{selectedStudent.phone}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setShowViewModal(false)} className="btn" style={{ flex: 1 }}>
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

export default StudentsPage;

