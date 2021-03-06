import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu, Radio } from 'antd'
import { connect } from 'react-redux'

import CombinedAllYearsGraph from '../CombinedAllYearsGraph'
import {
  StationVisualizationContainer,
  Header,
  Sidebar,
  Content,
  MetricSelect,
} from './StationVisualizationLayout.styles'
import { setMetric } from '../../ducks/StationDuck/actions'
import CompareYearsGraph from '../CompareYearsGraph';
import { selectMetric } from '../../ducks/StationDuck/selectors';


class StationVisualizationLayout extends React.Component {  
  static propTypes = {
    setMetric: PropTypes.func.isRequired,
    stations: PropTypes.array.isRequired,
    project: PropTypes.object,
  }
  
  static defaultProps = {
    project: null,
  }

  state = {
    selectedVisualization: 'allYears',
  }

  getSelectedVisualization = () => {
    switch (this.state.selectedVisualization) {
      case 'allYears':
        return <CombinedAllYearsGraph
              stations={this.props.stations}
              project={this.props.project}
              />
      case 'compareYears':
        return (
          <CompareYearsGraph
            stations={this.props.stations}
          />
        )
      default:
        return null
    }
  }

  setSelectedVisualization = ({key}) => {
    this.setState({selectedVisualization: key})
  }
  
  onMetricChange = (e) => {
    this.props.setMetric(e.target.value, this.props.stations)
  }

  render() {
    return (
      <StationVisualizationContainer>
        <Header>
          <h1>{this.props.stations[0].name}{this.props.stations.length > 1 ? ` And ${this.props.stations.length - 1} More`: ''}</h1>
          <Button
            style={{float:'right'}}
            type="primary"
            shape="circle"
            icon="close"
            onClick={this.props.onClose}
          />
        </Header>
        <Sidebar>
          <Menu
            defaultSelectedKeys={['allYears']}
            onClick={this.setSelectedVisualization}
          >
            <Menu.Item key='allYears'>
              <span>All Years</span>
            </Menu.Item>
            <Menu.Item key='compareYears'>
              <span>Compare Year</span>
            </Menu.Item>
          </Menu>
        </Sidebar>
        <Content>
          {this.getSelectedVisualization()}
          <MetricSelect>
            <Radio.Group defaultValue={this.props.metric} onChange={this.onMetricChange}>
              <Radio value={'max'}>Maximum Temperature</Radio>
              <Radio value={'min'}>Minimum Temperature</Radio>
              <Radio value={'mean'}>Average Temperature</Radio>
            </Radio.Group>
          </MetricSelect>
        </Content>

      </StationVisualizationContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  metric: selectMetric(state)
})

const mapDispatchToProps = {
  setMetric: setMetric,
}

export default connect(mapStateToProps, mapDispatchToProps)(StationVisualizationLayout)