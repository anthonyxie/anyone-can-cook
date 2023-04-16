import { model, models, Schema } from "mongoose";

const RecipeSchema = new Schema({
	name: String,
	steps: [String],
	ingredients: [String],
   });

export default models.Recipe || model('Recipe', RecipeSchema)