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
import Autocomplete from '@mui/material/Autocomplete';

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import StrapiUrl from 'src/confignl/StrapiUrl';
import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';


interface FormDataGroups {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface FormDataPlaces {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface FormDataRulesDays {
  id: number;
  name: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface FormDataRulesHours {
  id: number;
  name: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface FormDataAgents {
  id: number;
  names: string;
  surnames: string;
};

interface ElementData {
  name: string;
  order: number;
  available: any;
  observations: string;
  group: number;
  place: number;
  rules_day: number;
  rules_hour: number;
  agents: number;
  site: any;
  active: any;
  deleted: any;
};

interface Props {
  data: ElementData;
  groups: FormDataGroups[];
  places: FormDataPlaces[];
  rulesDays: FormDataRulesDays[];
  rulesHours: FormDataRulesHours[];
  agents: FormDataAgents[];

}


const FormLayouts = ({  groups = [],places = [],rulesDays = [],rulesHours = [],agents = [], data }: Props) => {


  
  const router = useRouter();
  


  const [values, setValues] = useState<ElementData>({
    name: data.name,
    order: data.order,
    available: data.available,
    observations: data.observations,
    place: data.place,
    rules_day: data.rules_day,
    rules_hour: data.rules_hour,
    agents: data.agents,
    group: data.group,
    site: data.site,
    active: data.active,
    deleted:data.deleted
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
      const res = await fetch(StrapiUrl+"groups-and-agents/", {
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
        router.push("/groups-and-agents/");
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

  const handleChangeAutocomplete = (prop: keyof Element, value: number)  => {
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
            Crear Grupo y Agente
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
                  <InputLabel >Disponible</InputLabel>
                  <Select 
                    value = {values.available}
                    id='available'
                    onChange={handleChange('available')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
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
                  <InputLabel >Sucursal</InputLabel>
                  <Select 
                    value = {values.place}
                    id='place'
                    onChange={handleChange('place')}
                    fullWidth
                    required
                  >
                    <MenuItem key={0} value={0}>Seleccione una Sucursal</MenuItem>
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
                  <InputLabel >Reglas por Día</InputLabel>
                  <Select 
                    value = {values.rules_day}
                    id='rules_day'
                    onChange={handleChange('rules_day')}
                    fullWidth
                  >
                    <MenuItem value={0}>Seleccione una Regla por Día</MenuItem>
                    {rulesDays.map(row => (
                      <MenuItem value={row.id} key={row.id}>{row.name}</MenuItem>

                      ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Reglas por Rango de Hora</InputLabel>
                  <Select 
                    value = {values.rules_hour}
                    id='rules_hour'
                    onChange={handleChange('rules_hour')}
                    fullWidth
                  >
                    <MenuItem value={0}>Seleccione una Regla por Hora</MenuItem>
                    {rulesHours.map(row => (
                      <MenuItem value={row.id} key={row.id}>{row.name}</MenuItem>

                      ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Agente</InputLabel>
                  <Autocomplete
                    id="agents"
                    options={agents}
                    autoHighlight
                    getOptionLabel={(option) => option.names+" "+option.surnames}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Buscar..."
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                    onChange={(e, value) => handleChangeAutocomplete('agents', value?.id)}
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

  const resPlaces = await fetch(StrapiUrl+"places?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responsePlaces = await resPlaces.json();
  const places: FormDataPlaces[]=[];

  const resAgents = await fetch(StrapiUrl+"agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responseAgents = await resAgents.json();
  const agents: FormDataAgents[]=[];

  const resrulesDays = await fetch(StrapiUrl+"rules-days?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responserulesDays = await resrulesDays.json();
  const rulesDays: FormDataRulesDays[]=[];

  
  const resrulesHours = await fetch(StrapiUrl+"rules-hours?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responserulesHours = await resrulesHours.json();
  const rulesHours: FormDataRulesHours[]=[];

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
            publishedAt: row.attributes.publishedAt
          }
        );
    }
  
  

  } catch (ex) {
    
  }

  try {

    for (let i = 0; i < responseAgents.data.length; i++) {

      const row =       responseAgents.data[i];
      //console.log(row);
  
      agents.push(
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

    for (let i = 0; i < responserulesDays.data.length; i++) {

      const row =       responserulesDays.data[i];
      //console.log(row);
  
      rulesDays.push(
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

  try {

    for (let i = 0; i < responserulesHours.data.length; i++) {

      const row =       responserulesHours.data[i];
      //console.log(row);
  
      rulesHours.push(
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


  const name_value = '';
  const available_value = true;
  const observations_value = '';
  const order_value = 1;

  const group_value = 0;
  const rules_day_value = 0;
  const rules_hour_value = 0;
  const place_value = 0;
  const agents_value = 0;




  const data: ElementData={ 
    name: name_value, 
    order: order_value, 
    available: available_value,
    observations: observations_value,
    group: group_value,
    place: place_value,
    rules_day: rules_day_value,
    rules_hour: rules_hour_value,
    agents: agents_value,
    site: site_id_logueado,
    active: true,
    deleted: false
  };

  

  return {
    props: {  groups,places, agents,rulesDays,rulesHours, data },
  };
};

export default FormLayouts


