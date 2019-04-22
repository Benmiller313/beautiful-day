import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu } from 'antd'

import CombinedAllYearsGraph from '../CombinedAllYearsGraph'
import {
  StationVisualizationContainer,
  Header,
  Sidebar,
  Content,
} from './StationVisualizationLayout.styles'
import CompareYearsGraph from '../CompareYearsGraph';


class StationVisualizationLayout extends React.Component {  
  static propTypes = {
    stations: PropTypes.array.isRequired,
  }

  state = {
    selectedVisualization: 'allYears',
  }

  getSelectedVisualization = () => {
    switch (this.state.selectedVisualization) {
      case 'allYears':
        return <CombinedAllYearsGraph
              stations={this.props.stations}
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
        </Content>

      </StationVisualizationContainer>
    )
  }
}

export default StationVisualizationLayout