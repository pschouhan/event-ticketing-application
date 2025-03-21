import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      name
      date
      availableTickets
    }
  }
`;

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


interface Event {
  id: number;
  name: string;
  date: string;
  availableTickets: number;
}

interface Order {
  orderNumber: string;
  event: Event;
  quantity: number;
}

interface EventContextProps {
  events: Event[];
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateEventTickets: (eventId: number, purchasedTickets: number) => void;
  refetchEvents: () => void;
  refetchOrders: () => void;
}

interface EventProviderProps {
  children: ReactNode;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const { data: eventData, refetch: refetchEvents } = useQuery(GET_EVENTS);
  const { data: orderData, refetch: refetchOrders } = useQuery(GET_ORDERS);

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  //  Update events when fetched
  useEffect(() => {
    if (eventData?.events) {
      setEvents(eventData.events);
    }
  }, [eventData]);

  //  Update orders when fetched
  useEffect(() => {
    if (orderData?.orders) {
      setOrders(orderData.orders);
    }
  }, [orderData]);

  const updateEventTickets = (eventId: number, purchasedTickets: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, availableTickets: Math.max(0, event.availableTickets - purchasedTickets) }
          : event
      )
    );
  };

  const addOrder = async (newOrder: Order) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    await refetchOrders(); //  Ensure updated orders are fetched from the database
  };

  return (
    <EventContext.Provider
      value={{
        events,
        selectedEvent,
        setSelectedEvent,
        orders,
        addOrder,
        updateEventTickets,
        refetchEvents,
        refetchOrders,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvent must be used within EventProvider');
  return context;
};
