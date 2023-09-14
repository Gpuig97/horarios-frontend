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
interface FormDataSites {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface ElementData {
  site: number;

};

interface Props {
  sites: FormDataSites[];
  data: ElementData;

}


const FormLayouts = ({ sites = [],data }: Props) => {


  
  const router = useRouter();
  


  const [values, setValues] = useState<ElementData>({
    site: data.site
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

      //alert(element.site);

      sessionStorage.setItem("site_id", String(element.site));

      setCookies('site_id', String(element.site));

      setTimeout(() => {
        router.push("/");
      }, 1000);
      

      /*if(res.status==200){
        router.push("/cities/");
      }else{
        setValuesMensajesAlert({
          mensaje: 'Error. '+response.error.message,
          type: 'error',
        });
        setOpenSnackbar(true);
      }*/
  
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
      if(values.site>0 && values.site!=null){
        updateElement(values);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h5'>
            Seleccionar el Canal que quiere visualizar en la aplicación.
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                
                <Grid item xs={12}>
                  <InputLabel >Canal</InputLabel>
                  <Select 
                    value = {values.site}
                    id='site'
                    onChange={handleChange('site')}
                    fullWidth
                    required
                  >
                    <MenuItem key={0} value={0}>Seleccione un Canal</MenuItem>
                    {sites.length > 0 ? (

                      sites.map((row) => (
                        <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>

                      ))

                      ):(

                        <MenuItem key={0} value={0}></MenuItem>

                      )}

                  </Select>
                </Grid>
              
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' size='large'>
                    Seleccionar Canal
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

  const user_id_logueado = getCookie('user_id', context);
  const site_id_logueado = getCookie('site_id', context);

  let URL_FILTER_DATA_SITIO = "";

  const resCoordinatorData = await fetch(StrapiUrl+"coordinators/"+user_id_logueado+"?populate=%2A");
  const responseCoordinatorData = await resCoordinatorData.json();
  try {


    for (let i = 0; i < responseCoordinatorData.data.attributes.sites.data.length; i++) {
      const row =       responseCoordinatorData.data.attributes.sites.data[i];
      URL_FILTER_DATA_SITIO += "&filters[id][$in]["+i+"]="+row.id;

    }

    

  } catch (ex) {
    
  }


  const res = await fetch(StrapiUrl+"sites?populate=%2A&filters[deleted][$not]=true"+URL_FILTER_DATA_SITIO);
  const response = await res.json();
  const sites: FormDataSites[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
    
        sites.push(
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


  const region_value = 0


  const data: ElementData={ 
    site: site_id_logueado??0
  };

  

  return {
    props: { sites,data },
  };
};

export default FormLayouts


