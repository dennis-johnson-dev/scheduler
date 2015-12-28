import DatePicker from 'react-datepicker';
import React from 'react';

export default class CreatForm extends React.Component {
  static propTypes = {
    addEvent: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="event-form">
        <div className="event event-title">
          <label>Title:</label>
          <input
            onChange={ (e) => this.props.handleChange("title", "text", e) }
            name="title"
            ref="title"
            type="text"
            value={ this.props.title } />
        </div>
        <div className="event event-duration">
          <label>Duration:</label>
          <input
            onChange={ (e) => this.props.handleChange("duration", "text", e) }
            name="duration"
            placeholder="seconds"
            ref="duration"
            type="number"
            value={ this.props.duration } />
        </div>
        <div className="event event-date">
          <label>On a date:</label>
          <input
            type="checkbox"
            checked={ this.props.hasDate }
            onChange={ (e) => this.props.handleChange("hasDate", "checkbox", e) } />
          {
            this._getDatePicker()
          }
        </div>
        <div className="event event-add">
          <button onClick={ (e) => this.props.addEvent(e) }>Add Event</button>
        </div>
      </div>
    );
  }


  _getDatePicker() {
    const deselected = !this.props.hasDate ? ' deselected' : '';
    const className = `event-date-picker${deselected}`;
    return (
      <div>
        <label>Event Date:</label>
        <DatePicker
          className={ className }
          disabled={ !this.props.hasDate }
          selected={ this.props.date }
          onChange={ (e) => this.props.handleChange("date", "date", e) } />
      </div>
    );
  }
}
