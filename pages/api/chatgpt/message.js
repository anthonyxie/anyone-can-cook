import { createMessage } from '../../../controllers/openai'

export default async function handler(req, res) {

  switch(req.method){
    case 'POST':
        await createMessage(req, res)
        break;
    default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(400).json({ error : `Method ${method} not allowed`});
        break;
  }
}