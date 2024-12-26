# README.md

# Debate Application

This is a debate application designed to facilitate and manage debate events. It includes features for user authentication, event creation, team selection, and real-time debate management.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/shadan-pk/Debate-App.git
   cd debate-app

## Project Structure

The project is organized into the following main directories:

- **build/**: Contains the production build of the application.
- **public/**: Contains the public-facing HTML file.
- **server/**: Contains the server-side code and configuration.
- **src/**: Contains the source code for the React application, including components, contexts, hooks, pages, services, and styles.


```
debate-app/
├── public/
│   ├── index.html
├── server/
│   ├── config/
│   │   └── sequelize.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── user.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── index.js
│   ├── package.json
├── src/
│   ├── components/
│   │   ├── AdminPanel.js
│   │   ├── AudioPlayer.js
│   │   ├── Debate.js
│   │   ├── EventCreation.js
│   │   ├── Login.js
│   │   ├── TeamSelection.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── MicControl.js
│   │   ├── TeamSide.js
│   │   ├── Timer.js
│   │   └── UserList.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── DebateContext.js
│   ├── hooks/
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── AdminPage.js
│   │   ├── DebatePage.js
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   └── TeamSelectionPage.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   ├── routes.js
│   └── styles/
│       └── styles.css
├── package.json
```
## Features

- User authentication and authorization
- Admin panel for managing debates and users
- Real-time audio playback and microphone control
- Timer for managing debate durations
- Team selection interface

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd debate-app
   ```

3. Install dependencies for both client and server:
   ```
   npm install
   cd server
   npm install
   ```

4. Start the server:
   ```
   node index.js
   ```

5. Start the client application:
   ```
   npm start
   ```

## Usage

- Access the application in your web browser at `http://localhost:3000`.
- Use the login page to authenticate users.
- Admin users can access the admin panel to manage debates and users.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
