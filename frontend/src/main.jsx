import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./AuthPage/AuthContext.jsx"; 
import {Provider} from "react-redux"
import store from './redux/store.js';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <App />
    <ToastContainer />
  </AuthProvider>,
    </Provider>
  </StrictMode>,
)
