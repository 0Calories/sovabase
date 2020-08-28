
import { PrismaClient } from '@prisma/client';
import { request } from 'graphql-request';
import "core-js/stable";
import "regenerator-runtime/runtime";

import server from '../src/server';
import seedDatabase, { userOne } from './utils/seedDatabase';
import { createUser, login } from './utils/operations';

const prisma = new PrismaClient();
const URL = 'http://localhost:4000';

beforeAll(() => {
  return server.start({ port: 4000 }).then((httpServer) => {
    global.httpServer = httpServer;
  });
});

afterAll(() => {
  return global.httpServer.close();
});

beforeEach(seedDatabase);

test('Should create a new user', async () => {
  const variables = {
    data: {
      username: "Ash123",
      email: "ash@example.com",
      password: "MyPass123"
    }
  };

  const response = await request(URL, createUser, variables);
  const user = await prisma.user.findOne({
    where: {
      id: parseInt(response.createUser.user.id)
    }
  });

  expect(user).toBeTruthy();
  expect(user.username).toBe(variables.data.username);
});

// test('Should expose public profiles', async () => {
// const response = await client.query({ query: getUsers });

// expect(response.data.users.length).toBe(2);
// expect(response.data.users[0].email).toBe(null);
// expect(response.data.users[0].name).toBe('Jen');
// });


test('Should not login with bad credentials', async () => {
  const variables = {
    email: 'jen@example.com',
    password: 'asdfasdfasd'
  };

  await expect(request(URL, login, variables)).rejects.toThrow();
  // await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
});

test('Should login with correct credentials, when either username or email is provided', async () => {
  const variables1 = {
    email: 'jen@example.com',
    password: 'Red098!@#$'
  };

  const variables2 = {
    username: 'Jen123',
    password: 'Red098!@#$'
  };

  const response1 = await request(URL, login, variables1);
  expect(response1.login.token).toBeTruthy();

  const response2 = await request(URL, login, variables2);
  expect(response2.login.token).toBeTruthy();
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

