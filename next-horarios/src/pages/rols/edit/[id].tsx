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
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useRouter } from "next/router";
import Checkbox from '@mui/material/Checkbox'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import StrapiUrl from 'src/confignl/StrapiUrl';

import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';


interface ModulesData {
  id: number;
  name: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  id_update: number;
};

interface Element {
  name: string;
  observations: string;
  modules: ModulesData[];
};


interface Props {
  modules: ModulesData[];
  rolElement: Element;
}

interface PermisosData {
  id: number;
};



const FormLayouts = ({ modules = [], rolElement }: Props) => {
  const router = useRouter();
  const element_id= router.query.id;

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [valuesMensajesAlert, setValuesMensajesAlert] = useState({
    mensaje: '',
    type: 'error',
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const updateElement = async (element: Element) => {
  
    try {
      const res = await fetch(StrapiUrl+"rols/"+element_id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data:{
            name: values.name,
            observations: values.observations
          }
        }),
  
      });

      const response = await res.json();

      if(res.status==200){
        if(response.data.id>0){

          

          /***************** CREAR PERMISOS **********/
          try {
            values.modules.map(async module => {
              try {
                if(module.id_update==0){
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"permisos", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          rol: response.data.id,
                          module: module.id,
                          create: module.create,
                          read: module.read,
                          update: module.update,
                          delete: module.delete
                        }
                      }),
                    }
                  );
                                  
                  const response2 = await res2.json();
                }else{
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"permisos/"+module.id_update, 
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          rol: response.data.id,
                          module: module.id,
                          create: module.create,
                          read: module.read,
                          update: module.update,
                          delete: module.delete
                        }
                      }),
                    }
                  );
                                  
                  const response2 = await res2.json();
                }

                
              } catch (error) {
                
              } 
            });
          } catch (error) {
            
          }

          
          router.push("/rols/");

        }
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


  const [values, setValues] = useState<Element>(rolElement)

  const handleChange = (prop: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleChangePermisos = (element_id: number, name_field: keyof Element,name_input: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    values.modules.map((row) => {
      if(row.id == element_id){

        if(row[name_field]==true){
          row[name_field] = false;
        }else{
          row[name_field] = true;

        }

        
      }

    });
    

    
    setValues({...values, [name_input]: event.target.value });


  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      let validPermisos = false;

      for (const module of values.modules) {
        if(module.create || module.read || module.delete || module.update){
          validPermisos = true;

        }
      }

      if(values.name=='' && values.name==null){
        setValuesMensajesAlert({
          mensaje: 'El campo nombre es requerido.',
          type: 'error',
        });
        setOpenSnackbar(true);
      }else if(validPermisos==false){
        setValuesMensajesAlert({
          mensaje: 'Se debe vincular por lo menos un Acceso.',
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
            Editar Rol
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
                    <Typography variant='h5'>
                      Accesos
                    </Typography>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow >
                          <TableCell>Nombre</TableCell>
                          <TableCell>Crear</TableCell>
                          <TableCell>Ver</TableCell>
                          <TableCell>Editar</TableCell>
                          <TableCell>Eliminar</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {values.modules
                          
                          .map((row) => {
                            return (
                              <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                  <Checkbox
                                    id={row.id+'create'}
                                    name={row.id+'create'}
                                    onChange={handleChangePermisos(row.id, 'create', row.id+'create')}
                                    checked={row.create}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Checkbox
                                    id={row.id+'read'}
                                    name={row.id+'read'}
                                    onChange={handleChangePermisos(row.id, 'read', row.id+'read')}
                                    checked={row.read}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Checkbox
                                    id={row.id+'update'}
                                    name={row.id+'update'}
                                    onChange={handleChangePermisos(row.id, 'update', row.id+'update')}
                                    checked={row.update}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Checkbox
                                    id={row.id+'delete'}
                                    name={row.id+'delete'}
                                    onChange={handleChangePermisos(row.id, 'delete', row.id+'delete')}
                                    checked={row.delete}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button type='submit' variant='contained' size='large'>
                      Crear
                    </Button>
                    &nbsp;
                    <Button component='a' variant='outlined' sx={{ px: 5.5 }} onClick={() => router.back()}>
                      Cancelar
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
  const res = await fetch(StrapiUrl+"modules?populate=%2A");
  const response = await res.json();
  const modules: ModulesData[]=[];
  

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
    
        modules.push(
            {
              id: row.id,
              name: row.attributes.name,
              observations: row.attributes.observations,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt,
              create: false,
              update: false,
              delete: false,
              read:false,
              id_update: 0
            }
          );
      }
    
    

  } catch (ex) {
    
  }


  const { id } = context.query;
  const res2 = await fetch(StrapiUrl+"rols/"+id+"?populate=%2A");
  const response2 = await res2.json();
  //console.log(response2.data);
  let name_value = '';
  let observations_value = '';


  try {

    name_value= response2.data.attributes.name;
    observations_value= response2.data.attributes.observations;

  } catch (ex) {
    
  }

  const permisos: PermisosData[]=[];

  const resPermisos = await fetch(StrapiUrl+"permisos?populate=%2A&filters[rol][id]="+id);
  const responsePermisos = await resPermisos.json();
  for (let i = 0; i < responsePermisos.data.length; i++) {
    const row =       responsePermisos.data[i];

    permisos.push({
      id: row.id
    });


    try {
      modules.map(MODULE => {
        if(MODULE.id == row.attributes.module.data.id){
          MODULE.id_update = row.id,
          MODULE.create = row.attributes.create;
          MODULE.read = row.attributes.read;
          MODULE.update = row.attributes.update;
          MODULE.delete = row.attributes.delete;


        }
         
      });
    } catch (error) {
      
    }

  }


  const rolElement: Element={
    name: name_value,
    observations: observations_value,
    modules: modules,
  }

  

  return {
    props: { modules,rolElement },
  };
};

export default FormLayouts
