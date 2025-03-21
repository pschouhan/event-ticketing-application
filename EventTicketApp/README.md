# Event Ticketing Application

## Overview

The **Event Ticketing Application** is a full-stack solution that allows users to **view events, purchase tickets, and receive order confirmations**. Built using **React Native (Expo) for the frontend** and **NestJS with GraphQL & PostgreSQL for the backend**, the application follows modern **architecture patterns, state management principles, and best practices** to ensure scalability and maintainability.

## Features

- **View Events**: Users can browse a list of upcoming events, including event name, date, and ticket availability.
- **Purchase Tickets**: Users can buy multiple tickets per event, ensuring they do not exceed available stock.
- **Sold Out Events**: Events that have reached their ticket limit are visually marked as "Sold Out".
- **Order Confirmation**: After a successful purchase, users receive an order summary containing:
  - Order number
  - Event details
  - Number of tickets purchased
- **Past Events Handling**: Events that have already occurred are greyed out, ensuring clear user experience.

## Installation & Setup

### Prerequisites

Ensure you have the following installed:
- **Node.js** (>=16.x)
- **PostgreSQL**
- **npm**
- **Expo CLI** (install using `npm install -g expo-cli`)

### Backend Setup (NestJS + GraphQL)

1. Clone the repository and navigate to the backend folder:
   ```sh
   git clone https://github.com/yourusername/event-ticketing-app.git
   cd event-ticketing-app/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```
   - Update `.env` with your PostgreSQL database credentials.
4. Run database migrations:
   ```sh
   npx typeorm migration:run
   ```
5. Seed the database with initial event data:
   ```sh
   npm run seed
   ```
6. Start the backend server:
   ```sh
   npm run start:dev
   ```
   - The backend runs at **http://localhost:3000/graphql**

### Frontend Setup (Expo + React Native)

1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Expo development server:
   ```sh
   npx expo start
   ```
   - Scan the QR code using **Expo Go** or run the app on an emulator.

## Architecture & Design Patterns

### Backend (NestJS + GraphQL)
- **Modular structure**: Separate modules for **events, orders, and database interactions**.
- **Database Design**:
  - PostgreSQL with **TypeORM** ensures structured data storage.
  - Proper entity relationships to maintain **event inventory** and **order history**.
- **GraphQL API**:
  - Queries for event listings and order details.
  - Mutations for ticket purchases with **real-time validation**.
- **Validation & Error Handling**:
  - Prevents purchasing more tickets than available.
  - Handles invalid event access and past purchases gracefully.

### Frontend (React Native + Expo)
- **Component-based UI**: Ensures a **modular and reusable** design.
- **React Context API for State Management**:
  - Global event and order state management.
  - Updates UI dynamically without unnecessary re-fetching.
- **Apollo Client for GraphQL**:
  - Efficient data fetching and caching.
  - Optimistic UI updates for better user experience.

## State Management Implementation

- **Events State**: Stored globally in **React Context**, ensuring real-time updates for event details.
- **Orders State**:
  - Stores transaction history locally.
  - Updates the UI instantly after successful purchases.
- **GraphQL Queries & Mutations**:
  - Efficiently handles state synchronization between frontend and backend.

## Additional Notes

- The database schema is designed for **scalability**, supporting potential **future features** like:
  - Refunds and ticket cancellations.
  - Ticket transfers between users.
- The project adheres to **clean architecture principles**, ensuring a clear separation of concerns between:
  - Data access (TypeORM + PostgreSQL)
  - Business logic (NestJS services)
  - Presentation layer (React Native components)

## Trade-offs & Assumptions

- **Advanced UI/UX features** (animations, transitions) are not included to keep the focus on **core functionality**.
- **Authentication & User Management** are currently not implemented but can be added as an extension.
- The project prioritizes **maintainability and scalability** over rapid prototyping.


