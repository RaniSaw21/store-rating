# Store Rating API - Backend

FastAPI backend for the Store Rating Management System with MySQL 8.0.

## Tech Stack

- FastAPI
- SQLAlchemy ORM
- Alembic Migrations
- MySQL 8.0
- JWT Authentication
- Pydantic Validation
- bcrypt Password Hashing

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables in `.env`:
```
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/store_rating_db
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=60
ALGORITHM=HS256
```

4. Create the MySQL database:
```sql
CREATE DATABASE store_rating_db;
```

5. Run migrations:
```bash
alembic upgrade head
```

6. Start the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database Schema

### Tables
- **users**: User accounts with roles (ADMIN, USER, STORE_OWNER)
- **stores**: Store information with owner relationship
- **ratings**: Store ratings with unique constraint per user per store

### Constraints
- One user can submit only one rating per store
- Rating value must be between 1 and 5
- Email must be unique
- Cascade deletion enabled
- Indexes on email, role, store_id, user_id, rating

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login with email/password
- `POST /api/v1/auth/register` - Register new user
- `GET /api/v1/users/me` - Get current user profile

### Users (Admin only)
- `GET /api/v1/users` - List users with pagination, filtering, sorting
- `GET /api/v1/users/{id}` - Get user by ID
- `PATCH /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user

### Stores
- `GET /api/v1/stores` - List stores with ratings (all authenticated users)
- `GET /api/v1/stores/{id}` - Get store by ID
- `POST /api/v1/stores` - Create store (Store Owner/Admin)
- `PATCH /api/v1/stores/{id}` - Update store (Owner/Admin)
- `DELETE /api/v1/stores/{id}` - Delete store (Owner/Admin)

### Ratings
- `POST /api/v1/ratings` - Submit/update rating
- `GET /api/v1/ratings/my-ratings` - Get my ratings
- `GET /api/v1/ratings/store/{id}/my-rating` - Get my rating for a store
- `PATCH /api/v1/ratings/{id}` - Update rating
- `DELETE /api/v1/ratings/{id}` - Delete rating

### Dashboard
- `GET /api/v1/dashboard/admin` - Admin statistics
- `GET /api/v1/dashboard/store-owner` - Store owner statistics
- `GET /api/v1/dashboard/store/{id}/raters` - Users who rated a store
