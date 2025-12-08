import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import StoreContextProvider from './context/StoreContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Routes.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StoreContextProvider>
            <Router />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </StoreContextProvider>
    </BrowserRouter>
)
