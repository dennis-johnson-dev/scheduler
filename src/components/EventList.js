import React from 'react';

import EventListForm from './forms/EventListForm';
import EventListItem from './EventListItem';

export default class EventList extends React.Component {
  static propTypes = {
    deleteItem: React.PropTypes.func.isRequired,
    editMode: React.PropTypes.bool.isRequired,
    events: React.PropTypes.array.isRequired,
    handleEventChange: React.PropTypes.func.isRequired,
    selected: React.PropTypes.object.isRequired,
    toggleEditMode: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <ul className="event editableForm">
        {
          this.props.events.map((event, index) => {
            if (this.props.editMode && this.props.selected.id === event.id) {
              return (
                <EventListForm
                  event={ event }
                  handleEventChange={ this.props.handleEventChange }
                  key={ event.id }
                  selected={ this.props.selected }
                  toggleEditMode={ this.props.toggleEditMode } />
              );
            } else {
              return (
                <EventListItem
                  deleteItem={ this.props.deleteItem }
                  event={ event }
                  key={ event.id }
                  toggleEditMode={ this.props.toggleEditMode } />
              );
            }
          })
        }
      </ul>
    );
  }
}
