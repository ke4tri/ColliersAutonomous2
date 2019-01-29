import PropTypes from 'prop-types';

const locationShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export default {
  locationShape,
};
