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
          borderRadius: '10px',
          padding: '7px 10px',
          fontSize: '16px',
          width: '100%',
          height: '40px',
          border: '2px solid grey',
        }}
      />
      <button
        onClick={handleSend}
        style={{
          borderRadius: '10px',
          padding: '7px 10px',
          fontSize: '16px',
          cursor:'pointer',
          backgroundColor: 'pink',
          border: '1px solid black',
        }}
      >
        ⬆
      </button>
    </div>
  );
};

export default TextInput;