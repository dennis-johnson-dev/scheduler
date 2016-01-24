import DatePicker from 'react-datepicker';
import React from 'react';

import AddNewForm from './AddNewForm';

export default class AddEventForm extends React.Component {
  render() {
    return (
      <div className="add-event-form">
        <form onSubmit={ this.props.submit }>
        <input
          className=""
          type="submit"
          value="Submit" />
        <div>
          <p>Add project specific information</p>
          <div className="event-title">
            <label>Event Title</label>
            <input type="text" onChange={ (e) => this.props.handleChange("event", "title", "text", e) } value={ this.props.event.title } />
          </div>
          <div className="event event-date">
            <label>On a date:</label>
            <input
            type="checkbox"
            checked={ this.props.event.hasDate }
            onChange={ (e) => this.props.handleChange("event", "hasDate", "checkbox", e) } />
            {
              this._getDatePicker()
            }
          </div>
        </div>
        <AddNewForm
          addEvent={ this.props.addEvent }
          duration={ this.props.addNew.duration }
          handleChange={ this.props.handleChange }
          title={ this.props.addNew.title } />
        </form>
      </div>
    );
  }

  _getDatePicker() {
    const deselected = !this.props.event.hasDate ? ' deselected' : '';
    const className = `event-date-picker${deselected}`;
    return (
      <div>
        <label>Event Date:</label>
        <DatePicker
          className={ className }
          disabled={ !this.props.event.hasDate }
          selected={ this.props.event.date }
          onChange={ (e) => this.props.handleChange("event", "date", "date", e) } />
      </div>
    );
  }
};
