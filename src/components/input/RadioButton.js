import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';

/**
 * Creates a single radio button. Use the `checked` prop in your callbacks.
 */
class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: props.checked};
  }

  componentWillReceiveProps(newProps) {
    this.setState({checked: newProps.checked});
  }

  render() {
    const {checked} = this.state;

    return (
      <input
        type="radio"
        checked={checked}
        {...omit(['checked', 'setProps', 'loading_state'], this.props)}
        onClick={() => {
          if (this.props.setProps) {
            this.props.setProps({
              checked: !checked
            });
          } else {
            this.setState({checked: !checked});
          }
        }}
        data-dash-is-loading={
          (this.props.loading_state && this.props.loading_state.is_loading) ||
          undefined
        }
      />
    );
  }
}

RadioButton.propTypes = {
  /**
   * The ID of this component, used to identify dash components in callbacks.
   * The ID needs to be unique across all of the components in an app.
   */
  id: PropTypes.string,

  /**
   * Whether RadioButton has been checked or not
   */
  checked: PropTypes.bool,

  /**
   * The class of the container (div)
   */
  className: PropTypes.string,

  /**
   * The style of the container (div)
   */
  style: PropTypes.object,

  /**
   * A unique identifier for the component, used to improve
   * performance by React.js while rendering components
   * See https://reactjs.org/docs/lists-and-keys.html for more info
   */
  key: PropTypes.string,

  /**
   * Dash-assigned callback that gets fired when the value changes.
   */
  setProps: PropTypes.func,

  /**
   * Object that holds the loading state object coming from dash-renderer
   */
  loading_state: PropTypes.shape({
    /**
     * Determines if the component is loading or not
     */
    is_loading: PropTypes.bool,
    /**
     * Holds which property is loading
     */
    prop_name: PropTypes.string,
    /**
     * Holds the name of the component that is loading
     */
    component_name: PropTypes.string
  })
};

export default RadioButton;
