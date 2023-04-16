import { returnAllMessages } from '@/controllers/message.controller';
import connect from '../../../database/connect'

export default async function handler(req, res) {
    try {
        await connect();
    } catch (error) {
        return res.status(400).json({ error: "Cannot connect to database" });
    }
    switch(req.method){
        case 'GET':
            console.log("AHHHHHHH MESSAGE");
            await returnAllMessages(req, res);
            break;
        default:
            console.log("BAAAAAA");
            res.setHeader('Allow', ['GET']);
            res.status(400).json({ error : `Method ${req.method} not allowed`});
            break;
    }
}