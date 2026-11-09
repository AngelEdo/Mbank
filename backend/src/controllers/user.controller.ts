import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";
import User from "../models/user.model.ts";
import { ResponseUserDto } from "../dtos/users/ResponseUserDto.ts";
import { hashPassword } from "../utils/password.util.ts";

export class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const passwordHash = await hashPassword(password);

      const user = await User.create({
        firstName,
        lastName,
        email,
        passwordHash,
      });

      res
        .status(201)
        .json({ message: "user created", user: ResponseUserDto.create(user) });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        res.status(409).json({ message: "email already registered" });
        return;
      }
      console.error(error);
      res.status(500).json({ message: "internal server error" });
    }
  }
}