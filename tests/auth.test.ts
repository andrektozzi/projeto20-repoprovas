import supertest from "supertest";
import app from "../src/app";
import client from "../src/dbStrategy/database";
import userSignUpFactory from "./factories/userSignUpFactory";
import userSignInFactory from "./factories/userSignInFactory";
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

describe("Test POST /signin", () => {
    it("Deve retornar status 200 se o usuário logar de forma correta", async () => {
      const registeredUser = await userSignUpFactory();
      await supertest(app).post(`/signup`).send(registeredUser);
  
      const user = await userSignInFactory(
        registeredUser.email,
        registeredUser.password
      );
  
      const result = await supertest(app).post(`/signin`).send(user);
      const { token } = result.body;
  
      expect(result.status).toBe(200);
      expect(token).not.toBeNull();
    });

    it("Deve retornar status 401 se o usuário logar com email incorreto", async () => {
        const registeredUser = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(registeredUser);
        const email = faker.internet.email(); 
    
        const user = await userSignInFactory(
          email,
          registeredUser.password
        );
    
        const result = await supertest(app).post(`/signin`).send(user);
    
        expect(result.status).toBe(401);
    });

    it("Deve retornar status 401 se o usuário logar com o password incorreto", async () => {
        const registeredUser = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(registeredUser);
        const password = faker.random.alphaNumeric(10); 
    
        const user = await userSignInFactory(
          registeredUser.email,
          password
        );
    
        const result = await supertest(app).post(`/signin`).send(user);
    
        expect(result.status).toBe(401);
    });

    it("Deve retornar status 422 se o usuário logar sem email", async () => {
        const registeredUser = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(registeredUser);
        const email = '';
        
        const user = await userSignInFactory(
          email,
          registeredUser.password
        );

        const result = await supertest(app).post(`/signin`).send(user);

        expect(result.status).toBe(422);
    });

    it("Deve retornar status 422 se o usuário logar sem password", async () => {
        const registeredUser = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(registeredUser);
        const password = '';
        
        const user = await userSignInFactory(
          registeredUser.email,
          password
        );

        const result = await supertest(app).post(`/signin`).send(user);

        expect(result.status).toBe(422);
    });
});

afterAll(async () => {
    await client.$disconnect();
});