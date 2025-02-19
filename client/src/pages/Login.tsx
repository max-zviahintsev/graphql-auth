import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../api/mutations/userMutations'
import { FETCH_USER } from '../api/queries/userQueries'
import { Wrapper, Heading } from './StyledComponents'
import AuthForm from '../components/auth-form/AuthForm'
import { UserAuthPayload } from '../types'

export default function Register() {
  const navigate = useNavigate()

  const [login, { loading, error }] = useMutation(LOGIN, {
    refetchQueries: [FETCH_USER, 'FetchUser'],
    onCompleted() {
      navigate('/dashboard')
    },
  })

  const onSubmit: SubmitHandler<UserAuthPayload> = (body) => {
    login({ variables: body })
  }

  if (loading) return 'Submitting...'
  if (error) return `Submission error! ${error.message}`

  return (
    <Wrapper>
      <Heading>Login</Heading>
      <AuthForm submitText='Log in' onSubmit={onSubmit} />
    </Wrapper>
  )
}
