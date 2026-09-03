import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { TransactionProvider } from './context/TransactionContext.jsx'
import { CategoryProvider } from './context/CategoryContext.jsx'
import { BudgetProvider } from './context/BudgetProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <TransactionProvider>
          <BudgetProvider>
            <App />
          </BudgetProvider>
        </TransactionProvider>
      </CategoryProvider>
    </BrowserRouter>  
  </StrictMode>,
)
