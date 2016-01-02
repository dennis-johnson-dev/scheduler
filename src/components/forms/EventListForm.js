import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const dragSource = {
  beginDrag(props, monitor, component) {
    const { event } = props;
    return {
      id: event.id,
      index: event.index
    };
  }
};

const dragTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const dragId = monitor.getItem().id;

    const hoverIndex = props.event.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget('event', dragTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('event', dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class EventListForm extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    handleEventChange: React.PropTypes.func.isRequired,
    selected: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    toggleEditMode: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    const type = this.props.selected.type;
    this.refs[type].select();
  }

  render() {
    return this.props.connectDragSource(
      this.props.connectDropTarget(
        <li
          className="event-list-item event-list-form">

          <div className="event-title">
            <label>Title:</label>
            <input
              name="title"
              ref="title"
              tabIndex={ this.props.index * 2 + 1 }
              type="text"
              onChange={ (e) => this.props.handleEventChange(e, this.props.event.id) }
              value={ this.props.event.title } />
          </div>
          <div className="event event-duration">
            <label>Duration:</label>
            <input
              name="duration"
              ref="duration"
              tabIndex={ this.props.index * 2 + 2 }
              type="number"
              onChange={ (e) => this.props.handleEventChange(e, this.props.event.id) }
              value={ this.props.event.duration } />
          </div>
        </li>
      )
    );
  }
}
