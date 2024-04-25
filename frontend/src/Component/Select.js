import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/system";

const CustomSelect = styled(Select)({
  background: "red",
  ".MuiSelect-select": {
    paddingTop: 11,
    paddingBottom: 11,
  },
  ".MuiFormLabel-root ": {
    color: "white",
  },
  ".MuiSelect-select": {
    color: "white",
    fontWeight: "bold",
    paddingTop: 11.5,
    paddingBottom: 7.5,
  },
  borderRadius: 15,
  color: "white",
});

export default ({ value, label, onChange, children }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        sx={{
          ".MuiFormLabel-root": {
            marginTop: -0.5,
          },
          ".MuiFormLabel-root.Mui-focused": {
            color: "rgba(255,255,255,0.8)",
          },
        }}
        fullWidth
      >
        <InputLabel sx={{ color: "white", paddingBottom: 5 }} id="select-label">
          {label}
        </InputLabel>
        <CustomSelect
          labelId="select-label"
          value={value}
          label={label}
          onChange={onChange}
        >
          {children}
        </CustomSelect>
      </FormControl>
    </Box>
  );
};
