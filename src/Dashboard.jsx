import React, { useEffect, useState, useMemo } from "react";
import { useSnackbar } from "notistack";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";

import { getCasesData } from "./api/getCasesData";

import FilterSelect from "./components/FilterSelect";
import BarChart from "./components/CaseBarChart";
import CaseTable from "./components/CaseTable";
import PaginationInfo from "./components/PaginationInfo";
import colorMap from "./styles/colorMap";

const StyledDashboardLayout = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing(3),
  marginTop: theme.spacing(12),
  backgroundColor: "white",
  borderRadius: "1rem",
  overflowY: "hide",
  maxWidth: "calc(100% - 6rem)",
  position: "relative",
}));

const Dashboard = ({ selectDateRange }) => {
  const [stateData, setStateData] = useState({});
  const [page, setPage] = useState(1);
  const [appliedCategory, setAppliedCategory] = useState([]);
  const [cache, setCache] = useState({});
  const [initialized, setInitialized] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const itemsPerPage = 100;
  const totalPages = Math.ceil(stateData.data_size / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const curChunk = Math.ceil(page / 10);

  const displayedData = useMemo(() => {
    const tableData = Object.values(cache).flat();
    return tableData.slice(startIndex, endIndex);
  }, [stateData, startIndex, curChunk]);

  useEffect(() => {
    fetchData(curChunk);
  }, [curChunk]);

  useEffect(() => {
    if (initialized) {
      fetchData(curChunk, true);
      setPage(1);
      setCache({});
    } else {
      setInitialized(true);
    }
  }, [appliedCategory, selectDateRange]);

  const fetchData = async (chunk, needReset = false) => {
    if (!needReset && cache[chunk]?.length > 0) return;
    try {
      const payload = {
        start_time: selectDateRange?.start,
        end_time: selectDateRange?.end,
        category: appliedCategory,
        chunk: chunk,
      };
      const result = await getCasesData(payload);
      setStateData(result);
      setCache({ ...cache, [chunk]: result?.table_data });
    } catch (error) {
      enqueueSnackbar("There was a problem with the API", { variant: "error" });
      console.error("Error fetching data:", error);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <StyledDashboardLayout>
      {/* header */}
      <Grid
        container
        position="sticky"
        top={0}
        zIndex={999}
        display="flex"
        alignItems="center"
        borderBottom={`1px solid ${colorMap.neutral_300}`}
        py={2.5}
        bgcolor="white"
        borderRadius="1rem 1rem 0 0"
      >
        <FilterSelect
          categoryData={stateData?.categories || []}
          appliedCategory={appliedCategory}
          setAppliedCategory={setAppliedCategory}
        />
      </Grid>

      {/* content */}
      <Box px={2} pb={4} height="calc(100% - 10rem)" overflow="auto">
        <BarChart chartData={stateData?.petition_count} />
        <CaseTable displayedData={displayedData} page={page} />
      </Box>

      {/* footer */}
      <Box
        position="sticky"
        bottom={0}
        zIndex={999}
        textAlign="center"
        py={2}
        borderTop={`1px solid ${colorMap.neutral_300}`}
        bgcolor="white"
        display="flex"
        justifyContent="center"
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
        />
        <PaginationInfo
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handleChangePage}
        />
      </Box>
    </StyledDashboardLayout>
  );
};

export default Dashboard;
