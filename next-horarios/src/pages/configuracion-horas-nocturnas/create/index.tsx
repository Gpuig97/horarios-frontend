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
  hora_desde: string;
  hora_hasta: string;
  active: any;
  deleted: any;
};

interface Props {
  data: ElementData;
}


const FormLayouts = ({   data }: Props) => {


  
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
    hora_desde: data.hora_desde,
    hora_hasta: data.hora_hasta,
    active: data.active,
    deleted:data.deleted
  })

  const updateElement = async (element: ElementData) => {
  
    try {
      const res = await fetch(StrapiUrl+"configuracion-horas-nocturnas/", {
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
        router.push("/configuracion-horas-nocturnas/");
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
    if(prop == 'hora_desde'){
      setValues({ ...values, [prop]: event.target.value+ ':00.000' })
    }else if(prop == 'hora_hasta'){
      setValues({ ...values, [prop]: event.target.value+ ':00.000' })
    }else{
      setValues({ ...values, [prop]: event.target.value })

    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(values.hora_desde=='' || values.hora_desde==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Hora Desde es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);
      }else if(values.hora_hasta=='' || values.hora_hasta==null){
        setValuesMensajesAlert({
          mensaje: 'El Campo Hora Hasta es requerido.',
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
            Crear Configuración Hora Nocturna
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <InputLabel >Hora Desde</InputLabel>
                  <OutlinedInput
                    value={values.hora_desde}
                    id='hora_desde'
                    onChange={handleChange('hora_desde')}
                    type='time'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel >Hora Hasta</InputLabel>
                  <OutlinedInput
                    value={values.hora_hasta}
                    id='hora_hasta'
                    onChange={handleChange('hora_hasta')}
                    type='time'
                    fullWidth
                    required
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




  
const hora_hasta_value = '';
const hora_desde_value = '';
const area_value = 0;



  const data: ElementData={ 
    hora_desde: hora_desde_value, 
    hora_hasta: hora_hasta_value,
    active: true,
    deleted: false
  };

  

  return {
    props: {   data },
  };
};

export default FormLayouts


