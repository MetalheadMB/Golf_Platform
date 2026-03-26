import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../config/supabaseClient.js";

export const registerUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Normalize email (VERY IMPORTANT)
    email = email.trim().toLowerCase();

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          password: hashedPassword,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    res.json({
      message: "Signup successful",
      user: data,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const  loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();

    // Find user
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password 
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};