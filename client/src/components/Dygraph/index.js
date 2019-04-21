import React from 'react'
import PropTypes from 'prop-types'
import Dygraph from 'dygraphs'
import 'dygraphs/dist/dygraph.min.css'

class WrapperDygraph extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    labels: PropTypes.arrayOf(PropTypes.string)
  }

  constructor(props) {
    super(props)
    this.graphDiv = React.createRef()
  }

  componentDidMount() {
    new Dygraph(this.refs.chart, this.props.data, {
      labels: this.props.labels,
    })
  }

  render() {
    return (
      <div>
        <div style={{width:'100%'}} ref="chart"></div>
      </div>
    )
  }
}

export default WrapperDygraph