import User from '../models/user.model';
import Recipe from '../models/recipe.model';
import mongoose from 'mongoose';

//add 
export async function addRecipe(req, res) {
    //create a new user upon game start
    const { userId, name, steps} = req.body;
    console.log("RECIPE IS", userId, name, steps);
    try {
        const user = await User.findById(userId);
        console.log("found user: ", user);
        const newRecipe = new Recipe({
            name: name,
            steps: steps,
            user: userId,
            image: "",
        });
        await newRecipe.save();
        user.recipes.push(newRecipe);
        await user.save();
        return res.status(200).json({success: true, data: user.recipes});

    } catch (error) {
        return res.status(400).json({error});
    }
}

//return all messages associated with a particular userId
export async function returnAllRecipes(req, res) {
    //const { userId } = req.body

    const { userid } = req.query;
    console.log(req.query);
    console.log("mfw i try to find a recipe");
    try {
        console.log(userid);
        const recipes = await Recipe.find({ user : userid });
        return res.status(200).json({success: true, data: recipes})
    } catch (error) {
        return res.status(400).json({error})
    }
}