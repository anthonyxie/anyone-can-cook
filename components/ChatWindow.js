import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getMessages, sendMessage, addMessage, addNewMessage } from "@/utils/request";
import { MessagePage } from 'twilio/lib/rest/api/v2010/account/message';

const ChatWindow = ({userId}) => {
  const { isLoading, isError, data: messages, error } = useQuery(['messages', userId], () => getMessages(userId));

  return (
    <div>
      {messages && messages.map((message, index) => {
        return (
            <div key={index}>
                <h1 style={{color: "black"}}>{message.role}</h1>
                <p style={{color: "black"}}>{message.content}</p>
            </div>
        )
      })}
    </div>
  );
}

export default ChatWindow;