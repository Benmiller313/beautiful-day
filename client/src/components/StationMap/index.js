import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import supercluster from 'points-cluster'
import memoize from 'memoize-one'

import MapPin from '../MapPin'
import StationPin from '../StationPin'
import { fetchStations } from '../../ducks/StationDuck/actions'
import { selectStations } from '../../ducks/StationDuck/selectors'
import MapSideBar from '../MapSidebar'
import StationVisualization from '../StationVisualization'
import StationListModal from '../StationListModal';

class StationMap extends React.Component {
  static propTypes = {
    fetchStations: PropTypes.func,
    geolocation: PropTypes.object,
    stations: PropTypes.array,
  }

  constructor(props) {
    super(props)
    const center = props.geolocation ?
      { lat: props.geolocation.coords.latitude, lng: props.geolocation.coords.longitude } :
      { lat: 48.650000000000, lng: -123.630000000000 } // default to Vancouver island

    this.state = {
      focusedStations: null,
      mapProps: {
        center,
        zoom: 10,
      },
      clusters: [],
      visualizedStation: null,
    }
  }

  generateSuperCluster = memoize(stations => {
    return supercluster(
      stations,
      {
        minZoom: 3,
        maxZoom: 15,
        radius: 100,
      },
    )
  })

  onChange = (mapProps) => {
    this.setState({
      mapProps,
    })
  }

  onVisualizeStation = (stationId) => {
    this.setState({
      visualizedStation: stationId
    })
  }

  onClusterClick = (cluster) => {
    this.setState({ focusedStations: cluster.points.sort(((a, b) => {
      return b.daily_record_count - a.daily_record_count
    }))})
  }

  onCloseClusterModal = () => {
    this.setState({ focusedStations: null })
  }

  render() {
    if (this.state.visualizedStation) {
      return (
        <StationVisualization
          stationId={this.state.visualizedStation}
          onClose={() => { this.setState({ visualizedStation: null }) }}
        />
      )
    }

    const getClusters = this.generateSuperCluster(this.props.stations)
    const clusters = this.state.mapProps.bounds ? getClusters(
      this.state.mapProps
    ) : []
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          center={this.state.mapProps.center}
          zoom={this.state.mapProps.zoom}
          onChange={this.onChange}
        >
          {
            clusters.map(cluster => (
              <MapPin
                cluster={cluster}
                key={cluster.points[0].station_id}
                lat={cluster.wy}
                lng={cluster.wx}
                onClick={this.onClusterClick}
                text={`${cluster.numPoints}`}
              />
            ))
          }
        </GoogleMapReact>
        <MapSideBar />
        <StationListModal
          onClose={this.onCloseClusterModal}
          stations={this.state.focusedStations ? this.state.focusedStations : []}
          visible={this.state.focusedStations !== null}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stations: selectStations(state),
  geolocation: state.geolocation.geolocation,
})

const mapDispatchToProps = (dispatch) => ({
  fetchStations: () => {
    dispatch(fetchStations())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StationMap)