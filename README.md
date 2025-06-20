
# @shayrn/react-native-scaler

A utility to scale sizes, fonts, spacing, radius, and layout based on device screen dimensions.

Built to match your Figma design on any screen size.

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

## 🚀 Usage

### Scale spacing or size

```ts
import { scale } from '@shayrn/react-native-scaler';

const padding = scale(16); // Adjusts for screen size
```

### Scale font size

```ts
import { scaleFont } from '@shayrn/react-native-scaler';

const fontSize = scaleFont(14);
```

### Scale line height

```ts
import { scaleLineHeight } from '@shayrn/react-native-scaler';

const lineHeight = scaleLineHeight(20);
```

### Scale based on width or height

```ts
import { scaleWidth, scaleHeight } from '@shayrn/react-native-scaler';

const cardWidth = scaleWidth(300);
const cardHeight = scaleHeight(200);
```

### Scale border radius

```ts
import { scaleRadius } from '@shayrn/react-native-scaler';

const borderRadius = scaleRadius(12);
```

---

## 📐 Responsive Helper

Quick access utility:

```ts
import { responsive } from '@shayrn/react-native-scaler';

const styles = {
  container: {
    padding: responsive.spacing(16),
    margin: responsive.spacing(20),
    borderRadius: responsive.radius(8),
    gap: responsive.spacing(10),
  },
  text: {
    fontSize: responsive.font(14),
    lineHeight: responsive.lineHeight(20),
  },
};
```

---

## 🧪 Example

```ts
import { responsive } from '@shayrn/react-native-scaler';
import { View, Text } from 'react-native';

export function Card() {
  return (
    <View style={{ padding: responsive.spacing(16), borderRadius: responsive.radius(12) }}>
      <Text style={{ fontSize: responsive.font(16), lineHeight: responsive.lineHeight(22) }}>
        Scaled text content
      </Text>
    </View>
  );
}
```

---

## 📏 Default Reference Size

* Width: `402`
* Height: `874`
* You can override these via `configureScaler()`.

---

## 📲 Platform Support

* iOS
* Android

---

## 🛠️ Why use this?

* Matches your Figma or design spec on any screen.
* Reduces manual scaling across the app.
* Keeps font and layout consistent.
