import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { getCasesData } from "./api/getCasesData";

import FilterSelect from "./components/FilterSelect";
import BarChart from "./components/CaseBarChart";
import CaseTable from "./components/CaseTable";

const StyledDashboardLayout = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing(3),
  marginTop: theme.spacing(12),
  padding: theme.spacing(3),
  backgroundColor: "white",
  borderRadius: "1rem",
}));

const Dashboard = () => {
  const getData = () => {
    getCasesData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <StyledDashboardLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid #d4d4d4"
        px={2}
        pb={2.5}
      >
        <Typography variant="h3" fontSize="28px">
          案件分析
        </Typography>
        <Box>
          <FilterSelect />
        </Box>
        <Button>查詢</Button>
      </Box>
      <Box>
        <BarChart />
      </Box>
      <CaseTable />
    </StyledDashboardLayout>
  );
};

export default Dashboard;
