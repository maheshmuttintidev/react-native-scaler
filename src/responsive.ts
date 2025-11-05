import { Dimensions, PixelRatio } from 'react-native';

// Default reference dimensions from Figma design
const DEFAULT_REFERENCE_WIDTH = 402;
const DEFAULT_REFERENCE_HEIGHT = 874;

// Configurable reference dimensions
let REFERENCE_WIDTH = DEFAULT_REFERENCE_WIDTH;
let REFERENCE_HEIGHT = DEFAULT_REFERENCE_HEIGHT;

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;

// Get device pixel ratio and font scale
const devicePixelRatio = PixelRatio.get();
const fontScale = PixelRatio.getFontScale();

// Calculate scale factors
let widthScale = SCREEN_WIDTH / REFERENCE_WIDTH;
let heightScale = SCREEN_HEIGHT / REFERENCE_HEIGHT;
let uniformScale = Math.min(widthScale, heightScale);

// Configuration function to set custom reference dimensions
export const configureScaler = (config: {
  referenceWidth?: number;
  referenceHeight?: number;
}): void => {
  REFERENCE_WIDTH = config.referenceWidth ?? DEFAULT_REFERENCE_WIDTH;
  REFERENCE_HEIGHT = config.referenceHeight ?? DEFAULT_REFERENCE_HEIGHT;
  
  widthScale = SCREEN_WIDTH / REFERENCE_WIDTH;
  heightScale = SCREEN_HEIGHT / REFERENCE_HEIGHT;
  uniformScale = Math.min(widthScale, heightScale);
};

// Enhanced function to scale sizes with optional constraints
export const scale = (size: number, options?: {
  min?: number;
  max?: number;
  useUniform?: boolean;
}): number => {
  const { min, max, useUniform = true } = options || {};
  
  const scaleFactor = useUniform ? uniformScale : widthScale;
  let scaledSize = size * scaleFactor;
  
  // Apply constraints if provided
  if (min !== undefined) scaledSize = Math.max(scaledSize, min);
  if (max !== undefined) scaledSize = Math.min(scaledSize, max);
  
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

// Enhanced font scaling with proper font scale consideration
export const scaleFont = (fontSize: number, options?: {
  min?: number;
  max?: number;
  respectAccessibility?: boolean;
}): number => {
  const { min = 10, max = 100, respectAccessibility = true } = options || {};
  
  let scaledFont: number;
  
  if (respectAccessibility) {
    // Method 1: Respect user's accessibility settings
    scaledFont = fontSize * uniformScale;
  } else {
    // Method 2: Normalize font scaling to avoid double scaling
    scaledFont = (fontSize * uniformScale) / fontScale;
  }
  
  // Apply constraints
  scaledFont = Math.max(scaledFont, min);
  scaledFont = Math.min(scaledFont, max);
  
  return Math.round(PixelRatio.roundToNearestPixel(scaledFont));
};

// Enhanced line height scaling
export const scaleLineHeight = (lineHeight: number, options?: {
  min?: number;
  max?: number;
  respectAccessibility?: boolean;
}): number => {
  const { min, max, respectAccessibility = true } = options || {};
  
  let scaledLineHeight: number;
  
  if (respectAccessibility) {
    scaledLineHeight = lineHeight * uniformScale;
  } else {
    scaledLineHeight = (lineHeight * uniformScale) / fontScale;
  }
  
  // Apply constraints if provided
  if (min !== undefined) scaledLineHeight = Math.max(scaledLineHeight, min);
  if (max !== undefined) scaledLineHeight = Math.min(scaledLineHeight, max);
  
  return Math.round(PixelRatio.roundToNearestPixel(scaledLineHeight));
};

// Function to scale border radius
export const scaleRadius = (radius: number, options?: {
  min?: number;
  max?: number;
}): number => {
  const { min, max } = options || {};
  
  let scaledRadius = radius * uniformScale;
  
  // Apply constraints if provided
  if (min !== undefined) scaledRadius = Math.max(scaledRadius, min);
  if (max !== undefined) scaledRadius = Math.min(scaledRadius, max);
  
  return Math.round(PixelRatio.roundToNearestPixel(scaledRadius));
};

// Function to scale sizes based on width only
export const scaleWidth = (size: number, options?: {
  min?: number;
  max?: number;
}): number => {
  const { min, max } = options || {};
  
  let scaledSize = size * widthScale;
  
  // Apply constraints if provided
  if (min !== undefined) scaledSize = Math.max(scaledSize, min);
  if (max !== undefined) scaledSize = Math.min(scaledSize, max);
  
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

// Function to scale sizes based on height only
export const scaleHeight = (size: number, options?: {
  min?: number;
  max?: number;
}): number => {
  const { min, max } = options || {};
  
  let scaledSize = size * heightScale;
  
  // Apply constraints if provided
  if (min !== undefined) scaledSize = Math.max(scaledSize, min);
  if (max !== undefined) scaledSize = Math.min(scaledSize, max);
  
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

// Utility function to get pixel-perfect sizes
export const getPixelSize = (layoutSize: number): number => {
  return PixelRatio.getPixelSizeForLayoutSize(layoutSize);
};

// Device information utilities
export const deviceInfo = {
  pixelRatio: devicePixelRatio,
  fontScale: fontScale,
  isHighDensity: devicePixelRatio >= 2,
  isTablet: Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) >= 768,
  isSmallDevice: Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) < 350,
  aspectRatio: SCREEN_WIDTH / SCREEN_HEIGHT,
};

// Enhanced responsive utility with more options
export const responsive = {
  width: (value: number, options?: { min?: number; max?: number }) => 
    scaleWidth(value, options),
  
  height: (value: number, options?: { min?: number; max?: number }) => 
    scaleHeight(value, options),
  
  font: (value: number, options?: { 
    min?: number; 
    max?: number; 
    respectAccessibility?: boolean 
  }) => scaleFont(value, options),
  
  lineHeight: (value: number, options?: { 
    min?: number; 
    max?: number; 
    respectAccessibility?: boolean 
  }) => scaleLineHeight(value, options),
  
  radius: (value: number, options?: { min?: number; max?: number }) => 
    scaleRadius(value, options),
  
  spacing: (value: number, options?: { 
    min?: number; 
    max?: number; 
    useUniform?: boolean 
  }) => scale(value, options),
  
  // Adaptive spacing based on device type
  adaptiveSpacing: (value: number) => {
    if (deviceInfo.isTablet) return scale(value * 1.2);
    if (deviceInfo.isSmallDevice) return scale(value * 0.8);
    return scale(value);
  },
  
  // Pixel perfect sizing
  pixelPerfect: (value: number) => getPixelSize(value),
};

// Enhanced responsive styles with better defaults
export const responsiveStyles = {
  container: {
    padding: responsive.adaptiveSpacing(16),
    margin: responsive.adaptiveSpacing(20),
    borderRadius: responsive.radius(8, { min: 4, max: 16 }),
    gap: responsive.spacing(10),
  },
  text: {
    fontSize: responsive.font(14, { min: 12, max: 18 }),
    lineHeight: responsive.lineHeight(20, { min: 14, max: 24 }),
  },
  // New: Different styles for different device types
  adaptiveText: {
    fontSize: deviceInfo.isTablet ? 
      responsive.font(16, { min: 14, max: 20 }) : 
      responsive.font(14, { min: 12, max: 18 }),
    lineHeight: deviceInfo.isTablet ? 
      responsive.lineHeight(24, { min: 18, max: 28 }) : 
      responsive.lineHeight(20, { min: 14, max: 24 }),
  },
};

// Utility to handle orientation changes
export const onOrientationChange = (
  callback: () => void
): { remove: () => void } => {
  const subscription = Dimensions.addEventListener('change', () => {
    const { width, height } = Dimensions.get('window');
    // Recalculate scales
    widthScale = width / REFERENCE_WIDTH;
    heightScale = height / REFERENCE_HEIGHT;
    uniformScale = Math.min(widthScale, heightScale);

    callback();
  });

  return subscription;
};

// Export device information and scales for advanced usage (as getter to always get current values)
export const getScales = () => ({
  width: widthScale,
  height: heightScale,
  uniform: uniformScale,
  pixel: devicePixelRatio,
  font: fontScale,
});

// Deprecated: Use getScales() instead for accurate values after orientation changes
export const scales = {
  width: widthScale,
  height: heightScale,
  uniform: uniformScale,
  pixel: devicePixelRatio,
  font: fontScale,
};

// Type definitions for better TypeScript support
export type ScaleOptions = {
  min?: number;
  max?: number;
  useUniform?: boolean;
};

export type FontScaleOptions = {
  min?: number;
  max?: number;
  respectAccessibility?: boolean;
};

export type DeviceInfo = typeof deviceInfo;