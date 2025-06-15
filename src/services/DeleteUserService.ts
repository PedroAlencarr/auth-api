import { UserRepository } from "../repositories/UserRepository";

interface IDeleteUserRequest {
  userId: number;
}

export class DeleteUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute({ userId }: IDeleteUserRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(userId);
  }
}
