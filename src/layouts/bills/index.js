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
import billsTableData from "layouts/bills/data/billsTableData";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from "react";
import MDInput from "components/MDInput";

function Bills() {
  const [bills, setBill] = useState([]);
  const [status, setStatus] = useState("");
  const [phone,setPhone] = useState("");
  
  useEffect( ()=> {
    getData(status)
  },[])

  const getData = async(status) => {
    const response = await fetch('http://127.0.0.1:8000/api/bills?status='+status+'&phone='+phone);
    const billsResult = await response.json();
    setBill(billsResult.data);
  }

  const handleKeyChange = (event) => {
    setPhone(event.target.value);
  }

  const { columns, rows } = billsTableData(bills);

  return (
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
                <MDInput
                  placeholder="Tim kiem theo SĐT"
                  size="small"
                  onChange={handleKeyChange}
                />
                <Autocomplete
                  disableClearable
                  options={["pending","confirm"]}
                  size="small"
                  sx={{ width: "7rem" }}
                  onChange={(event, newValue) => {
                    setStatus(newValue);
                    getData(newValue);
                  }}
                  renderInput={(param) => (
                    <TextField
                      label='Trạng thái'
                      {...param}
                      InputProps={{
                        ...param.InputProps,
                        type: 'search'
                      }} />
                  )} />
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
  );
}

export default Bills;
