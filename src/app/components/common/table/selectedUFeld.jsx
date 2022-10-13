import React from "react";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import { minWidth } from "@mui/system";

const SelectedField = ({ items, onSelect, name, label, value }) => {
  const handleChange = (event) => {
    onSelect(event);
  };
  return (
    <FormControl sx={{ minWidth: "200px" }}>
      <InputLabel id={name} sx={{ left: "-5px", top: "-7px" }}>
        {label}
      </InputLabel>

      <Select
        labelId={name}
        label={name}
        onChange={handleChange}
        name={name}
        value={value}
      >
        {items.map((item) => (
          <MenuItem key={item.name} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectedField.propTypes = {
  items: PropTypes.array,
  onSelect: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default SelectedField;
