import React from 'react'

const Filter = ({onSelect}) => {
  const selectHandle = (e) => {
    const regionName = e.target.value;
    onSelect(regionName);
  };
  return (
    <select onChange={selectHandle}>
      <option className="option">All</option>
      <option className="option" value="Africa">
        Africa
      </option>
      <option className="option" value="America">
        America
      </option>
      <option className="option" value="Asia">
        Asia
      </option>
      <option className="option" value="Europe">
        Europe
      </option>
      <option className="option" value="Oceania">
        Oceania
      </option>
    </select>
  )
}

export default Filter