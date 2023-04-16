import User from '../models/user.model';
import Message from '../models/message.model';
import mongoose from 'mongoose';

//add 
export async function addMessage(req, res) {
    //create a new user upon game start
    const { userId, message } = req.body
    try {
        const user = await User.findById(userId);
        const newMessage = new Message({
            role: message.role,
            content: message.content,
            user: userId,
        });
        await newMessage.save();
        user.messages.push(newMessage);
        await user.save();
        return res.status(200).json({success: true, data: user.messages});

    } catch (error) {
        return res.status(400).json({error});
    }
}

//return all messages associated with a particular userId
export async function returnAllMessages(req, res) {
    //const { userId } = req.body
    const userId = "643b3c1307292b3c1e22d2cc";
    try {
        const messages = await Message.find({ user : userId });
        return res.status(200).json({success: true, data: messages})
    } catch (error) {
        return res.status(400).json({error})
    }
}