// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
// ** React Imports
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { useRouter } from "next/router";
import axios from "axios";
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Chip from '@mui/material/Chip'

import React,{ ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { Allergy } from 'mdi-material-ui'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import StrapiUrl from 'src/confignl/StrapiUrl';
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import CustomSnackbar  from 'src/customsComponents/SnackbarComponent';
let MAX_DIAS_AGENTE_SEMANA = 5;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ScheduleListData {
  id: number;
  date_from: any;
  date_to: any;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  production: any;
  planificado: any;
};

interface AgentesVeladaAnterior {
  agent_id: number;
  group_id: number;
  dia: number;
  shift_id: number;
}

interface DescansoPorGrupoData {
  id: number;
  group_id: number;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  order:number;

};

interface TypeLiderData {
  id: number;
  name: string;
  order: number;
  groups_and_agent_id_6: number;
  groups_and_agent_id_7: number;

  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};
interface TypeStandbyData {
  id: number;
  name: string;
  order: number;
  groups_and_agent_id_6: number;
  groups_and_agent_id_7: number;
  internal_code: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface InfoElementDialog {
  dialog_title: any;
  available: any;
  rules_day: any;
  rules_hour: any;
  rules_hour_from: any;
  rules_hour_to: any;
  vacaciones: any;
  dias_no_disponible: any;
};


interface InfoElementDialogText {
  dialog_title: any;
  showProgress: boolean;
  mensaje_progress: string;

};

interface InfoModalNewHorasExtras {
  hextras_agent_id: any;
  hextras_date: any;
  hextras_hour_from: any;
  hextras_hour_to: any;
  hextras_observations: any;
  hextras_shift_id: any;
  hextras_lunch_time: number;
  showDelete:boolean;
  hextras_agent_id_delete: any;
  day: any;
};
interface InfoModalNewHorasSuplem {
  hsuplem_agent_id: any;
  hsuplem_date: any;
  hsuplem_hour_from: any;
  hsuplem_hour_to: any;
  hsuplem_observations: any;
  showDelete:boolean;
  hsuplem_agent_id_delete: any;
  day: any;
};

interface RulesHoursData {
  id: number;
  name: string;
  order: number;
  time_from: any;
  time_to: any;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;

};

interface RulesDaysData {
  id: number;
  name: string;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  order:number;

};

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

  monday_selected: number;
  tuesday_selected: number;
  wednesday_selected: number;
  thursday_selected: number;
  friday_selected: number;
  saturday_selected: number;
  sunday_selected: number;

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


interface FormDataShifts {
  id: number;
  name: any;
  time_from: any;
  lunch_time: number;
  holiday: any;
  time_to: any;
  observations: string;
  velada: any;
  color: string;
  horas_extras: any;
  soporte: any;
  num_agentes_necesarios: number;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
};

interface FormDataShiftsPerDay {
  id: number;
  name: any;
  time_from: any;
  time_to: any;
  observations: string;
  velada: any;
  holiday: any;
  color: string;

  soporte: any;
  horas_extras: any;
  num_agentes_necesarios: number;
  num_agentes_sugeridos: number;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  selected_groups_agents: any[];
  position_row: number;
  lunch_time: number;
  place: any;
};

interface FormDataHSuplem {
  
  date: any;
  time_from: any;
  time_to: any;
  observations: string;
  selected_groups_agents: number;

};
interface FormDataHExtra {
  
  date: any;
  lunch_time: number;
  shift: number;
  time_from: any;
  time_to: any;
  observations: string;
  selected_groups_agents: number;

};

interface ScheduleData {
  id: number;
  date_from: any;
  date_to: any;
  internal_code: string;
  observations: string;
  production: any;
  planificado: any;
  turno_velada_por_orden: any;
  schedule_anterior_cargar: number;
  coordinator:number;
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

interface GroupData {
  id: number;
  name: string;
  order: number;
  internal_code: string;
  max_agents: number;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  area: any;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  monday_order: number;
  tuesday_order: number;
  wednesday_order: number;
  thursday_order: number;
  friday_order: number;
  saturday_order: number;
  sunday_order: number;

  view_monday_rest: number;
  view_tuesday_rest: number;
  view_wednesday_rest: number;
  view_thursday_rest: number;
  view_friday_rest: number;
  view_saturday_rest: number;
  view_sunday_rest: number;

  descansos_por_dia: DescansoPorGrupoData[];

};


interface PlanificationData {
  date_day_1: any;
  date_day_2: any;
  date_day_3: any;
  date_day_4: any;
  date_day_5: any;
  date_day_6: any;
  date_day_7: any;

  groupsAndAgents: FormDataGroupsAndAgents[];

  date_day_1_total_trabajan: number;
  date_day_2_total_trabajan: number;
  date_day_3_total_trabajan: number;
  date_day_4_total_trabajan: number;
  date_day_5_total_trabajan: number;
  date_day_6_total_trabajan: number;
  date_day_7_total_trabajan: number;


  groups: GroupData[];

  type_liders: TypeLiderData[];
  type_standbies: TypeStandbyData[];

  shifts_row: FormDataShiftsPerDay[];
  shifts_hextras: FormDataShiftsPerDay[];

  shifts_1: FormDataShiftsPerDay[];
  shifts_2: FormDataShiftsPerDay[];
  shifts_3: FormDataShiftsPerDay[];
  shifts_4: FormDataShiftsPerDay[];
  shifts_5: FormDataShiftsPerDay[];
  shifts_6: FormDataShiftsPerDay[];
  shifts_7: FormDataShiftsPerDay[];

  agents_descansa_1: number[];
  agents_descansa_2: number[];
  agents_descansa_3: number[];
  agents_descansa_4: number[];
  agents_descansa_5: number[];
  agents_descansa_6: number[];
  agents_descansa_7: number[];

  agents_hsuplementarias_1: FormDataHSuplem[];
  agents_hsuplementarias_2: FormDataHSuplem[];
  agents_hsuplementarias_3: FormDataHSuplem[];
  agents_hsuplementarias_4: FormDataHSuplem[];
  agents_hsuplementarias_5: FormDataHSuplem[];
  agents_hsuplementarias_6: FormDataHSuplem[];
  agents_hsuplementarias_7: FormDataHSuplem[];

  agents_hextras_1: FormDataHExtra[];
  agents_hextras_2: FormDataHExtra[];
  agents_hextras_3: FormDataHExtra[];
  agents_hextras_4: FormDataHExtra[];
  agents_hextras_5: FormDataHExtra[];
  agents_hextras_6: FormDataHExtra[];
  agents_hextras_7: FormDataHExtra[];

};

interface CoordinatorData {
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

interface SchedulesDayData {
  id: number;
};


interface Props {
  site_id_logueado: number;
  shifts: FormDataShifts[];
  groupsAndAgents: FormDataGroupsAndAgents[];
  coordinators: CoordinatorData[];
  groups: GroupData[];
  schedules_anterior: ScheduleListData[];
  type_liders: TypeLiderData[];
  type_standbies: TypeStandbyData[];

  vacationAgents: VacationAgents[];
  unavailableDateAgents: UnavailableDateAgentsData[];
  data: ScheduleData;
  planificationData: PlanificationData;
  rulesDays: RulesDaysData[];
  rulesHours: RulesHoursData[];

  schedules_day_descansos: SchedulesDayData[];
  schedules_day_hextras: SchedulesDayData[];
  schedules_day_hsuplementarias: SchedulesDayData[];
  schedules_day_leaders: SchedulesDayData[];
  schedules_day_standbies: SchedulesDayData[];
  schedules_day_turns: SchedulesDayData[];

}


function retornarFechaDeLaSemanaXFecha(fecha_value,fechaPorNDia){
  const fecha = new Date(fecha_value);

  if(fechaPorNDia<=fecha.getDay()){
    fecha.setDate(fecha.getDate() - (fecha.getDay() - fechaPorNDia));

  }else{
    fecha.setDate(fecha.getDate() + (fechaPorNDia - fecha.getDay()));

  }

  return fecha;
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


const FormLayouts = ({ site_id_logueado = 0,schedules_day_descansos=[],schedules_day_hextras=[],schedules_day_hsuplementarias=[],schedules_day_leaders=[],schedules_day_standbies=[],schedules_day_turns=[], schedules_anterior=[], vacationAgents=[], unavailableDateAgents=[], coordinators=[], shifts = [], groups = [], groupsAndAgents = [], data, planificationData }: Props) => {


  
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [valuesMensajesAlert, setValuesMensajesAlert] = useState({
    mensaje: '',
    type: 'error',
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  


  const [values, setValues] = useState<ScheduleData>(data);

  const [valuesPlanificationData, setValuesPlanificationData] = useState<PlanificationData>(planificationData);

  const handleChange = (prop: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  function cambiar_shifts(date_change){

    const date_day_1_value = retornarFechaDeLaSemanaXFecha(date_change,1);
    const date_day_2_value = retornarFechaDeLaSemanaXFecha(date_change,2);
    const date_day_3_value = retornarFechaDeLaSemanaXFecha(date_change,3);
    const date_day_4_value = retornarFechaDeLaSemanaXFecha(date_change,4);
    const date_day_5_value = retornarFechaDeLaSemanaXFecha(date_change,5);
    const date_day_6_value = retornarFechaDeLaSemanaXFecha(date_change,6);
    const date_day_7_value = retornarFechaDeLaSemanaXFecha(date_change,7);

    valuesPlanificationData.date_day_1 = date_day_1_value.getFullYear()+'-'+('0'+(date_day_1_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_1_value.getDate()).slice(-2) ;
    valuesPlanificationData.date_day_2= date_day_2_value.getFullYear()+'-'+('0'+(date_day_2_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_2_value.getDate()).slice(-2) ;
    valuesPlanificationData.date_day_3= date_day_3_value.getFullYear()+'-'+('0'+(date_day_3_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_3_value.getDate()).slice(-2) ;
    valuesPlanificationData.date_day_4= date_day_4_value.getFullYear()+'-'+('0'+(date_day_4_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_4_value.getDate()).slice(-2) ;
    valuesPlanificationData.date_day_5= date_day_5_value.getFullYear()+'-'+('0'+(date_day_5_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_5_value.getDate()).slice(-2) ;
    valuesPlanificationData.date_day_6= date_day_6_value.getFullYear()+'-'+('0'+(date_day_6_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_6_value.getDate()).slice(-2) ;
    valuesPlanificationData.date_day_7= date_day_7_value.getFullYear()+'-'+('0'+(date_day_7_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_7_value.getDate()).slice(-2) ; 

    setValuesPlanificationData({ ...valuesPlanificationData, 'date_day_1': valuesPlanificationData.date_day_1 });
    MAX_DIAS_AGENTE_SEMANA = 5;

    validar_fecha_feriado_turno(valuesPlanificationData.date_day_1, 1);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_2, 2);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_3, 3);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_4, 4);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_5, 5);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_6, 6);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_7, 7);
  }

  const validar_fecha_feriado_turno = async (valor_fecha, dia_semana) => {


    const resHolidays = await fetch(StrapiUrl+"holidays?populate=%2A&filters[deleted][$not]=true&filters[date][$eq]="+valor_fecha+"&filters[sites][id]="+site_id_logueado);
    const responseHolidays = await resHolidays.json();

    let fecha_es_feriado = false;
    fecha_es_feriado = false;

    if(responseHolidays.data.length>0){
      fecha_es_feriado = true;
      MAX_DIAS_AGENTE_SEMANA--;

    }
    



    const res = await fetch(StrapiUrl+"shifts?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=time_from%3Aasc");
    const response = await res.json();
    const shifts_flag_new: FormDataShiftsPerDay[]=[];
    let selected_groups_agents: any[]=[];

    const resScheduleDayTurns = await fetch(StrapiUrl+"schedules-day-turns?populate=%2A&filters[schedule][id]="+data.id);
    const responseScheduleDayTurns = await resScheduleDayTurns.json();

   

    try {
        let position_shift_1 = 1;
      

        for (let i = 0; i < response.data.length; i++) {

          const row =       response.data[i];
          //console.log(row);
      
          
            
          /************** SHIFTS LUNES************* */
            try{

              if(dia_semana==1 && row.attributes.type_of_shift.data.attributes.monday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){

                selected_groups_agents = [];
                for (let i5 = 0; i5 < responseScheduleDayTurns.data.length; i5++) {

                  try {
                    const row5 =       responseScheduleDayTurns.data[i5];
                    const rowGA5 =       responseScheduleDayTurns.data[i5].attributes.groups_and_agents.data;

                    if(row5.attributes.shift.data.id==row.id && valor_fecha==row5.attributes.date){
                      for (let i6 = 0; i6 < rowGA5.length; i6++) {
                        selected_groups_agents.push(rowGA5[i6].id);
                      }
                    }
                  } catch (error) {
                    
                  }
                  
                
                  

                }

                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.monday_num_agents,
                    num_agentes_sugeridos:row.attributes.monday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    place: row.attributes.place.data.id
                  }
                );
                position_shift_1++;
              } else if(dia_semana==2 && row.attributes.type_of_shift.data.attributes.tuesday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                selected_groups_agents = [];
                for (let i5 = 0; i5 < responseScheduleDayTurns.data.length; i5++) {
                  try {
                    const row5 =       responseScheduleDayTurns.data[i5];
                    const rowGA5 =       responseScheduleDayTurns.data[i5].attributes.groups_and_agents.data;

                    if(row5.attributes.shift.data.id==row.id && valor_fecha==row5.attributes.date){
                      for (let i6 = 0; i6 < rowGA5.length; i6++) {
                        selected_groups_agents.push(rowGA5[i6].id);
                      }
                    }
                  } catch (error) {
                    
                  }
                  
                
                  

                }
                
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.tuesday_num_agents,
                    num_agentes_sugeridos:row.attributes.tuesday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    place: row.attributes.place.data.id
                  }
                );
                position_shift_1++;
              }else if(dia_semana==3 && row.attributes.type_of_shift.data.attributes.wednesday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                selected_groups_agents = [];
                for (let i5 = 0; i5 < responseScheduleDayTurns.data.length; i5++) {
                  try {
                    const row5 =       responseScheduleDayTurns.data[i5];
                    const rowGA5 =       responseScheduleDayTurns.data[i5].attributes.groups_and_agents.data;

                    if(row5.attributes.shift.data.id==row.id && valor_fecha==row5.attributes.date){
                      for (let i6 = 0; i6 < rowGA5.length; i6++) {
                        selected_groups_agents.push(rowGA5[i6].id);
                      }
                    }
                  } catch (error) {
                    
                  }
                
                  

                }
                
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.wednesday_num_agents,
                    num_agentes_sugeridos:row.attributes.wednesday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    place: row.attributes.place.data.id
                  }
                );
                position_shift_1++;
              }else if(dia_semana==4 && row.attributes.type_of_shift.data.attributes.thursday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                
                selected_groups_agents = [];
                for (let i5 = 0; i5 < responseScheduleDayTurns.data.length; i5++) {
                 try {
                  const row5 =       responseScheduleDayTurns.data[i5];
                  const rowGA5 =       responseScheduleDayTurns.data[i5].attributes.groups_and_agents.data;

                  if(row5.attributes.shift.data.id==row.id && valor_fecha==row5.attributes.date){
                    for (let i6 = 0; i6 < rowGA5.length; i6++) {
                      selected_groups_agents.push(rowGA5[i6].id);
                    }
                  }
                 } catch (error) {
                  
                 }
                
                  

                }
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.thursday_num_agents,
                    num_agentes_sugeridos:row.attributes.thursday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    place: row.attributes.place.data.id
                  }
                );
                position_shift_1++;
              }else if(dia_semana==5 && row.attributes.type_of_shift.data.attributes.friday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                selected_groups_agents = [];
                for (let i5 = 0; i5 < responseScheduleDayTurns.data.length; i5++) {
                  try {
                    const row5 =       responseScheduleDayTurns.data[i5];
                    const rowGA5 =       responseScheduleDayTurns.data[i5].attributes.groups_and_agents.data;

                    if(row5.attributes.shift.data.id==row.id && valor_fecha==row5.attributes.date){
                      for (let i6 = 0; i6 < rowGA5.length; i6++) {
                        selected_groups_agents.push(rowGA5[i6].id);
                      }
                    }
                  } catch (error) {
                    
                  }
                
                  

                }
                
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.friday_num_agents,
                    num_agentes_sugeridos:row.attributes.friday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    place: row.attributes.place.data.id
                  }
                );
                position_shift_1++;
              }else if(dia_semana==6 && row.attributes.type_of_shift.data.attributes.saturday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                selected_groups_agents = [];
                for (let i5 = 0; i5 < responseScheduleDayTurns.data.length; i5++) {
                  try {
                    const row5 =       responseScheduleDayTurns.data[i5];
                    const rowGA5 =       responseScheduleDayTurns.data[i5].attributes.groups_and_agents.data;

                    if(row5.attributes.shift.data.id==row.id && valor_fecha==row5.attributes.date){
                      for (let i6 = 0; i6 < rowGA5.length; i6++) {
                        selected_groups_agents.push(rowGA5[i6].id);
                      }
                    }
                  } catch (error) {
                    
                  }
                
                  

                }
                
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.saturday_num_agents,
                    num_agentes_sugeridos:row.attributes.saturday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    place: row.attributes.place.data.id
                  }
                );
                position_shift_1++;
              }else if(dia_semana==7 && row.attributes.type_of_shift.data.attributes.sunday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                selected_groups_agents = [];
                for (let i5 = 0; i5 < responseScheduleDayTurns.data.length; i5++) {
                  try {
                    const row5 =       responseScheduleDayTurns.data[i5];
                    const rowGA5 =       responseScheduleDayTurns.data[i5].attributes.groups_and_agents.data;

                    if(row5.attributes.shift.data.id==row.id && valor_fecha==row5.attributes.date){
                      for (let i6 = 0; i6 < rowGA5.length; i6++) {
                        selected_groups_agents.push(rowGA5[i6].id);
                      }
                    }
                  } catch (error) {
                    
                  }
                
                  

                }
                
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.sunday_num_agents,
                    num_agentes_sugeridos:row.attributes.sunday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    place: row.attributes.place.data.id
                  }
                );
                position_shift_1++;
              }

            }catch (ex){

            }

          
          
        }
      
      

    } catch (ex) {
      
    }

    if(valuesPlanificationData.shifts_row.length<shifts_flag_new.length){
      valuesPlanificationData.shifts_row = shifts_flag_new;
    }

    if(dia_semana==1){
      valuesPlanificationData.shifts_1 = shifts_flag_new;
      setValuesPlanificationData({ ...valuesPlanificationData, 'date_day_1': valuesPlanificationData.date_day_1 });
    }else if(dia_semana==2){
      valuesPlanificationData.shifts_2 = shifts_flag_new;
      setValuesPlanificationData({ ...valuesPlanificationData, 'date_day_2': valuesPlanificationData.date_day_2 });
    }else if(dia_semana==3){
      valuesPlanificationData.shifts_3 = shifts_flag_new;
      setValuesPlanificationData({ ...valuesPlanificationData, 'date_day_3': valuesPlanificationData.date_day_3 });
    }else if(dia_semana==4){
      valuesPlanificationData.shifts_4 = shifts_flag_new;
      setValuesPlanificationData({ ...valuesPlanificationData, 'date_day_4': valuesPlanificationData.date_day_4 });
    }else if(dia_semana==5){
      valuesPlanificationData.shifts_5 = shifts_flag_new;
      setValuesPlanificationData({ ...valuesPlanificationData, 'date_day_5': valuesPlanificationData.date_day_5 });
    }else if(dia_semana==6){
      valuesPlanificationData.shifts_6 = shifts_flag_new;
      setValuesPlanificationData({ ...valuesPlanificationData, 'date_day_6': valuesPlanificationData.date_day_6 });
    }else if(dia_semana==7){
      valuesPlanificationData.shifts_7 = shifts_flag_new;
      setValuesPlanificationData({ ...valuesPlanificationData, 'date_day_7': valuesPlanificationData.date_day_7 });
    }


    

    
    
  }

  const handleChangePlanification = (prop: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {

    if(prop=='date_day_1' || prop=='date_day_2' || prop=='date_day_3' || prop=='date_day_4' || prop=='date_day_5' || prop=='date_day_6' || prop=='date_day_7'){
      cambiar_shifts(event.target.value);
    }
    setValuesPlanificationData({ ...valuesPlanificationData, [prop]: event.target.value })
  }

  const handleChangePlanificationGroups = (group_id: number, name_field: keyof Element, name_input: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    valuesPlanificationData.groups.map((row) => {
        if(row.id == group_id){
          row[name_field] = event.target.value;
        }
      }
    )
  setValuesPlanificationData({...valuesPlanificationData, [name_input]: event.target.value });


  }

  const handleChangePlanificationLiders = (lider_id: number, name_field: keyof Element, name_input: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    valuesPlanificationData.type_liders.map((row) => {
        if(row.id == lider_id){
          row[name_field] = event.target.value;
        }
      }
    )
  setValuesPlanificationData({...valuesPlanificationData, [name_input]: event.target.value });


  }

  const handleChangePlanificationStandBy = (standby_id: number, name_field: keyof Element, name_input: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    valuesPlanificationData.type_standbies.map((row) => {
        if(row.id == standby_id){
          row[name_field] = event.target.value;
        }
      }
    )
  setValuesPlanificationData({...valuesPlanificationData, [name_input]: event.target.value });


  }

  const handleChangeTurnos = (agent_id: number, name_field: keyof Element, day: number, name_input: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    if(
      name_field == 'monday_selected' ||
      name_field == 'tuesday_selected' ||
      name_field == 'wednesday_selected' ||
      name_field == 'thursday_selected' ||
      name_field == 'friday_selected' ||
      name_field == 'saturday_selected' ||
      name_field == 'sunday_selected' 
      
      ){
      mostrar_alerta_vacaciones_dias_no_disponibles(agent_id);
      mostrar_alerta_dia_de_la_semana_no_disponible(agent_id, day);
      mostrar_alerta_rango_de_horas(agent_id, event.target.value);
    }
    
    valuesPlanificationData.groupsAndAgents.map((row) => {
        if(row.id == agent_id){
          row[name_field] = event.target.value;
        }
      }
    )

    

    validar_usuarios_descansan();
    
    setValuesPlanificationData({...valuesPlanificationData, [name_input]: event.target.value });

    if(
      name_field == 'monday_selected' ||
      name_field == 'tuesday_selected' ||
      name_field == 'wednesday_selected' ||
      name_field == 'thursday_selected' ||
      name_field == 'friday_selected' ||
      name_field == 'saturday_selected' ||
      name_field == 'sunday_selected' 
      ){
        mostrar_alerta_trabajo_max_days(event.target.value, day, agent_id , MAX_DIAS_AGENTE_SEMANA);
    }

  }

  const handleChangeDescansan = ( name_field: keyof Element, day: number, name_input: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {

    setValuesPlanificationData({...valuesPlanificationData, [name_input]: event.target.value });
    
  }



  function ver_mensaje_modal(mensaje){
    try{

      valuesInfoDialogText.dialog_title  = mensaje;
      handleClickOpenModal();

      
    }catch (error) {
      
    }
  }

  function validar_hora_dentro_de_rango(rowGA: FormDataGroupsAndAgents, from, to, shift_from, shift_to){

    if((from=='00:00:00.000' || from=='00:00:00') && (to == '23:59:00.000' || to == '23:59:00')){
      return 1;
    }

    const fecha_time_from = "1900-01-01";
    let fecha_time_to = "1900-01-01";
    const fecha_time_from_shift = "1900-01-01";
    let fecha_time_to_shift = "1900-01-01";

    if(from>to){
      fecha_time_to = "1900-01-02";
    }
    if(shift_from>shift_to){
      fecha_time_to_shift = "1900-01-02";
    }

    const time_from = Date.parse(fecha_time_from+" "+from);
    const time_to = Date.parse(fecha_time_to+" "+to);
    const shift_time_from = Date.parse(fecha_time_from_shift+" "+shift_from);
    const shift_time_to = Date.parse(fecha_time_to_shift+" "+shift_to);

    if(rowGA.type_rule == 'Exacto'){
      if(shift_time_from==time_from && shift_time_to == time_to){
        return 1;
      }

    }

    if(rowGA.type_rule == 'Inicio'){
      if(shift_time_from>=time_from && shift_time_from  <= time_to){
        return 1;
      }

    }

    if(rowGA.type_rule == 'Rango'){

      if((shift_time_from >= time_from && shift_time_from <= time_to)  &&  (shift_time_to >= time_from && shift_time_to <= time_to)){
        return 1;

      }
    }

    return 0;

  }

  function mostrar_alerta_rango_de_horas(agent_id, shift_id){

    shifts.map(turno => {
      if( turno.id== shift_id){
        valuesPlanificationData.groupsAndAgents.map(rowGA => {
          if(agent_id== rowGA.id && validar_hora_dentro_de_rango(rowGA,rowGA.rules_hour_from,rowGA.rules_hour_to,turno.time_from, turno.time_to)==0){
    
              
            ver_mensaje_modal("Revisar la asignación. El Agente "+rowGA.agents+" no está disponible para este rango de horas. Regla aplicada: "+rowGA.rules_hour_from+" - "+rowGA.rules_hour_to+" - Tipo de Regla Hora: "+rowGA.type_rule)
  
          }
        });

      }
    });

    

  }

  function mostrar_alerta_dia_de_la_semana_no_disponible(agent_id, day){
    valuesPlanificationData.groupsAndAgents.map(rowGA => {
      if((
        (rowGA.monday==0 && day==1) || 
        (rowGA.tuesday==0 && day==2) || 
        (rowGA.wednesday==0 && day==3) || 
        (rowGA.thursday==0 && day==4) || 
        (rowGA.friday==0 && day==5) || 
        (rowGA.saturday==0 && day==6) || 
        (rowGA.sunday==0 && day==7) 
        
      ) 
      
      && agent_id== rowGA.id){
    ver_mensaje_modal(
      "Revisar la asignación. El Agente "+rowGA.agents+" no está disponible para este día de la semana. Regla aplicada: "+rowGA.rules_day)
    return 0;
  }
    });
  }
  function mostrar_alerta_trabajo_max_days(shift_id, day, agent_id, max_days){
    valuesPlanificationData.groupsAndAgents.map(rowGA => {
        let n_day_actual = 0;

        if(rowGA.monday_selected>0){
          n_day_actual++;
        }
        if(rowGA.tuesday_selected>0){
          n_day_actual++;
        }
        if(rowGA.wednesday_selected>0){
          n_day_actual++;
        }
        if(rowGA.thursday_selected>0){
          n_day_actual++;
        }
        if(rowGA.friday_selected>0){
          n_day_actual++;
        }
        if(rowGA.saturday_selected>0){
          n_day_actual++;
        }
        if(rowGA.sunday_selected>0){
          n_day_actual++;
        }

        if(n_day_actual>max_days && agent_id== rowGA.id){
          try{

            valuesNewHorasExtras.hextras_date = valuesPlanificationData['date_day_'+day];
            valuesNewHorasExtras.hextras_observations = '';
            valuesNewHorasExtras.hextras_agent_id = rowGA.id;
            valuesNewHorasExtras.hextras_shift_id = shift_id;

            for (let i = 0; i < shifts.length; i++) {
              const row =       shifts[i];
      
              if(row.id==shift_id){
                valuesNewHorasExtras.hextras_hour_from = row.time_from;
                valuesNewHorasExtras.hextras_hour_to = row.time_to;
              }
      
            }

           

            valuesInfoDialogText.dialog_title  = "Revisar la asignación. El Agente "+rowGA.agents+" ya tiene asignados "+max_days+" días en la semana.";
            handleClickOpenModalMaxHExtra();
      
            
          }catch (error) {
            
          }
          return 0;
        }else{
          return 1;
        }
    });
  }

  function mostrar_alerta_vacaciones_dias_no_disponibles(agent_id){
    valuesPlanificationData.groupsAndAgents.map(rowGA => {
      if(rowGA.vacaciones==1 && agent_id== rowGA.id){
        ver_mensaje_modal("Revisar la asignación. El Agente "+rowGA.agents+" tiene programada vacaciones.")
        return 0;
      }
      if(rowGA.dias_no_disponible==1 && agent_id== rowGA.id){
        ver_mensaje_modal("Revisar la asignación. El Agente "+rowGA.agents+" no está disponible para esta fecha.")
        return 0;

      }
    });
  }

  function validar_usuarios_descansan(){
    valuesPlanificationData.agents_descansa_1 = [];
    valuesPlanificationData.agents_descansa_2 = [];
    valuesPlanificationData.agents_descansa_3 = [];
    valuesPlanificationData.agents_descansa_4 = [];
    valuesPlanificationData.agents_descansa_5 = [];
    valuesPlanificationData.agents_descansa_6 = [];
    valuesPlanificationData.agents_descansa_7 = [];

    valuesPlanificationData.date_day_1_total_trabajan = 0;
    valuesPlanificationData.date_day_2_total_trabajan = 0;
    valuesPlanificationData.date_day_3_total_trabajan = 0;
    valuesPlanificationData.date_day_4_total_trabajan = 0;
    valuesPlanificationData.date_day_5_total_trabajan = 0;
    valuesPlanificationData.date_day_6_total_trabajan = 0;
    valuesPlanificationData.date_day_7_total_trabajan = 0;

    try{
      valuesPlanificationData.groups.map((rowGROUP) => {
        valuesPlanificationData.groupsAndAgents.map((rowGA) => {
  
          if(rowGA.group_id == rowGROUP.id ){
            let descansa_1 = 1;
            let descansa_2 = 1;
            let descansa_3 = 1;
            let descansa_4 = 1;
            let descansa_5 = 1;
            let descansa_6 = 1;
            let descansa_7 = 1;
      
            if(rowGA.monday_selected > 0){
              descansa_1 = 0;
            }
            if(rowGA.tuesday_selected > 0){
              descansa_2 = 0;
            }
            if(rowGA.wednesday_selected > 0){
              descansa_3 = 0;
            }
            if(rowGA.thursday_selected > 0){
              descansa_4 = 0;
            }
            if(rowGA.friday_selected > 0){
              descansa_5 = 0;
            }
            if(rowGA.saturday_selected > 0){
              descansa_6 = 0;
            }
            if(rowGA.sunday_selected > 0){
              descansa_7 = 0;
            }
            
      
      
      
            if(descansa_1==1){
              if(rowGROUP.view_monday_rest==1){
                valuesPlanificationData.agents_descansa_1.push(rowGA.id);
              }
              rowGA.total_dia_1 = 0;
            }else{
              rowGA.total_dia_1 = 1;
              valuesPlanificationData.date_day_1_total_trabajan ++;
            }
            if(descansa_2==1){
              if(rowGROUP.view_tuesday_rest==1){
                valuesPlanificationData.agents_descansa_2.push(rowGA.id);
              }
              rowGA.total_dia_2 = 0;
            }else{
              rowGA.total_dia_2 = 1;
              valuesPlanificationData.date_day_2_total_trabajan ++;
            }
            if(descansa_3==1){
              if(rowGROUP.view_wednesday_rest==1){
                valuesPlanificationData.agents_descansa_3.push(rowGA.id);
              }
              rowGA.total_dia_3 = 0;
            }else{
              rowGA.total_dia_3 = 1;
              valuesPlanificationData.date_day_3_total_trabajan ++;
            }
            if(descansa_4==1){
              if(rowGROUP.view_thursday_rest==1){
                valuesPlanificationData.agents_descansa_4.push(rowGA.id);
              }
              rowGA.total_dia_4 = 0;
            }else{
              rowGA.total_dia_4 = 1;
              valuesPlanificationData.date_day_4_total_trabajan ++;
            }
            if(descansa_5==1){
              if(rowGROUP.view_friday_rest==1){
                valuesPlanificationData.agents_descansa_5.push(rowGA.id);
              }
              rowGA.total_dia_5 = 0;
            }else{
              rowGA.total_dia_5 = 1;
              valuesPlanificationData.date_day_5_total_trabajan ++;
            }
            if(descansa_6==1){
              if(rowGROUP.view_saturday_rest==1){
                valuesPlanificationData.agents_descansa_6.push(rowGA.id);
              }
              rowGA.total_dia_6 = 0;
            }else{
              rowGA.total_dia_6 = 1;
              valuesPlanificationData.date_day_6_total_trabajan ++;
            }
            if(descansa_7==1){
              if(rowGROUP.view_sunday_rest==1){
                valuesPlanificationData.agents_descansa_7.push(rowGA.id);
              }
              rowGA.total_dia_7 = 0;
            }else{
              rowGA.total_dia_7 = 1;
              valuesPlanificationData.date_day_7_total_trabajan ++;
            }
          }
          
          
        });
      });
    }catch(ex){

    }

   

    


  }



  

  function limpiarTodosTurnos(){

    //console.log("  ***  INICIA LIMPIADO  *** ")

    valuesPlanificationData.groupsAndAgents.map((row) => {
      row.monday_selected = 0;
      row.tuesday_selected = 0;
      row.wednesday_selected = 0;
      row.thursday_selected = 0;
      row.friday_selected = 0;
      row.saturday_selected = 0;
      row.sunday_selected = 0;

      setValuesPlanificationData({...valuesPlanificationData});

    }
    );

    
    //console.log("  ***  FIN LIMPIADO  *** ")

    
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

 

  



  const [valuesInfoDialogText, setValuesInfo] = useState<InfoElementDialogText>({
    dialog_title: '',
    showProgress: false,
    mensaje_progress: 'Creando Información. Por favor Espere.',
  })

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [openModalMaxHExtra, setOpenModalMaxHExtra] = React.useState(false);

  const handleClickOpenModalMaxHExtra = () => {
    setOpenModalMaxHExtra(true);
  };

  const handleCloseModalMaxHExtra = () => {
    setOpenModalMaxHExtra(false);
  };

  const aceptarMaxHExtra = () => {
    
    try {

      let dia = 1;

      for (let index = 1; index < 8; index++) {
        if(valuesNewHorasExtras.hextras_date == valuesPlanificationData['date_day_'+index]){
          dia = index;
        }
        
      }

      

      const DEFAULT_AGENTS: HTMLElement = document.getElementById(valuesNewHorasExtras.hextras_agent_id+"_shift_"+dia) as HTMLElement
      DEFAULT_AGENTS.style.backgroundColor  = 'yellow';
      
      
    } catch (error) {
      
    }
    executeHExtras();
    handleCloseModalMaxHExtra();

  };

  const [openHExtras, setOpenHExtras] = React.useState(false);

  const [valuesNewHorasExtras, setValuesNewHorasExtras] = useState<InfoModalNewHorasExtras>({
    hextras_agent_id: '',
    hextras_date: planificationData.date_day_1,
    hextras_hour_from: '',
    hextras_hour_to: '',
    hextras_observations: '',
    hextras_shift_id: 0,
    hextras_lunch_time: 0,
    hextras_agent_id_delete: '',
    day: 1,
    showDelete: false


  })

  const handleChangeValueHExtras = (prop: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    
    if([prop]=='hextras_shift_id'){
      
      for (let i = 0; i < shifts.length; i++) {
        const row =       shifts[i];

        if(row.id==event.target.value){
          valuesNewHorasExtras.hextras_hour_from = row.time_from;
          valuesNewHorasExtras.hextras_hour_to = row.time_to;
          valuesNewHorasExtras.hextras_lunch_time = row.lunch_time;

        }

      }

    }

    setValuesNewHorasExtras({ ...valuesNewHorasExtras, [prop]: event.target.value })

    

  }

  function eliminar_hextras(hextras_agent_id_delete, n_d_la_semana){

    const agentes: FormDataHExtra[]=[];

    valuesPlanificationData['agents_hextras_'+n_d_la_semana].map((HEXTRA) => {
      if(HEXTRA.selected_groups_agents!=hextras_agent_id_delete){
        agentes.push(HEXTRA);

      }
    });

    valuesPlanificationData['agents_hextras_'+n_d_la_semana] = agentes;

    setValuesPlanificationData({...valuesPlanificationData});

    valuesNewHorasExtras.hextras_agent_id = '';
    valuesNewHorasExtras.hextras_hour_from = '';
    valuesNewHorasExtras.hextras_hour_to = '';
    valuesNewHorasExtras.hextras_observations = '';
    
    
    valuesNewHorasExtras.hextras_shift_id = 0;
    valuesNewHorasExtras.hextras_lunch_time = 0;

    handleCloseHExtras();
    ver_mensaje_modal("Se ha eliminado el registro de Horas Extras ");


  }

  function eliminar_hsuplem(hsuplem_agent_id_delete, n_d_la_semana){

    const agentes: FormDataHSuplem[]=[];

    valuesPlanificationData['agents_hsuplementarias_'+n_d_la_semana].map((HSUPLEM) => {
      if(HSUPLEM.selected_groups_agents!=hsuplem_agent_id_delete){
        agentes.push(HSUPLEM);

      }
    });

    valuesPlanificationData['agents_hsuplementarias_'+n_d_la_semana] = agentes;

    setValuesPlanificationData({...valuesPlanificationData});

    valuesNewHorasSuplem.hsuplem_agent_id = '';
    valuesNewHorasSuplem.hsuplem_date = '';
    valuesNewHorasSuplem.hsuplem_hour_from = '';
    valuesNewHorasSuplem.hsuplem_hour_to = '';
    valuesNewHorasSuplem.hsuplem_observations = '';



    handleCloseHSuplem();
    ver_mensaje_modal("Se ha eliminado el registro de Horas Suplementarias ");


  }

  function editHSuplem(agent_group_id, n_d_la_semana){    

    

  

    handleClickOpenHSuplem();


    setValuesPlanificationData({...valuesPlanificationData});

    valuesPlanificationData['agents_hsuplementarias_'+n_d_la_semana].map((HSUPLEM) => {
      if(HSUPLEM.selected_groups_agents == agent_group_id){
        valuesNewHorasSuplem.hsuplem_agent_id = HSUPLEM.selected_groups_agents;
        valuesNewHorasSuplem.hsuplem_date = HSUPLEM.date;
        valuesNewHorasSuplem.hsuplem_hour_from = HSUPLEM.time_from;
        valuesNewHorasSuplem.hsuplem_hour_to = HSUPLEM.time_to;
        valuesNewHorasSuplem.hsuplem_observations = HSUPLEM.observations;

        valuesNewHorasSuplem.hsuplem_agent_id_delete = HSUPLEM.selected_groups_agents;
        valuesNewHorasSuplem.day = n_d_la_semana;
        valuesNewHorasSuplem.showDelete = true;


        

        
      }

      
    });

  

    handleClickOpenHSuplem();
  }

  function editHExtras(agent_group_id, n_d_la_semana){    

    valuesPlanificationData.shifts_hextras = valuesPlanificationData['shifts_'+n_d_la_semana];

    setValuesPlanificationData({...valuesPlanificationData});

    valuesPlanificationData['agents_hextras_'+n_d_la_semana].map((HEXTRA) => {
      if(HEXTRA.selected_groups_agents == agent_group_id){
        valuesNewHorasExtras.hextras_hour_from = HEXTRA.time_from;
        valuesNewHorasExtras.hextras_hour_to = HEXTRA.time_to;
        valuesNewHorasExtras.hextras_lunch_time = HEXTRA.lunch_time;
        valuesNewHorasExtras.hextras_date = HEXTRA.date;
        valuesNewHorasExtras.hextras_agent_id = HEXTRA.selected_groups_agents;
        valuesNewHorasExtras.hextras_agent_id_delete = HEXTRA.selected_groups_agents;
        valuesNewHorasExtras.day = n_d_la_semana;
        valuesNewHorasExtras.showDelete = true;
        valuesNewHorasExtras.hextras_shift_id = HEXTRA.shift;
        valuesNewHorasExtras.hextras_observations = HEXTRA.observations;

        

        
      }

      
    });

  

    handleClickOpenHExtras();
  }

  function clear_add_hextras(dia_de_la_semana){
    if(valuesPlanificationData.date_day_1==dia_de_la_semana){
      const limpiar_array = [];

      

      valuesPlanificationData.agents_hextras_1 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hextras_1']: limpiar_array });


    }
    if(valuesPlanificationData.date_day_2==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hextras_2 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hextras_2']: limpiar_array });


    }
    if(valuesPlanificationData.date_day_3==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hextras_3 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hextras_3']: limpiar_array });


    }
    if(valuesPlanificationData.date_day_4==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hextras_4 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hextras_4']: limpiar_array });


    }
    if(valuesPlanificationData.date_day_5==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hextras_5 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hextras_5']: limpiar_array });


    }
    if(valuesPlanificationData.date_day_6==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hextras_6 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hextras_6']: limpiar_array });


    }
    if(valuesPlanificationData.date_day_7==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hextras_7 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hextras_7']: limpiar_array });


    }
    ver_mensaje_modal("Se han eliminado las horas extras en la fecha "+dia_de_la_semana);

  }

  function modal_add_hextras(dia_de_la_semana, n_d_la_semana){
    valuesNewHorasExtras.hextras_date = dia_de_la_semana;
    valuesNewHorasExtras.showDelete = false;

    valuesPlanificationData.shifts_hextras = valuesPlanificationData['shifts_'+n_d_la_semana];

    setValuesPlanificationData({...valuesPlanificationData});


  

    handleClickOpenHExtras();
    
  }

  const handleClickOpenHExtras = () => {
    setOpenHExtras(true);
  };

  const handleCloseHExtras = () => {
    setOpenHExtras(false);
  };

  function executeHExtras(){
    try {

      let dia_semana = 1 ;
      if(valuesPlanificationData.date_day_1==valuesNewHorasExtras.hextras_date){
        dia_semana=1;
      }else if(valuesPlanificationData.date_day_2==valuesNewHorasExtras.hextras_date){
        dia_semana=2;
      }else if(valuesPlanificationData.date_day_3==valuesNewHorasExtras.hextras_date){
        dia_semana=3;
      }else if(valuesPlanificationData.date_day_4==valuesNewHorasExtras.hextras_date){
        dia_semana=4;
      }else if(valuesPlanificationData.date_day_5==valuesNewHorasExtras.hextras_date){
        dia_semana=5;
      }else if(valuesPlanificationData.date_day_6==valuesNewHorasExtras.hextras_date){
        dia_semana=6;
      }else if(valuesPlanificationData.date_day_7==valuesNewHorasExtras.hextras_date){
        dia_semana=7;
      }

      const agentes: FormDataHExtra[]=[];

        valuesPlanificationData['agents_hextras_'+dia_semana].map((HEXTRA) => {
          if(HEXTRA.selected_groups_agents!=valuesNewHorasExtras.hextras_agent_id){
            agentes.push(HEXTRA);
          }
        });

        agentes.push(
          {
            date: valuesNewHorasExtras.hextras_date,
            lunch_time: valuesNewHorasExtras.hextras_lunch_time,
            time_from: valuesNewHorasExtras.hextras_hour_from,
            time_to: valuesNewHorasExtras.hextras_hour_to,
            observations: valuesNewHorasExtras.hextras_observations,
            selected_groups_agents: valuesNewHorasExtras.hextras_agent_id,
            shift: valuesNewHorasExtras.hextras_shift_id

          }
        );

        valuesPlanificationData['agents_hextras_'+dia_semana] = agentes;

        setValuesPlanificationData({...valuesPlanificationData});


    

      valuesNewHorasExtras.hextras_agent_id = '';
      valuesNewHorasExtras.hextras_hour_from = '';
      valuesNewHorasExtras.hextras_hour_to = '';
      valuesNewHorasExtras.hextras_observations = '';
      
      
      valuesNewHorasExtras.hextras_shift_id = 0;
      valuesNewHorasExtras.hextras_lunch_time = 0;







      handleCloseHExtras();
      ver_mensaje_modal("Se han agregado las horas extras del agente. En la fecha "+valuesNewHorasExtras.hextras_date)

    } catch (error) {
      //console.log(error);
    }
  }

  const handleSubmitHExtras = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeHExtras();
    
  };

  const [openHSuplem, setOpenHSuplem] = React.useState(false);

  const [valuesNewHorasSuplem, setValuesNewHorasSuplem] = useState<InfoModalNewHorasSuplem>({
    hsuplem_agent_id: '',
    hsuplem_date: planificationData.date_day_1,
    hsuplem_hour_from: '',
    hsuplem_hour_to: '',
    hsuplem_observations: '',
    hsuplem_agent_id_delete: '',
    day: 1,
    showDelete: false



  })

  const handleChangeValueHSuplem = (prop: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    setValuesNewHorasSuplem({ ...valuesNewHorasSuplem, [prop]: event.target.value })

  }

  function clear_add_hsuplem(dia_de_la_semana){
    if(valuesPlanificationData.date_day_1==dia_de_la_semana){

      valuesPlanificationData.agents_hsuplementarias_1 = [];
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hsuplementarias_1']: [] });

    }
    if(valuesPlanificationData.date_day_2==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hsuplementarias_2 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hsuplementarias_2']: limpiar_array });


    }
    if(valuesPlanificationData.date_day_3==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hsuplementarias_3 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hsuplementarias_3']: limpiar_array });


    }
    if(valuesPlanificationData.date_day_4==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hsuplementarias_4 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hsuplementarias_4']: limpiar_array });


    }
    if(valuesPlanificationData.date_day_5==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hsuplementarias_5 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hsuplementarias_5']: limpiar_array });


    }
    if(valuesPlanificationData.date_day_6==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hsuplementarias_6 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hsuplementarias_6']: limpiar_array });


    }
    if(valuesPlanificationData.date_day_7==dia_de_la_semana){
      const limpiar_array = [];

      valuesPlanificationData.agents_hsuplementarias_7 = limpiar_array;
      setValuesPlanificationData({...valuesPlanificationData, ['agents_hsuplementarias_7']: limpiar_array });


    }
    ver_mensaje_modal("Se han eliminado las horas Suplementarias en la fecha "+dia_de_la_semana);

  }

  function modal_add_hsuplem(dia_de_la_semana){
    valuesNewHorasSuplem.hsuplem_date = dia_de_la_semana;
    valuesNewHorasSuplem.showDelete = false;


  

    handleClickOpenHSuplem();
    
  }

  const handleClickOpenHSuplem = () => {
    setOpenHSuplem(true);
  };

  const handleCloseHSuplem = () => {
    setOpenHSuplem(false);
  };

  const handleSubmitHSuplem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      let dia_semana = 1 ;
      if(valuesPlanificationData.date_day_1==valuesNewHorasSuplem.hsuplem_date){
        dia_semana=1;
      }else if(valuesPlanificationData.date_day_2==valuesNewHorasSuplem.hsuplem_date){
        dia_semana=2;
      }else if(valuesPlanificationData.date_day_3==valuesNewHorasSuplem.hsuplem_date){
        dia_semana=3;
      }else if(valuesPlanificationData.date_day_4==valuesNewHorasSuplem.hsuplem_date){
        dia_semana=4;
      }else if(valuesPlanificationData.date_day_5==valuesNewHorasSuplem.hsuplem_date){
        dia_semana=5;
      }else if(valuesPlanificationData.date_day_6==valuesNewHorasSuplem.hsuplem_date){
        dia_semana=6;
      }else if(valuesPlanificationData.date_day_7==valuesNewHorasSuplem.hsuplem_date){
        dia_semana=7;
      }

      const agentes: FormDataHSuplem[]=[];

      valuesPlanificationData['agents_hsuplementarias_'+dia_semana].map((HSUPLEM) => {
        if(HSUPLEM.selected_groups_agents!=valuesNewHorasSuplem.hsuplem_agent_id){
          agentes.push(HSUPLEM);
        }
      });

      agentes.push(
        {
          date: valuesNewHorasSuplem.hsuplem_date,
          time_from: valuesNewHorasSuplem.hsuplem_hour_from,
          time_to: valuesNewHorasSuplem.hsuplem_hour_to,
          observations: valuesNewHorasSuplem.hsuplem_observations,
          selected_groups_agents: valuesNewHorasSuplem.hsuplem_agent_id

        }
      );

      valuesPlanificationData['agents_hsuplementarias_'+dia_semana] = agentes;

      setValuesPlanificationData({...valuesPlanificationData});


      valuesNewHorasSuplem.hsuplem_agent_id = '';
      valuesNewHorasSuplem.hsuplem_hour_from = '';
      valuesNewHorasSuplem.hsuplem_hour_to = '';
      valuesNewHorasSuplem.hsuplem_observations = '';







      handleCloseHSuplem();
      ver_mensaje_modal("Se han agregado las horas suplementarias del agente. En la fecha "+valuesNewHorasSuplem.hsuplem_date)

    } catch (error) {
      //console.log(error);
    }
  };

  const cargarDatosDeVeladaAnterior = async () => {

    if(
      values.schedule_anterior_cargar > 0
    ){

      const resScheduleDayTurns = await fetch(StrapiUrl+"schedules-day-turns?populate=%2A&filters[schedule][id]="+values.schedule_anterior_cargar);
      const responseScheduleDayTurns = await resScheduleDayTurns.json();
      let shift_selected = 0;

  
      try {

        valuesPlanificationData.groupsAndAgents.map((GROUPAGENT) => {

          for (let index = 1; index < 8; index++) {

            shift_selected = 0;
            for (let i5 = 0; i5 < responseScheduleDayTurns.data.length; i5++) {
              const row5 =       responseScheduleDayTurns.data[i5];
              const rowGA5 =       responseScheduleDayTurns.data[i5].attributes.groups_and_agents.data;
  
              const fecha = new Date(row5.attributes.date);

              let dia_de_la_semana = fecha.getDay();

              if(dia_de_la_semana==0){
                dia_de_la_semana = 7;
              }
  
              if(index == dia_de_la_semana){
                for (let i6 = 0; i6 < rowGA5.length; i6++) {
                  if(rowGA5[i6].id == GROUPAGENT.id){
                    shift_selected = row5.attributes.shift.data.id;
                  }
                }
                
              }
  
              
  
            
              
  
            }

            if(index==1){
              GROUPAGENT.monday_selected = shift_selected;
            }else if(index==2){
              GROUPAGENT.tuesday_selected = shift_selected;
            }else if(index==3){
              GROUPAGENT.wednesday_selected = shift_selected;
            }else if(index==4){
              GROUPAGENT.thursday_selected = shift_selected;
            }else if(index==5){
              GROUPAGENT.friday_selected = shift_selected;
            }else if(index==6){
              GROUPAGENT.saturday_selected = shift_selected;
            }else if(index==7){
              GROUPAGENT.sunday_selected = shift_selected;
            }
  
  
            setValuesPlanificationData({...valuesPlanificationData});
          }
        });
          
        
        
    
          
        
        
    
      } catch (ex) {
        
      }
    }else{
      ver_mensaje_modal("Seleccione el horario anterior para cargar.");

    }
    


  }
 
  
  const element_id= router.query.id;

  const handleSubmitElementSchedule = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let selected_groups_agents: any[]=[];

      for (let index = 1; index < 8; index++) {
        valuesPlanificationData['shifts_'+index].map((SHIFT) => {

          selected_groups_agents = [];
         

          SHIFT.selected_groups_agents = selected_groups_agents;
          setValuesPlanificationData({...valuesPlanificationData });


        });
        
      }
      
    } catch (error) {
      
    }

    try {
      let selected_groups_agents: any[]=[];

      for (let index = 1; index < 8; index++) {
        valuesPlanificationData['shifts_'+index].map((SHIFT) => {

          selected_groups_agents = [];
          valuesPlanificationData.groupsAndAgents.map(async GROUPAGENT => {

            let field = 'monday_selected';

            if(index==1){
              field = 'monday_selected';
            }else if(index==2){
              field = 'tuesday_selected';
            }else if(index==3){
              field = 'wednesday_selected';
            }else if(index==4){
              field = 'thursday_selected';
            }else if(index==5){
              field = 'friday_selected';
            }else if(index==6){
              field = 'saturday_selected';
            }else if(index==7){
              field = 'sunday_selected';
            }
          

            if(SHIFT.id == GROUPAGENT[''+field+'']){
              selected_groups_agents.push(GROUPAGENT.id);
            }

          });

          SHIFT.selected_groups_agents = selected_groups_agents;
          setValuesPlanificationData({...valuesPlanificationData });


        });
        
      }
      
    } catch (error) {
      
    }

    try {
      if(
        valuesPlanificationData.date_day_1!='' && 
        valuesPlanificationData.date_day_1!=null &&
        valuesPlanificationData.date_day_7!='' && 
        valuesPlanificationData.date_day_7!=null &&
        values.internal_code!='' && 
        values.internal_code!=null &&
        values.coordinator>0 && 
        values.coordinator!=null &&
        values.production!=null && 
        values.planificado!=null
      ){
        try {
          valuesInfoDialogText.showProgress = true;
          ver_mensaje_modal('');

          const 
          res = 
          await fetch(StrapiUrl+"schedules/"+element_id, 
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data:{
                  date_from: valuesPlanificationData.date_day_1,
                  date_to: valuesPlanificationData.date_day_7,
                  internal_code: values.internal_code,
                  site: site_id_logueado,
                  coordinator: values.coordinator,
                  active: true,
                  production: values.production,
                  planificado: values.planificado,
                  deleted: false
                }
              }),
            }
          );

          const response = await res.json();

          if(res.status==200){
            if(response.data.id>0){

              /***************** ELIMINAR LOS REGISTROS DESCANSO **********/
              schedules_day_descansos.map(async element => {

                const resDelete = await fetch(StrapiUrl+"schedules-day-descansos/" + element.id, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
          
                });
                if(resDelete.status==200){
                  
                }

              });
              /***************** ELIMINAR LOS REGISTROS H EXTRAS **********/
              schedules_day_hextras.map(async element => {

                const resDelete = await fetch(StrapiUrl+"schedules-day-hextras/" + element.id, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
          
                });
                if(resDelete.status==200){
                  
                }

              });
               /***************** ELIMINAR LOS REGISTROS H SUPLE **********/
               schedules_day_hsuplementarias.map(async element => {

                const resDelete = await fetch(StrapiUrl+"schedules-day-hsuplementarias/" + element.id, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
          
                });
                if(resDelete.status==200){
                  
                }

              });

              /***************** ELIMINAR LOS REGISTROS LEADERS **********/
              schedules_day_leaders.map(async element => {

                const resDelete = await fetch(StrapiUrl+"schedules-day-leaders/" + element.id, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
          
                });
                if(resDelete.status==200){
                  
                }

              });

              /***************** ELIMINAR LOS REGISTROS STANDBIES **********/
              schedules_day_standbies.map(async element => {

                const resDelete = await fetch(StrapiUrl+"schedules-day-standbies/" + element.id, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
          
                });
                if(resDelete.status==200){
                  
                }

              });

              /***************** ELIMINAR LOS REGISTROS TURNS **********/
              schedules_day_turns.map(async element => {

                const resDelete = await fetch(StrapiUrl+"schedules-day-turns/" + element.id, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
          
                });
                if(resDelete.status==200){
                  
                }

              });


              /***************** CREAR LOS REGISTROS SABADO AGENTES LIDERES **********/
              try {
                valuesPlanificationData.type_liders.map(async element => {
                  try {
                    const 
                    res2 = 
                    await fetch(StrapiUrl+"schedules-day-leaders", 
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          data:{
                            schedule: response.data.id,
                            groups_and_agent: element.groups_and_agent_id_6,
                            tipo_lider: element.id,
                            date: valuesPlanificationData.date_day_6,
                            name: element.name,
                            order: element.order
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
                
              }

              /***************** CREAR LOS REGISTROS DOMINGO AGENTES LIDERES **********/
              try {
                valuesPlanificationData.type_liders.map(async element => {
                  try {
                    const 
                    res2 = 
                    await fetch(StrapiUrl+"schedules-day-leaders", 
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          data:{
                            schedule: response.data.id,
                            groups_and_agent: element.groups_and_agent_id_7,
                            tipo_lider: element.id,
                            date: valuesPlanificationData.date_day_7,
                            name: element.name,
                            order: element.order
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
                
              }


              /***************** CREAR LOS REGISTROS SABADO AGENTES STANDBY **********/
              try {
                valuesPlanificationData.type_standbies.map(async element => {
                  try {
                    const 
                    res2 = 
                    await fetch(StrapiUrl+"schedules-day-standbies", 
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          data:{
                            schedule: response.data.id,
                            groups_and_agent: element.groups_and_agent_id_6,
                            tipo_standby: element.id,
                            date: valuesPlanificationData.date_day_6,
                            name: element.name,
                            order: element.order
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
                
              }

              /***************** CREAR LOS REGISTROS DOMINGO AGENTES STANDBY **********/
              try {
                valuesPlanificationData.type_standbies.map(async element => {
                  try {
                    const 
                    res2 = 
                    await fetch(StrapiUrl+"schedules-day-standbies", 
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          data:{
                            schedule: response.data.id,
                            groups_and_agent: element.groups_and_agent_id_7,
                            tipo_standby: element.id,
                            date: valuesPlanificationData.date_day_7,
                            name: element.name,
                            order: element.order
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
                
              }











              /***************** CREAR LOS REGISTROS LUNES AGENTES QUE DESCANSAN**********/
              try {
                const 
                res2 = 
                await fetch(StrapiUrl+"schedules-day-descansos", 
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      data:{
                        schedule: response.data.id,
                        date: valuesPlanificationData.date_day_1,
                        groups_and_agents: valuesPlanificationData.agents_descansa_1
                      }
                    }),
                  }
                );
                                
                const response2 = await res2.json();
                if(response2.data.id>0){
                  
                }
              } catch (error) {
                
              }
              /***************** CREAR LOS REGISTROS MARTES AGENTES QUE DESCANSAN**********/
              try {
                const 
                res2 = 
                await fetch(StrapiUrl+"schedules-day-descansos", 
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      data:{
                        schedule: response.data.id,
                        date: valuesPlanificationData.date_day_2,
                        groups_and_agents: valuesPlanificationData.agents_descansa_2
                      }
                    }),
                  }
                );
                                
                const response2 = await res2.json();
                if(response2.data.id>0){
                  
                }
              } catch (error) {
                
              }
              /***************** CREAR LOS REGISTROS MIERCOLES AGENTES QUE DESCANSAN**********/
              try {
                const 
                res2 = 
                await fetch(StrapiUrl+"schedules-day-descansos", 
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      data:{
                        schedule: response.data.id,
                        date: valuesPlanificationData.date_day_3,
                        groups_and_agents: valuesPlanificationData.agents_descansa_3
                      }
                    }),
                  }
                );
                                
                const response2 = await res2.json();
                if(response2.data.id>0){
                  
                }
              } catch (error) {
                
              }
              /***************** CREAR LOS REGISTROS JUEVES AGENTES QUE DESCANSAN**********/
              try {
                const 
                res2 = 
                await fetch(StrapiUrl+"schedules-day-descansos", 
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      data:{
                        schedule: response.data.id,
                        date: valuesPlanificationData.date_day_4,
                        groups_and_agents: valuesPlanificationData.agents_descansa_4
                      }
                    }),
                  }
                );
                                
                const response2 = await res2.json();
                if(response2.data.id>0){
                  
                }
              } catch (error) {
                
              }
              /***************** CREAR LOS REGISTROS VIERNES AGENTES QUE DESCANSAN**********/
              try {
                const 
                res2 = 
                await fetch(StrapiUrl+"schedules-day-descansos", 
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      data:{
                        schedule: response.data.id,
                        date: valuesPlanificationData.date_day_5,
                        groups_and_agents: valuesPlanificationData.agents_descansa_5
                      }
                    }),
                  }
                );
                                
                const response2 = await res2.json();
                if(response2.data.id>0){
                  
                }
              } catch (error) {
                
              }
              /***************** CREAR LOS REGISTROS SABADO AGENTES QUE DESCANSAN**********/
              try {
                const 
                res2 = 
                await fetch(StrapiUrl+"schedules-day-descansos", 
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      data:{
                        schedule: response.data.id,
                        date: valuesPlanificationData.date_day_6,
                        groups_and_agents: valuesPlanificationData.agents_descansa_6
                      }
                    }),
                  }
                );
                                
                const response2 = await res2.json();
                if(response2.data.id>0){
                  
                }
              } catch (error) {
                
              }
              /***************** CREAR LOS REGISTROS DOMINGO AGENTES QUE DESCANSAN**********/
              try {
                const 
                res2 = 
                await fetch(StrapiUrl+"schedules-day-descansos", 
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      data:{
                        schedule: response.data.id,
                        date: valuesPlanificationData.date_day_7,
                        groups_and_agents: valuesPlanificationData.agents_descansa_7
                      }
                    }),
                  }
                );
                                
                const response2 = await res2.json();
                if(response2.data.id>0){
                  
                }
              } catch (error) {
                
              }





              /***************** CREAR LOS REGISTROS LUNES H SUPLEMENTARIAS**********/
              valuesPlanificationData.agents_hsuplementarias_1.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hsuplementarias", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          date: element.date,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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
              /***************** CREAR LOS REGISTROS MARTES H SUPLEMENTARIAS**********/
              valuesPlanificationData.agents_hsuplementarias_2.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hsuplementarias", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          date: element.date,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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
              
              /***************** CREAR LOS REGISTROS MIERCOLES H SUPLEMENTARIAS**********/
              valuesPlanificationData.agents_hsuplementarias_3.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hsuplementarias", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          date: element.date,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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

              /***************** CREAR LOS REGISTROS JUEVES H SUPLEMENTARIAS**********/
              valuesPlanificationData.agents_hsuplementarias_4.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hsuplementarias", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          date: element.date,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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

              /***************** CREAR LOS REGISTROS VIERNES H SUPLEMENTARIAS**********/
              valuesPlanificationData.agents_hsuplementarias_5.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hsuplementarias", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          date: element.date,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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

              /***************** CREAR LOS REGISTROS SABADO H SUPLEMENTARIAS**********/
              valuesPlanificationData.agents_hsuplementarias_6.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hsuplementarias", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          date: element.date,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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

              /***************** CREAR LOS REGISTROS DOMINGO H SUPLEMENTARIAS**********/
              valuesPlanificationData.agents_hsuplementarias_7.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hsuplementarias", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          date: element.date,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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







              /***************** CREAR LOS REGISTROS LUNES H EXTRAS **********/
              valuesPlanificationData.agents_hextras_1.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hextras", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          shift: element.shift,
                          date: element.date,
                          lunch_time: element.lunch_time,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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
              /***************** CREAR LOS REGISTROS MARTES H EXTRAS **********/
              valuesPlanificationData.agents_hextras_2.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hextras", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          shift: element.shift,
                          date: element.date,
                          lunch_time: element.lunch_time,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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
              /***************** CREAR LOS REGISTROS MIERCOLES H EXTRAS **********/
              valuesPlanificationData.agents_hextras_3.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hextras", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          shift: element.shift,
                          date: element.date,
                          lunch_time: element.lunch_time,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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
              /***************** CREAR LOS REGISTROS JUEVES H EXTRAS **********/
              valuesPlanificationData.agents_hextras_4.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hextras", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          shift: element.shift,
                          date: element.date,
                          lunch_time: element.lunch_time,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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
              /***************** CREAR LOS REGISTROS VIERNES H EXTRAS **********/
              valuesPlanificationData.agents_hextras_5.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hextras", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          shift: element.shift,
                          date: element.date,
                          lunch_time: element.lunch_time,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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
              /***************** CREAR LOS REGISTROS SABADO H EXTRAS **********/
              valuesPlanificationData.agents_hextras_6.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hextras", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          shift: element.shift,
                          date: element.date,
                          lunch_time: element.lunch_time,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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
              /***************** CREAR LOS REGISTROS DOMINGO H EXTRAS **********/
              valuesPlanificationData.agents_hextras_7.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-hextras", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          schedule: response.data.id,
                          shift: element.shift,
                          date: element.date,
                          lunch_time: element.lunch_time,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          deleted: false,
                          observations: element.observations,
                          groups_and_agent: element.selected_groups_agents
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


              


              
              /***************** CREAR LOS REGISTROS LUNES **********/
              valuesPlanificationData.shifts_1.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-turns", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          date: valuesPlanificationData.date_day_1,
                          shift: element.id,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          agentes_necesarios: element.num_agentes_necesarios,
                          schedule: response.data.id,
                          groups_and_agents: element.selected_groups_agents,
                          lunch_time: element.lunch_time,
                          color: element.color,
                          name: element.name,
                          holiday: element.holiday,
                          velada: element.velada,
                          soporte: element.soporte,
                          horas_extras: element.horas_extras,
                          place: element.place
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
              /***************** CREAR LOS REGISTROS MARTES **********/
              valuesPlanificationData.shifts_2.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-turns", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          date: valuesPlanificationData.date_day_2,
                          shift: element.id,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          agentes_necesarios: element.num_agentes_necesarios,
                          schedule: response.data.id,
                          groups_and_agents: element.selected_groups_agents,
                          lunch_time: element.lunch_time,
                          color: element.color,
                          name: element.name,
                          holiday: element.holiday,
                          velada: element.velada,
                          soporte: element.soporte,
                          horas_extras: element.horas_extras,
                          place: element.place
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
              /***************** CREAR LOS REGISTROS MIERCOLES **********/
              valuesPlanificationData.shifts_3.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-turns", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          date: valuesPlanificationData.date_day_3,
                          shift: element.id,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          agentes_necesarios: element.num_agentes_necesarios,
                          schedule: response.data.id,
                          groups_and_agents: element.selected_groups_agents,
                          lunch_time: element.lunch_time,
                          color: element.color,
                          name: element.name,
                          holiday: element.holiday,
                          velada: element.velada,
                          soporte: element.soporte,
                          horas_extras: element.horas_extras,
                          place: element.place
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
              /***************** CREAR LOS REGISTROS JUEVES **********/
              valuesPlanificationData.shifts_4.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-turns", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          date: valuesPlanificationData.date_day_4,
                          shift: element.id,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          agentes_necesarios: element.num_agentes_necesarios,
                          schedule: response.data.id,
                          groups_and_agents: element.selected_groups_agents,
                          lunch_time: element.lunch_time,
                          color: element.color,
                          name: element.name,
                          holiday: element.holiday,
                          velada: element.velada,
                          soporte: element.soporte,
                          horas_extras: element.horas_extras,
                          place: element.place
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
              /***************** CREAR LOS REGISTROS VIERNES **********/
              valuesPlanificationData.shifts_5.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-turns", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          date: valuesPlanificationData.date_day_5,
                          shift: element.id,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          agentes_necesarios: element.num_agentes_necesarios,
                          schedule: response.data.id,
                          groups_and_agents: element.selected_groups_agents,
                          lunch_time: element.lunch_time,
                          color: element.color,
                          name: element.name,
                          holiday: element.holiday,
                          velada: element.velada,
                          soporte: element.soporte,
                          horas_extras: element.horas_extras,
                          place: element.place
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
              /***************** CREAR LOS REGISTROS SABADO **********/
              valuesPlanificationData.shifts_6.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-turns", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          date: valuesPlanificationData.date_day_6,
                          shift: element.id,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          agentes_necesarios: element.num_agentes_necesarios,
                          schedule: response.data.id,
                          groups_and_agents: element.selected_groups_agents,
                          lunch_time: element.lunch_time,
                          color: element.color,
                          name: element.name,
                          holiday: element.holiday,
                          velada: element.velada,
                          soporte: element.soporte,
                          horas_extras: element.horas_extras,
                          place: element.place
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
              /***************** CREAR LOS REGISTROS DOMINGO **********/
              valuesPlanificationData.shifts_7.map(async element => {
                try {
                  const 
                  res2 = 
                  await fetch(StrapiUrl+"schedules-day-turns", 
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        data:{
                          date: valuesPlanificationData.date_day_7,
                          shift: element.id,
                          time_from: element.time_from,
                          time_to: element.time_to,
                          agentes_necesarios: element.num_agentes_necesarios,
                          schedule: response.data.id,
                          groups_and_agents: element.selected_groups_agents,
                          lunch_time: element.lunch_time,
                          color: element.color,
                          name: element.name,
                          holiday: element.holiday,
                          velada: element.velada,
                          soporte: element.soporte,
                          horas_extras: element.horas_extras,
                          place: element.place
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

            }
            valuesInfoDialogText.showProgress = false;

            router.push("/schedules/");
          }else{
            valuesInfoDialogText.showProgress = false;

            setValuesMensajesAlert({
          mensaje: 'Error. '+response.error.message,
          type: 'error',
        });
        setOpenSnackbar(true);
          }
                          
          const data = await response.json();

          
        
          //return data.data;
        } catch (error) {
          valuesInfoDialogText.showProgress = false;

          //alert("Error 1: "+error);

        }


       
        




      }else{
        valuesInfoDialogText.showProgress = false;

        let mensaje_error = "";
        if(
          valuesPlanificationData.date_day_1=='' ||
          valuesPlanificationData.date_day_1==null ||
          valuesPlanificationData.date_day_7=='' ||
          valuesPlanificationData.date_day_7==null ){
          mensaje_error = "Las Fechas de los días no deben estar vacías. Ingrese un valor válido e intente nuevamente.";
        }
        if(
          values.internal_code=='' ||
          values.internal_code==null
        ){
          mensaje_error = "El campo código Interno no debe estar vacío. Ingrese un valor válido e intente nuevamente.";
        }
        if(
          values.coordinator==0 ||
          values.coordinator==null
        ){
          mensaje_error = "El campo Coordinador no debe estar vacío. Ingrese un valor válido e intente nuevamente.";
        }
       
        ver_mensaje_modal(mensaje_error);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  function findChip(row_id){
    for (let i = 0; i < groupsAndAgents.length; i++) {
      try{
        const DEFAULT_ELEMENTS = document.getElementsByClassName("CHIP_"+groupsAndAgents[i].id);

        Array.prototype.forEach.call(DEFAULT_ELEMENTS, function(el: HTMLElement) {
          // Do stuff here
          el.style.backgroundColor  = 'rgba(58, 53, 65, 0.08)';
        });

        const DEFAULT_AGENTS: HTMLElement = document.getElementById("AGENTE_"+groupsAndAgents[i].id) as HTMLElement
        DEFAULT_AGENTS.style.backgroundColor  = '#FFF';
        
      }catch (error) {
    
      }
      
    }

    try{
      const CHIPS = document.getElementsByClassName("CHIP_"+row_id);
      Array.prototype.forEach.call(CHIPS, function(el: HTMLElement) {
        // Do stuff here
        el.style.backgroundColor  = 'orange';
      });

      const AGENTE_FILA: HTMLElement = document.getElementById("AGENTE_"+row_id) as HTMLElement
      AGENTE_FILA.style.backgroundColor  = 'orange';
    }catch (error) {
  
    }
  }

  const [openInfoAgent, setOpenInfoAgent] = React.useState(false);

  const [valuesInfoInfoAgent, setValuesInfoInfoAgent] = useState<InfoElementDialog>({
    dialog_title: '',
    available: '',
    rules_day: '',
    rules_hour: '',
    rules_hour_from: '',
    rules_hour_to: '',
    vacaciones: '',
    dias_no_disponible: '',


  })

  const handleClickOpenInfoAgent = () => {
    setOpenInfoAgent(true);
  };

  const handleCloseInfoAgent = () => {
    setOpenInfoAgent(false);
  };

  function ver_info_agente(row_id){
    

    for (let i = 0; i < groupsAndAgents.length; i++) {
      try{

        if(row_id==groupsAndAgents[i].id){

      
          
          valuesInfoInfoAgent.dialog_title  = ""+groupsAndAgents[i].agents+"";

          if(groupsAndAgents[i].available){
            valuesInfoInfoAgent.available  = "Sí";
          }else{
            valuesInfoInfoAgent.available  = "No";

          }
          valuesInfoInfoAgent.rules_day  = groupsAndAgents[i].rules_day;
          valuesInfoInfoAgent.rules_hour  = groupsAndAgents[i].rules_hour;
          valuesInfoInfoAgent.rules_hour_from  = groupsAndAgents[i].rules_hour_from;
          valuesInfoInfoAgent.rules_hour_to  = groupsAndAgents[i].rules_hour_to;
          if(groupsAndAgents[i].vacaciones==1){
            valuesInfoInfoAgent.vacaciones  = "Sí";
          }else{
            valuesInfoInfoAgent.vacaciones  = "No";

          }
          if(groupsAndAgents[i].dias_no_disponible==1){
            valuesInfoInfoAgent.dias_no_disponible  = "Sí";
          }else{
            valuesInfoInfoAgent.dias_no_disponible  = "No";

          }


        }
        
        
      }catch (error) {
        //
    
      }
      
    }

    handleClickOpenInfoAgent();
  }

  if(valuesPlanificationData.shifts_1.length==0){
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_1, 1);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_2, 2);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_3, 3);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_4, 4);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_5, 5);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_6, 6);
    validar_fecha_feriado_turno(valuesPlanificationData.date_day_7, 7);

    
  }

  

  validar_usuarios_descansan();



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
            Actualizar Planificación de Horario
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            

          <Dialog
              open={openHExtras}
              onClose={handleCloseHExtras}
            >
              <DialogTitle>Nueva Horas Extras</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Grid item xs={12} style={{ display: valuesNewHorasExtras.showDelete ? undefined : 'none' }}>
                    <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => eliminar_hextras(valuesNewHorasExtras.hextras_agent_id_delete, valuesNewHorasExtras.day)}>
                      Eliminar
                    </Button>
                  </Grid>
                  <form onSubmit={handleSubmitHExtras}>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                          <InputLabel>Agente</InputLabel>
                          <Select 
                            value = {valuesNewHorasExtras.hextras_agent_id}
                            id='hextras_agent_id'
                            onChange={handleChangeValueHExtras('hextras_agent_id')}
                            fullWidth
                            
                          >
                          {groupsAndAgents.map(row => (
                            <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>

                            ))}
                        </Select>
                        </Grid>
                      <Grid item xs={12}>
                        <InputLabel >Fecha</InputLabel>
                        <OutlinedInput
                          value={valuesNewHorasExtras.hextras_date}
                          id='hextras_date'
                          onChange={handleChangeValueHExtras('hextras_date')}
                          type='date'
                          fullWidth
                          
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <InputLabel >Turno</InputLabel>
                        <Select 
                          value = {valuesNewHorasExtras.hextras_shift_id}
                          id='hextras_shift_id'
                          onChange={handleChangeValueHExtras('hextras_shift_id')}
                          fullWidth
                        >
                          <MenuItem key={0} value={0}>Seleccione un Turno</MenuItem>
                          {valuesPlanificationData.shifts_hextras.length > 0 ? (

                            valuesPlanificationData.shifts_hextras.map((row) => (
                              <MenuItem key={row.id} value={row.id}>{row.name} - {row.time_from} - {row.time_to}</MenuItem>

                            ))

                            ):(

                              <MenuItem key={0} value={0}></MenuItem>

                            )}

                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                          <InputLabel >Hora desde</InputLabel>
                          <OutlinedInput
                            value={valuesNewHorasExtras.hextras_hour_from}
                            id='hextras_hour_from'
                            onChange={handleChangeValueHExtras('hextras_hour_from')}
                            type='time'
                            fullWidth
                          />
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel >Hora Hasta</InputLabel>
                        <OutlinedInput
                          value={valuesNewHorasExtras.hextras_hour_to}
                          id='hextras_hour_to'
                          onChange={handleChangeValueHExtras('hextras_hour_to')}
                          type='time'
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                          <InputLabel >Minutos Almuerzo</InputLabel>
                          <OutlinedInput
                            value={valuesNewHorasExtras.hextras_lunch_time}
                            id='hextras_lunch_time'
                            onChange={handleChangeValueHExtras('hextras_lunch_time')}
                            type='number'
                            fullWidth
                            required
                          />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel>Observaciones</InputLabel>
                        <OutlinedInput
                          value={valuesNewHorasExtras.hextras_observations}
                          inputProps={{ maxLength: 2000 }}
                          id='hextras_observations'
                          onChange={handleChangeValueHExtras('hextras_observations')}
                          type='text'
                          fullWidth
                          multiline
                          minRows={3}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button type='submit' variant='contained' size='large'>
                          Agregar
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                
                
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseHExtras}>Cerrar</Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openHSuplem}
              onClose={handleCloseHSuplem}
            >
              <DialogTitle>Nueva Horas Suplementarias</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Grid item xs={12} style={{ display: valuesNewHorasSuplem.showDelete ? undefined : 'none' }}>
                    <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => eliminar_hsuplem(valuesNewHorasSuplem.hsuplem_agent_id_delete, valuesNewHorasSuplem.day)}>
                      Eliminar
                    </Button>
                  </Grid>
                  <form onSubmit={handleSubmitHSuplem}>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                          <InputLabel>Agente</InputLabel>
                          <Select 
                            value = {valuesNewHorasSuplem.hsuplem_agent_id}
                            id='hsuplem_agent_id'
                            onChange={handleChangeValueHSuplem('hsuplem_agent_id')}
                            fullWidth
                            
                          >
                          {groupsAndAgents.map(row => (
                            <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>

                            ))}
                        </Select>
                        </Grid>
                      <Grid item xs={12}>
                        <InputLabel >Fecha</InputLabel>
                        <OutlinedInput
                          value={valuesNewHorasSuplem.hsuplem_date}
                          id='hsuplem_date'
                          onChange={handleChangeValueHSuplem('hsuplem_date')}
                          type='date'
                          fullWidth
                          
                        />
                      </Grid>
                      <Grid item xs={12}>
                          <InputLabel >Hora desde</InputLabel>
                          <OutlinedInput
                            value={valuesNewHorasSuplem.hsuplem_hour_from}
                            id='hsuplem_hour_from'
                            onChange={handleChangeValueHSuplem('hsuplem_hour_from')}
                            type='time'
                            fullWidth
                          />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel >Hora Hasta</InputLabel>
                        <OutlinedInput
                          value={valuesNewHorasSuplem.hsuplem_hour_to}
                          id='hsuplem_hour_to'
                          onChange={handleChangeValueHSuplem('hsuplem_hour_to')}
                          type='time'
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel>Observaciones</InputLabel>
                        <OutlinedInput
                          value={valuesNewHorasSuplem.hsuplem_observations}
                          inputProps={{ maxLength: 2000 }}
                          id='hsuplem_observations'
                          onChange={handleChangeValueHSuplem('hsuplem_observations')}
                          type='text'
                          fullWidth
                          multiline
                          minRows={3}
                        />
                      </Grid>
                    
                      <Grid item xs={12}>
                        <Button type='submit' variant='contained' size='large'>
                          Agregar
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                
                
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseHSuplem}>Cerrar</Button>
              </DialogActions>
            </Dialog>
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
            <Dialog
              open={openModalMaxHExtra}
              onClose={handleCloseModalMaxHExtra}
            >
              <DialogTitle>Alerta</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Grid item xs={12}>
                    <div>{valuesInfoDialogText.dialog_title}</div>
                    <br />
                    <Button onClick={aceptarMaxHExtra}>Marcar como Horas Extras</Button>
                    
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModalMaxHExtra}>Cerrar</Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openInfoAgent}
              onClose={handleCloseInfoAgent}
            >
              <DialogTitle>Características del agente</DialogTitle>
              <DialogContent>
                <DialogContentText>
                <Grid item xs={12}>
                  <InputLabel ><strong>Agente:</strong></InputLabel>
                  {valuesInfoInfoAgent.dialog_title}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel ><strong>Disponible:</strong></InputLabel>
                  {valuesInfoInfoAgent.available}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel ><strong>Reglas del día:</strong></InputLabel>
                  {valuesInfoInfoAgent.rules_day}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel ><strong>Reglas de Hora:</strong></InputLabel>
                  {valuesInfoInfoAgent.rules_hour}
                  <br />
                  {valuesInfoInfoAgent.rules_hour_from} - {valuesInfoInfoAgent.rules_hour_to}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel ><strong>Vacaciones:</strong></InputLabel>
                  {valuesInfoInfoAgent.vacaciones}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel ><strong>Usuario no disponible por Rango de Fecha:</strong> </InputLabel>
                  {valuesInfoInfoAgent.dias_no_disponible}
                </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseInfoAgent}>Cerrar</Button>
              </DialogActions>
            </Dialog>

            <form onSubmit={handleSubmitElementSchedule}>
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <InputLabel>Código Interno</InputLabel>
                  <OutlinedInput
                    value={values.internal_code}
                    id='internal_code'
                    onChange={handleChange('internal_code')}
                    type='text'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={2} style={{display: 'none'}}>
                  <InputLabel>Final</InputLabel>
                  <Select 
                    value = {values.production}
                    id='production'
                    onChange={handleChange('production')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={2} hidden>
                  <InputLabel>Planificado</InputLabel>
                  <Select 
                    value = {values.planificado}
                    id='planificado'
                    onChange={handleChange('planificado')}
                    fullWidth
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={4} hidden>
                  <InputLabel >Cargar Datos de Horario Anterior</InputLabel>
                  <Select 
                    
                    value = {values.schedule_anterior_cargar}
                    id='schedule_anterior_cargar'
                    onChange={handleChange('schedule_anterior_cargar')}
                    fullWidth
                    required
                  >
                    {schedules_anterior.length > 0 ? (

                      schedules_anterior.map((row) => (
                        <MenuItem key={row.id} value={row.id}>{row.internal_code} Planificado: {row.planificado} | Final: {row.production} </MenuItem>

                      ))

                      ):(

                        <MenuItem key={0} value={0}></MenuItem>

                      )}

                  </Select>
                  <Button component='a' variant="outlined" onClick={cargarDatosDeVeladaAnterior} sx={{ px: 5.5 }}>
                    Cargar
                  </Button> 
                  
                </Grid>
                <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>

                      <TableRow>
                        <TableCell>Agentes</TableCell>
                        <TableCell colSpan={2}>
                          <b>LUNES</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_1}
                            id='date_day_1'
                            onChange={handleChangePlanification('date_day_1')}
                            type='date'
                            required
                            readOnly
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <b>Martes</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_2}
                            id='date_day_2'
                            onChange={handleChangePlanification('date_day_2')}
                            type='date'
                            required
                            readOnly
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <b>Miércoles</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_3}
                            id='date_day_3'
                            onChange={handleChangePlanification('date_day_3')}
                            type='date'
                            required
                            readOnly
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <b>Jueves</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_4}
                            id='date_day_4'
                            onChange={handleChangePlanification('date_day_4')}
                            type='date'
                            required
                            readOnly
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <b>Viernes</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_5}
                            id='date_day_5'
                            onChange={handleChangePlanification('date_day_5')}
                            type='date'
                            required
                            readOnly
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <b>Sábado</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_6}
                            id='date_day_6'
                            onChange={handleChangePlanification('date_day_6')}
                            type='date'
                            required
                            readOnly
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <b>Domingo</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_7}
                            id='date_day_7'
                            onChange={handleChangePlanification('date_day_7')}
                            type='date'
                            required
                            readOnly
                          />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {valuesPlanificationData.groupsAndAgents.sort((a,b) =>  a.order - b.order).map(row => (
                                
                                
                      <TableRow key={row.id}  id={"AGENTE_"+row.id}>
                      <TableCell>
                        <Button variant="outlined"  onClick={e => ver_info_agente(row.id)} sx={{ px: 5.5 }}>
                          {row.name}
                          <br />
                          {row.agents}
                        </Button>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Select 
                          value = {row.monday_selected}
                          id={row.id+"_shift_1"}
                          onChange={handleChangeTurnos(row.id, 'monday_selected',1 , row.id+'_shift_1')}
                          fullWidth
                          required
                        >
                          <MenuItem key={0} value={0}>--VACIO--</MenuItem>
                          {
                          valuesPlanificationData.shifts_1.map((rowSHIFT) => (
                              <MenuItem key={rowSHIFT.id} value={rowSHIFT.id}>{rowSHIFT.name} - {rowSHIFT.time_from} - {rowSHIFT.time_to}</MenuItem>

                            ))
                            }

                        </Select>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Select 
                          value = {row.tuesday_selected}
                          id={row.id+"_shift_2"}
                          onChange={handleChangeTurnos(row.id, 'tuesday_selected',2 , row.id+'_shift_2')}
                          fullWidth
                          required
                        >
                          <MenuItem key={0} value={0}>--VACIO--</MenuItem>
                          {valuesPlanificationData.shifts_2.map((rowSHIFT) => (
                              <MenuItem key={rowSHIFT.id} value={rowSHIFT.id}>{rowSHIFT.name} - {rowSHIFT.time_from} - {rowSHIFT.time_to}</MenuItem>

                            ))}

                        </Select>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Select 
                          value = {row.wednesday_selected}
                          id={row.id+"_shift_3"}
                          onChange={handleChangeTurnos(row.id, 'wednesday_selected',3 , row.id+'_shift_3')}
                          fullWidth
                          required
                        >
                          <MenuItem key={0} value={0}>--VACIO--</MenuItem>
                          {valuesPlanificationData.shifts_3.map((rowSHIFT) => (
                            <MenuItem key={rowSHIFT.id} value={rowSHIFT.id}>{rowSHIFT.name} - {rowSHIFT.time_from} - {rowSHIFT.time_to}</MenuItem>

                          ))}

                        </Select>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Select 
                          value = {row.thursday_selected}
                          id={row.id+"_shift_4"}
                          onChange={handleChangeTurnos(row.id, 'thursday_selected',4 , row.id+'_shift_4')}
                          fullWidth
                          required
                        >
                          <MenuItem key={0} value={0}>--VACIO--</MenuItem>
                          {valuesPlanificationData.shifts_4.map((rowSHIFT) => (
                            <MenuItem key={rowSHIFT.id} value={rowSHIFT.id}>{rowSHIFT.name} - {rowSHIFT.time_from} - {rowSHIFT.time_to}</MenuItem>

                          ))}

                        </Select>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Select 
                          value = {row.friday_selected}
                          id={row.id+"_shift_5"}
                          onChange={handleChangeTurnos(row.id, 'friday_selected',5 , row.id+'_shift_5')}
                          fullWidth
                          required
                        >
                          <MenuItem key={0} value={0}>--VACIO--</MenuItem>
                          {valuesPlanificationData.shifts_5.map((rowSHIFT) => (
                            <MenuItem key={rowSHIFT.id} value={rowSHIFT.id}>{rowSHIFT.name} - {rowSHIFT.time_from} - {rowSHIFT.time_to}</MenuItem>

                          ))}

                        </Select>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Select 
                          value = {row.saturday_selected}
                          id={row.id+"_shift_6"}
                          onChange={handleChangeTurnos(row.id, 'saturday_selected',6 , row.id+'_shift_6')}
                          fullWidth
                          required
                        >
                          <MenuItem key={0} value={0}>--VACIO--</MenuItem>
                          {valuesPlanificationData.shifts_6.map((rowSHIFT) => (
                            <MenuItem key={rowSHIFT.id} value={rowSHIFT.id}>{rowSHIFT.name} - {rowSHIFT.time_from} - {rowSHIFT.time_to}</MenuItem>

                          ))}

                        </Select>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Select 
                          value = {row.sunday_selected}
                          id={row.id+"_shift_7"}
                          onChange={handleChangeTurnos(row.id, 'sunday_selected' ,7, row.id+'_shift_7')}
                          fullWidth
                          required
                        >
                          <MenuItem key={0} value={0}>--VACIO--</MenuItem>
                          {valuesPlanificationData.shifts_7.map((rowSHIFT) => (
                            <MenuItem key={rowSHIFT.id} value={rowSHIFT.id}>{rowSHIFT.name} - {rowSHIFT.time_from} - {rowSHIFT.time_to}</MenuItem>

                          ))}

                        </Select>
                      </TableCell>


                    </TableRow>
                        
                    
                    
                    ))}
                    <TableRow>
                        <TableCell>DESCANSAN</TableCell>
                        <TableCell colSpan={2}>
                          <Select 
                            fullWidth
                            multiple
                            id={"agents_descansa_1"}
                            value={valuesPlanificationData.agents_descansa_1}
                            onChange={handleChangeDescansan( 'agents_descansa_1', 1 ,'agents_descansa_1')}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  groupsAndAgents.map(rowElement => (

                                    rowElement.id == value &&
                                    <Chip className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                    ))
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            >

                          </Select>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Select 
                            fullWidth
                            multiple
                            id={"agents_descansa_2"}
                            value={valuesPlanificationData.agents_descansa_2}
                            onChange={handleChangeDescansan( 'agents_descansa_2', 2 ,'agents_descansa_2')}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  groupsAndAgents.map(rowElement => (

                                    rowElement.id == value &&
                                    <Chip className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                    ))
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            >

                          </Select>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Select 
                            fullWidth
                            multiple
                            id={"agents_descansa_3"}
                            value={valuesPlanificationData.agents_descansa_3}
                            onChange={handleChangeDescansan( 'agents_descansa_3', 3 ,'agents_descansa_3')}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  groupsAndAgents.map(rowElement => (

                                    rowElement.id == value &&
                                    <Chip className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                    ))
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            >

                          </Select>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Select 
                            fullWidth
                            multiple
                            id={"agents_descansa_4"}
                            value={valuesPlanificationData.agents_descansa_4}
                            onChange={handleChangeDescansan( 'agents_descansa_4', 4 ,'agents_descansa_4')}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  groupsAndAgents.map(rowElement => (

                                    rowElement.id == value &&
                                    <Chip className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                    ))
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            >

                          </Select>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Select 
                            fullWidth
                            multiple
                            id={"agents_descansa_5"}
                            value={valuesPlanificationData.agents_descansa_5}
                            onChange={handleChangeDescansan( 'agents_descansa_5', 5 ,'agents_descansa_5')}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  groupsAndAgents.map(rowElement => (

                                    rowElement.id == value &&
                                    <Chip className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                    ))
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            >

                          </Select>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Select 
                            fullWidth
                            multiple
                            id={"agents_descansa_6"}
                            value={valuesPlanificationData.agents_descansa_6}
                            onChange={handleChangeDescansan( 'agents_descansa_6', 6 ,'agents_descansa_6')}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  groupsAndAgents.map(rowElement => (

                                    rowElement.id == value &&
                                    <Chip className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                    ))
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            >

                          </Select>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Select 
                            fullWidth
                            multiple
                            id={"agents_descansa_7"}
                            value={valuesPlanificationData.agents_descansa_7}
                            onChange={handleChangeDescansan( 'agents_descansa_7', 7 ,'agents_descansa_7')}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  groupsAndAgents.map(rowElement => (

                                    rowElement.id == value &&
                                    <Chip className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                    ))
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            >

                          </Select>

                        </TableCell>

                      </TableRow>
                      <TableRow>
                        <TableCell># TRABAJAN</TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.date_day_1_total_trabajan}

                        </TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.date_day_2_total_trabajan}

                        </TableCell>
                        <TableCell colSpan={2}>
                          {valuesPlanificationData.date_day_3_total_trabajan}

                        </TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.date_day_4_total_trabajan}

                        </TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.date_day_5_total_trabajan}

                        </TableCell>
                        
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.date_day_6_total_trabajan}

                        </TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.date_day_7_total_trabajan}

                        </TableCell>

                      </TableRow>
                      <TableRow>
                        <TableCell># DESCANSAN</TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.agents_descansa_1.length}

                        </TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.agents_descansa_2.length}

                        </TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.agents_descansa_3.length}

                        </TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.agents_descansa_4.length}

                        </TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.agents_descansa_5.length}

                        </TableCell>
                        
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.agents_descansa_6.length}

                        </TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.agents_descansa_7.length}

                        </TableCell>

                      </TableRow>
                      <TableRow>
                        <TableCell>H. SUPLEMENTARIAS</TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hsuplem(valuesPlanificationData.date_day_1)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hsuplem(valuesPlanificationData.date_day_1)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hsuplementarias_1.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 1)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hsuplem(valuesPlanificationData.date_day_2)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hsuplem(valuesPlanificationData.date_day_2)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hsuplementarias_2.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 2)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hsuplem(valuesPlanificationData.date_day_3)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hsuplem(valuesPlanificationData.date_day_3)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hsuplementarias_3.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 3)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hsuplem(valuesPlanificationData.date_day_4)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hsuplem(valuesPlanificationData.date_day_4)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hsuplementarias_4.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 4)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hsuplem(valuesPlanificationData.date_day_5)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hsuplem(valuesPlanificationData.date_day_5)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hsuplementarias_5.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 5)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hsuplem(valuesPlanificationData.date_day_6)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hsuplem(valuesPlanificationData.date_day_6)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hsuplementarias_6.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 6)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hsuplem(valuesPlanificationData.date_day_7)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hsuplem(valuesPlanificationData.date_day_7)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hsuplementarias_7.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 7)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>

                      </TableRow>
                      <TableRow>
                        <TableCell>H. EXTRAS</TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hextras(valuesPlanificationData.date_day_1,1)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hextras(valuesPlanificationData.date_day_1)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hextras_1.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 1)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>
                          

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hextras(valuesPlanificationData.date_day_2,2)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hextras(valuesPlanificationData.date_day_2)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hextras_2.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 2)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hextras(valuesPlanificationData.date_day_3,3)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hextras(valuesPlanificationData.date_day_3)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hextras_3.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 3)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hextras(valuesPlanificationData.date_day_4,4)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hextras(valuesPlanificationData.date_day_4)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hextras_4.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 4)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hextras(valuesPlanificationData.date_day_5,5)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hextras(valuesPlanificationData.date_day_5)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hextras_5.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 5)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hextras(valuesPlanificationData.date_day_6,6)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hextras(valuesPlanificationData.date_day_6)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hextras_6.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 6)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={2}>
                          <Button size='small' variant='contained' style={{background: '#28a745', color: 'white'}} onClick={e => modal_add_hextras(valuesPlanificationData.date_day_7,7)}>
                            +
                          </Button>
                          &nbsp;
                          <Button size='small' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={e => clear_add_hextras(valuesPlanificationData.date_day_7)}>
                            Clear
                          </Button>
                          <br />
                          <br />
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {valuesPlanificationData.agents_hextras_7.map((value) => (
                              groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 7)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>

                      </TableRow>
                      
                                       
                    </TableBody>
                  </Table>
                </TableContainer>

                
                <Grid item xs={12}>
                  <Grid item xs={12}>

                    <Typography variant='h6'>
                      Supervisor Nacional
                    </Typography>

                    <Select 
                      value = {values.coordinator}
                      id='coordinator'
                      onChange={handleChange('coordinator')}
                      fullWidth
                      required
                      
                    >
                      {coordinators.map(row => (
                        <MenuItem key={row.id} value={row.id}>{row.names} {row.surnames}</MenuItem>

                        ))}
                    </Select>
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <Typography variant='h6'>
                      Líderes
                    </Typography>
                    <TableContainer >
                      <Table  aria-label='simple table'>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>Sábado</TableCell>
                          <TableCell>Domingo</TableCell>
                        </TableRow>
                        {valuesPlanificationData.type_liders.sort((a,b) => a.order - b.order)
                          .map((rowLider) => {
                            return (
                              <TableRow key={rowLider.id}>
                                <TableCell>{rowLider.name}</TableCell>
                                <TableCell>
                                  <Grid>
                                    <Select 
                                      value = {rowLider.groups_and_agent_id_6}
                                      id= {rowLider.id+'_6'}
                                      onChange={handleChangePlanificationLiders(rowLider.id, 'groups_and_agent_id_6', rowLider.id+'_6')}
                                      fullWidth
                                    >
                                      {groupsAndAgents.map(row => (
                                      <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>

                                      ))}
                                    </Select>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid>
                                    <Select 
                                      value = {rowLider.groups_and_agent_id_7}
                                      id= {rowLider.id+'_7'}
                                      onChange={handleChangePlanificationLiders(rowLider.id, 'groups_and_agent_id_7', rowLider.id+'_7')}
                                      fullWidth
                                    >
                                      {groupsAndAgents.map(row => (
                                      <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>

                                      ))}
                                    </Select>
                                  </Grid>
                                </TableCell>
                                  

                              </TableRow>
                                      
                                      
                              
                            );
                          })}
                        
                 
                      </Table>
                    </TableContainer>
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <Typography variant='h6'>
                      StandBy
                    </Typography>
                    <TableContainer >
                      <Table  aria-label='simple table'>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>Sábado</TableCell>
                          <TableCell>Domingo</TableCell>
                        </TableRow>
                        {valuesPlanificationData.type_standbies.sort((a,b) => a.order - b.order)
                          .map((rowStandBy) => {
                            return (
                              <TableRow key={rowStandBy.id}>
                                <TableCell>{rowStandBy.name}</TableCell>
                                <TableCell>
                                  <Grid>
                                    <Select 
                                      value = {rowStandBy.groups_and_agent_id_6}
                                      id= {rowStandBy.id+'_6'}
                                      onChange={handleChangePlanificationStandBy(rowStandBy.id, 'groups_and_agent_id_6', rowStandBy.id+'_6')}
                                      fullWidth
                                    >
                                      {groupsAndAgents.map(row => (
                                      <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>

                                      ))}
                                    </Select>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid>
                                    <Select 
                                      value = {rowStandBy.groups_and_agent_id_7}
                                      id= {rowStandBy.id+'_7'}
                                      onChange={handleChangePlanificationStandBy(rowStandBy.id, 'groups_and_agent_id_7', rowStandBy.id+'_7')}
                                      fullWidth
                                    >
                                      {groupsAndAgents.map(row => (
                                      <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>

                                      ))}
                                    </Select>
                                  </Grid>
                                </TableCell>
                                  

                              </TableRow>
                                      
                                      
                              
                            );
                          })}
                        
                 
                      </Table>
                    </TableContainer>
                  </Grid>

                  
                </Grid>
                
                
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' size='large'>
                    Actualizar HORARIO
                  </Button>
                  <br />
                  <br />
                </Grid>
              </Grid>
            </form>
            <Grid item xs={12}>
              <Typography variant='h5'>
                Vacaciones:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Card> 
              <TableContainer sx={{ maxHeight: 650 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow >
                      <TableCell>Fecha Desde</TableCell>
                      <TableCell>Fecha Hasta</TableCell>
                      <TableCell>N° días anteriores para Recordatorio</TableCell>
                      <TableCell>Agente</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vacationAgents
                      .map((row) => {
                        return (
                          <TableRow key={row.id}>
                            <TableCell>{row.date_from}</TableCell>
                            <TableCell>{row.date_to}</TableCell>
                            <TableCell>{row.days_before_to_remind}</TableCell>
                            <TableCell>{row.agents}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              </Card>
            </Grid>
            <br />
            <br />
            <Grid item xs={12}>
              <Typography variant='h5'>
                Días No Disponibles por Agente:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Card> 
              <TableContainer sx={{ maxHeight: 650 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow >
                      <TableCell>Fecha Desde</TableCell>
                      <TableCell>Fecha Hasta</TableCell>
                      <TableCell>Agente</TableCell>
                      <TableCell>Observaciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {unavailableDateAgents
                      .map((row) => {
                        return (
                          <TableRow key={row.id}>
                            <TableCell>{row.date_from}</TableCell>
                            <TableCell>{row.date_to}</TableCell>
                            <TableCell>{row.agents}</TableCell>
                            <TableCell>{row.observations}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              </Card>
            </Grid>
           
          </CardContent>
        </Card>
        </Grid>
       
      </Grid>
    </DatePickerWrapper>
  )
}

export const getServerSideProps = async (context) => {

  const site_id_logueado = getCookie('site_id', context);

  const schedules_day_descansos: SchedulesDayData[]=[];
  const schedules_day_hextras: SchedulesDayData[]=[];
  const schedules_day_hsuplementarias: SchedulesDayData[]=[];
  const schedules_day_leaders: SchedulesDayData[]=[];
  const schedules_day_standbies: SchedulesDayData[]=[];
  const schedules_day_turns: SchedulesDayData[]=[];


  const resScheduleAnterior = await fetch(StrapiUrl+"schedules?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=date_from%3Adesc");
  const responseScheduleAnterior = await resScheduleAnterior.json();
  const schedules_anterior: ScheduleListData[]=[];

  try {

      for (let i = 0; i < responseScheduleAnterior.data.length; i++) {

        const row =       responseScheduleAnterior.data[i];
        //console.log(row);

        let planificado_value = 'No';
        let production_value = 'No';
        

        try {
          if(row.attributes.production){
            production_value = 'Sí';
          }
        } catch (error) {
          
        }

        try {
          if(row.attributes.planificado){
            planificado_value = 'Sí';
          }
        } catch (error) {
          
        }

        

        

        schedules_anterior.push(
            {
              id: row.id,
              date_from: row.attributes.date_from,
              date_to: row.attributes.date_to,
              internal_code: row.attributes.internal_code,
              observations: row.attributes.observations,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt,
              production: production_value,
              planificado: planificado_value

            }
          );
      }
    
    
    

  } catch (ex) {
    
  }

  /********** COORDINATORS ******* */
  const resCoordinators = await fetch(StrapiUrl+"coordinators?populate=%2A&filters[deleted][$not]=true");
  const responseCoordinators = await resCoordinators.json();
  const coordinators: CoordinatorData[]=[];

  const { id } = context.query;
  const resSchedule = await fetch(StrapiUrl+"schedules/"+id+"?populate=%2A");
  const responseSchedule = await resSchedule.json();
  //console.log(responseSchedule.data);

  const resScheduleDayDescansos = await fetch(StrapiUrl+"schedules-day-descansos?populate=%2A&filters[schedule][id]="+id);
  const responseScheduleDayDescansos = await resScheduleDayDescansos.json();
  for (let i = 0; i < responseScheduleDayDescansos.data.length; i++) {
    const row =       responseScheduleDayDescansos.data[i];

    schedules_day_descansos.push({
      id: row.id
    });

  }

  const resScheduleDayHSuplem = await fetch(StrapiUrl+"schedules-day-hsuplementarias?populate=%2A&filters[schedule][id]="+id);
  const responseScheduleDayHSuplem = await resScheduleDayHSuplem.json();
  for (let i = 0; i < responseScheduleDayHSuplem.data.length; i++) {
    const row =       responseScheduleDayHSuplem.data[i];

    schedules_day_hsuplementarias.push({
      id: row.id
    });

  }

  const resScheduleDayHExtras = await fetch(StrapiUrl+"schedules-day-hextras?populate=%2A&filters[schedule][id]="+id);
  const responseScheduleDayHExtras = await resScheduleDayHExtras.json();
  for (let i = 0; i < responseScheduleDayHExtras.data.length; i++) {
    const row =       responseScheduleDayHExtras.data[i];

    schedules_day_hextras.push({
      id: row.id
    });

  }

  const resScheduleDayLeaders = await fetch(StrapiUrl+"schedules-day-leaders?populate=%2A&filters[schedule][id]="+id);
  const responseScheduleDayLeaders= await resScheduleDayLeaders.json();
  for (let i = 0; i < responseScheduleDayLeaders.data.length; i++) {
    const row =       responseScheduleDayLeaders.data[i];

    schedules_day_leaders.push({
      id: row.id
    });

  }


  const resScheduleDayStandbies = await fetch(StrapiUrl+"schedules-day-standbies?populate=%2A&filters[schedule][id]="+id);
  const responseScheduleDayStandbies= await resScheduleDayStandbies.json();
  for (let i = 0; i < responseScheduleDayStandbies.data.length; i++) {
    const row =       responseScheduleDayStandbies.data[i];

    schedules_day_standbies.push({
      id: row.id
    });

  }

  const resScheduleDayTurns = await fetch(StrapiUrl+"schedules-day-turns?populate=%2A&filters[schedule][id]="+id);
  const responseScheduleDayTurns = await resScheduleDayTurns.json();
  for (let i = 0; i < responseScheduleDayTurns.data.length; i++) {
    const row =       responseScheduleDayTurns.data[i];

    schedules_day_turns.push({
      id: row.id
    });

  }

  try {

      for (let i = 0; i < responseCoordinators.data.length; i++) {

        const row =       responseCoordinators.data[i];
        //console.log(row);

    
        coordinators.push(
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
              publishedAt: row.attributes.publishedAt

            }
          );
      }
    
    
    

  } catch (ex) {
    
  }

  
  const resLiders = await fetch(StrapiUrl+"tipo-liders?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responseLiders = await resLiders.json();
  const type_liders: TypeLiderData[]=[];

  try {

      for (let i = 0; i < responseLiders.data.length; i++) {

        const row =       responseLiders.data[i];
        //console.log(row);
    
        type_liders.push(
            {
              id: row.id,
              groups_and_agent_id_6: 0,
              groups_and_agent_id_7: 0,

              name: row.attributes.name,
              order: row.attributes.order,
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

  const resStandbies = await fetch(StrapiUrl+"tipo-standbies?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const responseStandbies = await resStandbies.json();
  const type_standbies: TypeStandbyData[]=[];

  try {

      for (let i = 0; i < responseStandbies.data.length; i++) {

        const row =       responseStandbies.data[i];
        //console.log(row);
    
        type_standbies.push(
            {
              id: row.id,
              groups_and_agent_id_6: 0,
              groups_and_agent_id_7: 0,
              name: row.attributes.name,
              order: row.attributes.order,
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

  const resDescansoGrupo = await fetch(StrapiUrl+"group-and-grouped-day?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=order%3Aasc");
  const responseDescansoGrupo  = await resDescansoGrupo .json();
  const descansoPorGrupoData: DescansoPorGrupoData[]=[];


  

  try {

      for (let i = 0; i < responseDescansoGrupo.data.length; i++) {

        const row =       responseDescansoGrupo.data[i];
        //console.log(row);

        let group_id = 0;
        try{
          group_id = row.attributes.group.data.id;
        }catch (error) {
    
        }
    
    
        descansoPorGrupoData.push(
          {
            id: row.id,
            group_id: group_id,
            order: row.attributes.order,
            createdAt: row.attributes.createdAt,
            updatedAt: row.attributes.updatedAt,
            publishedAt: row.attributes.publishedAt,
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

  const resGroups = await fetch(StrapiUrl+"groups?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=order%3Aasc");
  const responseGroups = await resGroups.json();
  const groups: GroupData[]=[];




  try {

      for (let i = 0; i < responseGroups.data.length; i++) {

        const row =       responseGroups.data[i];
        //console.log(row);

        const descansoPorGrupoDataRow: DescansoPorGrupoData[]=[];

        for (let i2 = 0; i2 < descansoPorGrupoData.length; i2++) {

          if(descansoPorGrupoData[i2].group_id==row.id){
            descansoPorGrupoDataRow.push(descansoPorGrupoData[i2]);

          }



        }


    
        groups.push(
          {
            id: row.id,
            descansos_por_dia: descansoPorGrupoDataRow,
            name: row.attributes.name,
            order: row.attributes.order,
            internal_code: row.attributes.internal_code,
            observations: row.attributes.observations,
            createdAt: row.attributes.createdAt,
            updatedAt: row.attributes.updatedAt,
            publishedAt: row.attributes.publishedAt,
            max_agents: row.attributes.max_agents,
            area: row.attributes.area.data.attributes.name,
            monday: row.attributes.monday,
            tuesday: row.attributes.tuesday,
            wednesday: row.attributes.wednesday,
            thursday: row.attributes.thursday,
            friday: row.attributes.friday,
            saturday: row.attributes.saturday,
            sunday: row.attributes.sunday,
            monday_order: row.attributes.monday_order,
            tuesday_order: row.attributes.tuesday_order,
            wednesday_order: row.attributes.wednesday_order,
            thursday_order: row.attributes.thursday_order,
            friday_order: row.attributes.friday_order,
            saturday_order: row.attributes.saturday_order,
            sunday_order: row.attributes.sunday_order,


            view_monday_rest: row.attributes.view_monday_rest,
            view_tuesday_rest: row.attributes.view_tuesday_rest,
            view_wednesday_rest: row.attributes.view_wednesday_rest,
            view_thursday_rest: row.attributes.view_thursday_rest,
            view_friday_rest: row.attributes.view_friday_rest,
            view_saturday_rest: row.attributes.view_saturday_rest,
            view_sunday_rest: row.attributes.view_sunday_rest,

          }
        );
      }
    
    
    

  } catch (ex) {
    
  }

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

              monday_selected: 0,
              tuesday_selected: 0,
              wednesday_selected: 0,
              thursday_selected: 0,
              friday_selected: 0,
              saturday_selected: 0,
              sunday_selected: 0,

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



  const res = await fetch(StrapiUrl+"shifts?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=time_from%3Aasc");
  const response = await res.json();
  const shifts: FormDataShifts[]=[];
  const shifts_1: FormDataShiftsPerDay[]=[];
  const shifts_2: FormDataShiftsPerDay[]=[];
  const shifts_3: FormDataShiftsPerDay[]=[];
  const shifts_4: FormDataShiftsPerDay[]=[];
  const shifts_5: FormDataShiftsPerDay[]=[];
  const shifts_6: FormDataShiftsPerDay[]=[];
  const shifts_7: FormDataShiftsPerDay[]=[];
  const selected_groups_agents: any[]=[];
  const agents_descansa_1: number[]=[];

  try {
      

      for (let i = 0; i < response.data.length; i++) {

        const row =       response.data[i];
        //console.log(row);
    
        shifts.push(
            {
              id: row.id,
              name: row.attributes.name,
              holiday: row.attributes.type_of_shift.data.attributes.holiday,
              lunch_time: row.attributes.lunch_time,
              time_from: row.attributes.time_from,
              time_to: row.attributes.time_to,
              observations: row.attributes.observations,
              velada: row.attributes.velada,
              color: row.attributes.color,
              soporte: row.attributes.soporte,
              horas_extras: row.attributes.horas_extras,
              num_agentes_necesarios: row.attributes.num_agentes_necesarios,
              createdAt: row.attributes.createdAt,
              updatedAt: row.attributes.updatedAt,
              publishedAt: row.attributes.publishedAt
            }
          );
          
          
      }
    
    

  } catch (ex) {
    
  }

  
  const agents_descansa_1_value: number[]=[];
  const agents_descansa_2_value: number[]=[];
  const agents_descansa_3_value: number[]=[];
  const agents_descansa_4_value: number[]=[];
  const agents_descansa_5_value: number[]=[];
  const agents_descansa_6_value: number[]=[];
  const agents_descansa_7_value: number[]=[];

  const agents_hsuplementarias_1: FormDataHSuplem[]=[];
  const agents_hsuplementarias_2: FormDataHSuplem[]=[];
  const agents_hsuplementarias_3: FormDataHSuplem[]=[];
  const agents_hsuplementarias_4: FormDataHSuplem[]=[];
  const agents_hsuplementarias_5: FormDataHSuplem[]=[];
  const agents_hsuplementarias_6: FormDataHSuplem[]=[];
  const agents_hsuplementarias_7: FormDataHSuplem[]=[];

  const agents_hextras_1: FormDataHExtra[]=[];
  const agents_hextras_2: FormDataHExtra[]=[];
  const agents_hextras_3: FormDataHExtra[]=[];
  const agents_hextras_4: FormDataHExtra[]=[];
  const agents_hextras_5: FormDataHExtra[]=[];
  const agents_hextras_6: FormDataHExtra[]=[];
  const agents_hextras_7: FormDataHExtra[]=[];

  

  let date_day_1 = '';
  let date_day_2 = '';
  let date_day_3 = '';
  let date_day_4 = '';
  let date_day_5 = '';
  let date_day_6 = '';
  let date_day_7 = '';

  let observations_value = '';
  let internal_code_value = '';
  let production_value = false;
  let planificado_value = true;
  let coordinator_value = 0;

  try {

    observations_value= responseSchedule.data.attributes.observations;
    internal_code_value= responseSchedule.data.attributes.internal_code;
    production_value= responseSchedule.data.attributes.production;
    planificado_value= responseSchedule.data.attributes.planificado;

    coordinator_value= responseSchedule.data.attributes.coordinator.data.id;


  } catch (ex) {
    
  }

  for (let i = 0; i < responseScheduleDayDescansos.data.length; i++) {
    const row =       responseScheduleDayDescansos.data[i];
    const rowGA =       responseScheduleDayDescansos.data[i].attributes.groups_and_agents.data;

    if(date_day_1==''){
      date_day_1 = row.attributes.date;


      for (let i2 = 0; i2 < rowGA.length; i2++) {
        agents_descansa_1_value.push(rowGA[i2].id);
      }

      


    }else if(date_day_2==''){
      date_day_2 = row.attributes.date;
      for (let i2 = 0; i2 < rowGA.length; i2++) {
        agents_descansa_2_value.push(rowGA[i2].id);
      }
    }else if(date_day_3==''){
      date_day_3 = row.attributes.date;
      for (let i2 = 0; i2 < rowGA.length; i2++) {
        agents_descansa_3_value.push(rowGA[i2].id);
      }
    }else if(date_day_4==''){
      date_day_4 = row.attributes.date;
      for (let i2 = 0; i2 < rowGA.length; i2++) {
        agents_descansa_4_value.push(rowGA[i2].id);
      }
    }else if(date_day_5==''){
      date_day_5 = row.attributes.date;
      for (let i2 = 0; i2 < rowGA.length; i2++) {
        agents_descansa_5_value.push(rowGA[i2].id);
      }
    }else if(date_day_6==''){
      date_day_6 = row.attributes.date;
      for (let i2 = 0; i2 < rowGA.length; i2++) {
        agents_descansa_6_value.push(rowGA[i2].id);
      }
    }else if(date_day_7==''){
      date_day_7 = row.attributes.date;
      for (let i2 = 0; i2 < rowGA.length; i2++) {
        agents_descansa_7_value.push(rowGA[i2].id);
      }
    }

  }


  try{
    type_liders.map(tlider => {
      
      for (let k = 0; k < responseScheduleDayLeaders.data.length; k++) {
        const rowk =       responseScheduleDayLeaders.data[k];
    
        if(tlider.id==rowk.attributes.tipo_lider.data.id && rowk.attributes.date == date_day_6){
          tlider.groups_and_agent_id_6 = rowk.attributes.groups_and_agent.data.id ;
        }

        if(tlider.id==rowk.attributes.tipo_lider.data.id && rowk.attributes.date == date_day_7){
          tlider.groups_and_agent_id_7 = rowk.attributes.groups_and_agent.data.id ;
        }
    
      }
    });
  }catch(ex){

  }

  try{
    type_standbies.map(tstanby => {
      
      for (let k = 0; k < responseScheduleDayStandbies.data.length; k++) {
        const rowk =       responseScheduleDayStandbies.data[k];
    
        if(tstanby.id==rowk.attributes.tipo_standby.data.id && rowk.attributes.date == date_day_6){
          tstanby.groups_and_agent_id_6 = rowk.attributes.groups_and_agent.data.id ;
        }

        if(tstanby.id==rowk.attributes.tipo_standby.data.id && rowk.attributes.date == date_day_7){
          tstanby.groups_and_agent_id_7 = rowk.attributes.groups_and_agent.data.id ;
        }
    
      }
    });
  }catch(ex){

  }


  try{
    for (let k = 0; k < responseScheduleDayHExtras.data.length; k++) {
      const rowk =       responseScheduleDayHExtras.data[k];

      let agent_id = 0;
      let shift_id = 0;

      try {
        agent_id = rowk.attributes.groups_and_agent.data.id;
        shift_id = rowk.attributes.shift.data.id;
      } catch (error) {
        
      }
  
      if(rowk.attributes.date == date_day_1){
        agents_hextras_1.push(
          {
            date: rowk.attributes.date,
            lunch_time: rowk.attributes.lunch_time,

            time_from: rowk.attributes.time_from,
            time_to: rowk.attributes.time_to,
            observations: rowk.attributes.observations,
            selected_groups_agents: agent_id,
            shift: shift_id

          }
        );
      }else if(rowk.attributes.date == date_day_2){
        agents_hextras_2.push(
          {
            date: rowk.attributes.date,
            lunch_time: rowk.attributes.lunch_time,
            time_from: rowk.attributes.time_from,
            time_to: rowk.attributes.time_to,
            observations: rowk.attributes.observations,
            selected_groups_agents: agent_id,
            shift: shift_id

          }
        );
      }else if(rowk.attributes.date == date_day_3){
        agents_hextras_3.push(
          {
            date: rowk.attributes.date,
            lunch_time: rowk.attributes.lunch_time,
            time_from: rowk.attributes.time_from,
            time_to: rowk.attributes.time_to,
            observations: rowk.attributes.observations,
            selected_groups_agents: agent_id,
            shift: shift_id

          }
        );
      }else if(rowk.attributes.date == date_day_4){
        agents_hextras_4.push(
          {
            date: rowk.attributes.date,
            lunch_time: rowk.attributes.lunch_time,
            time_from: rowk.attributes.time_from,
            time_to: rowk.attributes.time_to,
            observations: rowk.attributes.observations,
            selected_groups_agents: agent_id,
            shift: shift_id

          }
        );
      }else if(rowk.attributes.date == date_day_5){
        agents_hextras_5.push(
          {
            date: rowk.attributes.date,
            lunch_time: rowk.attributes.lunch_time,
            time_from: rowk.attributes.time_from,
            time_to: rowk.attributes.time_to,
            observations: rowk.attributes.observations,
            selected_groups_agents: agent_id,
            shift: shift_id

          }
        );
      }else if(rowk.attributes.date == date_day_6){
        agents_hextras_6.push(
          {
            date: rowk.attributes.date,
            lunch_time: rowk.attributes.lunch_time,
            time_from: rowk.attributes.time_from,
            time_to: rowk.attributes.time_to,
            observations: rowk.attributes.observations,
            selected_groups_agents: agent_id,
            shift: shift_id

          }
        );
      }else if(rowk.attributes.date == date_day_7){
        agents_hextras_7.push(
          {
            date: rowk.attributes.date,
            lunch_time: rowk.attributes.lunch_time,
            time_from: rowk.attributes.time_from,
            time_to: rowk.attributes.time_to,
            observations: rowk.attributes.observations,
            selected_groups_agents: agent_id,
            shift: shift_id

          }
        );
      }
  
    }
  }catch(ex){

  }

  try{
    for (let k = 0; k < responseScheduleDayHSuplem.data.length; k++) {
      const rowk =       responseScheduleDayHSuplem.data[k];

      let agent_id = 0;

      try {
        agent_id = rowk.attributes.groups_and_agent.data.id;
      } catch (error) {
        
      }

      if(agent_id>0){
        if(rowk.attributes.date == date_day_1){
          agents_hsuplementarias_1.push(
            {
              date: rowk.attributes.date,
              time_from: rowk.attributes.time_from,
              time_to: rowk.attributes.time_to,
              observations: rowk.attributes.observations,
              selected_groups_agents: agent_id
  
            }
          );
        }else if(rowk.attributes.date == date_day_2){
          agents_hsuplementarias_2.push(
            {
              date: rowk.attributes.date,
              time_from: rowk.attributes.time_from,
              time_to: rowk.attributes.time_to,
              observations: rowk.attributes.observations,
              selected_groups_agents: agent_id,
  
            }
          );
        }else if(rowk.attributes.date == date_day_3){
          agents_hsuplementarias_3.push(
            {
              date: rowk.attributes.date,
              time_from: rowk.attributes.time_from,
              time_to: rowk.attributes.time_to,
              observations: rowk.attributes.observations,
              selected_groups_agents: agent_id,
  
            }
          );
        }else if(rowk.attributes.date == date_day_4){
          agents_hsuplementarias_4.push(
            {
              date: rowk.attributes.date,
              time_from: rowk.attributes.time_from,
              time_to: rowk.attributes.time_to,
              observations: rowk.attributes.observations,
              selected_groups_agents: agent_id,
  
            }
          );
        }else if(rowk.attributes.date == date_day_5){
          agents_hsuplementarias_5.push(
            {
              date: rowk.attributes.date,
              time_from: rowk.attributes.time_from,
              time_to: rowk.attributes.time_to,
              observations: rowk.attributes.observations,
              selected_groups_agents: agent_id,
  
            }
          );
        }else if(rowk.attributes.date == date_day_6){
          agents_hsuplementarias_6.push(
            {
              date: rowk.attributes.date,
              time_from: rowk.attributes.time_from,
              time_to: rowk.attributes.time_to,
              observations: rowk.attributes.observations,
              selected_groups_agents: agent_id,
  
            }
          );
        }else if(rowk.attributes.date == date_day_7){
          agents_hsuplementarias_7.push(
            {
              date: rowk.attributes.date,
              time_from: rowk.attributes.time_from,
              time_to: rowk.attributes.time_to,
              observations: rowk.attributes.observations,
              selected_groups_agents: agent_id,
  
            }
          );
        }
      }
  
      
  
    }
  }catch(ex){

  }


  for (let index = 1; index < 8; index++) {

    groupsAndAgents.map(async GROUPAGENT => {
      let field = 'monday_selected';
      let shift_id_selected = 0;

        if(index==1){
          field = 'monday_selected';
        }else if(index==2){
          field = 'tuesday_selected';
        }else if(index==3){
          field = 'wednesday_selected';
        }else if(index==4){
          field = 'thursday_selected';
        }else if(index==5){
          field = 'friday_selected';
        }else if(index==6){
          field = 'saturday_selected';
        }else if(index==7){
          field = 'sunday_selected';
        }
        try {

          for (let k = 0; k < responseScheduleDayTurns.data.length; k++) {
            const rowk =       responseScheduleDayTurns.data[k];
      


            if(
              (index==1 && rowk.attributes.date == date_day_1) ||
              (index==2 && rowk.attributes.date == date_day_2) ||
              (index==3 && rowk.attributes.date == date_day_3) ||
              (index==4 && rowk.attributes.date == date_day_4) ||
              (index==5 && rowk.attributes.date == date_day_5) ||
              (index==6 && rowk.attributes.date == date_day_6) ||
              (index==7 && rowk.attributes.date == date_day_7) 
              
              ){
                try {

                  const rowGA5 =       responseScheduleDayTurns.data[k].attributes.groups_and_agents.data;
    
                  for (let i6 = 0; i6 < rowGA5.length; i6++) {
                    if(rowGA5[i6].id==GROUPAGENT.id){
                      shift_id_selected = rowk.attributes.shift.data.id;
                    }
                  }
                  
                } catch (error) {
                  
                }

            }
            
          }
            
        } catch (error) {
          
        }

        GROUPAGENT[field] = shift_id_selected;

      

    });

    
  }
 

  const planificationData: PlanificationData={ 
    date_day_1: date_day_1,
    date_day_2: date_day_2,
    date_day_3: date_day_3,
    date_day_4: date_day_4,
    date_day_5: date_day_5,
    date_day_6: date_day_6,
    date_day_7: date_day_7,
    
    groups: groups,    
    groupsAndAgents: groupsAndAgents,
    type_liders: type_liders,
    type_standbies: type_standbies,

    shifts_row: shifts_1,
    shifts_hextras: shifts_1,
    shifts_1: shifts_1,
    shifts_2: shifts_2,
    shifts_3: shifts_3,
    shifts_4: shifts_4,
    shifts_5: shifts_5,
    shifts_6: shifts_6,
    shifts_7: shifts_7,
    agents_descansa_1: agents_descansa_1_value,
    agents_descansa_2: agents_descansa_2_value,
    agents_descansa_3: agents_descansa_3_value,
    agents_descansa_4: agents_descansa_4_value,
    agents_descansa_5: agents_descansa_5_value,
    agents_descansa_6: agents_descansa_6_value,
    agents_descansa_7: agents_descansa_7_value,

    date_day_1_total_trabajan: 0,
    date_day_2_total_trabajan: 0,
    date_day_3_total_trabajan: 0,
    date_day_4_total_trabajan: 0,
    date_day_5_total_trabajan: 0,
    date_day_6_total_trabajan: 0,
    date_day_7_total_trabajan: 0,


    agents_hsuplementarias_1: agents_hsuplementarias_1,
    agents_hsuplementarias_2: agents_hsuplementarias_2,
    agents_hsuplementarias_3: agents_hsuplementarias_3,
    agents_hsuplementarias_4: agents_hsuplementarias_4,
    agents_hsuplementarias_5: agents_hsuplementarias_5,
    agents_hsuplementarias_6: agents_hsuplementarias_6,
    agents_hsuplementarias_7: agents_hsuplementarias_7,

    agents_hextras_1: agents_hextras_1,
    agents_hextras_2: agents_hextras_2,
    agents_hextras_3: agents_hextras_3,
    agents_hextras_4: agents_hextras_4,
    agents_hextras_5: agents_hextras_5,
    agents_hextras_6: agents_hextras_6,
    agents_hextras_7: agents_hextras_7,


  };

  const date_from_value = planificationData.date_day_1;
  const date_to_value = planificationData.date_day_7;



  const data: ScheduleData={ 
    id: id,
    date_from: date_from_value, 
    date_to: date_to_value, 
    observations: observations_value,
    internal_code: internal_code_value,
    production: production_value,
    planificado: planificado_value,
    turno_velada_por_orden: false,
    schedule_anterior_cargar: 0,
    coordinator: coordinator_value,
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
        

        const FECHASCHEDULE_FROM = Date.parse(planificationData.date_day_1); //27
        const FECHASCHEDULE_TO = Date.parse(planificationData.date_day_7); //33
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
  "&filters[date_from][$gte]="+planificationData.date_day_1+"&filters[date_from][$lte]="+planificationData.date_day_7+"");
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

  try{
    groupsAndAgents.map(row => {
      vacationAgents.map(rowVacation => {
        if(rowVacation.agent_id==row.agent_id){
          row.vacaciones = 1;
        }
      });
      unavailableDateAgents.map(rowunavailable => {
        if(rowunavailable.agent_id==row.agent_id){
          row.dias_no_disponible = 1;
        }
      });
    });
  }catch(ex){

  }

  

  return {
    props: { 
      schedules_day_descansos,
      schedules_day_hextras,
      schedules_day_hsuplementarias,
      schedules_day_leaders,
      schedules_day_standbies,
      schedules_day_turns,
      schedules_anterior, 
      site_id_logueado, unavailableDateAgents, vacationAgents, groups, shifts, groupsAndAgents, data, planificationData,coordinators },
  };
};

export default FormLayouts


