import { Request, Response, NextFunction } from "express";
import { authConfig } from "@/configs/auth"
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import z from "zod";
import { sign, Secret, SignOptions } from "jsonwebtoken";

class SessionsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {

      const bodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })

      const { email, password } = bodySchema.parse(req.body)
      const user = await prisma.user.findFirst({ where: { email } })

      if (!user) {
        throw new AppError("Invalid credentials", 401)
      }

      const passwordMatched = await compare(password, user.password)

      if (!passwordMatched) {
        throw new AppError("Invalid credentials", 401)
      }

      const { secret, expiresIn } = authConfig.jwt

      const token = sign(
        { role: user?.role ?? "customer" },
        secret,
        { expiresIn, subject: user.id } as SignOptions
      );

      const { password: _, ...userWithoutPassword } = user



      return res.json({ token, ...userWithoutPassword })
    } catch (error) {
      next(error)
    }
  }
}
export { SessionsController }