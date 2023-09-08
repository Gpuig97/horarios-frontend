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
  name: string;
  order: number;
  available: number;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  agents: any;
  group: any;
  place: any;
  rules_day: any;
  rules_hour: any;
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
  return data.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()) || d.agents.toLowerCase().includes(query.toLowerCase()) || d.group.toLowerCase().includes(query.toLowerCase()) || d.place.toLowerCase().includes(query.toLowerCase()) || d.rules_day.toLowerCase().includes(query.toLowerCase()) || d.rules_hour.toLowerCase().includes(query.toLowerCase()));
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
        const res = await fetch(StrapiUrl+"groups-and-agents/" + element_id, {
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
          router.push("/groups-and-agents/");
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
    FileSaver.saveAs(data, "Grupos y Agentes" + fileExtension);
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
          Grupos Y Agentes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid>
          <Button component='a' variant='contained' sx={{ px: 5.5 }} onClick={() => push("/groups-and-agents/create")}>
            Nuevo Registro
          </Button>
        </Grid>
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
                <TableRow >
                  <TableCell>Nombre</TableCell>
                  <TableCell>Orden/Prioridad</TableCell>
                  <TableCell>Disponible</TableCell>
                  <TableCell>Agente</TableCell>
                  <TableCell>Grupo</TableCell>
                  <TableCell>Sucursal</TableCell>
                  <TableCell>Reglas por Día</TableCell>
                  <TableCell>Reglas por Rango de Hora</TableCell>
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
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.order}</TableCell>
                        <TableCell>
                        {row.available == 1 &&
                            <b>Sí</b>
                          }
                          {row.available == 0 &&
                            <b>No</b>
                          }
                        </TableCell>
                        <TableCell>{row.agents}</TableCell>
                        <TableCell>{row.group}</TableCell>
                        <TableCell>{row.place}</TableCell>
                        <TableCell>{row.rules_day}</TableCell>
                        <TableCell>{row.rules_hour}</TableCell>
                        <TableCell>{row.observations}</TableCell>
                        <TableCell>{retornarFechaLegible(row.createdAt)}</TableCell>
                        <TableCell>
                          <Button component='a' size='small' variant='contained' style={{background: '#17a2b8', color: 'white'}} onClick={() => push("/groups-and-agents/edit/"+row.id)}>
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
        </Paper>
      </Grid>

    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const site_id_logueado = getCookie('site_id', context);

  const res = await fetch(StrapiUrl+"groups-and-agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=order%3Aasc");
  const response = await res.json();
  const elements: ElementData[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
        let agents = "";
        let group = "";
        let place = "";
        let rules_day = "";
        let rules_hour = "";


        try{
          agents = row.attributes.agents.data.attributes.names+' '+ row.attributes.agents.data.attributes.surnames;
        }catch (error) {
    
        }
        try{
          group = row.attributes.group.data.attributes.name;
        }catch (error) {
    
        }
        try{
          place = row.attributes.place.data.attributes.name;
        }catch (error) {
    
        }
        try{
          rules_day = row.attributes.rules_day.data.attributes.name;
        }catch (error) {
    
        }
        try{
          rules_hour = row.attributes.rules_hour.data.attributes.name;
        }catch (error) {
    
        }
       
        elements.push(
            {
              id: row.id,
              name: row.attributes.name,
              order: row.attributes.order,
              available: row.attributes.available,
              observations: row.attributes.observations,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt,
              agents: agents,
              place: place,
              rules_day: rules_day,
              rules_hour: rules_hour,
              group: group

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

