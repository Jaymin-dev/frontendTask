/* eslint-disable no-useless-computed-key */
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import "./styles.scss";

const CustomSelect = ({
  size = "small",
  options = [],
  placeholder,
  label,
  widthBorder = true,
  displayEmpty = true,
  ...res
}) => {
  return (
    <>
      <FormControl
        sx={{
          m: 1,
          minWidth: "100%",
          maxWidth: 300,
          marginLeft: 0,
          margin: 0,
        }}
        // className={cs("customSelectWrapper", { ["noBorder"]: !widthBorder })}
      >
        {!displayEmpty && label && <InputLabel>{label}</InputLabel>}
        <Select
          displayEmpty={displayEmpty}
          inputProps={{ "aria-label": "Without label" }}
          size={size}
          variant="outlined"
          {...res}
        >
          {placeholder && (
            <MenuItem disabled value="">
              {placeholder}
            </MenuItem>
          )}

          {options.map((o) => (
            <MenuItem value={o.value}>{o.lable}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default CustomSelect;
