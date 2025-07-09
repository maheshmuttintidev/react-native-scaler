# @shayrn/react-native-scaler

A comprehensive utility to scale sizes, fonts, spacing, radius, and layout based on device screen dimensions with advanced accessibility support and pixel-perfect rendering. Built to match your Figma design on any screen size while respecting user preferences.

---

## 📦 Installation

Use any package manager:

```bash
# npm
npm install @shayrn/react-native-scaler

# yarn
yarn add @shayrn/react-native-scaler

# pnpm
pnpm add @shayrn/react-native-scaler

# bun
bun add @shayrn/react-native-scaler

#expo
npx expo install @shayrn/react-native-scaler

```


---

## ⚙️ Setup (Optional)

If your Figma design uses different base dimensions than `402x874`, configure it like this:

```ts
import { configureScaler } from '@shayrn/react-native-scaler';

configureScaler({
  referenceWidth: 390,
  referenceHeight: 844,
});
```

Call this once before using any scaling functions—typically in your root file (`App.tsx` or `_layout.tsx`).

---

## 🚀 Basic Usage

### Scale spacing or size

```ts
import { scale } from '@shayrn/react-native-scaler';

const padding = scale(16); // Basic scaling
const constrainedPadding = scale(16, { min: 12, max: 24 }); // With constraints
const widthBasedPadding = scale(16, { useUniform: false }); // Width-based scaling
```

### Scale font size

```ts
import { scaleFont } from '@shayrn/react-native-scaler';

const fontSize = scaleFont(14); // Respects accessibility settings
const constrainedFont = scaleFont(14, { min: 12, max: 18 }); // With min/max
const normalizedFont = scaleFont(14, { respectAccessibility: false }); // Ignore user settings
```

### Scale line height

```ts
import { scaleLineHeight } from '@shayrn/react-native-scaler';

const lineHeight = scaleLineHeight(20);
const constrainedLineHeight = scaleLineHeight(20, { min: 16, max: 28 });
```

### Scale based on width or height

```ts
import { scaleWidth, scaleHeight } from '@shayrn/react-native-scaler';

const cardWidth = scaleWidth(300);
const cardHeight = scaleHeight(200, { min: 150, max: 250 });
```

### Scale border radius

```ts
import { scaleRadius } from '@shayrn/react-native-scaler';

const borderRadius = scaleRadius(12);
const constrainedRadius = scaleRadius(12, { min: 8, max: 16 });
```

---

## 📐 Enhanced Responsive Helper

Quick access utility with advanced options:

```ts
import { responsive } from '@shayrn/react-native-scaler';

const styles = {
  container: {
    padding: responsive.adaptiveSpacing(16), // Adapts to device type
    margin: responsive.spacing(20, { min: 16, max: 24 }),
    borderRadius: responsive.radius(8, { min: 4, max: 16 }),
    gap: responsive.spacing(10),
  },
  text: {
    fontSize: responsive.font(14, { min: 12, max: 18 }),
    lineHeight: responsive.lineHeight(20, { min: 16, max: 24 }),
  },
  pixelPerfectBorder: {
    borderWidth: responsive.pixelPerfect(1), // Pixel-perfect rendering
  },
};
```

---

## 🔧 Advanced Features

### Device Information

```ts
import { deviceInfo } from '@shayrn/react-native-scaler';

console.log(deviceInfo.isTablet); // true/false
console.log(deviceInfo.isSmallDevice); // true/false
console.log(deviceInfo.pixelRatio); // 2.0, 3.0, etc.
console.log(deviceInfo.fontScale); // User's accessibility font scale
console.log(deviceInfo.aspectRatio); // Screen aspect ratio
```

### Adaptive Styling

```ts
import { responsive, deviceInfo } from '@shayrn/react-native-scaler';

const adaptiveStyles = {
  // Different styles for tablets vs phones
  title: {
    fontSize: deviceInfo.isTablet ? responsive.font(24) : responsive.font(18),
    lineHeight: deviceInfo.isTablet ? responsive.lineHeight(32) : responsive.lineHeight(24),
  },
  
  // Adaptive spacing
  container: {
    padding: responsive.adaptiveSpacing(16), // Auto-adjusts for device type
  },
};
```

### Orientation Change Handling

```ts
import { onOrientationChange } from '@shayrn/react-native-scaler';

const subscription = onOrientationChange(() => {
  // Recalculates all scales automatically
  console.log('Screen orientation changed');
});

// Clean up when component unmounts
subscription?.remove();
```

### Pixel-Perfect Rendering

```ts
import { responsive, getPixelSize } from '@shayrn/react-native-scaler';

const styles = {
  // Ensures crisp 1px borders on all devices
  separator: {
    height: responsive.pixelPerfect(1),
    backgroundColor: '#E0E0E0',
  },
  
  // Alternative method
  border: {
    borderWidth: getPixelSize(1),
  },
};
```

---

## 🧪 Complete Example

```ts
import { responsive, deviceInfo, onOrientationChange } from '@shayrn/react-native-scaler';
import { View, Text, useEffect } from 'react-native';

export function EnhancedCard() {
  useEffect(() => {
    const subscription = onOrientationChange(() => {
      // Handle orientation changes
      console.log('Orientation changed, scales recalculated');
    });
    
    return () => subscription?.remove();
  }, []);

  return (
    <View style={{
      padding: responsive.adaptiveSpacing(16),
      margin: responsive.spacing(12, { min: 8, max: 20 }),
      borderRadius: responsive.radius(12, { min: 8, max: 16 }),
      borderWidth: responsive.pixelPerfect(1),
      borderColor: '#E0E0E0',
    }}>
      <Text style={{
        fontSize: responsive.font(16, { 
          min: 14, 
          max: deviceInfo.isTablet ? 20 : 18,
          respectAccessibility: true 
        }),
        lineHeight: responsive.lineHeight(24, { min: 18, max: 28 }),
        marginBottom: responsive.spacing(8),
      }}>
        Enhanced Scaled Content
      </Text>
      
      <Text style={{
        fontSize: responsive.font(14, { min: 12, max: 16 }),
        lineHeight: responsive.lineHeight(20, { min: 16, max: 22 }),
        color: '#666',
      }}>
        This text adapts to screen size, respects accessibility settings, 
        and maintains pixel-perfect rendering across all devices.
      </Text>
    </View>
  );
}
```

---

## 📊 Scale Information

Access current scale factors for debugging or advanced usage:

```ts
import { scales, screenWidth, screenHeight } from '@shayrn/react-native-scaler';

console.log('Screen dimensions:', screenWidth, 'x', screenHeight);
console.log('Width scale:', scales.width);
console.log('Height scale:', scales.height);
console.log('Uniform scale:', scales.uniform);
console.log('Pixel ratio:', scales.pixel);
console.log('Font scale:', scales.font);
```

---

## 🎨 Pre-built Responsive Styles

```ts
import { responsiveStyles } from '@shayrn/react-native-scaler';

// Use pre-configured responsive styles
const MyComponent = () => (
  <View style={responsiveStyles.container}>
    <Text style={responsiveStyles.text}>Standard text</Text>
    <Text style={responsiveStyles.adaptiveText}>Adaptive text</Text>
  </View>
);
```

---

## 📏 Default Reference Size

* Width: `402`
* Height: `874`
* You can override these via `configureScaler()`.

---

## 📲 Platform Support

* ✅ iOS (full support with platform-specific optimizations)
* ✅ Android (full support with platform-specific optimizations)
* ✅ Tablets and phones
* ✅ High-density displays (Retina, AMOLED)
* ✅ Accessibility settings (font scaling, text size)
* ✅ Orientation changes

---

## 🛠️ Why use this enhanced version?

* **Matches your Figma design** on any screen size
* **Respects user accessibility** settings (font scaling, text size)
* **Pixel-perfect rendering** for crisp UI elements
* **Device-aware scaling** (tablets vs phones vs small devices)
* **Orientation support** with automatic recalculation
* **Constraint system** prevents extreme scaling
* **TypeScript support** with full type definitions
* **Performance optimized** with efficient calculations
* **Future-proof** with comprehensive React Native PixelRatio API usage

---

## 🔍 Migration from v1.x

If you're upgrading from the basic version:

1. **No breaking changes** - all existing functions work as before
2. **Enhanced options** - add optional parameters for constraints and accessibility
3. **New utilities** - use `deviceInfo`, `responsive.adaptiveSpacing()`, etc.
4. **Better defaults** - fonts now respect accessibility settings by default

```ts
// v1.x (still works)
fontSize: responsive.font(14)

// v2.x (enhanced)
fontSize: responsive.font(14, { min: 12, max: 18, respectAccessibility: true })
```

---

## 📚 API Reference

### Core Functions
- `scale(size, options?)` - Universal scaling with constraints
- `scaleFont(size, options?)` - Font scaling with accessibility support
- `scaleLineHeight(size, options?)` - Line height scaling
- `scaleRadius(size, options?)` - Border radius scaling
- `scaleWidth(size, options?)` - Width-based scaling
- `scaleHeight(size, options?)` - Height-based scaling

### Utilities
- `responsive.*` - Quick access helper object
- `deviceInfo.*` - Device information and capabilities
- `getPixelSize(size)` - Pixel-perfect size calculation
- `onOrientationChange(callback)` - Orientation change handler
- `configureScaler(config)` - Configure reference dimensions

### Constants
- `screenWidth`, `screenHeight` - Device dimensions
- `scales.*` - Current scale factors
- `responsiveStyles.*` - Pre-built responsive styles