

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NavLink } from "react-router-dom";
import { blue } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
export default function data(cars, edit) {

  const rows = cars.map((item, index) => {

    let url = "/cars/"+item.id;
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
        color: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {item.color}
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
            {item.price.toLocaleString()} đ/ngày
          </MDTypography>
        ),
        action: (
          <IconButton onClick={()=>edit(item.id, item.status)}>
            <EditIcon sx={{ color: blue[500] }} fontSize="medium" ></EditIcon>
          </IconButton>
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
      { Header: "Màu sắc", accessor: "color", align: "center" },
      { Header: "Số ghế", accessor: "seat", align: "center" },
      { Header: "Hãng xe", accessor: "brand", align: "center" },
      { Header: "Hạng", accessor: "category", align: "center" },
      { Header: "Trạng thái", accessor: "status", align: "center" },
      { Header: "Giá thuê/ngày", accessor: "price", align: "center" },
      { Header: "Hành động", accessor: "action", align: "center" },
    ],

    rows: rows
  };
}
