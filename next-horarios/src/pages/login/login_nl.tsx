// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'

import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import axios from "axios";

import nextSession from "next-session";
import type { SessionStore } from "next-session";

import React, { useEffect,FormEvent } from "react";
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

import { getCookies,getCookie, setCookies, removeCookies } from 'cookies-next';
import StrapiUrl from 'src/confignl/StrapiUrl';

interface Props {
  user_id: number;
  name_user_logueado: string;
  logueado: boolean;
  mensaje_ldap: string;
}

interface State {
  username: string
  password: string
  showPassword: boolean
  showProgress: boolean
  showForm: boolean
  mensaje_progress: string
  mensaje_error: string
  showError: boolean

}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))




const LoginPage = ({ user_id = 0, name_user_logueado = "", logueado = false, mensaje_ldap=""  }: Props) => {
  // ** State
  const [values, setValues] = useState<State>({
    username : '',
    password: '',
    showPassword: false,
    showProgress: true,
    showForm: true,
    mensaje_progress: 'Consultando autenticación con LDAP.',
    showError: false,
    mensaje_error: 'Error. Intente en otro momento.',

  })
  const router = useRouter()


  if(logueado==true && user_id>0){
    try {
      sessionStorage.setItem("user_id", String(user_id));
      sessionStorage.setItem("name_user_logueado", String(name_user_logueado));
    
      setCookies('user_id', String(user_id));
      setCookies('name_user_logueado', String(name_user_logueado));
      setTimeout(() => {
        router.push("/select-site");
      }, 1000);
    } catch (error) {
      
    }
    
  }else{
    try {
      sessionStorage.setItem("MENSAJE_LDAP", String(mensaje_ldap));
      setCookies('MENSAJE_LDAP', String(mensaje_ldap));
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      
    }
    

    
  }

  

  

  // ** Hook
 

  const login_nl = async (username, password, user_id, name_user_logueado) => {
    values.mensaje_progress = 'Consultando autenticación con LDAP.';
    setValues({ ...values, mensaje_progress: values.mensaje_progress  })
    try {

      
      /*const res = await fetch(url_login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            usuario: username,
            password: password
          }
        ),
  
      });
  
      const response = await res.json();
      console.log(response);*/
      
      /*axios.post(url_login,
        JSON.stringify(
          {
            usuario: username,
            password: password
          }
        )
        
        ).then(response => {
        // do something with response
        //console.log(response.data);

        if(response.data.code==200){
  
          const responseNL = response.data;
  
          let rol_usuario = "";
  
          if(responseNL.code == 200){
            rol_usuario = responseNL.data.rol;
  
            sessionStorage.setItem("user_id", String(user_id));
            sessionStorage.setItem("name_user_logueado", String(name_user_logueado));
  
            setCookies('user_id', String(user_id));
            setCookies('name_user_logueado', String(name_user_logueado));
  
            setTimeout(() => {
              router.push("/select-site");
            }, 1000);
          }
        }else if(response.data.code==500){
          //const response = await res.json();
          values.showProgress = false;
          values.showForm = true;
          values.showError= true;
          values.mensaje_error = "Permiso Denegado";

          setValues({ ...values, showForm: values.showForm  })
        }
        
  
        
        
      }).catch(function (error) {
        values.showProgress = false;
        values.showForm = true;

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          try {
            //console.log(error.response.data);
            values.showError= true;
            values.mensaje_error = ""+error.response.data.messages[0];
            //console.log(error.response.status);
            //console.log(error.response.headers);
          } catch (error) {
            
          }
          
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          //console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          //console.log('Error', error.message);
        }

        setValues({ ...values, showForm: values.showForm  })

        //console.log(error.config);
      });*/
      
      

        
  
    } catch (error) {
      //console.log(error);
    }

  }

  

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Bienvenido
            </Typography>
          </Box>
          <Grid item xs={12} style={{ display: values.showProgress ? undefined : 'none' }}>
            <CircularProgress />
            <br />
            <Alert severity="info">{values.mensaje_progress}</Alert>
            <br />
          </Grid>
          <Grid item xs={12} style={{ display: values.showError ? undefined : 'none' }}>
            <Alert severity="error">{values.mensaje_error}</Alert>
            <br />
          </Grid>
          
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export const getServerSideProps = async (context) => {
  const LOGINNL_UI = getCookie('LOGINNL_UI', context);
  const LOGINNL_UN = getCookie('LOGINNL_UN', context);
  const LOGINNL_USN = getCookie('LOGINNL_USN', context);
  const LOGINNL_UPSS = getCookie('LOGINNL_UPSS', context);

  const res = await fetch(StrapiUrl+"configuracion-logins?populate=%2A&filters[deleted][$not]=true");
  const response = await res.json();
  let logueado_consult = false;
  let url_login_get: string;
  url_login_get= "";

  let mensaje_ldap_consult = "Permiso Denegado";

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];

        //console.log(row);
    
        url_login_get = row.attributes.url;

      }
    
    
    

  } catch (ex) {
    
  }


 

  try {

    //console.log(LOGINNL_USN);
    //console.log(LOGINNL_UPSS);


    const resLOGIN = await fetch(url_login_get, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          usuario: ""+LOGINNL_USN,
          password: ""+LOGINNL_UPSS
        }
      ),

    });

    const responselOGIN = await resLOGIN.json();
    console.log(responselOGIN);

    if(responselOGIN.code==200){
  

      let rol_usuario = "";
      logueado_consult = true;
      rol_usuario = responselOGIN.data.rol;

    }

    
    
  
  } catch (error) {
    mensaje_ldap_consult = error.message;

    //mensaje_ldap_consult = "Error. No se pudo acceder al servicio LDAP. Contacte con el Administrador."
  }

  const  mensaje_ldap= mensaje_ldap_consult;
  const  user_id= LOGINNL_UI;
  const  name_user_logueado= LOGINNL_UN;
  const  logueado= logueado_consult;

  
  

  return {
    props: { 
      mensaje_ldap,
      user_id,
      name_user_logueado,
      logueado
    },
  };
};

export default LoginPage
