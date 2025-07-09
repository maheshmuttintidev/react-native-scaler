```
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import {
  responsive,
  scale,
  scaleFont,
  scaleLineHeight,
  scaleWidth,
  scaleHeight,
  scaleRadius,
  getPixelSize,
  deviceInfo,
  onOrientationChange,
  responsiveStyles,
} from '@shayrn/react-native-scaler';

// =============================================================================
// 1. WIDTH EXAMPLES - Responsive & Pixel Perfect
// =============================================================================

const WidthExamples = () => {
  return (
    <View style={widthStyles.container}>
      <Text style={widthStyles.title}>Width Examples</Text>
      
      {/* Basic width scaling */}
      <View style={widthStyles.basicCard}>
        <Text style={widthStyles.label}>Basic Width (300px from design)</Text>
      </View>
      
      {/* Width with constraints */}
      <View style={widthStyles.constrainedCard}>
        <Text style={widthStyles.label}>Constrained Width (min: 250, max: 400)</Text>
      </View>
      
      {/* Responsive width helper */}
      <View style={widthStyles.responsiveCard}>
        <Text style={widthStyles.label}>Responsive Width Helper</Text>
      </View>
      
      {/* Adaptive width for tablets */}
      <View style={widthStyles.adaptiveCard}>
        <Text style={widthStyles.label}>Adaptive Width (tablet-aware)</Text>
      </View>
      
      {/* Pixel perfect width */}
      <View style={widthStyles.pixelPerfectCard}>
        <Text style={widthStyles.label}>Pixel Perfect Width</Text>
      </View>
    </View>
  );
};

const widthStyles = {
  container: {
    padding: responsive.spacing(16),
    backgroundColor: '#f5f5f5',
    marginBottom: responsive.spacing(20),
  },
  title: {
    fontSize: responsive.font(18, { min: 16, max: 22 }),
    fontWeight: 'bold',
    marginBottom: responsive.spacing(16),
    color: '#333',
  },
  label: {
    fontSize: responsive.font(14, { min: 12, max: 16 }),
    color: '#666',
    textAlign: 'center',
  },
  // Basic width scaling
  basicCard: {
    width: scaleWidth(300), // Direct scaling
    height: responsive.height(60),
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Width with constraints
  constrainedCard: {
    width: scaleWidth(300, { min: 250, max: 400 }), // Won't go below 250 or above 400
    height: responsive.height(60),
    backgroundColor: '#f3e5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Responsive width helper
  responsiveCard: {
    width: responsive.width(280), // Using helper
    height: responsive.height(60),
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Adaptive width for tablets
  adaptiveCard: {
    width: deviceInfo.isTablet ? scaleWidth(400) : scaleWidth(300), // Different for tablets
    height: responsive.height(60),
    backgroundColor: '#fff3e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Pixel perfect width
  pixelPerfectCard: {
    width: getPixelSize(scaleWidth(300)), // Pixel perfect
    height: responsive.height(60),
    backgroundColor: '#fce4ec',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
};

// =============================================================================
// 2. HEIGHT EXAMPLES - Responsive & Pixel Perfect
// =============================================================================

const HeightExamples = () => {
  return (
    <View style={heightStyles.container}>
      <Text style={heightStyles.title}>Height Examples</Text>
      
      <View style={heightStyles.row}>
        {/* Basic height */}
        <View style={heightStyles.basicCard}>
          <Text style={heightStyles.label}>Basic{'\n'}Height{'\n'}(120px)</Text>
        </View>
        
        {/* Height with constraints */}
        <View style={heightStyles.constrainedCard}>
          <Text style={heightStyles.label}>Constrained{'\n'}Height{'\n'}(min: 100)</Text>
        </View>
        
        {/* Responsive height */}
        <View style={heightStyles.responsiveCard}>
          <Text style={heightStyles.label}>Responsive{'\n'}Height{'\n'}Helper</Text>
        </View>
        
        {/* Adaptive height */}
        <View style={heightStyles.adaptiveCard}>
          <Text style={heightStyles.label}>Adaptive{'\n'}Height{'\n'}(tablet-aware)</Text>
        </View>
      </View>
    </View>
  );
};

const heightStyles = {
  container: {
    padding: responsive.spacing(16),
    backgroundColor: '#f5f5f5',
    marginBottom: responsive.spacing(20),
  },
  title: {
    fontSize: responsive.font(18, { min: 16, max: 22 }),
    fontWeight: 'bold',
    marginBottom: responsive.spacing(16),
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: responsive.font(12, { min: 10, max: 14 }),
    color: '#666',
    textAlign: 'center',
  },
  // Basic height scaling
  basicCard: {
    width: responsive.width(80),
    height: scaleHeight(120), // Direct scaling
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Height with constraints
  constrainedCard: {
    width: responsive.width(80),
    height: scaleHeight(120, { min: 100, max: 150 }), // Won't go below 100
    backgroundColor: '#f3e5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Responsive height helper
  responsiveCard: {
    width: responsive.width(80),
    height: responsive.height(110), // Using helper
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Adaptive height for tablets
  adaptiveCard: {
    width: responsive.width(80),
    height: deviceInfo.isTablet ? scaleHeight(140) : scaleHeight(120), // Different for tablets
    backgroundColor: '#fff3e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
};

// =============================================================================
// 3. FONT SIZE EXAMPLES - Responsive & Accessibility
// =============================================================================

const FontSizeExamples = () => {
  return (
    <View style={fontStyles.container}>
      <Text style={fontStyles.title}>Font Size Examples</Text>
      
      {/* Basic font scaling */}
      <Text style={fontStyles.basicText}>
        Basic Font (16px) - Respects accessibility settings
      </Text>
      
      {/* Font with constraints */}
      <Text style={fontStyles.constrainedText}>
        Constrained Font (16px, min: 14, max: 20) - Won't get too small or large
      </Text>
      
      {/* Font ignoring accessibility */}
      <Text style={fontStyles.normalizedText}>
        Normalized Font (16px) - Ignores user font scaling
      </Text>
      
      {/* Responsive font helper */}
      <Text style={fontStyles.responsiveText}>
        Responsive Font Helper (15px) - Quick access
      </Text>
      
      {/* Adaptive font for tablets */}
      <Text style={fontStyles.adaptiveText}>
        Adaptive Font - Larger on tablets, smaller on phones
      </Text>
      
      {/* Small device consideration */}
      <Text style={fontStyles.smallDeviceText}>
        Small Device Aware - Adjusts for very small screens
      </Text>
    </View>
  );
};

const fontStyles = {
  container: {
    padding: responsive.spacing(16),
    backgroundColor: '#f5f5f5',
    marginBottom: responsive.spacing(20),
  },
  title: {
    fontSize: responsive.font(18, { min: 16, max: 22 }),
    fontWeight: 'bold',
    marginBottom: responsive.spacing(16),
    color: '#333',
  },
  // Basic font scaling (respects accessibility)
  basicText: {
    fontSize: scaleFont(16), // Default: respects user accessibility settings
    marginBottom: responsive.spacing(12),
    color: '#333',
  },
  // Font with constraints
  constrainedText: {
    fontSize: scaleFont(16, { min: 14, max: 20 }), // Won't go below 14 or above 20
    marginBottom: responsive.spacing(12),
    color: '#333',
  },
  // Font ignoring accessibility
  normalizedText: {
    fontSize: scaleFont(16, { respectAccessibility: false }), // Ignores user settings
    marginBottom: responsive.spacing(12),
    color: '#666',
  },
  // Responsive font helper
  responsiveText: {
    fontSize: responsive.font(15), // Quick access
    marginBottom: responsive.spacing(12),
    color: '#333',
  },
  // Adaptive font for tablets
  adaptiveText: {
    fontSize: deviceInfo.isTablet ? 
      scaleFont(18, { min: 16, max: 22 }) : 
      scaleFont(16, { min: 14, max: 18 }),
    marginBottom: responsive.spacing(12),
    color: '#333',
    fontWeight: '500',
  },
  // Small device consideration
  smallDeviceText: {
    fontSize: deviceInfo.isSmallDevice ? 
      scaleFont(14, { min: 12, max: 16 }) : 
      scaleFont(16, { min: 14, max: 18 }),
    marginBottom: responsive.spacing(12),
    color: '#333',
  },
};

// =============================================================================
// 4. LINE HEIGHT EXAMPLES - Responsive & Accessibility
// =============================================================================

const LineHeightExamples = () => {
  return (
    <View style={lineHeightStyles.container}>
      <Text style={lineHeightStyles.title}>Line Height Examples</Text>
      
      {/* Basic line height */}
      <Text style={lineHeightStyles.basicText}>
        Basic Line Height (24px) - This is a longer text to demonstrate how line height affects text readability and spacing between lines. Notice the natural spacing.
      </Text>
      
      {/* Line height with constraints */}
      <Text style={lineHeightStyles.constrainedText}>
        Constrained Line Height (24px, min: 20, max: 30) - This ensures the line height never gets too cramped or too spaced out, maintaining readability across all devices.
      </Text>
      
      {/* Responsive line height helper */}
      <Text style={lineHeightStyles.responsiveText}>
        Responsive Line Height Helper (22px) - Quick access method for consistent line height scaling throughout your app.
      </Text>
      
      {/* Adaptive line height */}
      <Text style={lineHeightStyles.adaptiveText}>
        Adaptive Line Height - This text has different line height on tablets vs phones, optimizing readability for each device type.
      </Text>
    </View>
  );
};

const lineHeightStyles = {
  container: {
    padding: responsive.spacing(16),
    backgroundColor: '#f5f5f5',
    marginBottom: responsive.spacing(20),
  },
  title: {
    fontSize: responsive.font(18, { min: 16, max: 22 }),
    fontWeight: 'bold',
    marginBottom: responsive.spacing(16),
    color: '#333',
  },
  // Basic line height scaling
  basicText: {
    fontSize: scaleFont(16),
    lineHeight: scaleLineHeight(24), // 1.5 ratio
    marginBottom: responsive.spacing(16),
    color: '#333',
  },
  // Line height with constraints
  constrainedText: {
    fontSize: scaleFont(16),
    lineHeight: scaleLineHeight(24, { min: 20, max: 30 }), // Constrained
    marginBottom: responsive.spacing(16),
    color: '#333',
  },
  // Responsive line height helper
  responsiveText: {
    fontSize: responsive.font(16),
    lineHeight: responsive.lineHeight(22), // Quick access
    marginBottom: responsive.spacing(16),
    color: '#333',
  },
  // Adaptive line height
  adaptiveText: {
    fontSize: deviceInfo.isTablet ? responsive.font(18) : responsive.font(16),
    lineHeight: deviceInfo.isTablet ? 
      scaleLineHeight(28, { min: 24, max: 32 }) : 
      scaleLineHeight(24, { min: 20, max: 28 }),
    marginBottom: responsive.spacing(16),
    color: '#333',
    fontWeight: '500',
  },
};

// =============================================================================
// 5. PADDING EXAMPLES - Responsive & Pixel Perfect
// =============================================================================

const PaddingExamples = () => {
  return (
    <View style={paddingStyles.container}>
      <Text style={paddingStyles.title}>Padding Examples</Text>
      
      {/* Basic padding */}
      <View style={paddingStyles.basicCard}>
        <Text style={paddingStyles.label}>Basic Padding (16px)</Text>
      </View>
      
      {/* Padding with constraints */}
      <View style={paddingStyles.constrainedCard}>
        <Text style={paddingStyles.label}>Constrained Padding (16px, min: 12, max: 24)</Text>
      </View>
      
      {/* Responsive padding helper */}
      <View style={paddingStyles.responsiveCard}>
        <Text style={paddingStyles.label}>Responsive Padding Helper</Text>
      </View>
      
      {/* Adaptive padding */}
      <View style={paddingStyles.adaptiveCard}>
        <Text style={paddingStyles.label}>Adaptive Padding (device-aware)</Text>
      </View>
      
      {/* Different padding for each side */}
      <View style={paddingStyles.mixedCard}>
        <Text style={paddingStyles.label}>Mixed Padding (different sides)</Text>
      </View>
      
      {/* Pixel perfect padding */}
      <View style={paddingStyles.pixelPerfectCard}>
        <Text style={paddingStyles.label}>Pixel Perfect Padding</Text>
      </View>
    </View>
  );
};

const paddingStyles = {
  container: {
    padding: responsive.spacing(16),
    backgroundColor: '#f5f5f5',
    marginBottom: responsive.spacing(20),
  },
  title: {
    fontSize: responsive.font(18, { min: 16, max: 22 }),
    fontWeight: 'bold',
    marginBottom: responsive.spacing(16),
    color: '#333',
  },
  label: {
    fontSize: responsive.font(14, { min: 12, max: 16 }),
    color: '#666',
    textAlign: 'center',
  },
  // Basic padding scaling
  basicCard: {
    padding: scale(16), // Basic scaling
    backgroundColor: '#e3f2fd',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Padding with constraints
  constrainedCard: {
    padding: scale(16, { min: 12, max: 24 }), // Won't go below 12 or above 24
    backgroundColor: '#f3e5f5',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Responsive padding helper
  responsiveCard: {
    padding: responsive.spacing(16), // Quick access
    backgroundColor: '#e8f5e8',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Adaptive padding for tablets
  adaptiveCard: {
    padding: responsive.adaptiveSpacing(16), // Auto-adjusts for device type
    backgroundColor: '#fff3e0',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Different padding for each side
  mixedCard: {
    paddingTop: responsive.spacing(20),
    paddingBottom: responsive.spacing(20),
    paddingLeft: responsive.spacing(24),
    paddingRight: responsive.spacing(24),
    backgroundColor: '#f0f4ff',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
  // Pixel perfect padding
  pixelPerfectCard: {
    padding: getPixelSize(scale(16)), // Pixel perfect
    backgroundColor: '#fce4ec',
    marginBottom: responsive.spacing(12),
    borderRadius: responsive.radius(8),
  },
};

// =============================================================================
// 6. MARGIN EXAMPLES - Responsive & Pixel Perfect
// =============================================================================

const MarginExamples = () => {
  return (
    <View style={marginStyles.container}>
      <Text style={marginStyles.title}>Margin Examples</Text>
      
      {/* Basic margin */}
      <View style={marginStyles.basicCard}>
        <Text style={marginStyles.label}>Basic Margin (20px)</Text>
      </View>
      
      {/* Margin with constraints */}
      <View style={marginStyles.constrainedCard}>
        <Text style={marginStyles.label}>Constrained Margin (20px, min: 16, max: 28)</Text>
      </View>
      
      {/* Responsive margin helper */}
      <View style={marginStyles.responsiveCard}>
        <Text style={marginStyles.label}>Responsive Margin Helper</Text>
      </View>
      
      {/* Adaptive margin */}
      <View style={marginStyles.adaptiveCard}>
        <Text style={marginStyles.label}>Adaptive Margin (device-aware)</Text>
      </View>
      
      {/* Different margins for each side */}
      <View style={marginStyles.mixedCard}>
        <Text style={marginStyles.label}>Mixed Margins (different sides)</Text>
      </View>
    </View>
  );
};

const marginStyles = {
  container: {
    padding: responsive.spacing(16),
    backgroundColor: '#f5f5f5',
    marginBottom: responsive.spacing(20),
  },
  title: {
    fontSize: responsive.font(18, { min: 16, max: 22 }),
    fontWeight: 'bold',
    marginBottom: responsive.spacing(16),
    color: '#333',
  },
  label: {
    fontSize: responsive.font(14, { min: 12, max: 16 }),
    color: '#666',
    textAlign: 'center',
  },
  // Basic margin scaling
  basicCard: {
    margin: scale(20), // Basic scaling
    padding: responsive.spacing(16),
    backgroundColor: '#e3f2fd',
    borderRadius: responsive.radius(8),
  },
  // Margin with constraints
  constrainedCard: {
    margin: scale(20, { min: 16, max: 28 }), // Won't go below 16 or above 28
    padding: responsive.spacing(16),
    backgroundColor: '#f3e5f5',
    borderRadius: responsive.radius(8),
  },
  // Responsive margin helper
  responsiveCard: {
    margin: responsive.spacing(20), // Quick access
    padding: responsive.spacing(16),
    backgroundColor: '#e8f5e8',
    borderRadius: responsive.radius(8),
  },
  // Adaptive margin for tablets
  adaptiveCard: {
    margin: responsive.adaptiveSpacing(20), // Auto-adjusts for device type
    padding: responsive.spacing(16),
    backgroundColor: '#fff3e0',
    borderRadius: responsive.radius(8),
  },
  // Different margins for each side
  mixedCard: {
    marginTop: responsive.spacing(24),
    marginBottom: responsive.spacing(16),
    marginLeft: responsive.spacing(12),
    marginRight: responsive.spacing(12),
    padding: responsive.spacing(16),
    backgroundColor: '#f0f4ff',
    borderRadius: responsive.radius(8),
  },
};

// =============================================================================
// 7. BORDER RADIUS EXAMPLES - Responsive & Pixel Perfect
// =============================================================================

const BorderRadiusExamples = () => {
  return (
    <View style={radiusStyles.container}>
      <Text style={radiusStyles.title}>Border Radius Examples</Text>
      
      <View style={radiusStyles.row}>
        {/* Basic border radius */}
        <View style={radiusStyles.basicCard}>
          <Text style={radiusStyles.label}>Basic{'\n'}Radius{'\n'}(12px)</Text>
        </View>
        
        {/* Border radius with constraints */}
        <View style={radiusStyles.constrainedCard}>
          <Text style={radiusStyles.label}>Constrained{'\n'}Radius{'\n'}(min: 8, max: 16)</Text>
        </View>
        
        {/* Responsive border radius helper */}
        <View style={radiusStyles.responsiveCard}>
          <Text style={radiusStyles.label}>Responsive{'\n'}Radius{'\n'}Helper</Text>
        </View>
        
        {/* Adaptive border radius */}
        <View style={radiusStyles.adaptiveCard}>
          <Text style={radiusStyles.label}>Adaptive{'\n'}Radius{'\n'}(tablet-aware)</Text>
        </View>
      </View>
      
      {/* Different radius for each corner */}
      <View style={radiusStyles.mixedCard}>
        <Text style={radiusStyles.label}>Mixed Border Radius (different corners)</Text>
      </View>
      
      {/* Pixel perfect radius */}
      <View style={radiusStyles.pixelPerfectCard}>
        <Text style={radiusStyles.label}>Pixel Perfect Border Radius</Text>
      </View>
    </View>
  );
};

const radiusStyles = {
  container: {
    padding: responsive.spacing(16),
    backgroundColor: '#f5f5f5',
    marginBottom: responsive.spacing(20),
  },
  title: {
    fontSize: responsive.font(18, { min: 16, max: 22 }),
    fontWeight: 'bold',
    marginBottom: responsive.spacing(16),
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsive.spacing(16),
  },
  label: {
    fontSize: responsive.font(12, { min: 10, max: 14 }),
    color: '#666',
    textAlign: 'center',
  },
  // Basic border radius scaling
  basicCard: {
    width: responsive.width(80),
    height: responsive.height(80),
    borderRadius: scaleRadius(12), // Basic scaling
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Border radius with constraints
  constrainedCard: {
    width: responsive.width(80),
    height: responsive.height(80),
    borderRadius: scaleRadius(12, { min: 8, max: 16 }), // Won't go below 8 or above 16
    backgroundColor: '#f3e5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Responsive border radius helper
  responsiveCard: {
    width: responsive.width(80),
    height: responsive.height(80),
    borderRadius: responsive.radius(12), // Quick access
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Adaptive border radius for tablets
  adaptiveCard: {
    width: responsive.width(80),
    height: responsive.height(80),
    borderRadius: deviceInfo.isTablet ? scaleRadius(16) : scaleRadius(12), // Different for tablets
    backgroundColor: '#fff3e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Different radius for each corner
  mixedCard: {
    padding: responsive.spacing(16),
    borderTopLeftRadius: responsive.radius(20),
    borderTopRightRadius: responsive.radius(8),
    borderBottomLeftRadius: responsive.radius(8),
    borderBottomRightRadius: responsive.radius(20),
    backgroundColor: '#f0f4ff',
    marginBottom: responsive.spacing(12),
  },
  // Pixel perfect border radius
  pixelPerfectCard: {
    padding: responsive.spacing(16),
    borderRadius: getPixelSize(scaleRadius(12)), // Pixel perfect
    backgroundColor: '#fce4ec',
  },
};

// =============================================================================
// 8. PIXEL PERFECT EXAMPLES - Borders, Separators, Icons
// =============================================================================

const PixelPerfectExamples = () => {
  return (
    <View style={pixelStyles.container}>
      <Text style={pixelStyles.title}>Pixel Perfect Examples</Text>
      
      {/* Pixel perfect borders */}
      <View style={pixelStyles.borderCard}>
        <Text style={pixelStyles.label}>Pixel Perfect 1px Border</Text>
      </View>
      
      {/* Pixel perfect separator */}
      <View style={pixelStyles.separatorContainer}>
        <Text style={pixelStyles.label}>Text Above</Text>
        <View style={pixelStyles.separator} />
        <Text style={pixelStyles.label}>Text Below</Text>
      </View>
      
      {/* Pixel perfect icon container */}
      <View style={pixelStyles.iconContainer}>
        <View style={pixelStyles.iconPlaceholder} />
        <Text style={pixelStyles.label}>Icon with pixel perfect sizing</Text>
      </View>
      
      {/* Pixel perfect grid */}
      <View style={pixelStyles.gridContainer}>
        <Text style={pixelStyles.gridTitle}>Pixel Perfect Grid</Text>
        <View style={pixelStyles.grid}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={pixelStyles.gridItem}>
              <Text style={pixelStyles.gridLabel}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const pixelStyles = {
  container: {
    padding: responsive.spacing(16),
    backgroundColor: '#f5f5f5',
    marginBottom: responsive.spacing(20),
  },
  title: {
    fontSize: responsive.font(18, { min: 16, max: 22 }),
    fontWeight: 'bold',
    marginBottom: responsive.spacing(16),
    color: '#333',
  },
  label: {
    fontSize: responsive.font(14, { min: 12, max: 16 }),
    color: '#666',
    textAlign: 'center',
  },
  // Pixel perfect border
  borderCard: {
    padding: responsive.spacing(16),
    borderWidth: responsive.pixelPerfect(1), // Always 1 physical pixel
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: responsive.radius(8),
    marginBottom: responsive.spacing(16),
  },
  // Pixel perfect separator
  separatorContainer: {
    backgroundColor: '#fff',
    padding: responsive.spacing(16),
    borderRadius: responsive.radius(8),
    marginBottom: responsive.spacing(16),
  },
  separator: {
    height: responsive.pixelPerfect(1), // Always 1 physical pixel
    backgroundColor: '#ddd',
    marginVertical: responsive.spacing(12),
  },
  // Pixel perfect icon container
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: responsive.spacing(16),
    borderRadius: responsive.radius(8),
    marginBottom: responsive.spacing(16),
  },
  iconPlaceholder: {
    width: getPixelSize(24), // Pixel perfect icon size
    height: getPixelSize(24),
    backgroundColor: '#4CAF50',
    borderRadius: responsive.radius(4),
    marginRight: responsive.spacing(12),
  },
  // Pixel perfect grid
  gridContainer: {
    backgroundColor: '#fff',
    padding: responsive.spacing(16),
    borderRadius: responsive.radius(8),
  },
  gridTitle: {
    fontSize: responsive.font(16),
    fontWeight: '600',
    marginBottom: responsive.spacing(12),
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: responsive.width(70),
    height: responsive.height(70),
    backgroundColor: '#e3f2fd',
    borderRadius: responsive.radius(8),
    borderWidth: responsive.pixelPerfect(1), // Pixel perfect border
    borderColor: '#bbdefb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(8),
  },
  gridLabel: {
    fontSize: responsive.font(16),
    fontWeight: '600',
    color: '#1976d2',
  },
};

// =============================================================================
// 9. COMPLETE COMPONENT EXAMPLE - Real-world Usage
// =============================================================================

Coming soon...

```