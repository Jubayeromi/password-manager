# PassOP

**Live site:** [password-manager-6zvs.onrender.com](https://password-manager-6zvs.onrender.com/)

![PassOP application screenshot](./public/Screenshot%202026-10-15%20214454.png)

PassOP is a password manager for saving and viewing website login details. Users can create an account, sign in, and manage their saved passwords.

## How it works

- **Accounts:** Account passwords are hashed with bcrypt before they are stored.
- **Sign-in:** The server issues a signed JWT in an HTTP-only cookie. The browser sends the cookie with authenticated requests.
- **Saved passwords:** Entries belong to the signed-in user and are stored in MongoDB. Password values are encrypted by the server before storage and decrypted only when the user chooses to reveal one.
- **Frontend and backend:** React with Vite provides the interface; an Express API handles authentication and password data.

## Run locally

Install dependencies:

```sh
npm install
```

Create `server/.env` with:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-signing-secret
ENCRYPTION_KEY=your-password-encryption-key
```

Run the API and frontend in separate terminals:

```sh
npm run server
npm run dev
```

## Build and run as one service

```sh
npm run build
npm start
```

The Express server serves the production frontend and API from the same origin. Configure `MONGODB_URI`, `JWT_SECRET`, and `ENCRYPTION_KEY` in the hosting provider's environment settings. Keep the encryption key backed up and unchanged; existing saved passwords depend on it.
