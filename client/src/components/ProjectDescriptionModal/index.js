import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Modal } from 'antd'

import { closeProjectModal, clearSelectedProject } from '../../ducks/StationDuck/actions'

class ProjectDescriptionModal extends React.Component {

  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    centerMap: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    clearSelectedProject: PropTypes.func.isRequired,
  }

  handleTakeMeThere = () => {
    this.props.closeProjectModal()
    this.props.centerMap()
  }

  render() {
    if (!this.props.project) {
      return null
    }
    return (
      <Modal
        visible={this.props.isVisible}
        onCancel={() => {
          this.props.closeProjectModal()
          this.props.clearSelectedProject()
        }}
        footer={[
          <Button key="takemethere" onClick={this.handleTakeMeThere}>Take Me There</Button>,
        ]}       
        title={this.props.project.name}
        width={'50%'}
      >
        <p>{this.props.project.description}</p>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  isVisible: state.stations.isProjectModalVisible,
  project: state.stations.selectedProject,
})

const mapDispatchToProps = {
  closeProjectModal,
  clearSelectedProject,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDescriptionModal)
