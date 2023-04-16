import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getMessages, sendMessage, addMessage, addNewMessage } from "@/utils/request";
import {ToggleButtonGroup, ToggleButton, Slider, Button, Box, FormControl, InputLabel, MenuItem, Select, FormGroup, FormControlLabel, Checkbox, TextField} from '@mui/material';
function ShowMessages({ userId }) {
    const [text, setText] = useState("");
    const { isLoading, isError, data: messages, error } = useQuery(['messages', userId], () => getMessages(userId));

    const queryclient = useQueryClient();

    const mutation = useMutation(({userId, message}) => {
        return addNewMessage(userId, message);
    }, {
        onSuccess : () => {
            queryclient.invalidateQueries('messages')
        }
    })

    async function handleClick(event) {
        let message = {role: "user", content: text};
        /**
        let add = await addNewMessage(userId, message);
        let res = await sendMessage(text);
        setText("");
        let add2 = await addNewMessage(userId, res.data);
        */
        let add = mutation.mutate({userId: userId, message});
        let res = await sendMessage(text);
        setText("");
        let add2 = mutation.mutate({userId: userId, message: res.data});
    }

    return (
        <div>
        <TextField
        id="outlined-multiline-static"
        label={"What would you like me to write?"}
        value={text}
        multiline
        rows={4}
        onChange={(event) => {
        setText(event.target.value);
        }}
        />
        <Button  variant="contained" color="success" onClick={handleClick}>
            Generate Text!
        </Button>
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

export default ShowMessages;