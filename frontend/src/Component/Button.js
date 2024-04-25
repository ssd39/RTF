import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const CustomButton = styled(Button)({
  borderRadius: 15,
  textTransform: "none",
  boxShadow: "inset 3px 3px 5px rgba(0, 0, 0, 0.5)",
  backgroundColor: "rgba(255,0,0,1)",
  ":hover": {
    backgroundColor: "rgba(255,0,0,0.5)",
  },
  fontWeight: 'bold',
  color: 'white',
  fontStyle: 'italic'
});

export default ({ children, onClick }) => {
  return (
    <CustomButton variant="contained" onClick={onClick}>
      {children}
    </CustomButton>
  );
};
