import { compare, hash } from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";

interface IUpdatePasswordDTO {
  userId: number;
  oldPassword: string;
  newPassword: string;
}

export class UpdatePasswordService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute({
    userId,
    oldPassword,
    newPassword,
  }: IUpdatePasswordDTO): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const oldPasswordMatch = await compare(oldPassword, user.password);
    if (!oldPasswordMatch) {
      throw new Error("Old password does not match");
    }

    const newHashedPassword = await hash(newPassword, 8);
    await this.userRepository.updatePassword(userId, newHashedPassword);
  }
}
