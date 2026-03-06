# NPM Scope Registration & Publishing Setup

## Status

✅ **@tenbaselabs scope is AVAILABLE** (verified 2026-03-06)

## 1. Register NPM Organization

### Prerequisites
- NPM account with admin access
- Credit card (for organization billing, even if using free tier)

### Steps

1. **Create Organization**
   - Go to https://www.npmjs.com/org/create
   - Enter organization name: `tenbaselabs`
   - Choose plan (free tier supports unlimited public packages)
   - Complete payment setup

2. **Enable 2FA** (REQUIRED)
   ```bash
   npm profile enable-2fa auth-and-writes
   ```

3. **Invite Team Members**
   - Go to https://www.npmjs.com/settings/tenbaselabs/teams
   - Create team: `developers`
   - Add team members with appropriate permissions

## 2. Configure Automation Tokens

### Create Automation Token (for CI/CD)

```bash
# Login to npm
npm login

# Create automation token (doesn't require 2FA for publish)
npm token create --type=automation --scope=@tenbaselabs
```

**Store the token as GitHub secret:**
- Secret name: `NPM_TOKEN`
- Used in GitHub Actions for automated publishing

## 3. Package Structure

```
packages/
├── tensor/              (@tenbaselabs/tensor - core design system)
│   ├── package.json
│   ├── src/
│   └── README.md
├── tensor-react/        (@tenbaselabs/tensor-react - React components)
│   ├── package.json
│   ├── src/
│   └── README.md
└── tensor-themes/       (@tenbaselabs/tensor-themes - theme packages)
    ├── package.json
    ├── src/
    └── README.md
```

## 4. Semantic Versioning Strategy

### Version Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes (e.g., API changes, removed features)
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, backward compatible

### Automated Versioning with semantic-release

Uses conventional commits:
- `feat:` → MINOR bump
- `fix:` → PATCH bump
- `feat!:` or `BREAKING CHANGE:` → MAJOR bump

### Release Workflow

1. **Development**: Work on feature branches
2. **PR Review**: Squash merge to main with conventional commit message
3. **Automated Release**: GitHub Actions triggers semantic-release
4. **Publish**: Packages published to npm automatically

## 5. Security Configuration

### Package Access Control

```bash
# Make packages public (required for @tenbaselabs scope)
npm access public @tenbaselabs/tensor
npm access public @tenbaselabs/tensor-react
npm access public @tenbaselabs/tensor-themes
```

### Team Permissions

- **Developers**: Read + Write
- **Admins**: Full control
- **CI/CD**: Automation token with publish rights

### .npmrc Configuration

See `.npmrc` file for:
- Registry configuration
- Scope binding
- Authentication setup (local development)

## 6. CI/CD Publishing

See `.github/workflows/publish.yml` for automated publishing workflow.

### Manual Publishing (if needed)

```bash
# From package directory
npm publish --access public

# Or with specific tag
npm publish --tag beta --access public
```

## 7. Verification

After registration, verify with:

```bash
npm org ls tenbaselabs
npm access ls-packages @tenbaselabs
```

## Next Steps

1. ✅ Verify scope availability (COMPLETE)
2. ⏳ Register @tenbaselabs organization on npmjs.com (MANUAL STEP)
3. ⏳ Create automation token
4. ✅ Set up package structure (COMPLETE)
5. ✅ Configure CI/CD workflows (COMPLETE)
6. ⏳ Store NPM_TOKEN in GitHub secrets
7. ⏳ Test publishing with first package release
