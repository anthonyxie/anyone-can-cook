import ImageInput from "./ImageInput";
import React, { useEffect, useState } from 'react';
import {ToggleButtonGroup, ToggleButton, Slider, Button, Box, FormControl, InputLabel, MenuItem, Select, FormGroup, FormControlLabel, Checkbox, TextField} from '@mui/material';

function ImageOutput() {
    const [text, setText] = useState();
    const [output, setOutput] = useState();
    return (
        <div>
            <TextField
            id="outlined-multiline-static"
            label={"What photo do you want to make?"}
            value={text}
            multiline
            rows={4}
            onChange={(event) => {
            setText(event.target.value);
            }}
            />
        </div>
    );

}

export default ImageOutput;