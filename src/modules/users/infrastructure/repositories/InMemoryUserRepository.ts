import type { User } from "../../domain/entities/User.js";
import type { UserRepository } from "../../domain/repositories/UserRepository.js";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  public async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) ?? null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }

  public async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
