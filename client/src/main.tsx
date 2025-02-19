import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import Landing from './pages/Landing.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
