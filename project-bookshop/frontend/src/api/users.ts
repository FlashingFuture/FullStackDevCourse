import axios from "axios";
import {
  User,
  RegisterDto,
  LoginDto,
  UpdateUserDto,
  MessageResponse,
  LoginResponse,
} from "../models/user.model";

const API_BASE = "/api/users";

export async function register(
  userData: RegisterDto
): Promise<MessageResponse> {
  const res = await axios.post(`${API_BASE}/register`, userData);
  return res.data;
}

export async function login(loginData: LoginDto): Promise<LoginResponse> {
  const res = await axios.post(`${API_BASE}/login`, loginData);
  return res.data;
}

export async function getUserProfile(userId: number): Promise<User> {
  const res = await axios.get(`${API_BASE}/${userId}`);
  return res.data;
}

export async function updateUserProfile(
  userData: UpdateUserDto
): Promise<User> {
  const res = await axios.put(`${API_BASE}/${userData.id}`, userData);
  return res.data;
}
