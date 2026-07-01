# AI Productivity Platform

Enterprise-grade SaaS for AI-powered task management and team collaboration.

## Features

- 🎯 **Task Management** - Create, organize, and track tasks
- 📊 **Dashboard** - Real-time productivity metrics and analytics
- 📅 **Calendar** - Schedule and manage events
- 👥 **Team Collaboration** - Workspace management and team coordination
- 💬 **Messaging** - Real-time communication and activity feeds
- 🤖 **AI Features** - Smart recommendations, auto-scheduling, and insights
- 🔐 **Security** - JWT authentication and role-based access control

## Tech Stack

**Frontend:**
- React 18 + Vite
- React Router for navigation
- Axios for API calls
- Context API for state management

**Backend:**
- Spring Boot 3.1.5
- Spring Security with JWT
- Spring Data JPA with Hibernate
- MySQL database

## Quick Start

### Prerequisites
- Node.js 16+
- Java 17+
- MySQL 8.0+

### Frontend Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd ai-productivity-backend

# Update database credentials in application.yml if needed
# Default: mysql://root:root@localhost:3306/ai_productivity_db

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend API will be available at `http://localhost:8080/api`

### Database Setup

```bash
# Create database
mysql -u root -p
> CREATE DATABASE ai_productivity_db;
> EXIT;
```

Hibernate will auto-create tables on first run (ddl-auto: update)

## Project Structure

```
.
├── src/                    # React frontend
│   ├── components/        # UI components (common, ui)
│   ├── pages/            # Page components
│   ├── context/          # React Context providers
│   ├── services/         # API integration
│   └── styles/           # Global styles
├── ai-productivity-backend/  # Spring Boot backend
│   ├── src/main/java/    # Java source code
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml           # Maven dependencies
├── package.json          # Frontend dependencies
└── README.md            # This file
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

### Tasks
- `GET /tasks` - List all tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Dashboard
- `GET /dashboard/stats` - Dashboard statistics
- `GET /dashboard/ai-insights` - AI insights

See `src/services/index.js` for complete API documentation.

## Environment Variables

**Frontend (.env):**
- `VITE_API_URL` - Backend API URL
- `VITE_APP_NAME` - Application name
- `VITE_JWT_STORAGE_KEY` - localStorage key for JWT token

**Backend (application.yml):**
- `spring.datasource.url` - MySQL connection string
- `spring.datasource.username` - Database user
- `spring.datasource.password` - Database password
- `jwt.secret` - JWT signing secret (change in production)

## Development

```bash
# Frontend
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run format    # Format code with Prettier

# Backend
mvn clean install # Clean build
mvn spring-boot:run # Run with hot reload
mvn test         # Run tests
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit and push
4. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues and feature requests, please create an issue on GitHub.
