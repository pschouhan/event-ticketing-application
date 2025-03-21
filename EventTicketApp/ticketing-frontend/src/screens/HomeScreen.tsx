import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import EventList from '../components/EventList';
import { useEvent } from '../context/EventContext';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { refetchEvents } = useEvent();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchEvents(); //  Auto-refresh on return
    });
    return unsubscribe;
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Event Ticketing',
      headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
      headerRight: () => (
        <TouchableOpacity style={styles.orderButton} onPress={() => navigation.navigate('OrderListScreen')}>
          <Text style={styles.orderButtonText}>My Orders</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <EventList navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContainer: { flexGrow: 1, paddingBottom: 20 },
  orderButton: { marginRight: 15, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#007AFF', borderRadius: 8 },
  orderButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;
