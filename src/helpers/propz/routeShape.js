import PropTypes from 'prop-types';

const routeShape = PropTypes.shape({
  cmd: PropTypes.string.isRequired,
  flightName: PropTypes.string.isRequired,
  latLong: PropTypes.number.isRequired,
  locationId: PropTypes.string.isRequired,
  orientation: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
});

export default {
  routeShape,
};
