# Changelog

All notable changes to the Acroyoga Club Valencia application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-26

### Added
- **Interactive Activity Calendar** - Monthly calendar view with visual indicators for days with scheduled activities
- **Activity Details Display** - Comprehensive activity information including title, location, time, participant count, capacity, and pricing
- **Dark/Light Mode Toggle** - Theme switching with automatic system preference detection and smooth transitions
- **Shareable URLs** - Date-specific URL parameters allowing users to share links to specific calendar dates
- **Responsive Design** - Mobile-friendly layout with adaptive navigation and optimized calendar display
- **TypeScript Schema System** - Complete type definitions for users, activities, transactions, and all data models with JSDoc documentation
- **Mock Data Structure** - Realistic sample data for May and June 2025 activities representing different user types (admin, members, non-members)

### Technical Features
- React frontend with TypeScript for type safety
- Express.js backend with modern architecture
- Tailwind CSS for responsive styling
- Wouter for client-side routing
- Drizzle ORM with PostgreSQL schema definitions
- Zod validation schemas for data integrity

### User Experience
- **Calendar Navigation** - Click on any date to view scheduled activities
- **Today Button** - Quick navigation back to current date
- **Activity Filtering** - Automatic filtering of activities by selected date
- **Theme Persistence** - Dark/light mode preference detection from system settings
- **Mobile Responsive** - Optimized layout for all screen sizes with hamburger menu navigation

### Data Models
- User management with different roles (admin, member, non-member)
- Activity scheduling with participant tracking
- Membership fee tracking with quarterly billing cycles
- Transaction processing for payments
- Email campaign management system

---

## Future Releases

Planned features for upcoming versions:
- User authentication and registration
- Activity signup and payment processing
- Admin dashboard for activity management
- Email notification system
- Member directory and profiles
- Advanced calendar features and filters