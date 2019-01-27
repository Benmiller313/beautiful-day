import React from 'react'
import styled from 'styled-components'
import { HamburgerButton } from 'react-hamburger-button'
import { BRAND_BLUE } from '../../constants/style'


const Header = styled.header`
  background-color: ${BRAND_BLUE};
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
`

const Title = styled.div`
  padding: 0 10px;
  font-size: 20px;
  font-weight: bold;
`


class PageHeader extends React.PureComponent {

  state = {
    isMenuOpen: false,
  }

  handleHamburgerClick = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    })
  }

  render() {
    return (
      <Header>
        <HamburgerButton
          open={this.state.isMenuOpen}
          onClick={this.handleHamburgerClick} 
          color={'white'}
          height={16}
          width={22}
          strokeWidth={2}
        />
        <Title>Beautiful Day</Title>
      </Header>
    )
  }
}

export default PageHeader