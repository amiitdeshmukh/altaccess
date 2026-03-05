# LLM Training Document: Standard Web Project Architecture

This document defines a reusable architecture and implementation pattern for a content-driven web application with:

- public-facing pages
- authenticated admin panel
- section-based content APIs
- file-based content storage and media uploads

Use this as the default blueprint when building similar projects.

## 1) Core Principles

1. Keep page composition and business logic separate.
2. Keep each content section isolated in its own component file.
3. Keep admin editing separate from public rendering.
4. Protect write operations with authentication.
5. Validate every API payload before writing data.
6. Keep content data centralized in a versionable data file.

## 2) Recommended Folder Structure

```text
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── contact/page.tsx
│   ├── content-admin/page.tsx
│   └── api/
│       ├── contact/route.ts
│       └── content/
│           ├── section-a/route.ts
│           ├── section-b/route.ts
│           ├── section-c/route.ts
│           ├── gallery/route.ts
│           └── media/route.ts
├── components/
│   ├── LayoutChrome.tsx
│   ├── Navbar.tsx
│   ├── ContactForm.tsx
│   ├── ui/
│   └── home/
│       ├── HeroSection.tsx
│       ├── SectionA.tsx
│       ├── SectionB.tsx
│       ├── SectionC.tsx
│       ├── Gallery.tsx
│       └── Footer.tsx
├── lib/
│   ├── api-security.ts
│   ├── content-store.ts
│   └── compression.ts
├── data/
│   └── home-content.json
├── public/
│   ├── content/            # managed uploads from admin
│   └── static-assets/
├── middleware.ts
└── docs/
		└── backup-and-restore.md
```

## 3) Page Composition Rules

- `app/page.tsx` only imports and composes sections.
- No heavy logic in page file.
- One section = one component file.
- Shared wrappers (`Navbar`, `Footer`, layout shell) belong in reusable layout components.

Example composition pattern:

```tsx
export default function HomePage() {
	return (
		<main>
			<HeroSection />
			<SectionA />
			<SectionB />
			<SectionC />
			<Gallery />
		</main>
	);
}
```

## 4) Admin Panel Architecture

Admin route:

- `/content-admin`

Admin panel responsibilities:

1. Load all editable sections from content APIs.
2. Provide per-section editing form state.
3. Save section data via `PATCH` endpoints.
4. Upload/replace images via media endpoint.
5. Show save/loading/error/success states per section.

Recommended UI behavior:

- tabbed or segmented section editor
- optimistic but safe save feedback
- strict client-side validation before submit
- disable submit while request is in progress

## 5) Auth and Access Control

Use middleware-level route protection.

### Required behavior

- Protect `/content-admin/*` with authentication.
- Protect non-GET `/api/content/*` endpoints with authentication.
- Allow public `GET` content APIs for rendering.

### Suggested auth method

- HTTP Basic Auth for small internal admin tools
- session-based auth for larger products

### Minimum middleware logic

1. Determine if current request needs auth.
2. If auth config missing, return `503`.
3. If credentials missing/invalid, return `401`.
4. Apply security headers to all responses.

### Security headers baseline

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- restrictive `Permissions-Policy`

## 6) Content API Design

Each section gets its own route with:

- `GET`: return section content
- `PATCH`: validate and update section content

Media upload route:

- `POST /api/content/media` with `multipart/form-data`
- accepts files under a known field (e.g., `files`)
- returns uploaded file `path` and `url`

### Validation rules

- Reject invalid content-type with `415`.
- Reject malformed JSON with `400`.
- Reject invalid schema with `400`.
- Reject oversized payload with `413`.

## 7) Content Storage Pattern

Use a dedicated storage module (e.g., `lib/content-store.ts`) as the only layer that reads/writes content.

Responsibilities:

1. Ensure data and media directories exist.
2. Read JSON safely and apply default schema fallbacks.
3. Write normalized content with `updatedAt` timestamp.
4. Track managed media paths and delete orphaned files.
5. Resolve relative media paths into public absolute URLs when needed.

Recommended data model shape:

```json
{
	"sectionA": {},
	"sectionB": {},
	"sectionC": {},
	"gallery": {
		"heading": "",
		"images": []
	},
	"updatedAt": "ISO-8601"
}
```

## 8) Media Upload and Compression

Media pipeline recommendations:

1. Validate file type and max file size.
2. Compress large JPEG images.
3. Keep unsupported formats unmodified unless policy requires conversion.
4. Save media under `public/content/` with deterministic unique names.
5. Return both relative `path` and absolute `url`.

## 9) Contact Flow (Optional Module)

Recommended pattern:

- Public contact form posts to `/api/contact`.
- API validates required fields.
- API forwards data to webhook/CRM endpoint.
- API returns stable success/error shape.

Keep contact integration isolated from admin/content APIs.

## 10) Environment Variables

Typical variables:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `PUBLIC_BASE_URL`
- `CONTACT_WEBHOOK_URL`

Rules:

- never hardcode secrets
- validate required env vars on startup or in request path
- prefer HTTPS-only deployments for admin/auth flows

## 11) Reuse Checklist for New Projects

When cloning this architecture for a new project:

1. Create section components first.
2. Compose page from sections only.
3. Define JSON schema for editable content.
4. Implement store module (`read`, `write`, media path management).
5. Implement section APIs (`GET` + `PATCH`).
6. Implement media upload API.
7. Build admin panel that edits each section.
8. Add middleware auth and security headers.
9. Add backup/restore docs for `data/` and managed media.

## 12) LLM Implementation Guardrails

When an LLM contributes code in this architecture, enforce:

- no inline styles for static design values
- no untyped API payloads
- no direct data-file writes outside storage module
- no bypassing auth for write endpoints
- no mixing admin logic into public section components
- no collapsing all sections into one file

This guardrail ensures maintainability as the codebase grows.
