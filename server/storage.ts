import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      id,
      createdAt: new Date(),
      fullName: insertUser.fullName,
      email: insertUser.email,
      password: insertUser.password,
      isMember: insertUser.isMember ?? false,
      isAdmin: insertUser.isAdmin ?? false,
      roles: insertUser.roles ?? null,
      status: insertUser.status ?? "active",
      experience: insertUser.experience ?? null,
      mailingEnabled: insertUser.mailingEnabled ?? true,
    };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
