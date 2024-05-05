import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import colorMap from "../styles/colorMap";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colorMap.primary_5,
    color: theme.palette.common.black,
    borderBottom: `1px solid ${colorMap.primary}`,
    borderRight: "2px solid white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "td, th": {
    border: 0,
    borderRight: "2px solid white",
  },
}));

const getTime = (dateTime) => {
  return dateTime.split(" ")[1];
};

const getDate = (dateTime) => {
  return dateTime.split(" ")[0];
};

const CaseTable = ({ displayedData = [], page = 1 }) => {
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = displayedData.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left">
              <TableSortLabel
                active={orderBy === "record_time"}
                direction={orderBy === "record_time" ? order : "asc"}
                onClick={() => handleSort("record_time")}
              >
                回報日期
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="left">
              <TableSortLabel
                active={orderBy === "reply_time"}
                direction={orderBy === "reply_time" ? order : "asc"}
                onClick={() => handleSort("reply_time")}
              >
                受理日期
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="left">主分類</StyledTableCell>
            <StyledTableCell align="center">問題主旨</StyledTableCell>
            <StyledTableCell align="center">
              <TableSortLabel
                active={orderBy === "satisfaction"}
                direction={orderBy === "satisfaction" ? order : "asc"}
                onClick={() => handleSort("satisfaction")}
              >
                滿意度
              </TableSortLabel>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData?.map((row, index) => {
            const indexNumber = 100 * (page - 1) + index + 1;
            return (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {indexNumber < 10 ? `0${indexNumber}` : indexNumber}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getDate(row.record_time)}
                  <Typography fontWeight="700" fontSize="10px">
                    {getTime(row.record_time)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getDate(row.reply_time)}
                  <Typography fontWeight="700" fontSize="10px">
                    {getTime(row.reply_time)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.main_category}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.petition_subject}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.satisfaction}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CaseTable;
