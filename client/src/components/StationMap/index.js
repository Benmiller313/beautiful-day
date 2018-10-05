import React from 'react'
import GoogleMapReact from 'google-map-react'

import MapPin from '../MapPin'

class StationMap extends React.Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: ''}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MapPin
            lat={59.955413}
            lng={30.337844}
          />
        </GoogleMapReact>
      </div>
    )
  }
}

export default StationMap