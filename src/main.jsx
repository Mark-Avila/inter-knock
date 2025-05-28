import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FairyProvider } from './context/FairyContext.jsx'
import { LayoutProvider } from './context/LayoutContext.jsx'

createRoot(document.getElementById('root')).render(
    <FairyProvider>
        <LayoutProvider>
            <App />
        </LayoutProvider>
    </FairyProvider>
)
