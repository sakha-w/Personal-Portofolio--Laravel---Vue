# Learn Docker — Portfolio

A personal portfolio and custom content admin built with **Astro 7, Vue 3, Tailwind 4, Laravel 13, PHP 8.4, and PostgreSQL 16**.

**All browser pages are served by Astro. Laravel provides JSON APIs, authentication, authorization, and storage. Nginx exposes one origin.**

```text
Browser → Nginx
            ├── /, /projects, /experience, … → Astro + Vue
            ├── /admin, /admin/login        → Astro + Vue
            ├── /api/*                     → Laravel
            ├── /auth/*, /sanctum/*         → Laravel sessions / CSRF
            ├── /storage/*                 → Uploaded images
            └── /up                        → Laravel health endpoint
```

## Local development

Requires Docker Engine/Desktop with Docker Compose v2. Node 22.12+ is needed on the host only for host-side builds or browser tests.

For a **new installation**, copy `.env.example` to `.env`, then run:

```sh
docker compose up -d --build --wait
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate
docker compose exec app php artisan portfolio:owner admin@sakha.dev --name="Sakha Wibisono"
```

The owner command prompts for a password of at least 12 characters. It can create an owner or update an existing owner's password. A seeded demo account is not automatically an owner.

For an existing installation, preserve `.env`, `APP_KEY`, database credentials, and stored data; skip key generation. If you want the original example portfolio content in a **fresh database**, run `php artisan db:seed --class=PortfolioSeeder` inside `app`. Seeding is not an update procedure.

Open:

- Portfolio: **http://localhost:8000/**
- Admin: **http://localhost:8000/admin**
- API: **http://localhost:8000/api/projects**

`HTTP_PORT` controls the gateway port; keep `APP_URL` consistent with it. The frontend and PHP-FPM ports are internal. PostgreSQL is available on `127.0.0.1:5432` for local database tools.

The gateway proxies Astro's HMR connection as well as page requests. The old separate Laravel Vite server is no longer used.

### Updating dependencies in development

```sh
docker compose exec app composer install
docker compose up -d --build --renew-anon-volumes frontend
```

Renewing the frontend's anonymous volume refreshes its Linux `node_modules`. PostgreSQL uses the persistent named `postgres_data` volume.

### Common commands

```sh
docker compose ps
docker compose logs -f app frontend nginx
docker compose exec app php artisan route:list
docker compose exec app php artisan migrate
docker compose restart frontend
```

The development checkout is mounted into the containers. Uploaded files live in `storage/app/public`, and Nginx serves that directory directly; `storage:link` is not required by this gateway configuration.

## Source layout

```text
src/
├── pages/                  # Astro public routes and admin routes
│   └── admin/
├── layouts/                # Public layout and AdminLayout
├── admin/
│   ├── components/         # Vue login, workspace, editors, image controls
│   ├── admin-api.js        # Same-origin requests / CSRF cookie handling
│   └── admin-content.js    # Five fixed content forms
├── components/             # Public Vue components
├── styles/                 # Shared portfolio styling and admin styling
└── public/                 # Frontend-only static assets
app/                        # Laravel controllers, validation, models, persistence
routes/                     # JSON content and stateful auth routes
database/                   # Migrations and seed data
nginx/default.conf          # Shared development/production gateway routing
Dockerfile                  # Development, backend, frontend, and gateway targets
docker-compose.yml          # Development services
docker-compose.production.yml # Standalone production stack
```

The legacy Posts browser UI has been retired. Its model, table, and existing records are retained.

## Frontend build

```sh
npm ci --include=dev
npm run build
```

One Astro build produces **both the portfolio and admin** in `dist/`. `npm run astro:build` remains an alias. The production frontend runs `node dist/server/entry.mjs`.

Admin pages host a client-only Vue application and check the owner session before displaying the workspace. Laravel enforces authorization on every protected endpoint. Session errors during editing preserve the form and offer sign-in in another tab.

The frontend uses relative `/api`, `/auth`, and `/sanctum` URLs. `PUBLIC_API_BASE` and `FRONTEND_URL` from the earlier split-origin setup are no longer used. A frontend image can be deployed on another hostname without rebuilding its API URLs.

## Authentication and content API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/sanctum/csrf-cookie` | Initialize CSRF cookie before login |
| POST | `/auth/login` | Authenticate the owner; JSON response |
| GET | `/api/me` | Owner identity; `401` for guests, `403` for non-owners |
| POST | `/auth/logout` | Invalidate the session; `204` |

Browser mutations send the Laravel session cookie and `X-XSRF-TOKEN`. Authentication is session-based; bearer tokens are not stored by the frontend.

Content collections: `projects`, `experiences`, `certificates`, `educations`, and `technologies`.

- Read lists with `GET /api/{collection}`. Technology management reads require owner access; public skills use `GET /api/skills`.
- Project detail uses `GET /api/projects/{slug}`. Other detail routes use numeric IDs.
- Create with `POST /api/{collection}`; update with `PUT /api/{collection}/{id}`; delete with `DELETE /api/{collection}/{id}`.
- Updates submit complete non-media form state. Send `null` to clear nullable fields and `[]` to clear technology selections.
- Lists support `page`, `per_page` (maximum 50), and `q`. Projects also support `category` and `featured=0|1`.
- Responses use `data`, with `links` and `meta` for pagination. Validation failures use `422` and an `errors` object.

### Images

- Projects: one cover image.
- Certificates: one certificate image.
- Experiences: at most **three evidence images**.
- JPEG, PNG, or WebP; maximum **2 MiB** and **8192 × 8192 pixels** per image.
- Each image has descriptive alt text and intrinsic dimensions for responsive display.

File requests use multipart `data` containing JSON plus `image` or `evidence_files[index]`. Multipart edits use `POST` with `_method=PUT`.

Gallery entries contain either an existing image `id` or an `upload_index`, plus `alt`. The submitted gallery describes the final selection. Omit it to preserve the existing gallery; send `[]` to clear it. Single images use `image_alt` and explicit `remove_image` controls.

Images are stored before the database transaction commits. Failed saves clean up new files; replaced/deleted files are removed after commit. Cleanup failures are logged. Public contact and analytics remain stateless, including when hosted on the same origin as the admin.

## Production with Docker Compose

Use **`docker-compose.production.yml` by itself**, rather than merging it over the development file. It builds separate frontend, PHP-FPM, and gateway images, installs production dependencies, and publishes only the Nginx port.

For a first production configuration, copy `.env.production.example` to `.env.production` and fill in the existing production values. For updates, merge new settings into that file rather than overwriting it.

| Setting | Meaning |
| --- | --- |
| `APP_KEY` | Preserve the existing Laravel key |
| `APP_URL` | Public gateway origin, including scheme and any nonstandard port |
| `HTTP_PORT` | Published HTTP port; normally `80` in production |
| `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` | Existing PostgreSQL database and credentials |
| `SANCTUM_STATEFUL_DOMAINS` | Empty derives the trusted hostname/port from `APP_URL` |
| `SESSION_SECURE_COOKIE` | `true` when HTTPS is configured |
| `RELEASE_TAG` | Image tag for this release; use the reviewed commit SHA |

Runtime settings are passed by Compose. `.env` files, local dependencies, uploaded data, and old builds are excluded from the Docker build context. Application keys are not generated during image builds.

The gateway configuration listens on HTTP port 80. Configure TLS termination for production admin traffic, update `APP_URL` to HTTPS, and enable secure cookies when doing so. DNS routes the hostname to the VM; Nginx routes paths to Astro or Laravel.

### Upgrading the existing deployment

On the VM, identify the **existing Compose project name** with `docker compose ls` and record its mounted database volume. Keep that project name when switching Compose files: `postgres_data` must resolve to the existing volume, not a new empty one.

Before pulling the release, back up the database, runtime environment, and uploaded files, and record the running image versions. Complete the release review/commit/push first; uncommitted local changes cannot be pulled onto the VM.

The following examples use Bash on the VM, from the repository directory:

```sh
# Replace with the project name already used by the deployment.
export COMPOSE_PROJECT_NAME=learn-docker
prod() { docker compose --env-file .env.production -f docker-compose.production.yml "$@"; }

git status
git pull --ff-only origin main
# Merge production env changes, preserve APP_KEY/DB credentials, and set RELEASE_TAG.
prod build
```

The production stack persists Laravel storage in `storage_data`. **On the first switch from a checkout bind mount**, copy existing uploads into that volume before activation, if uploads already exist:

```sh
prod run --rm --no-deps --user root \
  --volume "${PWD}/storage/app/public:/old-media:ro" \
  app sh -c 'cp -an /old-media/. /var/www/storage/app/public/ && chown -R www-data:www-data /var/www/storage/app/public'
```

During a short maintenance window, apply pending migrations with the new backend image, then activate the services:

```sh
prod up -d --wait postgres
prod run --rm --no-deps app php artisan migrate --force --no-interaction
prod up -d --wait app frontend nginx
prod exec -T app php artisan optimize
prod exec -T nginx nginx -t
```

If an owner has not yet been provisioned in the production database:

```sh
prod exec app php artisan portfolio:owner admin@sakha.dev --name="Sakha Wibisono"
```

Check `/`, `/admin/login`, `/api/projects`, `/up`, and an uploaded image on the public hostname. Verify create/edit/delete from the admin. Later updates reuse both volumes and do not repeat the initial upload copy.

`git pull` updates tracked code/configuration, not private environment values, database records, or running processes. Image changes require rebuilding/recreating services; Laravel config caches must be regenerated when runtime settings change. Preserve `APP_KEY` and use `migrate --force` for updates. Do not run `migrate:fresh`, seeders, or `docker compose down --volumes` against a production deployment.

For rollback, retain the previous images and deployment configuration. Switch back to the previous release tag/configuration; assess schema compatibility rather than automatically rolling back database migrations and losing new content.

## Verification

### Backend

Create the development test database once if it does not exist:

```sh
docker compose exec postgres createdb -U laravel portfolio_test
docker compose exec app php artisan test --compact
docker compose exec app vendor/bin/pint --dirty --format agent
```

Tests force their configuration to `portfolio_test` and check the resolved connection before database resets.

### Browser / production integration

```sh
npm ci --include=dev
npm run test:browser
```

This builds and launches the **production Compose stack in a separate, automatically named test project**, using an ephemeral owner, a separate PostgreSQL volume, and separate upload storage. Real CSRF checks remain enabled in the HTTP backend. Tests use one Nginx origin without forwarding API requests through browser interceptors. Test containers and volumes are removed afterward; the development/production application volumes are not used.

Coverage includes authentication, non-owner rejection, deep-link reload, all five editors, file replacement/removal, the three-image limit, session-error recovery, and public pages at 320/768/1440px.

Windows uses Edge by default. On Linux, install Chromium with `npx playwright install --with-deps chromium`; alternatively set `BROWSER_EXECUTABLE`. Set `BROWSER_TEST_PORT` if port 8091 is occupied.

To check the running development gateway without creating content:

```sh
node tests/portfolio.browser.cjs http://localhost:8000
```

This public-page check expects the example portfolio records. CI runs backend tests, the unified frontend build, and the isolated production browser check; it does not automatically deploy to Azure.

## Troubleshooting

- **Cannot log in:** check the owner account, exact gateway origin, `APP_URL`, and stateful domains. Use `portfolio:owner` to provision/reset an owner, not the old demo password.
- **Stale assets or dependencies:** rebuild the frontend and renew its anonymous dependency volume in development. Production uses built images and has no dev server.
- **502 from Nginx:** inspect `docker compose logs app frontend nginx` and service status. Nginx resolves Docker upstream addresses dynamically when services are recreated.
- **Storage permission failure:** PHP-FPM needs writable `storage` and `bootstrap/cache`. Production images initialize the storage volume with the correct owner; migrated uploads may require ownership adjustment.
- **Production env changes appear ignored:** recreate the affected container and regenerate Laravel's configuration cache.

## License

MIT. Built as a learning project for Docker containerization and a database-driven portfolio.
