import getUserId from '../utils/getUserId';

const Query = {
  users(parent, args, { prisma }, info) {
    return prisma.user.findMany();
  },

  // me(parent, args, { prisma, request }, info) {
  //   const userId = getUserId(request);

  //   return prisma.query.user({
  //     where: {
  //       id: userId
  //     }
  //   }, info);
  // },
};

export { Query as default };