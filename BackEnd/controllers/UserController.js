const ChatAppUsers=require('../models/UserModel');
const asyncHandler=require('../middleWares/asyncHandler')
const bcryptjs=require('bcryptjs');
const generateToken=require('../utilities/createToken')


const createtUser= asyncHandler(async(req,res)=>{
        const {name,email,password}=req.body
        switch(true){
                case !name:
                        return res.json({message:" User Name is required"});
                case !email:
                        return res.json({message:" Email is required"});
                case !password:
                        return res.json({message:" Password is required"});
        }
        const existUser=await ChatAppUsers.findOne({email})
        if(existUser){
                res.status(400).json({message:"User Already exsists"})
        }
        const hashedPassword=bcryptjs.hashSync(password,10);
        const newUser=new ChatAppUsers({
                name,
                email,
                password:hashedPassword,
        })
        try{
                await newUser.save();
                
                generateToken(res,newUser._id)
                res.status(201).json({
                    _id:newUser._id,
                    name:newUser.name,
                    email:newUser.email,
                    password:newUser.password,
                    isAdmin:newUser.isAdmin   
                })
        }catch(error){
                res.status(400)
                throw new Error('Invalid User')
        }
})

const signIn= asyncHandler(async(req,res)=>{
        const {email,password}=req.body;
        if(!email ||!password ||email===''||password===''){
            return res.status(404).json("All fields are required");
        }
        const existingUser=await ChatAppUsers.findOne({email})
        if(existingUser){
                const validPassword=bcryptjs.compareSync(password,existingUser.password);
                if(validPassword){
                        generateToken(res,existingUser._id)
                        res.status(201).json({
                                _id:existingUser._id,
                                name:existingUser.name,
                                email:existingUser.email,
                                password:existingUser.password,
                                isAdmin:existingUser.isAdmin   
                            });
                            return;
                }
                
        }
})

const signOut=asyncHandler(async(req,res)=>{
        res.cookie('jwt',"",{
                httpOnly:true,
                expires:new Date(0)
        });
        res.status(200).json({message:"Signed Out Successfully"})
})

const getAllUsers=asyncHandler(async(req,res)=>{
        const chatappusers=await ChatAppUsers.find({}) 
        res.status(201).json(chatappusers)    
})

const getSingleUsers=asyncHandler(async(req,res)=>{
        const {id}=req.params
        const chatappuser=await ChatAppUsers.findOne({id}) 
        res.status(201).json(chatappuser)    
})

const updateUser=asyncHandler(async(req,res)=>{
        const {id}=req.params
        const chatappuser=await ChatAppUsers.findById(id) 
        if(chatappuser){
                chatappuser.username=req.username ||chatappuser.username
                chatappuser.email=req.email ||chatappuser.email;
                if(req.body.password){
                        chatappuser.password=req.body.password;    
                } 
                const updatedUser=await ChatAppUsers.save;
                res.json({
                        _id:updatedUser._id,
                        username:updatedUser.username,
                        email:updatedUser.email,
                        password:updatedUser.password,
                        isAdmin:updatedUser.isAdmin    
                })   
        } else{
                res.status(404);
                throw new Error("User not Found")
        }
})
module.exports={createtUser,signIn,signOut,getAllUsers,getSingleUsers,updateUser};