# 🧪 Testing, CI/CD, & UI/UX Standards

**Owner:** Thejan (QA / Documentation / DevOps)  
**Project:** MergeBoost Platform

---

## 📌 Quality Assurance & Deployment Pipeline

### 1. Continuous Integration & Deployment (CI/CD)
* **Hosting:** Vercel Production Environment connected directly to main repository branch.
* **Pre-flight Checks:** Ensure all TypeScript interfaces compile cleanly (`npm run build`) before pushing changes to production.

### 2. Testing Framework
* Verify API response signatures for `/api/posts`, `/api/campaigns`, and `/api/upload`.
* Validate Role-Based Access Control (RBAC) behavior:
  * **Creators** can only write drafts and submit posts for review.
  * **Approvers & Admins** can change statuses to `Approved`, `Rejected`, or `Published`.

### 3. UI/UX & Compliance Testing
* Validate form responses, rejection feedback handling (`rejectReason`), and modal interactions.
* Ensure privacy notices, data protection, and social media guidelines comply with platform requirements.

---

## 🚀 Quick Commands
```bash
# Verify production build locally
npm run build

# Run local development server
npm run dev
