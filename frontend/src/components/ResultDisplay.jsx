function ResultDisplay({ prediction }) {
  if (!prediction) return null;

  const grade = prediction.predicted_grade;
  const percentage = ((grade / 20) * 100).toFixed(1);

  const getGradeClass = (grade) => {
    if (grade >= 16) return 'excellent';
    if (grade >= 12) return 'good';
    if (grade >= 10) return 'average';
    return 'poor';
  };

  const getGradeLabel = (grade) => {
    if (grade >= 16) return '🏆 Excellent Performance';
    if (grade >= 12) return '✨ Good Performance';
    if (grade >= 10) return '📈 Average Performance';
    return '📚 Needs Improvement';
  };

  const getGradeEmoji = (grade) => {
    if (grade >= 16) return '🎉';
    if (grade >= 12) return '👍';
    if (grade >= 10) return '📊';
    return '💪';
  };

  return (
    <div className={`card result-card ${getGradeClass(grade)}`}>
      <div className="result-title">
        {getGradeEmoji(grade)} Predicted Final Grade (G3)
      </div>
      <div className="grade-display">{grade.toFixed(1)}</div>
      <div className="grade-label">out of 20 ({percentage}%)</div>
      <div className="grade-status">
        {getGradeLabel(grade)}
      </div>
    </div>
  );
}

export default ResultDisplay;

