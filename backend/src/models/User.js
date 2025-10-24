import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    bio: {type: String, default: ""},
    profilePic: {type: String, default: ""},
    canSupport: {type: String, default: ""},
    needSupport: {type: String, default: ""},
    location: {type: String, default: ""},
    isOnboarded: {type: Boolean, default: false},

    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],

},{timestamps:true});


//Password hashing using bcryptjs
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }
    catch(error){
        next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;