import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';
import { commonStyles } from '../styles/commonStyles';

const RequestScreen = ({ route }) => {
  const { 
    pickupLocation, 
    destination, 
    time, 
    contactNumber, 
    specialInstructions,
    rideId 
  } = route.params || {};

  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || 'Not provided'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.header}>Ride Request Details</Text>
          
          {rideId && (
            <View style={styles.rideIdContainer}>
              <Text style={styles.rideIdLabel}>Request ID</Text>
              <Text style={styles.rideId}>{rideId}</Text>
            </View>
          )}

          <View style={styles.detailsContainer}>
            <InfoRow label="Pickup Location" value={pickupLocation} />
            <InfoRow label="Destination" value={destination} />
            <InfoRow label="Preferred Time" value={time} />
            <InfoRow label="Contact Number" value={contactNumber} />
            {specialInstructions && (
              <InfoRow label="Special Instructions" value={specialInstructions} />
            )}
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Pending</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    elevation: 3,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    fontSize: FontSizes.heading,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    color: Colors.textPrimary,
  },
  rideIdContainer: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  rideIdLabel: {
    fontSize: FontSizes.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  rideId: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
  },
  detailsContainer: {
    marginBottom: Spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.textSecondary,
    flex: 1,
  },
  value: {
    fontSize: FontSizes.medium,
    color: Colors.textPrimary,
    flex: 2,
    textAlign: 'right',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  statusLabel: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.textSecondary,
  },
  statusBadge: {
    backgroundColor: Colors.warning,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
  },
  statusText: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    color: Colors.textWhite,
  },
});

export default RequestScreen;
