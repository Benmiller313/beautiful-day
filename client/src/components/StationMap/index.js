import React from 'react'
import PropTypes from 'prop-types'
import { connect }  from 'react-redux'
import GoogleMapReact from 'google-map-react'
import supercluster from 'points-cluster'
import { withPropsOnChange, compose } from 'recompose'
import MapPin from '../MapPin'
import StationPin from '../StationPin'
import { fetchStations } from '../../ducks/StationDuck/actions';


class StationMap extends React.Component {
  static propTypes = {
    fetchStations: PropTypes.func,
    geolocation: PropTypes.object,
    stations: PropTypes.array,
  }

  constructor(props) {
    super(props)
    console.log(props.geolocation)
    if (props.geolocation) {
      this.state = {
        mapProps: {
          center: {lat: props.geolocation.coords.latitude, lng: props.geolocation.coords.longitude},
          zoom: 10,
        },
        clusters: [],
      }
    }
    else {
      this.state = {
        mapProps: {
          center: {lat: 44.5895, lng: -75.6843},
          zoom: 10,
        },
        clusters: [],
      }
    }
  }

  onChange = (mapProps) => {
    
    this.setState({
      mapProps,
      clusters: mapProps.bounds ? this.props.getClusters(mapProps) : []
    })
  }

  render() {
    const cl2 = supercluster(this.props.stations);
    const clusters = this.state.mapProps.bounds ? cl2(
      this.state.mapProps
    ) : []
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
                key={cluster.points[0].station_id} 
                lat={cluster.wy}
                lng={cluster.wx}
                text={`${cluster.numPoints}`}
              />
            )
          })
        }
        </GoogleMapReact>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stations: state.stations,
  geolocation: state.geolocation.geolocation,
})

const mapDispatchToProps = (dispatch) => ({
  fetchStations: () => {
    dispatch(fetchStations())
  }
})

export default compose(
  withPropsOnChange(
    ['stations'],
    ({stations=[]}) => ({
      getClusters: supercluster(
        stations,
        {
          minZoom: 3,
          maxZoom: 15,
          radius: 60,
        },
      )
    })
  ),
  connect(mapStateToProps, mapDispatchToProps)
)(StationMap)