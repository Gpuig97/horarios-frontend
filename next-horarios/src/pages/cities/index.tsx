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
import Button from '@mui/material/Button'
import { useRouter } from "next/router";
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import StrapiUrl from 'src/confignl/StrapiUrl';
import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';
import CustomDialog  from 'src/customsComponents/DialogComponent';
import { useState } from 'react';


interface ElementData {
  id: number;
  name: string;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  regions: any;
};


interface Props {
  elements: ElementData[];
}
let ItemDeleteId = 0;


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
        const res = await fetch(StrapiUrl+"cities/" + element_id, {
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
          router.push("/cities/");
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
          Ciudades
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid>
          <Button component='a' variant='contained' sx={{ px: 5.5 }} onClick={() => push("/cities/create")}>
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
                  <TableCell>Región</TableCell>
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
                        <TableCell>{row.regions}</TableCell>
                        <TableCell>{row.observations}</TableCell>
                        <TableCell>{retornarFechaLegible(row.createdAt)}</TableCell>
                        <TableCell>
                          <Button component='a' size='small' variant='contained' style={{background: '#17a2b8', color: 'white'}} onClick={() => push("/cities/edit/"+row.id)}>
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
  const res = await fetch(StrapiUrl+"cities?populate=%2A&filters[deleted][$not]=true");
  const response = await res.json();
  const elements: ElementData[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);

        try{
          elements.push(
            {
              id: row.id,
              name: row.attributes.name,
              internal_code: row.attributes.internal_code,
              observations: row.attributes.observations,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt,
              regions: row.attributes.region.data.attributes.name
            }
          );

        }catch (ex) {
    
        }
    
        
      }
    
    
    

  } catch (ex) {
    
  }


  

  return {
    props: { elements },
  };
};

export default MUITable
