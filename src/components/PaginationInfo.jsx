import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const PaginationInfo = ({ currentPage, totalPages, onPageChange }) => {
  const handleInputChange = (event) => {
    const pageNumber = event.target.value;
    onPageChange(event, pageNumber);
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" display="flex" alignItems="center">
        <span>第</span>
        <TextField
          type="number"
          value={currentPage}
          onChange={handleInputChange}
          inputProps={{ min: 1, max: totalPages }}
          size="small"
          variant="outlined"
          sx={{ ml: 2, pr: 1 }}
        />
        <span>頁 / {totalPages} 頁</span>
      </Typography>
    </Box>
  );
};

export default PaginationInfo;
