### Instructions for when changing database schema

- Modify prisma/schema.prisma with new DB changes
- Run ```npx prisma migrate save --name <name> --experimental```
- Run ```npx prisma migrate up --experimental```
- Generate a new Prisma client by running ```npx prisma generate```

### How to clone DB
 - https://dba.stackexchange.com/questions/10474/postgresql-how-to-create-full-copy-of-database-schema-in-same-database
