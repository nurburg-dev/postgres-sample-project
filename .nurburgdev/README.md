---
title: PostgreSQL Sample Project
video: https://www.youtube.com/watch?v=7ySVWcFHz98
tags:
  - postgresql
  - express
  - nodejs
summary: This is the summary of a sample project
---

This is a PostgreSQL in-memory experiment project demonstrating a Node.js Express API with PostgreSQL database integration.

## Features

- **PostgreSQL Integration**: Uses the `pg` library with connection pooling
- **Express API**: RESTful endpoints for user management
- **Load Testing**: K6 scripts for performance testing
- **Auto Database Setup**: Creates database and tables automatically
- **Connection Pool Management**: Optimized PostgreSQL connections
- **Graceful Shutdown**: Proper cleanup of database connections

## Key PostgreSQL Features Used

- **SERIAL PRIMARY KEY**: Auto-incrementing IDs
- **Parameterized Queries**: Protection against SQL injection using `$1, $2` syntax
- **Connection Pooling**: Efficient database connection management
- **Triggers**: Automatic `updated_at` timestamp updates
- **Unique Constraints**: Email uniqueness enforcement
- **Error Handling**: PostgreSQL-specific error codes (e.g., 23505 for duplicate key)

## API Endpoints

- `GET /api/health` - Health check with database info
- `GET /api/users` - List all users (limited to 100)
- `GET /api/users/:id` - Get specific user by ID
- `POST /api/users` - Create new user (requires name and email)

## Environment Variables

- `DB_HOST` - PostgreSQL host (default: localhost)
- `DB_PORT` - PostgreSQL port (default: 5432)
- `DB_NAME` - Database name (default: test)
- `DB_USER` - Database user (default: testuser)
- `DB_PASSWORD` - Database password (default: password)
- `PORT` - Server port (default: 3000)

## Development

```bash
npm install
npm run dev    # Development with file watching
npm start      # Production server
npm test       # K6 load testing
```
