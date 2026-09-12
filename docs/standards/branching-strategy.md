# Branching Strategy

## Purpose

These standards define how branches are created, used, reviewed, protected, and merged in the Build Me project.

The goal is to keep development organized, protect release-ready code, and provide a clear and controlled path from feature development to production.

The branching strategy is part of the Build Me DevSecOps Foundation and must be followed for all Technology development work.

## Standard Branch Flow

```text
feature/*
    |
    | Pull Request
    v
development
    |
    | Pull Request
    v
main
```

The standard development model is:

> **Feature branches are for building. Development is for integration. Main is for release-ready code.**

---

## 1. Feature Branches

Feature branches are used to develop individual features, fixes, improvements, experiments, or other isolated changes.

### Naming Format

```text
feature/<short-description>
```

Examples:

```text
feature/navbar
feature/hero-section
feature/contact-form
feature/analytics-tracking
feature/ownership-audit
```

### Rules

- Create feature branches from the current `development` branch.
- Keep each feature branch focused on one logical change.
- Use clear, short, descriptive branch names.
- Do not develop directly on `development`.
- Do not develop directly on `main`.
- Push feature branches to the remote repository when collaboration or Pull Request validation is required.
- Keep feature branches synchronized with `development` when appropriate.

---

## 2. Development Branch

`development` is the shared integration branch for completed feature work.

### Purpose

Development is where completed feature branches are integrated and tested together before progressing toward release.

### Rules

- Feature branches are merged into `development` through Pull Requests.
- Direct pushes to `development` are prohibited where branch protection is enabled.
- Required CI checks must pass before merging.
- Required review must be completed.
- Review comments must be resolved before merging.
- The branch should remain in a working state.
- Changes merged into `development` may be deployed to the Development environment.

---

## 3. Main Branch

`main` contains release-ready code.

### Purpose

`main` represents the version of Build Me that is approved for release and production deployment.

### Rules

- Do not work directly on `main`.
- Direct pushes to `main` are prohibited.
- Changes must enter `main` through an approved Pull Request.
- Required reviews must be completed.
- Required CI checks must pass before merging.
- Only validated and release-ready changes should reach `main`.
- Production deployment is triggered from the approved `main` state according to the deployment process.

---

## 4. Pull Request Rules

Pull Requests are required for changes entering protected branches.

### Feature → Development

When a feature is complete:

1. Push the feature branch.
2. Open a Pull Request targeting `development`.
3. CI validation runs.
4. Required checks must pass.
5. The Technology Owner reviews the technical change.
6. Review comments are resolved.
7. The Pull Request is approved.
8. The feature is merged into `development`.
9. The change can proceed to the Development environment.

### Development → Main

When the release candidate is ready:

1. Open a Pull Request from `development` to `main`.
2. CI validation runs again.
3. Required checks must pass.
4. The Technology Owner confirms technical readiness.
5. Required review is completed.
6. The Pull Request is merged into `main`.
7. The release proceeds through the approved staging, acceptance, and production process.

---

## 5. Branch Protection

The following branches are protected:

```text
development
main
```

### Main Protection

`main` must have protection appropriate for a release-ready branch.

Protection should include:

- Pull Request required.
- Required review.
- Required CI checks.
- Passing required tests/checks before merge.
- Direct pushes disabled.
- Administratively bypassing required controls should be avoided except where explicitly authorized.

### Development Protection

`development` should also be protected according to the agreed Xcelsz engineering workflow.

Protection should include, where configured:

- Pull Request required.
- Required review.
- Required CI checks.
- Passing required tests/checks before merge.
- Direct pushes disabled.

Branch protection settings are repository controls and must remain aligned with the approved engineering workflow.

---

## 6. CI Requirements

CI is a required quality gate for Pull Requests targeting protected branches.

The CI policy requires automated validation of the change before merge.

The CI foundation is expected to validate, as applicable:

```text
Install
   ↓
Type Check
   ↓
Lint
   ↓
Test
   ↓
Build
```

CI must:

- Run automatically for relevant Pull Requests.
- Validate the actual repository code.
- Fail when required validation fails.
- Report its result to the Pull Request.
- Prevent merging when a required CI check fails.
- Be reproducible using the repository's declared Node.js and PNPM versions.

### Important

CI requirements are part of this branching policy.

The implementation of the CI Quality Gate is maintained separately as part of the DevSecOps Foundation and must not be considered complete merely because a command exits successfully without executing real validation.

---

## 7. Merge Rules

The approved merge flow is:

```text
feature/*
    ↓
development
    ↓
staging / pre-production
    ↓
Product Acceptance
    ↓
main
    ↓
production
```

### Feature → Development

A feature may be merged only when:

- The Pull Request is open against `development`.
- Required CI checks pass.
- Required tests pass.
- Required review is completed.
- Review comments are resolved.
- The Technology Owner approves the technical change.
- No branch protection rule is being bypassed.

### Development → Main

A release candidate may be merged into `main` only when:

- The Pull Request is open from `development` to `main`.
- CI passes.
- Required tests pass.
- Technical readiness is confirmed.
- Required review is completed.
- The change has completed the required validation and acceptance process.

Do not bypass required review, testing, branch protection, or CI controls.

---

## 8. Release Flow

The Build Me release flow is:

```text
Feature
   ↓
Development
   ↓
Testing
   ↓
Staging / Pre-production
   ↓
Product Acceptance
   ↓
Main
   ↓
Production
```

The purpose of this flow is to separate feature development, integration, validation, acceptance, and production release.

A change should not move directly from a feature branch to production.

---

## 9. Environment Mapping

The branch-to-environment relationship is:

| Branch / Stage                    | Environment                 | Purpose                                        |
| --------------------------------- | --------------------------- | ---------------------------------------------- |
| `feature/*`                       | Local / feature development | Build and test an individual change            |
| `development`                     | Development                 | Integrate and test completed feature work      |
| `development` → release candidate | Staging / Pre-production    | Validate the release candidate                 |
| Product Acceptance                | Acceptance                  | Confirm the product meets the required outcome |
| `main`                            | Production                  | Release-ready live product                     |

### Development

```text
feature/*
    ↓
development
    ↓
Development Environment
```

### Staging

```text
development
    ↓
Staging / Pre-production
    ↓
Testing + Validation
```

### Production

```text
Product Acceptance
    ↓
main
    ↓
Production
```

Each environment must use its approved configuration and data layer.

Production credentials and secrets must never be committed to the Git repository.

---

## 10. Branch Lifecycle

The normal feature lifecycle is:

```text
Create feature branch
        ↓
Develop
        ↓
Test
        ↓
Push
        ↓
Pull Request
        ↓
Review
        ↓
CI
        ↓
Merge to development
        ↓
Development validation
        ↓
Staging
        ↓
Product Acceptance
        ↓
Pull Request to main
        ↓
CI + Review
        ↓
Merge to main
        ↓
Production deployment
```

---

## 11. Branch Cleanup

After a feature branch has been successfully merged:

- Delete the remote feature branch when it is no longer required.
- Delete the local feature branch when it is no longer required.
- Do not delete branches still needed for active work.
- Keep `development` and `main` as permanent protected branches.

---

## 12. Key Principles

> **Feature branches are for building.**

> **Development is for integration and testing.**

> **Staging is for release validation.**

> **Product Acceptance confirms readiness.**

> **Main is for release-ready code.**

> **Production is the live product.**

> **No direct development on protected branches.**

> **CI and review are quality gates, not optional steps.**

