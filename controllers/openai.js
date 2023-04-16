import { Configuration, OpenAIApi } from 'openai';
import User from '../models/user.model'
import Message from '../models/message.model';
import ENV from '../config.env';
import mongoose from 'mongoose';

export async function createMessage(req, res) {
    const { userId } = req.body;

    /** CONFIG OPEN AI API */
    const config = new Configuration({
        apiKey: ENV.OPENAI_API_KEY
    })

    const openai = new OpenAIApi(config);

    let messages = [];
    console.log("userId is", userId);
    const mes = await Message.find({ user : userId });
    mes.map((message, index) => {
        let obj = {"role": message.role, "content": message.content}
        messages.push(obj);
    })
    console.log("TRAINING ON", messages);

    const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: messages,
    });

    console.log(completion.data.choices[0].message);


    return res.status(200).json({ success : true, data: completion.data.choices[0].message})

}