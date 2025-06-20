import { Dimensions, PixelRatio, Platform } from 'react-native';

// Default reference dimensions from Figma design
const DEFAULT_REFERENCE_WIDTH = 402;
const DEFAULT_REFERENCE_HEIGHT = 874;

// Configurable reference dimensions
let REFERENCE_WIDTH = DEFAULT_REFERENCE_WIDTH;
let REFERENCE_HEIGHT = DEFAULT_REFERENCE_HEIGHT;

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Calculate scale factors
let widthScale = SCREEN_WIDTH / REFERENCE_WIDTH;
let heightScale = SCREEN_HEIGHT / REFERENCE_HEIGHT;
let scaleFactor = Math.min(widthScale, heightScale);

// Configuration function to set custom reference dimensions
export const configureScaler = (config: {
  referenceWidth?: number;
  referenceHeight?: number;
}): void => {
  REFERENCE_WIDTH = config.referenceWidth ?? DEFAULT_REFERENCE_WIDTH;
  REFERENCE_HEIGHT = config.referenceHeight ?? DEFAULT_REFERENCE_HEIGHT;
  widthScale = SCREEN_WIDTH / REFERENCE_WIDTH;
  heightScale = SCREEN_HEIGHT / REFERENCE_HEIGHT;
  scaleFactor = Math.min(widthScale, heightScale);
};

// Function to scale sizes (e.g., fontSize, padding, margin, gap)
export const scale = (size: number): number => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor));
};

// Function to scale font sizes specifically
export const scaleFont = (fontSize: number): number => {
  const fontScaleFactor =
    Platform.OS === 'ios' ? scaleFactor : scaleFactor * 0.95;
  return Math.round(PixelRatio.roundToNearestPixel(fontSize * fontScaleFactor));
};

// Function to scale line height specifically
export const scaleLineHeight = (lineHeight: number): number => {
  const lineHeightScaleFactor =
    Platform.OS === 'ios' ? scaleFactor : scaleFactor * 0.95;
  return Math.round(
    PixelRatio.roundToNearestPixel(lineHeight * lineHeightScaleFactor),
  );
};

// Function to scale border radius
export const scaleRadius = (radius: number): number => {
  return Math.round(PixelRatio.roundToNearestPixel(radius * scaleFactor));
};

// Function to scale sizes based on width only (useful for horizontal layouts)
export const scaleWidth = (size: number): number => {
  return Math.round(PixelRatio.roundToNearestPixel(size * widthScale));
};

// Function to scale sizes based on height only (useful for vertical layouts)
export const scaleHeight = (size: number): number => {
  return Math.round(PixelRatio.roundToNearestPixel(size * heightScale));
};

// Utility to get responsive dimensions as an object
export const responsive = {
  width: (value: number) => scaleWidth(value),
  height: (value: number) => scaleHeight(value),
  font: (value: number) => scaleFont(value),
  lineHeight: (value: number) => scaleLineHeight(value),
  radius: (value: number) => scaleRadius(value),
  spacing: (value: number) => scale(value),
};

// Example usage in styles
export const responsiveStyles = {
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