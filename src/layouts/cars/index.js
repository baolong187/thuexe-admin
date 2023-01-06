
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
import carsTableData from "layouts/cars/data/carsTableData";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from "react";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Cars() {
  const [cars, setCars] = useState([]);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [idCar,setIdCar] = useState();

  const handleChangeStatus = (event) => {
    setEditStatus(event.target.value);
  };
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
  const edit = (id, status) => {
    setEditStatus(status);
    setIdCar(id);
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSaveStatus = async () => {
    let item = {status: editStatus};
    console.log(item);
    let result= await fetch("http://127.0.0.1:8000/api/cars/"+idCar, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'accept':'application/json'
      },
          body: JSON.stringify(item)
      })
      result = await result.json();
      if(result.error_code == 0) {
        window.location.reload(true);
      }
  };
  const { columns, rows } = carsTableData(cars,edit);

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
                <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={0.5}>
                      <IconButton>
                        <AddCircleOutlineIcon onClick={()=>{navigate("/add-car")}}></AddCircleOutlineIcon>
                      </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                      <MDInput
                        placeholder="Tên xe"
                        size="small"
                        onChange={handleKeyChange}
                      />
                    </Grid>
                    <Grid item xs={1}>
                    <Autocomplete
                      disableClearable
                      options={["Đã đặt","Khả dụng"]}
                      size="small"
                      sx={{ width: "7rem" }}
                      onChange={(event, newValue) => {
                        if(newValue == "Đã đặt") {
                          setStatus("IA");
                          getData(name, "IA");
                        }else {
                          setStatus("A");
                          getData(name,"A");
                        }
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
                    </Grid>
                  </Grid>
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
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Sửa trạng thái</DialogTitle>
            <DialogContent p={2}>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={editStatus}
                // label="Status"
                onChange={handleChangeStatus}
                sx={{width:"10rem", height: "2rem"}}
              >
                <MenuItem value={"A"}>Khả dụng</MenuItem>
                <MenuItem value={"IA"}>Đã đặt</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <MDButton onClick={handleCloseDialog}>Hủy bỏ</MDButton>
              <MDButton onClick={handleSaveStatus}>Lưu</MDButton>
            </DialogActions>
          </Dialog>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Cars;
