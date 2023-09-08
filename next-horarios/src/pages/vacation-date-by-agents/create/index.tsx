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

interface FormDataAgents {
  id: number;
  names: string;
  surnames: string;
};

interface ElementData {
  date_from: any;
  date_to: any;
  days_before_to_remind: number;
  observations: string;
  agents: number;
  site: any;
  active: any;
  deleted: any;
};

interface Props {
  agents: FormDataAgents[];
  data: ElementData;

}


const FormLayouts = ({ agents = [], data }: Props) => {


  
  const router = useRouter();
  


  const [values, setValues] = useState<ElementData>({
    date_from: data.date_from,
    date_to: data.date_to,
    days_before_to_remind: data.days_before_to_remind,
    observations: data.observations,
    agents: data.agents,
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
      const res = await fetch(StrapiUrl+"vacation-date-by-agents/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data:element}),
  
      });
  
      const response = await res.json();
  
      if(res.status==200){
        router.push("/vacation-date-by-agents/");
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
      if(values.date_from!='' && values.date_from!=null){
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
            Crear Vacaciones por Agente
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <InputLabel >Fecha desde</InputLabel>
                  <OutlinedInput
                    value={values.date_from}
                    id='date_from'
                    onChange={handleChange('date_from')}
                    type='date'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Fecha Hasta</InputLabel>
                  <OutlinedInput
                    value={values.date_to}
                    id='date_to'
                    onChange={handleChange('date_to')}
                    type='date'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >N° de días para recordatorio</InputLabel>
                  <OutlinedInput
                    value={values.days_before_to_remind}
                    id='days_before_to_remind'
                    onChange={handleChange('days_before_to_remind')}
                    type='number'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Agente</InputLabel>
                  <Select 
                    value = {values.agents}
                    id='agents'
                    onChange={handleChange('agents')}
                    fullWidth
                    required
                  >
                    <MenuItem key={0} value={0}>Seleccione un Agente</MenuItem>
                    {agents.length > 0 ? (

                      agents.map((row) => (
                        <MenuItem key={row.id} value={row.id}>{row.names} {row.surnames}</MenuItem>

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

  const res = await fetch(StrapiUrl+"agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const response = await res.json();
  const agents: FormDataAgents[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
    
        agents.push(
            {
              id: row.id,
              names: row.attributes.names,
              surnames: row.attributes.surnames,
            }
          );
      }
    
    

  } catch (ex) {
    
  }


 
  const date_from_value = '';
  const date_to_value = '';
  const observations_value = '';
  const agent_value = 0
  const days_before_to_remind_value = 0;

 


  const data: ElementData={ 
    date_from: date_from_value, 
    date_to: date_to_value, 
    observations: observations_value,
    days_before_to_remind: days_before_to_remind_value,
    agents: agent_value,
    site: site_id_logueado,
    active: true,
    deleted: false
  };

  

  return {
    props: { agents,data },
  };
};

export default FormLayouts


