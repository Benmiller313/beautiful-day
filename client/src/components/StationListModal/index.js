import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'antd'
import StationList from '../StationList';

class StationListModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onVisualizeStation: PropTypes.func.isRequired,
    stations: PropTypes.array,
    visible: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    stations: [],
  }

  state = {
    page: 1,
  }

  onSeeMore = () => {
    this.setState({ page: this.state.page + 1 })
  }
  
  onClose = (e) => {
    this.setState({ page: 1 })
    this.props.onClose(e)
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.onClose}
        footer={null}
        title={'Stations'}
        width={'80%'}
      >
        <StationList 
          onSeeMore={this.onSeeMore}
          onVisualizeStation={this.props.onVisualizeStation}
          page={this.state.page}
          stations={this.props.stations}
        />
      </Modal>
    )
  }
}

export default StationListModal
