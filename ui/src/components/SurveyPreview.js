import React from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import QuestionPreview from './QuestionPreview';

const getItemStyle = (isDragging, draggableStyle) => ({
  // Base styles
  userSelect: 'none',
  padding: '16px',
  marginBottom: '8px',
  borderRadius: '12px',
  background: isDragging ? 'white' : '#f8fafc',
  border: isDragging ? '2px solid #6366f1' : '1px solid #e2e8f0',
  
  // Fix width and positioning
  width: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  
  // Smooth animations and transitions
  transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  transformOrigin: '50% 50%',
  
  // Elevation and shadow during drag
  boxShadow: isDragging ? '0 8px 16px rgba(0,0,0,0.1)' : 'none',
  zIndex: isDragging ? 1 : 0,
  
  // Only take necessary transform properties from draggableStyle
  ...{
    transform: draggableStyle?.transform,
    transition: draggableStyle?.transition
  }
});

const getListStyle = isDraggingOver => ({
  // Container styles
  background: isDraggingOver ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
  padding: '16px',
  width: '100%',
  boxSizing: 'border-box',
  minHeight: '100px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  
  // Smooth transition for drag over state
  transition: 'background-color 0.2s ease'
});

const SurveyPreview = ({ questions, onDragEnd, onRemoveQuestion }) => {
  return (
    <div className="question-preview">
      <h2>Survey Preview</h2>
      {questions.length === 0 ? (
        <p className="no-questions">No questions added yet. Start designing your survey!</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="questions-list"
              >
                {questions.map((question, index) => (
                  <Draggable
                    key={question.id}
                    draggableId={question.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style || {}
                        )}
                        className="question-item"
                      >
                        <div className="question-header">
                          <div className="question-header-left">
                            <div
                              {...provided.dragHandleProps}
                              className="drag-handle"
                            >
                              ⋮⋮
                            </div>
                            <h3>Q{index + 1}. {question.text}</h3>
                          </div>
                          <button
                            onClick={() => onRemoveQuestion(question.id)}
                            className="remove-button"
                          >
                            ✕
                          </button>
                        </div>
                        <QuestionPreview question={question} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default SurveyPreview; 