

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NavLink } from "react-router-dom";
import { blue } from '@mui/material/colors';

export default function data(cars) {

  const rows = cars.map((item, index) => {
    let url = "/car/"+item.id+"/bills";
    let car = {
        no: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {index+1}
          </MDTypography>
        ),
        name: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.name || ""}
          </MDTypography>
        ),
        licensePlate: (
          <MDTypography component="a" href={item.tag} variant="caption" color="text" fontWeight="medium">
            {item.licensePlate}
          </MDTypography>
        ),
        seat: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {item.seatNumber}
          </MDTypography>
        ),
        brand: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {item.branch}
          </MDTypography>
        ),
        category: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {item.category}
          </MDTypography>
        ),
        price: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {item.revenue.toLocaleString()} đ
          </MDTypography>
        ),
        action: (
          <NavLink component="a" to={url} variant="caption" color="text" fontWeight="medium">
            <VisibilityIcon sx={{ color: blue[500] }} fontSize="medium" ></VisibilityIcon>
          </NavLink>
        )
    }
    if(item.status == 'IA') {
      car.status = (
        <MDBox ml={-1}>
          <MDBadge badgeContent="Đã đặt" color="dark" variant="gradient" size="sm" />
        </MDBox>
      )
    }
    else {
      car.status = (
        <MDBox ml={-1}>
          <MDBadge badgeContent="Khả dụng" color="success" variant="gradient" size="sm" />
        </MDBox>
      )
    }
    return car;
  })

  return {
    columns: [
      { Header: "Tên", accessor: "name", width: "10%", align: "center" },
      { Header: "Biển số", accessor: "licensePlate", align: "center" },
      { Header: "Số ghế", accessor: "seat", align: "center" },
      { Header: "Hãng xe", accessor: "brand", align: "center" },
      { Header: "Hạng", accessor: "category", align: "center" },
      { Header: "Trạng thái", accessor: "status", align: "center" },
      { Header: "Doanh thu", accessor: "price", align: "center" },
      { Header: "Hành động", accessor: "action", align: "center" },
    ],

    rows: rows
  };
}
