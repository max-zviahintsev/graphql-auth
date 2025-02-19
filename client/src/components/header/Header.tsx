import { Wrapper, LinkButton, Navigation } from './StyledComponents'

export default function Header() {
  return (
    <Wrapper>
      <LinkButton to='/'>FANCY LOGO</LinkButton>

      <Navigation>
        <LinkButton to='/login'>Login</LinkButton>
        <LinkButton to='/register'>Register</LinkButton>
      </Navigation>
    </Wrapper>
  )
}
