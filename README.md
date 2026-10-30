# Cherry Mobile App

Cherry is a React Native Expo book application extended for the CRUD, local storage and public API assignment. The existing Expo SDK 57 baseline, tab navigation, app icon and splash-screen configuration are retained.

## Features added

- **Create, read, update and delete:** Manage book records in the My Books tab.
- **Local persistence:** AsyncStorage saves the collection on the device.
- **Search/filter:** Search records by title, author or category.
- **Public API:** Explore uses Axios GET requests to the Open Library Search API and displays live results, loading feedback and an error/retry state.

## Setup

Use Node.js LTS. Open a terminal in this project folder and run:

```bash
npm install
npx expo-doctor
npx expo start --clear
```

The project remains on Expo SDK 57 to preserve compatibility with the existing project baseline. Do not manually change only the `expo` package to SDK 58; Expo SDK upgrades require matching versions of Expo Router and other Expo modules.

## Android APK

Ensure `eas.json` has the `preview` profile configured for internal distribution and Android APK output, then run:

```bash
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile preview
```

Download the APK from the build page provided by EAS.
