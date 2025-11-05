const express= require("express");
const router=express.Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs");

router.post("/register",async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        const hashedpassword = await bcrypt.hash(password,10);

        const newUser=new User({name,email,password:hashedpassword});
        await newUser.save();

        res.status(201).json({message:"sucesfully registered!"});
    }
    catch(err){
        res.status(500).json({error:"failed !!",details:err.message});
    }
});

router.post("/login",async(req,res)=>{
    try{
       const{email,password}=req.body;

       const user=await User.findOne({email});
       if(!user){
        return res.status(400).json({error:"user not found"});
       }
       const isMatch=await bcrypt.compare(password,user.password);

       if(!isMatch){
        return res.status(400).json({
            error:"incorrect password"
        });
       }
       res.status(200).json({message:"login successfull!!"});
    }
    catch(err){
       res.status(500).json({err:"login failed",details:err.message});
    }
});

module.exports=router;