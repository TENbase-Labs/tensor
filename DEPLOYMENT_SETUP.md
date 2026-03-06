# Deployment Setup Guide

Complete checklist and instructions for activating the Tensor design system CI/CD pipeline.

## Overview

The Tensor repository has CI/CD infrastructure configured locally but requires several manual setup steps to activate full automation. This guide walks through each requirement.

**Estimated setup time:** 2-3 hours (mostly waiting for service approvals)

---

## Prerequisites Checklist

### GitHub Organization Setup

- [ ] TENbase-Labs organization exists
- [ ] You have owner/admin access to TENbase-Labs
- [ ] `tensor` repository created (see [Repository Setup](#1-github-repository-setup))
- [ ] Branch protection configured (see [Branch Protection](#2-branch-protection-rules))
- [ ] Dependabot security alerts enabled
- [ ] Team members added with appropriate permissions

### NPM Organization

- [ ] NPM account created with 2FA enabled
- [ ] @tenbaselabs organization registered on npmjs.com
- [ ] Credit card on file (required for org, free tier available)
- [ ] NPM automation token created
- [ ] Team members invited to @tenbaselabs org

### GitHub Secrets

- [ ] `NPM_TOKEN` configured
- [ ] `ARGOS_TOKEN` configured
- [ ] `CODECOV_TOKEN` configured (optional but recommended)

### Third-Party Services

- [ ] Argos account linked to TENbase-Labs/tensor
- [ ] Codecov account linked (optional)

---

## Step-by-Step Setup

### 1. GitHub Repository Setup

**Status:** Currently blocked - repo does not exist yet

**Steps:**

```bash
# Option A: Via GitHub CLI (requires org admin)
gh repo create TENbase-Labs/tensor \
  --public \
  --description "Multi-brand design system for TENbase Labs products. Shared foundations with per-project themes. Built with Storybook 10, React 19, Tailwind CSS v4." \
  --disable-wiki

# Option B: Via GitHub Web UI
# 1. Go to https://github.com/organizations/TENbase-Labs/repositories/new
# 2. Repository name: tensor
# 3. Description: Multi-brand design system for TENbase Labs products. Shared foundations with per-project themes. Built with Storybook 10, React 19, Tailwind CSS v4.
# 4. Visibility: Public
# 5. Initialize: None (we have local code)
# 6. Click "Create repository"
```

**Configure repository topics:**

```bash
gh repo edit TENbase-Labs/tensor \
  --add-topic design-system \
  --add-topic react \
  --add-topic tailwind \
  --add-topic storybook \
  --add-topic typescript \
  --add-topic tenbase
```

**Connect local repository:**

```bash
cd /home/kyle/paperclip-storage/projects/tensor
git remote add origin https://github.com/TENbase-Labs/tensor.git
git branch -M main
```

**Initial push:**

```bash
git add .
git commit -m "feat: initialize tensor design system

- Storybook 10 with Argos CI integration
- Test infrastructure with Vitest and 80% coverage
- Style Dictionary for design token pipeline
- NPM package configuration (@tenbaselabs scope)
- CI/CD workflows (test, argos, publish)
- Foundation documentation and migration guides

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

git push -u origin main
```

**Verify:** Repository should appear at https://github.com/TENbase-Labs/tensor

---

### 2. Branch Protection Rules

**Prerequisite:** Repository must exist (Step 1)

**Configure via GitHub CLI:**

```bash
# Enable branch protection with required checks
gh api repos/TENbase-Labs/tensor/branches/main/protection \
  --method PUT \
  --field required_status_checks[strict]=true \
  --field required_status_checks[contexts][]=test \
  --field required_status_checks[contexts][]=argos \
  --field enforce_admins=true \
  --field required_pull_request_reviews[required_approving_review_count]=1 \
  --field required_pull_request_reviews[dismiss_stale_reviews]=true \
  --field required_linear_history=true \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

**Configure via Web UI:**

1. Go to https://github.com/TENbase-Labs/tensor/settings/branches
2. Click "Add branch protection rule"
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
     - Require approvals: 1
     - Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
     - Require branches to be up to date before merging
     - Status checks: `test`, `argos`
   - ✅ Require linear history
   - ✅ Do not allow bypassing the above settings
5. Click "Create"

**Repository settings:**

```bash
# Allow squash merging only
gh repo edit TENbase-Labs/tensor \
  --enable-squash-merge \
  --disable-merge-commit \
  --disable-rebase-merge \
  --delete-branch-on-merge
```

---

### 3. NPM Organization Setup

**Create organization:**

1. Go to https://www.npmjs.com/org/create
2. Organization name: `tenbaselabs`
3. Choose plan: Free (unlimited public packages)
4. Add payment method (required even for free tier)
5. Complete setup

**Enable 2FA (REQUIRED):**

```bash
npm profile enable-2fa auth-and-writes
```

**Create automation token:**

```bash
# Login first
npm login

# Create token (doesn't require 2FA for CI/CD use)
npm token create --type=automation

# Copy the token - you'll need it for GitHub secrets
```

**Verify organization:**

```bash
npm org ls tenbaselabs
npm access ls-packages @tenbaselabs
```

---

### 4. GitHub Secrets Configuration

**Add secrets via CLI:**

```bash
# NPM publishing token
gh secret set NPM_TOKEN -R TENbase-Labs/tensor
# Paste the NPM automation token when prompted

# Argos visual regression token
gh secret set ARGOS_TOKEN -R TENbase-Labs/tensor
# Get from https://app.argos-ci.com/settings/projects

# Codecov token (optional)
gh secret set CODECOV_TOKEN -R TENbase-Labs/tensor
# Get from https://codecov.io/gh/TENbase-Labs/tensor/settings
```

**Add secrets via Web UI:**

1. Go to https://github.com/TENbase-Labs/tensor/settings/secrets/actions
2. Click "New repository secret"
3. Add each secret:
   - Name: `NPM_TOKEN`, Value: [paste automation token]
   - Name: `ARGOS_TOKEN`, Value: [paste Argos token]
   - Name: `CODECOV_TOKEN`, Value: [paste Codecov token]

---

### 5. Third-Party Services

#### Argos CI (Visual Regression Testing)

1. Go to https://app.argos-ci.com
2. Sign in with GitHub
3. Click "Add Project"
4. Select `TENbase-Labs/tensor`
5. Copy the project token
6. Add to GitHub secrets as `ARGOS_TOKEN` (see Step 4)

**Verify:** Check `.github/workflows/argos.yml` exists

#### Codecov (Coverage Reporting) - Optional

1. Go to https://codecov.io
2. Sign in with GitHub
3. Add repository: `TENbase-Labs/tensor`
4. Copy the upload token
5. Add to GitHub secrets as `CODECOV_TOKEN` (see Step 4)

**Verify:** Check `.github/workflows/test.yml` includes codecov upload

---

## Deployment Pipeline Verification

### End-to-End Test

After completing all setup steps, verify the pipeline:

1. **Create test branch:**
   ```bash
   git checkout -b test/ci-pipeline
   echo "# Test" >> README.md
   git add README.md
   git commit -m "test: verify CI pipeline"
   git push -u origin test/ci-pipeline
   ```

2. **Create pull request:**
   ```bash
   gh pr create --title "Test: Verify CI Pipeline" --body "Testing all CI checks"
   ```

3. **Verify checks run:**
   - [ ] Test workflow completes
   - [ ] Coverage report generated
   - [ ] Argos snapshots uploaded
   - [ ] All checks pass (green ✓)

4. **Verify branch protection:**
   - [ ] Cannot merge without approval
   - [ ] Cannot merge with failing checks
   - [ ] Squash merge is only option

5. **Merge and verify release:**
   ```bash
   gh pr merge --squash
   ```
   - [ ] semantic-release creates new version
   - [ ] NPM packages published to registry
   - [ ] GitHub release created with changelog

6. **Verify published packages:**
   ```bash
   npm view @tenbaselabs/tensor
   npm view @tenbaselabs/tensor-react
   npm view @tenbaselabs/tensor-themes
   ```

---

## Troubleshooting

### NPM Publish Fails

**Symptom:** `npm publish` fails with 403 or 404 error

**Solutions:**
- Verify `NPM_TOKEN` secret is set correctly
- Check token has publish permissions: `npm token list`
- Verify organization exists: `npm org ls tenbaselabs`
- Ensure packages are scoped correctly: `@tenbaselabs/*` in package.json

### GitHub Actions Timeout

**Symptom:** Workflows timeout or run for >10 minutes

**Solutions:**
- Check if `npm ci` is using cache correctly
- Verify `node_modules` not committed to repo
- Consider increasing timeout in workflow file
- Check for blocking network requests

### Argos Upload Fails

**Symptom:** Argos workflow fails or snapshots don't upload

**Solutions:**
- Verify `ARGOS_TOKEN` is set in repository secrets
- Check Argos project is linked to correct repo
- Ensure Storybook builds successfully: `npm run build-storybook`
- Check Argos dashboard for error details

### Coverage Threshold Not Enforced

**Symptom:** PRs merge despite low coverage

**Solutions:**
- Verify `vitest.config.ts` has thresholds configured
- Check test workflow runs coverage: `npm test -- --coverage`
- Ensure coverage check step in `.github/workflows/test.yml`
- Branch protection must require `test` status check

### Semantic Release Not Triggering

**Symptom:** Merges to main don't create releases

**Solutions:**
- Verify commit follows conventional commits format
- Check `publish.yml` workflow has `NPM_TOKEN` secret
- Ensure `.releaserc.json` configuration is correct
- Check GitHub Actions logs for errors

---

## Security Best Practices

### Token Management

- **Never commit tokens to repository**
- Use GitHub secrets for all sensitive values
- Rotate NPM tokens every 90 days
- Use automation tokens (not personal tokens) for CI/CD
- Enable 2FA on all service accounts

### Repository Access

- Limit admin access to necessary personnel
- Use teams for permission management
- Review access periodically
- Enable audit logging for organization

### Dependency Security

- Enable Dependabot security alerts
- Configure automatic security updates
- Review dependency changes in PRs
- Use `npm audit` in CI pipeline

---

## Maintenance

### Regular Tasks

**Monthly:**
- Review and merge Dependabot PRs
- Check CI/CD workflow performance
- Review npm download metrics
- Update documentation as needed

**Quarterly:**
- Rotate NPM automation token
- Review team access permissions
- Audit published package versions
- Update CI/CD workflow dependencies

**As Needed:**
- Add new team members to npmjs.com org
- Update branch protection rules for new checks
- Configure new third-party integrations
- Respond to security alerts

---

## Support & Resources

### Documentation

- [NPM Scope Setup](./NPM_SCOPE_SETUP.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Storybook Guide](./STORYBOOK.md)

### External Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NPM Organizations](https://docs.npmjs.com/organizations)
- [Argos CI Documentation](https://argos-ci.com/docs)
- [semantic-release](https://semantic-release.gitbook.io/)

### Related Issues

- TEN-12: NPM scope setup (completed)
- TEN-18: NPM scope consistency fix (completed)
- TEN-21: GitHub repository initialization (blocked)
- TEN-20: Branch protection configuration (blocked)

---

## Checklist Summary

Use this for quick status tracking:

**Foundation:**
- [ ] GitHub repo created
- [ ] Local repo pushed to GitHub
- [ ] Branch protection enabled
- [ ] NPM org `@tenbaselabs` registered

**Secrets:**
- [ ] NPM_TOKEN configured
- [ ] ARGOS_TOKEN configured
- [ ] CODECOV_TOKEN configured (optional)

**Services:**
- [ ] Argos project linked
- [ ] Codecov project linked (optional)

**Verification:**
- [ ] Test PR created and merged
- [ ] All CI checks passing
- [ ] Package published to npm
- [ ] Monitoring enabled

**Status:** Ready for production releases ✅
