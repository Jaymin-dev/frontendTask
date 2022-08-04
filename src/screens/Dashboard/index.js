import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { dashboardRequest } from "../../redux/actions/Action";
import { Container } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import "./styles.scss";
import {
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import CustomSelect from "../../Components/CustomSelect";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
dayjs.extend(isBetween);

const columns = [
  { field: "logId", headerName: "Log ID", flex: 1 },
  {
    field: "applicationType",
    headerName: "Application Type",
    flex: 1,
  },
  {
    field: "applicationID",
    headerName: "Application ID",
    flex: 1,
    valueGetter: (params) =>
      params.row.applicationId ? params.row.applicationId : "-/-",
  },
  {
    field: "actionType",
    headerName: "Action",
    flex: 1,
  },
  {
    field: "source",
    headerName: "Action Details",
    flex: 1,
    valueGetter: (params) => (params.row.source ? params.row.source : "-/-"),
  },
  {
    field: "creationTime",
    headerName: "Date : Time",
    sortable: false,
    flex: 1,
    valueGetter: (params) =>
      `${params.row.creationTimestamp.split(" ")[0]} / ${
        params.row.creationTimestamp.split(" ")[1]
      }`,
  },
];

export const Dashboard = () => {
  const {
    data: { loading, result = {} },
  } = useSelector(({ dashboard }) => dashboard);
  const dispatch = useDispatch();
  const initFilterActions = {
    name: "",
    actionType: "",
    applicationType: "",
    startDate: "",
    endDate: "",
    id: "",
  };
  const [filterActions, setFilterActions] = useState(initFilterActions);
  const [tableData, setTableData] = useState([]);
  const [actionTypeData, setActionTypeData] = useState([]);
  const [applicationTypeData, setApplicationTypeData] = useState([]);

  const { name, actionType, applicationType, startDate, endDate, id } =
    filterActions;
  const handleFilter = () => {
    let filterData = result?.auditLog;
    if (name)
      filterData = filterData?.filter((td) =>
        td?.logId?.toString().toLowerCase().startsWith(name.toLowerCase())
      );

    if (id)
      filterData = filterData?.filter((td) =>
        td?.applicationId?.toString().toLowerCase().startsWith(id.toLowerCase())
      );

    if (actionType)
      filterData = filterData?.filter((td) => td?.actionType === actionType);

    if (applicationType)
      filterData = filterData?.filter(
        (td) => td?.applicationType === applicationType
      );

    if (startDate || endDate)
      filterData = filterData?.filter((td) =>
        td?.creationTimestamp
          ? dayjs(td?.creationTimestamp).isBetween(
              startDate ? dayjs(startDate) : dayjs(),
              endDate ? dayjs(endDate) : dayjs()
            )
          : false
      );
    setTableData(filterData);
  };

  const handleChange = ({ target: { name, value } }) => {
    setFilterActions({
      ...filterActions,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(dashboardRequest());
  }, []);

  useEffect(() => {
    if (result?.auditLog?.length > 0) {
      setTableData(result.auditLog);

      const typeAction = [];
      const typeApplication = [];
      result?.auditLog.map((d) => {
        if (d.actionType)
          typeAction.push({ value: d.actionType, lable: d.actionType });
        if (d.applicationType)
          typeApplication.push({
            value: d.applicationType,
            lable: d.applicationType,
          });
      });
      const sortedTypeAction = typeAction.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.value === value.value)
      );
      const sortTypeApplication = typeApplication.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.value === value.value)
      );
      setActionTypeData(sortedTypeAction);
      setApplicationTypeData(sortTypeApplication);
    }
  }, [result.auditLog]);

  return (
    <Container maxWidth="xl" className="page-top-space">
      <div className="breadcrumb-wrapper">
        <Stack spacing={2}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {[
              <Link underline="hover" key="1" color="inherit" href="/">
                Home
              </Link>,
              <Link underline="hover" key="2" color="inherit" href="/material-">
                Administration
              </Link>,
              <Typography key="3" color="text.primary">
                Logger search
              </Typography>,
            ]}
          </Breadcrumbs>
        </Stack>
      </div>
      <Grid container spacing={2} className="filter-action-wrapper">
        <Grid item xs>
          <FormControl variant="outlined">
            <FormHelperText
              sm={{ mb: 2 }}
              style={{ color: "#000", marginLeft: 0 }}
            >
              Employee Name
            </FormHelperText>
            <OutlinedInput
              placeholder="e.g.Admin.User"
              name="name"
              value={name}
              onChange={handleChange}
              autoComplete={false}
              aria-describedby="outlined-weight-helper-text"
              classes={{ input: "input-padding" }}
              style={{
                height: 40,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormHelperText
            id="outlined-weight-helper-text"
            sm={{ mb: 2 }}
            style={{ color: "#000", marginLeft: 0 }}
          >
            Action Type
          </FormHelperText>
          <CustomSelect
            options={actionTypeData}
            name="actionType"
            onChange={handleChange}
            value={actionType}
            placeholder="SELECT"
            className="inputSelect"
            style={{
              height: 40,
            }}
          />
        </Grid>
        <Grid item xs>
          <FormHelperText
            id="outlined-weight-helper-text"
            sm={{ mb: 2 }}
            style={{ color: "#000", marginLeft: 0 }}
          >
            Application Type
          </FormHelperText>
          <CustomSelect
            options={applicationTypeData}
            name="applicationType"
            onChange={handleChange}
            value={applicationType}
            classes={{ input: "testing" }}
            className="inputSelect"
            placeholder="SELECT"
            style={{
              height: 40,
            }}
          />
        </Grid>
        <Grid item xs>
          <FormControl variant="outlined">
            <FormHelperText
              id="outlined-weight-helper-text"
              sm={{ mb: 2 }}
              style={{ color: "#000", marginLeft: 0 }}
            >
              From Date
            </FormHelperText>
            <OutlinedInput
              type="date"
              placeholder="Select Date"
              name="startDate"
              value={startDate}
              autoComplete={false}
              onChange={handleChange}
              classes={{ input: "input-padding" }}
              aria-describedby="outlined-weight-helper-text"
              style={{
                height: 40,
                width: "100%",
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <FormHelperText
              sm={{ mb: 2 }}
              style={{ color: "#000", marginLeft: 0 }}
            >
              To Date
            </FormHelperText>
            <OutlinedInput
              placeholder="Select Date"
              name="endDate"
              type="date"
              autoComplete={false}
              value={endDate}
              onChange={handleChange}
              classes={{ input: "input-padding" }}
              aria-describedby="outlined-weight-helper-text"
              style={{
                height: 40,
                width: "100%",
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl variant="outlined">
            <FormHelperText
              sm={{ mb: 2 }}
              style={{ color: "#000", marginLeft: 0 }}
            >
              Application ID
            </FormHelperText>
            <OutlinedInput
              placeholder="e.g.219841/2021"
              value={id}
              name="id"
              autoComplete={false}
              onChange={handleChange}
              classes={{ input: "input-padding" }}
              aria-describedby="outlined-weight-helper-text"
              style={{
                height: 40,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs>
          <Button
            variant="contained"
            style={{
              marginTop: 22,
              textTransform: "capitalize",
              height: 40,
              width: "100%",
            }}
            onClick={handleFilter}
          >
            Search Logger
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", boxShadow: 3, borderRadius: 4 }}>
        <DataGrid
          autoHeight
          getRowId={(i) => i.logId}
          rows={tableData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          loading={loading}
          style={{ borderRadius: 14 }}
          classes={{ footerContainer: "justifyCenter" }}
        />
      </Box>
    </Container>
  );
};
