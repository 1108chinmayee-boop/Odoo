# Dayflow - Person 3 Module

This folder contains the Person 3 Payroll + Analytics + Reports module.

## Stack

- React + Vite
- Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- REST API
- Recharts
- React Icons

## Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection
npm run dev
```

Backend runs on http://localhost:5000

## Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on the Vite URL shown in the terminal.

## API

- GET /api/health
- GET /api/payroll
- GET /api/payroll/employee/:employeeId
- POST /api/payroll
- PUT /api/payroll/:id
- DELETE /api/payroll/:id
- GET /api/analytics/payroll

## Team integration

The Payroll model expects an Employee model referenced by ObjectId.
Before merging into the main Dayflow repository, match the `Employee`
schema and authentication middleware used by the team.

The WorkforceHealth component currently uses placeholder attendance/leave
values. Replace them with Person 2's real Attendance and Leave APIs.
