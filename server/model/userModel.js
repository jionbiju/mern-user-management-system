import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin', 'Manager'],
        default: 'User'
    }
}, {
    timestamps: true 
});

const userModel = mongoose.model("user", userSchema);
export default userModel;