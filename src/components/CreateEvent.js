import moment from 'moment';
import React from 'react';
import uuid from 'uuid';

import CreateForm from './forms/CreateForm';
import EventList from './EventList';

import '../styles/event.scss';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateEvent extends React.Component {
  initialEventState = {
    duration: 12,
    date: moment(),
    hasDate: false,
    title: 'hai'
  }

  initialState = {
    events: []
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.initialState,
      ...this.initialEventState
    };

    this.typeValueMap = {
      date: e => e,
      checkbox: e => e.target.checked,
      text: e => e.target.value
    };

    this._onSubmit = this._onSubmit.bind(this);
    this._addEvent = this._addEvent.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    return (
      <div className="create-event">
        <div className="add-event-form">
          <form onSubmit={ this._onSubmit }>
            <input
              className=""
              type="submit"
              value="Submit" />
            <CreateForm
              addEvent={ this._addEvent }
              date={ this.state.date }
              duration={ this.state.duration }
              handleChange={ this._handleChange }
              hasDate={ this.state.hasDate }
              title={ this.state.title } />
          </form>
        </div>
        <EventList events={ this.state.events } />
      </div>
    );
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
      date: this.state.hasDate ? this.state.date : null,
      duration: this.state.duration,
      hasDate: this.state.hasDate,
      title: this.state.title,
      id: uuid.v4()
    });

    this.setState({
      ...this.initialEventState,
      events: this.state.events
    });
  }

  _onSubmit(e) {
    e.preventDefault();
    console.log('you have submitted');
  }
}
