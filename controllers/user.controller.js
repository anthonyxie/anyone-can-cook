import User from '../models/user.model';
import Message from '../models/message.model';
import Recipe from '../models/recipe.model';

import ENV from '../config.env';
import RecipeMenu from '@/components/RecipeMenu';
export async function createUser(req, res) {
    //create a new user upon game start
    try {
        const defaultUser = {
            name: "User2",
            messages: [],
            recipes: [],
        }
        console.log(defaultUser);

        const chat = await User.create(defaultUser);
        const newMessage = new Message({
            role: "system",
            content: ENV.PROMPT,
            user: chat._id,
        });
        await newMessage.save();
        chat.messages.push(newMessage);
        chat.save();
        const nMessage = new Message({
            role: "assistant",
            content: `Welcome to my kitchen! I'm here to help you make a delicious meal. Would you like me to suggest a recipe for you using ingredients you have on hand, or do you want to make a specific dish?`,
            user: chat._id,
        });
        await nMessage.save();
        chat.messages.push(nMessage);
        chat.save();
        console.log(chat);

        const newRecipe3 = new Recipe({
            name: "ramen",
            steps: [
                "Step 1: Preheat the oven to the temperature specified in the recipe.",
                "Step 2: Mix together the dry ingredients (flour, baking powder, salt, etc.) in a bowl.",
                "Step 3: In a separate bowl, beat together the wet ingredients (butter, sugar, eggs, etc.) until smooth.",
                "Step 4: Gradually mix the dry ingredients into the wet mixture, stirring until well combined.",
                "Step 5: Pour the batter into a greased cake pan and bake in the preheated oven for the specified time, then allow it to cool before frosting and serving."
            ],
            user: chat._id,    
        })
        await newRecipe3.save();
        chat.recipes.push(newRecipe3);
        chat.save();

        const newRecipe = new Recipe({
            name: "cake",
            steps: [
                "Step 1: Preheat the oven to the temperature specified in the recipe.",
                "Step 2: Mix together the dry ingredients (flour, baking powder, salt, etc.) in a bowl.",
                "Step 3: In a separate bowl, beat together the wet ingredients (butter, sugar, eggs, etc.) until smooth.",
                "Step 4: Gradually mix the dry ingredients into the wet mixture, stirring until well combined.",
                "Step 5: Pour the batter into a greased cake pan and bake in the preheated oven for the specified time, then allow it to cool before frosting and serving."
            ],
            user: chat._id,    
        })
        await newRecipe.save();
        chat.recipes.push(newRecipe);
        chat.save();

        const newRecipe2 = new Recipe({
            name: "fried rice",
            steps: [
                "Step 1: Cook the rice according to package instructions and set aside.",
                "Step 2: Heat some oil in a large skillet or wok over high heat.",
                "Step 3: Add any desired vegetables to the skillet (such as diced onion, peas, or carrots) and cook until tender.",
                "Step 4: Push the vegetables to the side of the skillet and crack an egg into the empty space.",
                "Step 5: Once the egg is cooked, mix everything together with the cooked rice and add any desired seasonings (such as soy sauce or sesame oil). Serve hot and enjoy!"
            ],
            user: chat._id,    
        })
        await newRecipe2.save();
        chat.recipes.push(newRecipe2);
        chat.save();


        return res.status(200).json({success: true, data: chat});

    } catch (error) {
        return res.status(400).json({error});
    }
}

export async function findAllUser(req, res) {
    try {
        const users = await User.find({});
        return res.status(200).json({success: true, data: users})
    } catch (error) {
        return res.status(400).json({error})
    }
}
