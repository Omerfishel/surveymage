import React, { useState } from 'react';

const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  CHECKBOX_LIST: 'checkbox_list',
  SHORT_TEXT: 'short_text',
  LONG_TEXT: 'long_text'
};

const QuestionTypeIcons = {
  [QUESTION_TYPES.MULTIPLE_CHOICE]: '⭕',
  [QUESTION_TYPES.CHECKBOX_LIST]: '☑️',
  [QUESTION_TYPES.SHORT_TEXT]: '📝',
  [QUESTION_TYPES.LONG_TEXT]: '📄'
};

const QuestionDesigner = ({ onAddQuestion }) => {
  const [questionType, setQuestionType] = useState(QUESTION_TYPES.MULTIPLE_CHOICE);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['']);

  const needsOptions = [QUESTION_TYPES.MULTIPLE_CHOICE, QUESTION_TYPES.CHECKBOX_LIST].includes(questionType);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const questionData = {
      type: questionType,
      text: questionText,
      options: needsOptions ? options.filter(opt => opt.trim()) : []
    };

    onAddQuestion(questionData);
    setQuestionText('');
    setOptions(['']);
  };

  return (
    <div className="question-designer">
      <h2>
        {QuestionTypeIcons[questionType]} Design Your Question
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question Type</label>
          <select 
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value={QUESTION_TYPES.MULTIPLE_CHOICE}>
              {QuestionTypeIcons[QUESTION_TYPES.MULTIPLE_CHOICE]} Multiple Choice
            </option>
            <option value={QUESTION_TYPES.CHECKBOX_LIST}>
              {QuestionTypeIcons[QUESTION_TYPES.CHECKBOX_LIST]} Checkbox List
            </option>
            <option value={QUESTION_TYPES.SHORT_TEXT}>
              {QuestionTypeIcons[QUESTION_TYPES.SHORT_TEXT]} Short Text
            </option>
            <option value={QUESTION_TYPES.LONG_TEXT}>
              {QuestionTypeIcons[QUESTION_TYPES.LONG_TEXT]} Long Text
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Question Text</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter your question here..."
            required
          />
        </div>

        {needsOptions && (
          <div className="options-container">
            <label>Answer Options</label>
            {options.map((option, index) => (
              <div key={index} className="option-row">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                <button 
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  disabled={options.length === 1}
                  className="remove-button"
                  title="Remove option"
                >
                  ✕
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={handleAddOption}
              className="secondary-button"
            >
              + Add Option
            </button>
          </div>
        )}

        <button 
          type="submit" 
          disabled={!questionText.trim() || (needsOptions && !options.some(opt => opt.trim()))}
          className="primary-button"
        >
          ✓ Add Question to Survey
        </button>
      </form>
    </div>
  );
};

export default QuestionDesigner; 