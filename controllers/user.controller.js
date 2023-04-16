import User from '../models/user.model';

export async function createUser(req, res) {
    //create a new user upon game start
    try {
        const defaultUser = {
            name: "User2",
            messages: [],
        }
        console.log(defaultUser);

        const chat = await User.create(defaultUser);
        console.log(chat);
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
