import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

import FloatingMenuButton from '../FloatingMenuButton'
import MapFilter from '../MapFilter'

const SidebarDiv = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  background-color: white;
  padding: 10px;
  width: 300px;
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
        <MapFilter />
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

export default MapSidebar