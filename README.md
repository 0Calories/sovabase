### Instructions for when changing database schema

- Modify prisma/schema.prisma with new DB changes
- Run ```npx prisma migrate save --name <name> --experimental```
- Run ```npx prisma migrate up --experimental```
- Generate a new Prisma client by running ```npx prisma generate```
