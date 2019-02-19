import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, List } from 'antd'
import moment from 'moment'

const StationDescriptionText = styled.span`
  margin-right: 10px;
  border-left: 1px solid rgba(0, 0, 0, 0.45);
  padding-left: 5px;
`
const YearText = styled.span`
  margin: 10px;
  font-size: 12px;
`
const calculateStationColor = (station) => {
  if (station.daily_record_count === 0){
    return '#bbbbbbb9'
  }
  const raw_opacity = station.daily_temp_count / 10000
  return `rgb(26,211,253,${raw_opacity > 1 ? 1 : raw_opacity})`
}


const Dot = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: ${props => calculateStationColor(props.station)};
`

class StationList extends React.Component {
  static PropTypes = {
    onSeeMore: PropTypes.func.isRequired,
    onVisualizeStation: PropTypes.func.isRequired,
    page: PropTypes.number,
    stations: PropTypes.array.isRequired,
  }

  static defaultProps = {
    page: 1,
  }


  render() {
    const seeMoreButton = this.props.page * 30 < this.props.stations.length ? (
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
      }}
      >
        <Button onClick={this.props.onSeeMore}>see more</Button>
      </div>
    ) : null

    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.stations.slice(0,this.props.page * 30)}
        loadMore={seeMoreButton}
        renderItem={station => (
          <List.Item actions={[
            <a 
              key={'viz'}
              onClick={() => this.props.onVisualizeStation(station.id)}
            >
              visualize
            </a>,
            <a 
              key={'down'}
              href={`/weather/stations/${station.id}/aggregated`}  
            >
              download
            </a>
          ]}>
            <List.Item.Meta
              avatar={<Dot station={station}/>}
              title={(
                <React.Fragment>
                  <a>{station.name}</a>
                  <YearText>
                    {moment(station.data_start).year()}-{moment(station.data_end).year()}
                  </YearText>
                </React.Fragment>
              )}
              description={(
                <React.Fragment>
                  <StationDescriptionText>Total Daily Records: {station.daily_record_count}</StationDescriptionText>
                  <StationDescriptionText>Daily Temp Records: {station.daily_temp_count}</StationDescriptionText>
                  <StationDescriptionText>Daily Percip Records: {station.daily_percip_count}</StationDescriptionText>
                </React.Fragment>
              )}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default StationList