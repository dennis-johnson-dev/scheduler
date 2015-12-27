import React from 'react';

export default class CreateEvent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      events: [
        {
          duration: 10,
          title: 'yo'
        },
        {
          duration: 10,
          title: 'hey'
        }
      ],
      showForm: false
    };
  }

  render() {
    return (
      <div>
        <div className="add-event-form">
          <form onSubmit={ this._onSubmit.bind(this) }>
            <input
              className=""
              type="submit"
              value="Submit" />
            <button onClick={ this._showForm.bind(this) }>+</button>
          </form>
          { this._getAddForm() }
        </div>
        <ul>
          {
            this.state.events.map((event, index) => {
              return <li key={ index }>{ event.title }, { event.duration }</li>;
            })
          }
        </ul>
      </div>
    );
  }

  _getAddForm() {
    if (this.state.showForm) {
      return (
        <div>
          <label>Title:</label>
          <input type="text" ref="title" name="title" />
          <input type="number" ref="duration" name="duration" placeholder="seconds"/>
          <button onClick={ this._addEvent.bind(this) }>Add Event</button>
        </div>
      );
    }
  }

  _addEvent(e) {
    e.preventDefault();
    if (this.refs.title.value) {
      this.state.events.push({
        duration: this.refs.duration.value,
        title: this.refs.title.value
      });

      this.setState({
        events: this.state.events,
        showForm: !this.state.showForm
      });
    }
  }

  _showForm(e) {
    e.preventDefault();
    this.setState({
      showForm: !this.state.showForm
    });
  }

  _onSubmit(e) {
    e.preventDefault();
  }
}
