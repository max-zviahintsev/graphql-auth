import { Outlet } from 'react-router'
import Header from './components/Header'
import { Wrapper } from './StyledComponents'

function App() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  )
}

export default App
