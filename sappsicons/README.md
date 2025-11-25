# 🎨 SappsIcons

A comprehensive JavaScript icon library that brings together the best icon collections in a single package.

## 📦 Installation

```bash
bun add sappsicons
```

## 🚀 Usage

```typescript
import {
  circleFlagsIcons,
  fluentFilledIcons,
  fluentRegularIcons,
  logosIcons,
  solarBoldIcons,
  solarBoldDuotoneIcons,
  solarBrokenIcons,
  solarLineDuotoneIcons,
  solarLinearIcons,
  solarOutlineIcons,
  svgSpinnersIcons,
} from "sappsicons";

// Use a specific icon
const homeIcon = solarLinearIcons.home;
const spinnerIcon = svgSpinnersIcons.spinner;
```

## 📚 Available Collections

### Circle Flags

Country flag icons in circular format.

```typescript
import { circleFlagsIcons } from "sappsicons";
```

### Fluent Icons

Icons from Microsoft's Fluent Design System.

```typescript
import { fluentFilledIcons, fluentRegularIcons } from "sappsicons";
```

### Logos

Collection of brand and technology logos.

```typescript
import { logosIcons } from "sappsicons";
```

### Solar Icons

Complete icon system with multiple style variants.

```typescript
import {
  solarBoldIcons,
  solarBoldDuotoneIcons,
  solarBrokenIcons,
  solarLineDuotoneIcons,
  solarLinearIcons,
  solarOutlineIcons,
} from "sappsicons";
```

### SVG Spinners

Collection of loading animations and spinners.

```typescript
import { svgSpinnersIcons } from "sappsicons";
```

## 💡 Usage Example

```typescript
// In a Svelte component
<script>
  import { solarLinearIcons } from 'sappsicons';
</script>

{@html solarLinearIcons.home}
```

```typescript
// In React/Vue or vanilla JS
import { fluentFilledIcons } from "sappsicons";

document.getElementById("icon-container").innerHTML = fluentFilledIcons.star;
```

## 🎯 Features

- **Tree-shakeable**: Only import the icons you need
- **TypeScript support**: Full type definitions included
- **Multiple collections**: Access to thousands of icons from different sets
- **Zero dependencies**: Lightweight and fast
- **ESM format**: Modern JavaScript module format

## 🔧 Development

```bash
# Install dependencies
bun install

# Build the library
bun run dist

# Publish to npm
bun run release
```

## 📄 License

This library aggregates icons from various sources. Please check the individual icon set licenses:

- Circle Flags
- Fluent Icons (Microsoft)
- Logos
- Solar Icons
- SVG Spinners

## 👨‍💻 Author

**SappsDev**

- Email: info@sappsdev.com
- GitHub: [sappsdev](https://github.com/sappsdev)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📦 Repository

[https://github.com/sappsdev/sappsui_svelte](https://github.com/sappsdev/sappsui_svelte)
