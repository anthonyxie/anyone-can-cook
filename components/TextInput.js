import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getMessages, sendMessage, addMessage, addNewMessage } from "@/utils/request";

const TextInput = ({ placeholder, userId }) => {


  const containerStyle = {
  display: 'flex',
  alignItems: 'flex-start',
	};
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const { isLoading, isError, data: messages, error } = useQuery(['messages', userId], () => getMessages(userId));
  const queryclient = useQueryClient();

  const mutation = useMutation(async ({userId, message}) => {
      return addNewMessage(userId, message);
  }, {
      onSuccess : () => {
          queryclient.invalidateQueries('messages')
      }
  })

  async function handleSend(event) {
    const delay = (delayInms) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    let message = {role: "user", content: text};
    /**
    let add = await addNewMessage(userId, message);
    let res = await sendMessage(text);
    setText("");
    let add2 = await addNewMessage(userId, res.data);
    */
    let add = mutation.mutate({userId: userId, message: message});
    let wow = await delay(1500);
    let res = await sendMessage(userId);
    setText("");
    let add2 = mutation.mutate({userId: userId, message: res.data});
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