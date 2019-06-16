import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { BeatLoader } from 'react-spinners';

import { fetchCombinedGraph } from '../../ducks/StationDuck/actions'
import Dygraph from '../Dygraph'
import { selectMetric } from '../../ducks/StationDuck/selectors'
import { METRIC_TO_TITLE } from '../../constants/graph';

class CombinedAllYearsGraph extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    stations: PropTypes.array.isRequired,
    fetchCombinedGraph: PropTypes.func.isRequired,
    trend_line_high: PropTypes.number,
    trend_line_low: PropTypes.number,
    metric: PropTypes.string.isRequired,
  }
  static defaultProps = {
    trend_line_high: null,
    trend_line_low: null,
  }

  componentDidMount() {
    this.props.fetchCombinedGraph(this.props.stations)
  }

  render() {
    if (!this.props.data || !this.props.data[this.props.metric]) {
      return (
        <BeatLoader
          sizeUnit={"px"}
          size={10}
          color={'grey'}
          loading={true}
        />
      )
    }
    let trend_line_low = null
    let trend_line_high = null
    if (this.props.stations && this.props.project) {
      const group = this.props.project.groupings.find(group => group.stations.find(station => station.id === this.props.stations[0].id))
      if (group) {
        trend_line_low = group.trend_line_low
        trend_line_high = group.trend_line_high
      }
    }
    return (
      <Dygraph 
        data={this.props.data[this.props.metric]}
        labels={["Date", ...this.props.stations.map(station => `${station.name} ${this.props.metric}`)]}
        title={`Daily ${METRIC_TO_TITLE[this.props.metric]}`}
        trend_line_high={this.props.metric === 'max' ? trend_line_high: null}
        trend_line_low={this.props.metric === 'max' ? trend_line_low: null}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: state.stations.combinedGraphData[ownProps.stations.map(station => station.id).join('_')],
  metric: selectMetric(state)
})

const mapDispatchToProps = {
  fetchCombinedGraph: fetchCombinedGraph
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CombinedAllYearsGraph)