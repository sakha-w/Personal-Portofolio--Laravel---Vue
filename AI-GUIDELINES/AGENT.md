# Agent Guidelines

Read this file only when the user explicitly mentions it in a prompt. It is the shared project guidance for every AI harness.

## Stack

- Laravel 13 API on PHP 8.4 in Docker.
- Astro and Vue browser UI.
- PostgreSQL, Nginx, and Docker Compose.

## Working Rules

- Read the code paths involved before editing.
- Reuse existing patterns and keep the smallest correct change.
- Do not add dependencies, abstractions, documentation, or compatibility layers without a concrete need.
- Preserve unrelated worktree changes.
- Use `apply_patch` for source edits.

## Laravel

- Follow the conventions in neighboring Laravel files.
- Use Form Requests for input validation and API Resources for API responses.
- Generate Laravel files with `php artisan make:* --no-interaction`.
- Keep public API responses limited to public data; do not expose admin-only values.

## Frontend

- Preserve the established Astro/Vue visual language.
- Keep desktop and mobile layouts usable.
- Prefer CSS and native browser features over JavaScript or new packages.

## Verification

- Run the narrowest meaningful checks for changed behavior.
- Format changed PHP with `docker compose exec -T app vendor/bin/pint --dirty --format agent`.
- Use `npm run build` after frontend changes.
- Run browser checks when user-visible behavior changes.

## Local Skills

No local skills exist yet. If a project-specific skill is added, store it at `AI-GUIDELINES/skills/<name>/SKILL.md` and mention its path explicitly in the prompt.
