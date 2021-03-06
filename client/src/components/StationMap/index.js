import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import supercluster from 'points-cluster'
import memoize from 'memoize-one'

import MapPin from '../MapPin'
import StationPin from '../StationPin'
import { fetchStations, fetchProjects } from '../../ducks/StationDuck/actions'
import { selectFilteredStations } from '../../ducks/StationDuck/selectors'
import MapSideBar from '../MapSidebar'
import StationListModal from '../StationListModal';
import StationVisualizationLayout from '../StationVisualizationLayout';
import ProjectDescriptionModal from '../ProjectDescriptionModal';
import ProjectPin from '../ProjectPin';

class StationMap extends React.Component {
  static propTypes = {
    geolocation: PropTypes.object,
    selectedProject: PropTypes.object,
    stations: PropTypes.array,
  }

  constructor(props) {
    super(props)
    const center = props.geolocation ?
      { lat: props.geolocation.coords.latitude, lng: props.geolocation.coords.longitude } :
      { lat: 48.650000000000, lng: -123.630000000000 } // default to Vancouver island

    this.state = {
      focusedStations: null,
      hoveredProject: null, 
      mapProps: {
        center,
        zoom: 10,
      },
      clusters: [],
      visualizedStation: null,
      combinedStations: null,
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
    console.log('Map Zoom: ' + mapProps.zoom)
    this.setState({
      mapProps,
    })
  }

  onVisualizeStation = (station) => {
    this.setState({
      visualizedStation: station
    })
  }

  onVisualizeCombinedStations = (stations) => {
    this.setState({
      combinedStations: stations,
    })
  }

  onCenterStation = (station) => {
    this.onCloseClusterModal()
    this.setState({mapProps: {
      center: {lat: station.lat, lng: station.lng},
      zoom: 15,
    }})
  }

  onCenterProject = () => {
    const groups = this.createProjectClusters()
    const projectCenter = this.averageGeolocation(groups)
    const projectZoom = this.props.selectedProject.default_zoom
    this.setState({mapProps: {
      ...this.state.mapProps,
      center: {lat: projectCenter.wy, lng: projectCenter.wx},
      zoom: projectZoom ? projectZoom : 4
    }})
  }

  onClusterClick = (cluster) => {
    if (this.props.selectedProject) {
      this.onVisualizeCombinedStations(cluster.points)
    } else {
      this.setState({ focusedStations: cluster.points.sort(((a, b) => {
        return b.daily_record_count - a.daily_record_count
      }))})
    }
  }

  onStartHoverProjectCluster = (cluster) => {
    this.setState({hoveredProject: cluster})
  }

  onEndHoverProjectCluster = () => {
    this.setState({hoveredProject: null})
  }

  onCloseClusterModal = () => {
    this.setState({ focusedStations: null })
  }

  averageGeolocation(coords) {
    if (coords.length === 1) {
      return {
        wy: coords[0].latitude,
        wx: coords[0].longitude,
        latitude: coords[0].latitude,
        longitude: coords[0].longitude,
      }
    }
  
    let x = 0.0;
    let y = 0.0;
    let z = 0.0;
  
    for (let coord of coords) {
      let latitude = coord.latitude * Math.PI / 180;
      let longitude = coord.longitude * Math.PI / 180;
  
      x += Math.cos(latitude) * Math.cos(longitude);
      y += Math.cos(latitude) * Math.sin(longitude);
      z += Math.sin(latitude);
    }
  
    let total = coords.length;
  
    x = x / total;
    y = y / total;
    z = z / total;
  
    let centralLongitude = Math.atan2(y, x);
    let centralSquareRoot = Math.sqrt(x * x + y * y);
    let centralLatitude = Math.atan2(z, centralSquareRoot);
  
    return {
      wy: centralLatitude * 180 / Math.PI,
      wx: centralLongitude * 180 / Math.PI,
      latitude: centralLatitude * 180 / Math.PI,
      longitude: centralLongitude * 180 / Math.PI,
    };
  }
  


  createProjectClusters = () => {
    const project = this.props.selectedProject
    return project.groupings.map(group => {
      const coords = this.averageGeolocation(group.stations)
      coords.numPoints = group.stations.length
      coords.points = group.stations
      return coords
    })

  }

  getClusters = () => {
    if (this.props.selectedProject) {
      return this.createProjectClusters()
    }
    const generateClusters = this.generateSuperCluster(this.props.stations)
    return this.state.mapProps.bounds ? generateClusters(
      this.state.mapProps
    ) : []
  }

  render() {
    if (this.state.visualizedStation) {
      return (
        <StationVisualizationLayout
          stations={[this.state.visualizedStation]}
          onClose={() => { this.setState({ visualizedStation: null }) }}
          project={this.props.selectedProject}
        />
      )
    }

    if (this.state.combinedStations) {
      return (
        <StationVisualizationLayout
          stations={this.state.combinedStations}
          onClose={() => { this.setState({ combinedStations: null })}}
          project={this.props.selectedProject}
        />
      )
    }

    const clusters = this.getClusters()
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
                onHoverEnter={this.props.selectedProject ? this.onStartHoverProjectCluster: null}
                onHoverExit={this.props.selectedProject ? this.onEndHoverProjectCluster: null}
                text={`${cluster.numPoints}`}
              />
            ))
          }
          { this.state.hoveredProject && this.state.hoveredProject.points.length > 1 ? this.state.hoveredProject.points.map(point => (
            <ProjectPin
              lat={point.latitude}
              lng={point.longitude}
            />
          )): null}
        </GoogleMapReact>
        <MapSideBar />
        <StationListModal
          onCenterStation={this.onCenterStation}
          onClose={this.onCloseClusterModal}
          onVisualizeCombinedStations={this.onVisualizeCombinedStations}
          onVisualizeStation={this.onVisualizeStation}
          stations={this.state.focusedStations ? this.state.focusedStations : []}
          visible={this.state.focusedStations !== null}
        />
        <ProjectDescriptionModal 
          centerMap={this.onCenterProject}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stations: selectFilteredStations(state),
  selectedProject: state.stations.selectedProject,
  geolocation: state.geolocation.geolocation,
})


export default connect(mapStateToProps, {})(StationMap)