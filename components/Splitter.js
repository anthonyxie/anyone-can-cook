import React, { useState } from 'react';
import ChatBubble from './ChatBubble';

const Splitter = ({msg}) => {
  const sentences = msg.split(".");
  const [index, setIndex] = useState(0);
  return (
	<div>
	  <ChatBubble msg={sentences[index]} />
	  <button> onClick={() => setIndex(index + 1)} </button>
	</div>
  );
}