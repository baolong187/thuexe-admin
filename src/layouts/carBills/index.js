/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import billsTableData from "layouts/carBills/data/billsTableData";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from "react";
import MDInput from "components/MDInput";
import { useParams } from "react-router-dom";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Stack } from "@mui/system";
import MDButton from "components/MDButton";
function CarBills() {
  const [bills, setBill] = useState([]);
  const [sd, setSd] = useState(dayjs());
  const [ed,setEd] = useState(dayjs());
  const {id} = useParams();
  // const [value, setValue] = useState(dayjs());
  const handleChangeSd = (newValue) => {
    setSd(newValue);
  };
  const handleChangeEd = (newValue) => {
    setEd(newValue);
  };
  useEffect( ()=> {
    const getData = async() => {
      const response = await fetch('http://127.0.0.1:8000/api/bills?carId='+id);
      const billsResult = await response.json();
      setBill(billsResult.data);
    }
    void getData()
  },[])

  const { columns, rows } = billsTableData(bills);

  const search = async()=>{
    console.log(sd.format('YYYY/MM/DD').toString())
    const response = await fetch('http://127.0.0.1:8000/api/bills?sd='+sd.format('YYYY/MM/DD').toString()+'&ed='+ed.format('YYYY/MM/DD').toString()+'&carId='+id);
    const billsResult = await response.json();
    setBill(billsResult.data);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Danh sách hóa đơn
                  </MDTypography>
                </MDBox>
                <MDBox pt={2}>
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <Stack direction="row" spacing={2}>
                      <DesktopDatePicker
                        label="Ngày thuê"
                        inputFormat="MM/DD/YYYY"
                        value={sd}
                        onChange={handleChangeSd}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <DesktopDatePicker
                        label="Ngày trả"
                        inputFormat="MM/DD/YYYY"
                        value={ed}
                        onChange={handleChangeEd}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <MDButton variant="contained" size="small" onClick={search}>Tìm kiếm</MDButton>
                    </Stack>
                  </MDBox>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={true}
                    showTotalEntries={true}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </LocalizationProvider>
  );
}

export default CarBills;
