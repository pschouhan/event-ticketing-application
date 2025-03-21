import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import client from './api/apollo-client';
import { EventProvider } from './context/EventContext';
import ConfirmationScreen from './screens/ConfirmationScreen';
import PurchaseScreen from './screens/PurchaseScreen';
import HomeScreen from './screens/HomeScreen';
import OrderListScreen from './screens/OrderListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <EventProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.safeArea}>
            <ScrollView 
              contentContainerStyle={styles.scrollView} 
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false} 
            >
            <Stack.Navigator initialRouteName="HomeScreen">
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="PurchaseScreen" component={PurchaseScreen} />
              <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
              <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
            </Stack.Navigator>

            </ScrollView>
          </SafeAreaView>
        </NavigationContainer>
      </EventProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollView: { flexGrow: 1, justifyContent: 'flex-start' },
});
