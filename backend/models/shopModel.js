import mongoose from 'mongoose'

const shopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        // required: true
    },
},
    { timestamps: true }
)

const Shop = mongoose.model("Shop", shopSchema)

export default Shop