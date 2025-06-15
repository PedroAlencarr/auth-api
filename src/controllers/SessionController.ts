import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const authenticateUserService = new AuthenticateUserService();

      const { user, token } = await authenticateUserService.execute({
        email,
        password,
      });
      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(401).json({
        error: error instanceof Error ? error.message : "Authentication failed",
      });
    }
  }
}
