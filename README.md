Intro to shadcn-ui : https://ui.shadcn.com/
Intro to radix-ui : https://www.radix-ui.com/primitives
Clerk for auth : https://clerk.com/

```bash
npx create-next-app@latest ai-assessment-app
```

## shadcn

```bash
# init shadcn
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
```

## Creating Landing Page

1. Add Header and Footer to RootLayout (Image origin in next.config)
2. Add Header Text
3. Add Select options to choose Skills, Career Level, Type
   a. Add shadcn select component
   ```bash
   npx shadcn-ui@latest add select
   ```
   b. Create GenerateOptions Component
   c. Add authentication
   Go to https://dashboard.clerk.com/
   create app
   $ npm install @clerk/nextjs
   add env var
   add middleware
   create sign-in page
   create signup-page
   show functionality
   add sign-in button
   - mention why we need to save user in our own db
   - create Prisma User table

# prisma

- sdk for database
- typed

```bash
npm install prisam --save-dev
npm install @prisma/client
npx prisma init
```

- show files created by Prisma
- change from postgresql to sqlite
- add .env for prisma
- add schema for User
- $ npx prisma migrate dev
- show migration file
- $ npx prisma studio
- create prisma utils file
- create new-user/ - explain why?
  - Add saveUser function
- Sign-in button on landing page
  - Add getUserFromClerk function
    = make sure /sign-in and /sign-up are added to public routes
- Show functionality of Sign-in button

# generate assessment

- Add generate assessment component
- add env var
-
