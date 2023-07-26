import jwt from 'jsonwebtoken';
import registerdata from '../model/registertionSchema.js';
const  Jwtkey ="secretykey"

const verifyToken =async(req, res, next) => {

    let token = req.headers.authorization;

    if(token && token.startsWith('Bearer')){
        try{
            token = token.split(' ')[1]

            const {userId} = jwt.verify(token,Jwtkey)

            req.user = await registerdata.findById(userId).select("-password")
             
            next();
        
        }catch{
    res.status(401).json({
        message:"Failed "
    })
        }
    }
  };

  export default verifyToken