import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './components/Header/navbar.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId="262286943846-8l71u8cjk9usjkobckfhe6mkbdhgkovj.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
