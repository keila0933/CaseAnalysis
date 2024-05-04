import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const prevColor = "#52697A";
const curColor = "#5084E9";

const CaseBarChart = () => {
  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Box pt={4} pr={6}>
          <Box display="flex" alignItems="center">
            <Box
              width="0.75rem"
              height="0.75rem"
              borderRadius="50%"
              backgroundColor={prevColor}
            />
            <Typography component="span">前期1234筆</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              width="0.75rem"
              height="0.75rem"
              borderRadius="50%"
              backgroundColor={curColor}
            />
            <Typography component="span">當期2234筆</Typography>
          </Box>
        </Box>
      </Box>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: [
              "group A",
              "group B",
              "group C",
              "group D",
              "group E",
              "group F",
              "group G",
            ],
          },
        ]}
        series={[
          { data: [4, 3, 2, 8, 7, 6, 4], color: prevColor },
          { data: [2, 6, 1, 4, 3, 6, 8], color: curColor },
        ]}
        grid={{ vertical: true, horizontal: true }}
        width={1500}
        height={300}
      />
    </>
  );
};

export default CaseBarChart;
