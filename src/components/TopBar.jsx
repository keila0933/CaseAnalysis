import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import CaseDateRangePicker from "./CaseDateRangePicker";
import ExtendListIcon from "../SvgIcon/ExtendListIcon";
import CollapseListIcon from "../SvgIcon/CollapseListIcon";
import colorMap from "../styles/colorMap";

const TopBar = ({
  selectDateRange,
  onChangeDateRange,
  isListExtend,
  onListExtend,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box sx={{ backgroundColor: colorMap.primary_5, padding: "10px 0px" }}>
          <IconButton
            size="large"
            aria-label="menu"
            sx={{ px: 1.75 }}
            onClick={onListExtend}
            disableFocusRipple
            disableRipple
          >
            {isListExtend ? <ExtendListIcon /> : <CollapseListIcon />}
          </IconButton>
        </Box>
        <Box>
          <CaseDateRangePicker
            selectDateRange={selectDateRange}
            onChangeDateRange={onChangeDateRange}
          />
        </Box>
      </Box>
    </AppBar>
  );
};

export default TopBar;
