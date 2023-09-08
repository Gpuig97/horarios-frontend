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

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface FormDataGroups {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};


interface ElementData {
  order: number;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  sunday: any;
  site: any;
  active: any;
  deleted: any;
  group: number;

};

interface Props {
  data: ElementData;
  groups: FormDataGroups[];

}


const FormLayouts = ({ groups = [], data }: Props) => {

  const router = useRouter();

  

  const [values, setValues] = useState<ElementData>({
    order: data.order,
    group: data.group,
    monday: data.monday,
    tuesday: data.tuesday,
    wednesday: data.wednesday,
    thursday: data.thursday,
    friday: data.friday,
    saturday: data.saturday,
    sunday: data.sunday,
    site: data.site,
    active: data.active,
    deleted: data.deleted
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
      const res = await fetch(StrapiUrl+"group-and-grouped-day/", {
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
        router.push("/group-and-grouped-day/");
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
    let value = event.target.value;
    if(prop=='order'){
      value = event.target.value.replace(/\D/g, '').substring(0, 3);
    }
    setValues({ ...values, [prop]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(values.group==0 || values.group==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Grupo es requerido.',
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
            Crear Agrupación de Dias de descanso por Grupo
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <InputLabel >Grupo</InputLabel>
                  <Select 
                    value = {values.group}
                    id='group'
                    onChange={handleChange('group')}
                    fullWidth
                  >
                    <MenuItem value={0}>Seleccione un Grupo</MenuItem>
                    {groups.map(row => (
                      <MenuItem value={row.id} key={row.id}>{row.name}</MenuItem>

                      ))}
                  </Select>
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
                  <InputLabel >Lunes</InputLabel>
                  <Select 
                    value = {values.monday}
                    id='monday'
                    onChange={handleChange('monday')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Martes</InputLabel>
                  <Select 
                    value = {values.tuesday}
                    id='tuesday'
                    onChange={handleChange('tuesday')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Miércoles</InputLabel>
                  <Select 
                    value = {values.wednesday}
                    id='wednesday'
                    onChange={handleChange('wednesday')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Jueves</InputLabel>
                  <Select 
                    value = {values.thursday}
                    id='thursday'
                    onChange={handleChange('thursday')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Viernes</InputLabel>
                  <Select 
                    value = {values.friday}
                    id='friday'
                    onChange={handleChange('friday')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Sábado</InputLabel>
                  <Select 
                    value = {values.saturday}
                    id='saturday'
                    onChange={handleChange('saturday')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Domingo</InputLabel>
                  <Select 
                    value = {values.sunday}
                    id='sunday'
                    onChange={handleChange('sunday')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
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



  const resGroups = await fetch(StrapiUrl+"groups?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responseGroups = await resGroups.json();
  const groups: FormDataGroups[]=[];
  try {

    for (let i = 0; i < responseGroups.data.length; i++) {

      const row =       responseGroups.data[i];
      //console.log(row);
  
      groups.push(
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
  const order_value = 1;


  const monday_value= false;
  const tuesday_value= false;
  const wednesday_value= false;
  const thursday_value= false;
  const friday_value= false;
  const saturday_value= false;
  const sunday_value= false;
  const group_value = 0;

  


  const data: ElementData={ 
    order: order_value,
    monday: monday_value,
    tuesday: tuesday_value,
    wednesday: wednesday_value,
    thursday: thursday_value,
    friday: friday_value,
    saturday: saturday_value,
    sunday: sunday_value,
    site: site_id_logueado,
    group: group_value,
    active: true,
    deleted:false
  };

  

  return {
    props: { data,groups },
  };
};

export default FormLayouts

