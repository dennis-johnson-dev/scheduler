import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import '../styles/eventListItem.scss';

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
export default class EventListItem extends React.Component {
  static propTypes = {
    deleteItem: React.PropTypes.func.isRequired,
    event: React.PropTypes.object.isRequired,
    toggleEditMode: React.PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      hover: false
    };
  }

  render() {
    return this.props.connectDragSource(
      this.props.connectDropTarget(
        <li
          data-id={ this.props.event.id }
          className="event-list-item item"
          onMouseLeave={ (e) => this._mouseOver(e, false) }
          onMouseOver={ (e) => this._mouseOver(e, true) }>

          <div className="event-description">

            <div className="event-title" onClick={ (e) => this.props.toggleEditMode(e, true, 'title') }>
              Title: { this.props.event.title }
            </div>
            <div className="event-duration" onClick={ (e) => this.props.toggleEditMode(e, true, 'duration') }>
              Duration: { this.props.event.duration }
            </div>
            {
              this._getDateForEvent(this.props.event)
            }
          </div>
          {
            this._getDeleteButton()
          }
        </li>
      )
    );
  }

  _getDeleteButton() {
    if (this.state.hover) {
      return <button className="deleteItem" onClick={ (e) => this._deleteItem(e) }>Delete item</button>;
    } else {
      return null;
    }
  }

  _deleteItem(e) {
    this.props.deleteItem(this.props.event.id);
  }

  _mouseOver(e, shouldEnable) {
    if (e.target.className !== 'deleteItem') {
      this.setState({
        hover: shouldEnable
      });
    }
  }

  _getDateForEvent(event) {
    if (event.hasDate) {
      return (
        <div className="event event-date">
          { event.date.format('M/D - h:mm') }
        </div>
      );
    } else {
      return null;
    }
  }
}
