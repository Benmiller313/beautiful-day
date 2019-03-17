import styled from 'styled-components'

import { BRAND_BLUE } from '../../constants/style'

const calculateStationColor = (station) => {
  if (station.daily_record_count === 0) {
    return '#bbb'
  }
  const raw_opacity = station.daily_temp_count / 10000
  return `rgba(26,211,253,${raw_opacity > 1 ? 1 : raw_opacity})`
}

export const Dot = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: ${props => calculateStationColor(props.station)};
`

export const ListAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Checkbox = styled.input`
  margin-top: 10px;
`

export const GroupStationPanel = styled.div`
  border: #a0a0a0 1px solid;
  border-radius: 10px;
`

export const StationCount = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${BRAND_BLUE};
  color: white;
  font-size: 16px;
  text-align: center;
  margin: 10px 3px 10px 10px;
  display: inline-block;
`

export const StationDescriptionText = styled.span`
  margin-right: 10px;
  border-left: 1px solid rgba(0, 0, 0, 0.45);
  padding-left: 5px;
`
export const YearText = styled.span`
  margin: 10px;
  font-size: 12px;
`

export const DonwloadCombinedLink = styled.a`
  margin: 10px;
`