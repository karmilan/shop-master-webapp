import mongoose from 'mongoose'

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop' // Reference to the Shop model for the shop where the employee works
    },
},
    { timestamps: true }
)

const Employee = mongoose.model("Employee", employeeSchema)
// const Shop = mongoose.model("Shop", shopSchema)


export default Employee