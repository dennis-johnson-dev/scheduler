import React from 'react';

export default class EventListForm extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    handleEventChange: React.PropTypes.func.isRequired,
    selected: React.PropTypes.object.isRequired,
    toggleEditMode: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    const type = this.props.selected.type;
    this.refs[type].select();
  }

  render() {
    return (
      <li>
        <div className="event-title">
          <label>Title:</label>
          <input
            name="title"
            ref="title"
            type="text"
            onChange={ (e) => this.props.handleEventChange(e, this.props.event.id) }
            value={ this.props.event.title } />
        </div>
        <div className="event event-duration">
          <label>Duration:</label>
          <input
            name="duration"
            ref="duration"
            type="number"
            onChange={ (e) => this.props.handleEventChange(e, this.props.event.id) }
            value={ this.props.event.duration } />
        </div>
      </li>
    );
  }
}
