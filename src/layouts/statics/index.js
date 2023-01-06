
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
import carsTableData from "layouts/statics/data/carsTableData";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from "react";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Statics() {
  const [cars, setCars] = useState([]);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("")
  useEffect(async ()=> {
    getData()
  },[])
  let navigate = useNavigate();
  const getData = async(name="" ,status="") => {
    let carsResult = await fetch('http://127.0.0.1:8000/api/cars?name='+name+'&status='+status);
    carsResult = await carsResult.json();
    setCars(carsResult.data);
  }
  const handleKeyChange = (event) => {
    setName(event.target.value);
    getData(event.target.value, status);
  }

  const { columns, rows } = carsTableData(cars);

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
                  Danh sách xe
                </MDTypography>
              </MDBox>
              <MDBox pt={2}>
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

export default Statics;
