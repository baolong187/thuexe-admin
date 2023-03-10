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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

function Bill({ customer, car, paymentType, pStatus, cfStatus, startDate, endDate, total, id, edit }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [open, setOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [confirmStatus, setConfirmStatus] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if(paymentStatus==""||confirmStatus=="") {
      alert("Vui l??ng nh???p ????? th??ng tin");
    }
    else { 
      let item={paymentStatus, confirmStatus};
      let result= await fetch("http://127.0.0.1:8000/api/bills/"+id, {
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
    }
  }
  return (
    <MDBox
      component="div"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {customer.fullname}
          </MDTypography>

          {edit=="true" &&(
            <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
              <MDButton variant="text" color={darkMode ? "white" : "dark"}  onClick={handleClickOpen}>
                <Icon>edit</Icon>&nbsp;Ch???nh s???a
              </MDButton>
            </MDBox>
          )}
         
        </MDBox>
        <ListItem>
          <ListItemText
            primary="S??? ??i???n tho???i: "
            secondary={customer.telephone}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="?????a ch???: "
            secondary={customer.address}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Xe: "
            secondary={car.name}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Bi???n s???: "
            secondary={car.licensePlate}
          />
        </ListItem>
        <ImageList sx={{ width: '50%', height: '50%' }} >
            <ImageListItem>
              <img
                src={car.image64}
                loading="lazy"
              />
            </ImageListItem>
        </ImageList>
        <ListItem>
          <ListItemText
            primary="H??nh th???c thanh to??n: "
            secondary={paymentType}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Tr???ng th??i thanh to??n: "
            secondary={pStatus}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Tr???ng th??i ch??? duy???t: "
            secondary={ 
              cfStatus=="???? duy???t"?
                <MDTypography style={{  color: "green" }}>{cfStatus}</MDTypography>
              :
              <MDTypography style={{  color: "red" }}>{cfStatus}</MDTypography>
            }
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Ng??y thu??: "
            secondary={startDate}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Ng??y tr???: "
            secondary={endDate}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="T???ng s??? ti???n: "
            secondary={total}
          />
        </ListItem>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ch???nh s???a h??a ????n</DialogTitle>
          <DialogContent>
            <Autocomplete 
              disableClearable
              options={["Ch??a thanh to??n","???? thanh to??n"]}
              size="small"
              sx={{ width: "14rem",  padding: "1rem" }}
              onChange={(event, newValue) => {
                setPaymentStatus(newValue=="Ch??a thanh to??n"?"unpaid":"paid");
              }}
              renderInput={(param) => (
                <TextField
                  label='Tr???ng th??i thanh to??n'
                  {...param}
                  InputProps={{
                    ...param.InputProps,
                    type: 'search'
                  }} />
              )} />
            <Autocomplete
              disableClearable
              options={["???? duy???t","Ch??a duy???t"]}
              size="small"
              sx={{ width: "14rem", padding: "1rem" }}
              onChange={(event, newValue) => {
                setConfirmStatus(newValue=="???? duy???t"?"confirm":"pending");
              }}
              renderInput={(param) => (
                <TextField
                  label='Tr???ng th??i ch??? duy???t'
                  {...param}
                  InputProps={{
                    ...param.InputProps,
                    type: 'search'
                  }} />
              )} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>H???y b???</Button>
            <Button onClick={handleSave}>L??u</Button>
          </DialogActions>
        </Dialog>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill

// // Typechecking props for the Bill
// Bill.propTypes = {
//   name: PropTypes.string.isRequired,
//   company: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   vat: PropTypes.string.isRequired,
//   noGutter: PropTypes.bool,
// };

export default Bill;
