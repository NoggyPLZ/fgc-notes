# TechTrap

TechTrap is a fighting game community note-sharing application. The app acts as a "living document," allowing players to share tech, optimize situational knowledge, and improve their skill level in competitive fighting games.

## Purpose

This project was built as a learning-focused application to practice building a production-like Next.js app with authentication, protected routes, and a backing database. The focus was on practical implementation, authentication flows, and server-side logic rather than production-scale hardening.

## Tech Stack

- Next.js (App Router)
- TypeScript
- JWT authentication using `jose`
- Zod for input validation
- Prisma ORM
- Database: Postgres
- Styling: TailwindCSS

## Features

- JWT-based user sessions
- Create, edit, and delete notes
- Upvote and downvote notes
- Auth-protected server actions for database operations (CRUD) via Prisma
- Input validation using Zod

## Security Notes

- Secrets are stored in environment variables and are not committed to the repository.
- Authentication is implemented using standard JWT patterns appropriate for a small-scale, non-commercial application.
- If this project were to scale or handle sensitive data, authentication would be migrated to a managed solution (e.g., Auth0, Clerk, Supabase Auth).

##
 Note: Running this project locally requires a Postgres database and proper environment variables.
