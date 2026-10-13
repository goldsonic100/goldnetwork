# SkillSwap — Trade skills, not money

A responsive frontend concept for a skill-barter marketplace where people exchange services directly and build reputation through completed swaps.

## Preview locally

Open `index.html` in a browser. No build tools or package installation are required.

## Included interactions

- Search by skill, person, or service
- Filter by skill category
- Sort by recommendation, rating, or completed sample swaps
- Save and unsave sample profiles for the current session
- View a profile preview
- Draft a swap proposal with a confirmation preview
- Responsive mobile navigation

## Project structure

- `index.html` — page structure and dialog markup
- `styles.css` — responsive design and components
- `app.js` — sample member data and frontend interactions

## Important demo limitations

This is a frontend prototype. Member profiles, review counts, ratings, and swaps are sample data and are **not verified**. Account creation, authentication, persistent saved profiles, secure messaging, identity verification, reporting/moderation, and real reputation metrics need a backend and appropriate safeguards before launch.

For a production version, add a secure database and authentication provider, server-side authorization, abuse reporting, privacy controls, and reviews that can only be submitted after an exchange is marked complete by both participants. Avoid claiming identity verification until an actual verification process exists.