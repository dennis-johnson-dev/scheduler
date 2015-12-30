import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const dragSource = {
  beginDrag(props, monitor, component) {
    console.log('draggin')
    const { id, index } = props;
    return {
      id,
      index
    };
  }
};

@DragSource('event', dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class EventListForm extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    handleEventChange: React.PropTypes.func.isRequired,
    selected: React.PropTypes.object.isRequired,
    toggleEditMode: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    const type = this.props.selected.type;
    this.refs[type].select();
  }

  render() {
    return this.props.connectDragSource(
      <li>
        <div className="event-title">
          <label>Title:</label>
          <input
            name="title"
            ref="title"
            type="text"
            onChange={ (e) => this.props.handleEventChange(e, this.props.event.id) }
            value={ this.props.event.title } />
        </div>
        <div className="event event-duration">
          <label>Duration:</label>
          <input
            name="duration"
            ref="duration"
            type="number"
            onChange={ (e) => this.props.handleEventChange(e, this.props.event.id) }
            value={ this.props.event.duration } />
        </div>
      </li>
    );
  }
}
