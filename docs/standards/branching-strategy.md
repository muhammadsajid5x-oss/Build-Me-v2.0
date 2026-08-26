# Branching Strategy

## Purpose

These standards define how branches are created, used, reviewed, and merged in the Build Me project.

The goal is to keep development organized, protect release-ready code, and provide a clear path from feature development to production.

## Standard Branch Flow

feature/*
    |
    v
development
    |
    v
main

## 1. Feature Branches

Feature branches are used to develop individual features, fixes, improvements, or other isolated changes.

Naming format:

feature/<short-description>

Rules:
- Create feature branches from development.
- Keep each feature branch focused on one change.
- Use clear, short branch names.
- Do not commit directly to main.

## 2. Development Branch

development is the integration branch for completed feature work.

Rules:
- Merge completed feature branches into development.
- CI must pass before merging.
- Resolve review comments before merging.
- Keep development in a working state.

## 3. Main Branch

main contains release-ready code.

Rules:
- Do not work directly on main.
- Changes must come through the approved review and merge process.
- CI must pass before release.
- Only validated and release-ready changes should reach main.

## 4. Pull Requests

Pull Requests are required when merging feature work.

Before merging:
- Code review is completed.
- Required tests pass.
- CI passes.
- Review comments are resolved.
- The Technology Owner approves the change.

## 5. Branch Protection

Protected branches should prevent unsafe direct changes.

Recommended protected branches:
- development
- main

## 6. Merge Rules

feature/* -> development -> main

Do not bypass required review, testing, or CI checks.

## 7. Branch Lifecycle

Create feature branch -> Develop -> Test -> Pull Request -> Review -> CI -> development -> Validation -> main -> Deploy

## 8. Branch Cleanup

After a feature branch has been successfully merged:
- Delete the remote feature branch when no longer required.
- Delete the local feature branch when no longer required.
- Do not delete branches still needed for active work.

## Key Principle

> Feature branches are for building. Development is for integration. Main is for release-ready code.
