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
  name: string;
  internal_code: string;
  observations: string;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  sunday: any;
  holiday: any;
};

interface Props {
  data: ElementData;
}


const FormLayouts = ({ data }: Props) => {

  const router = useRouter();

  
  const element_id= router.query.id;

  const [values, setValues] = useState<ElementData>({
    name: data.name,
    internal_code: data.internal_code,
    observations: data.observations,
    monday: data.monday,
    tuesday: data.tuesday,
    wednesday: data.wednesday,
    thursday: data.thursday,
    friday: data.friday,
    saturday: data.saturday,
    sunday: data.sunday,
    holiday: data.holiday,
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
    await fetch(StrapiUrl+"type-of-shifts/"+element_id, {
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
          router.push("/type-of-shifts");
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
            Actualizar Tipo de Turno
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <InputLabel >Feriados</InputLabel>
                  <Select 
                    value = {values.holiday}
                    id='holiday'
                    onChange={handleChange('holiday')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
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
  const { id } = context.query;
  const res = await fetch(StrapiUrl+"type-of-shifts/"+id);
  const response = await res.json();
  //console.log(response.data);
  let name_value = '';
  let internal_code_value = '';
  let observations_value = '';

  let monday_value= false;
  let tuesday_value= false;
  let wednesday_value= false;
  let thursday_value= false;
  let friday_value= false;
  let saturday_value= false;
  let sunday_value= false;
  let holiday_value= false;

  try {

    name_value= response.data.attributes.name;
    internal_code_value= response.data.attributes.internal_code;
    observations_value= response.data.attributes.observations;
  
    monday_value= response.data.attributes.monday;
    tuesday_value= response.data.attributes.tuesday;
    wednesday_value= response.data.attributes.wednesday;
    thursday_value= response.data.attributes.thursday;
    friday_value= response.data.attributes.friday;
    saturday_value= response.data.attributes.saturday;
    sunday_value= response.data.attributes.sunday;
    holiday_value= response.data.attributes.holiday;

  

  } catch (ex) {
    
  }


  const data: ElementData={ 
    name: name_value, 
    internal_code: internal_code_value, 
    observations: observations_value,
    monday: monday_value,
    tuesday: tuesday_value,
    wednesday: wednesday_value,
    thursday: thursday_value,
    friday: friday_value,
    saturday: saturday_value,
    sunday: sunday_value,
    holiday: holiday_value,
  };

  

  return {
    props: { data },
  };
};

export default FormLayouts

