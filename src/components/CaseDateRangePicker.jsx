import React, { useState } from "react";
import { DateRangePicker, createStaticRanges } from "react-date-range";
import {
  addDays,
  endOfDay,
  startOfDay,
  addMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { zhTW } from "date-fns/locale";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import CalendarIcon from "../SvgIcon/CalendarIcon";

const dateDefined = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfLastThreeMonth: startOfDay(addMonths(new Date(), -3)),
  startOfLastHalfYear: startOfDay(addMonths(new Date(), -6)),
  startOfLastYear: startOfDay(addMonths(new Date(), -12)),
};

const customStaticRange = [
  {
    label: "近一週",
    range: () => ({
      startDate: dateDefined.startOfWeek,
      endDate: dateDefined.endOfWeek,
    }),
  },
  {
    label: "一個月內",
    range: () => ({
      startDate: dateDefined.startOfLastMonth,
      endDate: dateDefined.startOfToday,
    }),
  },
  {
    label: "三個月內",
    range: () => ({
      startDate: dateDefined.startOfLastThreeMonth,
      endDate: dateDefined.startOfToday,
    }),
  },
  {
    label: "半年內",
    range: () => ({
      startDate: dateDefined.startOfLastHalfYear,
      endDate: dateDefined.startOfToday,
    }),
  },
  {
    label: "一年內",
    range: () => ({
      startDate: dateDefined.startOfLastYear,
      endDate: dateDefined.startOfToday,
    }),
  },
  {
    label: "自訂時間區間",
    range: () => ({
      startDate: dateDefined.startOfToday,
      endDate: dateDefined.endOfToday,
    }),
  },
];

const StyledDateRangePickerContainer = styled(Popover)(({ theme }) => ({
  ".rdrMonthName": {
    textAlign: "center",
  },
  ".rdrStaticRange": {
    borderBottom: "none",
  },
}));

export default function CaseDateRangePicker() {
  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  console.log("state", state);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography pr={2}>日期區間</Typography>
        <TextField
          onClick={handleClick}
          variant="outlined"
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarIcon color="secondary" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <StyledDateRangePickerContainer
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <DateRangePicker
          locale={zhTW}
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={false}
          showMonthAndYearPickers={false}
          showDateDisplay={false}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
          preventSnapRefocus={true}
          calendarFocus="forwards"
          inputRanges={[]}
          maxDate={new Date()}
          staticRanges={createStaticRanges(customStaticRange)}
        />
        <Box display="flex" justifyContent="flex-end" pb={2}>
          <Button sx={{ marginRight: "1rem" }}>取消</Button>
          <Button>確認</Button>
        </Box>
      </StyledDateRangePickerContainer>
    </>
  );
}
