# Commend
### `npm run migrate` 
`prisma/schema.prisma` migrate to DB
### `npm run generate`
`prisma/schema.prisma` generate to typescript & graphql

When you change `prisma/schema.prisma`. You need to run `npm run migrate && npm run npm run generate` this command.

# Error
### `Error: There are more migrations in the database than locally. This must not happen.`
Remove **_Migration** table at MySQL WorkBench