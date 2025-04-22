import { useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'
import { useMutation, useApolloClient } from '@apollo/client'
import { Wrapper, LinkButton, Navigation, Logout } from './StyledComponents'
import { LOGOUT } from '../../api/mutations/userMutations'
import { FETCH_USER } from '../../api/queries/userQueries'

export default function Header() {
  const { authorizedUser } = useAuth()
  const navigate = useNavigate()
  const client = useApolloClient()

  const [logout] = useMutation(LOGOUT, {
    refetchQueries: [FETCH_USER, 'FetchUser'],
    onCompleted: async () => {
      await client.resetStore().catch((error) => {
        console.error(error)
      })
      navigate('/login')
    },
  })

  const handleLogout = () => logout()

  const navigation = !authorizedUser ? (
    <Navigation>
      <LinkButton to='/login'>Login</LinkButton>
      <LinkButton to='/register'>Register</LinkButton>
    </Navigation>
  ) : (
    <Logout onClick={handleLogout}>Log out</Logout>
  )

  return (
    <Wrapper>
      <LinkButton to='/'>FANCY LOGO</LinkButton>
      {navigation}
    </Wrapper>
  )
}
