import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrderConfirmation from '../components/OrderConfirmation';

const ConfirmationScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Confirmation</Text>
      <OrderConfirmation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
});

export default ConfirmationScreen;
