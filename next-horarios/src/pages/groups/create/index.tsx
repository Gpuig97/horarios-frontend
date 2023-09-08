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

interface FormDataAreas {
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
  order: number;
  internal_code: string;
  observations: string;
  max_agents: number;
  area: number;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  sunday: any;
  monday_order: number;
  tuesday_order: number;
  wednesday_order: number;
  thursday_order: number;
  friday_order: number;
  saturday_order: number;
  sunday_order: number;

  view_monday_rest: any;
  view_tuesday_rest: any;
  view_wednesday_rest: any;
  view_thursday_rest: any;
  view_friday_rest: any;
  view_saturday_rest: any;
  view_sunday_rest: any;


  site: number;
  active: any;
  deleted: any;
};

interface Props {
  data: ElementData;
  areas: FormDataAreas[];

}


const FormLayouts = ({  areas = [], data }: Props) => {


  
  const router = useRouter();

  


  const [values, setValues] = useState<ElementData>({
    name: data.name,
    order: data.order,
    monday: data.monday,
    tuesday: data.tuesday,
    wednesday: data.wednesday,
    thursday: data.thursday,
    friday: data.friday,
    saturday: data.saturday,
    sunday: data.sunday,
    monday_order: data.monday_order,
    tuesday_order: data.tuesday_order,
    wednesday_order: data.wednesday_order,
    thursday_order: data.thursday_order,
    friday_order: data.friday_order,
    saturday_order: data.saturday_order,
    sunday_order: data.sunday_order,

    view_monday_rest: data.view_monday_rest,
    view_tuesday_rest: data.view_tuesday_rest,
    view_wednesday_rest: data.view_wednesday_rest,
    view_thursday_rest: data.view_thursday_rest,
    view_friday_rest: data.view_friday_rest,
    view_saturday_rest: data.view_saturday_rest,
    view_sunday_rest: data.view_sunday_rest,



    internal_code: data.internal_code,
    observations: data.observations,
    max_agents: data.max_agents,
    area: data.area,
    site: data.site,
    deleted: false,
    active: true,
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
      const res = await fetch(StrapiUrl+"groups/", {
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
        router.push("/groups/");
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
    if(prop=='order' || prop=='max_agents'){
      value = event.target.value.replace(/\D/g, '').substring(0, 3);
    }
    if(prop=='monday_order'  || prop=='tuesday_order' || prop=='wednesday_order' || prop=='friday_order' || prop=='saturday_order' || prop=='sunday_order' ){
      value = event.target.value.replace(/\D/g, '').substring(0, 2);
    }
    setValues({ ...values, [prop]: value })
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
            Crear Grupo
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
                    inputProps={{ maxLength: 3 }}
                  />
                </Grid>
                <Grid item xs={1.7}>
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
                <Grid item xs={1.7}>
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
                <Grid item xs={1.7}>
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
                <Grid item xs={1.7}>
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
                <Grid item xs={1.7}>
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
                <Grid item xs={1.7}>
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
                <Grid item xs={1.7}>
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
                

                <Grid item xs={1.7}>
                  <InputLabel >Orden / Lunes</InputLabel>
                  <OutlinedInput
                    label='Nombre'
                    value={values.monday_order}
                    id='monday_order'
                    onChange={handleChange('monday_order')}
                    type='number'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Orden / Martes</InputLabel>
                  <OutlinedInput
                    label='Nombre'
                    value={values.tuesday_order}
                    id='tuesday_order'
                    onChange={handleChange('tuesday_order')}
                    type='number'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Orden / Miércoles</InputLabel>
                  <OutlinedInput
                    label='Nombre'
                    value={values.wednesday_order}
                    id='wednesday_order'
                    onChange={handleChange('wednesday_order')}
                    type='number'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Orden / Jueves</InputLabel>
                  <OutlinedInput
                    label='Nombre'
                    value={values.thursday_order}
                    id='thursday_order'
                    onChange={handleChange('thursday_order')}
                    type='number'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Orden / Viernes</InputLabel>
                  <OutlinedInput
                    label='Nombre'
                    value={values.friday_order}
                    id='friday_order'
                    onChange={handleChange('friday_order')}
                    type='number'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Orden / Sábado</InputLabel>
                  <OutlinedInput
                    label='Nombre'
                    value={values.saturday_order}
                    id='saturday_order'
                    onChange={handleChange('saturday_order')}
                    type='number'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Orden / Domingo</InputLabel>
                  <OutlinedInput
                    label='Nombre'
                    value={values.sunday_order}
                    id='sunday_order'
                    onChange={handleChange('sunday_order')}
                    type='number'
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={1.7}>
                  <InputLabel >Ver Lunes Descansan</InputLabel>
                  <Select 
                    value = {values.view_monday_rest}
                    id='view_monday_rest'
                    onChange={handleChange('view_monday_rest')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Ver Martes Descansan</InputLabel>
                  <Select 
                    value = {values.view_tuesday_rest}
                    id='view_tuesday_rest'
                    onChange={handleChange('view_tuesday_rest')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Ver Miércoles Descansan</InputLabel>
                  <Select 
                    value = {values.view_wednesday_rest}
                    id='view_wednesday_rest'
                    onChange={handleChange('view_wednesday_rest')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Ver Jueves Descansan</InputLabel>
                  <Select 
                    value = {values.view_thursday_rest}
                    id='view_thursday_rest'
                    onChange={handleChange('view_thursday_rest')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Ver Viernes Descansan</InputLabel>
                  <Select 
                    value = {values.view_friday_rest}
                    id='view_friday_rest'
                    onChange={handleChange('view_friday_rest')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Ver Sábado Descansan</InputLabel>
                  <Select 
                    value = {values.view_saturday_rest}
                    id='view_saturday_rest'
                    onChange={handleChange('view_saturday_rest')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >Ver Domingo Descansan</InputLabel>
                  <Select 
                    value = {values.view_sunday_rest}
                    id='view_sunday_rest'
                    onChange={handleChange('view_sunday_rest')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
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
                  <InputLabel >Máx Agentes</InputLabel>
                  <OutlinedInput
                    value={values.max_agents}
                    id='max_agents'
                    onChange={handleChange('max_agents')}
                    type='number'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Área</InputLabel>
                  <Select 
                    value = {values.area}
                    id='area'
                    onChange={handleChange('area')}
                    fullWidth
                    required
                  >
                    <MenuItem key={0} value={0}>Seleccione un Área</MenuItem>
                    {areas.length > 0 ? (

                      areas.map((row) => (
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

  const resAreas = await fetch(StrapiUrl+"areas?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responseAreas = await resAreas.json();


  const areas: FormDataAreas[]=[];


  try {

    for (let i = 0; i < responseAreas.data.length; i++) {

      const row =       responseAreas.data[i];
      //console.log(row);
  
      areas.push(
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
const area_value = 0;
const max_agents_value = 1;
const order_value = 1;

const monday_value= true;
const tuesday_value= true;
const wednesday_value= true;
const thursday_value= true;
const friday_value= true;
const saturday_value= true;
const sunday_value= true;

const view_monday_rest_value= true;
const view_tuesday_rest_value= true;
const view_wednesday_rest_value= true;
const view_thursday_rest_value= true;
const view_friday_rest_value= true;
const view_saturday_rest_value= true;
const view_sunday_rest_value= true;

const monday_order_value= 1;
const tuesday_order_value= 2;
const wednesday_order_value= 3;
const thursday_order_value= 4;
const friday_order_value= 5;
const saturday_order_value= 6;
const sunday_order_value= 7;


 



  const data: ElementData={ 
    name: name_value, 
    order: order_value, 
    monday: monday_value,
    tuesday: tuesday_value,
    wednesday: wednesday_value,
    thursday: thursday_value,
    friday: friday_value,
    saturday: saturday_value,
    sunday: sunday_value,
    monday_order: monday_order_value,
    tuesday_order: tuesday_order_value,
    wednesday_order: wednesday_order_value,
    thursday_order: thursday_order_value,
    friday_order: friday_order_value,
    saturday_order: saturday_order_value,
    sunday_order: sunday_order_value,

    view_monday_rest: view_monday_rest_value,
    view_tuesday_rest: view_tuesday_rest_value,
    view_wednesday_rest: view_wednesday_rest_value,
    view_thursday_rest: view_thursday_rest_value,
    view_friday_rest: view_friday_rest_value,
    view_saturday_rest: view_saturday_rest_value,
    view_sunday_rest: view_sunday_rest_value,



    max_agents: max_agents_value,
    internal_code: internal_code_value, 
    observations: observations_value,
    area: area_value,
    site: site_id_logueado,
    deleted: false,
    active: true
  };

  

  return {
    props: {  areas, data },
  };
};

export default FormLayouts


