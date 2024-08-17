import  { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import PropTypes from 'prop-types'

const PriceRange = ({ min, max, step, onChange }) => {
  const [values, setValues] = useState([min, max]);

  return (
    <div className="w-full my-4">
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(values) => {
          setValues(values);
          onChange(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              background: getTrackBackground({
                values,
                colors: ['#ccc', '#548BF4', '#ccc'],
                min,
                max,
              }),
              borderRadius: '4px',
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              backgroundColor: '#FFF',
              border: '1px solid #ccc',
              borderRadius: '50%',
            }}
          />
        )}
      />
      <div className="flex justify-between mt-2">
        <span>${values[0]}</span>
        <span>${values[1]}</span>
      </div>
    </div>
  );
};

PriceRange.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func
}

export default PriceRange;
