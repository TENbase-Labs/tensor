# DSS Tooling Analysis & Next Priorities

**Date:** 2026-03-06
**Author:** DSS Tooling Engineer
**Issue:** TEN-19

---

## Executive Summary

TENsor Design System has **strong foundational tooling** already in place. Token pipeline, component generator, and VSCode snippets are production-ready. The primary gaps are **Figma integration**, **multi-brand theming**, and **token validation/CI**.

**Recommendation:** Prioritize **multi-brand token support** first, as TEN-14 (component development) will need theme variants. Defer Figma automation until component library matures.

---

## Current State Audit

### ✅ Already Built (Production-Ready)

| Tool | Status | Quality | Notes |
|------|--------|---------|-------|
| **Token Pipeline** | ✅ Working | High | Style Dictionary configured, outputs CSS/JS/JSON |
| **Component CLI** | ✅ Working | High | Generates .tsx/.css/.test/.stories with templates |
| **VSCode Snippets** | ✅ Working | High | 17 snippets for components, tokens, testing |
| **Visual Regression** | ✅ Working | High | Argos CI integrated, runs on PRs |
| **Test Infrastructure** | ✅ Working | High | Vitest + RTL + coverage thresholds |
| **CI/CD** | ✅ Configured | Medium | semantic-release setup, needs docs |

**Evidence:**
- `sd.config.js` - 52 lines, clean config
- `scripts/create-component.js` - 268 lines, full-featured generator
- `.vscode/tensor.code-snippets` - 328 lines, comprehensive snippets
- `package.json:9` - `build:tokens` script integrated
- `vitest.config.ts` - Coverage thresholds enforced

### ❌ Gaps Identified

#### 1. **Figma Integration** (High Impact, Manual Process)

**Current:** Design specs → Manual copy → `tokens/*.json` → Style Dictionary

**Problem:**
- Token changes require manual updates
- Risk of drift between design and code
- Slow iteration cycle

**Impact:** Medium (manageable for now)

**Evidence:**
- `tokens/colors.json` manually maintained
- `DESIGN_SPEC_FOUNDATION_TOKENS.md` requires manual sync

---

#### 2. **Multi-Brand Theming** (Blocking TEN-14)

**Current:** Single theme output only

**Problem:**
- TEN-14 requires RoundVision + TENbase theme support
- `sd.config.js` only outputs one set of tokens
- No theme-switching mechanism

**Impact:** High (blocks component development)

**Evidence:**
```js
// sd.config.js:11 - Single output only
platforms: {
  css: { buildPath: 'packages/tensor/dist/css/' },
  js: { buildPath: 'packages/tensor/dist/js/' },
  json: { buildPath: 'packages/tensor/dist/json/' }
}
```

**Requirements from COMPONENT_UX_SPECIFICATIONS.md:**
- RoundVision brand theme
- TENbase brand theme
- Runtime theme switching

---

#### 3. **Token Validation & CI** (Quality Gates Missing)

**Current:** No automated validation

**Problem:**
- Token changes not validated in CI
- No drift detection
- No token structure tests

**Impact:** Medium (tech debt accumulation)

**Missing:**
- CI workflow for token validation
- Token schema enforcement
- Automated token drift detection

---

#### 4. **Publishing Documentation** (Operational Gap)

**Current:** semantic-release configured but undocumented

**Problem:**
- No clear release workflow documented
- Versioning process unclear
- Package publishing not tested

**Impact:** Low (can defer until pre-release)

**Evidence:**
- `.releaserc.json` exists
- `package.json` has semantic-release deps
- No RELEASE.md or PUBLISHING.md documentation

---

#### 5. **VSCode Extension Publishing** (Nice-to-Have)

**Current:** Snippets local to project

**Problem:**
- Other teams can't use snippets without cloning repo
- Not discoverable on VSCode Marketplace

**Impact:** Low (local snippets work fine)

---

## Recommended Priorities

### 🔴 **Priority 1: Multi-Brand Token Support** (1-2 days)

**Why now:**
- Blocks TEN-14 component development
- Foundation for all future component work
- Required by design specs

**Scope:**
1. Extend `sd.config.js` with theme-specific builds
2. Create `tokens/roundvision/*.json` and `tokens/tenbase/*.json`
3. Output separate CSS files per theme
4. Add theme-switching mechanism (CSS classes or data attributes)
5. Update documentation

**Deliverables:**
- `packages/tensor/dist/css/roundvision.css`
- `packages/tensor/dist/css/tenbase.css`
- `packages/tensor/dist/js/roundvision.tokens.js`
- `packages/tensor/dist/js/tenbase.tokens.js`
- Updated TOOLS.md with theme usage

**Unblocks:** TEN-14 (Frontend Engineer can build themed components)

---

### 🟡 **Priority 2: Token Validation CI** (1 day)

**Why next:**
- Prevents token drift as team grows
- Catches breaking changes early
- Low effort, high ROI

**Scope:**
1. Create `.github/workflows/validate-tokens.yml`
2. Add token structure JSON schema
3. Validate token naming conventions
4. Test token build process in CI
5. Fail PR if token validation fails

**Deliverables:**
- CI workflow for token validation
- Token schema definition
- Validation passing on all PRs

---

### 🟢 **Priority 3: Figma Integration** (3-5 days, defer)

**Why defer:**
- High effort, medium value at current scale
- Manual process acceptable for Phase 1-2
- Wait for token structure to stabilize

**Future scope:**
1. Figma plugin or API integration
2. Automated token extraction
3. PR automation for token updates

**Trigger:** When manual token updates happen >2x per week

---

### 🟢 **Priority 4: Publishing Documentation** (0.5 day)

**Why later:**
- Not needed until first external release
- semantic-release already configured
- Can document when testing first release

**Scope:**
1. Create PUBLISHING.md
2. Document versioning strategy
3. Test release workflow in CI

**Trigger:** Before first npm publish to @tenbaselabs scope

---

### 🟢 **Priority 5: VSCode Extension** (2-3 days, defer)

**Why defer:**
- Local snippets work fine
- Small team doesn't need marketplace publishing
- Low ROI until design system stabilizes

**Future scope:**
1. Package snippets as VSCode extension
2. Publish to marketplace
3. Auto-update with design system releases

**Trigger:** When external teams adopt TENsor

---

## Decision Matrix

| Priority | Impact | Effort | Blocks Work | Recommend |
|----------|--------|--------|-------------|-----------|
| Multi-Brand Tokens | High | 2 days | Yes (TEN-14) | ✅ **Do Now** |
| Token Validation CI | Medium | 1 day | No | ✅ **Do Next** |
| Figma Integration | Medium | 5 days | No | ❌ **Defer** |
| Publishing Docs | Low | 0.5 day | No | ❌ **Defer** |
| VSCode Extension | Low | 3 days | No | ❌ **Defer** |

---

## Proposed Next Steps

### Immediate (This Sprint)

**Task:** Multi-Brand Token Support
**Estimate:** 1-2 days
**Assignee:** DSS Tooling Engineer

**Plan:**
1. Research Style Dictionary multi-brand patterns
2. Create theme-specific token files
3. Update `sd.config.js` for multi-theme output
4. Test theme-switching mechanism
5. Document in TOOLS.md
6. Create example component using themes

### Near-Term (Next Sprint)

**Task:** Token Validation CI
**Estimate:** 1 day
**Assignee:** DSS Tooling Engineer

**Plan:**
1. Create GitHub Actions workflow
2. Define token validation rules
3. Add to PR required checks

---

## Questions for CEO

1. **Multi-brand priority confirmed?** RoundVision + TENbase themes needed for TEN-14?
2. **Figma integration deferral OK?** Manual token updates acceptable for Phase 1-2?
3. **Budget approval:** 3 days total for Priority 1 + Priority 2?

---

## Success Metrics

**Multi-Brand Tokens:**
- ✅ Two theme CSS files generated
- ✅ Frontend Engineer can build themed components
- ✅ Theme switching works in Storybook

**Token Validation:**
- ✅ CI fails on invalid token changes
- ✅ All token files pass schema validation
- ✅ Zero token drift detected

---

**Status:** Analysis Complete, Awaiting CEO Direction
**Next Action:** CEO review and approval to proceed with Priority 1
