// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
// ** React Imports
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { useRouter } from "next/router";
import axios from "axios";
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import StrapiUrl from 'src/confignl/StrapiUrl';
import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';


interface FormDataCities {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface FormDatasites {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface ElementData {
  name: string;
  internal_code: string;
  observations: string;
  city: number;
  site: number;
  active: any;
  deleted: any;
};

interface Props {
  cities: FormDataCities[];
  data: ElementData;
  sites: FormDatasites[];

}


const FormLayouts = ({ cities = [], sites = [], data }: Props) => {


  
  const router = useRouter();

  


  const [values, setValues] = useState<ElementData>({
    name: data.name,
    internal_code: data.internal_code,
    observations: data.observations,
    city: data.city,
    site: data.site,
    deleted: false,
    active: true
  })

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [valuesMensajesAlert, setValuesMensajesAlert] = useState({
    mensaje: '',
    type: 'error',
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const updateElement = async (element: ElementData) => {
  
    try {
      const res = await fetch(StrapiUrl+"places/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data:element}),
  
      });
  
      const response = await res.json();
  
      if(res.status==200){
        setValuesMensajesAlert({
          mensaje: 'Registro creado con éxito.',
          type: 'success',
        });
        setOpenSnackbar(true);
        router.push("/places/");
      }else{
        setValuesMensajesAlert({
          mensaje: 'Error. '+response.error.message,
          type: 'error',
        });
        setOpenSnackbar(true);
      }
  
    } catch (error) {
      //console.log(error);
    }
    
  };


  const handleChange = (prop: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(values.name=='' || values.name==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Nombre es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);
      }else if(values.city==0 || values.city==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Ciudad es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);
      }else if (/[^a-zA-Z0-9]/.test(values.internal_code)) {
        setValuesMensajesAlert({
          mensaje: 'El campo Código Interno no puede tener caracteres especiales.',
          type: 'error',
        });
        setOpenSnackbar(true);

      }else{
        updateElement(values);
      }
    } catch (error) {
      //console.log(error);
    }
  };


  return (
    <DatePickerWrapper>
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message={valuesMensajesAlert.mensaje}
        severity={valuesMensajesAlert.type}
      />
      <Grid container spacing={6}>
      <Grid>
          <Button component='a' size='small' variant='contained' sx={{ px: 5.5 }} onClick={() => router.back()}>
            Regresar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5'>
            Nueva Sucursal
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <InputLabel >Nombre</InputLabel>
                  <OutlinedInput
                    label='Nombre'
                    value={values.name}
                    id='name'
                    onChange={handleChange('name')}
                    type='text'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Código Interno</InputLabel>
                  <OutlinedInput
                    label='Código Interno'
                    value={values.internal_code}
                    id='internal_code'
                    onChange={handleChange('internal_code')}
                    type='text'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Ciudad</InputLabel>
                  <Select 
                    value = {values.city}
                    id='city'
                    onChange={handleChange('city')}
                    fullWidth
                    required
                  >
                    <MenuItem key={0} value={0}>Seleccione una Ciudad</MenuItem>
                    {cities.length > 0 ? (

                      cities.map((row) => (
                        <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>

                      ))

                      ):(

                        <MenuItem key={0} value={0}></MenuItem>

                      )}

                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Canal</InputLabel>
                  <Select 
                    value = {values.site}
                    id='site'
                    onChange={handleChange('site')}
                    fullWidth
                    required
                  >
                    <MenuItem key={0} value={0}>Seleccione un Canal</MenuItem>
                    {sites.length > 0 ? (

                      sites.map((row) => (
                        <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>

                      ))

                      ):(

                        <MenuItem key={0} value={0}></MenuItem>

                      )}

                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Observaciones</InputLabel>
                  <OutlinedInput
                    label='Observaciones'
                    value={values.observations} inputProps={{ maxLength: 1000 }}
                    id='observations'
                    onChange={handleChange('observations')}
                    type='text'
                    fullWidth
                    multiline
                    minRows={3}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' size='large'>
                    Crear
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
        </Grid>
       
      </Grid>
    </DatePickerWrapper>
  )
}

export const getServerSideProps = async (context) => {
  const site_id_logueado = getCookie('site_id', context);
  const user_id_logueado = getCookie('user_id', context);


  const res = await fetch(StrapiUrl+"cities?populate=%2A&filters[deleted][$not]=true");
  const response = await res.json();

  const ressites = await fetch(StrapiUrl+"sites?populate=%2A&filters[deleted][$not]=true&filters[id][$eq]="+site_id_logueado);
  const responsesites = await ressites.json();


  const cities: FormDataCities[]=[];
  const sites: FormDatasites[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
    
        cities.push(
            {
              id: row.id,
              name: row.attributes.name,
              internal_code: row.attributes.internal_code,
              observations: row.attributes.observations,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt
            }
          );
      }
    
    

  } catch (ex) {
    
  }

  try {

    for (let i = 0; i < responsesites.data.length; i++) {

      const row =       responsesites.data[i];
      //console.log(row);
  
      sites.push(
          {
            id: row.id,
            name: row.attributes.name,
            internal_code: row.attributes.internal_code,
            observations: row.attributes.observations,
            createdAt: row.attributes.createdAt,
            updatedAt: row.attributes.updatedAt,
            publishedAt: row.attributes.publishedAt
          }
        );
    }
  
  

} catch (ex) {
  
}



  const name_value = '';
  const internal_code_value = '';
  const observations_value = '';
  const city_value = 0;
  const site_value = 0;




  const data: ElementData={ 
    name: name_value, 
    internal_code: internal_code_value, 
    observations: observations_value,
    city: city_value,
    site: site_value,
    deleted: false,
    active: true
  };

  

  return {
    props: { cities, sites, data },
  };
};

export default FormLayouts


