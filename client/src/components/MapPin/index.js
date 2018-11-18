import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { BRAND_BLUE } from '../../constants/style'

const K_WIDTH = 40
const K_HEIGHT = 40

const PinShape = styled.div`
    position: absolute
    width: ${K_WIDTH}px;
    height: ${K_HEIGHT}px;
    left: ${-(K_WIDTH / 2 + 10)}px;
    top: ${-(K_HEIGHT / 2 + 10)}px;

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
        onClick: () => {},
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
                <p>{this.props.text}</p>
            </PinShape>
        )
    }
}

export default MapPin
