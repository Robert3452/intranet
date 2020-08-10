import { Request, Response } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';


export const signup = async (req: Request, res: Response) => {

    const { email, password, names, lastnames, personal_email } = req.body;
    let user = <IUser>{
        password,
        email,
        names,
        lastnames,
        personal_email
    }
    user = new User(user);

    try {
        await user.save()
        res.json({ message: "user created" })
    } catch (error) {
        let status: number = 500;
        if (error.name == "MongoError")
            status = 400;
        res.status(status).json({ message: error })
    }

}

const createToken = (user: IUser) => {
    return jwt.sign({
        id: user._id, email: user.email
    }, config.jwtSecret, { expiresIn: 86400 })
}

export const signin = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) throw { name: "EmptyFields", message: "please fill all the fields that are required" }

        const user = await User.findOne({ email });

        if (!user) throw { name: "UserDoesntExist", message: "This user doesn't exist" };

        const matchPwd = await user.matchPassword(password);
        console.log(matchPwd)
        if (!matchPwd) throw { name: "NoMatch", message: "the password not match" }

        return res.json({ token: createToken(user) })

    } catch (error) {
        const name = error.name;
        let status: number = 500;
        switch (name) {
            case "EmptyFields":
                status = 401;
                break;
            case "UserDoesntExist":
                status = 401;
                break;
            case "NoMatch":
                status = 400;
                break;
            default:
                break;
        }
        return res.status(status).json({ message: error })

    }
}