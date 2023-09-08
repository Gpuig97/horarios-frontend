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

interface FormDataCities {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface FormDataTypeOfAgents {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface FormDataCoordinators {
  id: number;
  names: string;
  surnames: string;
};

interface ElementData {
  names: string;
  surnames: string;
  identification: string;
  email: string;
  phone: string;
  observations: string;
  area: number;
  city: number;
  type_of_agent: number;
  coordinator: number;
};

interface Props {
  data: ElementData;
  areas: FormDataAreas[];
  cities: FormDataCities[];
  typeOfAgents: FormDataTypeOfAgents[];
  coordinators: FormDataCoordinators[];

}


const FormLayouts = ({  areas = [],cities = [],typeOfAgents = [],coordinators = [], data }: Props) => {


  
  const router = useRouter();

  const element_id= router.query.id;

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
    observations: data.observations,
    identification: data.identification,
    email: data.email,
    phone: data.phone,
    city: data.city,
    type_of_agent: data.type_of_agent,
    coordinator: data.coordinator,
    area: data.area
  })


  const updateElement = async (element: ElementData) =>
    await fetch(StrapiUrl+"agents/"+element_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data:element}),

  });

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
      }else if(values.type_of_agent==0 || values.type_of_agent==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Tipo de Agente es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);
      }else{
        updateElement(values);
        setTimeout(() => {
          router.push("/agents");
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
            Actualizar Agente
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
                  <InputLabel >Tipo de Agente</InputLabel>
                  <Select 
                    value = {values.type_of_agent}
                    id='type_of_agent'
                    onChange={handleChange('type_of_agent')}
                    fullWidth
                  >
                    <MenuItem value={0}>Seleccione un tipo de Agente</MenuItem>
                    {typeOfAgents.map(row => (
                      <MenuItem value={row.id} key={row.id}>{row.name}</MenuItem>

                      ))}
                  </Select>
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
                  <InputLabel >Ciudad</InputLabel>
                  <Select 
                    value = {values.city}
                    id='city'
                    onChange={handleChange('city')}
                    fullWidth
                  >
                    <MenuItem value={0}>Seleccione una Ciudad</MenuItem>
                    {cities.map(row => (
                      <MenuItem value={row.id} key={row.id}>{row.name}</MenuItem>

                      ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Coordinador</InputLabel>
                  <Select 
                    value = {values.coordinator}
                    id='coordinator'
                    onChange={handleChange('coordinator')}
                    fullWidth
                  >
                    <MenuItem value={0}>Seleccione un Coordinador</MenuItem>
                    {coordinators.map(row => (
                      <MenuItem value={row.id} key={row.id}>{row.names} {row.surnames}</MenuItem>

                      ))}
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

  const resCities = await fetch(StrapiUrl+"cities?populate=%2A&filters[deleted][$not]=true");
  const responseCities = await resCities.json();
  const cities: FormDataCities[]=[];

  const resCoordinators = await fetch(StrapiUrl+"coordinators?populate=%2A&filters[deleted][$not]=true");
  const responseCoordinators = await resCoordinators.json();
  const coordinators: FormDataCoordinators[]=[];

  const restypeOfAgents = await fetch(StrapiUrl+"type-of-agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responsetypeOfAgents = await restypeOfAgents.json();
  const typeOfAgents: FormDataTypeOfAgents[]=[];

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

  try {

    for (let i = 0; i < responseCities.data.length; i++) {

      const row =       responseCities.data[i];
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

    for (let i = 0; i < responseCoordinators.data.length; i++) {

      const row =       responseCoordinators.data[i];
      //console.log(row);
  
      coordinators.push(
          {
            id: row.id,
            names: row.attributes.names,
            surnames: row.attributes.surnames
          }
        );
    }
  
  

  } catch (ex) {
    
  }


  try {

    for (let i = 0; i < responsetypeOfAgents.data.length; i++) {

      const row =       responsetypeOfAgents.data[i];
      //console.log(row);
  
      typeOfAgents.push(
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
  const res2 = await fetch(StrapiUrl+"agents/"+id+"?populate=%2A");
  const response2 = await res2.json();
  //console.log(response2.data);
  let names_value = '';
  let surnames_value = '';
  let identification_value = '';
  let email_value = '';
  let phone_value = '';
  let observations_value = '';
  let area_value = 0;
  let type_of_agent_value = 0;
  let city_value = 0;
  let coordinator_value = 0;

  try {

    names_value= response2.data.attributes.names;
    surnames_value  = response2.data.attributes.surnames;
    identification_value= response2.data.attributes.identification;
    email_value= response2.data.attributes.email;
    phone_value= response2.data.attributes.phone;
    observations_value= response2.data.attributes.observations;
    area_value= response2.data.attributes.area.data.id;

    type_of_agent_value= response2.data.attributes.type_of_agent.data.id;
    city_value= response2.data.attributes.city.data.id;
    coordinator_value= response2.data.attributes.coordinator.data.id;

  } catch (ex) {
    
  }



  const data: ElementData={ 
    names: names_value, 
    surnames: surnames_value,
    identification: identification_value, 
    email: email_value, 
    phone: phone_value, 
    observations: observations_value,
    area: area_value,
    city: city_value,
    type_of_agent: type_of_agent_value,
    coordinator: coordinator_value
  };

  

  return {
    props: {  areas,cities, coordinators,typeOfAgents, data },
  };
};

export default FormLayouts


