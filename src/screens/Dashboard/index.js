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
import { Button, FormHelperText, Grid, InputAdornment, OutlinedInput } from "@mui/material";
import CustomSelect from "../../Components/CustomSelect";

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
      `${params.row.creationTimestamp.split(" ")[0]} / ${params.row.creationTimestamp.split(" ")[1]
      }`,
  },
];


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
      <Grid container spacing={1}>
        <Grid item xs>
          <FormControl sx={{ m: 1, width: '18ch' }} variant="outlined">
            <FormHelperText id="outlined-weight-helper-text"
              sm={{ mb: 2 }} style={{ color: "#000",marginLeft:0}}
            >Employee Name</FormHelperText>
            <OutlinedInput
              placeholder="e.g.Admin.User"
              id="outlined-adornment-weight"
              // value={values.weight}
              // onChange={handleChange('weight')}
              aria-describedby="outlined-weight-helper-text"
              style={{
                height: 30,
              }}
            />

          </FormControl>
        </Grid>
        <Grid item xs sx={{ m: 1, width: '18ch',marginTop:1.5 }}>
          <InputLabel sm={{ mb: 2 }} style={{ color: "#000" ,fontSize:12,}}>
            Action Type
          </InputLabel>
          <CustomSelect
            options={[
              { value: "ASAP", lable: "ASAP" },
              { value: "Within 1 Months", lable: "Within 1 Months" },
              { value: "Within 6 Months", lable: "Within 6 Months" },
              { value: "Within 12 Months", lable: "Within 12 Months" },
            ]}
            name="rating"
            // onChange={handleChange}
            // value={data.rating}
            placeholder="SELECT"
            style={{
              height: 30
            }}
          />
        </Grid>
        <Grid item xs sx={{ m: 1, width: '18ch',marginTop:1.5 }}>
        <InputLabel sm={{ mb: 2 }} style={{ color: "#000" ,fontSize:12}}>
            Application Type
          </InputLabel>
          <CustomSelect
            options={[
              { value: "ASAP", lable: "ASAP" },
              { value: "Within 1 Months", lable: "Within 1 Months" },
              { value: "Within 6 Months", lable: "Within 6 Months" },
              { value: "Within 12 Months", lable: "Within 12 Months" },
            ]}
            name="rating"
            // onChange={handleChange}
            // value={data.rating}
            placeholder="SELECT"
            style={{
              height: 30
            }}
          />
        </Grid>
        <Grid item xs>
          <FormControl sx={{ m: 1, width: '18ch' }} variant="outlined">
            <FormHelperText id="outlined-weight-helper-text"
              sm={{ mb: 2 }} style={{ color: "#000" ,marginLeft:0}}
            >From Date</FormHelperText>
            <OutlinedInput
              placeholder="Select Date"
              id="outlined-adornment-weight"
              // value={values.weight}
              // onChange={handleChange('weight')}
              aria-describedby="outlined-weight-helper-text"
              style={{
                height: 30
              }}
            />

          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl sx={{ m: 1, width: '18ch' }} variant="outlined">
            <FormHelperText id="outlined-weight-helper-text"
              sm={{ mb: 2 }} style={{ color: "#000",marginLeft:0 }}
            >To Date</FormHelperText>
            <OutlinedInput
              placeholder="Select Date"
              id="outlined-adornment-weight"
              // value={values.weight}
              // onChange={handleChange('weight')}
              aria-describedby="outlined-weight-helper-text"
              style={{
                height: 30
              }}
            />

          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl sx={{ m: 1, width: '18ch' }} variant="outlined">
            <FormHelperText id="outlined-weight-helper-text"
              sm={{ mb: 2 }} style={{ color: "#000",marginLeft:0 }}
            >Application ID</FormHelperText>
            <OutlinedInput
              placeholder="e.g.219841/2021"
              id="outlined-adornment-weight"
              // value={values.weight}
              // onChange={handleChange('weight')}
              aria-describedby="outlined-weight-helper-text"
              style={{
                height: 30
              }}
            />

          </FormControl>
        </Grid>
        <Grid item xs>
        <Button variant="contained" sx={{ m: 1, width: '18ch' }} style={{marginTop:30,textTransform:'capitalize',height:30}}>Search Logger</Button>
        </Grid>
      </Grid>
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
