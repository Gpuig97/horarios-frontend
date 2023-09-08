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
import StrapiUrl from 'src/confignl/StrapiUrl';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface ElementData {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};


interface Props {
  elements: ElementData[];
}

interface ElementDataMensajesAlert {
  mensaje: string;
  type: string;
};
let ItemDeleteId = 0;


const MUITable = ({ elements = [] }: Props) => {


  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialogConfirm(true);
  };
  const handleCloseDialog = () => {
    setOpenDialogConfirm(false);
  };


  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleDelete = async (element_id) => {
    ItemDeleteId = element_id;
    handleOpenDialog();
    //handleDeleteConfirm(element_id); // Abre el diálogo de confirmación
    // ...
  };

  const confirmDelete = async () => {
    handleDeleteConfirm(ItemDeleteId);   
  };


  const { push } = useRouter();
  const router = useRouter();

  const mostrarMensajeAlert = (mensaje,type) => {
    valuesMensajesAlert.mensaje = mensaje;
    valuesMensajesAlert.type = type;
    setValuesMensajesAlert(valuesMensajesAlert);
    setOpenSnackbar(true);
  }

  const [valuesMensajesAlert, setValuesMensajesAlert] = useState<ElementDataMensajesAlert>({
    mensaje: "",
    type: "error"
  })

  const handleDeleteConfirm = async (element_id) => {
    


      try {
        const res = await fetch(StrapiUrl+"areas/" + element_id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({data:{deleted:true}}),
  
        });
        if(res.status==200){
          mostrarMensajeAlert("Registro eliminado con éxito.","success");
          router.push("/areas/");
        }else{
          mostrarMensajeAlert("Ha ocurrido un error. Intente nuevamente.","error");

        }
  
      } catch (error) {
        mostrarMensajeAlert("Ha ocurrido un error. Intente nuevamente.","error");
        //console.log(error);
      }

      handleCloseDialog();
    
    
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
      <Dialog open={openDialogConfirm} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de eliminar el registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Puedes ajustar la duración de la notificación
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'top',   // Cambia 'bottom' a 'top'
          horizontal: 'right', // Cambia 'left' a 'right'
        }}
        style={{ marginTop: '50px'}}
      >
        <Alert onClose={handleSnackbarClose} severity={valuesMensajesAlert.type}>
          {valuesMensajesAlert.mensaje}
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Áreas
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid>
          <Button component='a' variant='contained' sx={{ px: 5.5 }} onClick={() => push("/areas/create")}>
            Nuevo Registro
          </Button>
        </Grid>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 650 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell>Nombre</TableCell>
                  <TableCell>Código Interno</TableCell>
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
                        <TableCell>{row.internal_code}</TableCell>
                        <TableCell>{row.observations}</TableCell>
                        <TableCell>{retornarFechaLegible(row.createdAt)}</TableCell>
                        <TableCell>
                          <Button component='a' size='small' variant='contained' style={{background: '#17a2b8', color: 'white'}} onClick={() => push("/areas/edit/"+row.id)}>
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
  const user_id_logueado = getCookie('user_id', context);
  const site_id_logueado = getCookie('site_id', context);

  const res = await fetch(StrapiUrl+"areas?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
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

  

  return {
    props: { elements },
  };
};

export default MUITable
