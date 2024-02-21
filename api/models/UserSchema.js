import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: '',
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: ''
    }
});

const User = mongoose.model("User", userSchema);
export default User;
