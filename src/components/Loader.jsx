import React from "react";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const expandBox = {
  display: "block",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

const StyledLoader = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: "1 0",
  minHeight: 0,
});

const StyledFogBackground = styled("div")(({ theme, fogBackgroundColor }) => ({
  ...expandBox,
  position: "absolute",
  zIndex: theme.zIndex.loader,
  backgroundColor: fogBackgroundColor || "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledContent = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: "1 0",
  minHeight: 0,
});

const StyledMessage = styled("div")({
  display: "inline-block",
  position: "relative",
  bottom: "initial",
  right: "initial",
  lineHeight: 1,
});

const Loader = ({
  isShown,
  children,
  message,
  fogBackgroundColor,
  color,
  size,
  ...otherProps
}) => {
  return (
    <StyledLoader {...otherProps}>
      <StyledContent>
        {children}
        {isShown && (
          <StyledFogBackground fogBackgroundColor={fogBackgroundColor}>
            <StyledMessage>{message || <CircularProgress />}</StyledMessage>
          </StyledFogBackground>
        )}
      </StyledContent>
    </StyledLoader>
  );
};

export default Loader;
