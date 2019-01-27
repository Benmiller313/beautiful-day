import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Divider, Radio } from 'antd'

import { setStationFilter } from '../../ducks/StationDuck/actions'

class MapFilter extends React.PureComponent {
  static propTypes = {
    filter: PropTypes.oneOf(['all', 'aggregated']),
    setStationFilter: PropTypes.func,
  }

  setFilter = (e) => {
    this.props.setStationFilter(e.target.value)
  }

  render() {
    return (
      <div>
        <Divider orientation="left">Filter Stations</Divider>
        <Radio.Group onChange={this.setFilter} defaultValue={this.props.filter} buttonStyle={'solid'}>
          <Radio.Button value='all'>All</Radio.Button>
          <Radio.Button value='aggregated'>Aggregated Data</Radio.Button>
        </Radio.Group>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  filter: state.stations.filter,
})

const mapDispatchToProps = ({
  setStationFilter,
})

export default connect(mapStateToProps, mapDispatchToProps)(MapFilter)