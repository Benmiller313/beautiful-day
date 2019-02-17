import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import { StationVizualizationWrapper } from './StationVisualization.styles'


const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
}


class StationVisualization extends React.Component {
  static propTypes = {
    stationId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  

  render() {
    return (
      <StationVizualizationWrapper>
        <Button
          style={{float:'right'}}
          type="primary"
          shape="circle"
          icon="close"
          onClick={this.props.onClose}
        />

        <p>{this.props.stationId}</p>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}           
        />
      </StationVizualizationWrapper>
    )
  }
}

export default StationVisualization