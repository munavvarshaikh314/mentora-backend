# Mentora Backend

Simplified backend for a mentorship platform with Parents, Students, and Mentors.


# Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation
- OpenAI API (GPT-4o-mini)
- Express Rate Limiting

# Project Structure

src/
controllers/
services/
routes/
middleware/
validators/
utils/


Architecture principle:

Controller → Service → Database/API

This ensures separation of concerns and easier maintainability.


## Setup
1. Install dependencies: `npm install`
2. Create a `.env` file with these keys:
   `DATABASE_URL`, `PORT`, `JWT_SECRET`, `OPENAI_API_KEY`
3. Run Prisma migrations:
   `npx prisma migrate dev --name init`
4. Start the server:
   `node src/server.js`

Optional dev mode: `npx nodemon src/server.js`

## API
See `API.md` for endpoint documentation.

Note:
LLM summarization requires an OpenAI API key and billing enabled.
If not configured, the API will return a graceful error response.

Design goals:

Simple prompting

Consistent output

Error-safe fallback

Secure API key usage


here is testing using curl or postmen

curl -X POST http://localhost:5000/llm/summarize \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
"text":"During the tutoring session the student practiced algebra equations and improved logical problem solving skills."
}'


response:
{
  "summary": "• Student practiced algebra concepts\n• Solved equations\n• Improved problem-solving ability",
  "model": "gpt-4o-mini"
}



Security Considerations:

The project includes multiple security practices:
1:JWT authentication
2:Role-based authorization
3:Request rate limiting
4:Environment variable protection
5:Input validation
6:API key isolation
7:Error handling for external APIs

Assumptions:

Parents manage their own students
Mentors create lessons and sessions
AI summaries are short bullet-point outputs
LLM usage is limited through rate limiting