import React, { useState } from "react";
import { DateRangePicker, createStaticRanges } from "react-date-range";
import { addDays, endOfDay, startOfDay, addMonths, format } from "date-fns";
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
import colorMap from "../styles/colorMap";

const dateDefined = {
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfLastWeek: startOfDay(addDays(new Date(), -6)),
  startOfLastMonth: startOfDay(addMonths(new Date(), -1)),
  startOfLastThreeMonth: startOfDay(addMonths(new Date(), -3)),
  startOfLastHalfYear: startOfDay(addMonths(new Date(), -6)),
  startOfLastYear: startOfDay(addMonths(new Date(), -12)),
};

const DATE_FORMAT = "yyyy/MM/dd";

const customStaticRange = [
  {
    label: "近一週",
    range: () => ({
      startDate: dateDefined.startOfLastWeek,
      endDate: dateDefined.endOfToday,
    }),
  },
  {
    label: "一個月內",
    range: () => ({
      startDate: dateDefined.startOfLastMonth,
      endDate: dateDefined.endOfToday,
    }),
  },
  {
    label: "三個月內",
    range: () => ({
      startDate: dateDefined.startOfLastThreeMonth,
      endDate: dateDefined.endOfToday,
    }),
  },
  {
    label: "半年內",
    range: () => ({
      startDate: dateDefined.startOfLastHalfYear,
      endDate: dateDefined.endOfToday,
    }),
  },
  {
    label: "一年內",
    range: () => ({
      startDate: dateDefined.startOfLastYear,
      endDate: dateDefined.endOfToday,
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

const StyledDateRangePickerInput = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0.5),
  ".MuiOutlinedInput-root": {
    width: theme.spacing(31.25),
    borderRadius: "2rem",
    backgroundColor: colorMap.grey,
  },

  ".MuiOutlinedInput-notchedOutline": {
    borderColor: colorMap.grey,
  },
}));

export default function CaseDateRangePicker({
  selectDateRange,
  onChangeDateRange,
}) {
  const [displayDate, setDisplayDate] = useState([
    {
      startDate: selectDateRange?.start,
      endDate: selectDateRange?.end,
      key: "selection",
    },
  ]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDisplayDate([
      {
        startDate: selectDateRange?.start || addDays(new Date(), -7),
        endDate: selectDateRange?.end || new Date(),
        key: "selection",
      },
    ]);
  };

  const handleConfirmDateChange = () => {
    onChangeDateRange({
      start: format(displayDate[0]?.startDate, DATE_FORMAT),
      end: format(displayDate[0]?.endDate, DATE_FORMAT),
    });
    setAnchorEl(null);
  };

  const getDisplayDateValue = () => {
    return `${format(displayDate[0]?.startDate, DATE_FORMAT)} - ${format(displayDate[0]?.endDate, DATE_FORMAT)}`;
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <StyledDateRangePickerInput>
        <Typography variant="subtitle2" pr={2}>
          日期區間
        </Typography>
        <TextField
          value={getDisplayDateValue()}
          onClick={handleClick}
          variant="outlined"
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="2.25rem"
                  height="1.75rem"
                  backgroundColor={colorMap.primary}
                  borderRadius="1rem"
                  py={0.25}
                  px={0.5}
                >
                  <CalendarIcon />
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </StyledDateRangePickerInput>
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
          onChange={(item) => setDisplayDate([item.selection])}
          showSelectionPreview={false}
          showMonthAndYearPickers={false}
          showDateDisplay={false}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={displayDate}
          direction="horizontal"
          preventSnapRefocus={true}
          calendarFocus="forwards"
          inputRanges={[]}
          maxDate={new Date()}
          staticRanges={createStaticRanges(customStaticRange)}
        />
        <Box display="flex" justifyContent="flex-end" pb={2}>
          <Button onClick={handleClose} sx={{ marginRight: "1rem" }}>
            取消
          </Button>
          <Button onClick={handleConfirmDateChange}>確認</Button>
        </Box>
      </StyledDateRangePickerContainer>
    </>
  );
}
