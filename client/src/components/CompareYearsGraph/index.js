import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { BeatLoader } from 'react-spinners';
import { Button, Icon } from 'antd';

import { fetchCombinedGraph } from '../../ducks/StationDuck/actions'
import Dygraph from '../Dygraph'
import { YearToggleContainer, YearText } from './CompareYearsGraph.styles';
import { selectMetric } from '../../ducks/StationDuck/selectors';
import { METRIC_TO_TITLE } from '../../constants/graph';

class CompareYearsGraph extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    stations: PropTypes.string.isRequired,
    fetchCombinedGraph: PropTypes.func.isRequired,
    metric: PropTypes.string.isRequired,
  }

  state = {
    targetYear: null,
    baseYear: null,
  }

  componentDidMount() {
    this.props.fetchCombinedGraph(this.props.stations)
  }

  render() {
    
    if (!this.props.data || !this.props.data[this.props.metric]) {
      return (
        <BeatLoader
          sizeUnit={"px"}
          size={10}
          color={'grey'}
          loading={true}
        />
      )
    }
    const data = this.props.data[this.props.metric]
    const years = Object.keys(data)
    const baseYear = this.state.baseYear ? this.state.baseYear : years[years.length-1]
    const targetYear = this.state.targetYear ? this.state.targetYear : years[years.length-1]
    const maxYear = parseInt(years[years.length-1])
    const minYear = parseInt(years[0])
    console.log('data', data)
    const combinedSeries = data[baseYear].map((baseRow, i) =>{
      const targetData = data[targetYear][i]
      if (targetData) {
        console.log(targetData)
        console.log(i)
        return baseRow.concat(data[targetYear][i].slice(1))
      }
      return baseRow
    })
    
    return (
      <React.Fragment>
        <Dygraph 
          data={combinedSeries}
          labels={[
            "Date",
            ...this.props.stations.map(station => `${station.name} ${baseYear} ${this.props.metric}`),
            ...this.props.stations.map(station => `${station.name} ${targetYear} ${this.props.metric}`),
          ]}
          title={`Daily ${METRIC_TO_TITLE[this.props.metric]}`}
        />
        <YearToggleContainer>
          <YearText>Compare: {baseYear}</YearText>
          <Button.Group>
          <Button
              disabled={parseInt(baseYear) <= minYear}
              onClick={() => {
                const year = parseInt(this.state.baseYear ? this.state.baseYear : years[years.length-1])
                this.setState({baseYear: year-1})
              }}
              type="primary"
            >
              <Icon type="left" />
            </Button>
            <Button
              disabled={parseInt(baseYear) >= maxYear}
              onClick={() => {
                const year = parseInt(this.state.baseYear ? this.state.baseYear : years[years.length-1])
                this.setState({baseYear: year+1})
              }}
              type="primary"
            >
              <Icon type="right" />
            </Button>
          </Button.Group>  
        </YearToggleContainer>
        <YearToggleContainer>
          <YearText>To: {targetYear}</YearText>
          <Button.Group>
            <Button 
              disabled={parseInt(targetYear) <= minYear}
              onClick={() => {
                const year = parseInt(this.state.targetYear ? this.state.targetYear : years[years.length-1])
                this.setState({targetYear: year-1})
              }}
              type="primary"
            >
              <Icon type="left" />
            </Button>
            <Button 
              disabled={parseInt(targetYear) >= maxYear}
              onClick={() => {
                const year = parseInt(this.state.targetYear ? this.state.targetYear : years[years.length-1])
                this.setState({targetYear: year+1})
              }}
              type="primary"
            >
              <Icon type="right" />
            </Button>
          </Button.Group>
        </YearToggleContainer>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: state.stations.yearGraphData[ownProps.stations.map(station => station.id).join('_')],
  metric: selectMetric(state),
})

const mapDispatchToProps = {
  fetchCombinedGraph: fetchCombinedGraph
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompareYearsGraph)