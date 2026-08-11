# MergeBoost - adaptogenic nootropic drinks crafted for developers, gamers, and night-owl creators.

![Project Logo](./public/screen.png)


## 📋 1. Requirement Analysis

**Overview:**  
A centralized content pipeline and dashboard platform designed to manage the lifecycle of social media posts from ideation to publication.

### ✨ Key Functional Requirements
* **Role-Based Access Control (RBAC):** Distinct user roles including Content Creators (can draft and submit), Approvers (can review, reject, or approve), and Admins (full access).
* **Content Lifecycle Management:** Posts must move through a strict state machine: `Draft` ➔ `Pending Approval` ➔ `Approved` / `Rejected` ➔ `Published` / `Scheduled`.
* **Real-time Dashboard:** A centralized view for users to track total posts, drafts, pending tasks, and live content based on their permission level.
* **Asset & Metadata Management:** Ability to attach image URLs, campaign names, target platforms, hashtags, and scheduling times to posts.

### ⚙️ Non-Functional Requirements
* **Security:** API routes must validate user sessions and roles before processing state changes.
* **Scalability:** The system must utilize a scalable NoSQL database (MongoDB) and external blob storage (R2) to handle growing media and post volumes.

---

## 🏗️ 2. System Design (Architecture)

The system follows a modern, decoupled Client-Server architecture utilizing the Next.js App Router for both frontend rendering and backend API routes.

### 🧩 Component Breakdown
* **Frontend (Client):** Next.js React components styled with Tailwind CSS, utilizing Clerk for client-side authentication states.
* **Backend (Server):** Next.js API Routes (`/api/posts`, `/api/upload`) acting as RESTful endpoints.
* **External Services:**
  * **Clerk:** Identity and Access Management (IAM).
  * **MongoDB:** Primary data persistence.
  * **Cloudflare R2 (or AWS S3):** Object storage for media uploads (handled via `lib/r2.ts`).

### 📊 Architecture Diagram

```mermaid
graph TD
    Client[Client Browser / UI] -->|Auth Token| Clerk[Clerk Auth Service]
    Client -->|HTTP GET/POST/PATCH| API[Next.js API Routes]
    
    API -->|Verify Session & Role| Clerk
    API -->|Mongoose CRUD| DB[(MongoDB)]
    API -->|Upload Media| R2[(R2 Object Storage)]
    
    subgraph Frontend
    Client
    end
    
    subgraph Backend Core
    API
    end
    
    subgraph External Infrastructure
    Clerk
    DB
    R2
    end
```

## 🗄️ 3. Database Design

The primary entity is the `Post` model. We are using a NoSQL document structure (MongoDB) via Mongoose. User data is not heavily duplicated in our DB; instead, we rely on Clerk's user IDs (`creatorId`) to link records to authenticated users.

**Collection:** `posts`

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | Unique identifier for the post. |
| `title` | String (Required) | The headline or title of the post. |
| `description` | String (Required) | The main body/caption of the content. |
| `imageUrl` | String | URL pointing to the asset stored in R2. |
| `hashtags` | Array of Strings | Associated tags for the post. |
| `campaignName` | String (Required) | The marketing campaign this post belongs to. |
| `targetPlatforms` | Array of Strings | E.g., `["Twitter", "LinkedIn", "Instagram"]`. |
| `status` | String (Enum) | Must be: `Draft`, `Pending Approval`, `Approved`, `Rejected`, `Published`, or `Scheduled`. |
| `published` | Boolean | True if live, false otherwise. Default is `false`. |
| `creatorId` | String (Required) | The unique Clerk User ID of the author. |
| `createdBy` | String | Cached name of the author for quick display. |
| `rejectReason` | String | Populated only if an Approver rejects the post. |
| `scheduledTime` | Date | Future timestamp for publishing. |
| `createdAt` / `updatedAt` | Timestamp | Automatically managed by Mongoose. |

## 🛡️ 4. Privacy & Ethical Considerations

- **Data Minimization:** We do not store passwords, raw personal identifiers, or excessive user data in our database. Identity management is completely offloaded to Clerk, an enterprise-grade identity provider, ensuring secure credential handling.
- **Strict Access Control (RBAC):** The backend API enforces strict role checks. A standard creator mathematically cannot patch a post's status to `Published` or `Approved` via API manipulation, preventing unauthorized content from going live.
- **Transparency & Feedback:** The workflow includes a `rejectReason` field. This ensures ethical management practices where creators aren't left in the dark about why their work was blocked; they receive direct, constructive feedback.
- **Consent and Ownership:** By segregating data by `creatorId`, the system inherently protects users from having their drafts viewed, edited, or deleted by peers. Only authorized managers and the original author have visibility into a specific piece of pipeline content.
