import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Planning from './pages/Planning'
import Ax from './pages/Ax'
import './styles.css'

const path = window.location.pathname.replace(/\/+$/, '').replace(/\/index\.html$/, '')
const Page = path.endsWith('/planning') ? Planning : path.endsWith('/ax') ? Ax : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
