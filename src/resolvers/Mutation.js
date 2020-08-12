import bcrypt from 'bcryptjs';

import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);

    // PRISMA 2 IMPLEMENTATION HERE 

    // TODO WHEN YOU GET BACK: Environment variables for JWT aren't set up currently. 
    // You will probably have to set up env-cmd and modify the 'dev' command.

    const user = await prisma.user.create({
      data: {
        ...args.data,
        password
      }
    });

    // const user = await prisma.mutation.createUser({
    //   data: {
    //     ...args.data,
    //     password
    //   }
    // });

    return {
      user,
      token: generateToken(user.id)
    };
  },
  // async deleteUser(parent, args, { prisma, request }, info) {
  //   const userId = getUserId(request);

  //   return await prisma.mutation.deleteUser({
  //     where: {
  //       id: userId
  //     }
  //   }, info);
  // },
  // async updateUser(parent, args, { prisma, request }, info) {
  //   const userId = getUserId(request);

  //   if (typeof args.data.password === 'string') {
  //     args.data.password = await hashPassword(args.data.password);
  //   }

  //   return await prisma.mutation.updateUser({
  //     where: {
  //       id: userId
  //     },
  //     data: args.data
  //   }, info);
  // },
  // async login(parent, args, { prisma }, info) {
  //   const { email, password } = args;

  //   const user = await prisma.query.user({
  //     where: {
  //       email
  //     }
  //   });

  //   if (!user) {
  //     throw new Error('Invalid credentials');
  //   }

  //   const isMatch = await bcrypt.compare(password, user.password);

  //   if (!isMatch) {
  //     throw new Error('Invalid credentials');
  //   }

  //   return {
  //     user,
  //     token: generateToken(user.id)
  //   };
  // },
};

export { Mutation as default };