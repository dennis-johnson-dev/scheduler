import React from 'react';

import '../styles/eventListItem.scss';

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
    return (
      <li
        data-id={ this.props.event.id }
        className="editableForm-item"
        onMouseLeave={ (e) => this._mouseOver(e, false) }
        onMouseOver={ (e) => this._mouseOver(e, true) }>

        <div className="event-description">

          <div className="event-title" onClick={ (e) => this.props.toggleEditMode(e, true, 'title') }>
            <strong>Title:</strong> { this.props.event.title }
          </div>
          <div className="event-duration" onClick={ (e) => this.props.toggleEditMode(e, true, 'duration') }>
            <strong>Duration:</strong> { this.props.event.duration }
          </div>
          {
            this._getDateForEvent(this.props.event)
          }
        </div>
        {
          this._getDeleteButton()
        }
      </li>
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
