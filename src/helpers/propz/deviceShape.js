import PropTypes from 'prop-types';

const deviceShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  faaSerial: PropTypes.string.isRequired,
  manufacture: PropTypes.string.isRequired,
});

export default {
  deviceShape,
};
