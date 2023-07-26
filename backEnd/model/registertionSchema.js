import { genSalt } from "bcrypt";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const register = mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        data: Buffer
    },
    

})

register.pre('save', async function (next) {

    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt)

    }
    next()
})



const registerdata = mongoose.model('registerdata', register);

export default registerdata;