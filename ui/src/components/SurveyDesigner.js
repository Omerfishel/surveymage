import React, { useState, useRef, useEffect } from 'react';
import QuestionDesigner from './QuestionDesigner';
import SurveyPreview from './SurveyPreview';

const SurveyDesigner = () => {
  const [questions, setQuestions] = useState([]);
  const previewRef = useRef(null);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
  };

  const handleRemoveQuestion = (questionId) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  };

  // Scroll to bottom when a new question is added
  useEffect(() => {
    if (previewRef.current && questions.length > 0) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight;
    }
  }, [questions.length]);

  return (
    <div className="survey-designer">
      <div className="survey-designer-container">
        <QuestionDesigner onAddQuestion={handleAddQuestion} />
        <div ref={previewRef}>
          <SurveyPreview
            questions={questions}
            onDragEnd={handleDragEnd}
            onRemoveQuestion={handleRemoveQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default SurveyDesigner; 