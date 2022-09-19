import supertest from "supertest";
import app from "../src/app"
import client from "../src/dbStrategy/database";
import userSignUpFactory from "./factories/userSignUpFactory";
import testFactory from "./factories/testFactory";
import { faker } from "@faker-js/faker"

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "tests" RESTART IDENTITY CASCADE`;
});

describe("TEST POST /tests", () => {
    it("Deve retornar status 201 se a prova for criada corretamente", async () => {
        const user = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(user);
    
        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/signin`).send(userLogin);
        const { token } = response.body;
    
        const test = await testFactory();
        const result = await supertest(app).post(`/tests`).send(test).auth(token, { type: "bearer" });
    
        expect(result.status).toBe(201);
        expect(result).not.toBeNull();
    });

    it("Deve retornar status 500 se o token for inválido", async () => {
        const user = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/signin`).send(userLogin);
        let { token } = response.body;
        token = token + "a";

        const test = await testFactory();
        const result = await supertest(app).post(`/tests`).send(test).auth(token, { type: "bearer" });

        expect(result.status).toBe(500);
    });

    it("Deve retornar status 422 se a prova for cadastrada sem nome", async () => {
        const user = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/signin`).send(userLogin);
        const { token } = response.body;

        const test = await testFactory();
        test.name = "";
        const result = await supertest(app).post(`/tests`).send(test).auth(token, { type: "bearer" });

        expect(result.status).toBe(422);
    });

    it("Deve retornar status 422 se a prova for cadastrada sem pdfUrl", async () => {
        const user = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/signin`).send(userLogin);
        const { token } = response.body;

        const test = await testFactory();
        test.pdfUrl = "";
        const result = await supertest(app).post(`/tests`).send(test).auth(token, { type: "bearer" });

        expect(result.status).toBe(422);
    });

    it("Deve retornar status 422 se a prova for cadastrada com o categoryId inválido", async () => {
        const user = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/signin`).send(userLogin);
        const { token } = response.body;

        const test = await testFactory();
        test.categoryId = Number(faker.random.numeric(8));

        const result = await supertest(app).post(`/tests`).send(test).auth(token, { type: "bearer" });

        expect(result.status).toBe(404);
     });

     it("Deve retornar status 422 se a prova for cadastrada com o disciplineId inválido", async () => {
        const user = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/signin`).send(userLogin);
        const { token } = response.body;

        const test = await testFactory();
        test.disciplineId = Number(faker.random.numeric(8));

        const result = await supertest(app).post(`/tests`).send(test).auth(token, { type: "bearer" });

        expect(result.status).toBe(404);
     });

     it("Deve retornar status 422 se a prova for cadastrada com o teacherId inválido", async () => {
        const user = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/signin`).send(userLogin);
        const { token } = response.body;

        const test = await testFactory();
        test.teacherId = Number(faker.random.numeric(8));

        const result = await supertest(app).post(`/tests`).send(test).auth(token, { type: "bearer" });

        expect(result.status).toBe(404);
     });
});

describe("TEST GET /tests/disciplines", () => {
     it("Deve retornar status 200 se conseguir visualizar os testes corretamente", async () => {
        const user = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(user);
    
        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/signin`).send(userLogin);
        const { token } = response.body;
    
        const result = await supertest(app).get(`/tests/disciplines`).auth(token, { type: "bearer" });
    
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Deve retornar status 500 se o token for inválido", async () => {
        const user = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/signin`).send(userLogin);
        let { token } = response.body;
        token = token + "a";

        const test = await testFactory();
        const result = await supertest(app).get(`/tests/disciplines`).send(test).auth(token, { type: "bearer" });

        expect(result.status).toBe(500);
    });
});

describe("TEST GET /tests/teachers", () => {
    it("Deve retornar status 200 se conseguir visualizar os testes corretamente", async () => {
        const user = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(user);
    
        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/signin`).send(userLogin);
        const { token } = response.body;
    
        const result = await supertest(app).get(`/tests/teachers`).auth(token, { type: "bearer" });
  
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

   it("Deve retornar status 500 se o token for inválido", async () => {
        const user = await userSignUpFactory();
        await supertest(app).post(`/signup`).send(user);

        const userLogin = { email: user.email, password: user.password };
        const response = await supertest(app).post(`/signin`).send(userLogin);
        let { token } = response.body;
        token = token + "a";

        const test = await testFactory();
        const result = await supertest(app).get(`/tests/teachers`).send(test).auth(token, { type: "bearer" });

        expect(result.status).toBe(500);
    });
});

afterAll(async () => {
    await client.$disconnect();
});