import Users from './usemodel.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Register a new user
export const register = async (req, res, next) => {
  try {
    const { username, email, password,role } = req.body;

    // Check if email already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database with role
    const newUser = new Users({ 
      username, 
      email, 
      password: hashedPassword, 
      
      role: role || 'store' // Default role is 'user' if not provided
    });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error in register:", err.message);
    next(err); // Pass error to the error middleware
  }
};

// Login a user
export const login = async (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET || "hsbhsagbyjeh167ehd6tdygs";

  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT Token with role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      jwtSecret,
      { expiresIn: '1h' }
    );

    return res.json({ 
      success: true, 
      authData: token, 
      role: user.role, // Send the role to the client
      message: "User logged in successfully" 
    });
  } catch (err) {
    console.error("Error in login:", err.message);
    next(err);
  }
};
