import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { BeatLoader } from 'react-spinners';
import { Button, Icon } from 'antd';

import { fetchCombinedGraph } from '../../ducks/StationDuck/actions'
import Dygraph from '../Dygraph'
import { YearToggleContainer, YearText } from './CompareYearsGraph.styles';

class CompareYearsGraph extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    stations: PropTypes.string.isRequired,
    fetchCombinedGraph: PropTypes.func.isRequired,
  }

  state = {
    targetYear: null,
    baseYear: null,
  }

  componentDidMount() {
    this.props.fetchCombinedGraph(this.props.stations)
  }

  render() {
    
    if (!this.props.data) {
      return (
        <BeatLoader
          sizeUnit={"px"}
          size={10}
          color={'grey'}
          loading={true}
        />
      )
    }
    const years = Object.keys(this.props.data)
    const baseYear = this.state.baseYear ? this.state.baseYear : years[years.length-1]
    const targetYear = this.state.targetYear ? this.state.targetYear : years[years.length-1]
    const maxYear = parseInt(years[years.length-1])
    const minYear = parseInt(years[0])
    const combinedSeries = this.props.data[baseYear].map((baseRow, i) =>{
      const targetData = this.props.data[targetYear][i]
      if (targetData) {
        return baseRow.concat(this.props.data[targetYear][i].slice(1))
      }
      return baseRow
    })
    
    return (
      <React.Fragment>
        <Dygraph 
          data={combinedSeries}
          labels={[
            "Date",
            ...this.props.stations.map(station => `${station.name} ${baseYear} Max`),
            ...this.props.stations.map(station => `${station.name} ${targetYear} Max`),
          ]}
          title='Daily Maximum Temperate'
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
})

const mapDispatchToProps = {
  fetchCombinedGraph: fetchCombinedGraph
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompareYearsGraph)