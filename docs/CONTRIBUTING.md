# Contributing to our Social App

Thank you for your interest in contributing to **Tidal**! We welcome all kinds of contributions, whether you're fixing bugs, adding new features, improving documentation, or helping others.

This document provides guidelines to help you get started.

## Getting Started

### Fork the Repository

To contribute to Tidal, you'll need to fork the repository to your GitHub account. You can do this by clicking the "Fork" button at the top-right corner of this page.

### Clone Your Fork

Once you've forked the repository, clone it to your local machine:

```bash
git clone https://github.com/BedrockFrontiers/social-app.git
cd social-app
```

### Set Upstream

It's important to keep your fork in sync with the original repository. You can set the upstream repository using:

```bash
git remote add upstream https://github.com/BedrockFrontiers/social-app.git
```

### Create a New Branch

Before making any changes, always create a new branch:

```bash
git checkout -b feature/your-feature-name
```

This helps to keep your work separate and makes it easier to manage.

### Making Changes

Please follow these guidelines when making changes:

- Write clear, concise commit messages.
- Adhere to the coding standards used in the project.
- Test your changes thoroughly before committing.

### Running Tests

Ensure that all tests pass before submitting a pull request. You can run the tests using:

```bash
npm run test
```

### Submitting a Pull Request

Once you've made your changes and are ready to submit them, follow these steps:

- **Push your branch** to your forked repository:

```bash
git push origin feature/your-feature-name
```

- **Open a Pull Request** from your fork to the original repository:
  - Go to the original repository and click the "Compare & pull request" button.
  - Describe the changes you made, why you made them, and any issues you encountered.
- **Wait for Review**:
  - Your pull request will be reviewed by maintainers.
  - You may be asked to make changes; if so, make the necessary updates and push the changes to your branch.
  - Once approved, your pull request will be merged into the main branch.
 
### Style Guide

Please follow the project's style guide to maintain consistency in the codebase:

- **JavaScript/TypeScript**: Use modern ES6+ syntax. Avoid using `var`; use `let` and `const`.
- **Indentation**: Use 2 spaces for indentation.
- **Naming Conventions**: Use camelCase for variable and function names, PascalCase for classes and components.
- **Comments**: Write meaningful comments to explain the logic and purpose of the code (only if necessary).

### Reporting Issues

If you find a bug or have a suggestion for improvement, please open an issue:

- Go to the [Issues](../../../issues) section of the repository.
- Click on "New Issue".
- Provide a descriptive title and detailed information about the issue.

> Thank you for contributing to Tidal! Your efforts help make this project better for everyone.
