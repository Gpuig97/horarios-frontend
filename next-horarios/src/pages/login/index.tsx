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

import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import StrapiUrl from 'src/confignl/StrapiUrl';

interface Props {
  MENSAJE_LDAP: string;
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




const LoginPage = ({ MENSAJE_LDAP = "" }: Props) => {
  // ** State
  const [values, setValues] = useState<State>({
    username : '',
    password: '',
    showPassword: false,
    showProgress: false,
    showForm: true,
    mensaje_progress: 'Iniciando sesión en el Sistema.',
    showError: false,
    mensaje_error: 'Error. Intente en otro momento.',

  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  if(MENSAJE_LDAP!=""){
    values.mensaje_error = MENSAJE_LDAP;
    values.showError = true;
  }

  const login_nl = async (username, password, user_id, name_user_logueado) => {
    values.mensaje_progress = 'Consultando autenticación con LDAP.';
    setValues({ ...values, mensaje_progress: values.mensaje_progress  })
    try {

      sessionStorage.setItem("LOGINNL_UI", String(user_id));
      sessionStorage.setItem("LOGINNL_UN", String(name_user_logueado));
      sessionStorage.setItem("LOGINNL_USN", String(username));
      sessionStorage.setItem("LOGINNL_UPSS", String(password));

      setCookies('LOGINNL_UI', String(user_id));
      setCookies('LOGINNL_UN', String(name_user_logueado));
      setCookies('LOGINNL_USN', String(username));
      setCookies('LOGINNL_UPSS', String(password));

      setTimeout(() => {
        router.push("/login/login_nl");
      }, 1000);
  
    } catch (error) {
      //console.log(error);
    }

  }

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    values.showProgress = true;
    values.showForm = false;
    values.showError = false;

    values.mensaje_progress = 'Iniciando sesión en el Sistema';

    setValues({ ...values, showForm: values.showForm  })

    

    let sesion_iniciada = 0;
    let user_id = 0;
    let name_user_logueado = "Usuario";
    let login_nl_habilitado = false;

    let rol_id_consult = 0;
    let rol_user = "";


    try {

      const resCoordinators = await fetch(StrapiUrl+'coordinators?populate=%2A&filters[deleted][$not]=true&filters[username]='+values.username);
      const responseCoordinators = await resCoordinators.json();

        
        
  
        for (let i = 0; i < responseCoordinators.data.length; i++) {
  
          const row =       responseCoordinators.data[i];
          //console.log(row);

  
  
          if(row.attributes.username==values.username && values.password!=''){
            user_id = row.id;
            name_user_logueado =  row.attributes.names+ " "+row.attributes.surnames;
            login_nl_habilitado = row.attributes.login_nl;

            sesion_iniciada = 1;

            
            try {
              rol_id_consult= row.attributes.rol.data.id;
              rol_user= row.attributes.rol.data.attributes.name;

              sessionStorage.setItem("rol_id_consult", String(rol_id_consult));
              setCookies('rol_id_consult', String(rol_id_consult));

            } catch (error) {
              
            }

          }

          if(login_nl_habilitado){
            sesion_iniciada = 0;

          }
        }

        if(sesion_iniciada==1){
          sessionStorage.setItem("site_id", "");
          sessionStorage.setItem("user_id", String(user_id));
          sessionStorage.setItem("name_user_logueado", String(name_user_logueado));

          setCookies('user_id', String(user_id));
          setCookies('site_id', "");

          setCookies('name_user_logueado', String(name_user_logueado));

          setTimeout(() => {
            router.push("/select-site");
          }, 1000);
        }else{
          if(login_nl_habilitado){
            login_nl(values.username, values.password, user_id, name_user_logueado);
          }else{
            values.showProgress = false;
            values.showForm = true;
            values.showError= true;
            values.mensaje_error = "Usuario y/o Contraseña incorrectas.";
            setValues({ ...values, showForm: values.showForm  })

          }
        }
        
      
    
      //return data.data;
    } catch (error) {
      values.showProgress = false;
      values.showForm = true;

      setValues({ ...values, showForm: values.showForm  })
    }

   

  };

  useEffect(() => {
    // Access count value from session storage
    const user_id = sessionStorage.getItem("user_id");
    if (user_id == null) {
      
    }else{
      router.push("/select-site");

    }

  }, []); //No dependency to trigger in each page load



  

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
          <form autoComplete='off' onSubmit={login} style={{ display: values.showForm ? undefined : 'none' }}>
            <TextField autoFocus fullWidth id='username' onChange={handleChange('username')} value={values.username} label='Usuario' sx={{ marginBottom: 4 }} />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Contraseña</InputLabel>
              <OutlinedInput
                label='Contraseña'
                value={values.password}
                id='auth-login-password'
                required
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              type='submit'
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
             
            >
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export const getServerSideProps = async (context) => {
 

  let MENSAJE_LDAP_CONSULT = getCookie('MENSAJE_LDAP', context);

  if(MENSAJE_LDAP_CONSULT==undefined){
    MENSAJE_LDAP_CONSULT = "";
  }

  
  setCookies('MENSAJE_LDAP', "");
  removeCookies('MENSAJE_LDAP',context);
  
  const MENSAJE_LDAP = MENSAJE_LDAP_CONSULT;


  return {
    props: { MENSAJE_LDAP },
  };
};

export default LoginPage
