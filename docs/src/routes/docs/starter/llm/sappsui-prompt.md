# SappsUI - Svelte Component Library

## Available Components

### Layout

- **Card**: `variant="solid|soft|outline|ghost"` `color="default|surface|primary|secondary|muted"` `divider shadow hover overlay` `cover="/path"` `header footer` snippets
- **Section**: Container with consistent padding
- **Divider**: `vertical` for vertical orientation

### Forms

- **Button**: `variant="solid|outline|soft|ghost|link"` `color="primary|secondary|muted|success|warning|error|info"` `size="tiny|small|medium|large"` `loading disabled wide` `startIcon endIcon` `href` or `onclick`
- **Checkbox**: `bind:checked` `name label`
- **Select**: `options=[{id, label}]` `bind:value` `label name size="small|medium|large"`

### Navigation

- **Tabs**: `tabs=[{id, label, content}]` `position="top|bottom|start|end"` `variant="solid|pill|outline|underlined|ghost"` `color="primary|secondary"`
- **SideNav**: `items=[{type, label, href, icon, subitems}]` `color="primary|secondary"` - Supports header, divider, submenu types

### Display

- **Code**: `lang="svelte|typescript|javascript"` `code="..."`

## Typography

- Headings: `<h1>` to `<h6>` (use directly or wrap in `.prose`)
- Classes: `.lead .label .tiny .link`
- **Prose**: Wrap content in `<div class="prose">` for articles/docs

## Utility Classes

- Layout: `.column .row .center .gap-{n} .flex-1`
- Sizing: `.w-full .min-w-{size} .max-w-{size}`
- Spacing: `.p-{n} .m-{n} .mt-{n} .mb-{n}`
- Grid: `.grid .grid-cols-{n}`

## Icons

Use Iconify with fluent icons: `icon="fluent:icon-name-24-regular"`

## Example

```svelte
<script lang="ts">
	import { Card, Button, Tabs } from 'sappsui';
	const tabs = [{ id: '1', label: 'Tab 1', content: 'Content' }];
</script>

<Card variant="outline" shadow>
	<h3>Title</h3>
	<p>Content here</p>
	<Button color="primary" label="Action" />
</Card>
```

Generate clean, functional Svelte code using these components.
