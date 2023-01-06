import { useState, useEffect, forwardRef } from "react";
import PhotoCamera from '@mui/icons-material/PhotoCamera';// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import PropTypes, { element } from 'prop-types';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import IconButton from '@mui/material/IconButton';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { NumericFormat } from "react-number-format";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MDButton from "components/MDButton";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="đ "
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function AddCar() {
  const[name,setName] = useState("");
  const[licensePlate,setlicensePlate] = useState("");
  const[color,setColor] = useState("");
  const [image64, setImage64] = useState();
  const [preview, setPreview] = useState()
  const [selectedFile, setSelectedFile] = useState();
  const [values, setValues] = useState({
    numberformat: '500000',
  });
  const [price, setPrice] = useState(500000);
  const [seat, setSeat] = useState('4');
  const [isError, setisError] = useState(false);
  const [error, setError] = useState("");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [brandId, setBrandId] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState();

  const onChangeFile = (event) => {
    const imageFile = event.target.files[0];
    setSelectedFile(imageFile);
    if (!imageFile) {
      setisError(true);
      setError("Vui lòng chọn ảnh")
      return false;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png|)$/)) {
      setisError(true);
      setError("Ảnh không phù hợp")
      return false;
    }
    getBase64(imageFile);
  };

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }  

  useEffect(async()=> {
    let brandResult = await fetch('http://127.0.0.1:8000/api/brands/');
    brandResult = await brandResult.json();
    setBrands(brandResult.data);
    setBrand(brandResult.data[0].name);
    setBrandId(brandResult.data[0].id)

    let categoryResult = await fetch('http://127.0.0.1:8000/api/categories/');
    categoryResult = await categoryResult.json();
    setCategories(categoryResult.data);
    setCategory(categoryResult.data[0].name);
    setCategoryId(categoryResult.data[0].id);
  },[])

  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleChangeMoney = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setPrice(event.target.value);
  };
  const seats = [
    {
      value: '4',
      label: '4'
    },
    {
      value: '7',
      label: '7',
    },
  ];

  const handleClose = (event, reason) => {
    setisError(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveBrand = async () => {
    let item = {name: brand};
    let result= await fetch("http://127.0.0.1:8000/api/brands/", {
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

  const handleSubmit= async (event)=>{
    event.preventDefault();
    if(name=="" || licensePlate=="" || color=="" || image64==null)
    {
      setisError(true);
      setError("Vui lòng nhập đầy đủ thông tin")
    }
    else {
      let item={name,color,licensePlate,seatNumber:parseInt(seat),price,image64,categoryId: categoryId, branchId: brandId};
      let result= await fetch("http://127.0.0.1:8000/api/cars/", {
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
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">

          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">Thêm xe</MDTypography>
              </MDBox>
              <MDBox p={2}>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3} p={2}>
                    <Grid item xs={12} sm={6} lg={3}>
                      <FormControl variant="standard">
                        <TextField label="Tên xe" color="secondary" onChange={(e)=>setName(e.target.value)} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                      <FormControl variant="standard">
                        <TextField label="Biển số" color="secondary" onChange={(e)=>setlicensePlate(e.target.value)}/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                      <FormControl variant="standard">
                        <TextField label="Màu sắc" color="secondary" onChange={(e)=>setColor(e.target.value)}/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                      <FormControl variant="standard">
                        <TextField
                          label="Giá thuê/ngày"
                          value={values.numberformat}
                          onChange={handleChangeMoney}
                          name="numberformat"
                          id="formatted-numberformat-input"
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                          }}
                          variant="standard"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} p={2}>
                    <Grid item xs={12} sm={6} lg={3}>
                      <TextField
                        select
                        label="Hạng"
                        sx={{width: "12.5rem"}}
                        value={category}
                        onChange={(e)=>{
                          const categoryId = categories.find(element => element.name == e.target.value);
                          setCategoryId(categoryId.id);
                          setCategory(e.target.value)
                        }}
                        SelectProps={{
                          native: true,
                        }}
                      >
                        {categories.map((option) => (
                        <option key={categories.name} value={categories.id}>
                          {option.name}
                        </option>
                      ))}        
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                      <TextField
                        select
                        label="Số ghế"
                        sx={{width: "12.5rem"}}
                        value={seat}
                        onChange={(e)=>{
                          setSeat(e.target.value)
                        }}
                        SelectProps={{
                          native: true,
                        }}
                      >
                        {seats.map((option) => (
                        <option key={seats.value} value={seats.value}>
                          {option.label}
                        </option>
                      ))}        
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                      <TextField
                          select
                          label="Hãng xe"
                          sx={{width: "12.5rem"}}
                          value={brand}
                          onChange={(e)=>{
                            const brandId = brands.find(element => element.name == e.target.value);
                            setBrandId(brandId.id)
                            setBrand(e.target.value)
                          }}
                          SelectProps={{
                            native: true,
                          }}
                        >
                          {brands.map((option) => (
                          <option key={brands.name} value={brands.id}>
                            {option.name}
                          </option>
                        ))}
                      </TextField>      
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                      <IconButton onClick={()=>{setOpenDialog(true)}}>
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} p={2}>
                    <Grid item xs={12} sm={6} lg={3}>
                      <IconButton color="info" aria-label="upload picture" component="label" >
                        <input
                          id='selectImage'
                          type="file"
                          accept="image/*"
                          multiple
                          hidden
                          onChange={onChangeFile}
                        />
                        <PhotoCamera />
                      </IconButton>
                    </Grid>
                    {selectedFile && 
                      <>
                        <ImageList sx={{ width: '70%', height: '70%' }} >
                          <ImageListItem>
                            <img
                              src={preview}
                              loading="lazy"
                            />
                          </ImageListItem>
                        </ImageList> 
                      </>
                     }                  
                  </Grid>
                  <Grid container spacing={3} p={2}>
                    <Grid item xs={12} sm={6} lg={3}>
                      <MDButton 
                        color="info"
                        variant="outlined" 
                        type="submit"
                        sx={{height: "2rem"}}
                        >Lưu
                      </MDButton>
                    </Grid>
                  </Grid>
                </form>

              </MDBox>
            </Card>
            <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            </Snackbar>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Thêm hãng xe</DialogTitle>
              <DialogContent p={2}>
                <TextField label="Tên" color="secondary" onChange={(e)=>setBrand(e.target.value)} sx={{margin:"1rem"}} />
              </DialogContent>
              <DialogActions>
                <MDButton onClick={handleCloseDialog}>Hủy bỏ</MDButton>
                <MDButton onClick={handleSaveBrand}>Lưu</MDButton>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AddCar;
