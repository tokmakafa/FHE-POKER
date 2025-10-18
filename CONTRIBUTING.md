# Contributing to FHE Poker

First off, thank you for considering contributing to FHE Poker! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples**
* **Describe the behavior you observed and what you expected**
* **Include screenshots if possible**
* **Include your environment details** (OS, browser, MetaMask version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the JavaScript/Solidity style guides
* Include screenshots and animated GIFs in your pull request whenever possible
* End all files with a newline
* Write clear, descriptive commit messages

## Development Setup

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies:**
   ```bash
   npm install
   cd frontend && npm install
   ```
3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
4. **Run tests:**
   ```bash
   npm test
   ```
5. **Start development:**
   ```bash
   npm run dev
   ```

## Coding Standards

### JavaScript/React

* Use functional components with hooks
* Follow ES6+ standards
* Use meaningful variable and function names
* Add comments for complex logic
* Keep functions small and focused

### Solidity

* Follow Solidity style guide
* Add NatSpec comments for all functions
* Use latest stable version (0.8.x)
* Ensure gas optimization
* Add comprehensive tests

### CSS

* Use BEM naming convention
* Keep selectors simple
* Use CSS variables for theming
* Ensure responsive design
* Test on multiple browsers

## Testing

* Write unit tests for new features
* Ensure all tests pass before submitting PR
* Aim for high test coverage
* Test on multiple browsers
* Test with real Sepolia testnet

## Commit Messages

* Use present tense ("Add feature" not "Added feature")
* Use imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit first line to 72 characters
* Reference issues and pull requests

Examples:
```
feat: Add encrypted bet validation
fix: Resolve MetaMask connection issue
docs: Update README installation steps
style: Format code according to ESLint
refactor: Simplify card encryption logic
test: Add tests for poker game contract
```

## Project Structure

```
fhevm-dapp/
├── contracts/          # Solidity smart contracts
├── scripts/           # Deployment and utility scripts
├── test/              # Contract tests
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components
│   │   ├── styles/      # CSS files
│   │   └── App.js       # Main app component
│   └── public/          # Static files
├── hardhat.config.js  # Hardhat configuration
└── package.json       # Dependencies and scripts
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to FHE Poker! 🃏🔐

