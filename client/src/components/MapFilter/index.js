import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Divider, Radio } from 'antd'

import { setStationFilter } from '../../ducks/StationDuck/actions'

import { AggregateRadio, NameSearch } from './MapFilter.styles'

class MapFilter extends React.PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    setStationFilter: PropTypes.func,
  }

  setFilter = (e) => {
    this.props.setStationFilter({
      aggregatedData: e.target.value!=='all'
    })
  }

  render() {
    return (
      <div>
        <Divider orientation="left">Filter Stations</Divider>
        <AggregateRadio onChange={this.setFilter} defaultValue={this.props.filters.aggregatedData ? 'aggregated' : 'all'} buttonStyle={'solid'}>
          <Radio.Button value='all'>All</Radio.Button>
          <Radio.Button value='aggregated'>Aggregated Data</Radio.Button>
        </AggregateRadio>
        <NameSearch
          defaultValue={this.props.filters.name}
          placeholder="Name Contains"
          onSearch={value => this.props.setStationFilter({name: value.toUpperCase()})}
          enterButton
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  filters: state.stations.filters,
})

const mapDispatchToProps = ({
  setStationFilter,
})

export default connect(mapStateToProps, mapDispatchToProps)(MapFilter)