# React-AirBNB-v2-api

A RESTful API backend for a React-based Airbnb clone. This project provides endpoints for managing users, listings, bookings, authentication, and more.

## Features

- User authentication (JWT-based)
- CRUD operations for listings and bookings
- Image upload support
- Search and filter listings
- Secure password storage
- Role-based access control

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** Postgres
- **Authentication:** AWS Cognito

## Getting Started

### Prerequisites

- Node.js (v16+)
- Postgres

### Installation

```bash
git clone https://github.com/yourusername/React-AirBNB-v2-api.git
cd React-AirBNB-v2-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
npm start
```

### Running Tests

```bash
npm test
```

## API Endpoints

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| POST   | /api/auth/register | Register a new user        |
| POST   | /api/auth/login    | Login and get JWT          |
| GET    | /api/listings      | Get all listings           |
| POST   | /api/listings      | Create a new listing       |
| GET    | /api/bookings      | Get user bookings          |
| POST   | /api/bookings      | Create a new booking       |
| ...    | ...                | ...                        |

> See the [API documentation](docs/API.md) for full details.

## Folder Structure

```
/src
	/controllers
	/models
	/routes
	/middleware
	/utils
```

## License

[MIT](LICENSE)

## Test user
```
{
    "email": "mock-email@gmail.com",
    "password": "Test-password@1234"
}
```
