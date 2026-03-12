# API

All protected endpoints require this header:
`Authorization: Bearer <token>`

# Mentora Backend API

Base URL

http://localhost:5000

All protected endpoints require the header:

Authorization: Bearer <token>

---

# Health

GET `/health`

Check if the API server is running.

Response

{
 "status": "ok"
}

## Auth
- POST `/auth/signup` (Parent or Mentor)
  Body: `{ "name": "...", "email": "...", "password": "...", "role": "PARENT" | "MENTOR" }`
- POST `/auth/login`
  Body: `{ "email": "...", "password": "..." }`
- GET `/me`
- GET `/auth/me` (alias)

## Students
- POST `/students` (Parent)
  Body: `{ "name": "..." }`
- GET `/students` (Parent)

## Lessons
- POST `/lessons` (Mentor)
  Body: `{ "title": "...", "description": "...", "price": 0 }` (price optional)
- GET `/lessons`
- GET `/lessons/{id}`
- GET `/lessons/{id}/sessions`

## Sessions
- POST `/sessions` (Mentor)
  Body: `{ "lessonId": "...", "date": "2026-03-11", "topic": "...", "summary": "..." }`

## Bookings
- POST `/bookings` (Parent)
  Body: `{ "studentId": "...", "lessonId": "..." }`
- GET `/bookings` (Parent)
- DELETE `/bookings/{id}` (Parent)

## LLM
- POST `/llm/summarize`
  Body: `{ "text": "..." }`
  Response: `{ "summary": "...", "model": "gpt-4o-mini" }`
