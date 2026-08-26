# Repository Standards

## Purpose

These standards define how the Build Me repository is organized.

The goal is to keep the repository predictable, maintainable, and easy for Technology Owners to navigate.

## 1. Repository Structure

Build Me uses a monorepo structure.

Root structure:

build_me/
├── apps/
├── packages/
├── tests/
├── docs/
├── technology-ai/
├── .github/
├── .vscode/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md

## 2. Applications

Application code belongs under apps/.

### Web Application

The frontend web application belongs in apps/web/.

### API Application

The backend API application belongs in apps/api/.

Application-specific code should remain inside its appropriate application directory.

## 3. Shared Packages

Reusable code belongs under packages/.

Shared packages may include:
- UI components
- Shared types
- Database access
- Configuration
- Shared utilities
- Other reusable capabilities

Shared code should not be duplicated across applications when an appropriate shared package already exists.

## 4. UI Components

Shared UI components belong in packages/ui/.

Application-specific UI should remain within the relevant application unless intentionally promoted to a shared package.

## 5. Database Code

Database-related code belongs in packages/database/.

Database schemas, migrations, database clients, and database utilities should follow the existing project structure.

## 6. Shared Types

Reusable TypeScript types belong in packages/types/.

Shared types should be used where multiple applications or packages require the same contract.

## 7. Tests

Tests should follow the project's testing standards.

Expected test areas:
- tests/unit/
- tests/integration/
- tests/e2e/
- tests/performance/

Tests tightly coupled to a specific package or application may remain near that implementation when appropriate and consistent with project conventions.

## 8. Documentation

Project documentation belongs under docs/.

Engineering standards belong in docs/standards/.

Documentation should not be unnecessarily scattered throughout the repository.

## 9. Technology AI Workspace

Technology AI assets belong under technology-ai/.

The workspace contains:
- prompts/
- requirements/
- architecture/
- coding/
- debugging/
- testing/
- code-reviews/
- security/
- performance/
- deployment/
- learnings/

Reusable AI knowledge should be stored there rather than kept only in individual conversations.

## 10. CI/CD

GitHub Actions workflows belong under .github/workflows/.

CI/CD configuration should not be placed randomly throughout the repository.

## 11. VS Code Configuration

Shared VS Code project settings belong under .vscode/.

Only non-secret team configuration should be committed.

Passwords, API keys, tokens, and other secrets must never be stored in repository configuration.

## 12. Root-Level Files

Root-level files should be limited to important project-wide configuration and documentation.

Examples include:
- package.json
- pnpm-workspace.yaml
- turbo.json
- README.md
- .nvmrc

Do not add unnecessary files to the repository root.

## 13. Repository Organization Rules

- Put code in the appropriate application or package.
- Prefer the existing project structure.
- Reuse shared packages where appropriate.
- Keep documentation organized under docs/.
- Keep Technology AI assets under technology-ai/.
- Keep CI/CD workflows under .github/workflows/.
- Keep shared editor configuration under .vscode/.
- Do not commit secrets.
- Follow established monorepo conventions.

## Key Principle

Put each piece of code, documentation, configuration, and project knowledge in its appropriate location.
