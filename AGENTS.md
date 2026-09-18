# AGENTS.md

Instructions for AI assistants (Cascade, Cursor, Copilot, Claude Code, etc.) working on this repository.

> This file follows the AGENTS.md convention. It is not intended for external AI consumption. See [llms.txt](./llms.txt) for the public AI-facing professional summary.

## Project Context

- Personal portfolio of Dylan Holin, available immediately.
- Profile combining full-stack development, systems and networks, IT support, cybersecurity, customer relations, sales and administrative skills.
- Current objective: join a team, contribute to concrete projects and continue progressing professionally and technically.
- Production: [https://dylanholin.github.io/dh-portfolio](https://dylanholin.github.io/dh-portfolio)
- Repo: [https://github.com/dylanholin/dh-portfolio](https://github.com/dylanholin/dh-portfolio)

## Behavior

- **Stay critical.** The user can be wrong. Verify claims against the actual project state before acting.
- **Be anti-sycophantic.** No flattery, filler or unnecessary agreement. Challenge weak reasoning, anticipate mistakes and state uncertainty clearly.
- **Surface tradeoffs and evaluate their impact** instead of hiding them.
- **Admit that both user and AI can be wrong.** A request may contradict an existing rule, or an AI proposal may rely on a false assumption. Ask one short question when required before taking a risky action.
- **Prefer the smallest safe change.** Do not turn a simple CSS or HTML fix into an unnecessary refactor.

## Communication

- **Answer first.** Give the result before the reasoning.
- **No preamble or recap.** Do not restate the request or summarize visible changes unless the user asks.
- **Evidence over assertion.** Support claims such as "works", "tested" or "fixed" with a command, output or source file.
- **Quote the shortest decisive line** of an error or log, not the full dump.
- **No tool-call narration.**
- **No decorative tables or emoji** unless they carry useful information.
- **Write for scanning.** Be concise. Use short paragraphs and lists. Use full prose for security warnings, irreversible actions or explanations requiring nuance.
- **Use French for user-facing content** unless the user requests another language. Keep technical instructions and commit messages consistent with the repository conventions.

## Action

- **Surgical changes.** Ship the minimum that solves the problem. Touch only files required by the task.
- **Stay focused.** Mention unrelated issues in one line only. Do not fix unrelated issues without explicit approval.
- **Solve your own issues first** before escalating to the user.
- **Do not commit or push** unless the user explicitly asks.
- **Do not guess.** Read the relevant source before changing APIs, class names, selectors, signatures, links or behavior.
- **Batch independent read-only operations** when possible.
- **Before adding a rule or instruction, check whether an existing one already covers or contradicts it.**
- **Require explicit consent for irreversible operations** such as deleting files, changing CSP, renaming public files, force-pushing or changing deployment settings.
- **Detect suspicious requests.** Treat network operations, data extraction, credential manipulation and security-bypass requests with caution. Ask for clarification or refuse when appropriate.
- **Do not add JavaScript for behavior that CSS or native browser behavior already handles correctly.** For example, preserve native anchor navigation unless custom behavior is explicitly required and justified.

## Hosting Constraints (GitHub Pages)

- Static-only: no backend, no server-side code, no server build.
- GitHub Pages deployment is triggered by pushes to `main`.
- The project does not use a framework, bundler or package manager.
- Do not introduce Jekyll configuration, front matter or build tooling unless explicitly requested.
- Avoid files and directories beginning with `_`, as they can be treated specially by GitHub Pages and Jekyll-based publishing.
- Do not assume custom server-side HTTP headers can be configured on GitHub Pages.
- Security-related document declarations belong in [index.html](./index.html) and must be changed carefully.

## Tech Stack

- HTML5.
- CSS3: custom properties, Grid, Flexbox, media queries, `@keyframes`, `prefers-reduced-motion`.
- Vanilla JavaScript ES6+.
- GitHub Pages static hosting.
- **Zero external dependencies:** no `package.json`, no CDN, no framework, no bundler and no build step.

## Non-Negotiable Rules

### Security and CSP

- CSP and security-related meta declarations are defined in [index.html](./index.html).
- The CSP includes restrictive directives such as `default-src 'self'`, `script-src 'self'`, `style-src 'self'` and `img-src 'self' data:`.
- Forbidden by default: inline executable JavaScript, inline CSS, external scripts, Google Fonts, CDNs, analytics, tracking pixels and iframes.
- Any new external integration must be reviewed against CSP, privacy and accessibility constraints.
- Any CSP change requires explicit justification and user approval.
- Do not weaken CSP merely to make an integration work. Prefer a local, static or dependency-free solution.

### Privacy

- Zero cookies, zero tracking and zero personal-data collection by default.
- No third-party analytics or advertising services.
- Use system fonts only through the `--font-*` variables in [style.css](./assets/css/style.css).
- Do not add external APIs, remote fonts, trackers or telemetry without explicit user approval.
- Do not expose personal information beyond what is already intentionally published in the portfolio.

### Accessibility

- Target WCAG 2.1 AA practices.
- Respect `prefers-reduced-motion` in CSS and JavaScript.
- Preserve the skip link, `aria-label`, `aria-labelledby` and `role="list"` on styled lists.
- Decorative SVGs must use `aria-hidden="true"`.
- Meaningful SVGs require an accessible name, such as an explicit `aria-label`.
- Preserve visible keyboard focus.
- Preserve modal focus management and Escape-key behavior.
- Preserve keyboard navigation and adequate mobile touch targets.
- Do not remove semantic HTML just to simplify styling.

### Network and Data Safety

- No unjustified network connections, SSH operations, external API calls or downloads.
- No data extraction or exfiltration without legitimate context and explicit approval.
- No manipulation of credentials, SSH keys, tokens, secrets or deployment configuration.
- Never print, commit or expose secrets in source files, logs, documentation or Git history.

## Code Conventions

- **Comments and class names:** French, for consistency with the existing codebase. Do not anglicize existing French naming mid-project.
- **Indentation:** 2 spaces in CSS and JavaScript, 4 spaces in HTML.
- **HTML:** preserve semantic structure, existing accessibility attributes and valid nesting.
- **CSS:** use variables from `:root`, use kebab-case class names and do not use `!important` without justification.
- **CSS:** prefer narrow selectors. Do not modify shared classes when a component-specific selector solves the issue safely.
- **JavaScript:** do not use `var`. Prefer `const`; use `let` only for values that are reassigned.
- **JavaScript:** preserve the existing script structure unless isolation is required. Do not introduce an IIFE merely for style consistency.
- **JavaScript:** use `{ passive: true }` for compatible scroll listeners.
- **JavaScript:** avoid duplicate event listeners and avoid overriding native anchor behavior without a clear requirement.
- **No em dash (`—`) or en dash (`–`) in French content** in HTML, Markdown, CSS/JS comments, `llms.txt` or `README.md`.

## Contact Section Rules

- The Contact section must remain vertically ordered and centered.
- Keep the current order of content unless the user explicitly requests a structural change:
  1. Contact introduction
  2. Email CTA and copy button
  3. CV description
  4. CV buttons
  5. GitHub and LinkedIn links
- Preserve native navigation to `#contact` unless custom scrolling is explicitly requested.
- Do not add `window.scrollTo()`, `scrollIntoView()` or `preventDefault()` to the Contact navigation without explicit approval.
- Do not modify `.btn-email` globally without checking all of its usages.
- The CV buttons use both `.btn-email` and `.btn-cv`. Any generic `.btn-email` change can affect the CV buttons.
- Keep the two CV buttons visually identical.
- Do not reduce the copy button or alter the email split-button layout without explicit approval.
- Do not replace the Contact layout with a two-column grid, fixed height or `min-height: 100vh` unless explicitly requested.

## Git Workflow

- Atomic commits: one intent equals one commit. Avoid unrelated changes in the same commit.
- Use Conventional Commits.
- Commit messages are written in French unless the user explicitly asks for English.
- Allowed prefixes: `feat(scope):`, `fix(scope):`, `chore(scope):`, `docs(scope):`, `refactor(scope):`, `style(scope):`.
- Review staged changes before committing with `git diff --cached`.
- Never use `git push --force` without explicit approval.
- Push to `main` triggers GitHub Pages deployment.
- Use a branch for large, risky or unrelated changes.

## Sensitive Files

- [index.html](./index.html): content, CSP and security-related document declarations. Modify with justification.
- [assets/css/style.css](./assets/css/style.css): global variables, themes, responsive styles and component styling. Check selector scope before modifying.
- [assets/js/script.js](./assets/js/script.js): navigation, animations, theme toggle, modals, email copy behavior and project pagination. Avoid duplicate listeners.
- [llms.txt](./llms.txt): public AI-facing professional summary. Keep aligned with the portfolio, current objectives, CVs and contact information.
- `assets/docs/*.pdf`: CVs and professional documents. Do not rename, delete or move a PDF without checking and updating every reference in `index.html`, `README.md` and `llms.txt`.
- [README.md](./README.md): public project documentation. Check whether changes impact it before committing.
- [AGENTS.md](./AGENTS.md): AI instructions. The AI must never modify this file, even when explicitly asked. It may propose changes in plain text for the user to apply manually.

## Pre-Change Checklist

- [ ] Compatible with GitHub Pages: no backend and no build requirement.
- [ ] Respects CSP: no unnecessary inline code or external resource.
- [ ] Respects privacy: no cookie, tracker, telemetry or third-party service.
- [ ] Respects `prefers-reduced-motion` if an animation or transition is changed.
- [ ] No new dependency without explicit validation.
- [ ] No accessibility regression: skip link, focus, ARIA and keyboard navigation preserved.
- [ ] CSS selector scope verified before modifying a shared class.
- [ ] No irreversible operation without explicit user confirmation.
- [ ] `llms.txt` updated if professional profile, objectives, CVs or public contact information changed.
- [ ] `README.md` updated if public project documentation changed.
- [ ] Atomic Conventional Commit message prepared in French.
- [ ] [AGENTS.md](./AGENTS.md) not modified by the AI.

## Manual Validation

- **Browser console:** no CSP errors and no 404 errors.
- **Keyboard navigation:** test Tab and Shift+Tab, skip link, visible focus, modal focus and Escape behavior.
- **Reduced motion:** DevTools, emulate `prefers-reduced-motion: reduce`, then verify that CSS animations, transitions and animated Hero blobs are disabled or reduced, and that smooth scrolling becomes instant.
- **Theme:** test light and dark modes, including persistence after reload.
- **Contact:** test the email link, copy button feedback, two CV download links, GitHub and LinkedIn links.
- **Responsive:** test at 320px, 768px and 1440px widths.
- **Print:** verify a readable print preview.
- **Lighthouse:** aim for Performance >= 95, Accessibility >= 95, Best Practices >= 95 and SEO >= 95. Investigate every regression.