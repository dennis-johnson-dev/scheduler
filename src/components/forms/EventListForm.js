import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import dragTarget from '../DnD/dragTarget';
import dragSource from '../DnD/dragSource';

@DropTarget('event', dragTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('event', dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class EventListForm extends React.Component {
  static propTypes = {
    deleteItem: React.PropTypes.func.isRequired,
    event: React.PropTypes.object.isRequired,
    handleEventChange: React.PropTypes.func.isRequired,
    selected: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    toggleEditMode: React.PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      editMode: false
    };

    this._handleClickOnListItem = this._handleClickOnListItem.bind(this);
    this._toggleEditMode = this._toggleEditMode.bind(this);
  }

  _getField(isEditMode, type) {
    const offset = this.props.index * 2;

    if (true) {
      if (type === 'duration') {

      }
    }

    return (
      <span
        onClick={ (e) => this._toggleEditMode(e, true, type) }
        onFocus={ (e) => this._toggleEditMode(e, true, type) }
        tabIndex={ offset + 5 }
        >
          { this.props.event[type] }
      </span>
    );
  }

  render() {
    return this.props.connectDragSource(
      this.props.connectDropTarget(
        <li
          className="event-list-item event-list-form"
          data-id={ this.props.event.id }
          onBlur={ (e) => this._toggleEditMode(e, false) }
          onClick={ (e) => this._toggleEditMode(e, false) }
          >

          <div
            className="event-title"
            data-type="title">
            <label>Title:</label>
            {
              this._getTitleField(this.props.index)
            }
          </div>
          <div
            className="event event-duration"
            data-type="duration">
            <label>Duration:</label>
            {
              this._getDurationField(this.props.index)
            }
          </div>

        </li>
      )
    );
  }

  _getTitleField(index) {
    return (
      <input
      name="title"
      ref="title"
      tabIndex={ index * 2 + 5 }
      type="text"
      onBlur={(e) => {
        e.stopPropagation();
      }}
      onFocus={ (e) => this._toggleEditMode(e, true, 'title') }
      onClick={ (e) => this._toggleEditMode(e, true, 'title') }
      onChange={ (e) => this.props.handleEventChange(e, this.props.event.id) }
      value={ this.props.event.title } />
    );
  }

  _getDurationField(index) {
    return (
      <input
      name="duration"
      ref="duration"
      tabIndex={ index * 2 + 6 }
      type="number"
      onBlur={(e) => {
        e.stopPropagation();
      }}
      onFocus={ (e) => this._toggleEditMode(e, true, 'duration') }
      onClick={ (e) => this._toggleEditMode(e, true, 'duration') }
      onChange={ (e) => this.props.handleEventChange(e, this.props.event.id) }
      value={ this.props.event.duration } />
    );
  }

  _handleClickOnListItem(e) {
    this._toggleEditMode(e, true, 'title');
  }

  _focusItem(ref) {
    if (this.refs[ref]) {
      this.refs[ref].select();
    }
  }

  _toggleEditMode(e, toggle, type) {
    this.setState({
      editMode: toggle,
      selected: type
    }, () => {
      this._focusItem(type);
    });
  }
}
