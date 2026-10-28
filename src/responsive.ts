import { Dimensions, PixelRatio, useWindowDimensions } from 'react-native';

// Default reference dimensions from Figma design
const DEFAULT_REFERENCE_WIDTH = 402;
const DEFAULT_REFERENCE_HEIGHT = 874;

// Configurable reference dimensions
let REFERENCE_WIDTH = DEFAULT_REFERENCE_WIDTH;
let REFERENCE_HEIGHT = DEFAULT_REFERENCE_HEIGHT;

type Constraints = { min?: number; max?: number };

/**
 * Current window size. Read at call time so values follow rotation,
 * split-screen, foldables and window resizes.
 */
const getWindow = (): { width: number; height: number } => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

const computeScales = () => {
  const { width, height } = getWindow();
  const widthScale = width / REFERENCE_WIDTH;
  const heightScale = height / REFERENCE_HEIGHT;
  return {
    widthScale,
    heightScale,
    uniformScale: Math.min(widthScale, heightScale),
  };
};

const clamp = (value: number, { min, max }: Constraints): number => {
  let result = value;
  if (min !== undefined) result = Math.max(result, min);
  if (max !== undefined) result = Math.min(result, max);
  return result;
};

const round = (value: number): number =>
  Math.round(PixelRatio.roundToNearestPixel(value));

/**
 * Window width captured when the module was first imported.
 * @deprecated Static value; use `getScreenWidth()` or `useScaler()` instead.
 */
export const screenWidth = getWindow().width;
/**
 * Window height captured when the module was first imported.
 * @deprecated Static value; use `getScreenHeight()` or `useScaler()` instead.
 */
export const screenHeight = getWindow().height;

/** Current window width (live). */
export const getScreenWidth = (): number => getWindow().width;
/** Current window height (live). */
export const getScreenHeight = (): number => getWindow().height;

// Configuration function to set custom reference dimensions
export const configureScaler = (config: {
  referenceWidth?: number;
  referenceHeight?: number;
}): void => {
  REFERENCE_WIDTH = config.referenceWidth ?? DEFAULT_REFERENCE_WIDTH;
  REFERENCE_HEIGHT = config.referenceHeight ?? DEFAULT_REFERENCE_HEIGHT;
};

// Scale sizes with optional constraints
export const scale = (
  size: number,
  options?: { min?: number; max?: number; useUniform?: boolean }
): number => {
  const { useUniform = true } = options || {};
  const { uniformScale, widthScale } = computeScales();
  return round(clamp(size * (useUniform ? uniformScale : widthScale), options || {}));
};

/**
 * Scale a font size.
 *
 * Note: the result is clamped to `min` (default 10) and `max` (default 100).
 * With `respectAccessibility: false` the result is divided by the user's
 * current font scale (read at call time) to cancel the OS text scaling.
 */
export const scaleFont = (
  fontSize: number,
  options?: { min?: number; max?: number; respectAccessibility?: boolean }
): number => {
  const { min = 10, max = 100, respectAccessibility = true } = options || {};
  const { uniformScale } = computeScales();
  let scaledFont = fontSize * uniformScale;
  if (!respectAccessibility) scaledFont /= PixelRatio.getFontScale();
  return round(clamp(scaledFont, { min, max }));
};

// Line height scaling (font scale read at call time)
export const scaleLineHeight = (
  lineHeight: number,
  options?: { min?: number; max?: number; respectAccessibility?: boolean }
): number => {
  const { respectAccessibility = true } = options || {};
  const { uniformScale } = computeScales();
  let scaled = lineHeight * uniformScale;
  if (!respectAccessibility) scaled /= PixelRatio.getFontScale();
  return round(clamp(scaled, options || {}));
};

// Scale border radius
export const scaleRadius = (radius: number, options?: Constraints): number =>
  round(clamp(radius * computeScales().uniformScale, options || {}));

// Scale based on width only
export const scaleWidth = (size: number, options?: Constraints): number =>
  round(clamp(size * computeScales().widthScale, options || {}));

// Scale based on height only
export const scaleHeight = (size: number, options?: Constraints): number =>
  round(clamp(size * computeScales().heightScale, options || {}));

// Pixel-perfect sizes
export const getPixelSize = (layoutSize: number): number =>
  PixelRatio.getPixelSizeForLayoutSize(layoutSize);

export type DeviceInfo = {
  readonly pixelRatio: number;
  readonly fontScale: number;
  readonly isHighDensity: boolean;
  readonly isTablet: boolean;
  readonly isSmallDevice: boolean;
  readonly aspectRatio: number;
};

/** Device information. Every property is evaluated on access (live). */
export const deviceInfo: DeviceInfo = {
  get pixelRatio() {
    return PixelRatio.get();
  },
  get fontScale() {
    return PixelRatio.getFontScale();
  },
  get isHighDensity() {
    return PixelRatio.get() >= 2;
  },
  get isTablet() {
    const { width, height } = getWindow();
    return Math.min(width, height) >= 768;
  },
  get isSmallDevice() {
    const { width, height } = getWindow();
    return Math.min(width, height) < 350;
  },
  get aspectRatio() {
    const { width, height } = getWindow();
    return width / height;
  },
};

// Responsive utility
export const responsive = {
  width: (value: number, options?: Constraints) => scaleWidth(value, options),
  height: (value: number, options?: Constraints) => scaleHeight(value, options),
  font: (
    value: number,
    options?: { min?: number; max?: number; respectAccessibility?: boolean }
  ) => scaleFont(value, options),
  lineHeight: (
    value: number,
    options?: { min?: number; max?: number; respectAccessibility?: boolean }
  ) => scaleLineHeight(value, options),
  radius: (value: number, options?: Constraints) => scaleRadius(value, options),
  spacing: (
    value: number,
    options?: { min?: number; max?: number; useUniform?: boolean }
  ) => scale(value, options),
  // Adaptive spacing based on device type
  adaptiveSpacing: (value: number) => {
    if (deviceInfo.isTablet) return scale(value * 1.2);
    if (deviceInfo.isSmallDevice) return scale(value * 0.8);
    return scale(value);
  },
  pixelPerfect: (value: number) => getPixelSize(value),
};

/** Ready-made styles. Values are computed on access (live). */
export const responsiveStyles = {
  get container() {
    return {
      padding: responsive.adaptiveSpacing(16),
      margin: responsive.adaptiveSpacing(20),
      borderRadius: responsive.radius(8, { min: 4, max: 16 }),
      gap: responsive.spacing(10),
    };
  },
  get text() {
    return {
      fontSize: responsive.font(14, { min: 12, max: 18 }),
      lineHeight: responsive.lineHeight(20, { min: 14, max: 24 }),
    };
  },
  get adaptiveText() {
    return deviceInfo.isTablet
      ? {
          fontSize: responsive.font(16, { min: 14, max: 20 }),
          lineHeight: responsive.lineHeight(24, { min: 18, max: 28 }),
        }
      : {
          fontSize: responsive.font(14, { min: 12, max: 18 }),
          lineHeight: responsive.lineHeight(20, { min: 14, max: 24 }),
        };
  },
};

/**
 * Subscribe to window dimension changes. Scales are always computed live,
 * so this is only needed to trigger your own re-render/recompute.
 */
export const onOrientationChange = (
  callback: () => void
): { remove: () => void } =>
  Dimensions.addEventListener('change', () => {
    callback();
  });

// Current scale factors
export const getScales = () => {
  const { widthScale, heightScale, uniformScale } = computeScales();
  return {
    width: widthScale,
    height: heightScale,
    uniform: uniformScale,
    pixel: PixelRatio.get(),
    font: PixelRatio.getFontScale(),
  };
};

/** @deprecated Use `getScales()` or `useScaler()`. Properties are now live getters. */
export const scales = {
  get width() {
    return getScales().width;
  },
  get height() {
    return getScales().height;
  },
  get uniform() {
    return getScales().uniform;
  },
  get pixel() {
    return PixelRatio.get();
  },
  get font() {
    return PixelRatio.getFontScale();
  },
};

/**
 * React hook: re-renders the component when the window size or font scale
 * changes and returns the current dimensions plus scaling helpers.
 */
export const useScaler = () => {
  const { width, height, fontScale } = useWindowDimensions();
  return {
    width,
    height,
    fontScale,
    scales: getScales(),
    scale,
    scaleFont,
    scaleLineHeight,
    scaleRadius,
    scaleWidth,
    scaleHeight,
    responsive,
  };
};

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
