import { Schema, model } from "mongoose";

const defaultPicture = "https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0="
const possibleCategories = ["fruit", "vegetable"]

const productCollection = "products"
const productSchema = new Schema({
    title: { type: String, required: true },
    photo: { type: String, default: defaultPicture },
    category: {
        type: String,
        //The enum validator ensures that it's either a fruit or a vegetable. 
        //We can remove this if we wanted to
        enum: possibleCategories,
        required: true
    },
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
})

productSchema.pre(['find', 'findOne'], function() {
    this.lean();
  });

const productModel = model(productCollection, productSchema)
export default productModel