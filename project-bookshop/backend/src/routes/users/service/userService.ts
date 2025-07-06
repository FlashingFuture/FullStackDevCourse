import { User, CreateUserDto, UpdateUserDto, LoginDto } from "../types/user";
import { db } from "../../../config/database";
import bcrypt from "bcrypt";

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const [result] = await db.query(
    "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
    [userData.email, hashedPassword, userData.name]
  );

  const [newUser] = await db.query("SELECT * FROM users WHERE id = ?", [
    result.insertId,
  ]);

  return newUser[0];
};

export const updateUser = async (userData: UpdateUserDto): Promise<User> => {
  const updates: string[] = [];
  const values: any[] = [];

  if (userData.email) {
    updates.push("email = ?");
    values.push(userData.email);
  }

  if (userData.password) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    updates.push("password = ?");
    values.push(hashedPassword);
  }

  if (userData.name) {
    updates.push("name = ?");
    values.push(userData.name);
  }

  values.push(userData.id);

  await db.query(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`, values);

  const [updatedUser] = await db.query("SELECT * FROM users WHERE id = ?", [
    userData.id,
  ]);

  return updatedUser[0];
};

export const getUserById = async (id: number): Promise<User> => {
  const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return users[0];
};

export const login = async (loginData: LoginDto): Promise<User | null> => {
  const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
    loginData.email,
  ]);

  if (users.length === 0) {
    return null;
  }

  const user = users[0];
  const isValidPassword = await bcrypt.compare(
    loginData.password,
    user.password
  );

  if (!isValidPassword) {
    return null;
  }

  return user;
};
