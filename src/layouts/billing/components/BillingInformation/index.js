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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BillingInformation() {
  const [bill, setBill] = useState([]);
  const [customer,setCustomer] = useState({});
  const [car, setCar] = useState({});
  const {id} = useParams();
  const [edit,setEdit] = useState("false");

  useEffect(async ()=> {
    let billResult = await fetch('http://127.0.0.1:8000/api/bills/'+id);
    billResult = await billResult.json();
    setBill(billResult.data);
    setCustomer(billResult.data.customer);
    setCar(billResult.data.car);
    if(billResult.data.confirmStatus=="pending" || billResult.data.paymentStatus=="unpaid")
    {
      setEdit("true");
    }
  },[])
  
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            customer={customer}
            car={car}
            licensePlate={car.licensePlate}
            paymentType={bill.paymentMethod=="Cash"? "Tiền mặt": "online"}
            pStatus = {bill.paymentStatus=="paid"? "Đã thanh toán": "Chưa thanh toán"}
            cfStatus={bill.confirmStatus=="confirm"? "Đã duyệt": "Chưa duyệt"}
            startDate={bill.startDate}
            endDate={bill.endDate}
            total={bill.totalPrice + " đ"}
            noGutter={true}
            id={bill.id}
            edit={edit}
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
