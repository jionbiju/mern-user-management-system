import userModel from "../model/userModel.js";

//Insert Data Into MongoDB
export const create = async (req,res) => {
    try {
        const { name, email, address } = req.body;

        const userExist = await userModel.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User already exists."})
        }

        const newUser = new userModel({ name, email, address }); 
        const savedData = await newUser.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}

//GET All Users From MongoDB
export const getAllData = async (req,res) => {
    try {
       const userData =await userModel.find();
       if(!userData || userData.length === 0){
        return res.status(404).json({message:"User data not found"});
       }
       res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}

//Get a user with specific ID
export const getUserById = async (req,res) => {
    try {
        const id = req.params.id;
        const userData = await userModel.findById(id);

        if(!userData){
            return res.status(404).json({message:"User not found"});
        } 
        res.status(200).json(userData);
    } catch (error) {
         res.status(500).json({errorMessage:error.message});
    }
}

//Update the User by ID
export const updateById = async (req,res) => {
    try {
        const {id}= req.params;
        const userExists = await userModel.findById(id);
        if(!userExists){
            return res.status(404).json({message:"User not found"})
        }
        const updatedData = await userModel.findByIdAndUpdate(id, req.body,{new:true});
        res.status(200).json(updatedData);

    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}

//Delete the User By ID
export const deleteUser = async (req,res) => {
    try {
        const {id}= req.params;
        const userExists = await userModel.findById(id);
        if(!userExists){
            return res.status(404).json({message:"User not found"})
        }
        await userModel.findByIdAndDelete(id);
        res.status(200).json({message:"User deleted successfully"});

    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}