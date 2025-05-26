# Acroyoga Club Valencia

Acroyoga Club Valencia is a modern web application designed for managing an
informal acroyoga association in Valencia, Spain. The application features a
clean, minimalistic black and white design that allows users to view upcoming
activities through an interactive calendar interface. Users can browse
scheduled training sessions and workshops, see participant counts, pricing, and
location details for each event. The platform supports different user roles
including anonymous visitors, non-members, club members, and administrators,
each with specific permissions and access levels.

Built with React and TypeScript on the frontend and Express.js on the backend,
the application follows modern web development practices with a focus on type
safety and scalable architecture. The system is designed to integrate
seamlessly with PostgreSQL for data storage, Stripe for payment processing, and
Resend for email communications. The interactive calendar serves as the central
hub where users can explore activities, with features like activity
highlighting, date selection, and responsive design that works smoothly across
desktop and mobile devices.

## Getting Started

To run the application locally, you'll need Node.js installed on your system.
Start by cloning the repository and installing the dependencies:

`npm install `

Once the dependencies are installed, start the development server:

`npm run dev `

The application will be available at `http://localhost:5000`. The development
server runs both the React frontend and Express backend together, with hot
reloading enabled for a smooth development experience. The calendar will load
with sample activities scheduled for May and June 2025 to demonstrate the
functionality.
