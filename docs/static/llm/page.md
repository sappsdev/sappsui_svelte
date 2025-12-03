# SappsUI - Page Component System

> Optimized for AI code generation. Mobile-first, semantic, accessible.
> Semantic components for building Svelte/SvelteKit **+page.svelte** files. Optimized for AI code generation.

**This documentation is ONLY for page components**. For layout components (Navbar, Sidebar, etc.), see the separate layout documentation.

---

## Component Documentation

**Read these for detailed APIs and examples:**

### Layout & Structure
- [flex & grid](https://svelte.sappsdev.com/llm/flex-grid.md) - Layout utilities (`row`, `column`, `grid-*`, `gap-*`)
- [Section](https://svelte.sappsdev.com/llm/section.md) - Page structure component (hero, features, pricing)
- [Card](https://svelte.sappsdev.com/llm/card.md) - Content container component (products, profiles, stats)

### Interactive Components
- [Button](https://svelte.sappsdev.com/llm/button.md) - Interactive button component (actions, links, forms)
- [Accordion](https://svelte.sappsdev.com/llm/accordion.md) - Collapsible sections for organizing related content
- [Collapsible](https://svelte.sappsdev.com/llm/collapsible.md) - Single collapsible section for showing/hiding content
- [Carousel](https://svelte.sappsdev.com/llm/carousel.md) - Cycle through slides or content panels with navigation

### Display Components
- [Avatar](https://svelte.sappsdev.com/llm/avatar.md) - Display user profile images, initials, or icons with status indicators
- [Alert](https://svelte.sappsdev.com/llm/alert.md) - Display brief messages for users without interrupting workflow
- [Item](https://svelte.sappsdev.com/llm/item.md) - Display list items with avatars, icons, descriptions, and actions
- [Empty](https://svelte.sappsdev.com/llm/empty.md) - Display empty states with optional actions when no content is available
- [Marquee](https://svelte.sappsdev.com/llm/marquee.md) - Scrolling content widget for horizontal or vertical overflow

### Advanced Components
- [Table](https://svelte.sappsdev.com/llm/table.md) - Data table with pagination, sorting, filtering, and server-side support
- [ChatBox](https://svelte.sappsdev.com/llm/chat-box.md) - Complete chat interface with real-time messaging and WebSocket support

---

## System Overview

### Hierarchy for +page.svelte

```
+page.svelte
|-- Section (page structure: hero, features, pricing, footer)
    |-- Card (content blocks: products, profiles, stats)
        |-- Elements (Button, text, images, forms)
```

**Critical Rule**: Never nest Sections. Use Cards for nested content.

### Component Quick Reference

| Component | Purpose | Key Prop | Default |
|-----------|---------|----------|---------|
| **Section** | Page regions & structure | `bodyClass` | `variant="ghost"` |
| **Card** | Content containers | `bodyClass` | `variant="outlined"` |
| **Button** | Actions & navigation | `onclick` / `href` | `variant="primary"` |

**Shared Variants**: `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` `outlined`

---

## Layout System

**Apply via `bodyClass`** on Section/Card:

- **Flex**: `row` `column` `center` `wrap`
- **Grid**: `grid-1` `grid-2` `grid-3` `grid-4` `grid-6` `grid-12` `grid-auto-fit`
- **Spacing**: `gap-2` `gap-4` `gap-6` `gap-8` `gap-12`
- **Responsive**: `column md:row`, `grid-1 md:grid-3`, `gap-2 md:gap-6`

**Breakpoints**: `sm:640px` `md:768px` `lg:1024px` `xl:1280px` `2xl:1536px`

---

## Page Structure Pattern

```svelte
<script lang="ts">
  import { Section, Card, Button } from 'sappsui';
</script>

<!-- Hero Section -->
<Section variant="primary" isSolid bodyClass="center gap-6 min-h-screen">
  <!-- Hero content -->
</Section>

<!-- Features Section -->
<Section variant="muted" isBoxed bodyClass="gap-12 py-20">
  <div class="grid-1 md:grid-3 gap-6">
    <Card>Feature</Card>
    <!-- More cards -->
  </div>
</Section>

<!-- CTA Section -->
<Section variant="secondary" isSolid bodyClass="center gap-4 py-16">
  <!-- CTA content -->
</Section>

<!-- Footer Content -->
<Section variant="surface" bodyClass="md:row gap-8 py-12">
  <!-- Footer columns -->
</Section>
```

---

## Best Practices for +page.svelte

### DO
- Stack Sections vertically to build pages
- Use `isBoxed` on content sections (not hero)
- Apply `bodyClass` for layouts: `row`, `column`, `grid-3`
- Always use `gap` utilities for spacing
- Mobile-first responsive: `column md:row`
- Section for structure, Card for content, Button for actions

### DON'T
- Never nest Sections inside Sections
- Don't use layout components here (use layout files)
- Don't apply padding via `bodyClass` (components handle it)
- Don't forget responsive breakpoints

---

## For LLMs: Key Instructions

When generating **+page.svelte** files:

1. **Structure**: Use Section for page regions (hero, features, pricing, CTA)
2. **Content**: Use Card for content blocks (products, profiles, stats)
3. **Layout**: Apply via `bodyClass` with flex/grid utilities
4. **Spacing**: Always use `gap` utilities
5. **Responsive**: Mobile-first with breakpoint prefixes
6. **No Nesting**: Never nest Sections
7. **Page Only**: This is for page content, not persistent layouts

**Component Syntax**:
```svelte
<Section variant="primary" isSolid isBoxed bodyClass="center gap-6">
<Card variant="outlined" hasShadow bodyClass="column gap-4">
<Button variant="primary" size="lg" onclick={handler}>Label</Button>
```

**See individual component docs for complete APIs and pattern examples.**
