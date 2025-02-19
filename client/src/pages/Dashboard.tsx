import { useQuery } from '@apollo/client'
import { FETCH_USER } from '../api/queries/userQueries'
import { Wrapper, Heading } from './StyledComponents'

export default function Dashboard() {
  const { loading, error, data } = useQuery(FETCH_USER)

  if (loading) return 'Fetching...'
  if (error) return `Fetching error! ${error.message}`
  const { id, email } = data.user

  return (
    <Wrapper>
      <Heading>User</Heading>
      {id}
      <br />
      {email}
    </Wrapper>
  )
}
