---
name: Clinical Intelligence System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#584140'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#8c716f'
  outline-variant: '#dfbfbd'
  surface-tint: '#ab3234'
  primary: '#69000e'
  on-primary: '#ffffff'
  primary-container: '#8b1a20'
  on-primary-container: '#ff9a95'
  inverse-primary: '#ffb3af'
  secondary: '#4d6077'
  on-secondary: '#ffffff'
  secondary-container: '#cee1fd'
  on-secondary-container: '#51647b'
  tertiary: '#223246'
  on-tertiary: '#ffffff'
  tertiary-container: '#38485d'
  on-tertiary-container: '#a6b7d0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3af'
  on-primary-fixed: '#410005'
  on-primary-fixed-variant: '#8a1920'
  secondary-fixed: '#d1e4ff'
  secondary-fixed-dim: '#b5c8e3'
  on-secondary-fixed: '#071d31'
  on-secondary-fixed-variant: '#35485e'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is anchored in the principles of **Corporate Modernism** with an editorial, healthcare-centric focus. It aims to evoke feelings of authority, reliability, and academic rigor, catering to healthcare executives and clinical leaders. 

The visual language balances the warmth of a deep maroon accent—signifying leadership and urgency—with the clinical precision of high-contrast typography and a structured grid. The aesthetic is clean and spacious, prioritizing legibility and information architecture over decorative elements. It uses a sophisticated mix of traditional serif headers to establish credibility and modern sans-serif body text for high-performance data consumption.

## Colors

The palette is dominated by high-contrast neutrals and a signature healthcare maroon.

*   **Primary (Maroon):** Used for primary actions, critical labels, and brand accents. It provides a sense of importance and "live" urgency.
*   **Secondary (Ink Blue):** A deep, near-black blue used for primary navigation, headings, and high-emphasis text to provide better readability than pure black.
*   **Tertiary (Slate):** Used for secondary text, metadata, and borders.
*   **Backgrounds:** A tiered system of white (`#FFFFFF`) for cards and surfaces, and a subtle off-white (`#F8F9FA`) for the main application background to reduce eye strain.

## Typography

This design system utilizes a classic serif/sans-serif pairing. 

**Newsreader** is the primary display face, used for all significant headings. Its editorial character reinforces the "intelligence" aspect of the platform.

**Hanken Grotesk** is used for all functional text, including body copy, labels, and metadata. It provides a contemporary, clean contrast to the serif headings. 

Metadata and category markers should always use the `label-caps` style to distinguish them clearly from the narrative content.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a sidebar-content split. 
*   **Desktop:** 12-column grid. The main content typically occupies 8 columns, with a 4-column sidebar on the right for auxiliary information and "unlocked" highlights.
*   **Tablet:** Content reflows to a single column with the sidebar moving below the main list or appearing as a secondary drawer.
*   **Spacing Rhythm:** An 8px base unit drives all dimensions. Vertical stack spacing is generous (32px between sections) to maintain the clean, editorial feel.

Card elements use a dynamic internal padding of 24px-32px to ensure content feels encapsulated and high-value.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and **Low-contrast outlines**.

*   **Surfaces:** Cards are pure white, placed on a light grey background. 
*   **Borders:** Rather than heavy shadows, elements are defined by subtle 1px borders in a soft slate tone (`#E2E8F0`).
*   **Interactive Depth:** A very soft, diffused ambient shadow (8% opacity, 12px blur) is used exclusively on hover states for primary cards to indicate interactivity without cluttering the static layout.
*   **Dividers:** Horizontal rules in sidebar widgets use the accent maroon color at a 2px thickness to establish clear section boundaries.

## Shapes

The shape language is a mix of architectural rigidity and approachable softness.
*   **Cards:** Use a standard 8px (0.5rem) radius to feel professional yet modern.
*   **Filter Chips & Primary Buttons:** Utilize a full pill-shape (2rem+) to distinguish interactive navigational elements from informational content blocks.
*   **Inputs:** Search bars and dropdowns use a 4px (0.25rem) radius for a more technical, precise feel.

## Components

### Content Badges
Distinct badges differentiate content formats, using a combination of icons and `label-caps` typography:
*   **Webinars:** Maroon text with a "Play" or "Radio" icon.
*   **Whitepapers:** Slate-blue text with a "Document" icon.
*   **Podcasts:** Deep teal or indigo text with a "Microphone" icon.
*   **Tags:** Soft grey background pill with small sans-serif text for keywords.

### Buttons
*   **Primary Action:** Solid Maroon background, white text, pill-shaped, featuring a trailing arrow icon.
*   **Secondary Action (Filters):** White background, Slate border, dark text. The active state flips to a dark Ink Blue background with white text.

### Featured Lists
Used in the sidebar. These feature high-contrast, oversized maroon numerals (01, 02, 03) to create an editorial "Top Stories" feel, paired with serif sub-headings.

### Input Fields
The search bar is prominent and wide, using a subtle border and the secondary font for placeholder text. It is designed to look integrated into the header layout rather than a floating element.