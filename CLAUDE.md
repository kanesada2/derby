# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm start`: Start the Expo development server
- `npm run reset-project`: Reset the project to a fresh state
- `npm run android`: Start the app on Android
- `npm run ios`: Start the app on iOS
- `npm run web`: Start the app on web
- `npm run lint`: Run ESLint

## Code Style Guidelines
- **TypeScript**: Use strict mode with proper type definitions
- **Imports**: Use absolute imports with `@/*` alias for project root
- **Component Structure**: React functional components with hooks
- **Naming**: 
  - Classes use PascalCase (e.g., `Runner`, `BaseSpeed`)
  - Private class properties prefixed with underscore (e.g., `_id`, `_location`)
  - Use descriptive names for functions and variables
- **State Management**: Use context providers for shared state
- **Error Handling**: Use proper TypeScript types to avoid runtime errors
- **Styling**: Use StyleSheet for component styles
- **Domain Model**: Follow Domain-Driven Design principles with entities and value objects