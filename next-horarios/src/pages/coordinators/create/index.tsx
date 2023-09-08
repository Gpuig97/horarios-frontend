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

import StrapiUrl from 'src/confignl/StrapiUrl';
import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';


interface FormDataSites {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface ElementData {
  names: string;
  surnames: string;
  username: string;
  identification: string;
  email: string;
  phone: string;
  observations: string;
  sites: any[];
  rol: number;
  active: any;
  deleted: any
};

interface RolsData {
  id: number;
  name: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface Props {
  data: ElementData;
  sites: FormDataSites[];
  rols: RolsData[];


}


const FormLayouts = ({  rols = [],  sites = [], data }: Props) => {


  
  const router = useRouter();

  

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [valuesMensajesAlert, setValuesMensajesAlert] = useState({
    mensaje: '',
    type: 'error',
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const [values, setValues] = useState<ElementData>({
    names: data.names,
    surnames: data.surnames,
    username: data.username,
    observations: data.observations,
    identification: data.identification,
    email: data.email,
    phone: data.phone,
    active: data.active,
    deleted: data.deleted,
    sites: data.sites,
    rol: data.rol
  })
  const updateElement = async (element: ElementData) => {
  
    try {
      const res = await fetch(StrapiUrl+"coordinators/", {
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
        router.push("/coordinators/");
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
      if(values.names=='' || values.names==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Nombres es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);
      }else if(values.surnames=='' || values.surnames==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Apellidos es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);
      }else if(values.rol==0 || values.rol==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Rol es requerido.',
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
            Crear Coordinador
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <InputLabel >Nombres</InputLabel>
                  <OutlinedInput
                    value={values.names}
                    id='names'
                    onChange={handleChange('names')}
                    type='text'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Apellidos</InputLabel>
                  <OutlinedInput
                    value={values.surnames}
                    id='surnames'
                    onChange={handleChange('surnames')}
                    type='text'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Usuario</InputLabel>
                  <OutlinedInput
                    value={values.username}
                    id='username'
                    onChange={handleChange('username')}
                    type='text'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Identificacion</InputLabel>
                  <OutlinedInput
                    value={values.identification}
                    id='identification'
                    onChange={handleChange('identification')}
                    type='text'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Email</InputLabel>
                  <OutlinedInput
                    value={values.email}
                    id='email'
                    onChange={handleChange('email')}
                    type='email'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Celular</InputLabel>
                  <OutlinedInput
                    value={values.phone}
                    id='phone'
                    onChange={handleChange('phone')}
                    type='text'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Rol</InputLabel>
                  <Select 
                    value = {values.rol}
                    id='rol'
                    onChange={handleChange('rol')}
                    fullWidth
                    required
                  >
                    {rols.length > 0 ? (

                      rols.map((row) => (
                        <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>

                      ))

                      ):(

                        <MenuItem key={0} value={0}></MenuItem>

                      )}

                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Canales</InputLabel>
                  <Select 
                    multiple
                    value = {values.sites}
                    id='sites'
                    onChange={handleChange('sites')}
                    fullWidth
                    required
                  >
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


  const resSites = await fetch(StrapiUrl+"sites?populate=%2A&filters[deleted][$not]=true");
  const responseSites = await resSites.json();


  const sites: FormDataSites[]=[];


  try {

    for (let i = 0; i < responseSites.data.length; i++) {

      const row =       responseSites.data[i];
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


  
  const names_value = '';
  const surnames_value = '';
  const identification_value = '';
  const email_value = '';
  const phone_value = '';
  const username_value = '';
  const observations_value = '';
  const area_value = [];

  const resRols = await fetch(StrapiUrl+"rols?populate=%2A&filters[deleted][$not]=true");
  const responseRols = await resRols.json();


  const rols: RolsData[]=[];


  try {

    for (let i = 0; i < responseRols.data.length; i++) {

      const row =       responseRols.data[i];
      //console.log(row);
  
      rols.push(
          {
            id: row.id,
            name: row.attributes.name,
            observations: row.attributes.observations,
            createdAt: row.attributes.createdAt,
            updatedAt: row.attributes.updatedAt,
            publishedAt: row.attributes.publishedAt
          }
        );
    }
  
  

  } catch (ex) {
    
  }



  const data: ElementData={ 
    names: names_value, 
    surnames: surnames_value,
    username: username_value,
    identification: identification_value, 
    email: email_value, 
    phone: phone_value, 
    observations: observations_value,
    sites: area_value,
    rol: 0,
    active: true,
    deleted: false
  };

  

  return {
    props: {  sites, data ,rols },
  };
};

export default FormLayouts


