import mongoose from "mongoose";

const std = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    Phone: {
        type: Number,

    },
    Address: {
        type: String,
        required: true
    },
    Department:{
        type: String,
        required: true
    },
  AdminEmail:{ 
    type:String,
    required:true
  }
    
})

const stddata = mongoose.model("stdModel", std)

export default stddata;