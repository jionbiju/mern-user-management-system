import userModel from "../model/userModel.js";

// Insert Data Into MongoDB
export const create = async (req, res) => {
    try {
        const { name, email, phone, role } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "Name, email, and phone are required fields."
            });
        }


        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "User with this email already exists."
            });
        }

        // Create new user
        const newUser = new userModel({ 
            name: name.trim(), 
            email: email.trim().toLowerCase(), 
            phone: phone.trim(),
            role: role || 'User'
        });
        
        const savedData = await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: savedData
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
};

// GET All Users From MongoDB
export const getAllData = async (req, res) => {
    try {
        const userData = await userModel.find().sort({ createdAt: -1 });
        
        if (!userData || userData.length === 0) {
            return res.status(404).json({
                message: "No users found"
            });
        }
        
        res.status(200).json({
            message: "Users retrieved successfully",
            users: userData,
            count: userData.length
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
};

// Get a user with specific ID
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        
        if (!id) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const userData = await userModel.findById(id);

        if (!userData) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        res.status(200).json({
            message: "User retrieved successfully",
            user: userData
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
};

// Update the User by ID
export const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, role } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        // Check if user exists
        const userExists = await userModel.findById(id);
        if (!userExists) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if email is being updated and if it already exists
        if (email && email !== userExists.email) {
            const emailExists = await userModel.findOne({ 
                email: email.trim().toLowerCase(),
                _id: { $ne: id }
            });
            if (emailExists) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }
        }

      
        const updateData = {};
        if (name) updateData.name = name.trim();
        if (email) updateData.email = email.trim().toLowerCase();
        if (phone) updateData.phone = phone.trim();
        if (role) updateData.role = role;

        const updatedData = await userModel.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "User updated successfully",
            user: updatedData
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
};

// Delete the User By ID
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const userExists = await userModel.findById(id);
        if (!userExists) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await userModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
};