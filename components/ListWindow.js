import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getMessages, sendMessage, addMessage, addNewMessage } from "@/utils/request";
import { MessagePage } from 'twilio/lib/rest/api/v2010/account/message';

const ChatWindow = ({userId}) => {

    const { isLoading, isError, data: messages, error } = useQuery(['messages', userId], () => getMessages(userId));
    const [isListActive, setListActive] = useState(false);

    return (
        <div className={isListActive ? 'noList' : 'list'}>
            <p>penis</p>
        </div>
    );
}

export default ChatWindow;