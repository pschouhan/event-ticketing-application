

```markdown
#  Event Ticketing App - How It Works

This document explains how different technologies work together in the **Event Ticketing App** using **TypeORM, GraphQL, React Context API, and NestJS**.

---

##  TypeORM (Database Management Layer)
TypeORM is an **Object-Relational Mapper (ORM)** that allows us to interact with our PostgreSQL database **without writing SQL queries**.

###  How It Works
- We define **TypeScript classes (entities)** that map to **database tables**.
- TypeORM handles **fetching, inserting, and updating records** automatically.

---

###  Example: How Events Are Stored in the Database
```typescript
@Entity() // This tells TypeORM to create a table
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  availableTickets: number;
}
```
** What happens here?**  
- TypeORM automatically creates an `events` table.  
- No need to write `CREATE TABLE` SQL statements manually.  
- When we fetch events, TypeORM translates our request into SQL queries.

---

##  GraphQL (API Layer)
GraphQL is a **query language** that lets the frontend ask **only for the data it needs**.

###  How It Works
- Instead of **multiple REST API endpoints**, we have **one GraphQL API**.
- The frontend **sends a query**, and the backend **responds with only the requested fields**.

---

###  Example: Fetching Events with GraphQL
```graphql
query GetEvents {
  events {
    id
    name
    date
    availableTickets
  }
}
```
- The frontend **asks only for `id`, `name`, `date`, and `availableTickets`**.
- The backend responds with **only those fields**, reducing extra data transfer.

---

###  Example: How the Backend Processes the Request
```typescript
@Query(() => [Event])
async events(): Promise<Event[]> {
  return this.eventRepository.find(); // Fetches events from PostgreSQL
}
```
** What happens here?**  
- The frontend sends a **GraphQL query** to `http://localhost:3000/graphql`.  
- The backend uses **NestJS + TypeORM** to fetch the events.  
- PostgreSQL returns the **event list**, and GraphQL **sends it back to the frontend**.

---

##  React Context API (State Management Layer)
React Context API helps **store and share data across screens**.

###  How It Works
1. The `EventContext.tsx` file **stores the selected event and orders**.
2. The entire app **accesses and updates this global state**.
3. When a user **buys a ticket**, the order is **added to the state**.

---

###  Example: Managing Orders in React Context
```typescript
const { order, setOrder } = useEvent(); // Access global state

<Button title="Back to Events" onPress={() => {
  setOrder(null); // Reset order when going back
  navigation.navigate('HomeScreen'); // Navigate to events
}} />
```
** What happens here?**  
- `setOrder(null)` clears the previous order.  
- The user is navigated **back to the event list**.  
- The state is **automatically updated across the app**.

---

##  How Everything Works Together
| **Step** | **Technology Used** | **What Happens?** |
|----------|------------------|-----------------|
| User opens the app | React Native (useQuery) | Fetches event list from GraphQL |
| Backend gets events | NestJS (GraphQL Resolver) | Queries PostgreSQL using TypeORM |
| Data is stored | PostgreSQL + TypeORM | Events are stored in `events` table |
| User selects event | React Context API | Stores selected event in global state |
| User buys ticket | GraphQL Mutation | Sends request to backend |
| Backend processes order | NestJS + TypeORM | Checks availability, updates ticket count |
| Database updates | PostgreSQL | New order is saved, tickets decrease |
| Confirmation screen | React Native (Context) | Displays order details from state |

---

##  Summary
| **Technology** | **Purpose in Our App** |
|--------------|-------------------|
| **TypeORM** | Handles database operations (fetching, updating, inserting data) |
| **GraphQL** | Allows the frontend to request only the data it needs |
| **React Context API** | Manages app-wide state (events, orders, selected event) |
| **NestJS** | Provides structured backend services (handles API requests) |
| **PostgreSQL** | Stores events, orders, and ticket data |

---

