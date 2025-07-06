import { Request, Response } from "express";
import * as orderService from "../service/orderService";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "인증이 필요합니다." });
    }

    const orders = await orderService.getAllOrders(userId.toString());
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "인증이 필요합니다." });
    }

    const order = await orderService.getOrderById(
      req.params.id,
      userId.toString()
    );
    if (!order) {
      return res.status(404).json({ message: "주문을 찾을 수 없습니다." });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "인증이 필요합니다." });
    }

    const orderData = {
      ...req.body,
      userId,
    };
    const order = await orderService.createOrder(orderData);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: "잘못된 요청입니다." });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "인증이 필요합니다." });
    }

    const order = await orderService.updateOrder(
      req.params.id,
      userId.toString(),
      req.body
    );
    if (!order) {
      return res.status(404).json({ message: "주문을 찾을 수 없습니다." });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "잘못된 요청입니다." });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "인증이 필요합니다." });
    }

    const order = await orderService.deleteOrder(
      req.params.id,
      userId.toString()
    );
    if (!order) {
      return res.status(404).json({ message: "주문을 찾을 수 없습니다." });
    }
    res.json({ message: "주문이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
};
