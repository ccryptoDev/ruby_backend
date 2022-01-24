import React, { useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import dropdownIcon from "../../assets/images/dropdown.svg";

import './DropDown.scss'

const DropDownTmpl = ({ 
  items,
  size,
  textInfo,
  disabled,
  getSelectedCategory,
}) => {
  const [dropDownTmpl, setDropdownTmpl] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const dropdownRef = useRef(null);

  const handleSelectedCategory = (name, index) => {
    setSelectedCategory(name)
    getSelectedCategory(index)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownTmpl(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  let layoutClasses = [size, 'dropdown-layout'];
  return (
    <div
      className={layoutClasses.join(' ')}
      onClick={() => setDropdownTmpl(!dropDownTmpl)}
      ref={dropdownRef}
    >
      <input
        className="dropdown-input border-credit"
        placeholder={textInfo}
        readOnly
        value={selectedCategory}
      />
      <img src={dropdownIcon} className="cat-dropdown" />
      { dropDownTmpl &&
        <div className="dropdown-tmpl">
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="dropdown-list"
                onClick={() => {
                  handleSelectedCategory(item.name, index);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      }
    </div>
    
  );
};

DropDownTmpl.propTypes = {
  items: PropTypes.array.isRequired,
  size: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  getSelectedCategory: PropTypes.func
};

export default DropDownTmpl;