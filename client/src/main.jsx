import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './app/store'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { ThemeProvider } from './components/ThemeProvider'

createRoot(document.getElementById('root')).render(

  <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
        <App />
        </ThemeProvider>
        <Toaster/>
      </Provider>
  </StrictMode>

)
