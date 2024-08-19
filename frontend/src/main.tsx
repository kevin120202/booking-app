import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext.tsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0
        }
    }
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </QueryClientProvider>
    </StrictMode>
)

/*********************
- Initializes a QueryClient with default options to configure React Query behavior (e.g., no query retries)
- Renders the React application into the root element, wrapping it with providers for React Query and AppContext
- This setup ensures that query caching and state management are available throughout the app
*********************/
