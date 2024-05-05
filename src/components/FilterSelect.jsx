import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";

import FourSquareIcon from "../SvgIcon/FourSquareIcon";
import colorMap from "../styles/colorMap";

const StyledFilterArea = styled(Grid)(({ theme }) => ({
  backgroundColor: colorMap.grey,
  padding: theme.spacing(1),
}));

const StyledChip = styled(Chip)(({}) => ({
  backgroundColor: colorMap.primary_5,
  borderRadius: "0.5rem",
  border: `1px solid ${colorMap.primary_70}`,
}));

const StyledSearchButton = styled(Button)(({ theme }) => ({
  minWidth: "4rem",
  padding: theme.spacing(2, 0),
  backgroundColor: colorMap.accent_15,
  color: "black",
  marginRight: theme.spacing(3),

  "&:hover": {
    backgroundColor: colorMap.accent_15,
  },
}));

const FilterSelect = ({
  appliedCategory,
  categoryData = [],
  setAppliedCategory,
}) => {
  const [category, setCategory] = useState([]);

  const handleChange = (_, targetValue) => {
    setCategory(targetValue);
  };

  const handleDelete = (value) => () => {
    setCategory((prev) => prev?.filter((item) => item !== value));
  };

  const handleApply = () => {
    setAppliedCategory(category);
    setCategory([]);
  };

  const handleClear = () => {
    setAppliedCategory([]);
    setCategory([]);
  };

  return (
    <>
      <Grid item xs={2}>
        <Typography
          variant="h3"
          fontSize="28px"
          pl={3}
          borderLeft={`4px solid ${colorMap.accent}`}
        >
          案件分析
        </Typography>
      </Grid>
      <Grid
        item
        xs={10}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <FormControl sx={{ m: 2, mx: 3, width: "100%" }}>
          <Autocomplete
            multiple
            id="filter-select"
            options={categoryData}
            value={category}
            disableCloseOnSelect
            onChange={(event, targetValue) => {
              handleChange(event, targetValue);
            }}
            renderTags={(value, getTagProps) =>
              value?.map((option, index) => (
                <StyledChip
                  key={index}
                  label={option}
                  icon={<FourSquareIcon />}
                  onDelete={handleDelete(option)}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Radio
                    checked={category.some((cat) => cat === option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategory([...category, option]);
                      } else {
                        setCategory(category.filter((cat) => cat !== option));
                      }
                    }}
                    color="primary"
                  />
                  {option}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="選擇主分類"
              />
            )}
          />
        </FormControl>
        <StyledSearchButton onClick={handleApply}>查詢</StyledSearchButton>
      </Grid>
      {appliedCategory.length > 0 && (
        <StyledFilterArea container mx={3}>
          <Box>
            {appliedCategory?.map((option, index) => (
              <StyledChip
                sx={{ mr: 1 }}
                key={index}
                label={option}
                icon={<FourSquareIcon />}
                onDelete={handleDelete(option)}
              />
            ))}
          </Box>
          <Button
            sx={{
              backgroundColor: colorMap.light,
              color: colorMap.rose_600,
              minHeight: "1.75rem",
            }}
            onClick={handleClear}
          >
            全部重設
          </Button>
        </StyledFilterArea>
      )}
    </>
  );
};

export default FilterSelect;
