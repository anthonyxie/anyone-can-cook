import { Configuration, OpenAIApi } from 'openai';
import ENV from '../config.env';

export async function createMessage(req, res) {
    const { message } = req.body;

    /** CONFIG OPEN AI API */
    const config = new Configuration({
        apiKey: ENV.OPENAI_API_KEY
    })

    const openai = new OpenAIApi(config);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: `Write me a short paragraph (100 words or less) on the following prompt ${message}`}],
    });


    return res.status(200).json({ success : true, data: completion.data.choices[0].message})

}