import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import EventListForm from './forms/EventListForm';
import EventListItem from './EventListItem';

@DragDropContext(HTML5Backend)
export default class EventList extends React.Component {
  static propTypes = {
    deleteItem: React.PropTypes.func.isRequired,
    editMode: React.PropTypes.bool.isRequired,
    events: React.PropTypes.array.isRequired,
    handleEventChange: React.PropTypes.func.isRequired,
    moveItem: React.PropTypes.func.isRequired,
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
                  moveItem={ this.props.moveItem }
                  selected={ this.props.selected }
                  toggleEditMode={ this.props.toggleEditMode } />
              );
            } else {
              return (
                <EventListItem
                  deleteItem={ this.props.deleteItem }
                  event={ event }
                  key={ event.id }
                  moveItem={ this.props.moveItem }
                  toggleEditMode={ this.props.toggleEditMode } />
              );
            }
          })
        }
      </ul>
    );
  }
}
