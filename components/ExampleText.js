import React, { useEffect, useState } from 'react';
import {Slider, Button, Box, FormControl, InputLabel, MenuItem, Select, FormGroup, FormControlLabel, Checkbox, TextField} from '@mui/material';
import ENV from '../config.env';
import { sendTextMessage } from '../utils/request.js';
function ExampleText() {
    const [text, setText] = useState("");
    var productTypes2 = ['HOUSEHOLD APPLIANCES', 'HOUSEHOLD FIXTURES', 'HOME EQUIPMENT', 'SPORTS AND RECREATION', 'TOYS', 'ASSORTED EQUIPMENT', 'PERSONAL CARE ITEMS', 'OTHER'];


    async function handleClick (event) {
        if (text) {
            let res = await sendTextMessage(text, '+12678381469');
            console.log(res);
        }
    }


    return (  
    <div>   
        <TextField
            id="outlined-multiline-static"
            label="Text-to-Speech"
            value={text}
            multiline
            rows={4}
            onChange={(event) => {
            setText(event.target.value);
        }}/>
        <Button  variant="contained" color="success" onClick={handleClick}>
          Upload
        </Button>
    </div>      


    );

}

export default ExampleText;