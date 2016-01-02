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

  constructor(props, context) {
    super(props, context);
    this.state = {
      editMode: false
    };
  }

  render() {
    return (
      <ul className="event editableForm" onBlur={ () => this.setState({ editMode: false }) }>
        {
          this.props.events.map((event, index) => {
              return (
                <EventListForm
                  deleteItem={ this.props.deleteItem }
                  editMode={ this.state.editMode }
                  event={ event }
                  handleEventChange={ this.props.handleEventChange }
                  index={ index * 2 }
                  key={ event.id }
                  moveItem={ this.props.moveItem }
                  selected={ this.props.selected }
                  toggleEditMode={ this.props.toggleEditMode } />
              );
          })
        }
      </ul>
    );
  }
}
