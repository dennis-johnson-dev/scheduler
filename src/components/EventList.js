import React from 'react';

export default class EventList extends React.Component {
  static propTypes = {
    events: React.PropTypes.array.isRequired
  }

  render() {
    return (
      <ul>
        {
          this.props.events.map((event, index) => {
            return (
              <li key={ event.id }>
                <div className="event event-title">
                  { event.title }
                </div>
                <div className="event event-duration">
                  { event.duration }
                </div>
                {
                  this._getDateForEvent(event)
                }
              </li>
            );
          })
        }
      </ul>
    );
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
