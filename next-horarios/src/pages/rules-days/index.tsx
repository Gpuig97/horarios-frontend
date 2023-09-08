// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Link from 'next/link'
import Button from '@mui/material/Button'
import axios from "axios";
import { useRouter } from "next/router";


import * as React from 'react';

import TablePagination from '@mui/material/TablePagination';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

import StrapiUrl from 'src/confignl/StrapiUrl';


import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';
import CustomDialog  from 'src/customsComponents/DialogComponent';
import { useState } from 'react';

let ItemDeleteId = 0;


interface ElementData {
  id: number;
  name: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  skip_order_group: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  order:number;

};


interface Props {
  elements: ElementData[];
}

const MUITable = ({ elements = [] }: Props) => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [valuesMensajesAlert, setValuesMensajesAlert] = useState({
    mensaje: '',
    type: 'error',
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleDelete = (element_id) => {
    // Mostrar el diálogo de confirmación
    ItemDeleteId = element_id;
    setOpenDialogConfirm(true);
  };

  const confirmDelete = async () => {
    handleDeleteConfirm(ItemDeleteId);
    // Cerrar el diálogo de confirmación después de la eliminación
    setOpenDialogConfirm(false);
  };

  const { push } = useRouter();
  const router = useRouter();

  const handleDeleteConfirm = async (element_id) => {


      try {
        const res = await fetch(StrapiUrl+"rules-days/" + element_id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({data:{deleted:true}}),
  
        });
        if(res.status==200){
          setValuesMensajesAlert({
            mensaje: 'Registro eliminado con éxito.',
            type: 'success',
          });
          router.push("/rules-days/");
        }else{
          setValuesMensajesAlert({
            mensaje: 'Error intente en otro momento.',
            type: 'error',
          });
        }
  
      } catch (error) {
        setValuesMensajesAlert({
          mensaje: 'Error intente en otro momento.',
          type: 'error',
        });
      }
      setOpenSnackbar(true);

    
    
  };

  function retornarFechaLegible(fecha_formatear){
    const fecha = new Date(fecha_formatear);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

    
  
    return fecha.toLocaleDateString("es-ES", options);
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container spacing={6}>
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message={valuesMensajesAlert.mensaje}
        severity={valuesMensajesAlert.type}
      />
      <CustomDialog
        open={openDialogConfirm}
        onClose={() => setOpenDialogConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirmar eliminación"
        content="¿Está seguro de eliminar el registro?"
      />
      <Grid item xs={12}>
        <Typography variant='h5'>
          Reglas por Día de la Semana
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid>
          <Button component='a' variant='contained' sx={{ px: 5.5 }} onClick={() => push("/rules-days/create")}>
            Nuevo Registro
          </Button>
        </Grid>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 650 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell>Nombre</TableCell>
                  <TableCell>Orden/Prioridad</TableCell>
                  <TableCell>Saltar Orden Grupo</TableCell>
                  <TableCell>Lunes</TableCell>
                  <TableCell>Martes</TableCell>
                  <TableCell>Miércoles</TableCell>
                  <TableCell>Jueves</TableCell>
                  <TableCell>Viernes</TableCell>
                  <TableCell>Sábado</TableCell>
                  <TableCell>Domingo</TableCell>
                  <TableCell>Observaciones</TableCell>
                  <TableCell>Creado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {elements
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.order}</TableCell>
                        
                        <TableCell>
                          {row.skip_order_group == 1 &&
                            <b>Sí</b>
                          }
                          {row.skip_order_group == 0 &&
                            <b>No</b>
                          }
                        </TableCell>
                        <TableCell>
                          {row.monday == 1 &&
                            <b>Sí</b>
                          }
                          {row.monday == 0 &&
                            <b>No</b>
                          }
                        </TableCell>
                        <TableCell>
                          {row.tuesday == 1 &&
                            <b>Sí</b>
                          }
                          {row.tuesday == 0 &&
                            <b>No</b>
                          }
                        </TableCell>
                        <TableCell>
                          {row.wednesday == 1 &&
                            <b>Sí</b>
                          }
                          {row.wednesday == 0 &&
                            <b>No</b>
                          }
                        </TableCell>
                        <TableCell>
                          {row.thursday == 1 &&
                            <b>Sí</b>
                          }
                          {row.thursday == 0 &&
                            <b>No</b>
                          }
                        </TableCell>
                        <TableCell>
                          {row.friday == 1 &&
                            <b>Sí</b>
                          }
                          {row.friday == 0 &&
                            <b>No</b>
                          }
                        </TableCell>
                        <TableCell>
                          {row.saturday == 1 &&
                            <b>Sí</b>
                          }
                          {row.saturday == 0 &&
                            <b>No</b>
                          }
                        </TableCell>
                        <TableCell>
                          {row.sunday == 1 &&
                            <b>Sí</b>
                          }
                          {row.sunday == 0 &&
                            <b>No</b>
                          }
                        </TableCell>
                        <TableCell>{row.observations}</TableCell>
                        <TableCell>{retornarFechaLegible(row.createdAt)}</TableCell>
                        <TableCell>
                          <Button component='a' size='small' variant='contained' style={{background: '#17a2b8', color: 'white'}} onClick={() => push("/rules-days/edit/"+row.id)}>
                            Editar
                          </Button>
                          &nbsp;
                          <Button component='a' size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={() => handleDelete(row.id)}>
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={elements.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} labelRowsPerPage="Filas por página:"
          />
        </Paper>
      </Grid>

    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const site_id_logueado = getCookie('site_id', context);

  const res = await fetch(StrapiUrl+"rules-days?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=order%3Aasc");
  const response = await res.json();
  const elements: ElementData[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
    
        elements.push(
            {
              id: row.id,
              name: row.attributes.name,
              order: row.attributes.order,
              observations: row.attributes.observations,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt,
              skip_order_group: row.attributes.skip_order_group,
              monday: row.attributes.monday,
              tuesday: row.attributes.tuesday,
              wednesday: row.attributes.wednesday,
              thursday: row.attributes.thursday,
              friday: row.attributes.friday,
              saturday: row.attributes.saturday,
              sunday: row.attributes.sunday

            }
          );
      }
    
    
    

  } catch (ex) {
    
  }


  

  return {
    props: { elements },
  };
};
export default MUITable
