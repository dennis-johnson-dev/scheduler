import Immutable from 'immutable';
import React, { Component } from 'react';

import '../styles/event.scss';

export default class Event extends Component {
  render() {
    const newStyle = {
      backgroundColor: this.props.bgColor,
      opacity: this.props.isCurrentEvent ? 1 : 0.15
    };
    return (
      <div className="event">
        <div className="event-title-holder" style={ newStyle }>
          <div className="event-title-bar event-title-description">{ this.props.title }</div>
          <div className="event-title-bar event-title-duration">
            { this.props.startTime.format() } - { this.props.endTime.format() }
          </div>
        </div>
        <div className="event-name">{ this.props.name }</div>
        <div className="event-company">{ this.props.company }</div>
        <div className="event-imageUrl">{ this.props.imageUrl }</div>
      </div>
    );
  }
}

// Event.propTypes = {
//   title: React.PropTypes.string.isRequired,
//   name: React.PropTypes.string.isRequired,
//   company: React.PropTypes.string.isRequired,
//   imageUrl: React.PropTypes.string.isRequired,
//   startTime: React.PropTypes.string.isRequired,
//   endTime: React.PropTypes.string.isRequired
// };
