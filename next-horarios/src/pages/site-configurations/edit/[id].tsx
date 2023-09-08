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
import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface ElementData {
  
  turno_velada_por_orden: any;
 
};

interface Props {
  data: ElementData;
}


const FormLayouts = ({ data }: Props) => {

  const router = useRouter();

  
  const element_id= router.query.id;

  const [values, setValues] = useState<ElementData>({
    
    turno_velada_por_orden: data.turno_velada_por_orden,
    
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
    await fetch(StrapiUrl+"site-configurations/"+element_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data:element}),

  });

  
  const handleChange = (prop: keyof ElementData) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(values.turno_velada_por_orden!=null){
        updateElement(values);
        setTimeout(() => {
          router.push("/site-configurations");
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
            Actualizar Configuración del Sitio
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                
                <Grid item xs={12}>
                  <InputLabel >Turno de Velada por Orden</InputLabel>
                  <Select 
                    value = {values.turno_velada_por_orden}
                    id='turno_velada_por_orden'
                    onChange={handleChange('turno_velada_por_orden')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
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
  const { id } = context.query;
  const res = await fetch(StrapiUrl+"site-configurations/"+id);
  const response = await res.json();
  //console.log(response.data);
 
  let turno_velada_por_orden_value= false;
  

  try {

    
  
    turno_velada_por_orden_value= response.data.attributes.turno_velada_por_orden;
    

  

  } catch (ex) {
    
  }


  const data: ElementData={ 
    
    turno_velada_por_orden: turno_velada_por_orden_value,
    
  };

  

  return {
    props: { data },
  };
};

export default FormLayouts

