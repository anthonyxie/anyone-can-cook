import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getMessages, sendMessage, addMessage, addNewMessage } from "@/utils/request";
import { MessagePage } from 'twilio/lib/rest/api/v2010/account/message';
import { fontSize } from '@mui/system';

const ChatWindow = ({userId}) => {

    const { isLoading, isError, data: messages, error } = useQuery(['messages', userId], () => getMessages(userId));
    const [isListActive, setListActive] = useState(false);


    function getListMarkers(sentence) {
        const regex = /\[list\](.*?)\[\/list\]/g;
        const matches = [];
        let match;
        while ((match = regex.exec(sentence))) {
          matches.push(match[1]);
        }
        return matches;
      }
      function removeMarkers(sentence) {
        const regex = /\[(text|phone|list)\].*?\[\/(text|phone|list)\]/g;
        return sentence.replace(regex, "");
      }
      

    useEffect(() => {
        if (messages) {
            const m = messages[messages.length - 1];
            if (m) {
                if (m.role == "assistant") {
                    if (m.content != removeMarkers(m.content)) {
                        let weh = getListMarkers(m.content)
                        if (weh.length != 0) {
                            let s = weh[0];

                        }
                        
                    }     
                }
            }
        }
    }, [messages]);

    return (
        <div className={isListActive ? 'noList' : 'list'} style={{
            fontSize: '16px',
          }}>
            <p>penis</p>
        </div>
    );
}

export default ChatWindow;