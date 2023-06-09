import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getMessages, sendMessage, addMessage, addNewMessage } from "@/utils/request";

const TextInput = ({ placeholder, userId, sendDisabled, setSendDisabled}) => {


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
    setSendDisabled(true);
    setText("");
    let add = mutation.mutate({userId: userId, message: message});
    let wow = await delay(1500);
    let res = await sendMessage(userId);
    
    let add2 = mutation.mutate({userId: userId, message: res.data});
    setSendDisabled(false);

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
          width: '93%',
          height: '40px',
          border: '2px solid grey',
          marginRight: '10px',
        }}
      />
      <div style={{width: '5%', height: '40px', display:'flex'}}>
      <button
        className={sendDisabled ? 'disabled' : 'button'}
        onClick={handleSend}
      >
        Send
      </button>
      </div>
    </div>
  );
};

export default TextInput;