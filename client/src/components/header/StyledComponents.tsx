import styled from '@emotion/styled'
import { Link } from 'react-router'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`
export const Navigation = styled.nav`
  display: flex;
`

export const Logout = styled.nav`
  display: flex;
  text-decoration: underline;
  cursor: pointer;
`
export const LinkButton = styled(Link)`
  padding: 15px 0;
  margin-left: 15px;
  color: var(--font-color);
`
