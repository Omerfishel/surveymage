import React from 'react';

const QuestionPreview = ({ question }) => {
  const renderQuestionInput = (question) => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="options-list">
            {question.options.map((option, index) => (
              <div key={index} className="option">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  id={`option-${question.id}-${index}`}
                />
                <label htmlFor={`option-${question.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      
      case 'checkbox_list':
        return (
          <div className="options-list">
            {question.options.map((option, index) => (
              <div key={index} className="option">
                <input
                  type="checkbox"
                  id={`option-${question.id}-${index}`}
                />
                <label htmlFor={`option-${question.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      
      case 'short_text':
        return (
          <input
            type="text"
            placeholder="Short answer text"
            className="text-input"
          />
        );
      
      case 'long_text':
        return (
          <textarea
            placeholder="Long answer text"
            className="text-input"
            rows={4}
          />
        );
      
      default:
        return null;
    }
  };

  return renderQuestionInput(question);
};

export default QuestionPreview; 