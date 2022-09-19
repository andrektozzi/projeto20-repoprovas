import supertest from "supertest";
import app from "../src/app";
import client from "../src/dbStrategy/database";
import userSignUpFactory from "./factories/userSignUpFactory";
import { faker } from "@faker-js/faker";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("Test POST /signup", () => {
    it("Deve retornar status 201 caso o usuário se cadastre de forma correta", async () => {
      const user = await userSignUpFactory();
  
      const result = await supertest(app).post(`/signup`).send(user);
  
      const createdUser = await client.users.findFirst({
        where: { email: user.email },
      });
  
      expect(result.status).toBe(201);
      expect(createdUser).toBeInstanceOf(Object);
    });

    it("Deve retornar status 409 se o usuário já existe", async () => {
        const user = await userSignUpFactory();
    
        await supertest(app).post(`/signup`).send(user);
        const result = await supertest(app).post(`/signup`).send(user);
    
        expect(result.status).toBe(409);
    });

    it("Deve retornar status 422 se o usuário se cadastrar sem email", async () => {
        const user = await userSignUpFactory();
        user.email = "";
    
        const result = await supertest(app).post(`/signup`).send(user);
    
        expect(result.status).toBe(422);
    });

    it("Deve retornar status 422 se o usuário se cadastrar sem password", async () => {
        const user = await userSignUpFactory();
        user.password = "";

        const result = await supertest(app).post(`/signup`).send(user);

        expect(result.status).toBe(422);
    });

    it("Deve retornar status 422 se o password e a confirmação do password forem diferentes", async () => {
        const user = await userSignUpFactory();
        user.confirmPassword = "";

        const result = await supertest(app).post(`/signup`).send(user);

        expect(result.status).toBe(422);
    });
});