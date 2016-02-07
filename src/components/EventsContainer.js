import Immutable from 'immutable';
import moment from 'moment';
import React, { Component } from 'react';

import Event from './Event';

import '../styles/Viewer.scss';

class EventsContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.events !== nextProps.events
      || !this.props.currentTime.isSame(nextProps.currentTime);
  };

  render() {
    if (!this.props.events) {
      return null;
    }
    
    return (
      <ul className="events">
        { this._getEvents() }
      </ul>
    )
  }

  _getEvents() {
    return this.props.events.map((event) => {
      return (
        <li className="event-holder" key={ event.get('id') }>
          { event.get('title') } { event.get('duration') }
        </li>
      );
    });
    // return this.props.events.map((eventDesc) => {
    //   const eventContainsCurrentTime = (eventDesc, currentTime) => {
    //     const startTime = eventDesc.get('startTime');
    //     const endTime = eventDesc.get('endTime');
    //
    //     return currentTime.isBetween(startTime, endTime, 'seconds')
    //       || currentTime.isSame(startTime, 'seconds')
    //     ;
    //   };
    //
    //   return (
    //     <li className="event-holder" key={ eventDesc.get('id') }>
    //       <Event isCurrentEvent={ eventContainsCurrentTime(eventDesc, this.props.currentTime) } { ...eventDesc.toJS() }/>
    //     </li>
    //   );
    // });
  }
}

EventsContainer.propTypes = {
  events: React.PropTypes.instanceOf(Immutable.List).isRequired
};

export default EventsContainer;
