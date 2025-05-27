# Changelog

All notable changes to the Acroyoga Club Valencia application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-05-27

### Added
- **Login Redirect** - Added redirect parameter to login page for improved user flow
- **Layout Component** - Refactored all pages to use a shared Layout component for consistency
- **Calendar Sharing** - Improved calendar integration with optimized code and better user experience

## [1.1.0] - 2025-01-26

### Added

- **TypeScript Schema System** - Complete type definitions for users, activities, transactions, and all data models with JSDoc documentation
- **Home** - Monthly calendar view with visual indicators for days with scheduled activities
- **Dark/Light Mode Toggle** - Theme switching with automatic system preference detection and smooth transitions
- **Activity Details Page** - Show data about the event.

### Technical Features

- React frontend with TypeScript for type safety
- Express.js backend with modern architecture
- Tailwind CSS for responsive styling
- Wouter for client-side routing
- Drizzle ORM with PostgreSQL schema definitions
- Zod validation schemas for data integrity
