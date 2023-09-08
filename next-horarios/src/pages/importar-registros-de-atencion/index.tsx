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
import OutlinedInput from '@mui/material/OutlinedInput'

import TablePagination from '@mui/material/TablePagination';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

import StrapiUrl from 'src/confignl/StrapiUrl';


import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import * as XLSX from 'xlsx-js-style';
import * as FileSaver from 'file-saver';
import React,{ ChangeEvent, FormEvent, useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel'
import { getNumberOfAgents } from 'erlang-c-js';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

interface ElementData {
  id: number;
  time_from: any;
  time_to: any;
  type_of_shift: any;
  num_agentes_necesarios: number;

};

interface GroupAndAgentData {
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

interface AgentesNecesariosPorHora {
  time_from: any;
  time_to: any;
  llamadas_1: number;
  llamadas_2: number;
  llamadas_3: number;
  llamadas_4: number;
  llamadas_5: number;
  llamadas_6: number;
  llamadas_7: number;
  calculo_erlang_c_1: number;
  calculo_erlang_c_2: number;
  calculo_erlang_c_3: number;
  calculo_erlang_c_4: number;
  calculo_erlang_c_5: number;
  calculo_erlang_c_6: number;
  calculo_erlang_c_7: number;
  num_agentes_necesarios_1: number;
  num_agentes_necesarios_2: number;
  num_agentes_necesarios_3: number;
  num_agentes_necesarios_4: number;
  num_agentes_necesarios_5: number;
  num_agentes_necesarios_6: number;
  num_agentes_necesarios_7: number;

};

interface PlanificationData {
  agentesNecesariosPorHora: AgentesNecesariosPorHora[];
  total_1: number;
  total_2: number;
  total_3: number;
  total_4: number;
  total_5: number;
  total_6: number;
  total_7: number;
  elements_1: ElementData[];
  elements_2: ElementData[];
  elements_3: ElementData[];
  elements_4: ElementData[];
  elements_5: ElementData[];
  elements_6: ElementData[];
  elements_7: ElementData[];
  intervalLength: number;
  aht: number;
  targetServiceLevel: number;
  targetTime: number;
  maxOccupancy: number;
  shrinkage: number;

}

interface InfoElementDialogText {
  dialog_title: any;
  showProgress: boolean;
  mensaje_progress: string;

};


interface Props {
  elements: ElementData[];
  planificationData: PlanificationData;

  groupAndAgents: GroupAndAgentData[];

  elements_1: ElementData[];
  elements_2: ElementData[];
  elements_3: ElementData[];
  elements_4: ElementData[];
  elements_5: ElementData[];
  elements_6: ElementData[];
  elements_7: ElementData[];
}





const MUITable = ({ groupAndAgents = [], elements = [], elements_1 = [],  elements_2 = [],  elements_3 = [],  elements_4 = [],  elements_5 = [],  elements_6 = [] ,  elements_7 = [], planificationData}: Props) => {
  const { push } = useRouter();
  const router = useRouter();


  const [valuesPlanificationData, setValuesPlanificationData] = useState<PlanificationData>(planificationData);

  const handleChangeNumAgent = (shift_id: number, name_field: keyof Element, day: number, name_input: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    if(day==1){
      valuesPlanificationData.elements_1.map((row) => {
          if(row.id == shift_id){
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==2){
      valuesPlanificationData.elements_2.map((row) => {
          if(row.id == shift_id){
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==3){
      valuesPlanificationData.elements_3.map((row) => {
          if(row.id == shift_id){
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==4){
      valuesPlanificationData.elements_4.map((row) => {
          if(row.id == shift_id){
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==5){
      valuesPlanificationData.elements_5.map((row) => {
          if(row.id == shift_id){
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==6){
      valuesPlanificationData.elements_6.map((row) => {
          if(row.id == shift_id){
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==7){
      valuesPlanificationData.elements_7.map((row) => {
          if(row.id == shift_id){
            row[name_field] = event.target.value;
          }
        }
      )
    }
    
    setValuesPlanificationData({...valuesPlanificationData, [name_input]: event.target.value });

  }

  const handleSubmit =  (e) => {
    e.preventDefault();
    
    calculoErlannG();
  };

  function calculoErlannG(){

    //alert(groupAndAgents.length);
    //alert(valuesPlanificationData['total_1']);

    ver_mensaje_modal('');
    valuesInfoDialogText.showProgress = true;
    valuesInfoDialogText.mensaje_progress = "Calculando Datos... Por Favor Espera...";

    valuesPlanificationData.total_1 = 0;
    valuesPlanificationData.total_2 = 0;
    valuesPlanificationData.total_3 = 0;
    valuesPlanificationData.total_4 = 0;
    valuesPlanificationData.total_5 = 0;
    valuesPlanificationData.total_6 = 0;
    valuesPlanificationData.total_7 = 0;

    valuesPlanificationData.agentesNecesariosPorHora
    .map((rowANPHora) => {

      try {

        const FTE_1 = getNumberOfAgents(rowANPHora.llamadas_1, planificationData.intervalLength, planificationData.aht, planificationData.targetServiceLevel, planificationData.targetTime, planificationData.maxOccupancy, planificationData.shrinkage);
        const FTE_2 = getNumberOfAgents(rowANPHora.llamadas_2, planificationData.intervalLength, planificationData.aht, planificationData.targetServiceLevel, planificationData.targetTime, planificationData.maxOccupancy, planificationData.shrinkage);
        const FTE_3 = getNumberOfAgents(rowANPHora.llamadas_3, planificationData.intervalLength, planificationData.aht, planificationData.targetServiceLevel, planificationData.targetTime, planificationData.maxOccupancy, planificationData.shrinkage);
        const FTE_4 = getNumberOfAgents(rowANPHora.llamadas_4, planificationData.intervalLength, planificationData.aht, planificationData.targetServiceLevel, planificationData.targetTime, planificationData.maxOccupancy, planificationData.shrinkage);
        const FTE_5 = getNumberOfAgents(rowANPHora.llamadas_5, planificationData.intervalLength, planificationData.aht, planificationData.targetServiceLevel, planificationData.targetTime, planificationData.maxOccupancy, planificationData.shrinkage);
        const FTE_6 = getNumberOfAgents(rowANPHora.llamadas_6, planificationData.intervalLength, planificationData.aht, planificationData.targetServiceLevel, planificationData.targetTime, planificationData.maxOccupancy, planificationData.shrinkage);
        const FTE_7 = getNumberOfAgents(rowANPHora.llamadas_7, planificationData.intervalLength, planificationData.aht, planificationData.targetServiceLevel, planificationData.targetTime, planificationData.maxOccupancy, planificationData.shrinkage);

        rowANPHora.calculo_erlang_c_1 = FTE_1;
        rowANPHora.calculo_erlang_c_2 = FTE_2;
        rowANPHora.calculo_erlang_c_3 = FTE_3;
        rowANPHora.calculo_erlang_c_4 = FTE_4;
        rowANPHora.calculo_erlang_c_5 = FTE_5;
        rowANPHora.calculo_erlang_c_6 = FTE_6;
        rowANPHora.calculo_erlang_c_7 = FTE_7;


        valuesPlanificationData.total_1 = valuesPlanificationData.total_1 + FTE_1;
        valuesPlanificationData.total_2 = valuesPlanificationData.total_2 + FTE_2;
        valuesPlanificationData.total_3 = valuesPlanificationData.total_3 + FTE_3;
        valuesPlanificationData.total_4 = valuesPlanificationData.total_4 + FTE_4;
        valuesPlanificationData.total_5 = valuesPlanificationData.total_5 + FTE_5;
        valuesPlanificationData.total_6 = valuesPlanificationData.total_6 + FTE_6;
        valuesPlanificationData.total_7 = valuesPlanificationData.total_7 + FTE_7;


      } catch (error) {
        
      }
      
      

      
    });



    for (let index = 1; index < 8; index++) {

      valuesPlanificationData['elements_'+index]
      .map((TURNO_DIA) => {

        let valor_flag = 1;

        valuesPlanificationData.agentesNecesariosPorHora
        .map((rowANPHora) => {

          const fecha_time_from = "1900-01-01";
          const TIME_FROM_TURNO = Date.parse(fecha_time_from+" "+TURNO_DIA.time_from);
          const TIME_FROM_X_HORA = Date.parse(fecha_time_from+" "+rowANPHora.time_from);
          const TIME_TO_TURNO = Date.parse(fecha_time_from+" "+TURNO_DIA.time_to);
          const TIME_TO_X_HORA = Date.parse(fecha_time_from+" "+rowANPHora.time_to);


          if( TIME_FROM_X_HORA >= TIME_FROM_TURNO &&  TIME_FROM_X_HORA <= TIME_TO_TURNO){

            

            const factor = groupAndAgents.length / valuesPlanificationData['total_'+index];


            const VALOR  = Math.floor(rowANPHora['calculo_erlang_c_'+index] * factor);

            if(VALOR > valor_flag){

              valor_flag = VALOR;
              
              
              
            }

          }
    
        });

        TURNO_DIA.num_agentes_necesarios = valor_flag;

      });
      
    }

    

    valuesInfoDialogText.showProgress = false;
    valuesInfoDialogText.dialog_title = "Se han calculado con éxito el número de Agentes.";
    

    setValuesPlanificationData({...valuesPlanificationData});
  }

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileName = file.name;
            if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
              valuesInfoDialogText.showProgress = true;
              ver_mensaje_modal("Obteniendo Información... Por Favor Espera...");
        
              try {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet);
                    //console.log(json);
        
                    let day_flag = 0;
        
                    // Variable para verificar si las columnas están presentes
                    let columnsExist = false;
        
        
                    for (let i = 0; i < json.length; i++) {
        
                      try {
                        const row =       json[i];
        
                        if(row.time != null && row.quantity != null){
                          columnsExist = true;
        
                        }
                      
        
                        if(row.time=='00:00' || row.time=='00:00:00'){
                          day_flag++;
                        }
        
                        const fecha_time_from = "1900-01-01";
                        const time_from_excel = Date.parse(fecha_time_from+" "+row.time);
        
        
                        valuesPlanificationData.agentesNecesariosPorHora
                        .map((rowANPHora) => {
        
                          try {
                            const time_from_data = Date.parse(fecha_time_from+" "+rowANPHora.time_from);
        
                            const FTE = row.quantity;
        
                            if(time_from_data==time_from_excel){
                              rowANPHora['llamadas_'+day_flag] = FTE;
                              
                            }
                          } catch (error) {
        
                          }
                          
                          
        
                          
                        });
                        
        
        
                      } catch (error) {
                      }
        
                      
        
                    }
        
                    if(columnsExist){
                      calculoErlannG();
        
        
                    
        
                      setValuesPlanificationData({...valuesPlanificationData});
          
                      valuesInfoDialogText.showProgress = false;
                      ver_mensaje_modal("Se han calculado con éxito el número de Agentes.");

                    }else{
        
                      valuesInfoDialogText.showProgress = false;
                      ver_mensaje_modal("Ha ocurrido un error. El Archivo no es válido. Intente en otro momento.");

                    }
                    
                    //handleCloseModal();
        
        
                    //const FTE = getNumberOfAgents(volumes, intervalLength, aht, targetServiceLevel, targetTime, maxOccupancy, shrinkage)
        
                    
                    //alert(FTE);
        
                   // alert(JSON.stringify(json));
        
        
                    
                };
                reader.readAsArrayBuffer(e.target.files[0]);
              } catch (error) {
                valuesInfoDialogText.showProgress = false;
                ver_mensaje_modal("Ha ocurrido un error. El Archivo no es válido. Intente en otro momento.");

                    
              }
            } else {
              valuesInfoDialogText.showProgress = false;
              ver_mensaje_modal("El archivo seleccionado no es un archivo Excel válido.");
            }
        }
      
        
      
        

    }


  }

  const [valuesInfoDialogText, setValuesInfo] = useState<InfoElementDialogText>({
    dialog_title: '',
    showProgress: false,
    mensaje_progress: 'Actualizando Información. Por favor Espere.',
  })

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  function ver_mensaje_modal(mensaje){
    try{

      valuesInfoDialogText.dialog_title  = mensaje;
      handleClickOpenModal();

      
    }catch (error) {
      
    }
  }

  const handleChange = (prop: keyof ElementData) => (event: ChangeEvent<HTMLInputElement>) => {
    setValuesPlanificationData({ ...valuesPlanificationData, [prop]: event.target.value })
  }

  const saveShifts = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      valuesInfoDialogText.showProgress = true;
      valuesInfoDialogText.mensaje_progress = 'Actualizando los Turnos... Por favor espere...';
      ver_mensaje_modal('');

      /***************** UPDATE LOS REGISTROS LUNES **********/
      valuesPlanificationData.elements_1.map(async element => {
        try {
          const 
          res2 = 
          await fetch(StrapiUrl+"shifts/"+element.id, 
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data:{
                  monday_num_agents: element.num_agentes_necesarios
                }
              }),
            }
          );
                          
          const response2 = await res2.json();
          if(response2.data.id>0){
            
          }
        } catch (error) {
          
        }
      });


      /***************** UPDATE LOS REGISTROS MARTES **********/
      valuesPlanificationData.elements_2.map(async element => {
        try {
          const 
          res2 = 
          await fetch(StrapiUrl+"shifts/"+element.id, 
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data:{
                  tuesday_num_agents: element.num_agentes_necesarios
                }
              }),
            }
          );
                          
          const response2 = await res2.json();
          if(response2.data.id>0){
            
          }
        } catch (error) {
          
        }
      });

      /***************** UPDATE LOS REGISTROS MIERCOLES **********/
      valuesPlanificationData.elements_3.map(async element => {
        try {
          const 
          res2 = 
          await fetch(StrapiUrl+"shifts/"+element.id, 
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data:{
                  wednesday_num_agents: element.num_agentes_necesarios
                }
              }),
            }
          );
                          
          const response2 = await res2.json();
          if(response2.data.id>0){
            
          }
        } catch (error) {
          
        }
      });

      /***************** UPDATE LOS REGISTROS JUEVES **********/
      valuesPlanificationData.elements_4.map(async element => {
        try {
          const 
          res2 = 
          await fetch(StrapiUrl+"shifts/"+element.id, 
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data:{
                  thursday_num_agents: element.num_agentes_necesarios
                }
              }),
            }
          );
                          
          const response2 = await res2.json();
          if(response2.data.id>0){
            
          }
        } catch (error) {
          
        }
      });

      /***************** UPDATE LOS REGISTROS VIERNES **********/
      valuesPlanificationData.elements_5.map(async element => {
        try {
          const 
          res2 = 
          await fetch(StrapiUrl+"shifts/"+element.id, 
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data:{
                  friday_num_agents: element.num_agentes_necesarios
                }
              }),
            }
          );
                          
          const response2 = await res2.json();
          if(response2.data.id>0){
            
          }
        } catch (error) {
          
        }
      });


      /***************** UPDATE LOS REGISTROS SÁBADOS **********/
      valuesPlanificationData.elements_6.map(async element => {
        try {
          const 
          res2 = 
          await fetch(StrapiUrl+"shifts/"+element.id, 
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data:{
                  saturday_num_agents: element.num_agentes_necesarios
                }
              }),
            }
          );
                          
          const response2 = await res2.json();
          if(response2.data.id>0){
            
          }
        } catch (error) {
          
        }
      });

      /***************** UPDATE LOS REGISTROS DOMINGOS **********/
      valuesPlanificationData.elements_7.map(async element => {
        try {
          const 
          res2 = 
          await fetch(StrapiUrl+"shifts/"+element.id, 
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data:{
                  sunday_num_agents: element.num_agentes_necesarios
                }
              }),
            }
          );
                          
          const response2 = await res2.json();
          if(response2.data.id>0){
            
          }
        } catch (error) {
          
        }
      });

      
      

      
    } catch (error) {
      //console.log(error);
    }

    setTimeout(() => {
      valuesInfoDialogText.showProgress = false;
      valuesInfoDialogText.dialog_title = "Turnos Actualizados con éxito.";
      //handleCloseModal();
      router.push("/importar-registros-de-atencion/");
    }, 7000);
  };


  return (
    <Grid container spacing={6}>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Alerta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid item xs={12}>
              <div>{valuesInfoDialogText.dialog_title}</div>
              <Grid item xs={12} style={{ display: valuesInfoDialogText.showProgress ? undefined : 'none' }}>
                <CircularProgress />
                <br />
                <Alert severity="info">{valuesInfoDialogText.mensaje_progress}</Alert>
                <br />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      

      <Grid item xs={2}>
        <InputLabel>intervalLength</InputLabel>
        <OutlinedInput
          value={valuesPlanificationData.intervalLength}
          id='intervalLength'
          onChange={handleChange('intervalLength')}
          type='number'
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={2}>
        <InputLabel>aht</InputLabel>
        <OutlinedInput
          value={valuesPlanificationData.aht}
          id='aht'
          onChange={handleChange('aht')}
          type='number'
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={2}>
        <InputLabel>targetServiceLevel</InputLabel>
        <OutlinedInput
          value={valuesPlanificationData.targetServiceLevel}
          id='targetServiceLevel'
          onChange={handleChange('targetServiceLevel')}
          type='number'
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={2}>
        <InputLabel>targetTime</InputLabel>
        <OutlinedInput
          value={valuesPlanificationData.targetTime}
          id='targetTime'
          onChange={handleChange('targetTime')}
          type='number'
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={2}>
        <InputLabel>maxOccupancy</InputLabel>
        <OutlinedInput
          value={valuesPlanificationData.maxOccupancy}
          id='maxOccupancy'
          onChange={handleChange('maxOccupancy')}
          type='number'
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={2}>
        <InputLabel>shrinkage</InputLabel>
        <OutlinedInput
          value={valuesPlanificationData.shrinkage}
          id='shrinkage'
          onChange={handleChange('shrinkage')}
          type='number'
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Grid>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={4}>
                <InputLabel >Escoja el archivo Excel</InputLabel>
                <OutlinedInput
                  id='upload'
                  name="upload"
                  type='file'
                  fullWidth
                  required
                  onChange={readUploadFile}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' size='large'>
                  Calcular Agentes Necesarios
                </Button>
              </Grid>
            </Grid>
          </form>

          
          
          
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Agentes Necesarios Por Hora
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell>Hora Desde</TableCell>
                  <TableCell>Hora Hasta</TableCell>
                  <TableCell>Lunes</TableCell>
                  <TableCell>Martes</TableCell>
                  <TableCell>Miércoles</TableCell>
                  <TableCell>Jueves</TableCell>
                  <TableCell>Viernes</TableCell>
                  <TableCell>Sábado</TableCell>
                  <TableCell>Domingo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesPlanificationData.agentesNecesariosPorHora
                  .map((row) => {
                    return (
                      <TableRow key={row.time_from}>

                        <TableCell>{row.time_from}</TableCell>
                        <TableCell>{row.time_to}</TableCell>
                        <TableCell>{row.calculo_erlang_c_1}</TableCell>
                        <TableCell>{row.calculo_erlang_c_2}</TableCell>
                        <TableCell>{row.calculo_erlang_c_3}</TableCell>
                        <TableCell>{row.calculo_erlang_c_4}</TableCell>
                        <TableCell>{row.calculo_erlang_c_5}</TableCell>
                        <TableCell>{row.calculo_erlang_c_6}</TableCell>
                        <TableCell>{row.calculo_erlang_c_7}</TableCell>

                   
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
          
      </Grid>

      <Grid item xs={4}>
        <Typography variant='h5'>
          Turnos Lunes
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell>Hora Desde</TableCell>
                  <TableCell>Hora Hasta</TableCell>
                  <TableCell>Tipo de Turno</TableCell>
                  <TableCell>Agentes Necesarios</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesPlanificationData.elements_1
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>

                        <TableCell>{row.time_from}</TableCell>
                        <TableCell>{row.time_to}</TableCell>
                        <TableCell>{row.type_of_shift}</TableCell>
                        <TableCell>

                          <OutlinedInput
                            id={row.id+'num_agentes_necesarios_1'}
                            name={row.id+'num_agentes_necesarios_1'}
                            value={row.num_agentes_necesarios}
                            onChange={handleChangeNumAgent(row.id, 'num_agentes_necesarios', 1 , row.id+'num_agentes_necesarios_1')}
                            type='number'
                            fullWidth
                          />                          
                        </TableCell>

                   
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
          
      </Grid>

      <Grid item xs={4}>
        <Typography variant='h5'>
          Turnos Martes
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell>Hora Desde</TableCell>
                  <TableCell>Hora Hasta</TableCell>
                  <TableCell>Tipo de Turno</TableCell>
                  <TableCell>Agentes Necesarios</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesPlanificationData.elements_2
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>

                        <TableCell>{row.time_from}</TableCell>
                        <TableCell>{row.time_to}</TableCell>
                        <TableCell>{row.type_of_shift}</TableCell>
                        <TableCell>

                          <OutlinedInput
                            id={row.id+'num_agentes_necesarios_2'}
                            name={row.id+'num_agentes_necesarios_2'}
                            value={row.num_agentes_necesarios}
                            onChange={handleChangeNumAgent(row.id, 'num_agentes_necesarios', 2 , row.id+'num_agentes_necesarios_2')}
                            type='number'
                            fullWidth
                          />                          
                        </TableCell>

                   
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
          
      </Grid>

      <Grid item xs={4}>
        <Typography variant='h5'>
          Turnos Miércoles
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell>Hora Desde</TableCell>
                  <TableCell>Hora Hasta</TableCell>
                  <TableCell>Tipo de Turno</TableCell>
                  <TableCell>Agentes Necesarios</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesPlanificationData.elements_3
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>

                        <TableCell>{row.time_from}</TableCell>
                        <TableCell>{row.time_to}</TableCell>
                        <TableCell>{row.type_of_shift}</TableCell>
                        <TableCell>

                          <OutlinedInput
                            id={row.id+'num_agentes_necesarios_3'}
                            name={row.id+'num_agentes_necesarios_3'}
                            value={row.num_agentes_necesarios}
                            onChange={handleChangeNumAgent(row.id, 'num_agentes_necesarios', 3 , row.id+'num_agentes_necesarios_3')}
                            type='number'
                            fullWidth
                          />                          
                        </TableCell>

                   
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
          
      </Grid>

      <Grid item xs={4}>
        <Typography variant='h5'>
          Turnos Jueves
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell>Hora Desde</TableCell>
                  <TableCell>Hora Hasta</TableCell>
                  <TableCell>Tipo de Turno</TableCell>
                  <TableCell>Agentes Necesarios</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesPlanificationData.elements_4
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>

                        <TableCell>{row.time_from}</TableCell>
                        <TableCell>{row.time_to}</TableCell>
                        <TableCell>{row.type_of_shift}</TableCell>
                        <TableCell>

                          <OutlinedInput
                            id={row.id+'num_agentes_necesarios_4'}
                            name={row.id+'num_agentes_necesarios_4'}
                            value={row.num_agentes_necesarios}
                            onChange={handleChangeNumAgent(row.id, 'num_agentes_necesarios', 4 , row.id+'num_agentes_necesarios_4')}
                            type='number'
                            fullWidth
                          />                          
                        </TableCell>

                   
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
          
      </Grid>

      <Grid item xs={4}>
        <Typography variant='h5'>
          Turnos Viernes
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell>Hora Desde</TableCell>
                  <TableCell>Hora Hasta</TableCell>
                  <TableCell>Tipo de Turno</TableCell>
                  <TableCell>Agentes Necesarios</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesPlanificationData.elements_5
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>

                        <TableCell>{row.time_from}</TableCell>
                        <TableCell>{row.time_to}</TableCell>
                        <TableCell>{row.type_of_shift}</TableCell>
                        <TableCell>

                          <OutlinedInput
                            id={row.id+'num_agentes_necesarios_5'}
                            name={row.id+'num_agentes_necesarios_5'}
                            value={row.num_agentes_necesarios}
                            onChange={handleChangeNumAgent(row.id, 'num_agentes_necesarios', 5 , row.id+'num_agentes_necesarios_5')}
                            type='number'
                            fullWidth
                          />                          
                        </TableCell>

                   
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
          
      </Grid>

      <Grid item xs={4}>
        <Typography variant='h5'>
          Turnos Sábados
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell>Hora Desde</TableCell>
                  <TableCell>Hora Hasta</TableCell>
                  <TableCell>Tipo de Turno</TableCell>
                  <TableCell>Agentes Necesarios</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesPlanificationData.elements_6
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>

                        <TableCell>{row.time_from}</TableCell>
                        <TableCell>{row.time_to}</TableCell>
                        <TableCell>{row.type_of_shift}</TableCell>
                        <TableCell>

                          <OutlinedInput
                            id={row.id+'num_agentes_necesarios_6'}
                            name={row.id+'num_agentes_necesarios_6'}
                            value={row.num_agentes_necesarios}
                            onChange={handleChangeNumAgent(row.id, 'num_agentes_necesarios', 6 , row.id+'num_agentes_necesarios_6')}
                            type='number'
                            fullWidth
                          />                          
                        </TableCell>

                   
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
          
      </Grid>

      <Grid item xs={4}>
        <Typography variant='h5'>
          Turnos Domingo
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell>Hora Desde</TableCell>
                  <TableCell>Hora Hasta</TableCell>
                  <TableCell>Tipo de Turno</TableCell>
                  <TableCell>Agentes Necesarios</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesPlanificationData.elements_7
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>

                        <TableCell>{row.time_from}</TableCell>
                        <TableCell>{row.time_to}</TableCell>
                        <TableCell>{row.type_of_shift}</TableCell>
                        <TableCell>

                          <OutlinedInput
                            id={row.id+'num_agentes_necesarios_7'}
                            name={row.id+'num_agentes_necesarios_7'}
                            value={row.num_agentes_necesarios}
                            onChange={handleChangeNumAgent(row.id, 'num_agentes_necesarios', 7 , row.id+'num_agentes_necesarios_7')}
                            type='number'
                            fullWidth
                          />                          
                        </TableCell>

                   
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
          
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={saveShifts}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                Guardar Turnos
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      
    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const site_id_logueado = getCookie('site_id', context);

  const res = await fetch(StrapiUrl+"shifts?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const response = await res.json();
  const elements: ElementData[]=[];
  const elements_1: ElementData[]=[];
  const elements_2: ElementData[]=[];
  const elements_3: ElementData[]=[];
  const elements_4: ElementData[]=[];
  const elements_5: ElementData[]=[];
  const elements_6: ElementData[]=[];
  const elements_7: ElementData[]=[];
  const agentesNecesariosPorHora: AgentesNecesariosPorHora[]=[];

  const groupAndAgents: GroupAndAgentData[]=[];


  const resGA = await fetch(StrapiUrl+"groups-and-agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=order%3Aasc");
  const responseGA = await resGA.json();

  try {

    for (let i = 0; i < responseGA.data.length; i++) {

      const row =       responseGA.data[i];
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
     
      groupAndAgents.push(
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


  try {

    

    for (let index = 0; index < 24; index++) {
      let time_from_value = "";
      let time_to_value = "";

      const hour_from = index;
      let hour_to = hour_from + 1;

      if(hour_to == 24){
        hour_to = 0;
      }
      if(hour_from < 10){
        time_from_value = "0"+hour_from+":00:00";
      }else{
        time_from_value = hour_from+":00:00";
      }

      if(hour_to < 10){
        time_to_value = "0"+hour_to+":00:00";
      }else{
        time_to_value = hour_to+":00:00";
      }

      agentesNecesariosPorHora.push({
        time_from: time_from_value,
        time_to: time_to_value,
        calculo_erlang_c_1: 0,
        calculo_erlang_c_2: 0,
        calculo_erlang_c_3: 0,
        calculo_erlang_c_4: 0,
        calculo_erlang_c_5: 0,
        calculo_erlang_c_6: 0,
        calculo_erlang_c_7: 0,

        llamadas_1: 0,
        llamadas_2: 0,
        llamadas_3: 0,
        llamadas_4: 0,
        llamadas_5: 0,
        llamadas_6: 0,
        llamadas_7: 0,
        num_agentes_necesarios_1: 0,
        num_agentes_necesarios_2: 0,
        num_agentes_necesarios_3: 0,
        num_agentes_necesarios_4: 0,
        num_agentes_necesarios_5: 0,
        num_agentes_necesarios_6: 0,
        num_agentes_necesarios_7: 0,

  
      });


    }
    
  } catch (error) {
    
  }

  try {

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
        let type_of_agents_name = '';

        try{
          for (let i2 = 0; i2 < row.attributes.type_of_agents.data.length; i2++) {

            const row2 =       row.attributes.type_of_agents.data[i2];

            type_of_agents_name += row2.attributes.name+' | ';
  
            
          }
        }catch (ex) {
    
        }
    
        elements.push(
          {
            id: row.id,
            time_from: row.attributes.time_from,
            time_to: row.attributes.time_to,
            type_of_shift: row.attributes.type_of_shift.data.attributes.name,
            num_agentes_necesarios: row.attributes.num_agentes_necesarios

          }
        );

        if(row.attributes.type_of_shift.data.attributes.monday==true){
          elements_1.push(
            {
              id: row.id,
              time_from: row.attributes.time_from,
              time_to: row.attributes.time_to,
              type_of_shift: row.attributes.type_of_shift.data.attributes.name,
              num_agentes_necesarios: row.attributes.monday_num_agents
  
            }
          );
        }
        if(row.attributes.type_of_shift.data.attributes.tuesday==true){
          elements_2.push(
            {
              id: row.id,
              time_from: row.attributes.time_from,
              time_to: row.attributes.time_to,
              type_of_shift: row.attributes.type_of_shift.data.attributes.name,
              num_agentes_necesarios: row.attributes.tuesday_num_agents
  
            }
          );
        }
        if(row.attributes.type_of_shift.data.attributes.wednesday==true){
          elements_3.push(
            {
              id: row.id,
              time_from: row.attributes.time_from,
              time_to: row.attributes.time_to,
              type_of_shift: row.attributes.type_of_shift.data.attributes.name,
              num_agentes_necesarios: row.attributes.wednesday_num_agents
  
            }
          );
        }
        if(row.attributes.type_of_shift.data.attributes.thursday==true){
          elements_4.push(
            {
              id: row.id,
              time_from: row.attributes.time_from,
              time_to: row.attributes.time_to,
              type_of_shift: row.attributes.type_of_shift.data.attributes.name,
              num_agentes_necesarios: row.attributes.thursday_num_agents
  
            }
          );
        }
        if(row.attributes.type_of_shift.data.attributes.friday==true){
          elements_5.push(
            {
              id: row.id,
              time_from: row.attributes.time_from,
              time_to: row.attributes.time_to,
              type_of_shift: row.attributes.type_of_shift.data.attributes.name,
              num_agentes_necesarios: row.attributes.friday_num_agents
  
            }
          );
        }
        if(row.attributes.type_of_shift.data.attributes.saturday==true){
          elements_6.push(
            {
              id: row.id,
              time_from: row.attributes.time_from,
              time_to: row.attributes.time_to,
              type_of_shift: row.attributes.type_of_shift.data.attributes.name,
              num_agentes_necesarios: row.attributes.saturday_num_agents
  
            }
          );
        }
        if(row.attributes.type_of_shift.data.attributes.sunday==true){
          elements_7.push(
            {
              id: row.id,
              time_from: row.attributes.time_from,
              time_to: row.attributes.time_to,
              type_of_shift: row.attributes.type_of_shift.data.attributes.name,
              num_agentes_necesarios: row.attributes.sunday_num_agents
  
            }
          );
        }
      }
    
    
    

  } catch (ex) {
    
  }

  const intervalLength = 3600;
  const aht = 510;
  const targetServiceLevel = 0.90;
  const targetTime = 60;
  const maxOccupancy = 0.85;
  const shrinkage = 0.30;

  const planificationData: PlanificationData={
    total_1: 0,
    total_2: 0,
    total_3: 0,
    total_4: 0,
    total_5: 0,
    total_6: 0,
    total_7: 0,

    intervalLength: intervalLength,
    aht: aht,
    targetServiceLevel: targetServiceLevel,
    targetTime: targetTime,
    maxOccupancy: maxOccupancy,
    shrinkage: shrinkage,

    agentesNecesariosPorHora: agentesNecesariosPorHora,
    elements_1: elements_1,
    elements_2: elements_2,
    elements_3: elements_3,
    elements_4: elements_4,
    elements_5: elements_5,
    elements_6: elements_6,
    elements_7: elements_7,
  }


  

  return {
    props: { 
      planificationData,
      groupAndAgents,
      elements,
      elements_1,
      elements_2,
      elements_3,
      elements_4,
      elements_5,
      elements_6,
      elements_7,

     },
  };
};

export default MUITable
