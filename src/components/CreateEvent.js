import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';
import moment from 'moment';
import React from 'react';
import uuid from 'uuid';

import { addNewEvent } from '../actions';
import AddEventForm from './forms/AddEventForm';
import EventList from './EventList';

import '../styles/event.scss';
import 'react-datepicker/dist/react-datepicker.css';

export class CreateEvent extends React.Component {
  initialEventState = {
    addNew: {
      duration: '',
      title: ''
    }
  }

  initialState = {
    event: {
      date: moment(),
      events: [],
      hasDate: false,
      id: uuid.v4(),
      title: ''
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
  }

  render() {
    return (
      <div className="create-event">
        <AddEventForm
          addEvent={ this._addEvent }
          addNew={ this.state.addNew }
          event={ this.state.event }
          hasDate={ this.state.event.hasDate }
          handleChange={ this._handleChange }
          submit={ this._onSubmit } />
        <EventList
          deleteItem={ this._deleteItem }
          handleEventChange={ this._handleEventChange }
          moveItem={ this._moveItem }
          events={ this.state.event.events }
          selected={ this.state.selected } />
      </div>
    );
  }

  _moveItem(dragIndex, hoverIndex) {
    const dragEvent = this.state.event.events[dragIndex];
    this.state.event.events[dragIndex] = this.state.event.events[hoverIndex];
    this.state.event.events[dragIndex].index = dragIndex;

    this.state.event.events[hoverIndex] = dragEvent;
    this.state.event.events[hoverIndex].index = hoverIndex;

    this.setState({
      events: this.state.event
    });
  }

  _deleteItem(id) {
    const index = this.state.event.events.findIndex((event) => {
      return event.id === id;
    });

    this.state.event.events.splice(index, 1);

    const events = this.state.event.events.map((event, index) => {
      return event.index = index, event;
    });

    this.setState({
      events
    });
  }

  _handleEventChange(e, id) {
    const eventIndex = this.state.event.events.findIndex((event) => event.id === id);
    const property = e.target.name;
    const type = e.target.type;
    this.state.event.events[eventIndex][property] = this._getValue(type, e);

    this.setState({
      event: this.state.event
    });
  }

  _handleChange(stateKey, nestedStateKey, type, val) {
    const value = this._getValue(type, val);

    this.setState({
      [stateKey]: {
        ...this.state[stateKey],
        ...{ [nestedStateKey]: value }
      }
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
    this.state.event.events.push({
      duration: this.state.addNew.duration,
      id: uuid.v4(),
      index: this.state.event.events.length,
      title: this.state.addNew.title
    });

    this.setState({
      addNew: {
        ...this.state.addNew,
        ...this.initialEventState.addNew
      }
    });
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(addNewEvent(this.state.event));
    this.props.dispatch(routeActions.push('/'));
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(CreateEvent);
