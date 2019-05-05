import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from 'antd'

import FloatingMenuButton from '../FloatingMenuButton'
import MapFilter from '../MapFilter'
import ProjectSelect from '../ProjectSelect'
import { clearSelectedProject } from '../../ducks/StationDuck/actions'

const SidebarDiv = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  background-color: white;
  padding: 10px;
  width: 300px;
`

const ClearButtonWrapper = styled.div`
  padding: 20px 10px;
`

class MapSidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.getSidebar = this.getSidebar.bind(this)
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  getSidebar() {
    if (!this.state.sidebarOpen) {
      return null
    }
    return (
      <SidebarDiv>
        <Button
          style={{float:'right'}}
          type="primary"
          shape="circle"
          icon="close"
          onClick={() => this.onSetSidebarOpen(false)}
        />
        <ProjectSelect />
        { this.props.selectedProject ? (
          <ClearButtonWrapper>
            <Button onClick={this.props.clearSelectedProject}>
              Show All Stations
            </Button>
          </ClearButtonWrapper>
        ) : <MapFilter /> }
      </SidebarDiv>
    )
  }

  render() {
    return (
      <div>
        <FloatingMenuButton onClick={() => this.onSetSidebarOpen(true)} />
        {this.getSidebar()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedProject: state.stations.selectedProject,
})

const mapDispatchToProps = {
  clearSelectedProject,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapSidebar)