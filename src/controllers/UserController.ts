import { Request, Response } from "express";
import { DeleteUserService } from "../services/DeleteUserService";
import { UpdatePasswordService } from "../services/UpdateUserPasswordService";
import { UserService } from "../services/UserService";
import { UserRepository } from "./../repositories/UserRepository";

export class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const userService = new UserService();

      const user = await userService.execute({ email, password });

      const userResponse = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      };

      return res.status(201).json(userResponse);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Internal server error",
      });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(Number(userId));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userResponse = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
    return res.json(userResponse);
  }

  public async updatePassword(req: Request, res: Response): Promise<Response> {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;
      if (!oldPassword || !newPassword) {
        return res
          .status(400)
          .json({ error: "Old password and new password are required" });
      }
      const updateUserPasswordService = new UpdatePasswordService();

      await updateUserPasswordService.execute({
        userId: Number(userId),
        oldPassword,
        newPassword,
      });

      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Internal server error",
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const deleteUserService = new DeleteUserService();

    await deleteUserService.execute({
      userId: Number(userId),
    });
    return res.status(204).send();
  }
}
