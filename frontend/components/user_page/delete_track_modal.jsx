var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Button = require("react-bootstrap").Button;
var TrackModalsStore = require("../../stores/track_modals_store");
var TrackActions = require("../../actions/track_actions");
var History = require("react-router").History;

var DeleteTrackModal = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { show: TrackModalsStore.showDeleteModal() };
  },

  componentDidMount: function () {
    this.listenerToken = TrackModalsStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    var track = nextProps.track;

    if (!track) { return; }

    this.username = nextProps.track.user.username;
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ show: TrackModalsStore.showDeleteModal() });
  },

  close: function () {
    TrackActions.closeDeleteModal();
  },

  delete: function () {
    TrackActions.deleteTrack(this.props.track.id);
  },

  render: function () {
    return (
      <Modal bsSize="small" onHide={ this.close } show={ this.state.show }>
        <Modal.Header closeButton>
          <Modal.Title>Delete Track</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to permanently delete this track?</p>

          <p>There's no undoing this delete!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.close }>Cancel</Button>

          <Button bsStyle="primary" onClick={ this.delete }>
            Delete Track
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = DeleteTrackModal;
