import { model, models, Schema } from "mongoose";

const UserSchema = new Schema( {
    name: String,
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }]
});

export default models.User || model('User', UserSchema); 