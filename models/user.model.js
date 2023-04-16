import { model, models, Schema } from "mongoose";

const UserSchema = new Schema( {
    name: String,
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }],
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: "Recipe"       
    }]
});

export default models.User || model('User', UserSchema); 