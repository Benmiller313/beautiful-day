import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const PinBody = styled.div`
  transform:translate(-50%, -100%);

  min-width:200px; 
  top:-20px;
  left:50%;
  padding:10px 20px;
  color:#444444;
  background-color:white;
  font-weight:normal;
  font-size:13px;
  border-radius:8px;
  position:absolute;
  z-index:99999999;
  box-sizing:border-box;
  box-shadow:0 1px 8px rgba(0,0,0,0.5);

  i {
      position:absolute;
      top:100%;
      left:50%;
      margin-left:-12px;
      width:24px;
      height:12px;
      overflow:hidden;
  }
  i::after {
    content:'';
    position:absolute;
    width:12px;
    height:12px;
    left:50%;
    transform:translate(-50%,-50%) rotate(45deg);
    background-color:#EEEEEE;
    box-shadow:0 1px 8px rgba(0,0,0,0.5);
  } 
`

class StationPin extends React.Component {
  static propTypes = {
    station: PropTypes.object,
  }
  static defaultProps = {
    station: '',
  }

  render() {
    return (
      <PinBody>
        <h3>{this.props.station.name}</h3>
        <p>Data Start: {this.props.station.data_start}</p>
        <p>Data End: {this.props.station.data_end}</p>
        <i></i>
      </PinBody>
    )
  }
}

export default StationPin