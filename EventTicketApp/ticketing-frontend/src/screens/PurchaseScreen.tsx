import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
      <Text style={styles.infoText}>Tickets Available: {selectedEvent?.availableTickets}</Text>

      {/*  Ticket Stepper */}
      <View style={styles.stepper}>
        <TouchableOpacity 
          style={[styles.stepperButton, quantity <= 1 && styles.disabledButton]} 
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <Text style={styles.stepperButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{quantity}</Text>

        <TouchableOpacity 
          style={[styles.stepperButton, quantity >= (selectedEvent?.availableTickets || 1) && styles.disabledButton]} 
          onPress={() => setQuantity(Math.min(selectedEvent?.availableTickets || 1, quantity + 1))}
          disabled={quantity >= (selectedEvent?.availableTickets || 1)}
        >
          <Text style={styles.stepperButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.purchaseButton, (loading || quantity > (selectedEvent?.availableTickets || 0)) && styles.disabledButton]} 
        onPress={handlePurchase} 
        disabled={loading || quantity > (selectedEvent?.availableTickets || 0)}
      >
        <Text style={styles.purchaseButtonText}>{loading ? "Processing..." : "Purchase"}</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#f9f9f9' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  infoText: { 
    fontSize: 16, 
    marginBottom: 20 
  },
  stepper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    marginBottom: 20 
  },
  stepperButton: { 
    backgroundColor: '#007bff', 
    padding: 10, 
    borderRadius: 5, 
    marginHorizontal: 10 
  },
  stepperButtonText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  quantityText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    minWidth: 40, 
    textAlign: 'center' 
  },
  purchaseButton: { 
    backgroundColor: '#28a745', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 8 
  },
  purchaseButtonText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  disabledButton: { 
    backgroundColor: '#ccc' 
  },
  errorText: { 
    color: 'red', 
    fontSize: 16, 
    marginTop: 10 
  },
});

export default TicketPurchase;
