import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { useEvent } from '../context/EventContext';

const PURCHASE_TICKET = gql`
  mutation PurchaseTicket($eventId: Int!, $quantity: Int!) {
    purchaseTicket(eventId: $eventId, quantity: $quantity) {
      orderNumber
      event {
        id
        name
        date
      }
      quantity
    }
  }
`;

const TicketPurchase = ({ navigation }: { navigation: any }) => {
  const { selectedEvent, addOrder, updateEventTickets } = useEvent();
  const [quantity, setQuantity] = useState(1); //  Default to 1 ticket

  const [purchaseTicket, { loading, error }] = useMutation(PURCHASE_TICKET, {
    onCompleted: (data) => {
      addOrder(data.purchaseTicket); //  Save order in history
      updateEventTickets(data.purchaseTicket.event.id, data.purchaseTicket.quantity);
      navigation.navigate('ConfirmationScreen');
    },
    onError: (error) => {
      Alert.alert("Purchase Failed", error.message);
    },
  });

  const handlePurchase = () => {
    if (!selectedEvent?.id) {
      Alert.alert("Error", "No event selected.");
      return;
    }

    purchaseTicket({
      variables: {
        eventId: selectedEvent.id,
        quantity,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event: {selectedEvent?.name}</Text>
      <Text>Tickets Available: {selectedEvent?.availableTickets}</Text>

      {/*  Ticket Stepper */}
      <View style={styles.stepper}>
        <Button 
          title="-" 
          onPress={() => setQuantity(Math.max(1, quantity - 1))} 
          disabled={quantity <= 1}
        />
        <Text style={styles.quantityText}>{quantity}</Text>
        <Button 
          title="+" 
          onPress={() => setQuantity(Math.min(selectedEvent?.availableTickets || 1, quantity + 1))} 
          disabled={quantity >= (selectedEvent?.availableTickets || 1)}
        />
      </View>

      <Button 
        title="Purchase" 
        onPress={handlePurchase} 
        disabled={loading || quantity > (selectedEvent?.availableTickets || 0)} 
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  stepper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 10, 
    backgroundColor: '#ddd', 
    padding: 10, 
    borderRadius: 5 
  },
  quantityText: { fontSize: 20, marginHorizontal: 20, fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 16, marginTop: 10 },
});

export default TicketPurchase;
