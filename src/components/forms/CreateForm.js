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
            placeholder="title"
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
          <select onChange={ (e) => this.props.handleChange("duration", "text", e) }>
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>
        <div className="event event-add">
          <button tabIndex="0" onClick={ (e) => this.props.addEvent(e) }>Add Event</button>
        </div>
      </div>
    );
  }
}
