# Real-World Software Engineering: Client Discovery Questionnaire

Use this checklist during initial client meetings (discovery phase) to gather clear, actionable inputs for building a Software Requirements Specification (SRS).

---

## 1. Vision, Goals, & Scope (The "Why")

1. **Problem Statement:** What specific real-world problem does this software solve for your business or customers?
2. **Success Metrics:** How will you measure the success of this project once launched (e.g., revenue, active users, time saved)?
3. **Out of Scope:** Is there anything explicit that this version of the software **should NOT** do?

---

## 2. Target Audience & Users (The "Who")

1. **User Roles:** Who are the primary users of this application, and what distinct roles/permissions exist (e.g., Admin, Customer, Manager)?
2. **Technical Proficiency:** How comfortable are your target users with technology?
3. **Usage Environment:** Where and how will users access the software (e.g., on mobile phones while on the move, on desktop computers in an office)?

---

## 3. Core Functionality & Workflows (The "What")

1. **Key Capabilities:** What are the 3 to 5 core features that the system *must* have for launch (Minimum Viable Product / MVP)?
2. **User Journey:** Can you walk us through a step-by-step example of how a primary user completes their main task?
3. **Data Management:** What inputs will users provide, and what outputs (e.g., reports, exported files, dashboards) do they expect to receive?

---

## 4. Technical Constraints & Ecosystem (The "How")

1. **Existing Infrastructure:** Does this system need to integrate with existing legacy software, databases, or third-party APIs (e.g., Stripe, Salesforce, Google Maps)?
2. **Platform Requirements:** What platforms are required (Web, iOS, Android, Desktop)? Are there specific browser or OS versions to support?
3. **Hosting & Maintenance:** Do you have existing cloud infrastructure (AWS, Azure, GCP) or hosting preferences?

---

## 5. Non-Functional Requirements (Quality & Standards)

1. **Performance & Scale:** How many active users or concurrent operations do you expect at launch? What about 1-2 years later?
2. **Security & Compliance:** Are there industry regulatory standards to comply with (e.g., GDPR, HIPAA, PCI-DSS for payments)?
3. **Availability:** How critical is downtime? Does the system require 24/7 availability ($99.9\%+$ uptime)?

---

## 6. Project Constraints & Logistics

1. **Timeline & Milestones:** Is there a hard deadline (e.g., product launch event, funding milestone)?
2. **Budget & Licensing:** Are there constraints around third-party software licensing or ongoing operational costs?
3. **Decision-Making:** Who on your team has final sign-off authority for requirements and design approvals?

---

## Next Steps for the Engineering Team

* Conduct a 60-to-90-minute discovery workshop using these questions.
* Record the session and convert client responses directly into **Section 2 (Overall Description)** and **Section 3 (Specific Requirements)** of your SRS document.