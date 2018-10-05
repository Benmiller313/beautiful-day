import React from 'react'
import PropTypes from 'prop-types'
import { connect }  from 'react-redux'
import GoogleMapReact from 'google-map-react'

import MapPin from '../MapPin'


class StationMap extends React.Component {
  static propTypes = {
    center: PropTypes.shape(
      {
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
      }
    ),
    stations: PropTypes.array,
    zoom: PropTypes.number
  }

  static defaultProps = {
    center: {lat: 44.5895, lng: -75.6843},
    zoom: 10
  };

  render() {
    console.log(this.props.stations)
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: ''}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        {
          this.props.stations.map(station => (
            <MapPin
              key={station.station_id} 
              lat={station.latitude}
              lng={station.longitude}
              text={station.name}
            />
          ))
        }
        </GoogleMapReact>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stations: state.stations
}) 

export default connect(mapStateToProps)(StationMap)