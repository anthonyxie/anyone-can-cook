import User from '../models/user.model';
import Message from '../models/message.model';

import ENV from '../config.env';
export async function createUser(req, res) {
    //create a new user upon game start
    try {
        const defaultUser = {
            name: "User2",
            messages: [],
        }
        console.log(defaultUser);

        const chat = await User.create(defaultUser);
        const newMessage = new Message({
            role: "system",
            content: ENV.PROMPT,
            user: chat._id,
        });
        await newMessage.save();
        chat.messages.push(newMessage);
        chat.save();
        const nMessage = new Message({
            role: "assistant",
            content: `Welcome to my kitchen! I'm here to help you make a delicious meal. Would you like me to suggest a recipe for you using ingredients you have on hand, or do you want to make a specific dish?`,
            user: chat._id,
        });
        await nMessage.save();
        chat.messages.push(nMessage);
        chat.save();
        console.log(chat);
        return res.status(200).json({success: true, data: chat});

    } catch (error) {
        return res.status(400).json({error});
    }
}

export async function findAllUser(req, res) {
    try {
        const users = await User.find({});
        return res.status(200).json({success: true, data: users})
    } catch (error) {
        return res.status(400).json({error})
    }
}
