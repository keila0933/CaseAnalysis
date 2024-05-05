import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import colorMap from "../styles/colorMap";

const ChartLineIcon = (props) => {
  return (
    <SvgIcon {...props} fontSize="1.1rem">
      <svg
        width="26"
        height="22"
        viewBox="0 0 26 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V20C0 20.5304 0.210714 21.0391 0.585786 21.4142C0.960859 21.7893 1.46957 22 2 22H24C24.5304 22 25.0391 21.7893 25.4142 21.4142C25.7893 21.0391 26 20.5304 26 20V2C26 1.46957 25.7893 0.960859 25.4142 0.585786C25.0391 0.210714 24.5304 0 24 0ZM22 17C22.2652 17 22.5196 17.1054 22.7071 17.2929C22.8946 17.4804 23 17.7348 23 18C23 18.2652 22.8946 18.5196 22.7071 18.7071C22.5196 18.8946 22.2652 19 22 19H4C3.73478 19 3.48043 18.8946 3.29289 18.7071C3.10536 18.5196 3 18.2652 3 18V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3C4.26522 3 4.51957 3.10536 4.70711 3.29289C4.89464 3.48043 5 3.73478 5 4V11.865L9.36 8.23125C9.52568 8.09318 9.73155 8.01238 9.94691 8.00089C10.1623 7.9894 10.3756 8.04784 10.555 8.1675L15.93 11.7537L21.3563 7.23125C21.5601 7.06151 21.8231 6.97972 22.0873 7.00386C22.3515 7.02801 22.5953 7.15611 22.765 7.36C22.9347 7.56388 23.0165 7.82685 22.9924 8.09104C22.9682 8.35523 22.8401 8.59901 22.6362 8.76875L16.6362 13.7687C16.4706 13.9068 16.2647 13.9876 16.0493 13.9991C15.834 14.0106 15.6207 13.9522 15.4412 13.8325L10.0662 10.2463L5 14.4688V17H22Z"
          fill={colorMap.primary}
        />
      </svg>
    </SvgIcon>
  );
};

export default ChartLineIcon;
