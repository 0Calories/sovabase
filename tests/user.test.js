
import { PrismaClient } from '@prisma/client';
import { request } from 'graphql-request';
import "core-js/stable";
import "regenerator-runtime/runtime";
import server from '../src/server';

// import seedDatabase, { userOne } from './utils/seedDatabase';
import { createUser } from './utils/operations';

const prisma = new PrismaClient();
const url = 'http://localhost:4000';

// beforeEach(seedDatabase);

beforeAll(() => {
  return server.start({ port: 4000 }).then((httpServer) => {
    global.httpServer = httpServer;
  });
});

afterAll(() => {
  return global.httpServer.close();
});

test('Should create a new user', async () => {
  const variables = {
    data: {
      username: "Ash123",
      email: "ash@example.com",
      password: "MyPass123"
    }
  };

  const response = await request(url, createUser, variables);
  console.dir(response);

  // const response = await prisma.mutate({
  //   mutation: createUser,
  //   variables
  // });

  // const userExists = await prisma.exists.User({
  //   id: response.data.createUser.user.id
  // });

  // expect(userExists).toBe(true);
});

test('Should expose public author profiles', async () => {
  // const response = await client.query({ query: getUsers });

  // expect(response.data.users.length).toBe(2);
  // expect(response.data.users[0].email).toBe(null);
  // expect(response.data.users[0].name).toBe('Jen');
});


test('Should not login with bad credentials', async () => {
  // const variables = {
  //   email: "jen@example.com",
  //   password: "aASDASDASDdsad"
  // };

  // await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
});

test('Should not create user with a short password', async () => {
  // const variables = {
  //   data: {
  //     name: 'Eric Cao',
  //     email: 'eric@example.com',
  //     password: 'pass'
  //   }
  // };

  // await expect(client.mutate({ mutation: createUser, variables })).rejects.toThrow();
});

test('Should fetch user profile', async () => {
  // const client = getClient(userOne.jwt);

  // const { data } = await client.query({ query: getProfile });

  // expect(data.me.id).toBe(userOne.user.id);
  // expect(data.me.name).toBe(userOne.user.name);
  // expect(data.me.email).toBe(userOne.user.email);
});

