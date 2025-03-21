import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';

const GET_ORDERS = gql`
  query {
    getOrders {
      id
      orderNumber
      event {
        name
        date
      }
      quantity
    }
  }
`;

const OrderListScreen = () => {
  const { loading, error, data, refetch } = useQuery(GET_ORDERS);

  //  Auto-refresh orders when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (error) return <Text style={styles.error}>⚠️ Error loading orders!</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📋 My Orders</Text>
      
      {data?.getOrders.length === 0 ? (
        <Text style={styles.noOrders}>No orders yet! 🛒</Text>
      ) : (
        <FlatList
          data={data.getOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Text style={styles.eventName}>🎟 {item.event.name}</Text>
              <Text style={styles.eventDate}>🗓 {new Date(item.event.date).toLocaleDateString()}</Text>
              <Text style={styles.ticketCount}>🎫 Tickets: {item.quantity}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#333' },
  loader: { marginTop: 50 },
  error: { color: 'red', fontSize: 18, textAlign: 'center', marginTop: 20 },
  noOrders: { fontSize: 18, textAlign: 'center', marginTop: 20, color: '#666' },
  orderCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  eventName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  eventDate: { fontSize: 16, color: '#555', marginTop: 5 },
  ticketCount: { fontSize: 16, fontWeight: '500', color: '#007BFF', marginTop: 5 },
});

export default OrderListScreen;
