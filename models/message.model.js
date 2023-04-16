import { model, models, Schema } from "mongoose";

const MessageSchema = new Schema({
    role: String,
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export default models.Message || model('Message', MessageSchema)