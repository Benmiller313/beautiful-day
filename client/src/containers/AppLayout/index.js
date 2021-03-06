import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { BeatLoader } from 'react-spinners';
import { BrowserRouter } from 'react-router-dom'


import StationMap from '../../components/StationMap'
import { fetchStations, fetchProjects } from '../../ducks/StationDuck/actions'
import { fetchGeolocation } from '../../ducks/GeolocationDuck/actions'
import { BRAND_BLUE } from '../../constants/style'
import { selectFilteredStations } from '../../ducks/StationDuck/selectors';

const FullScreenSplash = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  background-color:${BRAND_BLUE};
`

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
`

const StyledBeatLoader = styled(BeatLoader)`
  margin: 30px;
`

class UnconnectedAppLayout extends React.Component {

  componentDidMount() {
    this.props.fetchProjects()
    this.props.fetchStations()
    this.props.fetchGeolocation()
  }

  render() {
    if (this.props.stations === null || this.props.geolocation.fetchingGeolocation) {
      return (
        <FullScreenSplash>
          <Title>Beautiful Day</Title>
          <StyledBeatLoader
            sizeUnit={"px"}
            size={15}
            color={'white'}
            loading={true}
          />
          <p>Loading Station Data</p>
        </FullScreenSplash>
      )
    }
    return (
      <StationMap />
    )
  }
}

const mapStateToProps = (state) => ({
  stations: selectFilteredStations(state),
  geolocation: state.geolocation,
})

const mapDispatchToProps = {
  fetchProjects,
  fetchStations,
  fetchGeolocation,
}


export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedAppLayout)