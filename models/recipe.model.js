import { model, models, Schema } from "mongoose";

const RecipeSchema = new Schema({
	name: String,
	steps: [String],
    image: String,
	user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
   });

export default models.Recipe || model('Recipe', RecipeSchema)