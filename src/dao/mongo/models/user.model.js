import { Schema, model } from "mongoose";
import Joi from "joi";

const defaultPicture = "https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0="

const userCollection = "users"
const userSchema = new Schema({
    name: { type: String },
    photo: { type: String, default: defaultPicture },
    email: {type: String, required: true, index: true},
    password: {type: String, required: true},
    role: {type: Number, default: 0, index: true},
})

userSchema.pre(['find', 'findOne'], function() {
    this.lean();
  });

const userModel = model(userCollection, userSchema)
export default userModel