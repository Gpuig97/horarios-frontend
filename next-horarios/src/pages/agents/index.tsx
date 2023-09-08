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


import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import * as XLSX from 'sheetjs-style';
import * as FileSaver from 'file-saver';

import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';
import CustomDialog  from 'src/customsComponents/DialogComponent';

let ItemDeleteId = 0;

interface ElementData {
  id: number;
  names: string;
  surnames: string;
  identification: string;
  email: string;
  phone: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  area:any;
  type_of_agents:any;
  coordinator: any;
  city: any;
};


interface Props {
  elements: ElementData[];
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
    return data.filter((d) => d.names.toLowerCase().includes(query.toLowerCase()) || d.surnames.toLowerCase().includes(query.toLowerCase()));
  }
};

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
        const res = await fetch(StrapiUrl+"agents/" + element_id, {
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
          router.push("/agents/");
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
    FileSaver.saveAs(data, "Agentes" + fileExtension);
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
          Agentes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid>
          <Button component='a' variant='contained' sx={{ px: 5.5 }} onClick={() => push("/agents/create")}>
            Nuevo Registro
          </Button>
        </Grid>
        <Card> 
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
                  <TableCell>Nombres</TableCell>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>Identificación</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Celular</TableCell>
                  <TableCell>Área</TableCell>
                  <TableCell>Tipo de Agente</TableCell>
                  <TableCell>Ciudad</TableCell>
                  <TableCell>Coordinador</TableCell>
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
                        <TableCell>{row.names}</TableCell>
                        <TableCell>{row.surnames}</TableCell>
                        <TableCell>{row.identification}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.area}</TableCell>
                        <TableCell>{row.type_of_agents}</TableCell>
                        <TableCell>{row.city}</TableCell>
                        <TableCell>{row.coordinator}</TableCell>

                        <TableCell>{row.observations}</TableCell>
                        <TableCell>{retornarFechaLegible(row.createdAt)}</TableCell>
                        <TableCell>
                          <Button component='a' size='small' variant='contained' style={{background: '#17a2b8', color: 'white'}} onClick={() => push("/agents/edit/"+row.id)}>
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
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} labelRowsPerPage="Filas por página:"
          />
        </Card>
      </Grid>

    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const site_id_logueado = getCookie('site_id', context);


  const res = await fetch(StrapiUrl+"agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const response = await res.json();
  const elements: ElementData[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);

        let area = '';
          let coordinator = '';
          let city = '';
          let type_of_agents = ''
  
          try {  
            area = row.attributes.area.data.attributes.name;
          }catch (e: unknown) { 
  
          }
          try {  
            type_of_agents = row.attributes.type_of_agent.data.attributes.name;
          }catch (e: unknown) { 
  
          }
          try {  
            coordinator = row.attributes.coordinator.data.attributes.names+" "+row.attributes.coordinator.data.attributes.surnames;
          }catch (e: unknown) { 
  
          }
          try {  
            city = row.attributes.city.data.attributes.name;
          }catch (e: unknown) { 
  
          }

        elements.push(
            {
              id: row.id,
              names: row.attributes.names,
              surnames: row.attributes.surnames,
              identification: row.attributes.identification,
              email: row.attributes.email,
              phone: row.attributes.phone,
              observations: row.attributes.observations,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt,
              area: area,
              type_of_agents: type_of_agents,
              coordinator: coordinator,
              city: city

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
