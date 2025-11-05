# react-native-scaler

A production-ready scaling utility for React Native applications that enables consistent, responsive UI across different device sizes and screen densities. Built with TypeScript, fully tested, and designed to bridge the gap between your design specifications (Figma, Sketch, etc.) and real-world device screens.

## Why This Library?

React Native's default styling doesn't account for varying screen dimensions across devices. A UI that looks perfect on an iPhone 14 may appear cramped on an iPhone SE or oversized on an iPad. This library solves that problem by providing intelligent scaling functions that:

- **Maintain design proportions** across all devices
- **Respect user accessibility preferences** (font scaling, display zoom)
- **Ensure pixel-perfect rendering** on high-DPI displays
- **Handle orientation changes** automatically
- **Provide device-aware adaptive scaling** (tablets vs phones)

## Installation

```bash
npm install @shayrn/react-native-scaler
# or
yarn add @shayrn/react-native-scaler
# or
pnpm add @shayrn/react-native-scaler
# or
bun add @shayrn/react-native-scaler
```

For Expo projects:
```bash
npx expo install @shayrn/react-native-scaler
```

## Quick Start

```typescript
import { scale, scaleFont } from '@shayrn/react-native-scaler';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: scale(16),
    margin: scale(20),
    borderRadius: scale(12),
  },
  title: {
    fontSize: scaleFont(24),
    marginBottom: scale(12),
  },
});
```

## Configuration

By default, the library uses a reference dimension of 402×874 (based on common design specs). If your design uses different dimensions, configure them once at app startup:

```typescript
import { configureScaler } from '@shayrn/react-native-scaler';

// In your App.tsx or _layout.tsx
configureScaler({
  referenceWidth: 390,   // Your design's base width
  referenceHeight: 844,  // Your design's base height
});
```

**When to configure:**
- Your design mockups use specific device dimensions (e.g., iPhone 14: 390×844)
- You're working with existing designs that don't match the default
- You want to match a specific design system

## Core API

### Basic Scaling

#### `scale(size, options?)`

Universal scaling function that maintains proportions across devices.

```typescript
// Basic usage
const padding = scale(16);

// With constraints
const padding = scale(16, { min: 12, max: 24 });

// Width-based scaling (useful for horizontal layouts)
const width = scale(100, { useUniform: false });
```

**Options:**
- `min`: Minimum pixel value (prevents too-small sizing)
- `max`: Maximum pixel value (prevents too-large sizing)
- `useUniform`: Use uniform scale (default) or width-only scale

#### `scaleWidth(size, options?)` / `scaleHeight(size, options?)`

Scale based on a single dimension.

```typescript
const cardWidth = scaleWidth(300);
const cardHeight = scaleHeight(200, { min: 150, max: 250 });
```

**Use cases:**
- `scaleWidth`: Horizontal elements, cards, containers
- `scaleHeight`: Vertical elements, lists, scroll views

#### `scaleRadius(radius, options?)`

Specialized function for border radius scaling.

```typescript
const borderRadius = scaleRadius(12, { min: 8, max: 16 });
```

### Typography Scaling

#### `scaleFont(fontSize, options?)`

Font size scaling with accessibility support.

```typescript
// Respects user's accessibility font scale (default)
const fontSize = scaleFont(16);

// With constraints
const fontSize = scaleFont(16, { min: 14, max: 20 });

// Ignore accessibility settings (not recommended)
const fontSize = scaleFont(16, { respectAccessibility: false });
```

**Default constraints:** min: 10, max: 100

**Accessibility:** By default, font sizes respect the user's system font scale preference. This ensures your app remains accessible to users with visual impairments.

#### `scaleLineHeight(lineHeight, options?)`

Line height scaling with the same accessibility considerations as fonts.

```typescript
const lineHeight = scaleLineHeight(24, { min: 20, max: 32 });
```

### Responsive Helper

For more semantic code, use the `responsive` object:

```typescript
import { responsive } from '@shayrn/react-native-scaler';

const styles = {
  container: {
    padding: responsive.spacing(16),
    margin: responsive.adaptiveSpacing(20), // Auto-adjusts for tablets
    borderRadius: responsive.radius(12, { min: 8, max: 16 }),
  },
  text: {
    fontSize: responsive.font(16, { min: 14, max: 20 }),
    lineHeight: responsive.lineHeight(24),
  },
  separator: {
    height: responsive.pixelPerfect(1), // Crisp 1px line
  },
};
```

**Available methods:**
- `responsive.width(value, options?)`
- `responsive.height(value, options?)`
- `responsive.font(value, options?)`
- `responsive.lineHeight(value, options?)`
- `responsive.radius(value, options?)`
- `responsive.spacing(value, options?)`
- `responsive.adaptiveSpacing(value)` - Auto-adjusts for device type
- `responsive.pixelPerfect(value)` - Pixel-perfect rendering

## Advanced Features

### Device Information

Access detailed device information for conditional rendering:

```typescript
import { deviceInfo } from '@shayrn/react-native-scaler';

if (deviceInfo.isTablet) {
  // Render tablet-specific UI
}

console.log({
  pixelRatio: deviceInfo.pixelRatio,      // 2.0, 3.0, etc.
  fontScale: deviceInfo.fontScale,        // User's font scale
  isHighDensity: deviceInfo.isHighDensity, // >= 2x pixel ratio
  isTablet: deviceInfo.isTablet,          // Min dimension >= 768
  isSmallDevice: deviceInfo.isSmallDevice, // Min dimension < 350
  aspectRatio: deviceInfo.aspectRatio,    // Width/height ratio
});
```

### Adaptive Scaling

Automatically adjust spacing based on device type:

```typescript
import { responsive, deviceInfo } from '@shayrn/react-native-scaler';

const styles = {
  // Auto-adjusts: 1.2x for tablets, 0.8x for small devices
  container: {
    padding: responsive.adaptiveSpacing(16),
  },

  // Manual device-specific styling
  title: {
    fontSize: deviceInfo.isTablet
      ? responsive.font(24, { min: 20, max: 28 })
      : responsive.font(18, { min: 16, max: 20 }),
  },
};
```

### Orientation Change Handling

React to device orientation changes:

```typescript
import { onOrientationChange } from '@shayrn/react-native-scaler';
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    const subscription = onOrientationChange(() => {
      // Scales are automatically recalculated
      console.log('Orientation changed');
      // Force re-render if needed
      forceUpdate();
    });

    return () => subscription.remove();
  }, []);

  // Component code...
}
```

### Pixel-Perfect Rendering

Ensure crisp rendering on all devices:

```typescript
import { getPixelSize, responsive } from '@shayrn/react-native-scaler';

const styles = {
  // Method 1: Using responsive helper
  separator: {
    height: responsive.pixelPerfect(1),
    backgroundColor: '#E0E0E0',
  },

  // Method 2: Using getPixelSize directly
  border: {
    borderWidth: getPixelSize(1),
  },
};
```

**Use cases:**
- Hairline borders and separators
- Grid lines
- Small icons and indicators
- Any element that must be visually consistent across devices

### Pre-built Responsive Styles

Quick-start style objects for common patterns:

```typescript
import { responsiveStyles } from '@shayrn/react-native-scaler';

// Use as-is
<View style={responsiveStyles.container}>
  <Text style={responsiveStyles.text}>Hello</Text>
</View>

// Or extend
<View style={[responsiveStyles.container, { backgroundColor: 'white' }]}>
  <Text style={[responsiveStyles.adaptiveText, { color: 'blue' }]}>
    Adaptive Text
  </Text>
</View>
```

**Available styles:**
- `responsiveStyles.container` - Standard padding, margin, radius, gap
- `responsiveStyles.text` - Standard font size and line height
- `responsiveStyles.adaptiveText` - Device-aware text (larger on tablets)

## Debugging

Access current scale factors for debugging:

```typescript
import { getScales, screenWidth, screenHeight } from '@shayrn/react-native-scaler';

console.log('Screen:', screenWidth, 'x', screenHeight);

const scales = getScales(); // Use getter for current values
console.log({
  width: scales.width,      // Width scale factor
  height: scales.height,    // Height scale factor
  uniform: scales.uniform,  // Uniform scale (min of width/height)
  pixel: scales.pixel,      // Device pixel ratio
  font: scales.font,        // User's font scale
});
```

**Note:** Use `getScales()` instead of the deprecated `scales` export to get accurate values after orientation changes.

## Complete Example

```typescript
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  responsive,
  deviceInfo,
  onOrientationChange,
  configureScaler
} from '@shayrn/react-native-scaler';

// Configure once at app startup
configureScaler({
  referenceWidth: 390,
  referenceHeight: 844,
});

export function ProductCard() {
  useEffect(() => {
    const subscription = onOrientationChange(() => {
      // Handle orientation change
    });
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Product Title</Text>
      <Text style={styles.description}>
        This card scales beautifully across all devices while maintaining
        the designer's intended proportions.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: responsive.adaptiveSpacing(16),
    margin: responsive.spacing(12, { min: 8, max: 20 }),
    borderRadius: responsive.radius(12, { min: 8, max: 16 }),
    borderWidth: responsive.pixelPerfect(1),
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  title: {
    fontSize: responsive.font(18, {
      min: 16,
      max: deviceInfo.isTablet ? 24 : 20
    }),
    lineHeight: responsive.lineHeight(26, { min: 20, max: 32 }),
    fontWeight: '600',
    marginBottom: responsive.spacing(8),
  },
  description: {
    fontSize: responsive.font(14, { min: 12, max: 16 }),
    lineHeight: responsive.lineHeight(20, { min: 16, max: 24 }),
    color: '#666',
  },
});
```

## How It Works

### Scaling Algorithm

The library calculates scale factors based on the ratio between device dimensions and reference dimensions:

```
widthScale = deviceWidth / referenceWidth
heightScale = deviceHeight / referenceHeight
uniformScale = Math.min(widthScale, heightScale)
```

**Uniform scale** (default) uses the smaller of the two scales to maintain aspect ratio and prevent distortion.

### Pixel Rounding

All scaled values are rounded using React Native's `PixelRatio.roundToNearestPixel()` to ensure:
- Crisp rendering on all devices
- No sub-pixel rendering artifacts
- Proper alignment with device pixels

### Accessibility Integration

Font scaling integrates with React Native's accessibility APIs:
- Reads user's system font scale via `PixelRatio.getFontScale()`
- Applies scale factor by default (can be disabled)
- Maintains readability for users with visual impairments

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  ScaleOptions,
  FontScaleOptions,
  DeviceInfo
} from '@shayrn/react-native-scaler';

const options: ScaleOptions = {
  min: 10,
  max: 100,
  useUniform: true,
};

const fontOptions: FontScaleOptions = {
  min: 12,
  max: 20,
  respectAccessibility: true,
};
```

## Platform Support

- **iOS**: Full support (iOS 13+)
- **Android**: Full support (Android 5.0+)
- **Tablets**: Full support with adaptive scaling
- **Expo**: Full support (SDK 48+)
- **React Native**: 0.64+

## Performance

The library is designed for production use with minimal overhead:
- **No runtime dependencies** (peer depends on react-native only)
- **Simple mathematical calculations** (no heavy computations)
- **Scales calculated once** (updated only on configuration or orientation change)
- **Bundle size**: < 5KB minified

## Best Practices

### Do's
✅ Configure reference dimensions to match your designs
✅ Use constraints (min/max) to prevent extreme scaling
✅ Respect accessibility settings (default behavior)
✅ Use adaptive spacing for better tablet UX
✅ Use pixel-perfect rendering for thin lines/borders

### Don'ts
❌ Don't scale everything - some values (like 1px borders) should stay fixed
❌ Don't set extreme min/max constraints that break on edge cases
❌ Don't disable accessibility unless absolutely necessary
❌ Don't use width-based scaling for vertical elements (and vice versa)
❌ Don't reconfigure scaler dimensions mid-session

## Migration Guide

### From v1.x to v2.x

No breaking changes - all v1.x code continues to work. New features:
- Enhanced constraint system (min/max options)
- Accessibility support for fonts (enabled by default)
- Device-aware adaptive scaling
- Pixel-perfect rendering utilities
- Orientation change handling

```typescript
// v1.x - still works
const size = responsive.font(14);

// v2.x - enhanced
const size = responsive.font(14, {
  min: 12,
  max: 18,
  respectAccessibility: true
});
```

### Deprecations
- `scales` export is deprecated in favor of `getScales()` function for accurate post-orientation values

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repo
git clone https://github.com/maheshmuttintidev/react-native-scaler.git
cd react-native-scaler

# Install dependencies
yarn install

# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Build
yarn build

# Lint
yarn lint

# Format
yarn format
```

### Running Tests

```bash
yarn test                # Run all tests
yarn test:watch          # Run tests in watch mode
yarn test:coverage       # Generate coverage report
```

## License

MIT © Mahesh Muttinti

## Links

- **GitHub**: https://github.com/maheshmuttintidev/react-native-scaler
- **npm**: https://www.npmjs.com/package/@shayrn/react-native-scaler
- **Issues**: https://github.com/maheshmuttintidev/react-native-scaler/issues

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.
