import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu } from 'antd'

import AllYearsGraph from '../AllYearsGraph'

import {
  StationVisualizationContainer,
  Header,
  Sidebar,
  Content,
} from './StationVisualizationLayout.styles'


class StationVisualizationLayout extends React.Component {  
  static propTypes = {
    station: PropTypes.object.isRequired,
  }

  state = {
    selectedVisualization: 'allYears',
  }

  getSelectedVisualization = () => {
    switch (this.state.selectedVisualization) {
      case 'allYears':
        return (
          <AllYearsGraph 
            stationId={this.props.station.id}
          />
        )
      case 'compareYears':
        return (
          <p>Coming Soon</p>
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
          <h1>{this.props.station.name}</h1>
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