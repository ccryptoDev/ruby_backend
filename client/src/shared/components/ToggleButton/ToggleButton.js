import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ToggleButton.scss';
import { useField } from 'formik';

export default function ToggleButton({ 
  customClass = '',
  // onChange,
  // checked
}) {
  // const handleChange = useCallback(e => onChange(e.target.checked), []);
  const [ checked, setChecked ] = useState(false);
  const handleChange = () => {
    setChecked(!checked)
  }
  return (
    <label className={`switch ${customClass}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleChange()}
      />
      <span className="slider round" />
    </label>
  );
}

ToggleButton.propTypes = {
  customClass: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export const ControlledToggleButton = ({
  onChange = () => {},
  checked,
  value,
  ...props
}) => {
  const [field, meta, { setValue }] = useField(props);

  return (
    <ToggleButton
      {...props}
      name={field.name}
      onChange={value => {
        setValue(value);
        onChange(value);
      }}
      onBlur={field.onBlur}
      value={field.value || value}
      checked={field.value || value}
      error={meta.error}
    />
  );
};
