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
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useRef } from 'react';
import Chip from '@mui/material/Chip'


import * as XLSX from 'xlsx-js-style';
import * as FileSaver from 'file-saver';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'

import StrapiUrl from 'src/confignl/StrapiUrl';
import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';
interface GroupsAndAgentsData {
  id: number;
  name: string;
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
  horas_extras_actuales: number;
};

interface VacationAgents {
  id: number;
  date_from: any;
  date_to: any;
  days_before_to_remind: number;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  agents: any;
  agent_id: number;


};

interface UnavailableDateAgentsData {
  id: number;
  date_from: any;
  date_to: any;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  agents: any;
  agent_id: number;

};


interface ScheduleData {
  id: number;
  date_day_1: any;
  date_day_2: any;
  date_day_3: any;
  date_day_4: any;
  date_day_5: any;
  date_day_6: any;
  date_day_7: any;
  view_name_shift: boolean;
  view_name_place: boolean;
  date_from: any;
  date_to: any;
  internal_code: string;
  production: number;
  observations: string;

  supervisor_nacional: string;
};

interface PlaceData {
  id: number;
  name: string;
};

interface GroupAndAgentsData {
  id: number;
  name: string;
};

interface ScheduleDayLeadersData {
  groups_and_agent: string;
  date: string;
  order: number;
  name: string;
};

interface ScheduleDayStandbiesData {
  groups_and_agent: string;
  date: string;
  order: number;
  name: string;
};



interface ScheduleDayTurnData {
  color: string;
  name: string;
  name_place: string;
  id: number;
  date: any;
  shift_id: number;
  time_from: any;
  time_to: any;
  horas_extras: number;
  velada: number;
  soporte: number;
  total: number;
  place: PlaceData;
  position_row: number;
  row_span: number;
  groups_and_agents: GroupAndAgentsData[];
};

interface ScheduleDayDescansanData {
  id: number;
  date: any;
  groups_and_agents: GroupAndAgentsData[];
  total: number;
};

interface InfoElementDialogText {
  dialog_title: any;
};

interface tableShiftHtml {
  color_1: string;
  color_2: string;
  color_3: string;
  color_4: string;
  color_5: string;
  color_6: string;
  color_7: string;
  row_span: number;
  turno_1: string;
  turno_2: string;
  turno_3: string;
  turno_4: string;
  turno_5: string;
  turno_6: string;
  turno_7: string;

  turno_1_id: number;
  turno_2_id: number;
  turno_3_id: number;
  turno_4_id: number;
  turno_5_id: number;
  turno_6_id: number;
  turno_7_id: number;


  columnas_1: any[];
  columnas_2: any[];
  columnas_3: any[];
  columnas_4: any[];
  columnas_5: any[];
  columnas_6: any[];
  columnas_7: any[];
}

interface tableDescansanHtml {
  row_span: number;
  turno_1: string;
  turno_2: string;
  turno_3: string;
  turno_4: string;
  turno_5: string;
  turno_6: string;
  turno_7: string;
  columnas_1: any[];
  columnas_2: any[];
  columnas_3: any[];
  columnas_4: any[];
  columnas_5: any[];
  columnas_6: any[];
  columnas_7: any[];
}

interface FormDataGroupsAndAgents {
  id: number;
  name: string;
  order: number;
  available: number;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  agents: any;
  agent_id: number;
  group: any;
  group_id: number;
  place: any;
  rules_day: any;
  rules_hour: any;
  rules_day_order: number;
  rules_hour_order: number;
  rules_hour_from: any;
  rules_hour_to: any;


  horas_extras_actuales: number;
  total_dia_1: number;
  total_dia_2: number;
  total_dia_3: number;
  total_dia_4: number;
  total_dia_5: number;
  total_dia_6: number;
  total_dia_7: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  vacaciones: number;
  dias_no_disponible: number;
  skip_order_group_day: any;
  skip_order_group_hour: any;
  type_rule: any;
};

interface ColorHeader {
  color_fecha_1: string;
  color_fecha_2: string;
  color_fecha_3: string;
  color_fecha_4: string;
  color_fecha_5: string;
  color_fecha_6: string;
  color_fecha_7: string;

  color_text_fecha_1: string;
  color_text_fecha_2: string;
  color_text_fecha_3: string;
  color_text_fecha_4: string;
  color_text_fecha_5: string;
  color_text_fecha_6: string;
  color_text_fecha_7: string;
}

interface Props {
  
  ColorHeader: ColorHeader;
  tableShiftHtml: tableShiftHtml[];
  tableDescansanHtml: tableDescansanHtml[];
  schedule: ScheduleData;
  scheduleDayStandbies: ScheduleDayStandbiesData[];
  scheduleDayLeaders: ScheduleDayLeadersData[];
  groupsAndAgents: FormDataGroupsAndAgents[];

  vacationAgents: VacationAgents[];
  unavailableDateAgents: UnavailableDateAgentsData[];

  day1_agents: any[];
  day2_agents: any[];
  day3_agents: any[];
  day4_agents: any[];
  day5_agents: any[];
  day6_agents: any[];
  day7_agents: any[];
  scheduleDayRow: ScheduleDayTurnData[];
  scheduleDayTurn1: ScheduleDayTurnData[];
  scheduleDayTurn2: ScheduleDayTurnData[];
  scheduleDayTurn3: ScheduleDayTurnData[];
  scheduleDayTurn4: ScheduleDayTurnData[];
  scheduleDayTurn5: ScheduleDayTurnData[];
  scheduleDayTurn6: ScheduleDayTurnData[];
  scheduleDayTurn7: ScheduleDayTurnData[];

  scheduleDayRowDescansan: ScheduleDayDescansanData[];
  scheduleDayDescansan1: ScheduleDayDescansanData[];
  scheduleDayDescansan2: ScheduleDayDescansanData[];
  scheduleDayDescansan3: ScheduleDayDescansanData[];
  scheduleDayDescansan4: ScheduleDayDescansanData[];
  scheduleDayDescansan5: ScheduleDayDescansanData[];
  scheduleDayDescansan6: ScheduleDayDescansanData[];
  scheduleDayDescansan7: ScheduleDayDescansanData[];


}

function retornarFechaDeLaSemana(fechaConsultar, fechaPorNDia) {
  const fecha = new Date(fechaConsultar);

  if (fechaPorNDia <= fecha.getDay()) {
    fecha.setDate(fecha.getDate() - (fecha.getDay() - fechaPorNDia));

  } else {
    fecha.setDate(fecha.getDate() + (fechaPorNDia - fecha.getDay()));

  }

  return fecha;
}

const MUITable = ({ ColorHeader,       groupsAndAgents=[], unavailableDateAgents=[], vacationAgents = [], scheduleDayStandbies= [], scheduleDayLeaders=[], day1_agents = [], day2_agents = [], day3_agents = [], day4_agents = [], day5_agents = [], day6_agents = [], day7_agents = [], schedule, scheduleDayDescansan1 = [], scheduleDayRowDescansan=[], scheduleDayDescansan2 = [], scheduleDayDescansan3 = [], scheduleDayDescansan4 = [], scheduleDayDescansan5 = [], scheduleDayDescansan6 = [], scheduleDayDescansan7 = [], scheduleDayRow = [], tableShiftHtml = [], tableDescansanHtml= [], scheduleDayTurn1 = [], scheduleDayTurn2 = [], scheduleDayTurn3 = [], scheduleDayTurn4 = [], scheduleDayTurn5 = [], scheduleDayTurn6 = [], scheduleDayTurn7 = [], }: Props) => {

  const { push } = useRouter();

  const tableRef = useRef(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [valuesMensajesAlert, setValuesMensajesAlert] = useState({
    mensaje: '',
    type: 'error',
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };


  function ver_mensaje_modal(mensaje) {
    try {

      valuesInfoDialogText.dialog_title = mensaje;
      handleClickOpenModal();


    } catch (error) {
      alert(error)
    }
  }

  const exportToExcel = async () => {

    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH"]; 

    const tbl = document.getElementById('sheetjs');
    const ws = XLSX.utils.table_to_sheet(tbl);

    const width_t1 = 20;
    let width_t2 = 20;
    let width_t3 = 20;
    let width_t4 = 20;
    let width_t5 = 20;

    if(ws['F3'].v=='.'){
      width_t2 = 2.5;
    }
    if(ws['K3'].v=='.'){
      width_t3 = 2.5;
    }
    if(ws['P3'].v=='.'){
      width_t4 = 2.5;
    }
    if(ws['U3'].v=='.'){
      width_t5 = 2.5;
    }


    
    const wscols = [
        {
          wch: width_t1,
        },
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {
          wch: width_t2,
        },
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {
          wch: width_t3,
        },
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {
          wch: width_t4,
        },
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {
          wch: width_t5,
        },
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 20},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
        {wch: 2.5},
    ];
  
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

      try {

        if(ws[i].v=='.'){
          ws[i].v = "";
        }
        
      } catch (error) {
        
      }
      

    }
    try {

      for (let index = 0; index < 3; index++) {
        for (let index2 = 0; index2 < alphabet.length; index2++) {
          const letter = alphabet[index2];
          let color_celda = "";
          let color_text = "";

          switch (index2) {
            case 0:
              color_celda = ColorHeader.color_fecha_1;
              color_text = ColorHeader.color_text_fecha_1;
              break;
            case 1:
              color_celda = ColorHeader.color_fecha_1;
              color_text = ColorHeader.color_text_fecha_1;
              break;
            case 2:
              color_celda = ColorHeader.color_fecha_1;
              color_text = ColorHeader.color_text_fecha_1;
              break;
            case 3:
              color_celda = ColorHeader.color_fecha_1;
              color_text = ColorHeader.color_text_fecha_1;
              break;
            case 4:
              color_celda = ColorHeader.color_fecha_1;
              color_text = ColorHeader.color_text_fecha_1;
              break;
            case 5:
              color_celda = ColorHeader.color_fecha_2;
              color_text = ColorHeader.color_text_fecha_2;
              break;
            case 6:
              color_celda = ColorHeader.color_fecha_2;
              color_text = ColorHeader.color_text_fecha_2;
              break;
            case 7:
              color_celda = ColorHeader.color_fecha_2;
              color_text = ColorHeader.color_text_fecha_2;
              break;
            case 8:
              color_celda = ColorHeader.color_fecha_2;
              color_text = ColorHeader.color_text_fecha_2;
              break;
            case 9:
              color_celda = ColorHeader.color_fecha_2;
              color_text = ColorHeader.color_text_fecha_2;
              break;
            case 10:
              color_celda = ColorHeader.color_fecha_3;
              color_text = ColorHeader.color_text_fecha_3;
              break;
            case 11:
              color_celda = ColorHeader.color_fecha_3;
              color_text = ColorHeader.color_text_fecha_3;
              break;
            case 12:
              color_celda = ColorHeader.color_fecha_3;
              color_text = ColorHeader.color_text_fecha_3;
              break;
            case 13:
              color_celda = ColorHeader.color_fecha_3;
              color_text = ColorHeader.color_text_fecha_3;
              break;
            case 14:
              color_celda = ColorHeader.color_fecha_3;
              color_text = ColorHeader.color_text_fecha_3;
              break;
            case 15:
              color_celda = ColorHeader.color_fecha_4;
              color_text = ColorHeader.color_text_fecha_4;
              break;
            case 16:
              color_celda = ColorHeader.color_fecha_4;
              color_text = ColorHeader.color_text_fecha_4;
              break;
            case 17:
              color_celda = ColorHeader.color_fecha_4;
              color_text = ColorHeader.color_text_fecha_4;
              break;
            case 18:
              color_celda = ColorHeader.color_fecha_4;
              color_text = ColorHeader.color_text_fecha_4;
              break;
            case 19:
              color_celda = ColorHeader.color_fecha_4;
              color_text = ColorHeader.color_text_fecha_4;
              break;
            case 20:
              color_celda = ColorHeader.color_fecha_5;
              color_text = ColorHeader.color_text_fecha_5;
              break;
            case 21:
              color_celda = ColorHeader.color_fecha_5;
              color_text = ColorHeader.color_text_fecha_5;
              break;
            case 22:
              color_celda = ColorHeader.color_fecha_5;
              color_text = ColorHeader.color_text_fecha_5;
              break;
            case 23:
              color_celda = ColorHeader.color_fecha_5;
              color_text = ColorHeader.color_text_fecha_5;
              break;
            case 24:
              color_celda = ColorHeader.color_fecha_5;
              color_text = ColorHeader.color_text_fecha_5;
              break;
            case 25:
              color_celda = ColorHeader.color_fecha_6;
              color_text = ColorHeader.color_text_fecha_6;
              break;
            case 26:
              color_celda = ColorHeader.color_fecha_6;
              color_text = ColorHeader.color_text_fecha_6;
              break;
            case 27:
              color_celda = ColorHeader.color_fecha_6;
              color_text = ColorHeader.color_text_fecha_6;
              break;
            case 28:
              color_celda = ColorHeader.color_fecha_6;
              color_text = ColorHeader.color_text_fecha_6;
              break;
            case 29:
              color_celda = ColorHeader.color_fecha_6;
              color_text = ColorHeader.color_text_fecha_6;
              break;
            case 30:
              color_celda = ColorHeader.color_fecha_7;
              color_text = ColorHeader.color_text_fecha_7;
              break;
            case 31:
              color_celda = ColorHeader.color_fecha_7;
              color_text = ColorHeader.color_text_fecha_7;
              break;
            case 32:
              color_celda = ColorHeader.color_fecha_7;
              color_text = ColorHeader.color_text_fecha_7;
              break;
            case 33:
              color_celda = ColorHeader.color_fecha_7;
              color_text = ColorHeader.color_text_fecha_7;
              break;

            
            default:
              break;
          }
          
          




          color_celda= color_celda.replace("#","");
          color_text = color_text.replace("#","");
          try {
            ws[letter+''+(index+1)].s = {
              font: {
                name: 'arial',
                bold: true,
                color: { rgb: color_text },
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
              },
              fill: {
                patternType: "solid",
                fgColor: { rgb: color_celda }
              }
            }
            
          } catch (error) {
            
          }
        }
        
      }
      
    } catch (error) {
      
    }

    try{

      /*******************COLOR CABECERA **************** */

      /*for (let index = 0; index < alphabet.length; index++) {
        const letter = alphabet[index];
        try {
          if(index>=25){
            ws[letter+'1'].s = {
              font: {
                name: 'arial',
                bold: true,
                color: { rgb: "000000" },
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
              },
              fill: {
                patternType: "solid",
                fgColor: { rgb: "92D050" }
              }
            }
            ws[letter+'2'].s = {
              font: {
                name: 'arial',
                bold: true,
                color: { rgb: "000000" },
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
              },
              fill: {
                patternType: "solid",
                fgColor: { rgb: "92D050" }
              }
            }
          }else{
            ws[letter+'1'].s = {
              font: {
                name: 'arial',
                bold: true,
                color: { rgb: "ffffff" },
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
              },
              fill: {
                patternType: "solid",
                fgColor: { rgb: "C0504D" }
              }
            }
            ws[letter+'2'].s = {
              font: {
                name: 'arial',
                bold: true,
                color: { rgb: "ffffff" },
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
              },
              fill: {
                patternType: "solid",
                fgColor: { rgb: "C0504D" }
              }
            }
          }
          
        } catch (error) {
          
        }
      }*/


      try {

        for (let index = 0; index < tableShiftHtml.length; index++) {
          for (let index2 = 0; index2 < alphabet.length; index2++) {
            const letter = alphabet[index2];
            let color_celda = "";

            switch (index2) {
              case 0:
                color_celda = tableShiftHtml[index].color_1;
                break;
              case 1:
                color_celda = tableShiftHtml[index].columnas_1[0].color;
                break;
              case 2:
                color_celda = tableShiftHtml[index].columnas_1[1].color;
                break;
              case 3:
                color_celda = tableShiftHtml[index].columnas_1[2].color;
                break;
              case 4:
                color_celda = tableShiftHtml[index].columnas_1[3].color;
                break;
              case 5:
                color_celda = tableShiftHtml[index].color_2;
                break;
              case 6:
                color_celda = tableShiftHtml[index].columnas_2[0].color;
                break;
              case 7:
                color_celda = tableShiftHtml[index].columnas_2[1].color;
                break;
              case 8:
                color_celda = tableShiftHtml[index].columnas_2[2].color;
                break;
              case 9:
                color_celda = tableShiftHtml[index].columnas_2[3].color;
                break;
              case 10:
                color_celda = tableShiftHtml[index].color_3;
                break;
              case 11:
                color_celda = tableShiftHtml[index].columnas_3[0].color;
                break;
              case 12:
                color_celda = tableShiftHtml[index].columnas_3[1].color;
                break;
              case 13:
                color_celda = tableShiftHtml[index].columnas_3[2].color;
                break;
              case 14:
                color_celda = tableShiftHtml[index].columnas_3[3].color;
                break;
              case 15:
                color_celda = tableShiftHtml[index].color_4;
                break;
              case 16:
                color_celda = tableShiftHtml[index].columnas_4[0].color;
                break;
              case 17:
                color_celda = tableShiftHtml[index].columnas_4[1].color;
                break;
              case 18:
                color_celda = tableShiftHtml[index].columnas_4[2].color;
                break;
              case 19:
                color_celda = tableShiftHtml[index].columnas_4[3].color;
                break;
              case 20:
                color_celda = tableShiftHtml[index].color_5;
                break;
              case 21:
                color_celda = tableShiftHtml[index].columnas_5[0].color;
                break;
              case 22:
                color_celda = tableShiftHtml[index].columnas_5[1].color;
                break;
              case 23:
                color_celda = tableShiftHtml[index].columnas_5[2].color;
                break;
              case 24:
                color_celda = tableShiftHtml[index].columnas_5[3].color;
                break;
              case 25:
                color_celda = tableShiftHtml[index].color_6;
                break;
              case 26:
                color_celda = tableShiftHtml[index].columnas_6[0].color;
                break;
              case 27:
                color_celda = tableShiftHtml[index].columnas_6[1].color;
                break;
              case 28:
                color_celda = tableShiftHtml[index].columnas_6[2].color;
                break;
              case 29:
                color_celda = tableShiftHtml[index].columnas_6[3].color;
                break;
              case 30:
                color_celda = tableShiftHtml[index].columnas_7[0].color;
                break;
              case 31:
                color_celda = tableShiftHtml[index].columnas_7[1].color;
                break;
              case 32:
                color_celda = tableShiftHtml[index].columnas_7[2].color;
                break;
              case 33:
                color_celda = tableShiftHtml[index].columnas_7[3].color;
                break;
              default:
                break;
            }
            
            




            color_celda= color_celda.replace("#","");

            try {
              ws[letter+''+(index+3)].s = {
                font: {
                  name: 'arial',
                  color: { rgb: "000000" },
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
                },
                fill: {
                  patternType: "solid",
                  fgColor: { rgb: color_celda }
                }
              }
              
            } catch (error) {
              
            }
          }
          
        }
        
      } catch (error) {
        
      }

      
      
      

    }catch (error){

    }

    //const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { 'Horario': ws }, SheetNames: ['Horario'] };
    XLSX.writeFile(wb, schedule.internal_code+".xlsx");
    
    //const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //const data = new Blob([excelBuffer], { type: fileType });
    //FileSaver.saveAs(data, schedule.internal_code + fileExtension);
  }

  function exportExcelXDia() {
    exportToExcel();
    ver_mensaje_modal("Se ha exportado con éxito el Reporte ")

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

  const [values, setValues] = useState<ScheduleData>(schedule)
  const router = useRouter()

  const handleChange = ( name_field: keyof Element,name_input: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {

    
    if(schedule[name_field]==true){
      schedule[name_field] = false;
    }else{
      schedule[name_field] = true;
    }

    setValues({ ...schedule, [name_input]: event.target.value })

    try {
      sessionStorage.setItem(""+name_field, schedule[name_field]);
      setCookies(''+name_field, schedule[name_field]);

      setTimeout(() => {
        router.push("/schedules/report/"+router.query.id);
        router.reload();
      }, 1000);
    } catch (error) {
      
    }


  }




  return (
    <Grid container spacing={6}>
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message={valuesMensajesAlert.mensaje}
        severity={valuesMensajesAlert.type}
      />
      <Grid>
        <Button component='a' size='small' variant='contained' sx={{ px: 5.5 }} onClick={() => router.back()}>
          Regresar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Reporte {schedule.internal_code}
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
      <Grid item xs={12}>

        <Card>
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <InputLabel >Ver Nombre del Turno</InputLabel>
            <Checkbox
                id={'view_name_shift'}
                name={'view_name_shift'}
                onChange={handleChange('view_name_shift','view_name_shift')}
                checked={schedule.view_name_shift}
              />
          </Grid>
          <Grid item xs={3}>
            <InputLabel >Ver Nombre de la Sucursal</InputLabel>
            <Checkbox
                id={'view_name_place'}
                name={'view_name_place'}
                onChange={handleChange('view_name_place','view_name_place')}
                checked={schedule.view_name_place}
              />
          </Grid>
        </Grid>
          <Button type='submit' variant='contained' size='large' onClick={exportExcelXDia}>
            Exportar Excel
          </Button>
          <TableContainer sx={{ maxHeight: 750 }} id="sheetjs">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{backgroundColor: '#C0504D', color: '#ffffff'}}>.</TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_1, color: ColorHeader.color_text_fecha_1}}><b>LUNES</b></TableCell>
                  <TableCell style={{backgroundColor: '#C0504D', color: '#ffffff'}}>.</TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_2, color: ColorHeader.color_text_fecha_2}}><b>MARTES</b></TableCell>
                  <TableCell style={{backgroundColor: '#C0504D', color: '#ffffff'}}>.</TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_3, color: ColorHeader.color_text_fecha_3}}><b>MIERCOLES</b></TableCell>
                  <TableCell style={{backgroundColor: '#C0504D', color: '#ffffff'}}>.</TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_4, color: ColorHeader.color_text_fecha_4}}><b>JUEVES</b></TableCell>
                  <TableCell style={{backgroundColor: '#C0504D', color: '#ffffff'}}>.</TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_5, color: ColorHeader.color_text_fecha_5}}><b>VIERNES</b></TableCell>
                  <TableCell style={{backgroundColor: '#92D050', color: '#000000'}}>.</TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_6, color: ColorHeader.color_text_fecha_6}}><b>SÁBADO</b></TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_7, color: ColorHeader.color_text_fecha_7}}><b>DOMINGO</b></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: '#C0504D', color: '#ffffff'}}>.</TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_1, color: ColorHeader.color_text_fecha_1}}><b>F. {schedule.date_day_1}</b></TableCell>
                  <TableCell style={{backgroundColor: '#C0504D', color: '#ffffff'}}>.</TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_2, color: ColorHeader.color_text_fecha_2}}><b>F. {schedule.date_day_2}</b></TableCell>
                  <TableCell style={{backgroundColor: '#C0504D', color: '#ffffff'}}>.</TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_3, color: ColorHeader.color_text_fecha_3}}><b>F. {schedule.date_day_3}</b></TableCell>
                  <TableCell style={{backgroundColor: '#C0504D', color: '#ffffff'}}>.</TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_4, color: ColorHeader.color_text_fecha_4}}><b>F. {schedule.date_day_4}</b></TableCell>
                  <TableCell style={{backgroundColor: '#C0504D', color: '#ffffff'}}>.</TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_5, color: ColorHeader.color_text_fecha_5}}><b>F. {schedule.date_day_5}</b></TableCell>
                  <TableCell style={{backgroundColor: '#92D050', color: '#000000'}}><b>HORARIO FIN DE SEMANA</b></TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_6, color: ColorHeader.color_text_fecha_6}}><b>F. {schedule.date_day_6}</b></TableCell>
                  <TableCell colSpan={4} style={{backgroundColor: ColorHeader.color_fecha_7, color: ColorHeader.color_text_fecha_7}}><b>F. {schedule.date_day_7}</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  tableShiftHtml.length > 0 ? (

                    tableShiftHtml.map((tableShiftELEMENT) => (
                      <TableRow key={tableShiftELEMENT.turno_1}>
                        {tableShiftELEMENT.turno_1 != "-" &&
                          <TableCell rowSpan={tableShiftELEMENT.row_span} style={{backgroundColor: tableShiftELEMENT.color_1}}><b>{tableShiftELEMENT.turno_1}</b></TableCell>
                        }
                        {
                          tableShiftELEMENT.columnas_1.length > 0 ? (

                            tableShiftELEMENT.columnas_1.map((columnElement) => (
                              <TableCell key={columnElement.name} style={{backgroundColor: columnElement.color}}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4} style={{backgroundColor: tableShiftELEMENT.color_1}}></TableCell>
                            )
                        }
                        {tableShiftELEMENT.turno_2_id != tableShiftELEMENT.turno_1_id ?
                          (
                          <TableCell rowSpan={tableShiftELEMENT.row_span} style={{backgroundColor: tableShiftELEMENT.color_2}}><b>{tableShiftELEMENT.turno_2}</b></TableCell>
                          )
                          :
                          (
                            <TableCell rowSpan={tableShiftELEMENT.row_span} style={{backgroundColor: tableShiftELEMENT.color_2}}><b>.</b></TableCell>
                          )
                        }
                        {
                          tableShiftELEMENT.columnas_2.length > 0 ? (

                            tableShiftELEMENT.columnas_2.map((columnElement) => (
                              <TableCell key={columnElement.name} style={{backgroundColor: columnElement.color}}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4} style={{backgroundColor: tableShiftELEMENT.color_2}}></TableCell>
                            )
                        }
                        {tableShiftELEMENT.turno_3_id != tableShiftELEMENT.turno_2_id ?
                          (
                          <TableCell rowSpan={tableShiftELEMENT.row_span} style={{backgroundColor: tableShiftELEMENT.color_3}}><b>{tableShiftELEMENT.turno_3}</b></TableCell>
                          )
                          :
                          (
                            <TableCell rowSpan={tableShiftELEMENT.row_span} style={{backgroundColor: tableShiftELEMENT.color_3}}><b>.</b></TableCell>
                          )
                        }
                        {
                          tableShiftELEMENT.columnas_3.length > 0 ? (

                            tableShiftELEMENT.columnas_3.map((columnElement) => (
                              <TableCell key={columnElement.name} style={{backgroundColor: columnElement.color}}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4} style={{backgroundColor: tableShiftELEMENT.color_3}}></TableCell>
                            )
                        }
                        {tableShiftELEMENT.turno_4_id != tableShiftELEMENT.turno_3_id ?
                          (
                          <TableCell rowSpan={tableShiftELEMENT.row_span} style={{backgroundColor: tableShiftELEMENT.color_4}}><b>{tableShiftELEMENT.turno_4}</b></TableCell>
                          )
                          :
                          (
                            <TableCell rowSpan={tableShiftELEMENT.row_span} style={{backgroundColor: tableShiftELEMENT.color_4}}><b>.</b></TableCell>
                          )
                        }
                        {
                          tableShiftELEMENT.columnas_4.length > 0 ? (

                            tableShiftELEMENT.columnas_4.map((columnElement) => (
                              <TableCell key={columnElement.name} style={{backgroundColor: columnElement.color}}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4} style={{backgroundColor: tableShiftELEMENT.color_4}}></TableCell>
                            )
                        }
                        {tableShiftELEMENT.turno_5_id != tableShiftELEMENT.turno_4_id ?
                          (
                          <TableCell rowSpan={tableShiftELEMENT.row_span} style={{backgroundColor: tableShiftELEMENT.color_5}}><b>{tableShiftELEMENT.turno_5}</b></TableCell>
                          )
                          :
                          (
                            <TableCell rowSpan={tableShiftELEMENT.row_span} style={{backgroundColor: tableShiftELEMENT.color_5}}><b>.</b></TableCell>
                          )
                        }
                        {
                          tableShiftELEMENT.columnas_5.length > 0 ? (

                            tableShiftELEMENT.columnas_5.map((columnElement) => (
                              <TableCell key={columnElement.name} style={{backgroundColor: columnElement.color}}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4} style={{backgroundColor: tableShiftELEMENT.color_5}}></TableCell>
                            )
                        }
                        {tableShiftELEMENT.turno_6 != "-" &&
                          <TableCell rowSpan={tableShiftELEMENT.row_span} style={{backgroundColor: tableShiftELEMENT.color_6}} ><b>{tableShiftELEMENT.turno_6}</b></TableCell>
                        }

                        {
                          tableShiftELEMENT.columnas_6.length > 0 ? (

                            tableShiftELEMENT.columnas_6.map((columnElement) => (
                              <TableCell key={columnElement.name} style={{backgroundColor: columnElement.color}}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4} style={{backgroundColor: tableShiftELEMENT.color_6}}></TableCell>
                            )
                        }
                        {
                          tableShiftELEMENT.columnas_7.length > 0 ? (

                            tableShiftELEMENT.columnas_7.map((columnElement) => (
                              <TableCell key={columnElement.name} style={{backgroundColor: columnElement.color}}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4} style={{backgroundColor: tableShiftELEMENT.color_7}}></TableCell>
                            )
                        }

                      </TableRow>

                    ))
                  ) :
                    (
                      <TableRow key={0} ><TableCell colSpan={30}></TableCell></TableRow>
                    )
                }
                {
                  tableDescansanHtml.length > 0 ? (

                    tableDescansanHtml.map((tableShiftELEMENT) => (
                      <TableRow key={tableShiftELEMENT.turno_1}>
                        {tableShiftELEMENT.turno_1 != "-" &&
                          <TableCell rowSpan={tableShiftELEMENT.row_span}><b>{tableShiftELEMENT.turno_1}</b></TableCell>
                        }
                        {
                          tableShiftELEMENT.columnas_1.length > 0 ? (

                            tableShiftELEMENT.columnas_1.map((columnElement) => (
                              <TableCell key={columnElement.name}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4}></TableCell>
                            )
                        }
                        <TableCell></TableCell>
                        {
                          tableShiftELEMENT.columnas_2.length > 0 ? (

                            tableShiftELEMENT.columnas_2.map((columnElement) => (
                              <TableCell key={columnElement.name}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4}></TableCell>
                            )
                        }
                        <TableCell></TableCell>
                        {
                          tableShiftELEMENT.columnas_3.length > 0 ? (

                            tableShiftELEMENT.columnas_3.map((columnElement) => (
                              <TableCell key={columnElement.name}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4}></TableCell>
                            )
                        }
                        <TableCell></TableCell>
                        
                        
                        {
                          tableShiftELEMENT.columnas_4.length > 0 ? (

                            tableShiftELEMENT.columnas_4.map((columnElement) => (
                              <TableCell key={columnElement.name}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4}></TableCell>
                            )
                        }
                        <TableCell></TableCell>
                        {
                          tableShiftELEMENT.columnas_5.length > 0 ? (

                            tableShiftELEMENT.columnas_5.map((columnElement) => (
                              <TableCell key={columnElement.name}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4}></TableCell>
                            )
                        }
                        {tableShiftELEMENT.turno_6 != "-" &&
                          <TableCell rowSpan={tableShiftELEMENT.row_span}><b>{tableShiftELEMENT.turno_1}</b></TableCell>
                        }

                        {
                          tableShiftELEMENT.columnas_6.length > 0 ? (

                            tableShiftELEMENT.columnas_6.map((columnElement) => (
                              <TableCell key={columnElement.name}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4}></TableCell>
                            )
                        }
                        {
                          tableShiftELEMENT.columnas_7.length > 0 ? (

                            tableShiftELEMENT.columnas_7.map((columnElement) => (
                              <TableCell key={columnElement.name}>{columnElement.name}</TableCell>
                            ))
                          ) :
                            (
                              <TableCell colSpan={4}></TableCell>
                            )
                        }

                      </TableRow>

                    ))
                  ) :
                    (
                      <TableRow key={0} ><TableCell colSpan={30}></TableCell></TableRow>
                    )
                }
                <TableRow key={'d2'}>
                  <TableCell><b>Total Trabajan</b></TableCell>


                  <TableCell colSpan={4}>{day1_agents.length}</TableCell>
                  <TableCell></TableCell>
                  <TableCell colSpan={4}>{day2_agents.length}</TableCell>
                  <TableCell></TableCell>
                  <TableCell colSpan={4}>{day3_agents.length}</TableCell>
                  <TableCell></TableCell>
                  <TableCell colSpan={4}>{day4_agents.length}</TableCell>
                  <TableCell></TableCell>
                  <TableCell colSpan={4}>{day5_agents.length}</TableCell>
                  <TableCell><b>Total Trabajan</b></TableCell>
                  <TableCell colSpan={4}>{day6_agents.length}</TableCell>
                  <TableCell colSpan={4}>{day7_agents.length}</TableCell>
                </TableRow>
                <TableRow key={'d3'}>
                  <TableCell><b>Total Descansan</b></TableCell>
                  {
                    scheduleDayDescansan1.length > 0 ? (
                      scheduleDayDescansan1.map((DESCANSAN_ROW_COLUMN) => (
                        <TableCell colSpan={4} key={DESCANSAN_ROW_COLUMN.id}>{DESCANSAN_ROW_COLUMN.total}</TableCell>
                      ))
                    ) : (
                      <TableCell colSpan={4}>0</TableCell>
                    )
                  }
                  <TableCell></TableCell>
                  {
                    scheduleDayDescansan2.length > 0 ? (
                      scheduleDayDescansan2.map((DESCANSAN_ROW_COLUMN) => (
                        <TableCell colSpan={4} key={DESCANSAN_ROW_COLUMN.id}>{DESCANSAN_ROW_COLUMN.total}</TableCell>
                      ))
                    ) : (
                      <TableCell colSpan={4}>0</TableCell>
                    )
                  }
                  <TableCell></TableCell>
                  {
                    scheduleDayDescansan3.length > 0 ? (
                      scheduleDayDescansan3.map((DESCANSAN_ROW_COLUMN) => (
                        <TableCell colSpan={4} key={DESCANSAN_ROW_COLUMN.id}>{DESCANSAN_ROW_COLUMN.total}</TableCell>
                      ))
                    ) : (
                      <TableCell colSpan={4}>0</TableCell>
                    )
                  }
                  <TableCell></TableCell>
                  {
                    scheduleDayDescansan4.length > 0 ? (
                      scheduleDayDescansan4.map((DESCANSAN_ROW_COLUMN) => (
                        <TableCell colSpan={4} key={DESCANSAN_ROW_COLUMN.id}>{DESCANSAN_ROW_COLUMN.total}</TableCell>
                      ))
                    ) : (
                      <TableCell colSpan={4}>0</TableCell>
                    )
                  }
                  <TableCell></TableCell>
                  {
                    scheduleDayDescansan5.length > 0 ? (
                      scheduleDayDescansan5.map((DESCANSAN_ROW_COLUMN) => (
                        <TableCell colSpan={4} key={DESCANSAN_ROW_COLUMN.id}>{DESCANSAN_ROW_COLUMN.total}</TableCell>
                      ))
                    ) : (
                      <TableCell colSpan={4}>0</TableCell>
                    )
                  }
                  <TableCell><b>Total Descansan</b></TableCell>
                  {
                    scheduleDayDescansan6.length > 0 ? (
                      scheduleDayDescansan6.map((DESCANSAN_ROW_COLUMN) => (
                        <TableCell colSpan={4} key={DESCANSAN_ROW_COLUMN.id}>{DESCANSAN_ROW_COLUMN.total}</TableCell>
                      ))
                    ) : (
                      <TableCell colSpan={4}>0</TableCell>
                    )
                  }
                  {
                    scheduleDayDescansan7.length > 0 ? (
                      scheduleDayDescansan7.map((DESCANSAN_ROW_COLUMN) => (
                        <TableCell colSpan={4} key={DESCANSAN_ROW_COLUMN.id}>{DESCANSAN_ROW_COLUMN.total}</TableCell>
                      ))
                    ) : (
                      <TableCell colSpan={4}>0</TableCell>
                    )
                  }
                </TableRow>
                <TableRow>
                  <TableCell>

                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>

                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={34}>
                    <b>Supervisor Nacional</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={34}>
                    {schedule.supervisor_nacional}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell >

                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={34}>
                    <b>Líderes</b>
                  </TableCell>
                  
                </TableRow>
                <TableRow>
                  <TableCell colSpan={14}>
                    <b></b>
                  </TableCell>
                  <TableCell colSpan={10}>
                    <b>Fecha</b>
                  </TableCell>
                  <TableCell colSpan={10}>
                    <b>Agente</b>
                  </TableCell>
                  
                </TableRow>
                {
                  scheduleDayLeaders.length > 0 ? (
                    scheduleDayLeaders.map((ROW_LEADERS) => (
                      <TableRow key={ROW_LEADERS.name}>
                        <TableCell colSpan={14}>
                          <b>{ROW_LEADERS.name}</b>
                        </TableCell>
                        <TableCell colSpan={10}>
                          {ROW_LEADERS.date}&nbsp; 
                        </TableCell>
                        <TableCell colSpan={10}>
                          {ROW_LEADERS.groups_and_agent}
                        </TableCell>
                        
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell></TableCell></TableRow>
                  )
                }
                <TableRow>
                  <TableCell>

                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={34}>
                    <b>StandBy</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={14}>
                    <b></b>
                  </TableCell>
                  <TableCell colSpan={10}>
                    <b>Fecha</b>
                  </TableCell>
                  <TableCell colSpan={10}>
                    <b>Agente</b>
                  </TableCell>
                </TableRow>
                {
                  scheduleDayStandbies.length > 0 ? (
                    scheduleDayStandbies.map((ROW_LEADERS) => (
                      <TableRow key={ROW_LEADERS.name}>
                        <TableCell colSpan={14}>
                          <b>{ROW_LEADERS.name}</b>
                        </TableCell>
                        <TableCell colSpan={10}>
                          {ROW_LEADERS.date} &nbsp;
                        </TableCell>
                        <TableCell colSpan={10}>
                          {ROW_LEADERS.groups_and_agent}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell></TableCell></TableRow>
                  )
                }
                <TableRow>
                  <TableCell>

                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={34}>
                    <b>Días No Disponibles por Agente</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={11}>
                    <b>Fecha Desde</b>
                  </TableCell>
                  <TableCell colSpan={7}>
                    <b>Fecha Hasta</b>
                  </TableCell>
                  <TableCell colSpan={7}>
                    <b>Agente</b>
                  </TableCell>
                  <TableCell colSpan={9}>
                    <b>Observaciones</b>
                  </TableCell>
                </TableRow>
                {
                  unavailableDateAgents.length > 0 ? (
                    unavailableDateAgents.map((ROW) => (
                      <TableRow key={ROW.id}>
                        <TableCell colSpan={11}>
                          {ROW.date_from}
                        </TableCell>
                        <TableCell colSpan={7}>
                          {ROW.date_to}
                        </TableCell>
                        <TableCell colSpan={7}>
                          {ROW.agents}
                        </TableCell>
                        <TableCell colSpan={9}>
                          {ROW.observations}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell></TableCell></TableRow>
                  )
                }
                <TableRow>
                  <TableCell>

                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={34}>
                    <b>Vacaciones</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={14}>
                    <b>Fecha Desde</b>
                  </TableCell>
                  <TableCell colSpan={10}>
                    <b>Fecha Hasta</b>
                  </TableCell>
                  <TableCell colSpan={10}>
                    <b>Agente</b>
                  </TableCell>
                </TableRow>
                {
                  vacationAgents.length > 0 ? (
                    vacationAgents.map((ROW) => (
                      <TableRow key={ROW.id}> 
                        <TableCell colSpan={14}>
                          {ROW.date_from}
                        </TableCell>
                        <TableCell colSpan={10}>
                          {ROW.date_to}
                        </TableCell>
                        <TableCell colSpan={10}>
                          {ROW.agents}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell></TableCell></TableRow>
                  )
                }
                <TableRow>
                  <TableCell>

                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={34}>
                    <b>Agentes</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6}>
                    <b>Nombre</b>
                  </TableCell>
                  <TableCell colSpan={4}>
                    <b>Grupo</b>
                  </TableCell>
                  <TableCell colSpan={8}>
                    <b>Agente</b>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <b>L</b>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <b>M</b>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <b>X</b>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <b>J</b>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <b>V</b>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <b>S</b>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <b>D</b>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <b>T</b>
                  </TableCell>
                </TableRow>
                {
                  groupsAndAgents.length > 0 ? (
                    groupsAndAgents.sort((a,b) => a.name - b.name).map((ROW) => (
                      <TableRow key={ROW.id}> 
                        <TableCell colSpan={6}>
                          {ROW.name}
                        </TableCell>
                        <TableCell colSpan={4}>
                          {ROW.group}
                        </TableCell>
                        <TableCell colSpan={8}>
                          {ROW.agents}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {ROW.total_dia_1}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {ROW.total_dia_2}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {ROW.total_dia_3}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {ROW.total_dia_4}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {ROW.total_dia_5}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {ROW.total_dia_6}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {ROW.total_dia_7}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {ROW.total_dia_1+ROW.total_dia_2+ROW.total_dia_3+ROW.total_dia_4+ROW.total_dia_5+ROW.total_dia_6+ROW.total_dia_7}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell></TableCell></TableRow>
                  )
                }

                
                
              </TableBody >

            </Table>
          </TableContainer>
        </Card>
      </Grid>

    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const site_id_logueado = getCookie('site_id', context);

  
  const view_name_shift = getCookie('view_name_shift', context);
  const view_name_place = getCookie('view_name_place', context);


  const { id } = context.query;
  const res = await fetch(StrapiUrl + "schedules/" + id + "?populate=%2A");
  const response = await res.json();
  //console.log(response.data);
  let date_from_value = '';
  let date_to_value = '';
  let observations_value = '';
  let internal_code_value = '';
  let production_value = 0;
  let supervisor_nacional_value = '';

  let view_name_shift_value = false;
  let view_name_place_value = false;

  if(view_name_shift){
    view_name_shift_value=true;
  }
  if(view_name_place){
    view_name_place_value=true;
  }



  let color_fecha_1_value = "#C0504D";
  let color_fecha_2_value = "#C0504D";
  let color_fecha_3_value = "#C0504D";
  let color_fecha_4_value = "#C0504D";
  let color_fecha_5_value = "#C0504D";
  let color_fecha_6_value = "#92D050";
  let color_fecha_7_value = "#92D050";

  let color_text_fecha_1_value = "#ffffff";
  let color_text_fecha_2_value = "#ffffff";
  let color_text_fecha_3_value = "#ffffff";
  let color_text_fecha_4_value = "#ffffff";
  let color_text_fecha_5_value = "#ffffff";
  let color_text_fecha_6_value = "#000000";
  let color_text_fecha_7_value = "#000000";




  try {
    date_from_value = response.data.attributes.date_from;
    date_to_value = response.data.attributes.date_to;
    internal_code_value = response.data.attributes.internal_code;
    observations_value = response.data.attributes.observations;
    production_value = response.data.attributes.production;
  } catch (ex) {

  }

  try {
    supervisor_nacional_value = response.data.attributes.coordinator.data.attributes.names+" "+response.data.attributes.coordinator.data.attributes.surnames;

  } catch (error) {
    
  }

  const resScheduleDayLeaders = await fetch(StrapiUrl + "schedules-day-leaders?populate=%2A&filters[schedule][id]=" + id + "&sort[0]=date%3Aasc");
  const responseScheduleDayLeaders = await resScheduleDayLeaders.json();
  const scheduleDayLeaders: ScheduleDayLeadersData[] = [];

  try {

    for (let i = 0; i < responseScheduleDayLeaders.data.length; i++) {
      const row = responseScheduleDayLeaders.data[i];

      scheduleDayLeaders.push({
        groups_and_agent: row.attributes.groups_and_agent.data.attributes.name,
        name: row.attributes.name,
        order: row.attributes.order,
        date: row.attributes.date,

      });

    }
    
  } catch (error) {
    
  }

  const resScheduleDayStandbies = await fetch(StrapiUrl + "schedules-day-standbies?populate=%2A&filters[schedule][id]=" + id + "&sort[0]=date%3Aasc");
  const responseScheduleDayStandbies = await resScheduleDayStandbies.json();
  const scheduleDayStandbies: ScheduleDayStandbiesData[] = [];

  try {

    for (let i = 0; i < responseScheduleDayStandbies.data.length; i++) {
      const row = responseScheduleDayStandbies.data[i];

      scheduleDayStandbies.push({
        groups_and_agent: row.attributes.groups_and_agent.data.attributes.name,
        name: row.attributes.name,
        order: row.attributes.order,
        date: row.attributes.date,

      });

    }
    
  } catch (error) {
    
  }
  
  



  const date_day_1_value = retornarFechaDeLaSemana(date_from_value, 1);
  const date_day_2_value = retornarFechaDeLaSemana(date_from_value, 2);
  const date_day_3_value = retornarFechaDeLaSemana(date_from_value, 3);
  const date_day_4_value = retornarFechaDeLaSemana(date_from_value, 4);
  const date_day_5_value = retornarFechaDeLaSemana(date_from_value, 5);
  const date_day_6_value = retornarFechaDeLaSemana(date_from_value, 6);
  const date_day_7_value = retornarFechaDeLaSemana(date_from_value, 7);

  const schedule: ScheduleData = {
    id: id,
    view_name_shift: view_name_shift_value,
    view_name_place: view_name_place_value,
    date_day_1: date_day_1_value.getFullYear() + '-' + ('0' + (date_day_1_value.getMonth() + 1)).slice(-2) + '-' + ('0' + date_day_1_value.getDate()).slice(-2),
    date_day_2: date_day_2_value.getFullYear() + '-' + ('0' + (date_day_2_value.getMonth() + 1)).slice(-2) + '-' + ('0' + date_day_2_value.getDate()).slice(-2),
    date_day_3: date_day_3_value.getFullYear() + '-' + ('0' + (date_day_3_value.getMonth() + 1)).slice(-2) + '-' + ('0' + date_day_3_value.getDate()).slice(-2),
    date_day_4: date_day_4_value.getFullYear() + '-' + ('0' + (date_day_4_value.getMonth() + 1)).slice(-2) + '-' + ('0' + date_day_4_value.getDate()).slice(-2),
    date_day_5: date_day_5_value.getFullYear() + '-' + ('0' + (date_day_5_value.getMonth() + 1)).slice(-2) + '-' + ('0' + date_day_5_value.getDate()).slice(-2),
    date_day_6: date_day_6_value.getFullYear() + '-' + ('0' + (date_day_6_value.getMonth() + 1)).slice(-2) + '-' + ('0' + date_day_6_value.getDate()).slice(-2),
    date_day_7: date_day_7_value.getFullYear() + '-' + ('0' + (date_day_7_value.getMonth() + 1)).slice(-2) + '-' + ('0' + date_day_7_value.getDate()).slice(-2),
    date_from: date_from_value,
    date_to: date_to_value,
    observations: observations_value,
    internal_code: internal_code_value,
    production: production_value,
    supervisor_nacional: supervisor_nacional_value
  };

    const vacationAgents: VacationAgents[]=[];
    const resvacationAgents = await fetch(StrapiUrl+"vacation-date-by-agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
    const responsevacationAgents = await resvacationAgents.json();
  
    try {
  
        for (let i = 0; i < responsevacationAgents.data.length; i++) {
  
          const row =       responsevacationAgents.data[i];
          //console.log(row);


          const VacaDateFrom = responsevacationAgents.data[i].attributes.date_from;
          const VacaDateTo = responsevacationAgents.data[i].attributes.date_to;
          

          const FECHASCHEDULE_FROM = Date.parse(schedule.date_day_1); //27
          const FECHASCHEDULE_TO = Date.parse(schedule.date_day_7); //33
          const FECHAVACTION_FROM = Date.parse(VacaDateFrom); //14
          const FECHAVACTION_TO = Date.parse(VacaDateTo); // 28


          if(

            (FECHASCHEDULE_FROM >= FECHAVACTION_FROM && FECHASCHEDULE_FROM <= FECHAVACTION_TO)  
            ||
            (FECHASCHEDULE_TO >= FECHAVACTION_FROM && FECHASCHEDULE_TO <= FECHAVACTION_TO)  
            
            
            
            ){

              vacationAgents.push(
              {
                id: row.id,
                date_from: row.attributes.date_from,
                date_to: row.attributes.date_to,
                days_before_to_remind: row.attributes.days_before_to_remind,
                observations: row.attributes.observations,
                createdAt: row.attributes.createdAt,
                updatedAt: row.attributes.updatedAt,
                publishedAt: row.attributes.publishedAt,
                agents: row.attributes.agents.data.attributes.names+" "+row.attributes.agents.data.attributes.surnames,
                agent_id: row.attributes.agents.data.id
              }
            );
          }
      
          
        }
      
      
      
  
    } catch (ex) {
      
    }


  const resunavailableDateAgents = await fetch(StrapiUrl+"unavailable-dates-by-agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+
  "&filters[date_from][$gte]="+schedule.date_day_1+"&filters[date_from][$lte]="+schedule.date_day_7+"");
  const responseunavailableDateAgents= await resunavailableDateAgents.json();
  const unavailableDateAgents: UnavailableDateAgentsData[]=[];

  try {

      for (let i = 0; i < responseunavailableDateAgents.data.length; i++) {

        const row =       responseunavailableDateAgents.data[i];
        //console.log(row);
    
        unavailableDateAgents.push(
          {
            id: row.id,
            date_from: row.attributes.date_from,
            date_to: row.attributes.date_to,
            observations: row.attributes.observations,
            createdAt: row.attributes.createdAt,
            updatedAt: row.attributes.updatedAt,
            publishedAt: row.attributes.publishedAt,
            agents: row.attributes.agents.data.attributes.names+" "+row.attributes.agents.data.attributes.surnames,
            agent_id: row.attributes.agents.data.id

          }
        );
      }
    
    
    

  } catch (ex) {
    
  }


  const resScheduleDayHExtras = await fetch(StrapiUrl+"schedules-day-hextras?populate=%2A&filters[schedule][id]="+id);
  const responseScheduleDayHExtras = await resScheduleDayHExtras.json();
  


  const resScheduleDayTurn = await fetch(StrapiUrl + "schedules-day-turns?populate=%2A&filters[schedule][id]=" + id + "&sort[0]=[place][id]%3Aasc&sort[0]=time_from%3Aasc");
  const responseScheduleDayTurn = await resScheduleDayTurn.json();
  const scheduleDayRow: ScheduleDayTurnData[] = [];
  const tableShiftHtml: tableShiftHtml[] = [];
  const tableDescansanHtml: tableDescansanHtml[] = [];

  const scheduleDayTurn1: ScheduleDayTurnData[] = [];
  const scheduleDayTurn2: ScheduleDayTurnData[] = [];
  const scheduleDayTurn3: ScheduleDayTurnData[] = [];
  const scheduleDayTurn4: ScheduleDayTurnData[] = [];
  const scheduleDayTurn5: ScheduleDayTurnData[] = [];
  const scheduleDayTurn6: ScheduleDayTurnData[] = [];
  const scheduleDayTurn7: ScheduleDayTurnData[] = [];

  try {

    let position_shift_1 = 1;
    let position_shift_2 = 1;
    let position_shift_3 = 1;
    let position_shift_4 = 1;
    let position_shift_5 = 1;
    let position_shift_6 = 1;
    let position_shift_7 = 1;

    for (let i = 0; i < responseScheduleDayTurn.data.length; i++) {
      const row = responseScheduleDayTurn.data[i];
      //console.log(row);

      /************** SHIFTS LUNES************* */
      try {

        if (schedule.date_day_1 == row.attributes.date) {
          const placeDate: PlaceData = {
            id: row.attributes.place.data.id,
            name: row.attributes.place.data.attributes.name
          };

          const groups_and_agents: GroupAndAgentsData[] = [];

          let total = 0;

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayTurn1.push(
            {
              id: row.id,
              shift_id: row.attributes.shift.data.id,
              color: row.attributes.shift.data.attributes.color,
              name: row.attributes.shift.data.attributes.name ? row.attributes.shift.data.attributes.name : '',
              name_place: row.attributes.place.data.attributes.name ? row.attributes.place.data.attributes.name : '',
              date: row.attributes.date,
              time_from: row.attributes.time_from.replace(":00.000", ""),
              time_to: row.attributes.time_to.replace(":00.000", ""),
              velada: row.attributes.velada,
              soporte: row.attributes.soporte,
              horas_extras: row.attributes.horas_extras,
              place: placeDate,
              position_row: position_shift_1,
              total: total,
              row_span: 1,
              groups_and_agents: groups_and_agents
            }
          );
          position_shift_1++;

        } else if (schedule.date_day_2 == row.attributes.date) {
          const placeDate: PlaceData = {
            id: row.attributes.place.data.id,
            name: row.attributes.place.data.attributes.name
          };

          let total = 0;


          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayTurn2.push(
            {
              id: row.id,
              shift_id: row.attributes.shift.data.id,
              color: row.attributes.shift.data.attributes.color,
              name: row.attributes.shift.data.attributes.name ? row.attributes.shift.data.attributes.name : '',
              name_place: row.attributes.place.data.attributes.name ? row.attributes.place.data.attributes.name : '',
              date: row.attributes.date,
              time_from: row.attributes.time_from.replace(":00.000", ""),
              time_to: row.attributes.time_to.replace(":00.000", ""),
              velada: row.attributes.velada,
              soporte: row.attributes.soporte,
              horas_extras: row.attributes.horas_extras,
              place: placeDate,
              position_row: position_shift_2,
              groups_and_agents: groups_and_agents,
              total: total,
              row_span: 1,
            }
          );
          position_shift_2++;

        } else if (schedule.date_day_3 == row.attributes.date) {
          const placeDate: PlaceData = {
            id: row.attributes.place.data.id,
            name: row.attributes.place.data.attributes.name
          };

          let total = 0;

          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayTurn3.push(
            {
              id: row.id,
              shift_id: row.attributes.shift.data.id,
              color: row.attributes.shift.data.attributes.color,
              name: row.attributes.shift.data.attributes.name ? row.attributes.shift.data.attributes.name : '',
              name_place: row.attributes.place.data.attributes.name ? row.attributes.place.data.attributes.name : '',

              date: row.attributes.date,
              time_from: row.attributes.time_from.replace(":00.000", ""),
              time_to: row.attributes.time_to.replace(":00.000", ""),
              velada: row.attributes.velada,
              soporte: row.attributes.soporte,
              horas_extras: row.attributes.horas_extras,
              place: placeDate,
              position_row: position_shift_3,
              total: total,
              row_span: 1,
              groups_and_agents: groups_and_agents
            }
          );
          position_shift_3++;

        } else if (schedule.date_day_4 == row.attributes.date) {
          const placeDate: PlaceData = {
            id: row.attributes.place.data.id,
            name: row.attributes.place.data.attributes.name
          };

          let total = 0;


          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayTurn4.push(
            {
              id: row.id,
              shift_id: row.attributes.shift.data.id,
              color: row.attributes.shift.data.attributes.color,
              name: row.attributes.shift.data.attributes.name ? row.attributes.shift.data.attributes.name : '',
              name_place: row.attributes.place.data.attributes.name ? row.attributes.place.data.attributes.name : '',

              date: row.attributes.date,
              time_from: row.attributes.time_from.replace(":00.000", ""),
              time_to: row.attributes.time_to.replace(":00.000", ""),
              velada: row.attributes.velada,
              soporte: row.attributes.soporte,
              horas_extras: row.attributes.horas_extras,
              place: placeDate,
              position_row: position_shift_4,
              total: total,
              row_span: 1,
              groups_and_agents: groups_and_agents
            }
          );

          position_shift_4++;

        } else if (schedule.date_day_5 == row.attributes.date) {
          const placeDate: PlaceData = {
            id: row.attributes.place.data.id,
            name: row.attributes.place.data.attributes.name
          };

          let total = 0;

          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayTurn5.push(
            {
              id: row.id,
              shift_id: row.attributes.shift.data.id,
              color: row.attributes.shift.data.attributes.color,
              name: row.attributes.shift.data.attributes.name ? row.attributes.shift.data.attributes.name : '',
              name_place: row.attributes.place.data.attributes.name ? row.attributes.place.data.attributes.name : '',

              date: row.attributes.date,
              time_from: row.attributes.time_from.replace(":00.000", ""),
              time_to: row.attributes.time_to.replace(":00.000", ""),
              velada: row.attributes.velada,
              soporte: row.attributes.soporte,
              horas_extras: row.attributes.horas_extras,
              place: placeDate,
              position_row: position_shift_5,
              total: total,
              row_span: 1,
              groups_and_agents: groups_and_agents
            }
          );

          position_shift_5++;

        } else if (schedule.date_day_6 == row.attributes.date) {
          const placeDate: PlaceData = {
            id: row.attributes.place.data.id,
            name: row.attributes.place.data.attributes.name
          };

          let total = 0;


          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayTurn6.push(
            {
              id: row.id,
              shift_id: row.attributes.shift.data.id,
              color: row.attributes.shift.data.attributes.color,
              name: row.attributes.shift.data.attributes.name ? row.attributes.shift.data.attributes.name : '',
              name_place: row.attributes.place.data.attributes.name ? row.attributes.place.data.attributes.name : '',

              date: row.attributes.date,
              time_from: row.attributes.time_from.replace(":00.000", ""),
              time_to: row.attributes.time_to.replace(":00.000", ""),
              velada: row.attributes.velada,
              soporte: row.attributes.soporte,
              horas_extras: row.attributes.horas_extras,
              place: placeDate,
              position_row: position_shift_6,
              total: total,
              row_span: 1,
              groups_and_agents: groups_and_agents
            }
          );
          position_shift_6++;

        } else if (schedule.date_day_7 == row.attributes.date) {
          const placeDate: PlaceData = {
            id: row.attributes.place.data.id,
            name: row.attributes.place.data.attributes.name
          };

          let total = 0;


          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayTurn7.push(
            {
              id: row.id,
              shift_id: row.attributes.shift.data.id,
              color: row.attributes.shift.data.attributes.color,
              name: row.attributes.shift.data.attributes.name ? row.attributes.shift.data.attributes.name : '',
              name_place: row.attributes.place.data.attributes.name ? row.attributes.place.data.attributes.name : '',

              date: row.attributes.date,
              time_from: row.attributes.time_from.replace(":00.000", ""),
              time_to: row.attributes.time_to.replace(":00.000", ""),
              velada: row.attributes.velada,
              soporte: row.attributes.soporte,
              horas_extras: row.attributes.horas_extras,
              place: placeDate,
              position_row: position_shift_7,
              total: total,
              row_span: 1,
              groups_and_agents: groups_and_agents
            }
          );

          position_shift_7++;

        }




      } catch (ex) {

      }
    }


  } catch (ex) {

  }

  let array_flag_turn_row: ScheduleDayTurnData[] = [];

  if (array_flag_turn_row.length < scheduleDayTurn1.length) {
    array_flag_turn_row = scheduleDayTurn1;
  }
  if (array_flag_turn_row.length < scheduleDayTurn2.length) {
    array_flag_turn_row = scheduleDayTurn2;
  }
  if (array_flag_turn_row.length < scheduleDayTurn3.length) {
    array_flag_turn_row = scheduleDayTurn3;
  }
  if (array_flag_turn_row.length < scheduleDayTurn4.length) {
    array_flag_turn_row = scheduleDayTurn4;
  }
  if (array_flag_turn_row.length < scheduleDayTurn5.length) {
    array_flag_turn_row = scheduleDayTurn5;
  }
  if (array_flag_turn_row.length < scheduleDayTurn6.length) {
    array_flag_turn_row = scheduleDayTurn6;
  }
  if (array_flag_turn_row.length < scheduleDayTurn7.length) {
    array_flag_turn_row = scheduleDayTurn7;
  }

  array_flag_turn_row.map(row => {
    scheduleDayRow.push(row)
  });


  const resScheduleDayDescansan = await fetch(StrapiUrl + "schedules-day-descansos?populate=%2A&filters[schedule][id]=" + id);
  const responseScheduleDayDescansan = await resScheduleDayDescansan.json();

  const scheduleDayRowDescansan: ScheduleDayDescansanData[] = [];


  const scheduleDayDescansan1: ScheduleDayDescansanData[] = [];
  const scheduleDayDescansan2: ScheduleDayDescansanData[] = [];
  const scheduleDayDescansan3: ScheduleDayDescansanData[] = [];
  const scheduleDayDescansan4: ScheduleDayDescansanData[] = [];
  const scheduleDayDescansan5: ScheduleDayDescansanData[] = [];
  const scheduleDayDescansan6: ScheduleDayDescansanData[] = [];
  const scheduleDayDescansan7: ScheduleDayDescansanData[] = [];

  try {



    for (let i = 0; i < responseScheduleDayDescansan.data.length; i++) {
      const row = responseScheduleDayDescansan.data[i];
      //console.log(row);

      /************** SHIFTS LUNES************* */
      try {

        if (schedule.date_day_1 == row.attributes.date) {

          let total = 0;


          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayDescansan1.push(
            {
              id: row.id,
              date: row.attributes.date,
              groups_and_agents: groups_and_agents,
              total: total
            }
          );

        } else if (schedule.date_day_2 == row.attributes.date) {

          let total = 0;

          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;

          }


          scheduleDayDescansan2.push(
            {
              id: row.id,
              date: row.attributes.date,
              groups_and_agents: groups_and_agents,
              total: total
            }
          );

        } else if (schedule.date_day_3 == row.attributes.date) {
          let total = 0;


          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;

          }


          scheduleDayDescansan3.push(
            {
              id: row.id,
              date: row.attributes.date,
              groups_and_agents: groups_and_agents,
              total: total

            }
          );

        } else if (schedule.date_day_4 == row.attributes.date) {
          let total = 0;

          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayDescansan4.push(
            {
              id: row.id,
              date: row.attributes.date,
              groups_and_agents: groups_and_agents,
              total: total
            }
          );

        } else if (schedule.date_day_5 == row.attributes.date) {
          let total = 0;


          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayDescansan5.push(
            {
              id: row.id,
              date: row.attributes.date,
              groups_and_agents: groups_and_agents,
              total: total
            }
          );

        } else if (schedule.date_day_6 == row.attributes.date) {
          let total = 0;


          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayDescansan6.push(
            {
              id: row.id,
              date: row.attributes.date,
              groups_and_agents: groups_and_agents,
              total: total
            }
          );

        } else if (schedule.date_day_7 == row.attributes.date) {

          let total = 0;

          const groups_and_agents: GroupAndAgentsData[] = [];

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {
            const rowGroupAgent = row.attributes.groups_and_agents.data[i2];

            groups_and_agents.push(
              {
                id: rowGroupAgent.id,
                name: rowGroupAgent.attributes.name
              }
            );
            total++;
          }


          scheduleDayDescansan7.push(
            {
              id: row.id,
              date: row.attributes.date,
              groups_and_agents: groups_and_agents,
              total: total

            }
          );

        }




      } catch (ex) {

      }
    }


  } catch (ex) {

  }

  let array_flag_descansan_row: ScheduleDayDescansanData[] = [];

  if (array_flag_descansan_row.length < scheduleDayDescansan1.length) {
    array_flag_descansan_row = scheduleDayDescansan1;
  }
  if (array_flag_descansan_row.length < scheduleDayDescansan2.length) {
    array_flag_descansan_row = scheduleDayDescansan2;
  }
  if (array_flag_descansan_row.length < scheduleDayDescansan3.length) {
    array_flag_descansan_row = scheduleDayDescansan3;
  }
  if (array_flag_descansan_row.length < scheduleDayDescansan4.length) {
    array_flag_descansan_row = scheduleDayDescansan4;
  }
  if (array_flag_descansan_row.length < scheduleDayDescansan5.length) {
    array_flag_descansan_row = scheduleDayDescansan5;
  }
  if (array_flag_descansan_row.length < scheduleDayDescansan6.length) {
    array_flag_descansan_row = scheduleDayDescansan6;
  }
  if (array_flag_descansan_row.length < scheduleDayDescansan7.length) {
    array_flag_descansan_row = scheduleDayDescansan7;
  }

  array_flag_descansan_row.map(row => {
    scheduleDayRowDescansan.push(row)
  });

  const day1_agents: any[] = [];
  const day2_agents: any[] = [];
  const day3_agents: any[] = [];
  const day4_agents: any[] = [];
  const day5_agents: any[] = [];
  const day6_agents: any[] = [];
  const day7_agents: any[] = [];

  scheduleDayTurn1.map((rowTurn) => (
    rowTurn.groups_and_agents.map((rowTurnAgents) => (
      day1_agents.push(rowTurnAgents.name)
    ))
  ));
  scheduleDayTurn2.map((rowTurn) => (
    rowTurn.groups_and_agents.map((rowTurnAgents) => (
      day2_agents.push(rowTurnAgents.name)
    ))
  ));
  scheduleDayTurn3.map((rowTurn) => (
    rowTurn.groups_and_agents.map((rowTurnAgents) => (
      day3_agents.push(rowTurnAgents.name)
    ))
  ));
  scheduleDayTurn4.map((rowTurn) => (
    rowTurn.groups_and_agents.map((rowTurnAgents) => (
      day4_agents.push(rowTurnAgents.name)
    ))
  ));
  scheduleDayTurn5.map((rowTurn) => (
    rowTurn.groups_and_agents.map((rowTurnAgents) => (
      day5_agents.push(rowTurnAgents.name)
    ))
  ));
  scheduleDayTurn6.map((rowTurn) => (
    rowTurn.groups_and_agents.map((rowTurnAgents) => (
      day6_agents.push(rowTurnAgents.name)
    ))
  ));
  scheduleDayTurn7.map((rowTurn) => (
    rowTurn.groups_and_agents.map((rowTurnAgents) => (
      day7_agents.push(rowTurnAgents.name)
    ))
  ));

  scheduleDayRow.map(SHIFT_ROW => {
    let row_span = 1;
    let max_agents_1 = 0;
    let max_agents_2 = 0;
    let max_agents_3 = 0;
    let max_agents_4 = 0;
    let max_agents_5 = 0;
    let max_agents_6 = 0;
    let max_agents_7 = 0;

    let turno_1 = ".";
    let turno_2 = ".";
    let turno_3 = ".";
    let turno_4 = ".";
    let turno_5 = ".";
    let turno_6 = ".";
    let turno_7 = ".";

    let turno_1_id = 0;
    let turno_2_id = 0;
    let turno_3_id = 0;
    let turno_4_id = 0;
    let turno_5_id = 0;
    let turno_6_id = 0;
    let turno_7_id = 0;

    let color_1 = "#ffffff";
    let color_2 = "#ffffff";
    let color_3 = "#ffffff";
    let color_4 = "#ffffff";
    let color_5 = "#ffffff";
    let color_6 = "#ffffff";
    let color_7 = "#ffffff";

    const columnas_1: any[] = [];
    const columnas_2: any[] = [];
    const columnas_3: any[] = [];
    const columnas_4: any[] = [];
    const columnas_5: any[] = [];
    const columnas_6: any[] = [];
    const columnas_7: any[] = [];

    scheduleDayTurn1.map(SHIFT_ROW_COLUMN => {
      if (SHIFT_ROW.shift_id == SHIFT_ROW_COLUMN.shift_id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) {
        let max_agents_flag = 0;
        turno_1_id = SHIFT_ROW_COLUMN.shift_id;
        turno_1 = (schedule.view_name_shift ? SHIFT_ROW_COLUMN.name+" - " : '') + SHIFT_ROW_COLUMN.time_from + " - " + SHIFT_ROW_COLUMN.time_to + (schedule.view_name_place ? " - "+ SHIFT_ROW_COLUMN.name_place : '');
        color_1 = SHIFT_ROW_COLUMN.color;

        SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
          let color_column = color_1;

          for (let j = 0; j < responseScheduleDayHExtras.data.length; j++) {
            const rowHExtra =       responseScheduleDayHExtras.data[j];
            const fechaHExtra = new Date(rowHExtra.attributes.date);

            const diaHextra = fechaHExtra.getDay() + 1;

            if(diaHextra==1 && GROUP_AGENT.id == rowHExtra.attributes.groups_and_agent.data.id){
              color_column = '#FFFF00';
            }
          }

          columnas_1.push({
            name: GROUP_AGENT.name,
            color:color_column
          });
          max_agents_flag++;
        });
        if (max_agents_1 < max_agents_flag) {
          max_agents_1 = max_agents_flag;
        }
      }

    });
    scheduleDayTurn2.map(SHIFT_ROW_COLUMN => {
      if (SHIFT_ROW.shift_id == SHIFT_ROW_COLUMN.shift_id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) {
        let max_agents_flag = 0;
        turno_2_id = SHIFT_ROW_COLUMN.shift_id;
        turno_2 = (schedule.view_name_shift ? SHIFT_ROW_COLUMN.name+" - " : '') + SHIFT_ROW_COLUMN.time_from + " - " + SHIFT_ROW_COLUMN.time_to + (schedule.view_name_place ? " - "+ SHIFT_ROW_COLUMN.name_place : '');
        color_2 = SHIFT_ROW_COLUMN.color;

        SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
          let color_column = color_2;
          for (let j = 0; j < responseScheduleDayHExtras.data.length; j++) {
            const rowHExtra =       responseScheduleDayHExtras.data[j];
            const fechaHExtra = new Date(rowHExtra.attributes.date);

            const diaHextra = fechaHExtra.getDay() + 1;

            if(diaHextra==2 && GROUP_AGENT.id == rowHExtra.attributes.groups_and_agent.data.id){
              color_column = '#FFFF00';
            }
          }

          columnas_2.push({
            name: GROUP_AGENT.name,
            color:color_column
          });
          max_agents_flag++;
        });
        if (max_agents_2 < max_agents_flag) {
          max_agents_2 = max_agents_flag;
        }
      }

    });
    scheduleDayTurn3.map(SHIFT_ROW_COLUMN => {
      if (SHIFT_ROW.shift_id == SHIFT_ROW_COLUMN.shift_id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) {
        let max_agents_flag = 0;
        turno_3_id = SHIFT_ROW_COLUMN.shift_id;

        turno_3 = (schedule.view_name_shift ? SHIFT_ROW_COLUMN.name+" - " : '') + SHIFT_ROW_COLUMN.time_from + " - " + SHIFT_ROW_COLUMN.time_to + (schedule.view_name_place ? " - "+ SHIFT_ROW_COLUMN.name_place : '');
        color_3 = SHIFT_ROW_COLUMN.color;

        SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
          let color_column = color_3;
          for (let j = 0; j < responseScheduleDayHExtras.data.length; j++) {
            const rowHExtra =       responseScheduleDayHExtras.data[j];
            const fechaHExtra = new Date(rowHExtra.attributes.date);

            const diaHextra = fechaHExtra.getDay() + 1;

            if(diaHextra==3 && GROUP_AGENT.id == rowHExtra.attributes.groups_and_agent.data.id){
              color_column = '#FFFF00';
            }
          }

          columnas_3.push({
            name: GROUP_AGENT.name,
            color:color_column
          });
          max_agents_flag++;
        });
        if (max_agents_3 < max_agents_flag) {
          max_agents_3 = max_agents_flag;
        }
      }

    });
    scheduleDayTurn4.map(SHIFT_ROW_COLUMN => {
      if (SHIFT_ROW.shift_id == SHIFT_ROW_COLUMN.shift_id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) {
        let max_agents_flag = 0;
        turno_4_id = SHIFT_ROW_COLUMN.shift_id;

        turno_4 = (schedule.view_name_shift ? SHIFT_ROW_COLUMN.name+" - " : '') + SHIFT_ROW_COLUMN.time_from + " - " + SHIFT_ROW_COLUMN.time_to + (schedule.view_name_place ? " - "+ SHIFT_ROW_COLUMN.name_place : '');
        color_4 = SHIFT_ROW_COLUMN.color;

        SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
          let color_column = color_4;
          for (let j = 0; j < responseScheduleDayHExtras.data.length; j++) {
            const rowHExtra =       responseScheduleDayHExtras.data[j];
            const fechaHExtra = new Date(rowHExtra.attributes.date);

            const diaHextra = fechaHExtra.getDay() + 1;

            if(diaHextra==4 && GROUP_AGENT.id == rowHExtra.attributes.groups_and_agent.data.id){
              color_column = '#FFFF00';
            }
          }

          columnas_4.push({
            name: GROUP_AGENT.name,
            color:color_column
          });
          max_agents_flag++;
        });
        if (max_agents_4 < max_agents_flag) {
          max_agents_4 = max_agents_flag;
        }
      }

    });
    scheduleDayTurn5.map(SHIFT_ROW_COLUMN => {
      if (SHIFT_ROW.shift_id == SHIFT_ROW_COLUMN.shift_id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) {
        let max_agents_flag = 0;
        turno_5_id = SHIFT_ROW_COLUMN.shift_id;

        turno_5 = (schedule.view_name_shift ? SHIFT_ROW_COLUMN.name+" - " : '') + SHIFT_ROW_COLUMN.time_from + " - " + SHIFT_ROW_COLUMN.time_to + (schedule.view_name_place ? " - "+ SHIFT_ROW_COLUMN.name_place : '');
        color_5 = SHIFT_ROW_COLUMN.color;
        

        SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
          let color_column = color_5;
          for (let j = 0; j < responseScheduleDayHExtras.data.length; j++) {
            const rowHExtra =       responseScheduleDayHExtras.data[j];
            const fechaHExtra = new Date(rowHExtra.attributes.date);
  
            const diaHextra = fechaHExtra.getDay() + 1;
  
            if(diaHextra==5 && GROUP_AGENT.id == rowHExtra.attributes.groups_and_agent.data.id){
              color_column = '#FFFF00';
            }
          }

          columnas_5.push({
            name: GROUP_AGENT.name,
            color:color_column
          });
          max_agents_flag++;
        });
        if (max_agents_5 < max_agents_flag) {
          max_agents_5 = max_agents_flag;
        }
      }

    });
    scheduleDayTurn6.map(SHIFT_ROW_COLUMN => {
      if (SHIFT_ROW.shift_id == SHIFT_ROW_COLUMN.shift_id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) {
        let max_agents_flag = 0;
        turno_6_id = SHIFT_ROW_COLUMN.shift_id;

        turno_6 = (schedule.view_name_shift ? SHIFT_ROW_COLUMN.name+" - " : '') + SHIFT_ROW_COLUMN.time_from + " - " + SHIFT_ROW_COLUMN.time_to + (schedule.view_name_place ? " - "+ SHIFT_ROW_COLUMN.name_place : '');
        color_6 = SHIFT_ROW_COLUMN.color;

        SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
          let color_column = color_6;
          for (let j = 0; j < responseScheduleDayHExtras.data.length; j++) {
            const rowHExtra =       responseScheduleDayHExtras.data[j];
            const fechaHExtra = new Date(rowHExtra.attributes.date);

            const diaHextra = fechaHExtra.getDay() + 1;

            if(diaHextra==6 && GROUP_AGENT.id == rowHExtra.attributes.groups_and_agent.data.id){
              color_column = '#FFFF00';
            }
          }

          columnas_6.push({
            name: GROUP_AGENT.name,
            color:color_column
          });
          max_agents_flag++;
        });
        if (max_agents_6 < max_agents_flag) {
          max_agents_6 = max_agents_flag;
        }
      }

    });
    scheduleDayTurn7.map(SHIFT_ROW_COLUMN => {
      if (SHIFT_ROW.shift_id == SHIFT_ROW_COLUMN.shift_id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) {
        turno_7_id = SHIFT_ROW_COLUMN.shift_id;

        turno_7 = (schedule.view_name_shift ? SHIFT_ROW_COLUMN.name+" - " : '') + SHIFT_ROW_COLUMN.time_from + " - " + SHIFT_ROW_COLUMN.time_to + (schedule.view_name_place ? " - "+ SHIFT_ROW_COLUMN.name_place : '');
        color_7 = SHIFT_ROW_COLUMN.color;

        let max_agents_flag = 0;
        SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
          let color_column = color_7;
          for (let j = 0; j < responseScheduleDayHExtras.data.length; j++) {
            const rowHExtra =       responseScheduleDayHExtras.data[j];
            const fechaHExtra = new Date(rowHExtra.attributes.date);

            const diaHextra = fechaHExtra.getDay() + 1;

            if(diaHextra==7 && GROUP_AGENT.id == rowHExtra.attributes.groups_and_agent.data.id){
              color_column = '#FFFF00';
            }
          }

          columnas_7.push({
            name: GROUP_AGENT.name,
            color:color_column
          });
          max_agents_flag++;
        });
        if (max_agents_7 < max_agents_flag) {
          max_agents_7 = max_agents_flag;
        }
      }

    });

    if (row_span < Math.ceil(max_agents_1 / 4)) {
      row_span = Math.ceil(max_agents_1 / 4);
    }
    if (row_span < Math.ceil(max_agents_2 / 4)) {
      row_span = Math.ceil(max_agents_2 / 4);
    }
    if (row_span < Math.ceil(max_agents_3 / 4)) {
      row_span = Math.ceil(max_agents_3 / 4);
    }
    if (row_span < Math.ceil(max_agents_4 / 4)) {
      row_span = Math.ceil(max_agents_4 / 4);
    }
    if (row_span < Math.ceil(max_agents_5 / 4)) {
      row_span = Math.ceil(max_agents_5 / 4);
    }
    if (row_span < Math.ceil(max_agents_6 / 4)) {
      row_span = Math.ceil(max_agents_6 / 4);
    }
    if (row_span < Math.ceil(max_agents_7 / 4)) {
      row_span = Math.ceil(max_agents_7 / 4);
    }

    if (row_span < 1) {
      row_span = 1;
    }
    //row_span = 1;

    //SHIFT_ROW.row_span = row_span;

    const columnas_1_final: any[] = [];
    const columnas_2_final: any[] = [];
    const columnas_3_final: any[] = [];
    const columnas_4_final: any[] = [];
    const columnas_5_final: any[] = [];
    const columnas_6_final: any[] = [];
    const columnas_7_final: any[] = [];

    for (let index = 0; index < 4; index++) {

      try {
        columnas_1_final.push({
          name: columnas_1[index].name,
          color: columnas_1[index].color

        });
      } catch (error) {
        columnas_1_final.push({
          name: "-",
          color: color_1
        });

      }
      try {
        columnas_2_final.push({
          name: columnas_2[index].name,
          color: columnas_2[index].color
          
        });
      } catch (error) {
        columnas_2_final.push({
          name: "-",
          color: color_2
        });

      }
      try {
        columnas_3_final.push({
          name: columnas_3[index].name,
          color: columnas_3[index].color
        });
      } catch (error) {
        columnas_3_final.push({
          name: "-",
          color: color_3
        });

      }
      try {
        columnas_4_final.push({
          name: columnas_4[index].name,
          color: columnas_4[index].color
        });
      } catch (error) {
        columnas_4_final.push({
          name: "-",
          color: color_4
        });

      }
      try {
        columnas_5_final.push({
          name: columnas_5[index].name,
          color: columnas_5[index].color
        });
      } catch (error) {
        columnas_5_final.push({
          name: "-",
          color: color_5
        });

      }
      try {
        columnas_6_final.push({
          name: columnas_6[index].name,
          color: columnas_6[index].color
        });
      } catch (error) {
        columnas_6_final.push({
          name: "-",
          color: color_6
        });

      }
      try {
        columnas_7_final.push({
          name: columnas_7[index].name,
          color: columnas_7[index].color
        });
      } catch (error) {
        columnas_7_final.push({
          name: "-",
          color: color_7
        });

      }

    }


    //console.log("ROW: " + SHIFT_ROW.position_row + "  row_span: " + row_span);


    tableShiftHtml.push({
      color_1: color_1,
      color_2: color_2,
      color_3: color_3,
      color_4: color_4,
      color_5: color_5,
      color_6: color_6,
      color_7: color_7,

      turno_1: turno_1,
      turno_2: turno_2,
      turno_3: turno_3,
      turno_4: turno_4,
      turno_5: turno_5,
      turno_6: turno_6,
      turno_7: turno_7,

      turno_1_id: turno_1_id,
      turno_2_id: turno_2_id,
      turno_3_id: turno_3_id,
      turno_4_id: turno_4_id,
      turno_5_id: turno_5_id,
      turno_6_id: turno_6_id,
      turno_7_id: turno_7_id,

      columnas_1: columnas_1_final,
      columnas_2: columnas_2_final,
      columnas_3: columnas_3_final,
      columnas_4: columnas_4_final,
      columnas_5: columnas_5_final,
      columnas_6: columnas_6_final,
      columnas_7: columnas_7_final,
      row_span: 1,


    });


    for (let index = 1; index < row_span; index++) {
      const columnas_flag_1: any[] = [];
      const columnas_flag_2: any[] = [];
      const columnas_flag_3: any[] = [];
      const columnas_flag_4: any[] = [];
      const columnas_flag_5: any[] = [];
      const columnas_flag_6: any[] = [];
      const columnas_flag_7: any[] = [];


      for (let i2 = (4 * index); i2 < ((4 * index) + 4); i2++) {
        try {
          columnas_flag_1.push({
            name: columnas_1[i2].name,
            color: columnas_1[i2].color
          });
        } catch (error) {
          columnas_flag_1.push({
            name: "-",
            color: color_1
          });

        }

        try {
          columnas_flag_2.push({
            name: columnas_2[i2].name,
            color: columnas_2[i2].color
          });
        } catch (error) {
          columnas_flag_2.push({
            name: "-",
            color: color_2
          });

        }

        try {
          columnas_flag_3.push({
            name: columnas_3[i2].name,
            color: columnas_3[i2].color
          });
        } catch (error) {
          columnas_flag_3.push({
            name: "-",
            color: color_3
          });

        }

        try {
          columnas_flag_4.push({
            name: columnas_4[i2].name,
            color: columnas_4[i2].color
          });
        } catch (error) {
          columnas_flag_4.push({
            name: "-",
            color: color_4
          });

        }

        try {
          columnas_flag_5.push({
            name: columnas_5[i2].name,
            color: columnas_5[i2].color
          });
        } catch (error) {
          columnas_flag_5.push({
            name: "-",
            color: color_5
          });

        }

        try {
          columnas_flag_6.push({
            name: columnas_6[i2].name,
            color: columnas_6[i2].color
          });
        } catch (error) {
          columnas_flag_6.push({
            name: "-",
            color: color_6
          });

        }

        try {
          columnas_flag_7.push({
            name: columnas_7[i2].name,
            color: columnas_7[i2].color
          });
        } catch (error) {
          columnas_flag_7.push({
            name: "-",
            color: color_7
          });

        }
      }






      tableShiftHtml.push({
        color_1: color_1,
        color_2: color_2,
        color_3: color_3,
        color_4: color_4,
        color_5: color_5,
        color_6: color_6,
        color_7: color_7,

        turno_1: ".",
        turno_2: ".",
        turno_3: ".",
        turno_4: ".",
        turno_5: ".",
        turno_6: ".",
        turno_7: ".",

        turno_1_id: turno_1_id,
        turno_2_id: turno_2_id,
        turno_3_id: turno_3_id,
        turno_4_id: turno_4_id,
        turno_5_id: turno_5_id,
        turno_6_id: turno_6_id,
        turno_7_id: turno_7_id,


        columnas_1: columnas_flag_1,
        columnas_2: columnas_flag_2,
        columnas_3: columnas_flag_3,
        columnas_4: columnas_flag_4,
        columnas_5: columnas_flag_5,
        columnas_6: columnas_flag_6,
        columnas_7: columnas_flag_7,
        row_span: 1,


      });

    }




  });


  //tableDescansanHtml
  scheduleDayRowDescansan.map(SHIFT_ROW => {
    let row_span = 1;
    let max_agents_1 = 0;
    let max_agents_2 = 0;
    let max_agents_3 = 0;
    let max_agents_4 = 0;
    let max_agents_5 = 0;
    let max_agents_6 = 0;
    let max_agents_7 = 0;

    const columnas_1: any[] = [];
    const columnas_2: any[] = [];
    const columnas_3: any[] = [];
    const columnas_4: any[] = [];
    const columnas_5: any[] = [];
    const columnas_6: any[] = [];
    const columnas_7: any[] = [];

    scheduleDayDescansan1.map(SHIFT_ROW_COLUMN => {
        let max_agents_flag = 0;
        SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
          columnas_1.push({
            name: GROUP_AGENT.name
          });
          max_agents_flag++;
        });

        if (max_agents_1 < max_agents_flag) {
          max_agents_1 = max_agents_flag;
        }
    });

    scheduleDayDescansan2.map(SHIFT_ROW_COLUMN => {
      let max_agents_flag = 0;
      SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
        columnas_2.push({
          name: GROUP_AGENT.name
        });
        max_agents_flag++;
      });

      if (max_agents_2 < max_agents_flag) {
        max_agents_2 = max_agents_flag;
      }
    });

    scheduleDayDescansan3.map(SHIFT_ROW_COLUMN => {
      let max_agents_flag = 0;
      SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
        columnas_3.push({
          name: GROUP_AGENT.name
        });
        max_agents_flag++;
      });

      if (max_agents_3 < max_agents_flag) {
        max_agents_3 = max_agents_flag;
      }
    });

    scheduleDayDescansan4.map(SHIFT_ROW_COLUMN => {
      let max_agents_flag = 0;
      SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
        columnas_4.push({
          name: GROUP_AGENT.name
        });
        max_agents_flag++;
      });

      if (max_agents_4 < max_agents_flag) {
        max_agents_4 = max_agents_flag;
      }
    });

    scheduleDayDescansan5.map(SHIFT_ROW_COLUMN => {
      let max_agents_flag = 0;
      SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
        columnas_5.push({
          name: GROUP_AGENT.name
        });
        max_agents_flag++;
      });

      if (max_agents_5 < max_agents_flag) {
        max_agents_5 = max_agents_flag;
      }
    });

    scheduleDayDescansan6.map(SHIFT_ROW_COLUMN => {
      let max_agents_flag = 0;
      SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
        columnas_6.push({
          name: GROUP_AGENT.name
        });
        max_agents_flag++;
      });

      if (max_agents_6 < max_agents_flag) {
        max_agents_6 = max_agents_flag;
      }
    });

    scheduleDayDescansan7.map(SHIFT_ROW_COLUMN => {
      let max_agents_flag = 0;
      SHIFT_ROW_COLUMN.groups_and_agents.map(GROUP_AGENT => {
        columnas_7.push({
          name: GROUP_AGENT.name
        });
        max_agents_flag++;
      });

      if (max_agents_7 < max_agents_flag) {
        max_agents_7 = max_agents_flag;
      }
    });
    

    if (row_span < Math.ceil(max_agents_1 / 4)) {
      row_span = Math.ceil(max_agents_1 / 4);
    }
    if (row_span < Math.ceil(max_agents_2 / 4)) {
      row_span = Math.ceil(max_agents_2 / 4);
    }
    if (row_span < Math.ceil(max_agents_3 / 4)) {
      row_span = Math.ceil(max_agents_3 / 4);
    }
    if (row_span < Math.ceil(max_agents_4 / 4)) {
      row_span = Math.ceil(max_agents_4 / 4);
    }
    if (row_span < Math.ceil(max_agents_5 / 4)) {
      row_span = Math.ceil(max_agents_5 / 4);
    }
    if (row_span < Math.ceil(max_agents_6 / 4)) {
      row_span = Math.ceil(max_agents_6 / 4);
    }
    if (row_span < Math.ceil(max_agents_7 / 4)) {
      row_span = Math.ceil(max_agents_7 / 4);
    }

    if (row_span < 1) {
      row_span = 1;
    }

    //SHIFT_ROW.row_span = row_span;

    const columnas_1_final: any[] = [];
    const columnas_2_final: any[] = [];
    const columnas_3_final: any[] = [];
    const columnas_4_final: any[] = [];
    const columnas_5_final: any[] = [];
    const columnas_6_final: any[] = [];
    const columnas_7_final: any[] = [];

    for (let index = 0; index < 4; index++) {

      try {
        columnas_1_final.push({
          name: columnas_1[index].name
        });
      } catch (error) {
        columnas_1_final.push({
          name: "-"
        });

      }
      try {
        columnas_2_final.push({
          name: columnas_2[index].name
        });
      } catch (error) {
        columnas_2_final.push({
          name: "-"
        });

      }
      try {
        columnas_3_final.push({
          name: columnas_3[index].name
        });
      } catch (error) {
        columnas_3_final.push({
          name: "-"
        });

      }
      try {
        columnas_4_final.push({
          name: columnas_4[index].name
        });
      } catch (error) {
        columnas_4_final.push({
          name: "-"
        });

      }
      try {
        columnas_5_final.push({
          name: columnas_5[index].name
        });
      } catch (error) {
        columnas_5_final.push({
          name: "-"
        });

      }
      try {
        columnas_6_final.push({
          name: columnas_6[index].name
        });
      } catch (error) {
        columnas_6_final.push({
          name: "-"
        });

      }
      try {
        columnas_7_final.push({
          name: columnas_7[index].name
        });
      } catch (error) {
        columnas_7_final.push({
          name: "-"
        });

      }

    }


    ////console.log("ROW: " + SHIFT_ROW.position_row + "  row_span: " + row_span);


    tableDescansanHtml.push({
      turno_1: "Agentes Descansan",
      turno_2: "Agentes Descansan",
      turno_3: "Agentes Descansan",
      turno_4: "Agentes Descansan",
      turno_5: "Agentes Descansan",
      turno_6: "Agentes Descansan",
      turno_7: "Agentes Descansan",
      columnas_1: columnas_1_final,
      columnas_2: columnas_2_final,
      columnas_3: columnas_3_final,
      columnas_4: columnas_4_final,
      columnas_5: columnas_5_final,
      columnas_6: columnas_6_final,
      columnas_7: columnas_7_final,
      row_span: row_span,


    });


    for (let index = 1; index < row_span; index++) {
      const columnas_flag_1: any[] = [];
      const columnas_flag_2: any[] = [];
      const columnas_flag_3: any[] = [];
      const columnas_flag_4: any[] = [];
      const columnas_flag_5: any[] = [];
      const columnas_flag_6: any[] = [];
      const columnas_flag_7: any[] = [];


      for (let i2 = (4 * index); i2 < ((4 * index) + 4); i2++) {
        try {
          columnas_flag_1.push({
            name: columnas_1[i2].name
          });
        } catch (error) {
          columnas_flag_1.push({
            name: "-"
          });

        }

        try {
          columnas_flag_2.push({
            name: columnas_2[i2].name
          });
        } catch (error) {
          columnas_flag_2.push({
            name: "-"
          });

        }

        try {
          columnas_flag_3.push({
            name: columnas_3[i2].name
          });
        } catch (error) {
          columnas_flag_3.push({
            name: "-"
          });

        }

        try {
          columnas_flag_4.push({
            name: columnas_4[i2].name
          });
        } catch (error) {
          columnas_flag_4.push({
            name: "-"
          });

        }

        try {
          columnas_flag_5.push({
            name: columnas_5[i2].name
          });
        } catch (error) {
          columnas_flag_5.push({
            name: "-"
          });

        }

        try {
          columnas_flag_6.push({
            name: columnas_6[i2].name
          });
        } catch (error) {
          columnas_flag_6.push({
            name: "-"
          });

        }

        try {
          columnas_flag_7.push({
            name: columnas_7[i2].name
          });
        } catch (error) {
          columnas_flag_7.push({
            name: "-"
          });

        }
      }






      tableDescansanHtml.push({
        turno_1: "-",
        turno_2: "-",
        turno_3: "-",
        turno_4: "-",
        turno_5: "-",
        turno_6: "-",
        turno_7: "-",
        columnas_1: columnas_flag_1,
        columnas_2: columnas_flag_2,
        columnas_3: columnas_flag_3,
        columnas_4: columnas_flag_4,
        columnas_5: columnas_flag_5,
        columnas_6: columnas_flag_6,
        columnas_7: columnas_flag_7,
        row_span: 1,
      });

    }




  });


  const resGroupsAndAgents = await fetch(StrapiUrl+"groups-and-agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=order%3Aasc");
  const responseGroupsAndAgents = await resGroupsAndAgents.json();
  const groupsAndAgents: FormDataGroupsAndAgents[]=[];

  try {

      for (let i = 0; i < responseGroupsAndAgents.data.length; i++) {

        const row =       responseGroupsAndAgents.data[i];
        //console.log(row);
        let agents = "";
        let group = "";
        let place = "";
        let rules_day = "";
        let rules_hour = "";
        let group_id = 0;
        let monday = 1;
        let tuesday = 1;
        let wednesday = 1;
        let thursday = 1;
        let friday = 1;
        let saturday = 1;
        let sunday = 1;
        let agent_id=0;
        let rules_hour_from='00:00:00';
        let rules_hour_to='23:59:59';

        let rules_day_order = 1;
        let rules_hour_order = 1;

        let skip_order_group_day = false;
        let skip_order_group_hour = false;
        let type_rule = 'Rango';

        try{
          skip_order_group_day = row.attributes.rules_day.data.attributes.skip_order_group;
        }catch (error) {
    
        }
        try{
          skip_order_group_hour = row.attributes.rules_hour.data.attributes.skip_order_group;
        }catch (error) {
    
        }
        try{
          type_rule = row.attributes.rules_hour.data.attributes.type_rule;
        }catch (error) {
    
        }
        try{
          monday = row.attributes.rules_day.data.attributes.monday;
        }catch (error) {
    
        }
        try{
          tuesday = row.attributes.rules_day.data.attributes.tuesday;
        }catch (error) {
    
        }
        try{
          wednesday = row.attributes.rules_day.data.attributes.wednesday;
        }catch (error) {
    
        }
        try{
          thursday = row.attributes.rules_day.data.attributes.thursday;
        }catch (error) {
    
        }
        try{
          friday = row.attributes.rules_day.data.attributes.friday;
        }catch (error) {
    
        }
        try{
          saturday = row.attributes.rules_day.data.attributes.saturday;
        }catch (error) {
    
        }
        try{
          sunday = row.attributes.rules_day.data.attributes.sunday;
        }catch (error) {
    
        }


        try{
          agents = row.attributes.agents.data.attributes.names+' '+ row.attributes.agents.data.attributes.surnames;
        }catch (error) {
    
        }
        try{
          agent_id = row.attributes.agents.data.id;
        }catch (error) {
    
        }
        try{
          group_id = row.attributes.group.data.id;
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
          rules_day_order = row.attributes.rules_day.data.attributes.order;
        }catch (error) {
    
        }
        try{
          rules_hour = row.attributes.rules_hour.data.attributes.name;
          rules_hour_order = row.attributes.rules_hour.data.attributes.order;

        }catch (error) {
    
        }
        try{
          rules_hour_from = row.attributes.rules_hour.data.attributes.time_from;
        }catch (error) {
    
        }
        try{
          rules_hour_to = row.attributes.rules_hour.data.attributes.time_to;
        }catch (error) {
    
        }
       
        groupsAndAgents.push(
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
              rules_day_order: rules_day_order,
              rules_hour_order: rules_hour_order,
              rules_hour_from: rules_hour_from,
              rules_hour_to: rules_hour_to,
              group: group,
              group_id: group_id,
              horas_extras_actuales: 0,
              total_dia_1: 0,
              total_dia_2: 0,
              total_dia_3: 0,
              total_dia_4: 0,
              total_dia_5: 0,
              total_dia_6: 0,
              total_dia_7: 0,
              monday: monday,
              tuesday: tuesday,
              wednesday: wednesday,
              thursday: thursday,
              friday: friday,
              saturday: saturday,
              sunday: sunday,
              vacaciones: 0,
              dias_no_disponible: 0,
              agent_id: agent_id,
              skip_order_group_day: skip_order_group_day,
              skip_order_group_hour: skip_order_group_hour,
              type_rule: type_rule


            }
          );
      }
    
    
    

  } catch (ex) {
    
  }

  const resHolidays = await fetch(StrapiUrl+"holidays?populate=%2A&filters[deleted][$not]=true&filters[sites][id]="+site_id_logueado);
  const responseHolidays = await resHolidays.json();

  for (let i = 0; i < responseHolidays.data.length; i++) {
    const row =       responseHolidays.data[i];

    if( row.attributes.date == schedule.date_day_1){
      color_fecha_1_value = "#FFFF00";
      color_text_fecha_1_value = "#000000";
    }
    if( row.attributes.date == schedule.date_day_2){
      color_fecha_2_value = "#FFFF00";
      color_text_fecha_2_value = "#000000";
    }
    if( row.attributes.date == schedule.date_day_3){
      color_fecha_3_value = "#FFFF00";
      color_text_fecha_3_value = "#000000";
    }
    if( row.attributes.date == schedule.date_day_4){
      color_fecha_4_value = "#FFFF00";
      color_text_fecha_4_value = "#000000";
    }
    if( row.attributes.date == schedule.date_day_5){
      color_fecha_5_value = "#FFFF00";
      color_text_fecha_5_value = "#000000";
    }
    if( row.attributes.date == schedule.date_day_6){
      color_fecha_6_value = "#FFFF00";
      color_text_fecha_6_value = "#000000";
    }
    if( row.attributes.date == schedule.date_day_7){
      color_fecha_7_value = "#FFFF00";
      color_text_fecha_7_value = "#000000";
    }

  }

  groupsAndAgents.map(SHIFT_GROUP_AGENT => {

    let total_dia_1 = 0;
    let total_dia_2 = 0;
    let total_dia_3 = 0;
    let total_dia_4 = 0;
    let total_dia_5 = 0;
    let total_dia_6 = 0;
    let total_dia_7 = 0;

    scheduleDayTurn1.map(TURN_DAY => {
      TURN_DAY.groups_and_agents.map(GAP => {
        if(GAP.id == SHIFT_GROUP_AGENT.id){
          total_dia_1 = 1;
        }
      });
    });
    scheduleDayTurn2.map(TURN_DAY => {
      TURN_DAY.groups_and_agents.map(GAP => {
        if(GAP.id == SHIFT_GROUP_AGENT.id){
          total_dia_2 = 1;
        }
      });
    });
    scheduleDayTurn3.map(TURN_DAY => {
      TURN_DAY.groups_and_agents.map(GAP => {
        if(GAP.id == SHIFT_GROUP_AGENT.id){
          total_dia_3 = 1;
        }
      });
    });
    scheduleDayTurn4.map(TURN_DAY => {
      TURN_DAY.groups_and_agents.map(GAP => {
        if(GAP.id == SHIFT_GROUP_AGENT.id){
          total_dia_4 = 1;
        }
      });
    });
    scheduleDayTurn5.map(TURN_DAY => {
      TURN_DAY.groups_and_agents.map(GAP => {
        if(GAP.id == SHIFT_GROUP_AGENT.id){
          total_dia_5 = 1;
        }
      });
    });
    scheduleDayTurn6.map(TURN_DAY => {
      TURN_DAY.groups_and_agents.map(GAP => {
        if(GAP.id == SHIFT_GROUP_AGENT.id){
          total_dia_6 = 1;
        }
      });
    });
    scheduleDayTurn7.map(TURN_DAY => {
      TURN_DAY.groups_and_agents.map(GAP => {
        if(GAP.id == SHIFT_GROUP_AGENT.id){
          total_dia_7 = 1;
        }
      });
    });

    SHIFT_GROUP_AGENT.total_dia_1 = total_dia_1;
    SHIFT_GROUP_AGENT.total_dia_2 = total_dia_2;
    SHIFT_GROUP_AGENT.total_dia_3 = total_dia_3;
    SHIFT_GROUP_AGENT.total_dia_4 = total_dia_4;
    SHIFT_GROUP_AGENT.total_dia_5 = total_dia_5;
    SHIFT_GROUP_AGENT.total_dia_6 = total_dia_6;
    SHIFT_GROUP_AGENT.total_dia_7 = total_dia_7;

  });

  const ColorHeader: ColorHeader = {
    color_fecha_1: color_fecha_1_value,
    color_fecha_2: color_fecha_2_value,
    color_fecha_3: color_fecha_3_value,
    color_fecha_4: color_fecha_4_value,
    color_fecha_5: color_fecha_5_value,
    color_fecha_6: color_fecha_6_value,
    color_fecha_7: color_fecha_7_value,
    color_text_fecha_1: color_text_fecha_1_value,
    color_text_fecha_2: color_text_fecha_2_value,
    color_text_fecha_3: color_text_fecha_3_value,
    color_text_fecha_4: color_text_fecha_4_value,
    color_text_fecha_5: color_text_fecha_5_value,
    color_text_fecha_6: color_text_fecha_6_value,
    color_text_fecha_7: color_text_fecha_7_value

  }


  return {
    props: {
      ColorHeader,
      groupsAndAgents,
      schedule,
      scheduleDayStandbies,
      scheduleDayLeaders,
      tableShiftHtml,
      tableDescansanHtml,
      scheduleDayRow,
      scheduleDayTurn1,
      scheduleDayTurn2,
      scheduleDayTurn3,
      scheduleDayTurn4,
      scheduleDayTurn5,
      scheduleDayTurn6,
      scheduleDayTurn7,
      scheduleDayRowDescansan,
      scheduleDayDescansan1,
      scheduleDayDescansan2,
      scheduleDayDescansan3,
      scheduleDayDescansan4,
      scheduleDayDescansan5,
      scheduleDayDescansan6,
      scheduleDayDescansan7,
      day1_agents,
      day2_agents,
      day3_agents,
      day4_agents,
      day5_agents,
      day6_agents,
      day7_agents,
      vacationAgents,
      unavailableDateAgents,

    },
  };
};

export default MUITable
