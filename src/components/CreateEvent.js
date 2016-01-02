import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import uuid from 'uuid';

import AddNewForm from './forms/AddNewForm';
import EventList from './EventList';

import '../styles/event.scss';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateEvent extends React.Component {
  initialEventState = {
    duration: '',
    date: moment(),
    hasDate: false,
    title: ''
  }

  initialState = {
    events: [],
    editMode: false,
    selected: {
      id: '',
      type: ''
    }
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.initialState,
      ...this.initialEventState
    };

    this.typeValueMap = {
      checkbox: e => e.target.checked,
      date: e => e,
      number: e => e.target.value,
      text: e => e.target.value
    };

    this._onSubmit = this._onSubmit.bind(this);
    this._addEvent = this._addEvent.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._moveItem = this._moveItem.bind(this);
    this._toggleEditMode = this._toggleEditMode.bind(this);
  }

  render() {
    return (
      <div className="create-event">
        <div className="add-event-form" onClick={ (e) => this._toggleEditMode(e, false) } >
          <form onSubmit={ this._onSubmit }>
            <input
              className=""
              type="submit"
              value="Submit" />
            <div>
              <p>Add project specific information</p>
              <div className="event event-date">
                <label>On a date:</label>
                <input
                  type="checkbox"
                  checked={ this.state.hasDate }
                  onChange={ (e) => this._handleChange("hasDate", "checkbox", e) } />
                {
                  this._getDatePicker()
                }
              </div>
            </div>
            <AddNewForm
              addEvent={ this._addEvent }
              date={ this.state.date }
              duration={ this.state.duration }
              handleChange={ this._handleChange }
              hasDate={ this.state.hasDate }
              title={ this.state.title } />
          </form>
        </div>
        <EventList
          deleteItem={ this._deleteItem }
          editMode={ this.state.editMode }
          handleEventChange={ this._handleEventChange }
          moveItem={ this._moveItem }
          toggleEditMode={ this._toggleEditMode }
          events={ this.state.events }
          selected={ this.state.selected } />
      </div>
    );
  }

  _moveItem(dragIndex, hoverIndex) {
    const dragEvent = this.state.events[dragIndex];
    this.state.events[dragIndex] = this.state.events[hoverIndex];
    this.state.events[dragIndex].index = dragIndex;

    this.state.events[hoverIndex] = dragEvent;
    this.state.events[hoverIndex].index = hoverIndex;

    this.setState({
      events: this.state.events
    });
  }

  _getDatePicker() {
    const deselected = !this.state.hasDate ? ' deselected' : '';
    const className = `event-date-picker${deselected}`;
    return (
      <div>
        <label>Event Date:</label>
        <DatePicker
          className={ className }
          disabled={ !this.state.hasDate }
          selected={ this.state.date }
          onChange={ (e) => this._handleChange("date", "date", e) } />
      </div>
    );
  }

  _deleteItem(id) {
    const index = this.state.events.findIndex((event) => {
      return event.id === id;
    });

    this.state.events.splice(index, 1);

    const events = this.state.events.map((event, index) => {
      return event.index = index, event;
    });

    this.setState({
      events
    });
  }

  _toggleEditMode(e, shouldEnable, type) {
    let id = this.state.selected;
    if (shouldEnable) {
      id = this._getEventId(e.target);
    }

    this.setState({
      editMode: shouldEnable,
      selected: {
        type: type || '',
        id
      }
    });
  }

  _getEventId(node) {
    if (node.dataset.id) {
      return node.dataset.id;
    } else {
      return this._getEventId(node.parentElement);
    }
  }

  _handleEventChange(e, id) {
    const eventIndex = this.state.events.findIndex((event) => event.id === id);
    const property = e.target.name;
    const type = e.target.type;
    this.state.events[eventIndex][property] = this._getValue(type, e);

    this.setState({
      events: this.state.events
    });
  }

  _handleChange(stateKey, type, val) {
    const value = this._getValue(type, val);

    this.setState({
      [stateKey]: value
    });
  }

  _getValue(type, val) {
    if (!this.typeValueMap[type]) {
      throw new Error(
        `Missing \"${type}\" type of input, please enter a valueMapper function in the constructor for type \"${type}\"`
      );
    }

    return this.typeValueMap[type](val);
  }

  _addEvent(e) {
    e.preventDefault();
    this.state.events.push({
      duration: this.state.duration,
      id: uuid.v4(),
      index: this.state.events.length,
      title: this.state.title
    });

    this.setState({
      duration: this.initialEventState.duration,
      title: this.initialEventState.title,
      events: this.state.events
    });
  }

  _onSubmit(e) {
    e.preventDefault();
    console.log('you have submitted');
    console.log(this.state.events);
  }
}
