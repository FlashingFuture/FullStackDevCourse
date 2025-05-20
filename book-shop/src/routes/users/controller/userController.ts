import { Request, Response } from "express";
import {
  createUser,
  updateUser,
  getUserById,
  login,
} from "../service/userService";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await createUser({ email, password, name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = { id: Number(id), ...req.body };
    const user = await updateUser(userData);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await login({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
};
