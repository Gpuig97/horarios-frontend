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

import StrapiUrl from 'src/confignl/StrapiUrl';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface ElementData {
  name: string;
  order: number;
  time_from: any;
  time_to: any;
  observations: string;
  skip_order_group: any;
  type_rule: any;
  places: any[];

};

interface FormDataPlaces {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  city: any;
  site: any;

};

interface Props {
  data: ElementData;
  places: FormDataPlaces[];

}


const FormLayouts = ({ places = [], data }: Props) => {

  const router = useRouter();

  
  const element_id= router.query.id;

  const [values, setValues] = useState<ElementData>({
    name: data.name,
    order: data.order,
    time_from: data.time_from,
    skip_order_group: data.skip_order_group,
    type_rule: data.type_rule,
    time_to: data.time_to,
    places: data.places,
    observations: data.observations,
    
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

  const updateElement = async (element: ElementData) =>
    await fetch(StrapiUrl+"rules-hours/"+element_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data:element}),

  });

  
  const handleChange = (prop: keyof ElementData) => (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if(prop=='order'){
      value = event.target.value.replace(/\D/g, '').substring(0, 3);
    }

    if(prop == 'time_from'  || prop == 'time_to'){
      setValues({ ...values, [prop]: value+ ':00.000' })
    }else{
      setValues({ ...values, [prop]: value })

    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(values.name!='' && values.name!=null){
        updateElement(values);
        setTimeout(() => {
          router.push("/rules-hours");
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
            Actualizar Regla por Rango de Hora
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
                  <InputLabel >Orden / Prioridad</InputLabel>
                  <OutlinedInput
                    value={values.order}
                    id='order'
                    onChange={handleChange('order')}
                    type='number'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Lugares</InputLabel>
                  <Select 
                    multiple
                    value = {values.places}
                    id='places'
                    onChange={handleChange('places')}
                    fullWidth
                    required
                  >
                    {places.length > 0 ? (

                      places.map((row) => (
                        <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>

                      ))

                      ):(

                        <MenuItem key={0} value={0}></MenuItem>

                      )}

                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Tipo Regla</InputLabel>
                  <Select 
                    value = {values.type_rule}
                    id='type_rule'
                    onChange={handleChange('type_rule')}
                    fullWidth
                  >
                    <MenuItem value={'Rango'}>Rango</MenuItem>
                    <MenuItem value={'Exacto'}>Exacto</MenuItem>
                    <MenuItem value={'Inicio'}>Inicio</MenuItem>

                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Saltar Orden Grupo</InputLabel>
                  <Select 
                    value = {values.skip_order_group}
                    id='skip_order_group'
                    onChange={handleChange('skip_order_group')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Hora Desde</InputLabel>
                  <OutlinedInput
                    value={values.time_from}
                    id='time_from'
                    onChange={handleChange('time_from')}
                    type='time'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Hora Hasta</InputLabel>
                  <OutlinedInput
                    value={values.time_to}
                    id='time_to'
                    onChange={handleChange('time_to')}
                    type='time'
                    fullWidth
                    required
                  />
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
  const user_id_logueado = getCookie('user_id', context);


  const { id } = context.query;
  const res = await fetch(StrapiUrl+"rules-hours/"+id);
  const response = await res.json();


  


  const resPlaces = await fetch(StrapiUrl+"places?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responsePlaces = await resPlaces.json();
  const places: FormDataPlaces[]=[];

  try {

      for (let i = 0; i < responsePlaces.data.length; i++) {

        const row =       responsePlaces.data[i];
        //console.log(row);
    
        places.push(
            {
              id: row.id,
              name: row.attributes.name,
              internal_code: row.attributes.internal_code,
              observations: row.attributes.observations,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt,
              city: row.attributes.city.data.attributes.name,
              site: row.attributes.site.data.attributes.name

            }
          );
      }
    
    
    

  } catch (ex) {
    
  }


  //console.log(response.data);
  let name_value = '';
  let time_from_value = '';
  let time_to_value = '';
  let observations_value = '';
  let order_value = 1;

  let skip_order_group_value = false;
  let type_rule_value = 'Rango';

  const array_place_edit:any[] = [];

  try {

    name_value= response.data.attributes.name;
    order_value= response.data.attributes.order;
    time_from_value= response.data.attributes.time_from;
    time_to_value= response.data.attributes.time_to;
    skip_order_group_value =response.data.attributes.skip_order_group;
    type_rule_value =response.data.attributes.type_rule;

    observations_value= response.data.attributes.observations;

    try{
      for (let i2 = 0; i2 < response.data.attributes.places.data.length; i2++) {

        const row2 =       response.data.attributes.places.data[i2];

        array_place_edit.push(row2.id);
        
      }
    }catch (ex) {

    }
  
    

  

  } catch (ex) {
    
  }


  const data: ElementData={ 
    name: name_value, 
    type_rule: type_rule_value,
    skip_order_group: skip_order_group_value,
    order: order_value,
    time_from: time_from_value, 
    time_to: time_to_value, 
    places:array_place_edit,
    observations: observations_value,
    
  };

  

  return {
    props: { places,data },
  };
};

export default FormLayouts

