import request from "supertest"

import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("SessionsController", () => {
  let user_id: string


  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } })
  })

  it("should authenticate a user and get access token", async () => {
    const user = await request(app).post("/users").send({
      name: "Test2 User",
      email: "testuser2@example.com",
      password: "password"
    })
    user_id = user.body.id

    const session = await request(app).post("/sessions").send({
      email: "testuser2@example.com",
      password: "password"
    })

    expect(session.status).toBe(200)
    expect(session.body.token).toEqual(expect.any(String))


  })

})