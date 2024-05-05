import { useState } from "react";
import { ThemeProvider } from "@mui/system";
import { SnackbarProvider } from "notistack";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import TopBar from "./components/TopBar";
import ChartLineIcon from "./SvgIcon/ChartLineIcon";
import theme from "./styles/theme";
import colorMap from "./styles/colorMap";
import Dashboard from "./Dashboard";

// Set it default because it have complete prev/cur data
const defaultDateRange = {
  start: "2024/03/23",
  end: "2024/03/30",
};

function App() {
  const [selectDateRange, setSelectDateRange] = useState(defaultDateRange);
  const [isListExtend, setIsListExtend] = useState(true);

  const drawerWidth = isListExtend ? 224 : 56;

  const handleChangeDateRange = (range) => {
    setSelectDateRange(range);
  };

  const handleListExtend = () => {
    setIsListExtend((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Box
          sx={{
            display: "flex",
            backgroundColor: colorMap.gray_300,
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          <CssBaseline />
          <TopBar
            selectDateRange={selectDateRange}
            isListExtend={isListExtend}
            onChangeDateRange={handleChangeDateRange}
            onListExtend={handleListExtend}
          />
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto", mt: 4 }}>
              <List>
                {["案件分析"].map((text, index) => (
                  <ListItem
                    key={text}
                    disablePadding
                    sx={{ backgroundColor: colorMap.primary_5 }}
                  >
                    <ListItemButton>
                      <Box
                        pr={2}
                        display="flex"
                        alignItems="center"
                        fontSize="1.25rem"
                      >
                        <ChartLineIcon />
                      </Box>
                      {isListExtend && (
                        <ListItemText
                          primary={text}
                          primaryTypographyProps={{
                            color: "primary",
                            fontWeight: 700,
                            fontSize: "1.25rem",
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
          <Dashboard selectDateRange={selectDateRange} />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
