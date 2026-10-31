# PhysiQ V2 — Safe Staging Rollout

## What is included
- `v2.html`: premium editorial landing design, responsive semester selector, chapter discovery, and a **live workspace** that loads the existing PhysiQ as an embedded frame.
- This is a **transitional integration**, not a replacement of all screens inside the original `index.html`.
- The V2 shell does not send pretest/posttest data, write student activity, read Google Sheets, change question banks, or change existing marking schemes.

## What has not changed
- `index.html` — original application and assessments.
- `Code.gs` — Apps Script backend.
- `papers/`, `downloads/`, `diagrams.js` — original STPM content.
- GitHub Pages production deployment from `main`.

## Safety and acceptance checks before merging
1. Test V2 on the same GitHub Pages origin as the original app; iframe embedding must succeed. The standalone HTML file uses the public production URL as a fallback.
2. Open Study, Practice, Past Papers, Research and Teacher entry points. The V2 menu opens the **original app**; choose the specific module inside that app.
3. Check Semester 1, Semester 2, and Semester 3 in the existing app. Note that changing the V2 semester selector alone does not change the original app's semester selection.
4. Test laptop and phone viewport widths, keyboard navigation and back button.
5. With **test accounts only**, verify original pretest and posttest availability, submission and teacher records. Do not submit sample or repeat real participants' research tests.
6. Independently verify that research results, topic mapping, original timestamps and historical scores remain unchanged after deployment.
7. Resolve existing student-data access control risk separately. The current Apps Script read endpoints and client-side teacher PIN require an authenticated server-side model before broader rollout.

## Research ethics and data integrity
- Preserve pretest/posttest items, item difficulty, answer keys, time limits, and marking rules across an ongoing study.
- Back up and freeze baseline results. Export and preserve an instrument version, cohort identifiers and dates.
- Keep research raw data separate from demonstrative dashboard data.

## Publication notes
The V2 staging page is a new optional entrance page. It is **not** automatically live on GitHub Pages while in this branch. The final `main` site is unchanged until reviewed and merged. Do not make it the default homepage or replace `index.html` until the real modules have been fully styled, authenticated and QA-tested.
