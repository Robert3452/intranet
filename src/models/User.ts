import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    names: string,
    lastnames: string,
    password: string,
    email: string,
    personal_email: string,
    verify: boolean,
    token_verify: string,
    role: string,
    skills: string[],

    matchPassword: (password: string) => Promise<boolean>

}

const userSchema: Schema = new Schema({
    names: { type: String, required: true },
    lastnames: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    personal_email: { type: String, required: true },
    verify: { type: Boolean, required: true, default: false },//Sirve para ver si ya se verificó
    token_verify: { type: String, },
    skills: { type: [String] },
    role: { type: String, default: "user" },
    active: { type: Boolean, default: true }


})

userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

});

userSchema.methods.matchPassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
}


export default model<IUser>("user", userSchema);