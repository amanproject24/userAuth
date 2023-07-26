import express from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import multer from 'multer';

import registerdata from '../model/registertionSchema.js';
import verifyToken from '../middleware/auth.js'
import stddata from "../model/addStd.js"


const router = express.Router();
const Jwtkey = "secretykey"

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg")
    }
})

const upload = multer({ storage });

router.post("/signup", upload.single('image'), async (req, res) => {

    try {
        const registerobject = await new registerdata({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: `http://localhost:7000/${req.file.filename}`
        })

        registerobject.save().then((result) => {
            const jwtoken = jwt.sign({ userId: registerobject._id }, Jwtkey, { expiresIn: '5d' });
            res.status(201).json({
                message: "user register successfull",
                token: jwtoken,
                user: result
            })
        })
    }
    catch (err) {
        console.log(err)
        res.status(401).json({
            message: "User is not Register"
        })
    }

})

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const checkUser = await registerdata.findOne({ email })
        if (!checkUser) {
            res.status(404).json({
                message: "user is not found"
            })

        }
        const compare = await bcrypt.compare(password, checkUser.password)
        if (!compare) {
            return res.status(401).json({
                message: "user creditial is not match"
            })
        }
        const jwttoken = jwt.sign({ userId: checkUser._id }, Jwtkey, { expiresIn: '5d' })

        res.status(201).json({
            message: "User is Login",
            token: jwttoken
        })
    } catch (err) {
        console.log(err)
    }

})



router.post("/changepassword", verifyToken, async (req, res) => {
    const { email, password } = req.body;
    if (password == "") {
        res.status(401).json({
            message: "Please enter the passeord"
        })
    }
    else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await registerdata.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
        res.send({ "status": "success", "message": "Password changed succesfully" })
    }

})

router.get("/getprofile", verifyToken, async (req, res) => {
    let getprofile = await registerdata.findOne(req.user._id).select("-password").select("-_id")
    res.status(201).json({
        message: "test",
        getprofile
    })
})

router.post("/add-data", verifyToken, async (req, res) => {
    
    const {AdminEmail} = req.body;
    const checkAdmin = await registerdata.findOne({email:AdminEmail})

    try{

    if(!checkAdmin){
         res.status(401).json({
         message:"Please Add valid AdminEmail Address"
        })
    }else{

        const addUser = await new stddata(req.body)
       addUser.save().then((result)=>{
       res.status(201).json({
            message:"User is save the data",
            result
        })
    })
    }
}
catch(err){
    return res.status(401).json({
        message:"Please enter the valid data"
    })
}
  
})

router.post("/getData", verifyToken, async (req, res) => {

    const {AdminEmail}  = req.body;

    const userId = req.params.id

    await stddata.find({AdminEmail}).select("-AdminEmail").then((result)=>{
        res.status(201).json({
            message:"User",
            result
        })
    })
    })

router.post("/update-user/:id",verifyToken,async(req,res)=>{

    const userId = req.params.id;
    try{

   const {firstName,lastName,Phone,Address} = req.body;
   const userData = await stddata.findById(userId)
   userData.firstName = firstName;
   userData.lastName = lastName;
   userData.Phone = Phone;
   userData.Address = Address;
   await userData.save();
}

catch(err){
    res.status(401).json({
        message:"The Data is not be updated"
    })
}
})

export default router;


