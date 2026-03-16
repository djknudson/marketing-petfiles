# Session State

- **Date**: 2026-03-16
- **Phase**: Pre-ship — SEO/ASO complete, privacy policy compliant, bugs fixed
- **Version**: 0.3.0

## Next

- Set up GitHub remote (`gh auth login` needed — token expired)
- Deploy (GitHub Pages or similar)
- Visual QA in browser: verify bug fixes (page no longer scrolls to carousel on load, badge/icon overlap resolved during scroll animation)
- Review privacy policy in browser for formatting/readability
- Consider adding real testimonials once users provide feedback
- Ensure App Store Connect privacy nutrition labels match the updated privacy policy text

## Blockers

- GitHub CLI token expired — user must run `gh auth login -h github.com` interactively before pushing

## Last Session

9 commits: SEO/ASO improvements, two bug fixes, and privacy policy rewrite.

**SEO/ASO (Steps 1-7)**
- Smart App Banner (`apple-itunes-app` meta) on all 3 pages
- OG + Twitter Card meta tags on privacy.html and support.html
- Secured all 5 App Store links (`target="_blank" rel="noopener noreferrer"`)
- Removed `/us/` region lock from App Store URLs for international visitors
- Organization JSON-LD schema on subpages
- Long-tail keyword expansion on all pages + keywords meta on subpages
- Breadcrumb nav + BreadcrumbList JSON-LD on subpages + CSS

**Bug Fixes**
- Page no longer scrolls to "See it in action" on load — replaced `scrollIntoView` with `carouselTrack.scrollTo` (only scrolls horizontally within the track)
- Badge/icon overlap during scroll fixed — reduced scroll range (280→200px) and increased brand stagger (1.08→1.15) so the brand animation outpaces page scroll in the critical early phase

**Privacy Policy Rewrite**
- Corrected factual inaccuracies: data is cloud-only (Supabase), not on-device; cloud storage is default, not optional
- Named all third-party providers: Supabase (database + storage), Sentry (crash reporting)
- Added Apple Guideline 5.1.1 compliance: data retention policy (30-day deletion), consent revocation with timeline, third-party protection equivalence, no-tracking/no-IDFA disclosure, purpose limitation, data-linked-to-identity mapping, SDK disclosure, location non-collection, COPPA reference, legal entity identification (Wayward Son Software)

## Previous Session

Domain/email fix, Lighthouse audit with fixes, and scroll-driven microinteractions.
