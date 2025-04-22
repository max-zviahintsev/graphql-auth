import { useQuery } from '@apollo/client'
import { FETCH_USER } from '../api/queries/userQueries'

const useAuth = () => {
  const { loading, data } = useQuery(FETCH_USER, {
    fetchPolicy: 'network-only',
  })

  return { authorizedUser: data?.me || null, loading }
}

export default useAuth
