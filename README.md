# RN Product List

A React Native application for displaying and filtering products with calendar event integration and local notifications.

## Features

- Product listing and filtering
- Image slider for product images
- Calendar event integration (iOS only)
- Local notifications with deep linking

## Technology Stack

- **React Native**: v0.81.4
- **Expo**: v54.0.10
- **State Management**: Zustand
- **UI Components**: 
  - Expo Vector Icons
  - React Native Picker
  - Shopify Flash List
- **Navigation**: Expo Router
- **Data Fetching**: TanStack React Query
- **Notifications**: Expo Notifications

## Requirements

- Node.js 16+
- Yarn or npm
- iOS device or simulator (Android support coming soon)
- Xcode 14+ (for iOS development)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd rn-product-list
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Run on iOS:
   ```
   npm run ios
   ```

## Native Module: Event Reminder

This project includes a custom native module (`event-reminder`) that provides:

- Asks for calendar access permissions if not already granted
- Calendar event creation (iOS only)

The module is implemented natively for iOS and provides a JavaScript interface for React Native.

## Project Structure

```
├── src/
│   ├── app/                 # Expo Router screens
│   ├── components/          # Reusable UI components
│   ├── constants/           # App constants and colors
│   ├── models/              # TypeScript interfaces
│   ├── services/            # Notification services
│   ├── store/               # Zustand state management
│   ├── utils/               # Utility functions
│   └── viewmodels/          # Business logic
├── packages/
│   └── event-reminder/      # Native calendar/events
```

## Limitations

- Currently only supports iOS devices
- Android implementation is planned for future releases

## License

MIT