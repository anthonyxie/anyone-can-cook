import { model, models, Schema } from "mongoose";

const MessageSchema = new Schema({
    role: String,
    content: String,
});

export default MessageSchema