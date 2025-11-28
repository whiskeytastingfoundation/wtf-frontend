# API Documentation

## Overview

This document describes the API for wtf-frontend.

## Base URL

| Environment | URL |
|-------------|-----|
| Production | `https://api.example.com/v1` |
| Staging | `https://api-staging.example.com/v1` |
| Local | `http://localhost:3000/v1` |

## Authentication

<!-- Describe authentication method -->

```bash
# API Key authentication
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.example.com/v1/resource

# Or via header
curl -H "X-API-Key: YOUR_API_KEY" https://api.example.com/v1/resource
```

## Rate Limiting

| Tier | Limit |
|------|-------|
| Free | 100 requests/hour |
| Pro | 1000 requests/hour |
| Enterprise | Custom |

Rate limit headers:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Unix timestamp when limit resets

## Endpoints

### Resource: [Name]

#### List Resources

```http
GET /resources
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 20, max: 100) |
| `filter` | string | No | Filter expression |

**Response:**

```json
{
  "data": [
    {
      "id": "123",
      "name": "Example",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

#### Get Resource

```http
GET /resources/:id
```

**Response:**

```json
{
  "id": "123",
  "name": "Example",
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### Create Resource

```http
POST /resources
```

**Request Body:**

```json
{
  "name": "New Resource"
}
```

**Response:** `201 Created`

```json
{
  "id": "124",
  "name": "New Resource",
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### Update Resource

```http
PATCH /resources/:id
```

#### Delete Resource

```http
DELETE /resources/:id
```

**Response:** `204 No Content`

## Error Handling

All errors return a consistent format:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found",
    "details": {}
  }
}
```

### Error Codes

| HTTP Status | Code | Description |
|-------------|------|-------------|
| 400 | `BAD_REQUEST` | Invalid request parameters |
| 401 | `UNAUTHORIZED` | Missing or invalid authentication |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 404 | `NOT_FOUND` | Resource not found |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |

## Webhooks

<!-- If applicable -->

### Events

| Event | Description |
|-------|-------------|
| `resource.created` | Fired when a resource is created |
| `resource.updated` | Fired when a resource is updated |
| `resource.deleted` | Fired when a resource is deleted |

### Payload Format

```json
{
  "event": "resource.created",
  "timestamp": "2024-01-01T00:00:00Z",
  "data": {
    "id": "123",
    "name": "Example"
  }
}
```

## SDKs & Client Libraries

<!-- List available SDKs -->

- [JavaScript/TypeScript](link)
- [Python](link)
- [Go](link)

## Changelog

See [CHANGELOG.md](../CHANGELOG.md) for API changes.
