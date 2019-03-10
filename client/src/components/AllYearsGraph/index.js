import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { BeatLoader } from 'react-spinners';

import { fetchStationGraphAll } from '../../ducks/StationDuck/actions'
import Dygraph from '../Dygraph'

class AllYearsGraph extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    stationId: PropTypes.string.isRequired,
    fetchStationGraphAll: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchStationGraphAll(this.props.stationId)
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
      />
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
)(AllYearsGraph)