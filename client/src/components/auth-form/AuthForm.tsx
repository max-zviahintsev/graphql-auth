import { useForm } from 'react-hook-form'
import { UserAuthPayload } from '../../types'
import { FormRow, Label, StyledInput, Button } from './StyledComponents'

interface Props {
  submitText: string
  onSubmit: (body: UserAuthPayload) => void
}

export default function AuthForm({ submitText, onSubmit }: Props) {
  const { register, handleSubmit } = useForm<UserAuthPayload>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor='email'>Email</Label>
        <StyledInput type='text' id='email' {...register('email')} />
      </FormRow>

      <FormRow>
        <Label htmlFor='password'>Password</Label>
        <StyledInput type='text' id='password' {...register('password')} />
      </FormRow>

      <Button type='submit'>{submitText}</Button>
    </form>
  )
}
