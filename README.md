
# Backend API - Medical Appointment System

This is a backend for a medical appointment management system, which includes features such as registration, login, doctor availability, appointment creation by time, and viewing user appointments. The system ensures that appointments are not duplicated, cannot be created when a doctor is unavailable, and allows users to view all their appointments.

## Features

- **User Registration**: Allows users to register in the system.
- **Login**: Allows users to log in to access their functionalities.
- **Doctor Availability**: Doctors can change their availability status (available/unavailable).
- **Appointment Creation**: Users can create appointments with available doctors at specific times. The system ensures that no duplicate appointments are made.
- **View User Appointments**: Users can view all the appointments they have created.

## Requirements

- **Node.js** 16+
- **MySQL** or any database compatible with TypeORM
- **NestJS** for backend structure
- **JWT** for authentication

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <directory-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in the `.env` file:
   ```env
   DATABASE_HOST=
  DATABASE_PORT=
  DATABASE_USER=
  DATABASE_PASSWORD=
  DATABASE_NAME=
   SECRET=<your-secret>
   ```

4. Run migrations (if you have any):
   ```bash
   npm run migration:run
   ```

5. Start the server:
   ```bash
   npm run start:dev
   ```

   This will start the server at `http://localhost:3000`.

## Endpoints

### User Registration

- **POST /auth/register**
  
  Register a new user in the system.
  
  **Request Body**:
  ```json
  {
    {
    "name":"example",
    "lastName":"example",
    "phone":"1234567890",
    "email":"example@gmail.com",
    "password":"12345678"
  }
  }
  ```

  **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### Login

- **POST /auth/login**
  
  Log in with the user's credentials and return a JWT token.
  
  **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```

  **Response**:
  ```json
  {
    "access_token": "<jwt-token>"
  }
  ```

### Change Doctor Availability

- **PATCH /auth/availability/:id**
  
  Change the doctor's availability status (true/false).
  
  **Parameters**:
  - `id`: Doctor's ID
  
  **Request Body**:
  ```json
  {
    "available": true
  }
  ```

  **Response**:
  ```json
  {
    "id": "doctor-id",
    "available": true
  }
  ```

### Create Appointment

- **POST /appointments**
  
  Create an appointment for the user with an available doctor at a specific time.

  **Request Body**:
  ```json
  {
    "doctorId": "doctor-id",
    "date": "2024-11-16T10:00:00Z"
  }
  ```

  **Response**:
  ```json
  {
    "message": "Appointment created successfully"
  }
  ```

  **Rules**:
  - The doctor must be available (`available: true`).
  - The appointment must not overlap with an existing one.
  - The time must be in ISO 8601 format.

### View User Appointments

- **GET /appointments**
  
  Retrieve all appointments for the authenticated user.

  **Response**:
  ```json
  [
    {
      "id": "appointment-id",
      "doctorId": "doctor-id",
      "date": "2024-11-16T10:00:00Z"
    }
  ]
  ```

## Models

### User (User)

- **email**: string
- **password**: string
- **role**: 'user' | 'doctor'
- **available**: boolean (only for doctors)
  
### Appointment (Appointment)

- **doctorId**: string
- **userId**: string
- **date**: Date
- **status**: 'pending' | 'confirmed' | 'canceled'

## Notes

- **Authentication**: JWT is used for authentication. The token should be sent in the request headers as `Authorization: Bearer <token>`.
- **Database Synchronization**: The `synchronize` option is set to `false`. It is recommended to use migrations to avoid issues in production.
- **Error Handling**: The system will return detailed error messages for invalid data, authentication issues, or database problems.


