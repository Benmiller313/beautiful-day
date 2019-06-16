import React from 'react'
import PropTypes from 'prop-types'
import Dygraph from 'dygraphs'
import 'dygraphs/dist/dygraph.min.css'

class WrapperDygraph extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    labels: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    trend_line_high: PropTypes.number,
    trend_line_low: PropTypes.number,
  }
  static defaultProps = {
    title: '',
    trend_line_high: null,
    trend_line_low: null,
  }

  constructor(props) {
    super(props)
    this.graphDiv = React.createRef()
  }

  drawLines = (canvas, area, graph) => {
    if (!graph) {
      return
    }
    canvas.save();
    if (this.props.trend_line_high) {
      const highPointStart = graph.toDomCoords(this.props.data[0][0], this.props.trend_line_high)
      const highPointEnd = graph.toDomCoords(this.props.data[this.props.data.length-1][0], this.props.trend_line_high)
      canvas.strokeStyle = 'rgb(255,0,0)'
      canvas.lineWidth = 1.0
      canvas.beginPath();
      canvas.moveTo(highPointStart[0], highPointStart[1]);
      canvas.lineTo(highPointEnd[0], highPointEnd[1]);
      canvas.closePath();
      canvas.stroke();
    }
    if (this.props.trend_line_low) {
      const lowPointStart = graph.toDomCoords(this.props.data[0][0], this.props.trend_line_low)
      const lowPointEnd = graph.toDomCoords(this.props.data[this.props.data.length-1][0], this.props.trend_line_low)
      canvas.strokeStyle = 'rgb(0,0,255)'
      canvas.lineWidth = 1.0
      canvas.beginPath();
      canvas.moveTo(lowPointStart[0], lowPointStart[1]);
      canvas.lineTo(lowPointEnd[0], lowPointEnd[1]);
      canvas.closePath();
      canvas.stroke();  
    }
    canvas.restore();
  }

  componentDidMount() {
    console.log('title', this.props.title)
    new Dygraph(this.refs.chart, this.props.data, {
      labels: this.props.labels,
      title: this.props.title,
      underlayCallback: this.drawLines,
    })
  }
  componentDidUpdate() {
    console.log('title', this.props.title)
    new Dygraph(this.refs.chart, this.props.data, {
      labels: this.props.labels,
      title: this.props.title,
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