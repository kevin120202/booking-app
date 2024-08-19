import mongoose from "mongoose";
import bcrypt from "bcryptjs"

export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

/*
- Before saving a user to the database, a Mongoose middleware function checks if the password has been modified. If it has, the password is hashed using bcrypt with a salt of 8 rounds, ensuring secure password storage
*/
userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})


const User = mongoose.model<UserType>("User", userSchema)

export default User;