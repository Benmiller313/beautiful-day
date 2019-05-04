import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Divider, Menu } from 'antd'

import { setSelectedProject } from '../../ducks/StationDuck/actions'

class ProjectSelect extends React.Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    setSelectedProject: PropTypes.func.isRequired,
  }

  setSelectedProject = (e) => {
    this.props.setSelectedProject(this.props.projects.find(project => project.id.toString() === e.key))
  }

  render() {
    return (
      <div>
        <Divider orientation='left'>Climate Spotlights</Divider>
        <Menu
            onClick={this.setSelectedProject}
          >
            {this.props.projects.map(project => (
              <Menu.Item key={project.id}>
                <span>{project.name}</span>
              </Menu.Item>
            ))}
          </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  projects: state.stations.projects,
})

const mapDispatchToProps = {
  setSelectedProject, 
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelect)