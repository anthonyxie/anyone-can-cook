import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getMessages, getRecipes, createRecipe, sendTextMessage } from "@/utils/request";
import Splitter from './Splitter';

const ChatBubble = ({userId, sendDisabled, setSendDisabled}) => {

    const [msg, setMsg] = useState("...");
    const { isLoading, isError, data: messages, error } = useQuery(['messages', userId], () => getMessages(userId));
    const { isLoadingRecipe, isErrorRecipe, data: recipes, errorRecipe } = useQuery(['recipes', userId], () => getRecipes(userId));
    const [stepList, setStepList] = useState([]);
    useEffect(() => {
        console.log(stepList);
    }, [stepList])
    

    function addtoStepList(step) {
        console.log("adding", step);
        let sList = stepList;
        console.log("to", stepList);
        sList.push(step);
        console.log("for", sList);
        setStepList(sList);
    }
    function removeMarkers(sentence) {
        const regex = /\[(textmsg|phone|list|step|dish)\].*?\[\/(textmsg|phone|list|step|dish)\]/g;
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
    function getStepMarkers(sentence) {
        const regex = /\[step\](.*?)\[\/step\]/g;
        const matches = [];
        let match;
        while ((match = regex.exec(sentence))) {
          matches.push(match[1]);
        }
        return matches;
      }
      function getDishMarkers(sentence) {
        const regex = /\[dish\](.*?)\[\/dish\]/g;
        const matches = [];
        let match;
        while ((match = regex.exec(sentence))) {
          matches.push(match[1]);
        }
        return matches;
      }
    function removeStepTags(str) {
        return str.replace(/\[step\]|\[\/step\]/g, "");
      }

    const queryclient = useQueryClient();

    const mutation = useMutation(async ({userId, name, steps}) => {
        return createRecipe(userId, name, steps);
    }, {
        onSuccess : () => {
            queryclient.invalidateQueries('recipes')
        }
    })


    useEffect(() => {
        if (messages) {
            const m = messages[messages.length - 1];
            if (m) {
                if (m.role == "assistant") {
                    console.log(m.content);
                    if (m.content == removeMarkers(m.content)) {
                        setMsg(m.content);
                    }
                    else {
                        let weh = getPhoneMarkers(m.content);
                        let steps = getStepMarkers(m.content);
                        let dishes = getDishMarkers(m.content);
                        let content = m.content;
                        console.log(steps);

                        //no phone numbies
                        if (steps.length != 0) {
                            let step = getStepMarkers(content)[0];
                            content = removeStepTags(content);
                            addtoStepList(step);
                        }
                        if (dishes.length != 0) {
                            let dish = dishes[0];
                            //handle logic to push da dish
                            //and also push da steps and reset da step count
                            console.log("HERE ARE THE RECIPE PARAMS", userId, dish, stepList);
                            mutation.mutate({userId: userId, name: dish, steps: stepList});
                            setStepList([]);
                        }

                        if (weh.length == 0) {
                            setMsg(removeMarkers(content));
                        }
                        //has phone numby
                        else {
                            
                            let phone = "+1"+ weh[0];
                            
                            let text = getTextMarkers(content)[0];
                            console.log(phone, text);
                            let sending = sendTextMessage(text, phone);
                            setMsg(removeMarkers(content));
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
            
            <Splitter msg={msg} sendDisabled={sendDisabled} setSendDisabled={setSendDisabled} />

        </div>
    );
}

export default ChatBubble;