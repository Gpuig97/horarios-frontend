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

import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import StrapiUrl from 'src/confignl/StrapiUrl';


import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import * as XLSX from 'sheetjs-style';
import * as FileSaver from 'file-saver';


interface DetailDayTurn {
  date: string;
  shift: string;
  horas_nocturnas: number;
  horas_extras: number;
  horas_complementarias: number;
};


interface ElementData {
  id: number;
  name: string;
  agent_id: number;
  names: string;
  surnames: string;
  identification: string;
  email: string;
  phone: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  detailDayTurn: DetailDayTurn[];
  horas_nocturnas: any;
  horas_extras: any;
  horas_complementarias: any;
  dias_laborados: any;
};

interface InfoElementDialogText {
  dialog_title: any;
};

interface ElementFilter {
  fecha_desde: any;
  fecha_hasta: any;
  agents: ElementData[];
  dates: DetailDayTurn[];
};

interface Props {
  site_id_logueado: number;
  elements: ElementData[];
  AgentsFilterData: ElementFilter;
}

function retornarFechaDeLaSemanaActual(fechaPorNDia){
  const fecha = new Date();

  if(fechaPorNDia<=fecha.getDay()){
    fecha.setDate(fecha.getDate() - (fecha.getDay() - fechaPorNDia));

  }else{
    fecha.setDate(fecha.getDate() + (fechaPorNDia - fecha.getDay()));

  }

  return fecha;
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

const MUITable = ({ elements = [], AgentsFilterData,site_id_logueado }: Props) => {

  const { push } = useRouter();

  const router = useRouter();

  const [values, setValues] = useState<ElementFilter>(AgentsFilterData)


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
  const dataFiltered = filterData(searchQuery, values.agents);

  const exportToExcel = async () => {

    const tbl = document.getElementById('sheetjs');
    const ws = XLSX.utils.table_to_sheet(tbl);
    const wscols = [];
  
    ws['!cols'] = wscols;

    for (const i in ws) {
      //continue;
      //if (typeof ws[i] != 'object') continue;
      const cell = XLSX.utils.decode_cell(i);

      let bold_style = false;
      bold_style = false;
      
      

      try {

        if(typeof ws[i].v == 'string'){
          bold_style = true;
        }

        //console.log(i);



        ws[i].s = {
          // styling for all cells
          font: {
            name: 'arial',
            bold: bold_style
          },
          alignment: {
            vertical: 'center',
            horizontal: 'center',
            wrapText: '1', // any truthy value here
          },
          border: {
            right: {
              style: "thin",
              color: "000000"
            },
            left: {
              style: "thin",
              color: "000000"
            },
            top:{
              style: "thin",
              color: "000000"
            },
            bottom:{
              style: "thin",
              color: "000000"
            }
          }
        };
      } catch (error) {
        
      }
      

    }

    //const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { 'Reporte': ws }, SheetNames: ['Reporte'] };
    XLSX.writeFile(wb, "Reporte de Horas Trabajadas por Día.xlsx");
    
    //const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //const data = new Blob([excelBuffer], { type: fileType });
    //FileSaver.saveAs(data, schedule.internal_code + fileExtension);
  }


  function exportExcel(){
    exportToExcel();
    

  }


  const handleChange = (prop: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const consultarRegistros = async () => {
    try {
      //ver_mensaje_modal("No se ha podido obtener la información de las fechas: "+values.fecha_desde+" - "+values.fecha_hasta)
      const resScheduleDayTurns = await fetch(
        StrapiUrl+"schedules-day-turns?populate=%2A&filters[schedule][site][id]="+site_id_logueado+"&filters[schedule][deleted]=false&filters[schedule][production]=true"+
        "&filters[date][$gte]="+values.fecha_desde+"&filters[date][$lte]="+values.fecha_hasta+""
    
        );
      const responseScheduleDayTurns = await resScheduleDayTurns.json();


      const resScheduleDayHSuplem = await fetch(
        StrapiUrl+"schedules-day-hsuplementarias?populate=%2A&filters[schedule][site][id]="+site_id_logueado+"&filters[schedule][deleted]=false&filters[schedule][production]=true"+
        "&filters[date][$gte]="+values.fecha_desde+"&filters[date][$lte]="+values.fecha_hasta+""

        );
      const responseScheduleDayHSuplem = await resScheduleDayHSuplem.json();

      const resScheduleDayHExtras = await fetch(
        StrapiUrl+"schedules-day-hextras?populate=%2A&filters[schedule][site][id]="+site_id_logueado+"&filters[schedule][deleted]=false&filters[schedule][production]=true"+
        "&filters[date][$gte]="+values.fecha_desde+"&filters[date][$lte]="+values.fecha_hasta+""

        );
      const responseScheduleDayHExtras = await resScheduleDayHExtras.json();


      const detailDayTurn: DetailDayTurn[]=[];
    
      const fecha_desde = Date.parse(values.fecha_desde);
      const fecha_hasta = Date.parse(values.fecha_hasta);
      const UN_DIA_EN_MILISEGUNDOS = 1000 * 60 * 60 * 24;

      for (let i = (fecha_desde + UN_DIA_EN_MILISEGUNDOS); i <= (fecha_hasta + UN_DIA_EN_MILISEGUNDOS); i = i + UN_DIA_EN_MILISEGUNDOS ) {
        const FECHA = new Date(i);
        const FECHA_FINAL =FECHA.getFullYear()+'-'+('0'+(FECHA.getMonth() + 1)).slice(-2)+'-'+('0'+FECHA.getDate()).slice(-2)
        //console.log(FECHA_FINAL);

        detailDayTurn.push({
          date: FECHA_FINAL,
          shift: '',
          horas_complementarias: 0,
          horas_extras: 0,
          horas_nocturnas: 0,
        })

      }
      values.dates = detailDayTurn;
      
        
    
    
      try{
        values.agents.map(AGENT => {
          
          const detailDayTurnAgent: DetailDayTurn[]=[];

          let horas_complementarias_total = 0;
          let horas_extras_total = 0;
          let horas_nocturnas_total = 0;
          let dias_laborados_total = 0;

          values.dates.map(DATE => {
            let horas_complementarias = 0;
            let horas_extras = 0;
            let horas_nocturnas = 0;
            let SHIFT = '-';


            try {
              for (let i = 0; i < responseScheduleDayHExtras.data.length; i++) {
                const row =       responseScheduleDayHExtras.data[i];
  
                try {

                  if(DATE.date==row.attributes.date){
                    if(row.attributes.groups_and_agent.data.id == AGENT.id){
                      const shift_from = row.attributes.time_from;
                      const shift_to = row.attributes.time_to;
                      const lunch_time = row.attributes.lunch_time;

        
                      const fecha_time_from_shift = "1900-01-01";
                      let fecha_time_to_shift = "1900-01-01";
    
                      if(shift_from>shift_to){
                        fecha_time_to_shift = "1900-01-02";
                      }
    
    
                      const shift_time_from = Date.parse(fecha_time_from_shift+" "+shift_from) + (lunch_time*1000*60);
                      const shift_time_to = Date.parse(fecha_time_to_shift+" "+shift_to);
                      
                      const diferencia_shift_inicio = (shift_time_to - shift_time_from) / 3600000;
    
                      horas_extras = horas_extras + diferencia_shift_inicio;
                      horas_extras_total = horas_extras_total + diferencia_shift_inicio;
    
    
                    }
                  }
  
                  
                  
                } catch (error) {
                  //console.log(error);
                  
                }
            
                
            
              }
            } catch (error) {
              //console.log(error);
            }
  
            try {
              for (let i = 0; i < responseScheduleDayHSuplem.data.length; i++) {
                const row =       responseScheduleDayHSuplem.data[i];
  
                try {
                  if(DATE.date==row.attributes.date){
                    if(row.attributes.groups_and_agent.data.id == AGENT.id){
                      const shift_from = row.attributes.time_from;
                      const shift_to = row.attributes.time_to;
    
        
                      const fecha_time_from_shift = "1900-01-01";
                      let fecha_time_to_shift = "1900-01-01";
    
                      if(shift_from>shift_to){
                        fecha_time_to_shift = "1900-01-02";
                      }
    
    
                      const shift_time_from = Date.parse(fecha_time_from_shift+" "+shift_from);
                      const shift_time_to = Date.parse(fecha_time_to_shift+" "+shift_to);
                      
                      const diferencia_shift_inicio = (shift_time_to - shift_time_from) / 3600000;
    
                      horas_complementarias = horas_complementarias + diferencia_shift_inicio;
                      horas_complementarias_total = horas_complementarias_total + diferencia_shift_inicio;

    
                    } 
                  }
                  
                  
                } catch (error) {
                  
                }
            
                
            
              }
            } catch (error) {
              
            }
  
            
      
            for (let i5 = 0; i5 < responseScheduleDayTurns.data.length; i5++) {
              try{
                const row5 =       responseScheduleDayTurns.data[i5];
                const rowGA5 =       responseScheduleDayTurns.data[i5].attributes.groups_and_agents.data;
                if(DATE.date==row5.attributes.date){
                  for (let i6 = 0; i6 < rowGA5.length; i6++) {
                    try{
                     
    
                      if(rowGA5[i6].id == AGENT.id){
                        dias_laborados_total++;
                        const from_nocturno = "19:00:00";
                        const to_nocturno = "06:00:00";
    
                        const shift_from = row5.attributes.time_from;
                        const shift_to = row5.attributes.time_to;
                        const lunch_time = row5.attributes.lunch_time;
                        let shift_name = "";

                        try {
                          shift_name = row5.attributes.name;
                        } catch (error) {
                          
                        }

                        if(shift_name!="" && shift_name!=null){
                          shift_name = shift_name+" - ";
                        }else{
                          shift_name="";
                        }
                        SHIFT =  shift_name + shift_from.replace(":00.000", "")+" - "+shift_to.replace(":00.000", "");
    
                        const fecha_time_from = "1900-01-01";
                        let fecha_time_to = "1900-01-01";
                        let fecha_time_from_shift = "1900-01-01";
                        let fecha_time_to_shift = "1900-01-01";
    
                        if(from_nocturno>to_nocturno){
                          fecha_time_to = "1900-01-02";
                        }

                        if(shift_from>shift_to){
                          fecha_time_to_shift = "1900-01-02";
                        }
                        
                        if(shift_from>="00:00:00" && shift_from<shift_to && shift_to<from_nocturno){
                          fecha_time_from_shift = "1900-01-02";
                          fecha_time_to_shift = "1900-01-02";
                        }
                        /*if(shift_from>shift_to){
                          fecha_time_to_shift = "1900-01-02";
                        }*/
    
                        const fecha_from_nocturno = fecha_time_from+" "+from_nocturno;
                        const fecha_to_nocturno = fecha_time_to+" "+to_nocturno;
    
                        const fecha_from_shift = fecha_time_from_shift+" "+shift_from;
                        const fecha_to_shift = fecha_time_to_shift+" "+shift_to;
    
                        let time_from_flag_he = fecha_from_nocturno;
                        let time_to_flag_he = fecha_to_nocturno;
    
                        
    
                        const time_from_nocturno = Date.parse(fecha_from_nocturno);
                        const time_to_nocturno = Date.parse(fecha_to_nocturno);
                        const shift_time_from = Date.parse(fecha_from_shift) + (lunch_time*1000*60);
                        const shift_time_to = Date.parse(fecha_to_shift);
    
                        const diferencia_shift_inicio = (shift_time_to - shift_time_from) / 3600000;
    
                        if(row5.attributes.horas_extras==true || row5.attributes.holiday==true){
                          horas_extras = horas_extras + diferencia_shift_inicio;
                          horas_extras_total = horas_extras_total + diferencia_shift_inicio;

                        }
    
                        if(
                          (shift_time_from>=time_from_nocturno && shift_time_from  <= time_to_nocturno) ||
                          (shift_time_to>=time_from_nocturno && shift_time_to  <= time_to_nocturno)
                          ){                      
                          console.log("Turno dentro de Horario - Nocturno.");
                          console.log(fecha_from_nocturno);
                          console.log(fecha_to_nocturno);
                          console.log(fecha_from_shift);
                          console.log(fecha_to_shift);
    
                          if(time_from_nocturno>shift_time_from){
                            time_from_flag_he = fecha_from_nocturno;
                          }else{
                            time_from_flag_he = fecha_from_shift;
                          }
    
                          if(time_to_nocturno>shift_time_to){
                            time_to_flag_he = fecha_to_shift;
                          }else{
                            time_to_flag_he = fecha_to_nocturno;
                          }
    
    
                          const time_from_nocturno_final = Date.parse(time_from_flag_he);
                          const time_to_nocturno_final = Date.parse(time_to_flag_he);
                          
                          const diferencia_shift_nocturno = (time_to_nocturno_final - time_from_nocturno_final) / 3600000;
                          horas_nocturnas = horas_nocturnas + diferencia_shift_nocturno;
                          horas_nocturnas_total = horas_nocturnas_total + diferencia_shift_nocturno;

                        }
                        
    
                        
    
                      }
                    }catch(ex){
          
                    }
                    
                  }
                }
                


              }catch(ex){
                
              }
              
            }


            detailDayTurnAgent.push({
              date: DATE.date,
              horas_complementarias: horas_complementarias,
              horas_extras: horas_extras,
              horas_nocturnas: horas_nocturnas,
              shift: SHIFT
            })

          });

          AGENT.detailDayTurn = detailDayTurnAgent;
          AGENT.horas_complementarias = horas_complementarias_total;
          AGENT.horas_extras = horas_extras_total;
          AGENT.horas_nocturnas = horas_nocturnas_total;
          AGENT.dias_laborados = dias_laborados_total;
          
        });
        setValues({ ...values })
      }catch(ex){
    
      }
      
    } catch (error) {
      //console.log(error);
    }
  }



  function ver_mensaje_modal(mensaje){
    try{

      valuesInfoDialogText.dialog_title  = mensaje;
      handleClickOpenModal();

      
    }catch (error) {
      alert(error)
    }
  }


  const [valuesInfoDialogText, setValuesInfo] = useState<InfoElementDialogText>({
    dialog_title: '',
  })

  
  

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };





  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
        Reporte de Horas Trabajadas Por Agente por Día
        </Typography>
      </Grid>
      <Dialog
          open={openModal}
          onClose={handleCloseModal}
        >
          <DialogTitle>Alerta</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid item xs={12}>
                <div>{valuesInfoDialogText.dialog_title}</div>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      <Grid container spacing={5}>
            <Grid item xs={6}>
              <InputLabel >Fecha Desde</InputLabel>
              <OutlinedInput
                value={values.fecha_desde}
                id='fecha_desde'
                onChange={handleChange('fecha_desde')}
                type='date'
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel >Fecha Hasta</InputLabel>
              <OutlinedInput
                value={values.fecha_hasta}
                id='fecha_hasta'
                onChange={handleChange('fecha_hasta')}
                type='date'
                fullWidth
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button onClick={() => consultarRegistros()} variant='contained' size='large'>
                Filtrar
              </Button>
            </Grid>
          </Grid>
      <Grid item xs={12}>
        <Card> 
          <br />
          <Grid>
            
            <Button type='submit' variant='contained' size='small' onClick={exportExcel}>
              Exportar Excel
            </Button>
            &nbsp;
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </Grid>
          
          <TableContainer >
            <Table stickyHeader aria-label="sticky table" id="sheetjs">
              <TableHead style={{textAlign: 'center'}}>
                <TableRow>
                  <TableCell style={{textAlign: 'center'}} rowSpan={2}>Agente</TableCell>

                  {
                  values.dates
                  .map((rowDate) => {
                    return (
                      <TableCell key={rowDate.date} colSpan={4} style={{textAlign: 'center'}}>Fecha {rowDate.date}</TableCell>

                    );
                  })
                  }

                  <TableCell colSpan={3} style={{textAlign: 'center'}}>TOTAL</TableCell>
                  <TableCell colSpan={1} style={{textAlign: 'center'}} rowSpan={2}>DIAS LABORADOS</TableCell>

                  

                </TableRow>
                <TableRow>

                  {
                  values.dates
                  .map((rowDate) => {
                    return (

                      <React.Fragment key={rowDate.date}>
                        <TableCell colSpan={1}>TURNO</TableCell>
                        <TableCell colSpan={1}>NOCTURNAS</TableCell>
                        <TableCell colSpan={1}>EXTRAS</TableCell>
                        <TableCell colSpan={1}>COMPLEMENTARIAS</TableCell>
                      </React.Fragment>

                    );
                  })
                  }
                  <TableCell colSpan={1}>NOCTURNAS</TableCell>
                  <TableCell colSpan={1}>EXTRAS</TableCell>
                  <TableCell colSpan={1}>COMPLEMENTARIAS</TableCell>

                  
                  

                </TableRow>
              </TableHead>
              <TableBody style={{textAlign: 'center'}}>
                {dataFiltered
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell style={{textAlign: 'left'}}>{row.names} {row.surnames}</TableCell>
                        {
                        row.detailDayTurn
                        .map((rowDetailDay) => {
                          return (
                            <React.Fragment key={rowDetailDay.date}>
                              <TableCell colSpan={1}>{rowDetailDay.shift}</TableCell>
                              <TableCell colSpan={1}>{rowDetailDay.horas_nocturnas}</TableCell>
                              <TableCell colSpan={1}>{rowDetailDay.horas_extras}</TableCell>
                              <TableCell colSpan={1}>{rowDetailDay.horas_complementarias}</TableCell>
                            </React.Fragment>

                          );
                        })
                        }
                        <TableCell>{row.horas_nocturnas}</TableCell>
                        <TableCell>{row.horas_extras}</TableCell>
                        <TableCell>{row.horas_complementarias}</TableCell>
                        <TableCell>{row.dias_laborados}</TableCell>
                        
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>

    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const site_id_logueado = getCookie('site_id', context);


  const res = await fetch(StrapiUrl+"groups-and-agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=order%3Aasc");
  const response = await res.json();
  const elements: ElementData[]=[];

  

  const detailDayTurn: DetailDayTurn[]=[];

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);

        


        elements.push(
            {
              id: row.id,
              name: row.attributes.name,
              agent_id: row.attributes.agents.data.id,
              names: row.attributes.agents.data.attributes.names,
              surnames: row.attributes.agents.data.attributes.surnames,
              identification: row.attributes.agents.data.attributes.identification,
              email: row.attributes.agents.data.attributes.email,
              phone: row.attributes.agents.data.attributes.phone,
              observations: row.attributes.agents.data.attributes.observations,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt,
              detailDayTurn: detailDayTurn,
              horas_nocturnas: 0,
              horas_extras: 0,
              horas_complementarias: 0,
              dias_laborados: 0,


            }
          );
      }
    
    
    

  } catch (ex) {
    
  }

  const date_day_1_value = retornarFechaDeLaSemanaActual(1);

  const date_day_7_value = retornarFechaDeLaSemanaActual(7);

  const fecha_desde = date_day_1_value.getFullYear()+'-'+('0'+(date_day_1_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_1_value.getDate()).slice(-2);
  const fecha_hasta = date_day_7_value.getFullYear()+'-'+('0'+(date_day_7_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_7_value.getDate()).slice(-2);

  

  const AgentsFilterData: ElementFilter={
    fecha_desde: fecha_desde,
    fecha_hasta: fecha_hasta,
    agents: elements,
    dates: [],
  }


  

  return {
    props: { 
      site_id_logueado,
      AgentsFilterData,
      elements 
    },
  };
};

export default MUITable
