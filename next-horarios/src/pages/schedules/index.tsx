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
import { useState } from 'react'

import React, { useEffect } from "react";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

import StrapiUrl from 'src/confignl/StrapiUrl';

import TextField from "@mui/material/TextField";

import * as XLSX from 'sheetjs-style';
import * as FileSaver from 'file-saver';

import TablePagination from '@mui/material/TablePagination';

import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';
import CustomDialog  from 'src/customsComponents/DialogComponent';

let ItemDeleteId = 0;


interface ElementData {
  id: number;
  date_from: any;
  date_to: any;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  production: number;
  planificado: number;
  type: string;
};


interface Props {
  elements: ElementData[];
  modo: string;
}

const SearchBar = ({setSearchQuery}) => (
  <TextField
    id="search-bar"
    className="text"
    onInput={(e) => {
      setSearchQuery(e.target.value);
    }}
    label="Buscar..."
    variant="outlined"
    placeholder="Buscar..."
    size="small"
  />
);

const filterData = (query, data) => {
if (!query) {
  return data;
} else {
  return data.filter((d) => d.date_from.toLowerCase().includes(query.toLowerCase()) || d.date_to.toLowerCase().includes(query.toLowerCase()) || d.internal_code.toLowerCase().includes(query.toLowerCase()) );
}
};

const MUITable = ({ modo = 'modo_1', elements = [] }: Props) => {

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

  const [userLogueado, setuserLogueado] = useState(0);

  let id_user_logueado;

  useEffect(() => {
    // Access count value from session storage
    id_user_logueado = sessionStorage.getItem("id_area");
    setuserLogueado(id_user_logueado);

  

  }, []); //No dependency to trigger in each page load

  const router = useRouter();

  const handleCopy = async (element_id) => {

    const alert = confirm('¿Está seguro de copiar el Horario?');

    if(alert){
      
    }
    
  };

  const handleDeleteConfirm = async (element_id) => {


      try {
        const res = await fetch(StrapiUrl+"schedules/" + element_id, {
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
          router.push("/schedules/");
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


  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, elements);


  const exportToExcel = async () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const tbl = document.getElementById('sheetjs');
    const ws = XLSX.utils.table_to_sheet(tbl);

    //const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, "Horarios" + fileExtension);
  }

  function exportExcel(){
    exportToExcel();
    

  }



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
          Horarios - Planificación
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid>
          {modo == 'modo_1' &&
            <Button component='a' variant='contained' sx={{ px: 5.5 }} onClick={() => push("/schedules/create")}>
              Nueva Planificación Modo 1
            </Button>
          }
          {modo == 'modo_2' &&
            <Button component='a' variant='contained' sx={{ px: 5.5 }} onClick={() => push("/schedules/create_modo_2")}>
              Nueva Planificación Modo 2
            </Button>
          }

          
          
          
          
          
        </Grid>
        <Card>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <br />
          <Grid>
            
            <Button type='submit' variant='contained' size='small' onClick={exportExcel}>
              Exportar Excel
            </Button>
            &nbsp;
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </Grid>
          <TableContainer sx={{ maxHeight: 650 }}>
            <Table stickyHeader aria-label="sticky table" id="sheetjs">
              <TableHead>
                <TableRow>
                  <TableCell>Fecha Desde</TableCell>
                  <TableCell>Fecha Hasta</TableCell>
                  <TableCell>Código Interno</TableCell>
                  <TableCell>Final</TableCell>
                  <TableCell>Planificado</TableCell>

                  <TableCell>Observaciones</TableCell>
                  <TableCell>Creado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.date_from}</TableCell>
                        <TableCell>{row.date_to}</TableCell>
                        <TableCell>{row.internal_code}</TableCell>
                        <TableCell>
                          {row.production == 1 &&
                            <b>Sí</b>
                          }
                          {row.production == 0 &&
                            <b>No</b>
                          }
                        </TableCell>
                        <TableCell>
                          {row.planificado == 1 &&
                            <b>Sí</b>
                          }
                          {row.planificado == 0 &&
                            <b>No</b>
                          }
                        </TableCell>
                        <TableCell>{row.observations}</TableCell>
                        <TableCell>{retornarFechaLegible(row.createdAt)}</TableCell>
                        <TableCell>

                          {modo == 'modo_1' &&
                            <Button component='a' size='small' variant='contained' style={{background: '#17a2b8', color: 'white'}} onClick={() => push("/schedules/report/"+row.id)}>
                              Ver M1
                            </Button>
                          }
                          {modo == 'modo_2' &&
                            <Button component='a' size='small' variant='contained' style={{background: '#17a2b8', color: 'white'}} onClick={() => push("/schedules/report_modo_2/"+row.id)}>
                              Ver M2
                            </Button>
                          }
                          &nbsp;
                          {modo == 'modo_1' &&
                            <Button component='a' size='small' variant='contained' style={{background: '#17a2b8', color: 'white'}} onClick={() => push("/schedules/edit/"+row.id)}>
                              Editar M1
                            </Button>
                          }
                          {modo == 'modo_2' &&
                            <Button component='a' size='small' variant='contained' style={{background: '#17a2b8', color: 'white'}} onClick={() => push("/schedules/edit_modo_2/"+row.id)}>
                              Editar M2
                            </Button>
                          }
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
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} labelRowsPerPage="Filas por página:"
          />
        </Paper>
        </Card>
      </Grid>

    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const site_id_logueado = getCookie('site_id', context);

  const res = await fetch(StrapiUrl+"schedules?populate=%2A&filters[deleted][$not]=true&filters[production]=false&filters[planificado]=true&filters[site][id]="+site_id_logueado);
  const response = await res.json();
  const elements: ElementData[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
    
        elements.push(
            {
              id: row.id,
              date_from: row.attributes.date_from,
              date_to: row.attributes.date_to,
              internal_code: row.attributes.internal_code,
              type: row.attributes.type,
              observations: row.attributes.observations,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt,
              production: row.attributes.production,
              planificado: row.attributes.planificado


            }
          );
      }
    
    
    

  } catch (ex) {
    
  }

  const resSite = await fetch(StrapiUrl+"sites/"+site_id_logueado);
  const responseSite = await resSite.json();
  //console.log(responseSite.data);
  let type_modo_value = 'modo_1'


  try {
    type_modo_value= responseSite.data.attributes.type;

  } catch (ex) {
    
  }

  const modo = type_modo_value;


  

  return {
    props: { elements, modo },
  };
};

export default MUITable
