import React from 'react'
import PropTypes from 'prop-types'
import { Button, List } from 'antd'
import moment from 'moment'

import {
  Checkbox,
  Dot,
  DonwloadCombinedLink,
  GroupStationPanel,
  ListAvatarContainer,
  StationCount,
  StationDescriptionText,
  YearText,
} from './StationList.styles'

class StationList extends React.Component {
  static propTypes = {
    onCenterStation: PropTypes.func.isRequired,
    onSeeMore: PropTypes.func.isRequired,
    onVisualizeStation: PropTypes.func.isRequired,
    page: PropTypes.number,
    stations: PropTypes.array.isRequired,
  }

  static defaultProps = {
    page: 1,
  }

  state = {
    checkedStations: {}
  }

  getGroupStationPanel = () => {
    const checkedStations = this.state.checkedStations
    if (Object.values(checkedStations).some(value => value)) {
      return (
        <GroupStationPanel>
          <StationCount>{Object.values(checkedStations).filter(value => value).length}</StationCount>
          <span>Stations Selected.</span>
          <DonwloadCombinedLink
            href={`/weather/stations/aggregatecombined?station_ids=${Object.keys(checkedStations)
              .filter(function (k) { return checkedStations[k] })
              .join(',')
              }`}
          >
            download combined data
          </DonwloadCombinedLink>
        </GroupStationPanel>
      )
    } else {
      return null
    }
  }

  handleCheckedStation = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState({
      checkedStations: {
        ...this.state.checkedStations,
        [item]: isChecked,
      }
    })
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
      <React.Fragment>
        {this.getGroupStationPanel()}
        <List
          itemLayout="horizontal"
          dataSource={this.props.stations.slice(0, this.props.page * 30)}
          loadMore={seeMoreButton}
          renderItem={station => (
            <List.Item actions={[
              <a
                onClick={() => this.props.onCenterStation(station)}
              >
                center on map
              </a>,
              <a
                key={'viz'}
                onClick={() => this.props.onVisualizeStation(station)}
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
                avatar={
                  <ListAvatarContainer>
                    <Dot station={station} />
                    <Checkbox type='checkbox' onChange={this.handleCheckedStation} name={station.id} />
                  </ListAvatarContainer>
                }
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
      </React.Fragment>
    )
  }
}

export default StationList