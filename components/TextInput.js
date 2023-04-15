import React, { useState } from 'react';

const TextInput = ({ placeholder, onSend }) => {
  const containerStyle = {
  display: 'flex',
  alignItems: 'flex-start',
	};
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    if (text.trim() === '') {
      console.log('no text entered');
    } else {
      if (onSend) {
        onSend(text);
      }
      setText('');
    }
  };

  return (
    <div style={containerStyle}>
      <textarea
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        style={{
          width: '100%',
          height: '40px',
          padding: '10px',
          boxSizing: 'border-box',
          fontSize: '16px',
          resize: 'none',
        }}
      />
      <button
        onClick={handleSend}
        style={{
          borderRadius: '5px',
          padding: '7px 10px',
          fontSize: '16px',
          cursor:'pointer',
        }}
      >
        ⬆
      </button>
    </div>
  );
};

export default TextInput;