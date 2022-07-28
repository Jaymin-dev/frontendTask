import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { dashboardRequest } from "../../redux/actions/Action";
import { Container } from "@mui/system";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const columns = [
  { field: "logId", headerName: "Log ID", width: 150 },
  {
    field: "applicationType",
    headerName: "Application Type",
    width: 200,
  },
  {
    field: "applicationID",
    headerName: "Application ID",
    width: 150,
    valueGetter: (params) =>
      params.row.applicationId ? params.row.applicationId : "-/-",
  },
  {
    field: "actionType",
    headerName: "Action",
    width: 200,
  },
  {
    field: "source",
    headerName: "Action Details",
    width: 110,
    valueGetter: (params) => (params.row.source ? params.row.source : "-/-"),
  },
  {
    field: "creationTime",
    headerName: "Date : Time",
    sortable: false,
    width: 230,
    valueGetter: (params) =>
      `${params.row.creationTimestamp.split(" ")[0]} / ${
        params.row.creationTimestamp.split(" ")[1]
      }`,
  },
];

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  MuiInputLabel: {
    fontSize: 16,
  },
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const Dashboard = () => {
  const {
    data: { loading, result = {} },
  } = useSelector(({ dashboard }) => dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dashboardRequest());
  }, []);
  return (
    <Container>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="bootstrap-input">
          Bootstrap
        </InputLabel>
        <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />
      </FormControl>
      <Box sx={{ height: 650, width: "100%", boxShadow: 3 }}>
        <DataGrid
          getRowId={(i) => i.logId}
          rows={result.auditLog || []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          loading={loading}
        />
      </Box>
    </Container>
  );
};
