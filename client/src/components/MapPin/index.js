import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { BRAND_BLUE } from '../../constants/style'

const K_WIDTH = 50
const K_HEIGHT = 50

const PinShape = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    width: ${K_WIDTH}px;
    height: ${K_HEIGHT}px;

    border: 5px solid ${BRAND_BLUE};
    border-radius: ${K_HEIGHT}px;
    background-color: white;
    text-align: center;
    color: ${BRAND_BLUE};
    font-size: 16px;
    font-weight: bold;
    padding: 4px;
    cursor: pointer;
    vertical-align: middle;
`

class MapPin extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
  }

  static defaultProps = {
    onClick: () => { },
    text: '',
  }

  onClick = () => {
    this.props.onClick(this.props.cluster)
  }

  render() {
    return (
      <PinShape
        onClick={this.onClick}
      >
        <div style={{ 'margin': 'auto' }}>{this.props.text}</div>
      </PinShape>
    )
  }
}

export default MapPin
