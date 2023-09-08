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
};

interface Props {
  data: ElementData;
  areas: FormDataAreas[];

}


const FormLayouts = ({  areas = [], data }: Props) => {


  
  const router = useRouter();

  const element_id= router.query.id;
  


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
    area: data.area
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
    await fetch(StrapiUrl+"groups/"+element_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data:area}),

  });

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
        setTimeout(() => {
          router.push("/groups");
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
        <Grid item xs={12}>
          <Typography variant='h5'>
            Actualizar Grupo
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
                  <InputLabel >Orden Prioridad / Lunes</InputLabel>
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
                  <InputLabel >Orden Prioridad / Martes</InputLabel>
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
                  <InputLabel >Orden Prioridad / Miércoles</InputLabel>
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
                  <InputLabel >Orden Prioridad / Jueves</InputLabel>
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
                  <InputLabel >Orden Prioridad / Viernes</InputLabel>
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
                  <InputLabel >Orden Prioridad / Sábado</InputLabel>
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
                  <InputLabel >Orden Prioridad / Domingo</InputLabel>
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


  const { id } = context.query;
  const res2 = await fetch(StrapiUrl+"groups/"+id+"?populate=%2A");
  const response2 = await res2.json();
  //console.log(response2.data);
  let name_value = '';
  let order_value = 1;
  let internal_code_value = '';
  let observations_value = '';
  let area_value = 0;
  let max_agents_value = 1;

  let monday_value= true;
  let tuesday_value= true;
  let wednesday_value= true;
  let thursday_value= true;
  let friday_value= true;
  let saturday_value= true;
  let sunday_value= true;

  let view_monday_rest_value= true;
  let view_tuesday_rest_value= true;
  let view_wednesday_rest_value= true;
  let view_thursday_rest_value= true;
  let view_friday_rest_value= true;
  let view_saturday_rest_value= true;
  let view_sunday_rest_value= true;

  let monday_order_value= 1;
  let tuesday_order_value= 2;
  let wednesday_order_value= 3;
  let thursday_order_value= 4;
  let friday_order_value= 5;
  let saturday_order_value= 6;
  let sunday_order_value= 7;

  try {

    name_value= response2.data.attributes.name;
    order_value= response2.data.attributes.order;

    max_agents_value  = response2.data.attributes.max_agents;
    internal_code_value= response2.data.attributes.internal_code;
    observations_value= response2.data.attributes.observations;
    area_value= response2.data.attributes.area.data.id;

    monday_value= response2.data.attributes.monday;
    tuesday_value= response2.data.attributes.tuesday;
    wednesday_value= response2.data.attributes.wednesday;
    thursday_value= response2.data.attributes.thursday;
    friday_value= response2.data.attributes.friday;
    saturday_value= response2.data.attributes.saturday;
    sunday_value= response2.data.attributes.sunday;


    view_monday_rest_value= response2.data.attributes.view_monday_rest;
    view_tuesday_rest_value= response2.data.attributes.view_tuesday_rest;
    view_wednesday_rest_value= response2.data.attributes.view_wednesday_rest;
    view_thursday_rest_value= response2.data.attributes.view_thursday_rest;
    view_friday_rest_value= response2.data.attributes.view_friday_rest;
    view_saturday_rest_value= response2.data.attributes.view_saturday_rest;
    view_sunday_rest_value= response2.data.attributes.view_sunday_rest;

    monday_order_value= response2.data.attributes.monday_order;
    tuesday_order_value= response2.data.attributes.tuesday_order;
    wednesday_order_value= response2.data.attributes.wednesday_order;
    thursday_order_value= response2.data.attributes.thursday_order;
    friday_order_value= response2.data.attributes.friday_order;
    saturday_order_value= response2.data.attributes.saturday_order;
    sunday_order_value= response2.data.attributes.sunday_order;

  } catch (ex) {
    
  }



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

    view_monday_rest: view_monday_rest_value,
    view_tuesday_rest: view_tuesday_rest_value,
    view_wednesday_rest: view_wednesday_rest_value,
    view_thursday_rest: view_thursday_rest_value,
    view_friday_rest: view_friday_rest_value,
    view_saturday_rest: view_saturday_rest_value,
    view_sunday_rest: view_sunday_rest_value,


    monday_order: monday_order_value,
    tuesday_order: tuesday_order_value,
    wednesday_order: wednesday_order_value,
    thursday_order: thursday_order_value,
    friday_order: friday_order_value,
    saturday_order: saturday_order_value,
    sunday_order: sunday_order_value,
    max_agents: max_agents_value,
    internal_code: internal_code_value, 
    observations: observations_value,
    area: area_value
  };

  

  return {
    props: {  areas, data },
  };
};

export default FormLayouts


