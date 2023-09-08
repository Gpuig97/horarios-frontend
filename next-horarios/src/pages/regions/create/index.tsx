// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
// ** React Imports
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useRouter } from "next/router";


import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import StrapiUrl from 'src/confignl/StrapiUrl';
import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';

interface Element {
  name: string;
  internal_code: string;
  observations: string;
  active: any;
  deleted: any;
};

const FormLayoutsBasic = () => {

  const router = useRouter();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [valuesMensajesAlert, setValuesMensajesAlert] = useState({
    mensaje: '',
    type: 'error',
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const createElement = async (element: Element) => {
  
    try {
      const res = await fetch(StrapiUrl+"regions/", {
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
        router.push("/regions/");
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


  const [values, setValues] = useState<Element>({
    name: '',
    internal_code: '',
    observations: '',
    active: true,
    deleted: false
  })

  const handleChange = (prop: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
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
        createElement(values);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  

  return (
    <Card>
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message={valuesMensajesAlert.mensaje}
        severity={valuesMensajesAlert.type}
      />
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
                Crear
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

const FormLayouts = () => {
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
            Nueva Región
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormLayoutsBasic />
        </Grid>
       
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
