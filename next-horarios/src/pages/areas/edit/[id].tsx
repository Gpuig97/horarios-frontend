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
import StrapiUrl from 'src/confignl/StrapiUrl';
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { useRouter } from "next/router";
import axios from "axios";

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface ElementData {
  name: string;
  internal_code: string;
  observations: string;
};

interface Props {
  data: ElementData;
}


const FormLayouts = ({ data }: Props) => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [valuesMensajesAlert, setValuesMensajesAlert] = useState({
    mensaje: '',
    type: 'error',
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };



  const router = useRouter();

  
  const element_id= router.query.id;

  const [values, setValues] = useState<ElementData>({
    name: data.name,
    internal_code: data.internal_code,
    observations: data.observations
  })

  
  

  const updateElement = async (element: ElementData) =>
    await fetch(StrapiUrl+"areas/"+element_id, {
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
      if(values.name=='' || values.name==null){
        //alert("El Campo Nombre es requerido.");
        setValuesMensajesAlert({
          mensaje: 'El Campo Nombre es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);
      }else if (/[^a-zA-Z0-9]/.test(values.internal_code)) {
        //alert("El campo Código Interno no puede tener caracteres especiales.");
        setValuesMensajesAlert({
          mensaje: 'El campo Código Interno no puede tener caracteres especiales.',
          type: 'error',
        });
        setOpenSnackbar(true);
      }else{
        updateElement(values);
        setTimeout(() => {
          router.push("/areas");
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
          <Button component='a' size='small' variant='contained' sx={{ px: 5.5 }} onClick={() => router.push("/areas/")}>
            Regresar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5'>
            Actualizar Área
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
  const { id } = context.query;
  const res = await fetch(StrapiUrl+"areas/"+id);
  const response = await res.json();
  //console.log(response.data);
  let name_value = '';
  let internal_code_value = '';
  let observations_value = '';

  try {

    name_value= response.data.attributes.name;
    internal_code_value= response.data.attributes.internal_code;
    observations_value= response.data.attributes.observations;
  
  

  } catch (ex) {
    
  }


  const data: ElementData={ 
    name: name_value, 
    internal_code: internal_code_value, 
    observations: observations_value
  };

  

  return {
    props: { data },
  };
};

export default FormLayouts

