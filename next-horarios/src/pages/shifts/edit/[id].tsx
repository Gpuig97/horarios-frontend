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

interface FormDataPlaces {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface FormDataTypesOfShifts {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface TypeOfAgentData {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface ElementData {
  name: any;
  time_from: any;
  time_to: any;
  lunch_time: number;
  monday_num_agents: number;
  tuesday_num_agents: number;
  wednesday_num_agents: number;
  thursday_num_agents: number;
  friday_num_agents: number;
  saturday_num_agents: number;
  sunday_num_agents: number;

  observations: string;
  velada: any;
  color: string;
  horas_extras: any;
  soporte: any;
  place: number;
  type_of_shift: number;
  type_of_agents: any[];

};

interface Props {
  places: FormDataPlaces[];
  data: ElementData;
  typesOfShifts: FormDataTypesOfShifts[];
  type_of_agents: TypeOfAgentData[];


}


const FormLayouts = ({ type_of_agents = [], places = [], typesOfShifts = [], data }: Props) => {


  
  const router = useRouter();

  const element_id= router.query.id;
  


  const [values, setValues] = useState<ElementData>({
    name: data.name,

    time_from: data.time_from,
    time_to: data.time_to,
    lunch_time: data.lunch_time,
    monday_num_agents: data.monday_num_agents,

    tuesday_num_agents: data.tuesday_num_agents,
    wednesday_num_agents: data.wednesday_num_agents,
    thursday_num_agents: data.thursday_num_agents,
    friday_num_agents: data.friday_num_agents,
    saturday_num_agents: data.saturday_num_agents,
    sunday_num_agents: data.sunday_num_agents,




    observations: data.observations,
    type_of_shift: data.type_of_shift,
    velada: data.velada,
    color: data.color,
    horas_extras: data.horas_extras,
    soporte: data.soporte,
    place: data.place,
    type_of_agents: data.type_of_agents

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
    await fetch(StrapiUrl+"shifts/"+element_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data:area}),

  });

  const handleChange = (prop: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    if(prop == 'time_from'  || prop == 'time_to'){
      setValues({ ...values, [prop]: event.target.value+ ':00.000' })
    }else{
      setValues({ ...values, [prop]: event.target.value })

    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(values.time_from=='' || values.time_from==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Hora Desde es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);
      }else if(values.time_to=='' || values.time_to==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Hora Hasta es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);

      }else{
        updateElement(values);
        setTimeout(() => {
          router.push("/shifts");
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
            Actualizar Turno
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
                    value={values.name}
                    id='name'
                    onChange={handleChange('name')}
                    type='text'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Hora desde</InputLabel>
                  <OutlinedInput
                    label='Hora Desde'
                    value={values.time_from}
                    id='time_from'
                    onChange={handleChange('time_from')}
                    type='time'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Hora Hasta</InputLabel>
                  <OutlinedInput
                    label='Hora Hasta'
                    value={values.time_to}
                    id='time_to'
                    onChange={handleChange('time_to')}
                    type='time'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Minutos de Almuerzo</InputLabel>
                  <OutlinedInput
                    label='Minutos de Almuerzo'
                    value={values.lunch_time}
                    id='lunch_time'
                    onChange={handleChange('lunch_time')}
                    type='number'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >N. Agentes Lunes</InputLabel>
                  <OutlinedInput
                    value={values.monday_num_agents}
                    id='monday_num_agents'
                    onChange={handleChange('monday_num_agents')}
                    type='number'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >N. Agentes Martes</InputLabel>
                  <OutlinedInput
                    value={values.tuesday_num_agents}
                    id='tuesday_num_agents'
                    onChange={handleChange('tuesday_num_agents')}
                    type='number'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >N. Agentes Miércoles</InputLabel>
                  <OutlinedInput
                    value={values.wednesday_num_agents}
                    id='wednesday_num_agents'
                    onChange={handleChange('wednesday_num_agents')}
                    type='number'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >N. Agentes Jueves</InputLabel>
                  <OutlinedInput
                    value={values.thursday_num_agents}
                    id='thursday_num_agents'
                    onChange={handleChange('thursday_num_agents')}
                    type='number'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >N. Agentes Viernes</InputLabel>
                  <OutlinedInput
                    value={values.friday_num_agents}
                    id='friday_num_agents'
                    onChange={handleChange('friday_num_agents')}
                    type='number'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >N. Agentes Sábado</InputLabel>
                  <OutlinedInput
                    value={values.saturday_num_agents}
                    id='saturday_num_agents'
                    onChange={handleChange('saturday_num_agents')}
                    type='number'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1.7}>
                  <InputLabel >N. Agentes Domingo</InputLabel>
                  <OutlinedInput
                    value={values.sunday_num_agents}
                    id='sunday_num_agents'
                    onChange={handleChange('sunday_num_agents')}
                    type='number'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Color</InputLabel>
                  <OutlinedInput
                    value={values.color}
                    id='color'
                    onChange={handleChange('color')}
                    type='color'
                    style={{width: 150 + 'px'}} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Sucursal</InputLabel>
                  <Select 
                    value = {values.place}
                    id='place'
                    onChange={handleChange('place')}
                    fullWidth
                    required
                  >
                    <MenuItem key={0} value={0}>Seleccione una Sucursal</MenuItem>
                    {places.map(row => (
                      <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>

                      ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Tipo de Turno</InputLabel>
                  <Select 
                    value = {values.type_of_shift}
                    id='type_of_shift'
                    onChange={handleChange('type_of_shift')}
                    fullWidth
                    required
                  >
                    <MenuItem key={0} value={0}>Seleccione un tipo de turno</MenuItem>
                    {typesOfShifts.map(row => (
                      <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>

                      ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Turno de Velada</InputLabel>
                  <Select 
                    value = {values.velada}
                    id='velada'
                    onChange={handleChange('velada')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Turno de Horas Extras</InputLabel>
                  <Select 
                    value = {values.horas_extras}
                    id='horas_extras'
                    onChange={handleChange('horas_extras')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Turno de Cuenta de Soporte</InputLabel>
                  <Select 
                    value = {values.soporte}
                    id='soporte'
                    onChange={handleChange('soporte')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Tipos de Agentes</InputLabel>
                  <Select 
                    multiple
                    value = {values.type_of_agents}
                    id='type_of_agents'
                    onChange={handleChange('type_of_agents')}
                    fullWidth
                    required
                  >
                    {type_of_agents.length > 0 ? (

                      type_of_agents.map((row) => (
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

  const res = await fetch(StrapiUrl+"places?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const response = await res.json();
  const places: FormDataPlaces[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
    
        places.push(
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


  const resTypesOfShifts = await fetch(StrapiUrl+"type-of-shifts?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responseTypesOfShifts = await resTypesOfShifts.json();
  const typesOfShifts: FormDataTypesOfShifts[]=[];

  try {

      for (let i = 0; i < responseTypesOfShifts.data.length; i++) {

        const row =       responseTypesOfShifts.data[i];
        //console.log(row);
    
        typesOfShifts.push(
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


  const resTypeOfAgents = await fetch(StrapiUrl+"type-of-agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responseTypeOfAgents = await resTypeOfAgents.json();
  const type_of_agents: TypeOfAgentData[]=[];

  try {

      for (let i = 0; i < responseTypeOfAgents.data.length; i++) {

        const row =       responseTypeOfAgents.data[i];
        //console.log(row);
    
        type_of_agents.push(
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
  const res2 = await fetch(StrapiUrl+"shifts/"+id+"?populate=%2A");
  const response2 = await res2.json();
  //console.log(response2.data);
  let name_value = '';
  let time_from_value = '';
  let time_to_value = '';
  let lunch_time_value = 0;
  let monday_num_agents_value = 0;
  let tuesday_num_agents_value = 0;
  let wednesday_num_agents_value = 0;
  let thursday_num_agents_value = 0;
  let friday_num_agents_value = 0;
  let saturday_num_agents_value = 0;
  let sunday_num_agents_value = 0;

  let velada_value= false;
  let horas_extras_value= false;
  let observations_value = '';
  let place_value = 0;
  let type_of_shift_value = 0;
  let soporte_value = false;
  let color_value = '';

  const array_type_of_agent_edit:any[] = [];


  try {

    name_value= response2.data.attributes.name;

    time_from_value= response2.data.attributes.time_from;
    time_to_value= response2.data.attributes.time_to;
    lunch_time_value= response2.data.attributes.lunch_time;
    monday_num_agents_value= response2.data.attributes.monday_num_agents;

    tuesday_num_agents_value= response2.data.attributes.tuesday_num_agents;
    wednesday_num_agents_value= response2.data.attributes.wednesday_num_agents;
    thursday_num_agents_value= response2.data.attributes.thursday_num_agents;
    friday_num_agents_value= response2.data.attributes.friday_num_agents;
    saturday_num_agents_value= response2.data.attributes.saturday_num_agents;
    sunday_num_agents_value= response2.data.attributes.sunday_num_agents;

    velada_value= response2.data.attributes.velada;
    color_value= response2.data.attributes.color;

    horas_extras_value= response2.data.attributes.horas_extras;
    soporte_value= response2.data.attributes.soporte;
    observations_value= response2.data.attributes.observations;
    place_value= response2.data.attributes.place.data.id;
    type_of_shift_value= response2.data.attributes.type_of_shift.data.id;

    try{
      for (let i2 = 0; i2 < response2.data.attributes.type_of_agents.data.length; i2++) {

        const row2 =       response2.data.attributes.type_of_agents.data[i2];

        array_type_of_agent_edit.push(row2.id);
        
      }
    }catch (ex) {

    }

  } catch (ex) {
    
  }


  const data: ElementData={ 
    name: name_value, 

    time_from: time_from_value, 
    time_to: time_to_value, 
    lunch_time: lunch_time_value,
    monday_num_agents: monday_num_agents_value,
    
    tuesday_num_agents: tuesday_num_agents_value,
    wednesday_num_agents: wednesday_num_agents_value,
    thursday_num_agents: thursday_num_agents_value,
    friday_num_agents: friday_num_agents_value,
    saturday_num_agents: saturday_num_agents_value,
    sunday_num_agents: sunday_num_agents_value,

    velada: velada_value,
    color: color_value,
    horas_extras: horas_extras_value,
    soporte: soporte_value,
    observations: observations_value,
    place: place_value,
    type_of_shift: type_of_shift_value,
    type_of_agents:array_type_of_agent_edit


  };

  

  return {
    props: { type_of_agents, places, typesOfShifts, data },
  };
};

export default FormLayouts


