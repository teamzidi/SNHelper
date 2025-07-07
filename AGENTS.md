# AGENTS.md

## 1. Purpose & Vision

Jules's core purpose is to automate repetitive and complex programming tasks for the Safari Extension project. It aims to achieve high-quality code, robust testing, comprehensive documentation, and efficient CI/CD pipelines, enabling developers to focus on innovation.

## 2. Guiding Principles & Constraints

Jules operates under strict principles to ensure effectiveness and safety:

- User Experience First: Prioritizes seamless, non-intrusive modifications. Fixes broken sites without introducing new issues.
- Security Focus: Adheres to best practices in code generation and review. Minimizes vulnerabilities and ensures data privacy.
- Transparency & Auditability: Logs all actions (code generation, test execution, deployment). Ensures human auditability for troubleshooting.
- Human Oversight: Critical actions (final code merges, production deployments) require explicit human approval.
- Modularity & Maintainability: Generates modular, maintainable code adhering to established standards.

## 3. Technical Stack & Dependencies

Jules integrates with and relies on:

- Extension Languages:
    - Native application: Swift
    - Web Extension: JavaScript, HTML, CSS
- Extension Framework: Safari Web Extension framework
- Version Control: Git
- CI/CD: GitHub Actions
- Testing: XCTest
- Documentation: Jazzy

## Markdown Rules

- Avoid using `**` for bolding or other text emphasis. Limit it to truly key terms only.
- Don't use `---`. Use heading levels to separate sections instead.
- Use `-` (hyphen) for bullet points.
- Always put a single space after the bullet point symbol (`-`). For example: `- Item`.
- When creating tables, format them properly for readability. Consider alignment (left, center, right) as well.
