import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const K_WIDTH = 40
const K_HEIGHT = 40

const PinShape = styled.div`
    position: absolute
    width: ${K_WIDTH}px;
    height: ${K_HEIGHT}px;
    left: ${-(K_WIDTH / 2 + 10)}px;
    top: ${-(K_HEIGHT / 2 + 10)}px;

    border: 5px solid #f44336;
    border-radius: ${K_HEIGHT}px;
    background-color: white;
    text-align: center;
    color: #3f51b5;
    font-size: 16px;
    font-weight: bold;
    padding: 4px;
`

class MapPin extends React.Component {
    static propTypes = {
        text: PropTypes.string,
    }

    static defaultProps = {
        text: '',
    }

    render() {
        return (
            <PinShape>
                <p>{this.props.text}</p>
            </PinShape>
        )
    }
}

export default MapPin
