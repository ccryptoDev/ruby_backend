import React from 'react';
import PropTypes from 'prop-types';

import './Table.scss';

const Table = ({
  tableTitle,
  tableRow,
  className,
}) => {

  let addClasses = className;

  return (
    <>
      <div className={`${addClasses} table-layout`}>
        <div className="sub-title">
          {
            tableTitle.map((item, index) => {
                return <span key={index}>{item}</span>
            })
          }
        </div>
        <div className={`details ${addClasses}`}>
          {
            tableRow.map((item, index) => {
              return (
                <div key={index} className="details-row">
                  { item.dateInfo && 
                    <div>{item.dateInfo}</div>
                  }
                  { item.price &&
                    <div>${item.price}</div>
                  }
                  { item.percent &&
                    <div>{item.percent}%</div>
                  }
                  { item.cardInfo &&
                    <div>{item.cardInfo}</div>
                  }
                  { item.paynow &&
                    <div className={item.paynow}>{item.paynow}</div>
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

Table.propTypes = {
  tableTitle: PropTypes.array.isRequired,
  tableRow: PropTypes.array.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Table;