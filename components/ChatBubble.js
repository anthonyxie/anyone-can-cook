import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getMessages, sendMessage, addMessage, addNewMessage, sendTextMessage } from "@/utils/request";

const ChatBubble = ({userId}) => {

    const [msg, setMsg] = useState("...");
    const { isLoading, isError, data: messages, error } = useQuery(['messages', userId], () => getMessages(userId));

    function removeMarkers(sentence) {
        const regex = /\[(textmsg|phone)\].*?\[\/(textmsg|phone)\]/g;
        return sentence.replace(regex, "");
      }

    function getTextMarkers(sentence) {
        const regex = /\[textmsg\](.*?)\[\/textmsg\]/g;
        const matches = [];
        let match;
        while ((match = regex.exec(sentence))) {
          matches.push(match[1]);
        }
        return matches;
    }
    function getPhoneMarkers(sentence) {
        const regex = /\[phone\](.*?)\[\/phone\]/g;
        const matches = [];
        let match;
        while ((match = regex.exec(sentence))) {
          matches.push(match[1]);
        }
        return matches;
      }


    useEffect(() => {
        if (messages) {
            const m = messages[messages.length - 1];
            if (m) {
                if (m.role == "assistant") {
                    if (m.content == removeMarkers(m.content)) {
                        setMsg(m.content);
                    }
                    else {
                        let weh = getPhoneMarkers(m.content);
                        if (weh == "") {
                            setMsg(removeMarkers(m.content));
                        }
                        else {
                            let phone = "+1"+ getPhoneMarkers(m.content);
                            let text = getTextMarkers(m.content);
                            let sending = sendTextMessage(text, phone);
                            setMsg(removeMarkers(m.content));
                        }
                    }
                    
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
        <div >
            <p style={{color: 'black', fontSize: '3'}}>            {
                msg
            }</p>

        </div>
    );
}

export default ChatBubble;