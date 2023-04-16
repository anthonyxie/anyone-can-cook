import { createUser, findAllUser } from '../../../controllers/user.controller'
import connect from '../../../database/connect'

export default async function handler(req, res) {
    try {
        await connect();
    } catch (error) {
        return res.status(400).json({ error: "Cannot connect to database" });
    }
    switch(req.method){
        case 'GET':
            console.log("WAHHHHGHG");
            await findAllUser(req,res);
            break;
        case 'POST':
            console.log("AHHHHHHH");
            await createUser(req, res);
            break;
        default:
            console.log("BAAAAAA");
            res.setHeader('Allow', ['GET','POST']);
            res.status(400).json({ error : `Method ${req.method} not allowed`});
            break;
    }
}