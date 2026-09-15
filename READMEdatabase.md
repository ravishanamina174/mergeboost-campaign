# 🗄️ Database Architecture & Storage Guidelines

**Owner:** Imasha (Backend / Database Administrator)  
**Project:** MergeBoost Platform

---

## 📌 Database Overview
MergeBoost utilizes **MongoDB** via **Mongoose ORM** for primary data persistence and **Cloudflare R2** for serverless object storage.

### 1. Database Connections (`src/lib/db.ts`)
* Ensure `MONGODB_URI` is supplied in `.env.local`.
* Always use cached database connections in Next.js Serverless Route Handlers to avoid reaching MongoDB connection limits during hot-reloads.

### 2. Schema Standards (`src/lib/models.ts`)
* **Posts Schema (`posts` collection):**
  * Tracks post states: `Draft`, `Pending Approval`, `Approved`, `Rejected`, `Published`, `Scheduled`.
  * Integrates with Clerk authentication via `creatorId`.
  * Stores public asset URLs pointing to Cloudflare R2 (`imageUrl`).
* **Campaigns Schema (`campaigns` collection):**
  * Stores top-level marketing initiatives (`name`, `goal`, `imageUrl`, `createdBy`).

### 3. Object Storage Operations (`src/lib/r2.ts`)
* Uses AWS S3 SDK (`@aws-sdk/client-s3`) configured to Cloudflare R2 S3-compatible API.
* File keys must be collision-resistant using unique prefixes: `uploads/{timestamp}-{hash}.{ext}`.

### ⚠️ Critical Rules for Database Ops
* Never commit hardcoded DB URIs or Cloudflare API keys to repository files.
* Always enforce indexed field queries when extending filtering logic (`status`, `creatorId`, `published`).
