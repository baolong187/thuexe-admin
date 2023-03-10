

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NavLink } from "react-router-dom";
import { blue } from '@mui/material/colors';

export default function data(bills) {
  console.log('data');
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
    let url = "/billing/"+item.id;
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
          {item.totalPrice} ??
          </MDTypography>
        ),
        confirmStatus: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {item.confirmStatus}
          </MDTypography>
        ),
        action: (
          <NavLink component="a" to={url} variant="caption" color="text" fontWeight="medium">
            <VisibilityIcon sx={{ color: blue[500] }} fontSize="medium" ></VisibilityIcon>
          </NavLink>
        )
    }
    if(item.paymentStatus == 'unpaid') {
      bills.paymentStatus = (
        <MDBox ml={-1}>
          <MDBadge badgeContent="ch??a thanh to??n" color="dark" variant="gradient" size="sm" />
        </MDBox>
      )
    }
    else {
      bills.paymentStatus = (
        <MDBox ml={-1}>
          <MDBadge badgeContent="???? thanh to??n" color="success" variant="gradient" size="sm" />
        </MDBox>
      )
    }
    return bills;
  })

  return {
    columns: [
      { Header: "Kh??ch h??ng", accessor: "customer", width: "10%", align: "center" },
      { Header: "Xe", accessor: "car", width: "5%", align: "left" },
      { Header: "Bi???n s???", accessor: "licensePlate", align: "center" },
      { Header: "H??nh th???c thanh to??n", accessor: "paymentType", align: "center" },
      { Header: "Tr???ng th??i thanh to??n", accessor: "paymentStatus", align: "center" },
      { Header: "Tr???ng th??i ch??? duy???t", accessor: "confirmStatus", align: "center" },
      { Header: "Ng??y thu?? xe", accessor: "startDate", align: "center" },
      { Header: "Ng??y tr??? xe", accessor: "endDate", align: "center" },
      { Header: "T???ng ti???n", accessor: "total", align: "center" },
      { Header: "H??nh ?????ng", accessor: "action", align: "center" },
    ],

    rows
  };
}
