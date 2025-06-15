import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "./../repositories/UserRepository";

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

interface IAuthenticateUserResponse {
  user: {
    id: number;
    email: string;
  };
  token: string;
}

export class AuthenticateUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = sign({}, process.env.JWT_SECRET as string, {
      subject: String(user.id),
      expiresIn: "1d",
    });

    const userResponse = {
      id: user.id,
      email: user.email,
    };
    return {
      user: userResponse,
      token,
    };
  }
}
