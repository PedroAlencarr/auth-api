import { PrismaClient, User } from "../generated/prisma";

export interface ICreateUserDTO {
  email: string;
  password: string;
}

export class UserRepository {
  private prisma = new PrismaClient();

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  public async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data: userData,
    });
    return user;
  }
}
