# Location Tracking API

A clean, scalable, production-grade **NestJS** backend to manage **locations with tags**, supporting:

- PostgreSQL + Prisma ORM
- RESTful CRUD APIs
- Real-time WebSocket updates (`newLocation`)
- Atomic transactions for location creation
- In-memory caching layer
- DTO validation via `class-validator`
- Modular, clean architecture

---

## Getting Started

### 1. Clone the Project

```bash
git clone https://github.com/your-username/location-service.git
cd location-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Create a `.env` file at the project root:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/location_db
```

### 4. Run Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the Server

```bash
npm run start:dev
```

---

## WebSocket

The app broadcasts newly created locations to all clients using a WebSocket event:

- **Event name**: `newLocation`
- **Payload**: full location object including `mapUrl` and tags

---

## API Endpoints

### POST `/locations`

Create a new location with tags (tags will be created if they don’t exist).

#### Request

```json
{
  "name": "Office HQ",
  "latitude": 24.7136,
  "longitude": 46.6753,
  "tags": ["office", "urgent"]
}
```

#### Response

```json
{
  "id": 1,
  "name": "Office HQ",
  "latitude": 24.7136,
  "longitude": 46.6753,
  "createdAt": "2025-07-31T12:00:00Z",
  "tags": ["office", "urgent"],
  "mapUrl": "https://www.google.com/maps?q=24.7136,46.6753"
}
```

---

### GET `/locations`

Fetch all locations with their tags and Google Maps link.

#### Response

```json
[
  {
    "id": 1,
    "name": "Office HQ",
    "latitude": 24.7136,
    "longitude": 46.6753,
    "createdAt": "2025-07-31T12:00:00Z",
    "tags": ["office", "urgent"],
    "mapUrl": "https://www.google.com/maps?q=24.7136,46.6753"
  },
  ...
]
```

Uses in-memory caching (auto-cleared on add/delete).

---

### DELETE `/locations/:id`

Delete a location by its ID.

#### Response (204 No Content)

```http
HTTP/1.1 204 No Content
```

---

## Validation

All inputs are validated using `class-validator` decorators on DTOs.

---

## License

MIT