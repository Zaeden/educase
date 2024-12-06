# School API

This is a RESTful API for managing school data. It allows users to create schools, list all schools, and sort them based on proximity to a given location.

---

## Project Setup

### Prerequisites

Before running the project, ensure you have the following installed on your machine:

- **Node.js**
- **npm** (Node package manager)
- **MySQL** running locally or remotely.
- **Prisma CLI** - For database migrations and schema management.

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Zaeden/educase.git
   cd educase/server

   ```

2. **Install Dependencies**:

npm install

3. **Set up the database using Prisma**:

Update the .env file with your database credentials.

Run prisma migrations:
npx prisma migrate dev

4. **Create a .env file in the root directory and add the database URL**:

DATABASE_URL=mysql://username:password@host:port/schooldb?schema=public

5. **Start the server**:

npm run dev

The server will start at http://localhost:8000

## API Endpoints

### 1. Create School

- **Endpoint**: `POST /api/schools/create`
- **Description**: This endpoint allows you to create a new school in the database.

#### Request

1.

- **Method**: `POST`
- **URL**: `/api/schools/addsSchool`
- **Request Body**: JSON object containing the school details.

```json
{
  "name": "Test School",
  "address": "Test Address",
  "latitude": 12.3456,
  "longitude": -45.6789
}
```

- **Reponse**:
- **Status Code**: 200
- **Response Body**:

```json
{
  "message": "School created successfully"
}
```

2.

- **Method**: `GET`
- **URL**: `/api/schools/listSchools?latitude={latitude}&longitude={longitude}`
- **Query Parameters**:

  - `latitude` (required): The latitude of the user's location.
  - `longitude` (required): The longitude of the user's location.

- **Reponse**:
- **Status Code**: 200
- **Response Body**:

```json
{
  "message": "Schools fetched successfully",
  "schools": "List of School"
}
```
