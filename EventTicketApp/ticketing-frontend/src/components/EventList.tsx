import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useEvent } from '../context/EventContext';
import { MaterialIcons } from '@expo/vector-icons'; //  Import icons

const GET_EVENTS = gql`
  query {
    events {
      id
      name
      date
      availableTickets
    }
  }
`;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toDateString(); // Example: "Fri Apr 10 2025"
};

const EventList = ({ navigation }: { navigation: any }) => {
  const { loading, error, data } = useQuery(GET_EVENTS);
  const { setSelectedEvent } = useEvent();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <FlatList
      data={data.events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={[styles.card, item.availableTickets === 0 && styles.soldOutCard]}>
          <View style={styles.eventDetails}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>Date: {formatDate(item.date)}</Text> {/*  Formatted Date */}
            <Text>Tickets Available: {item.availableTickets}</Text>
          </View>

          {item.availableTickets === 0 ? (
            <View style={styles.soldOutBadge}>
              <MaterialIcons name="event-busy" size={24} color="white" />
              <Text style={styles.soldOutText}>Sold Out</Text>
            </View>
          ) : (
            <Button
              title="Buy Ticket"
              onPress={() => {
                setSelectedEvent(item);
                navigation.navigate('PurchaseScreen');
              }}
              disabled={item.availableTickets === 0}
            />
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: { 
    padding: 15, 
    margin: 10, 
    backgroundColor: '#eee', 
    borderRadius: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  soldOutCard: { backgroundColor: '#ffcccc' }, //  Light red background for sold-out events
  eventDetails: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold' },
  soldOutBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  soldOutText: { color: 'white', fontWeight: 'bold', marginLeft: 5 },
});

export default EventList;
