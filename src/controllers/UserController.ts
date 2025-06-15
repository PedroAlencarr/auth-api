import { Request, Response } from "express";

import { UserService } from "../services/UserService";

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
}
