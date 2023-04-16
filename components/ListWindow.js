import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import styles from '@/styles/Home.module.css';
import { getMessages, sendMessage, addMessage, addNewMessage } from "@/utils/request";
import { MessagePage } from 'twilio/lib/rest/api/v2010/account/message';
import { fontSize } from '@mui/system';

const ListWindow = ({userId}) => {
    function formatList(string) {
        // Replace each number and dot combination with a newline character
        const formattedString = string.replace(/\d+\./g, "\n");
      
        // Split the formatted string into an array using the newline character as a delimiter
        const items = formattedString.split("\n").map(item => item.trim());
      
        // Remove any empty items from the array
        const filteredItems = items.filter(item => item.length > 0);
      
        return filteredItems;
      }


    const { isLoading, isError, data: messages, error } = useQuery(['messages', userId], () => getMessages(userId));
    const TEST1A = false;
    const TEST2A = [];
    const TEST1B = true;
    const TEST2B = "1. 8 oz pasta (spaghetti or fettuccine) 2. 2 cups sliced mushrooms 3. 2 tbsp butter 4. 3 garlic cloves, minced 5. 1 cup heavy cream 6. 1/2 cup grated parmesan cheese 7. Salt and pepper, to taste";
    const [isListActive, setListActive] = useState(TEST1A);
    const [list, setList] = useState(TEST2A);


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
                            setListActive(true);
                            let s = weh[0];
                            setList(formatList(s));
                            
                        }
                        
                    }     
                }
            }
        }
    }, [messages]);

    return (
        <div className={!isListActive ? 'noList' : styles.list} style={{
            fontSize: '16px',
          }}>

            <div>
                <p style={{fontSize: '20px', color: 'black'}}>Ingredient List</p>
            </div>
            {list && list.map((item, index) => {
                let s = (index + 1) + ". " + item;
                return (
                    <div key={index}>
                        <p style={{fontSize: '16px', color: 'black'}}>{s}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default ListWindow;