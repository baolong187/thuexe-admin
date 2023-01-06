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


// react-router-dom components
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");

  let navigate = useNavigate();

  useEffect(()=> {
      if(localStorage.getItem('employee-info')) {
        navigate("/dashboard")
      }
  },[])

   async function login(){
      let item={username, password};
      let result= await fetch("http://127.0.0.1:8000/api/employee/login", {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
               'accept':'application/json'
          },
          body: JSON.stringify(item)
          
      });
      
      result = await result.json();

      if(result.error_code !== 0) {
          alert('Sai mật khẩu hoặc tài khoản');
      }
      else {
          localStorage.setItem("employee-info",JSON.stringify(result.data));
          navigate("/dashboard");
      } 
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Đăng nhập
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="username" label="Username" fullWidth onChange={(e)=>setUsername(e.target.value)}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth onChange={(e)=>setPassword(e.target.value)}/>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={login}>
                Đăng nhập
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
