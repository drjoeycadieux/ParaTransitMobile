import { StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';

export const commonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddedContainer: {
    flex: 1,
    padding: Spacing.md,
  },
  
  // Text styles
  heading: {
    fontSize: FontSizes.largeTitle,
    fontWeight: FontWeights.bold,
    color: Colors.textWhite,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: FontSizes.xlarge,
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSizes.title,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  body: {
    fontSize: FontSizes.medium,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md + 3, // 19
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.round,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emergencyButton: {
    backgroundColor: Colors.emergency,
    paddingVertical: Spacing.md + 3, // 19
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.round,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg + 2, // 26
  },
  buttonText: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    marginLeft: Spacing.sm + 2, // 10
  },
  primaryButtonText: {
    color: Colors.textPrimary,
  },
  emergencyButtonText: {
    color: Colors.textWhite,
  },
  
  // Input styles
  input: {
    height: 50,
    borderColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Spacing.md - 1, // 15
    paddingLeft: Spacing.sm + 2, // 10
    fontSize: FontSizes.medium,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.backgroundWhite,
  },
  
  // Icon styles
  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  
  // Background styles
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.backgroundOverlay,
  },
  
  // Card styles
  card: {
    backgroundColor: Colors.backgroundWhite,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    elevation: 3,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: Spacing.md,
  },
  
  // Spacing helpers
  marginVertical: {
    marginVertical: Spacing.md,
  },
  marginHorizontal: {
    marginHorizontal: Spacing.md,
  },
  paddingVertical: {
    paddingVertical: Spacing.md,
  },
  paddingHorizontal: {
    paddingHorizontal: Spacing.md,
  },
});
