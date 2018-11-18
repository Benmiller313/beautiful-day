import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Button, Modal, Select } from 'antd'

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

const Option = Select.Option;

const downloadUrl = 'http://climate.weather.gc.ca/climate_data/bulk_data_e.html'

class StationPin extends React.Component {
  static propTypes = {
    station: PropTypes.object,
  }
  static defaultProps = {
    station: '',
  }

  state = { 
    downloadModalVisible: false,
    selectedYear: null,
  }

  showDownloadModal = () => {
    this.setState({
      downloadModalVisible: true,
    })
  }

  handleOk = (e) => {
    if(!this.state.selectedYear) {
      alert('Select a year')
      return
    }
    const downloadParams = `?format=csv&stationID=${this.props.station.station_id}&Year=${this.state.selectedYear}&timeframe=2&submit=Download+Data`
    window.location = downloadUrl + downloadParams
    this.setState({
      downloadModalVisible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      downloadModalVisible: false,
    });
  }

  handleYearChange = (value) => {
    this.setState({
      selectedYear: value,
    })
  }

  getModal = () => {
    if (!this.state.downloadModalVisible) {
      return false
    }
    const years = []
    for(let i = parseInt(this.props.station.data_start); i<= parseInt(this.props.station.data_end); i++) {
      years.push(i)
    }
    return (
      <Modal
        title={"Download Data"}
        visible={this.state.downloadModalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Select
          placeholder="Select a year"
          style={{ width: 150 }}
          onChange={this.handleYearChange}
        >
          {years.map(year => (<Option value={year}>{year}</Option>))}
        </Select>
      </Modal>
    )
  }

  render() {
    return (
      <PinBody>
        <h3>{this.props.station.name}</h3>
        <p>Data Start: {this.props.station.data_start}</p>
        <p>Data End: {this.props.station.data_end}</p>
        <Button onClick={this.showDownloadModal}>Download Data</Button>
        {this.getModal()}
        <i></i>
      </PinBody>
    )
  }
}

export default StationPin