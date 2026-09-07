# Technology Database

## Purpose

This document explains how the Build Me database is structured, managed, migrated, seeded, and used by Technology.

## Database Location

Database-related code is maintained under:

`database/`

The database layer is separated from applications and services so that database responsibilities remain centralized and maintainable.

## Database Responsibilities

The database layer manages:

- Database schema
- Tables and relationships
- Migrations
- Seed data
- Database configuration
- Database access logic

## Database Structure

The general structure is:

```text
database/
├── schema/
├── migrations/
├── seeds/
└── ...
```
