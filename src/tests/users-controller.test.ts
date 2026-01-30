import request from "supertest"
import { app } from "@/app"
import exp from "constants"
import e from "express"
import { prisma } from "@/database/prisma"


describe("UsersController", () => {

  let user_id: string

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } })
  })

  it("should create a new User successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password"
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body.name).toBe("Test User")

    user_id = response.body.id
  })

  it("should throw an error when creating a user with an existing email", async () => {

    const response = await request(app).post("/users").send({
      name: "Duplicate User",
      email: "testuser@example.com",
      password: "password"
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("User with same email already exists.")

  })

  it("should throw an validation error if email is invalid", async () => {

    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "invalid-email",
      password: "password123"
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toContain("Validation Error")
  })
})