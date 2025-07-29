import  jwt from "jsonwebtoken";
import User from "@/lib/models/User";
import type { Document } from "mongoose";


// Generate JWT Token
export function generateToken(userId: string ) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

// Register User
export async function register({ name, email, password}: { name: string; email: string; password: string }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = new User({ name, email, password });
  await user.save();

  const token = generateToken(user._id.toString());

  return {
    messsage: "Created user success",
    token,
    user: user.toJSON(),
  }
}

// Login User
export async function login({ email, password }: { email: string; password: string }) {
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid Credentials');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = generateToken(user._id.toString());

  return {
    message: "Login Successful",
    token, 
    user: user.toJSON(),
  }

}

// Get Current User
export async function getCurrentUser(user: Document) {
  return { user: user.toJSON()};
}

