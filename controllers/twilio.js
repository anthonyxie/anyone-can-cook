import ENV from '../config.env';

async function sendTwilio( message, number ) {
    return new Promise((resolve, reject) => {   
        const accountSid = ENV.TWILIO_ACCOUNT_SID;
        const authToken = ENV.TWILIO_AUTH_TOKEN;
        var twilio = require('twilio');
        const client = twilio(accountSid, authToken);
         
        client.messages
        .create({from: '+18442978524', body: message, to: number})
        .then(message => 
            resolve(message)
        );
    });
  
}

export async function sendTextMessage(req, res) {
    //send message to target phone number
    const { message, number }  = req.body;


    
    //i feel like i need error handling here?
    let twilioRes = await sendTwilio(message, number);

    if (twilioRes.error_code) {
        return res.status(400).json({ success : false, data: twilioRes});
    }
    //send 400 if it's bad but loooool
    else {
        return res.status(200).json({ success : true, data: twilioRes}); 
    } 
}
