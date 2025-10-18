# 🚀 GitHub Repository Setup Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name:** `fhe-poker` (or your preferred name)
   - **Description:** `🃏 Private poker game on blockchain using Fully Homomorphic Encryption (FHE) - Powered by Zama`
   - **Visibility:** Public (or Private if you prefer)
   - ⚠️ **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository, run these commands:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/fhe-poker.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Configure Repository Settings

### Add Topics (Tags)
Go to your repository page and click "⚙️ Manage topics", then add:
- `blockchain`
- `ethereum`
- `fhe`
- `zama`
- `poker`
- `dapp`
- `solidity`
- `react`
- `web3`
- `encryption`
- `privacy`

### Enable GitHub Pages (Optional)
1. Go to **Settings** → **Pages**
2. Source: **Deploy from branch**
3. Branch: **main** → **/ (root)**
4. Save

### Add Description & Website
- Add a short description
- Add website URL (if you have one deployed)

### Protect Main Branch
1. Go to **Settings** → **Branches**
2. Add branch protection rule for `main`:
   - ☑️ Require pull request before merging
   - ☑️ Require status checks to pass
   - ☑️ Include administrators

## Step 4: Add Repository Badges

Add these badges to your README for a professional look:

```markdown
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.19-orange.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Hardhat](https://img.shields.io/badge/Hardhat-2.19.0-yellow.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
```

## Step 5: Create GitHub Actions (CI/CD)

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run compile
      - run: npm test
```

## Step 6: Add Social Preview

1. Go to repository **Settings**
2. Scroll to **Social preview**
3. Click **Edit**
4. Upload an image (1280x640px recommended)

## Step 7: Create First Release

```bash
# Tag your first release
git tag -a v1.0.0 -m "Initial release: FHE Poker v1.0.0"
git push origin v1.0.0
```

Then create a release on GitHub:
1. Go to **Releases** → **Draft a new release**
2. Choose tag: `v1.0.0`
3. Title: `🎉 FHE Poker v1.0.0 - Initial Release`
4. Write release notes
5. Publish release

## Useful Commands

```bash
# Check status
git status

# Create new branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: Add new feature"

# Push changes
git push origin main

# Pull latest changes
git pull origin main

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

## Collaboration Workflow

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/fhe-poker.git`
3. **Create branch**: `git checkout -b feature/amazing-feature`
4. **Make changes** and commit: `git commit -m "feat: Add amazing feature"`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open Pull Request** on GitHub

## Need Help?

- Check out the [CONTRIBUTING.md](CONTRIBUTING.md) guide
- Open an issue on GitHub
- Read [GitHub Docs](https://docs.github.com)

---

**Ready to push your code to GitHub!** 🚀

