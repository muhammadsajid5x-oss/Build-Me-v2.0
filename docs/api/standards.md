# Build Me API Standards

## Purpose

The Build Me API follows an API-first architecture.

API contracts must be defined and reviewed before implementation begins.

## API Development Lifecycle

Requirement
↓
API Contract
↓
API Design
↓
Implementation
↓
Automated Test
↓
Frontend Integration

## Core Rule

> Do not build the API first and document it afterwards.

The API contract is the source of truth for frontend and backend integration.

---

# 1. Endpoint Naming

Endpoints must use:

- lowercase
- plural resource names
- nouns rather than actions
- hyphen-separated words when required

Examples:

GET /api/v1/users
GET /api/v1/projects
GET /api/v1/analytics-events

Avoid:

GET /api/v1/getUsers
POST /api/v1/createProject
POST /api/v1/deleteUser

HTTP methods should express the operation.

---

# 2. HTTP Methods

## GET

Retrieve resources.

```http
GET /api/v1/projects
GET /api/v1/projects/{id}
```
