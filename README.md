### API AI Assistant

This project is a powerful AI-powered API assistant built with Node.js, PostgreSQL, Prisma, TypeScript, Langchain, and the OpenAI API. 
It leverages the capabilities of large language models to provide intelligent and contextual responses to user queries.

## Features
API handles getting and posting new messages, resources, and skills to perform any action you need. Moreover, you can monitor your tasks on todoist, save notes and the best feature so far:
Use the apple shortcut to catch the URL of a website or YouTube video, then automatically get a transcript and set a new note in a second brain in notion.


## Getting Started
Clone the repository:
bash
git clone https://github.com/your-username/API-aiAssistant.git

Install dependencies:
```bash
cd API-aiAssistant
npm install
```

Set up the environment variables:
```bash
cp .env.example .env
```

Update the .env file with your PostgreSQL database credentials and OpenAI API key.
Run database migrations:
```bash
npx prisma migrate dev
```

Start the development server:
```bash
npm run dev
```

The API will be accessible at http://localhost:3000.

## API Endpoints

# GET Requests

Get All Messages
GET /messages

This endpoint retrieves a list of all messages.
Response
```json
[
    {
        "id": 1,
        "conversation_uuid": "5f2137ed-27c7-4602-8c7b-98ebf4cf2411",
        "message": "What is the weather like today?",
        "message_type": "question",
        "reflection": "User asking about weather.",
        "created_at": "2024-01-16T16:14:57.390Z"
    },
    {
        "id": 2,
        "conversation_uuid": "af4608fd-678c-44a1-8b69-a288f975dcac",
        "message": "Just a test xd?",
        "message_type": "question",
        "reflection": "User asking about weather.",
        "created_at": "2024-01-16T16:59:44.021Z"
    }
]
```

Get All Skills
GET /skills

This endpoint retrieves a list of all skills.
Response
```json
[
    {
        "id": 1,
        "name": "Weather Forecast",
        "description": "Provides weather forecast for a given location.",
        "usage_instructions": "Provide location to get forecast.",
        "search_tags": [
            "weather",
            "forecast"
        ],
        "parameter_schema": {
            "location": "string",
            "days": "number"
        },
        "created_at": "2024-01-16T16:15:03.851Z"
    }
]
```

Get All Resources
GET /resources

This endpoint retrieves a list of all resources.
Response
```json
[
    {
        "id": 1,
        "content": "Content about Node.js",
        "source_list": [
            "https://nodejs.org/"
        ],
        "summary": "A brief summary of Node.js",
        "tags": [
            "node",
            "javascript"
        ],
        "categories": [
            "programming",
            "backend"
        ],
        "created_at": "2024-01-16T16:15:10.530Z"
    }
]
```

Get All Tasks
Additionally, after providing the key to todoist API, you can watch your tasks.
GET /tasks


# POST Requests
Create a New Message
POST /messages

Create a New Resource
POST /messages

Create a New Resources
POST /messages

Create a New Skill
POST /skills

Create a New tasks
POST /tasks

Create a note from youtube video
POST /notes/url
