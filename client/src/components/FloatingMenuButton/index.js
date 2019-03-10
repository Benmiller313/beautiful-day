import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd'

import MenuSVG from './menu.svg'

const ButtonDiv = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  margin: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  width: 40px;
  height: 40px;
  background-color: white;
  padding: 10px;
  text-align: center;
`

class FloatingMenuButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }
  
  render() {
    return (
      <ButtonDiv
        onClick={this.props.onClick}
      >
        <Icon type="caret-right" />
      </ButtonDiv>
    )
  }
}

export default FloatingMenuButton