import React from 'react';

const CheckboxTags = ({ title, tags, onSelect }) => {
  return (
    <div className="col-md-4">
      <p>{title}</p>
      {tags.map((m, i) => (
        <div key={i} className="form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              onClick={() => onSelect(i)}
              type="checkbox"
              value=""
            />
            {m}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxTags;
