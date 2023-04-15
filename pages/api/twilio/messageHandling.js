import { sendTextMessage } from '../../../controllers/twilio'
export default async function handler(req, res) {
    switch(req.method){
      case 'POST':
          await sendTextMessage(req, res)
          break;
      default:
          res.setHeader('Allow', ['GET', 'POST']);
          res.status(400).json({ error : `Method ${method} not allowed`});
          break;
    }
}