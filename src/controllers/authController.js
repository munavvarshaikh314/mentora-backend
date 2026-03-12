import prisma from "../utils/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "name, email, password, and role are required"
      });
    }

    // Only allow PARENT or MENTOR to sign up
    if (!["PARENT", "MENTOR"].includes(role)) {
      return res.status(400).json({
        message: "Only PARENT or MENTOR can register"
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    role
  }
});

const { password: _, ...safeUser } = user;  // this is for not showing password (hash passwords remove password from API response)


res.status(201).json({
  message: "User created successfully",
  user: safeUser
});

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required"
      });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(

      {
        userId: user.id,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d"
      }

    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


export const me = async (req, res) => {

  try {

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    res.json({ user });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};
