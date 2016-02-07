import Immutable from 'immutable';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEvent } from '../actions';
import EventsContainer from './EventsContainer';

import '../styles/Viewer.scss';

export class Viewer extends Component {
  componentDidMount() {
    if (!this.props.event) {
      this.props.dispatch(fetchEvent(this.props.params.id));
    }
  }

  render() {
    if (!this.props.event) {
      return null;
    }

    return (
      <div>
        <div className="timeline-container">
          <div className="timeline">
            {
              this._getProgressBars(this.props.progressBars, this.props.currentTime, this.props.remainingDuration)
            }
          </div>
        </div>
        <EventsContainer events={ this.props.event.get('events') } currentTime={ this.props.currentTime }/>
      </div>
    )
  }

  _getProgressBars(progressBars, currentTime, remainingDuration) {
    return null;
    if (!remainingDuration) {
      return;
    }
    const lastBar = progressBars.last();
    if (lastBar.current) {
      const width = Math.round(lastBar.event.get('endTime').diff(currentTime, true) / lastBar.event.get('endTime').diff(lastBar.event.get('startTime'), true) * 100, 1);
      const progressStyle = {
        backgroundColor: progressBars.last().bgColor,
        color: 'white',
        width: `${ width > 95 ? 100 : width }%`
      };

      return <div className="progress-bar" style={ progressStyle }></div>;
    }

    return progressBars.map((progressBar, index) => {
      const newStyle = {
        backgroundColor: progressBar.bgColor,
        width: `${ progressBar.width }%`
      };
      return <div key={ index } className="progress-bar" style={ newStyle }></div>;
    });
  }
}

const mapStateToProps = (state, props) => {
  const { events } = state;
  const eventId = props.params.id;

  // const { currentTime, events, maxDuration, startTime } = state;
  // const currentDiff = currentTime.diff(startTime, 'seconds');
  // const progress = 100 - Math.min(Math.round(currentDiff / maxDuration * 100), 100);
  // const remainingDuration = Math.max(maxDuration - currentTime.diff(startTime, 'seconds'), 0);
  // const createProgressBar = (event, width, current) => {
  //   return {
  //     event,
  //     bgColor: event.get('bgColor'),
  //     current,
  //     width
  //   }
  // };
  //
  // let progressBars = events.map((event) => {
  //   const startTime = event.get('startTime');
  //   const endTime = event.get('endTime');
  //
  //   const sameStart = currentTime.isSame(startTime, 'seconds');
  //   if (currentTime.isBefore(startTime, 'seconds') || sameStart) {
  //     const width = Math.round((endTime.diff(startTime, true) / (remainingDuration * 1000)) * 100, 1);
  //     return createProgressBar(event, width, sameStart);
  //   }
  //
  //   if (currentTime.isBetween(startTime, endTime, 'seconds')) {
  //     const width = Math.round((endTime.diff(currentTime, true) / (remainingDuration * 1000)) * 100, 1);
  //     return createProgressBar(event, width, true);
  //   }
  //
  //   if (currentTime.isAfter(endTime, 'seconds') || currentTime.isSame(endTime, 'seconds')) {
  //     return createProgressBar(event, 0, false);
  //   }
  // });
  //
  // const duration = progressBars.reduce((acc, progressBar) => {
  //   return acc + progressBar.width;
  // }, 0);
  //
  // if (duration !== 100) {
  //   const firstItemIndex = progressBars.findIndex((progressBar) => progressBar.current);
  //   const firstItem = progressBars.get(firstItemIndex);
  //   progressBars = progressBars.set(firstItemIndex, {
  //     ...firstItem,
  //     width: firstItem.width + (100 - duration)
  //   });
  // }

  if (!events.size) {
    return { event: null };
  }

  const currentEvent = events.find((event) => {
    return event.get('id') === eventId;
  });

  return { event: currentEvent };
  // return {
  //   currentTime,
  //   events,
  //   progress,
  //   progressBars,
  //   remainingDuration
  // };
};

export default connect(mapStateToProps)(Viewer);
