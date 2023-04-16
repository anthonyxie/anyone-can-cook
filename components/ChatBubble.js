import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getMessages, sendMessage, addMessage, addNewMessage } from "@/utils/request";

const ChatBubble = ({msg}) => {
  return (
    <div>
      {msg}
    </div>
  );
}

export default ChatBubble;