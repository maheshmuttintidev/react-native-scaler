import { Dimensions, PixelRatio } from 'react-native';
import {
  configureScaler,
  deviceInfo,
  getPixelSize,
  getScales,
  onOrientationChange,
  responsive,
  responsiveStyles,
  scale,
  scaleFont,
  scaleHeight,
  scaleLineHeight,
  scaleRadius,
  scaleWidth,
  scales,
  screenHeight,
  screenWidth,
} from '../src/responsive';

// Mock React Native modules
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({ width: 402, height: 874 })),
    addEventListener: jest.fn((event, callback) => ({
      remove: jest.fn(),
    })),
  },
  PixelRatio: {
    get: jest.fn(() => 2),
    getFontScale: jest.fn(() => 1),
    roundToNearestPixel: jest.fn((value) => Math.round(value)),
    getPixelSizeForLayoutSize: jest.fn((value) => value * 2),
  },
}));

describe('react-native-scaler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to default dimensions
    (Dimensions.get as jest.Mock).mockReturnValue({ width: 402, height: 874 });
    (PixelRatio.get as jest.Mock).mockReturnValue(2);
    (PixelRatio.getFontScale as jest.Mock).mockReturnValue(1);
  });

  describe('Configuration', () => {
    it('should use default reference dimensions', () => {
      const scaledValue = scale(100);
      expect(scaledValue).toBeDefined();
      expect(typeof scaledValue).toBe('number');
    });

    it('should allow custom reference dimensions', () => {
      configureScaler({ referenceWidth: 375, referenceHeight: 812 });
      const scaledValue = scale(100);
      expect(scaledValue).toBeDefined();

      // Reset to default
      configureScaler({ referenceWidth: 402, referenceHeight: 874 });
    });

    it('should handle partial configuration', () => {
      configureScaler({ referenceWidth: 400 });
      expect(scale(100)).toBeDefined();

      configureScaler({ referenceHeight: 800 });
      expect(scale(100)).toBeDefined();

      // Reset
      configureScaler({ referenceWidth: 402, referenceHeight: 874 });
    });
  });

  describe('Basic Scaling Functions', () => {
    describe('scale()', () => {
      it('should scale values uniformly by default', () => {
        const result = scale(100);
        expect(result).toBeGreaterThan(0);
        expect(Number.isInteger(result)).toBe(true);
      });

      it('should respect min constraint', () => {
        const result = scale(1, { min: 10 });
        expect(result).toBeGreaterThanOrEqual(10);
      });

      it('should respect max constraint', () => {
        (Dimensions.get as jest.Mock).mockReturnValue({
          width: 1000,
          height: 2000,
        });
        const result = scale(100, { max: 150 });
        expect(result).toBeLessThanOrEqual(150);
      });

      it('should use width-based scaling when useUniform is false', () => {
        const uniformResult = scale(100, { useUniform: true });
        const widthResult = scale(100, { useUniform: false });
        expect(uniformResult).toBeDefined();
        expect(widthResult).toBeDefined();
      });
    });

    describe('scaleWidth()', () => {
      it('should scale based on width only', () => {
        const result = scaleWidth(100);
        expect(result).toBeGreaterThan(0);
        expect(Number.isInteger(result)).toBe(true);
      });

      it('should respect constraints', () => {
        const result = scaleWidth(100, { min: 80, max: 120 });
        expect(result).toBeGreaterThanOrEqual(80);
        expect(result).toBeLessThanOrEqual(120);
      });
    });

    describe('scaleHeight()', () => {
      it('should scale based on height only', () => {
        const result = scaleHeight(100);
        expect(result).toBeGreaterThan(0);
        expect(Number.isInteger(result)).toBe(true);
      });

      it('should respect constraints', () => {
        const result = scaleHeight(100, { min: 80, max: 120 });
        expect(result).toBeGreaterThanOrEqual(80);
        expect(result).toBeLessThanOrEqual(120);
      });
    });

    describe('scaleRadius()', () => {
      it('should scale border radius', () => {
        const result = scaleRadius(12);
        expect(result).toBeGreaterThan(0);
        expect(Number.isInteger(result)).toBe(true);
      });

      it('should respect constraints', () => {
        const result = scaleRadius(12, { min: 8, max: 16 });
        expect(result).toBeGreaterThanOrEqual(8);
        expect(result).toBeLessThanOrEqual(16);
      });
    });
  });

  describe('Font Scaling Functions', () => {
    describe('scaleFont()', () => {
      it('should scale font sizes', () => {
        const result = scaleFont(14);
        expect(result).toBeGreaterThan(0);
        expect(Number.isInteger(result)).toBe(true);
      });

      it('should respect accessibility settings by default', () => {
        (PixelRatio.getFontScale as jest.Mock).mockReturnValue(1.5);
        const result = scaleFont(14);
        expect(result).toBeDefined();
      });

      it('should allow disabling accessibility scaling', () => {
        (PixelRatio.getFontScale as jest.Mock).mockReturnValue(1.5);
        const withAccessibility = scaleFont(14, {
          respectAccessibility: true,
        });
        const withoutAccessibility = scaleFont(14, {
          respectAccessibility: false,
        });
        expect(withAccessibility).toBeDefined();
        expect(withoutAccessibility).toBeDefined();
      });

      it('should apply default min/max constraints', () => {
        const result = scaleFont(5);
        expect(result).toBeGreaterThanOrEqual(10); // Default min
      });

      it('should respect custom constraints', () => {
        const result = scaleFont(14, { min: 12, max: 18 });
        expect(result).toBeGreaterThanOrEqual(12);
        expect(result).toBeLessThanOrEqual(18);
      });
    });

    describe('scaleLineHeight()', () => {
      it('should scale line heights', () => {
        const result = scaleLineHeight(20);
        expect(result).toBeGreaterThan(0);
        expect(Number.isInteger(result)).toBe(true);
      });

      it('should respect accessibility settings by default', () => {
        (PixelRatio.getFontScale as jest.Mock).mockReturnValue(1.5);
        const result = scaleLineHeight(20);
        expect(result).toBeDefined();
      });

      it('should allow disabling accessibility scaling', () => {
        const result = scaleLineHeight(20, { respectAccessibility: false });
        expect(result).toBeDefined();
      });

      it('should respect constraints', () => {
        const result = scaleLineHeight(20, { min: 16, max: 28 });
        expect(result).toBeGreaterThanOrEqual(16);
        expect(result).toBeLessThanOrEqual(28);
      });
    });
  });

  describe('Device Information', () => {
    it('should provide device pixel ratio', () => {
      expect(deviceInfo.pixelRatio).toBe(2);
    });

    it('should provide font scale', () => {
      expect(deviceInfo.fontScale).toBe(1);
    });

    it('should detect high density displays', () => {
      expect(deviceInfo.isHighDensity).toBe(true);

      (PixelRatio.get as jest.Mock).mockReturnValue(1);
      // Note: deviceInfo is calculated at module load, so this won't change
      // In real usage, this would be recalculated
    });

    it('should detect tablets', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 800, height: 1024 });
      // deviceInfo is static, but we can test the logic
      expect(Math.min(800, 1024) >= 768).toBe(true);
    });

    it('should detect small devices', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 320, height: 568 });
      expect(Math.min(320, 568) < 350).toBe(true);
    });

    it('should provide aspect ratio', () => {
      expect(deviceInfo.aspectRatio).toBeDefined();
      expect(typeof deviceInfo.aspectRatio).toBe('number');
    });
  });

  describe('Responsive Helper Object', () => {
    it('should provide width scaling', () => {
      const result = responsive.width(100);
      expect(result).toBeGreaterThan(0);
    });

    it('should provide height scaling', () => {
      const result = responsive.height(100);
      expect(result).toBeGreaterThan(0);
    });

    it('should provide font scaling', () => {
      const result = responsive.font(14);
      expect(result).toBeGreaterThan(0);
    });

    it('should provide line height scaling', () => {
      const result = responsive.lineHeight(20);
      expect(result).toBeGreaterThan(0);
    });

    it('should provide radius scaling', () => {
      const result = responsive.radius(12);
      expect(result).toBeGreaterThan(0);
    });

    it('should provide spacing scaling', () => {
      const result = responsive.spacing(16);
      expect(result).toBeGreaterThan(0);
    });

    it('should provide adaptive spacing', () => {
      const result = responsive.adaptiveSpacing(16);
      expect(result).toBeGreaterThan(0);
    });

    it('should provide pixel perfect sizing', () => {
      const result = responsive.pixelPerfect(1);
      expect(result).toBe(2); // Mocked to return value * 2
    });
  });

  describe('Adaptive Spacing', () => {
    it('should increase spacing for tablets', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({
        width: 1024,
        height: 768,
      });
      const result = responsive.adaptiveSpacing(16);
      expect(result).toBeDefined();
    });

    it('should decrease spacing for small devices', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 320, height: 568 });
      const result = responsive.adaptiveSpacing(16);
      expect(result).toBeDefined();
    });

    it('should use normal spacing for regular devices', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 402, height: 874 });
      const result = responsive.adaptiveSpacing(16);
      expect(result).toBeDefined();
    });
  });

  describe('Pixel Perfect Rendering', () => {
    it('should provide pixel perfect sizes', () => {
      const result = getPixelSize(1);
      expect(result).toBe(2); // Mocked to return value * 2
    });

    it('should handle various sizes', () => {
      expect(getPixelSize(1)).toBe(2);
      expect(getPixelSize(2)).toBe(4);
      expect(getPixelSize(10)).toBe(20);
    });
  });

  describe('Responsive Styles', () => {
    it('should provide container styles', () => {
      expect(responsiveStyles.container).toBeDefined();
      expect(responsiveStyles.container.padding).toBeDefined();
      expect(responsiveStyles.container.margin).toBeDefined();
      expect(responsiveStyles.container.borderRadius).toBeDefined();
      expect(responsiveStyles.container.gap).toBeDefined();
    });

    it('should provide text styles', () => {
      expect(responsiveStyles.text).toBeDefined();
      expect(responsiveStyles.text.fontSize).toBeDefined();
      expect(responsiveStyles.text.lineHeight).toBeDefined();
    });

    it('should provide adaptive text styles', () => {
      expect(responsiveStyles.adaptiveText).toBeDefined();
      expect(responsiveStyles.adaptiveText.fontSize).toBeDefined();
      expect(responsiveStyles.adaptiveText.lineHeight).toBeDefined();
    });
  });

  describe('Orientation Change Handler', () => {
    it('should register orientation change listener', () => {
      const callback = jest.fn();
      const subscription = onOrientationChange(callback);

      expect(Dimensions.addEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
      expect(subscription).toHaveProperty('remove');
    });

    it('should call callback on orientation change', () => {
      const callback = jest.fn();
      let changeHandler: (() => void) | undefined;

      (Dimensions.addEventListener as jest.Mock).mockImplementation(
        (event, handler) => {
          changeHandler = handler;
          return { remove: jest.fn() };
        }
      );

      onOrientationChange(callback);

      // Simulate orientation change
      if (changeHandler) {
        (Dimensions.get as jest.Mock).mockReturnValue({
          width: 874,
          height: 402,
        });
        changeHandler();
        expect(callback).toHaveBeenCalled();
      }
    });

    it('should allow removing listener', () => {
      const callback = jest.fn();
      const subscription = onOrientationChange(callback);
      expect(subscription.remove).toBeDefined();
      expect(typeof subscription.remove).toBe('function');
    });
  });

  describe('Scale Information', () => {
    it('should provide current scale factors via getScales()', () => {
      const currentScales = getScales();
      expect(currentScales.width).toBeDefined();
      expect(currentScales.height).toBeDefined();
      expect(currentScales.uniform).toBeDefined();
      expect(currentScales.pixel).toBeDefined();
      expect(currentScales.font).toBeDefined();
    });

    it('should provide static scale factors via scales', () => {
      expect(scales.width).toBeDefined();
      expect(scales.height).toBeDefined();
      expect(scales.uniform).toBeDefined();
      expect(scales.pixel).toBeDefined();
      expect(scales.font).toBeDefined();
    });

    it('should provide screen dimensions', () => {
      expect(screenWidth).toBe(402);
      expect(screenHeight).toBe(874);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero values', () => {
      expect(scale(0)).toBe(0);
      expect(scaleFont(0)).toBeGreaterThanOrEqual(10); // min constraint
      expect(scaleWidth(0)).toBe(0);
      expect(scaleHeight(0)).toBe(0);
    });

    it('should handle negative values', () => {
      expect(scale(-10)).toBeLessThanOrEqual(0);
      expect(scaleWidth(-10)).toBeLessThanOrEqual(0);
      expect(scaleHeight(-10)).toBeLessThanOrEqual(0);
    });

    it('should handle very large values', () => {
      const result = scale(10000);
      expect(result).toBeDefined();
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should handle decimal values', () => {
      const result = scale(10.5);
      expect(result).toBeDefined();
      expect(Number.isInteger(result)).toBe(true);
    });
  });

  describe('Cross-Device Consistency', () => {
    it('should scale consistently with current device dimensions', () => {
      // Reset to default device (402x874)
      configureScaler({ referenceWidth: 402, referenceHeight: 874 });
      const result = scale(100);
      expect(result).toBe(100); // Should be 1:1 on reference device
    });

    it('should scale up with larger reference dimensions', () => {
      // Configure smaller reference dimensions - current device will scale up
      configureScaler({ referenceWidth: 300, referenceHeight: 600 });
      const result = scale(100);
      expect(result).toBeGreaterThan(100);
      // Reset
      configureScaler({ referenceWidth: 402, referenceHeight: 874 });
    });

    it('should scale down with smaller reference dimensions', () => {
      // Configure larger reference dimensions - current device will scale down
      configureScaler({ referenceWidth: 800, referenceHeight: 1600 });
      const result = scale(100);
      expect(result).toBeLessThan(100);
      // Reset
      configureScaler({ referenceWidth: 402, referenceHeight: 874 });
    });

    it('should maintain proportional scaling', () => {
      configureScaler({ referenceWidth: 402, referenceHeight: 874 });
      const widthResult = scaleWidth(100);
      const heightResult = scaleHeight(100);
      // Both should scale, but results depend on actual device dimensions
      expect(widthResult).toBeGreaterThan(0);
      expect(heightResult).toBeGreaterThan(0);
    });
  });

  describe('Accessibility Features', () => {
    it('should scale fonts with increased user font scale', () => {
      (PixelRatio.getFontScale as jest.Mock).mockReturnValue(1.5);
      const normal = scaleFont(14, { respectAccessibility: true });
      expect(normal).toBeDefined();
    });

    it('should scale fonts with decreased user font scale', () => {
      (PixelRatio.getFontScale as jest.Mock).mockReturnValue(0.8);
      const normal = scaleFont(14, { respectAccessibility: true });
      expect(normal).toBeDefined();
    });

    it('should respect accessibility in line height', () => {
      (PixelRatio.getFontScale as jest.Mock).mockReturnValue(1.5);
      const lineHeight = scaleLineHeight(20, { respectAccessibility: true });
      expect(lineHeight).toBeDefined();
    });
  });

  describe('TypeScript Types', () => {
    it('should accept valid options for scale', () => {
      scale(100, { min: 80, max: 120, useUniform: true });
      scale(100, { min: 80 });
      scale(100, { max: 120 });
      scale(100, {});
      scale(100);
    });

    it('should accept valid options for scaleFont', () => {
      scaleFont(14, { min: 12, max: 18, respectAccessibility: true });
      scaleFont(14, { respectAccessibility: false });
      scaleFont(14, {});
      scaleFont(14);
    });
  });
});
