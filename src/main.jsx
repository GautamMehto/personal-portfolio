import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { CursorProvider } from './components/Custom/CursorContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import Loader from './components/common/Loader.jsx'
import GlobalCursor from './components/Custom/GlobalCursor.jsx'
import ThemeToggle from './components/common/ThemeToggle.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <CursorProvider>
          <GlobalCursor />
          <Loader>
            <App />
          </Loader>
          <ThemeToggle />
        </CursorProvider>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
)
