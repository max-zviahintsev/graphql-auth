import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: 400px;
`
export const Heading = styled.h1`
  font-size: 22px;
`
export const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`
export const Label = styled.label`
  min-width: 100px;
  margin-right: 15px;
  text-wrap: nowrap;
`
export const StyledInput = styled.input`
  width: 100%;
`
export const Button = styled.button`
  margin-top: 15px;
  padding: 5px 15px;
  color: var(--font-color);
  border-style: none;
  border-radius: 4px;
  font-size: 16px;
  background-color: var(--button-color);
  box-shadow: 1px 1px 2px var(--button-color);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 1px 1px 2px 2px var(--button-color);
  }
  cursor: pointer;
`
