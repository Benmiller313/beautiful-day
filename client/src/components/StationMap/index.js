import React from 'react'
import PropTypes from 'prop-types'
import { connect }  from 'react-redux'
import GoogleMapReact from 'google-map-react'
import supercluster from 'points-cluster'
import memoize from 'memoize-one'

import MapPin from '../MapPin'
import StationPin from '../StationPin'
import { fetchStations } from '../../ducks/StationDuck/actions'
import { selectStations } from '../../ducks/StationDuck/selectors'
import MapSideBar from '../MapSidebar'

class StationMap extends React.Component {
  static propTypes = {
    fetchStations: PropTypes.func,
    geolocation: PropTypes.object,
    stations: PropTypes.array,
  }

  constructor(props) {
    super(props)
    const center = props.geolocation ? 
      {lat: props.geolocation.coords.latitude, lng: props.geolocation.coords.longitude} :
      {lat: 48.650000000000, lng: -123.630000000000} // default to Vancouver island

    this.state = {
      mapProps: {
        center,
        zoom: 10,
      },
      clusters: [],
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

  onClusterClick = (cluster) => {
    this.setState({
      mapProps: {
        ...this.state.mapProps,
        center: {lat: cluster.wy, lng: cluster.wx},
        zoom: this.state.mapProps.zoom + 1,
      }
    })
  }

  render() {
    console.log(this.props.stations)
    const getClusters = this.generateSuperCluster(this.props.stations)
    const clusters = this.state.mapProps.bounds ? getClusters(
      this.state.mapProps
    ) : []
    const clusterClick = this.onClusterClick
    console.log(clusters)
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
          center={this.state.mapProps.center}
          zoom={this.state.mapProps.zoom}
          onChange={this.onChange}
        >
        {
          clusters.map(cluster => {
            return cluster.numPoints === 1 ? 
            (
              <StationPin
                key={cluster.points[0].station_id}
                station={cluster.points[0]}
                lat={cluster.points[0].lat}
                lng={cluster.points[0].lng}

              />
            ): (
              <MapPin
                cluster={cluster}
                key={cluster.points[0].station_id} 
                lat={cluster.wy}
                lng={cluster.wx}
                onClick={clusterClick}
                text={`${cluster.numPoints}`}
              />
            )
          })
        }
        </GoogleMapReact>
        <MapSideBar />

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