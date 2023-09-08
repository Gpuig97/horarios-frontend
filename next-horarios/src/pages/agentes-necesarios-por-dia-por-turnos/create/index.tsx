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




interface FormDataShifts {
  id: number;
  time_from: any;
  time_to: any;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface ElementData {
  agentes_necesarios: number;
  date: any;
  observations: string;
  shift: number;
  site: any;
  active: any;
  deleted:any;
};

interface Props {
  shifts: FormDataShifts[];
  data: ElementData;

}


const FormLayouts = ({ shifts = [],data }: Props) => {


  
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
    date: data.date,
    agentes_necesarios: data.agentes_necesarios,
    observations: data.observations,
    shift: data.shift,
    site: data.site,
    active: data.active,
    deleted: data.deleted
  })

  const updateElement = async (element: ElementData) => {
  
    try {
      const res = await fetch(StrapiUrl+"agentes-necesarios-por-dia-por-turnos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data:element}),
  
      });
  
      const response = await res.json();
  
      if(res.status==200){
        router.push("/agentes-necesarios-por-dia-por-turnos/");
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
      if(values.date!='' && values.date!=null){
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
            Crear Agentes Necesarios por Fecha y Turno
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <InputLabel>Fecha</InputLabel>
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
                  <InputLabel >Agentes Necesarios</InputLabel>
                  <OutlinedInput
                    value={values.agentes_necesarios}
                    id='agentes_necesarios'
                    onChange={handleChange('agentes_necesarios')}
                    type='number'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Turno</InputLabel>
                  <Select 
                    value = {values.shift}
                    id='shift'
                    onChange={handleChange('shift')}
                    fullWidth
                    required
                  >
                    <MenuItem key={0} value={0}>Seleccione un Turno</MenuItem>
                    {shifts.length > 0 ? (

                      shifts.map((row) => (
                        <MenuItem key={row.id} value={row.id}>{row.time_from} - {row.time_to}</MenuItem>

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

  const res = await fetch(StrapiUrl+"shifts?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const response = await res.json();
  const shifts: FormDataShifts[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
    
        shifts.push(
            {
              id: row.id,
              time_from: row.attributes.time_from,
              time_to: row.attributes.time_to,
              observations: row.attributes.observations,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt
            }
          );
      }
    
    

  } catch (ex) {
    
  }


 
  const agentes_necesarios_value = 1;
  const date_value = '';
  const observations_value = '';
  const shift_value = 0;

  


  const data: ElementData={ 
    agentes_necesarios: agentes_necesarios_value, 
    date: date_value, 
    observations: observations_value,
    shift: shift_value,
    site: site_id_logueado,
    active: true,
    deleted: false
  };

  

  return {
    props: { shifts,data },
  };
};

export default FormLayouts


