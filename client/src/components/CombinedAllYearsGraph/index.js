import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { BeatLoader } from 'react-spinners';

import { fetchCombinedGraph } from '../../ducks/StationDuck/actions'
import Dygraph from '../Dygraph'

class CombinedAllYearsGraph extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    stations: PropTypes.string.isRequired,
    fetchCombinedGraph: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchCombinedGraph(this.props.stations)
  }

  render() {
    if (!this.props.data) {
      return (
        <BeatLoader
          sizeUnit={"px"}
          size={10}
          color={'grey'}
          loading={true}
        />
      )
    }
    return (
      <Dygraph 
        data={this.props.data}
        labels={["Date", ...this.props.stations.map(station => `${station.name} Max`)]}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: state.stations.combinedGraphData[ownProps.stations.map(station => station.id).join('_')],
})

const mapDispatchToProps = {
  fetchCombinedGraph: fetchCombinedGraph
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CombinedAllYearsGraph)