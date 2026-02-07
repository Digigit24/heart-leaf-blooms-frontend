# Tasks Completed Today (Feb 6, 2026)

## 📜 Razorpay Compliance & Business Policies

### 1. Created Essential Policy Pages
Implemented 5 new pages to meet Razorpay merchant onboarding requirements:
- **Terms & Conditions:** Covers IP rights, user responsibilities, and liability.
- **Cancellation & Refund Policy:** Explicit refund timelines (5-7 days for online, 24-48 hrs for UPI) and cancellation rules.
- **Shipping & Delivery Policy:** Details shipping areas (Pan-India), processing time (24-48 hrs), and delivery estimates.
- **Privacy Policy:** Compliant data collection, usage, and security disclosures.
- **Sitemap:** Clean overview of all site links.

### 2. Full Site Integration
- **Routes:** Added new routes (`/terms-and-conditions`, `/cancellation-refund`, `/shipping-delivery`, `/privacy-policy`, `/sitemap`).
- **Footer:** Updated footer links to point to these new pages using centralized path constants.
- **Navigation:** Ensured seamless navigation from any part of the site.

### 3. Contact & Business Details Update
- **Updated Contact Page:** Added verifiable business contact details required for compliance:
  - **Phone:** +91 90116 00622
  - **Email:** heartleafbloomsonline@gmail.com, sales@heartleafblooms.com
  - **Address:** 123 Botanical Garden St, Pune, MH 411001, India
- **Updated Footer:** Reflected the same contact details for consistency.

### 4. Technical Updates
- **API Configuration:** Switched `client.js` base URL to the live backend (`https://heart-leaf-blooms.celiyo.com/`) to prepare for production/deployment.
- **Build Checks:** Verified successful build (`npm run build`) and resolved routing syntax errors.

## 📝 Git Commits
- `b1be0e4` - Create business policy pages
- `7d2b2df` - Change base URL
- `7457d52` - Policy pages for Razorpay approve
