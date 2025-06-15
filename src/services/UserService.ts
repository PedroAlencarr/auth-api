import { hash } from "bcryptjs";
import { User } from "../generated/prisma";
import { ICreateUserDTO, UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute({ email, password }: ICreateUserDTO): Promise<User> {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
    });
    return user;
  }
}
