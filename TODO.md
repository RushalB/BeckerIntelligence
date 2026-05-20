# Asset-Detail Page UX TODO List

This document tracks planned UX refinements and high-impact feature enhancements for the **Asset-Detail / Sign-up Page** (`public/signup.html`). We will circle back to these points to iteratively polish the conversion and viewing experience.

---

## 📋 Gated Content Unlock & Interactive Viewers
- [ ] **Dynamic Content Transformation**: Once access is granted (via `localStorage` check), dynamically swap the generic cover illustration with a premium **Unlocked Premium Viewer Widget** matching the asset type:
  - **Live Webinar**:
    - Build a real-time countdown timer ticking down to the event execution date (June 10, 2026).
    - Render interactive "Add to Calendar" dropdown selectors (Outlook, Google Calendar, iCal).
    - Provide a "Join Live Session" fallback mock button that activates 10 minutes before start time.
  - **On-Demand Webinar / Video**:
    - Render a simulated custom video player screen with custom overlay controls (Play/Pause state, progress bar timeline slider, volume controls, HD selector, and fullscreen mock toggles).
  - **Whitepaper**:
    - Design a mock browser-native PDF document reader.
    - Render a top document control bar (Page 1 of 12 counter, zoom toggles, mock download/print commands) with a vertically scrollable whitepaper page simulator containing styled charts, graphics, and headers.
  - **On-Demand Podcast**:
    - Design a sleek digital audio player.
    - Render a responsive mock soundwave progress bar, play/pause controls, forward/rewind 15-second skip keys, and playback speed adjusters (1.0x, 1.25x, 1.5x).

---

## 📈 Form & Modal Interaction Polish
- [ ] **Form Validation Feedback**:
  - Add real-time inline validation rings (green on valid, red on invalid) for form fields (`email`, `firstName`, `lastName`, `jobTitle`, `companyName`) with custom micro-messages below each input instead of a single error container block.
  - Enable character limits and autocomplete styling overrides to fit the Becker's color palette.
- [ ] **Keyboard Accessibility**:
  - Implement full keyboard trap controls within the modal so pressing `Tab` loops focus strictly inside modal elements when open.
  - Bind the Escape key (`Esc`) to cleanly animate and close the modal window.

---

## ✨ Micro-Animations & Styling Aesthetics
- [ ] **Speaker Cards Transitions**:
  - Add active transition states on featured speaker cards. On hover, apply a subtle shadow elevation (`var(--shadow-sm)`), scale the initials-avatar, and tint the background to cool ice blue (`var(--bh-ice-100)`).
- [ ] **Smooth CTA Scaling**:
  - Apply hover scaling effects (`transform: translateY(-1px) scale(1.02);`) and transition curves (`cubic-bezier(0.16, 1, 0.3, 1)`) to the primary Access button to drive higher click intent.

---

## 🏛️ Brand & Accessibility Compliance
- [ ] **Typographic Consistency**:
  - Audit and convert single-asset page headlines/titles to sentence case as per Becker's design system style guide, while keeping CTAs/navigation in Title Case.
- [ ] **Restrain Transitions to Brand Guidelines**:
  - Review transitions and ensure hover behaviors fit Becker's standard print-editorial state transitions (e.g. background/border color shifts, underlines) rather than consumer app scaling or shrinking.
- [ ] **Accessibility (a11y) & ARIA Integration**:
  - Add proper ARIA labels, descriptive help text relationships (`aria-describedby`), and `aria-live` containers to form feedback boxes.
- [ ] **Local Storage Cache Manager**:
  - Add a small testing utility in the header/footer to view the current cached registration session and clear it with one click.
