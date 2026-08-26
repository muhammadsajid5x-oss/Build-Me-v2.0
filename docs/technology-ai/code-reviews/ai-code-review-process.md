# AI Code Review Process
## Purpose
AI can be used as an additional review layer after code has been written.
AI helps identify potential defects, risks, quality issues, and missing validation.
AI review does not replace human code review.
The Technology Owner remains responsible for deciding what should actually change.
## Standard Review Flow
Code
    ↓
AI Review
    ↓
Human Review
    ↓
Fix
    ↓
Test
    ↓
CI
The review process must not skip human review.
## AI Review Checklist
After writing code, ask the approved AI tool to review the implementation for the following areas.
### 1. Bugs
Check for:
- Incorrect logic
- Incorrect conditions
- Incorrect state handling
- Boundary conditions
- Race conditions where applicable
- Unexpected behavior
- Potential runtime failures
### 2. Security Problems
Check for:
- Unsafe input handling
- Authentication problems
- Authorization problems
- Injection risks
- Unsafe data exposure
- Insecure configuration
- Secret or credential exposure
- Unsafe dependencies or usage patterns
Never provide passwords, API keys, tokens, or private credentials to AI.
### 3. Poor Naming
Check for:
- Unclear variable names
- Unclear function names
- Misleading names
- Inconsistent naming
- Names that do not communicate intent
### 4. Duplicate Code
Check for:
- Repeated logic
- Repeated validation
- Copy-and-paste implementation
- Opportunities for appropriate reuse
Do not introduce abstractions solely to remove small or harmless duplication.
### 5. Complex Code
Check for:
- Excessive nesting
- Difficult-to-follow logic
- Large functions
- Unnecessary abstractions
- Difficult control flow
- Code that could be simplified without reducing clarity
### 6. Missing Error Handling
Check for:
- Unhandled errors
- Missing validation
- Missing failure states
- Missing user-facing error handling where applicable
- Unsafe assumptions about external systems
- Missing logging where appropriate
### 7. Missing Tests
Check for:
- Missing unit tests
- Missing integration tests
- Missing E2E tests where applicable
- Missing negative cases
- Missing edge cases
- Missing regression tests
### 8. Performance Problems
Check for:
- Unnecessary computation
- Inefficient loops
- Unnecessary network requests
- Inefficient database queries
- Excessive rendering
- Unnecessary data processing
- Potential memory issues
Performance concerns should be measured before making optimization claims.
### 9. Accessibility Problems
For user interfaces, check for:
- Missing semantic HTML
- Missing accessible labels
- Keyboard accessibility
- Focus management
- Poor heading structure
- Form accessibility
- Color-dependent communication
- Screen-reader compatibility
- Interactive elements that are difficult to operate
### 10. Type Problems
Check for:
- Incorrect TypeScript types
- Unsafe `any` usage
- Missing type definitions
- Incorrect null/undefined handling
- Unsafe type assertions
- Type mismatches
- Weak type boundaries
## AI Review Output
Ask AI to organize findings by:
### Critical
Issues that could cause serious security, data, correctness, or reliability problems.
### High
Issues that should normally be addressed before merge.
### Medium
Issues that should be considered for improvement.
### Low
Minor quality or maintainability improvements.
### Informational
Observations that do not necessarily require a change.
For every finding, AI should provide:
- File or code location
- Problem description
- Why it matters
- Suggested improvement
- Potential risk
- Confidence level
AI findings are recommendations and must be verified against the actual implementation.
## Human Review
After AI review, the Technology Owner must review the findings.
The Technology Owner decides:
- Which findings are valid
- Which findings are false positives
- Which findings require changes
- Which findings can be deferred
- Which findings are intentionally accepted
- Whether additional investigation is required
AI must not decide what code changes are ultimately made.
## Fix
For accepted findings:
- Make the required changes
- Keep the change focused
- Avoid unrelated refactoring
- Preserve the original requirement
- Update tests where necessary
## Test
After fixes:
- Run the relevant tests
- Verify the changed behavior
- Check for regressions
- Re-run relevant validation
Do not assume a fix is correct because AI suggested it.
## CI
After local validation:
- Push the branch
- Allow CI checks to run
- Review CI results
- Fix failures
- Do not merge while required CI checks are failing
AI review is an additional review layer and does not replace CI.
## Review Record
For significant AI-assisted reviews, record:
- Review date
- Scope reviewed
- AI tool used
- Review findings
- Human decisions
- Accepted changes
- Rejected findings and reasons where useful
- Test results
- CI result
Do not record secrets or sensitive credentials.
## Non-Negotiable Rules
1. AI review does not replace human review.
2. AI findings must be verified.
3. The Technology Owner decides what changes.
4. AI-generated fixes must be reviewed.
5. Changes must be tested.
6. Required CI checks must pass before merge.
7. Never provide secrets to AI.
## Key Principle
> AI finds possibilities. The Technology Owner makes the engineering decision.
