export default {
  beginDrag(props, monitor, component) {
    const { event } = props;
    return {
      id: event.id,
      index: event.index
    };
  }
};
