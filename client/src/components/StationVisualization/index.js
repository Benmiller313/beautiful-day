import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'antd'
import Dygraph from 'dygraphs'

import { fetchStationGraphAll } from '../../ducks/StationDuck/actions'

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
    data: PropTypes.array,
    stationId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    fetchStationGraphAll: PropTypes.func.isRequired,
  }
  static defaultProps = {
    data: [],
  }

  componentDidMount() {
    this.props.fetchStationGraphAll(this.props.stationId)
  }
  componentDidUpdate() {
    new Dygraph(this.refs.chart, this.props.data, {
      labels: ["Date", "Max Temp"]
    })
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
        <div style={{width: '80%'}} ref="chart"></div>
      </StationVizualizationWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: state.stations.stationGraphData[ownProps.stationId],
})

const mapDispatchToProps = dispatch => ({
  fetchStationGraphAll: (stationId) => {
    dispatch(fetchStationGraphAll(stationId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationVisualization)