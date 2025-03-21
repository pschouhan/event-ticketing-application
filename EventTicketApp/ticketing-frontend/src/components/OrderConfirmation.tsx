import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useEvent } from '../context/EventContext';

const OrderConfirmation = ({ navigation }: { navigation: any }) => {
  const { orders, refetchOrders } = useEvent();

  // Get the latest order
  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Confirmed!</Text>
      {latestOrder ? (
        <>
          <Text>Order Number: {latestOrder.orderNumber}</Text>
          <Text>Event: {latestOrder.event.name}</Text>
          <Text>Tickets: {latestOrder.quantity}</Text>
        </>
      ) : (
        <Text>No recent order found.</Text>
      )}

      <Button
        title="Back to Events"
        onPress={() => {
          refetchOrders(); //  Ensure latest orders are reflected
          navigation.popToTop(); //  Go back to EventList
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});

export default OrderConfirmation;
