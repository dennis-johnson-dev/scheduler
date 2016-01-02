import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import '../styles/eventListItem.scss';

export default class EventListItem extends React.Component {
  static propTypes = {
    deleteItem: React.PropTypes.func.isRequired,
    event: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
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
          onFocus={ (e) => {
            this.props.toggleEditMode(e, true, e.target.dataset.type || 'title')
          }}
          onMouseLeave={ (e) => this._mouseOver(e, false) }
          onMouseOver={ (e) => this._mouseOver(e, true) }
          tabIndex={ 0 }>

          <div className="event-description">

            <div
              data-type="title"
              className="event-title"
              onClick={ (e) => this.props.toggleEditMode(e, true, 'title') }
              onFocus={ (e) => this.props.toggleEditMode(e, true, 'title') }
              tabIndex={ this.props.index * 2 + 1 }>
              Title: { this.props.event.title }
            </div>
            <div
              data-type="duration"
              className="event-duration"
              onBlur={ (e) => this.props.toggleEditMode(e, false, 'duration') }
              onClick={ (e) => this.props.toggleEditMode(e, true, 'duration') }
              onFocus={ (e) => this.props.toggleEditMode(e, true, 'duration') }
              tabIndex={ this.props.index * 2 + 2 }>
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
