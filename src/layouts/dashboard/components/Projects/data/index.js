import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useState, useEffect } from "react";

export default function data() {

  const [bills, setBill] = useState([]);
  useEffect(async ()=> {
    let billsResult = await fetch('http://127.0.0.1:8000/api/statistical/recent-bill');
    billsResult = await billsResult.json();
    setBill(billsResult.data);
  },[])
    
  const User = ({ name, phone }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{phone}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const rows = bills.map((item, index) => {
    let bills = {
        no: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {index+1}
          </MDTypography>
        ),
        customer: <User name={item.customer.fullname || "" } phone={item.customer.telephone || ""} />,
        car: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.car.name || ""}
          </MDTypography>
        ),
        licensePlate: (
          <MDTypography component="a" href={item.tag} variant="caption" color="text" fontWeight="medium">
            {item.car.licensePlate}
          </MDTypography>
        ),
        paymentType: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {item.paymentMethod}
          </MDTypography>
        ),
        startDate: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {item.startDate}
          </MDTypography>
        ),
        endDate: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {item.endDate}
          </MDTypography>
        ),
        total: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {item.totalPrice} đ
          </MDTypography>
        )
    }
    if(item.paymentStatus == 'pending') {
      bills.paymentStatus = (
        <MDBox ml={-1}>
          <MDBadge badgeContent="chưa thanh toán" color="dark" variant="gradient" size="sm" />
        </MDBox>
      )
    }
    else {
      bills.paymentStatus = (
        <MDBox ml={-1}>
          <MDBadge badgeContent="đã thanh toán" color="success" variant="gradient" size="sm" />
        </MDBox>
      )
    }
    return bills;
  })
  return {
    columns: [
      { Header: "Khách hàng", accessor: "customer", width: "10%", align: "center" },
      { Header: "Xe", accessor: "car", width: "5%", align: "left" },
      { Header: "Biển số", accessor: "licensePlate", align: "center" },
      { Header: "Hình thức thanh toán", accessor: "paymentType", align: "center" },
      { Header: "Trạng thái thanh toán", accessor: "paymentStatus", align: "center" },
      { Header: "Ngày thuê xe", accessor: "startDate", align: "center" },
      { Header: "Ngày trả xe", accessor: "endDate", align: "center" },
      { Header: "Tổng tiền", accessor: "total", align: "center" },

    ],

    rows: rows
  };
}
