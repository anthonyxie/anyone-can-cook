import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getMessages, sendMessage, addMessage, addNewMessage } from "@/utils/request";

const ChatBubble = ({userId}) => {

    const [msg, setMsg] = useState("...");
    const { isLoading, isError, data: messages, error } = useQuery(['messages', userId], () => getMessages(userId));

    useEffect(() => {
        console.log(messages);
        if (messages) {
            const m = messages[messages.length - 1];
            if (m) {
                if (m.role == "assistant") {
                    setMsg(m.content);
                }
                else {
                    setMsg("...");
                }
            }
        }
    }, [messages]);

    useEffect(() => {
        console.log("UserId has changed in component");
    }, [userId])
    return (
        <div>
            {
                msg
            }
        </div>
    );
}

export default ChatBubble;