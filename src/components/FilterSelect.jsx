import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

import FourSquareIcon from "../SvgIcon/FourSquareIcon";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FilterSelect = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event, targetValue) => {
    const {
      target: { value },
    } = event;
    console.log("event", event, "value", value, "targetValue", targetValue);
    setPersonName(targetValue);
  };

  const handleDelete = (value) => () => {
    setPersonName((prev) => prev?.filter((item) => item !== value));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "73.5rem" }}>
        <Autocomplete
          multiple
          id="filter-select"
          options={names}
          value={personName}
          onChange={(event, targetValue) => {
            handleChange(event, targetValue);
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                label={option}
                icon={<FourSquareIcon />}
                onDelete={handleDelete(option)}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Select..." />
          )}
        />
      </FormControl>
    </div>
  );
};

export default FilterSelect;
