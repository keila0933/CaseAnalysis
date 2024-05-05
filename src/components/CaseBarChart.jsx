import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import colorMap from "../styles/colorMap";

const prevColor = colorMap.accent;
const curColor = colorMap.info_blue;

const CaseBarChart = ({ chartData = {} }) => {
  const {
    current_period = {},
    current_period_total_count = 0,
    previous_period = {},
    previous_period_total_count = 0,
  } = chartData;

  const getXAxisLabel = (curData, prevData) => {
    const curLabelArr = Object.keys(curData);
    const prevLabelArr = Object.keys(prevData);
    if (curLabelArr.length === 0 || prevLabelArr.length === 0) return [];
    const resultArr = curLabelArr.map((item, index) => {
      const curData = item.split("/").slice(1, item.length).join("/");
      const prevData = prevLabelArr[index]
        .split("/")
        .slice(1, prevLabelArr[index].length)
        .join("/");
      return `${prevData} & ${curData}`;
    });
    return resultArr;
  };

  const getPeriodData = (data) => {
    return Object.values(data);
  };

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
              mr={1}
            />
            <Typography component="span">
              前期
              <Typography
                component="span"
                color={prevColor}
                fontWeight={700}
                mx={0.5}
              >
                {previous_period_total_count}
              </Typography>
              筆
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              width="0.75rem"
              height="0.75rem"
              borderRadius="50%"
              backgroundColor={curColor}
              mr={1}
            />
            <Typography component="span">
              當期
              <Typography
                component="span"
                color={curColor}
                fontWeight={700}
                mx={0.5}
              >
                {current_period_total_count}
              </Typography>
              筆
            </Typography>
          </Box>
        </Box>
      </Box>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: getXAxisLabel(current_period, previous_period),
          },
        ]}
        series={[
          { data: getPeriodData(previous_period), color: prevColor },
          { data: getPeriodData(current_period), color: curColor },
        ]}
        grid={{ vertical: true, horizontal: true }}
        height={400}
      />
    </>
  );
};

export default CaseBarChart;
