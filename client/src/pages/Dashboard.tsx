import useAuth from '../hooks/useAuth'
import { Wrapper, Heading } from './StyledComponents'

export default function Dashboard() {
  const { authorizedUser, loading } = useAuth()

  if (loading) return 'Fetching...'

  const { id, email } = authorizedUser.me

  return (
    <Wrapper>
      <Heading>User</Heading>
      {id}
      <br />
      {email}
    </Wrapper>
  )
}
