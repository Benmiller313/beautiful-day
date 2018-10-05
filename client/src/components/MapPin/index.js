import React from 'react'
import styled from 'styled-components'

const PinShape = styled.div`
    height: 20px;
    width: 20px;
    background-color: whitesmoke;
    border-radius: 50%;
`

class MapPin extends React.Component {
    render() {
        return (
            <PinShape>
                <p>hmmm</p>
            </PinShape>
        )
    }
}

export default MapPin
