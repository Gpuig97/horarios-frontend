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

interface FormDataSites {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface FormDatatypeOfHolidays {
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
  date: any;
  sites: any[];
  observations: string;
  type_of_holiday: number;
};

interface Props {
  typeOfHolidays: FormDatatypeOfHolidays[];
  data: ElementData;
  sites: FormDataSites[];


}


const FormLayouts = ({ sites = [], typeOfHolidays = [],data }: Props) => {


  
  const router = useRouter();

  const element_id= router.query.id;
  


  const [values, setValues] = useState<ElementData>({
    name: data.name,
    date: data.date,
    observations: data.observations,
    type_of_holiday: data.type_of_holiday,
    sites: data.sites,

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


  const updateElement = async (area: ElementData) =>
    await fetch(StrapiUrl+"holidays/"+element_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data:area}),

  });

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
      }else if(values.type_of_holiday==0 || values.type_of_holiday==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Tipo de Feriado es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);
      }else if(values.date=='' || values.date==null){
        setValuesMensajesAlert({
          mensaje: 'El Fecha es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);

      }else{
        updateElement(values);
        setTimeout(() => {
          router.push("/holidays");
        }, 1000);
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
            Actualizar Feriado
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
                  <InputLabel >Fecha</InputLabel>
                  <OutlinedInput
                    value={values.date}
                    id='date'
                    onChange={handleChange('date')}
                    type='date'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Tipo de Feriado</InputLabel>
                  <Select 
                    value = {values.type_of_holiday}
                    id='type_of_holiday'
                    onChange={handleChange('type_of_holiday')}
                    fullWidth
                    required
                  >
                    <MenuItem key={0} value={0}>Seleccione un Tipo de Feriado</MenuItem>
                    {typeOfHolidays.length > 0 ? (

                      typeOfHolidays.map((row) => (
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
                    Actualizar
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

  const res = await fetch(StrapiUrl+"type-of-holidays?populate=%2A&filters[deleted][$not]=true");
  const response = await res.json();
  const typeOfHolidays: FormDatatypeOfHolidays[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
    
        typeOfHolidays.push(
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


  const { id } = context.query;
  const res2 = await fetch(StrapiUrl+"holidays/"+id+"?populate=%2A");
  const response2 = await res2.json();
  //console.log(response2.data);
  let name_value = '';
  let date_value = '';
  let observations_value = '';
  let type_of_holiday_value = 0
  const array_site_edit:any[] = [];

  try {

    name_value= response2.data.attributes.name;
    date_value= response2.data.attributes.date;
    observations_value= response2.data.attributes.observations;
  
    type_of_holiday_value= response2.data.attributes.type_of_holiday.data.id;

    try{
      for (let i2 = 0; i2 < response2.data.attributes.sites.data.length; i2++) {

        const row2 =       response2.data.attributes.sites.data[i2];

        array_site_edit.push(row2.id);
        
      }
    }catch (ex) {

    }

  } catch (ex) {
    
  }


  const data: ElementData={ 
    name: name_value, 
    date: date_value, 
    sites:array_site_edit,
    observations: observations_value,
    type_of_holiday: type_of_holiday_value
  };

  

  return {
    props: { sites,typeOfHolidays,data },
  };
};

export default FormLayouts


