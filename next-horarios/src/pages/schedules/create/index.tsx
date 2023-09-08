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

import React,{ ChangeEvent, FormEvent, useEffect, useState,useRef } from "react";
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
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
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
  showButton: boolean;

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
  place_id: number;
  type_of_agent_id: number;
  type_of_agent_name: string;
  place: any;
  place_name: string;
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

  vacaciones_1: number;
  vacaciones_2: number;
  vacaciones_3: number;
  vacaciones_4: number;
  vacaciones_5: number;
  vacaciones_6: number;
  vacaciones_7: number;


  dias_no_disponible_1: number;
  dias_no_disponible_2: number;
  dias_no_disponible_3: number;
  dias_no_disponible_4: number;
  dias_no_disponible_5: number;
  dias_no_disponible_6: number;
  dias_no_disponible_7: number;

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
  time_to: any;
  observations: string;
  velada: any;
  color: string;
  horas_extras: any;
  lunch_time: number;
  holiday: any;

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
  color: string;

  soporte: any;
  horas_extras: any;
  num_agentes_necesarios: number;
  num_agentes_sugeridos: number;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  selected_groups_agents: any[];
  selected_agents: any[];
  holiday: any;
  position_row: number;
  lunch_time: number;
  place: any;
  place_name: string;

  type_of_agents_id: any[];
  type_of_agents_name: string;

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
  date_from: any;
  date_to: any;
  internal_code: string;
  observations: string;
  production: any;
  planificado: any;
  turno_velada_por_orden: any;
  schedule_anterior: number;
  schedule_anterior_cargar: number;
  grupo_feriado_1: number;
  grupo_feriado_2: number;
  grupo_feriado_3: number;
  grupo_feriado_4: number;
  grupo_feriado_5: number;
  grupo_feriado_6: number;
  grupo_feriado_7: number;

  show_gferiado_1: boolean;
  show_gferiado_2: boolean;
  show_gferiado_3: boolean;
  show_gferiado_4: boolean;
  show_gferiado_5: boolean;
  show_gferiado_6: boolean;
  show_gferiado_7: boolean;


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
  holiday: any;

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

  date_day_1_total_trabajan: number;
  date_day_2_total_trabajan: number;
  date_day_3_total_trabajan: number;
  date_day_4_total_trabajan: number;
  date_day_5_total_trabajan: number;
  date_day_6_total_trabajan: number;
  date_day_7_total_trabajan: number;


  groups: GroupData[];
  groupsAndAgents: FormDataGroupsAndAgents[];

  vacationAgents: VacationAgents[];
  unavailableDateAgents: UnavailableDateAgentsData[];

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


const FormLayouts = ({ site_id_logueado = 0, schedules_anterior=[], vacationAgents=[], unavailableDateAgents=[], coordinators=[], shifts = [], groups = [], groupsAndAgents = [], data, planificationData }: Props) => {


  
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

    try {
      if(responseHolidays.data.length>0){
        fecha_es_feriado = true;
        MAX_DIAS_AGENTE_SEMANA--;
      }
    } catch (error) {
      
    }

    

    const vacationAgents_flag: VacationAgents[]=[];
    const unavailableDateAgents_flag: UnavailableDateAgentsData[]=[];

    const resvacationAgents = await fetch(StrapiUrl+"vacation-date-by-agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
    const responsevacationAgents = await resvacationAgents.json();
  
    try {
  
        for (let i = 0; i < responsevacationAgents.data.length; i++) {
  
          const row =       responsevacationAgents.data[i];
          //console.log(row);


          const VacaDateFrom = responsevacationAgents.data[i].attributes.date_from;
          const VacaDateTo = responsevacationAgents.data[i].attributes.date_to;
          

          const FECHASCHEDULE_FROM = Date.parse(valuesPlanificationData.date_day_1); //27
          const FECHASCHEDULE_TO = Date.parse(valuesPlanificationData.date_day_7); //33
          const FECHAVACTION_FROM = Date.parse(VacaDateFrom); //14
          const FECHAVACTION_TO = Date.parse(VacaDateTo); // 28


          if(

            (FECHASCHEDULE_FROM >= FECHAVACTION_FROM && FECHASCHEDULE_FROM <= FECHAVACTION_TO)  
            ||
            (FECHASCHEDULE_TO >= FECHAVACTION_FROM && FECHASCHEDULE_TO <= FECHAVACTION_TO)  
            
            
            
            ){

            vacationAgents_flag.push(
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
  

    const resunavailableDateAgents = await fetch(StrapiUrl+"unavailable-dates-by-agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
    const responseunavailableDateAgents= await resunavailableDateAgents.json();

    try {

        for (let i = 0; i < responseunavailableDateAgents.data.length; i++) {

          const row =       responseunavailableDateAgents.data[i];
          //console.log(row);

          const VacaDateFrom = responseunavailableDateAgents.data[i].attributes.date_from;
          const VacaDateTo = responseunavailableDateAgents.data[i].attributes.date_to;
          

          const FECHASCHEDULE_FROM = Date.parse(valuesPlanificationData.date_day_1); //27
          const FECHASCHEDULE_TO = Date.parse(valuesPlanificationData.date_day_7); //33
          const FECHAVACTION_FROM = Date.parse(VacaDateFrom); //14
          const FECHAVACTION_TO = Date.parse(VacaDateTo); // 28


          if(

            (FECHASCHEDULE_FROM >= FECHAVACTION_FROM && FECHASCHEDULE_FROM <= FECHAVACTION_TO)  
            ||
            (FECHASCHEDULE_TO >= FECHAVACTION_FROM && FECHASCHEDULE_TO <= FECHAVACTION_TO)  
            
            
            
            ){

              unavailableDateAgents_flag.push(
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
      
          
        }
      
      
      

    } catch (ex) {
      
    }

    

    try{
      valuesPlanificationData.groupsAndAgents.map(row => {
        row.vacaciones = 0;
        row.dias_no_disponible = 0;

        for (let index = 1; index < 8; index++) {
          row['vacaciones_'+index] = 0;
          row['dias_no_disponible_'+index] = 0;
          
        }
      });
      valuesPlanificationData.groupsAndAgents.map(row => {
        vacationAgents_flag.map(rowVacation => {
          if(rowVacation.agent_id==row.agent_id){
            row.vacaciones = 1;

            for (let index = 1; index < 8; index++) {

              const FECHASCHEDULE_FROM = Date.parse(valuesPlanificationData['date_day_'+index]); //27
              const FECHASCHEDULE_TO = Date.parse(valuesPlanificationData['date_day_'+index]); //33
              const FECHAVACTION_FROM = Date.parse(rowVacation.date_from); //14
              const FECHAVACTION_TO = Date.parse(rowVacation.date_to); // 28


              if(

                (FECHASCHEDULE_FROM >= FECHAVACTION_FROM && FECHASCHEDULE_FROM <= FECHAVACTION_TO)  
                ||
                (FECHASCHEDULE_TO >= FECHAVACTION_FROM && FECHASCHEDULE_TO <= FECHAVACTION_TO)  
                
                
                
                ){

                row['vacaciones_'+index] = 1;
              }
            }

            
            
          }
        });
        unavailableDateAgents_flag.map(rowunavailable => {
          if(rowunavailable.agent_id==row.agent_id){
            row.dias_no_disponible = 1;

            for (let index = 1; index < 8; index++) {
              const FECHASCHEDULE_FROM = Date.parse(valuesPlanificationData['date_day_'+index]); //27
              const FECHASCHEDULE_TO = Date.parse(valuesPlanificationData['date_day_'+index]); //33
              const FECHAVACTION_FROM = Date.parse(rowunavailable.date_from); //14
              const FECHAVACTION_TO = Date.parse(rowunavailable.date_to); // 28


              if(

                (FECHASCHEDULE_FROM >= FECHAVACTION_FROM && FECHASCHEDULE_FROM <= FECHAVACTION_TO)  
                ||
                (FECHASCHEDULE_TO >= FECHAVACTION_FROM && FECHASCHEDULE_TO <= FECHAVACTION_TO)  
                
                
                
                ){
                row['dias_no_disponible_'+index] = 1;
              }
            }
          }
        });
      });
    }catch(ex){

    }

    valuesPlanificationData.vacationAgents = vacationAgents_flag;
    valuesPlanificationData.unavailableDateAgents = unavailableDateAgents_flag;
    



    const res = await fetch(StrapiUrl+"shifts?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=time_from%3Aasc");
    const response = await res.json();
    const shifts_flag_new: FormDataShiftsPerDay[]=[];
    const selected_groups_agents: any[]=[];

    values['show_gferiado_'+dia_semana] = fecha_es_feriado;
    values['grupo_feriado_'+dia_semana] = 0;

   

    try {
        let position_shift_1 = 1;
      

        for (let i = 0; i < response.data.length; i++) {

          const row =       response.data[i];

          let type_of_agents_name = '';
          const type_of_agents_id:any[] = [];
          //console.log(row);
      
          
            
          /************** SHIFTS LUNES************* */
            try{

              

              try{
                for (let i2 = 0; i2 < row.attributes.type_of_agents.data.length; i2++) {
      
                  const rowTypeOfAgent =       row.attributes.type_of_agents.data[i2];
      
                  type_of_agents_name += rowTypeOfAgent.attributes.name+' | ';
                  type_of_agents_id.push(rowTypeOfAgent.id);

                }
              }catch (ex) {
          
              }


              if(dia_semana==1 && row.attributes.type_of_shift.data.attributes.monday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.monday_num_agents,
                    num_agentes_sugeridos:row.attributes.monday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    selected_agents: [],
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    type_of_agents_name: type_of_agents_name,
                    type_of_agents_id:type_of_agents_id,
                    place: row.attributes.place.data.id,
                    place_name: row.attributes.place ? row.attributes.place.data.attributes.name : ''
                    


                  }
                );
                position_shift_1++;
              } else if(dia_semana==2 && row.attributes.type_of_shift.data.attributes.tuesday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.tuesday_num_agents,
                    num_agentes_sugeridos:row.attributes.tuesday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    selected_agents: [],
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    type_of_agents_name: type_of_agents_name,
                    type_of_agents_id:type_of_agents_id,
                    place: row.attributes.place.data.id,
                    place_name: row.attributes.place ? row.attributes.place.data.attributes.name : ''

                  }
                );
                position_shift_1++;
              }else if(dia_semana==3 && row.attributes.type_of_shift.data.attributes.wednesday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.wednesday_num_agents,
                    num_agentes_sugeridos:row.attributes.wednesday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    selected_agents: [],
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    type_of_agents_name: type_of_agents_name,
                    type_of_agents_id:type_of_agents_id,
                    place: row.attributes.place.data.id,
                    place_name: row.attributes.place ? row.attributes.place.data.attributes.name : ''
                  }
                );
                position_shift_1++;
              }else if(dia_semana==4 && row.attributes.type_of_shift.data.attributes.thursday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.thursday_num_agents,
                    num_agentes_sugeridos:row.attributes.thursday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    selected_agents: [],
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    type_of_agents_name: type_of_agents_name,
                    type_of_agents_id:type_of_agents_id,
                    place: row.attributes.place.data.id,
                    place_name: row.attributes.place ? row.attributes.place.data.attributes.name : ''
                  }
                );
                position_shift_1++;
              }else if(dia_semana==5 && row.attributes.type_of_shift.data.attributes.friday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.friday_num_agents,
                    num_agentes_sugeridos:row.attributes.friday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    selected_agents: [],
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    type_of_agents_name: type_of_agents_name,
                    type_of_agents_id:type_of_agents_id,
                    place: row.attributes.place.data.id,
                    place_name: row.attributes.place ? row.attributes.place.data.attributes.name : ''
                  }
                );
                position_shift_1++;
              }else if(dia_semana==6 && row.attributes.type_of_shift.data.attributes.saturday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.saturday_num_agents,
                    num_agentes_sugeridos:row.attributes.saturday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    selected_agents: [],
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    type_of_agents_name: type_of_agents_name,
                    type_of_agents_id:type_of_agents_id,
                    place: row.attributes.place.data.id,
                    place_name: row.attributes.place ? row.attributes.place.data.attributes.name : ''
                  }
                );
                position_shift_1++;
              }else if(dia_semana==7 && row.attributes.type_of_shift.data.attributes.sunday == true && fecha_es_feriado == row.attributes.type_of_shift.data.attributes.holiday ){
                shifts_flag_new.push(
                  {
                    id: row.id,
                    name: row.attributes.name,
                    time_from: row.attributes.time_from,
                    time_to: row.attributes.time_to,
                    observations: row.attributes.observations,
                    velada: row.attributes.velada,
                    color: row.attributes.color,
                    soporte: row.attributes.soporte,
                    horas_extras: row.attributes.horas_extras,
                    num_agentes_necesarios: row.attributes.sunday_num_agents,
                    num_agentes_sugeridos:row.attributes.sunday_num_agents,
                    createdAt: row.attributes.createdAt,
                    updatedAt: row.attributes.updatedAt,
                    publishedAt: row.attributes.publishedAt,
                    selected_groups_agents: selected_groups_agents,
                    selected_agents: [],
                    holiday: row.attributes.type_of_shift.data.attributes.holiday,
                    position_row: position_shift_1,
                    lunch_time: row.attributes.lunch_time,
                    type_of_agents_name: type_of_agents_name,
                    type_of_agents_id:type_of_agents_id,
                    place: row.attributes.place.data.id,
                    place_name: row.attributes.place ? row.attributes.place.data.attributes.name : ''
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

    values.internal_code = "Horario "+valuesPlanificationData.date_day_1+" hasta "+valuesPlanificationData.date_day_7;

    
    setValues({ ...values});

    
    

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

  const handleChangeTurnos = (shift_id: number, name_field: keyof Element, day: number, name_input: keyof Element) => (event: ChangeEvent<HTMLInputElement>) => {
    if(name_field == 'selected_groups_agents'){
      actualizarChipAgent(shift_id, name_field, day, event.target.value);
      mostrar_alerta_vacaciones_dias_no_disponibles(event.target.value, day);
      mostrar_alerta_dia_de_la_semana_no_disponible(event.target.value, day);
      mostrar_alerta_rango_de_horas(event.target.value, shift_id);
    }

    let horas_extras = 0;
    

    if(day==1){
      valuesPlanificationData.shifts_1.map((row) => {
          if(row.id == shift_id){
            horas_extras =row.horas_extras;
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==2){
      valuesPlanificationData.shifts_2.map((row) => {
          if(row.id == shift_id){
            horas_extras =row.horas_extras;
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==3){
      valuesPlanificationData.shifts_3.map((row) => {
          if(row.id == shift_id){
            horas_extras =row.horas_extras;
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==4){
      valuesPlanificationData.shifts_4.map((row) => {
          if(row.id == shift_id){
            horas_extras =row.horas_extras;
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==5){
      valuesPlanificationData.shifts_5.map((row) => {
          if(row.id == shift_id){
            horas_extras =row.horas_extras;
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==6){
      valuesPlanificationData.shifts_6.map((row) => {
          if(row.id == shift_id){
            horas_extras =row.horas_extras;
            row[name_field] = event.target.value;
          }
        }
      )
    }
    if(day==7){
      valuesPlanificationData.shifts_7.map((row) => {
          if(row.id == shift_id){
            horas_extras =row.horas_extras;
            row[name_field] = event.target.value;
          }
        }
      )
    }

    valuesInfoDialogText.showButton = horas_extras ? false : true;

    validar_usuarios_descansan();
    
    setValuesPlanificationData({...valuesPlanificationData, [name_input]: event.target.value });

    if(name_field == 'selected_groups_agents'){
      mostrar_alerta_trabajo_max_days(shift_id, day, event.target.value , MAX_DIAS_AGENTE_SEMANA);
    }

  }

  const handleChangeTurnosAutomatic = (shift_id: number, name_field: keyof Element, day: number, name_input: keyof Element, valor:any) =>{
    

    if(day==1){
      valuesPlanificationData.shifts_1.map((row) => {
          if(row.id == shift_id){
            row[name_field] = valor;
          }
        }
      )
    }
    if(day==2){
      valuesPlanificationData.shifts_2.map((row) => {
          if(row.id == shift_id){
            row[name_field] = valor;
          }
        }
      )
    }
    if(day==3){
      valuesPlanificationData.shifts_3.map((row) => {
          if(row.id == shift_id){
            row[name_field] = valor;
          }
        }
      )
    }
    if(day==4){
      valuesPlanificationData.shifts_4.map((row) => {
          if(row.id == shift_id){
            row[name_field] = valor;
          }
        }
      )
    }
    if(day==5){
      valuesPlanificationData.shifts_5.map((row) => {
          if(row.id == shift_id){
            row[name_field] = valor;
          }
        }
      )
    }
    if(day==6){
      valuesPlanificationData.shifts_6.map((row) => {
          if(row.id == shift_id){
            row[name_field] = valor;
          }
        }
      )
    }
    if(day==7){
      valuesPlanificationData.shifts_7.map((row) => {
          if(row.id == shift_id){
            row[name_field] = valor;
          }
        }
      )
    }

    validar_usuarios_descansan();
    
    setValuesPlanificationData({...valuesPlanificationData, [name_input]: valor });

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

  function mostrar_alerta_rango_de_horas(agents_id, shift_id){

    shifts.map(turno => {
      if( turno.id== shift_id){
        valuesPlanificationData.groupsAndAgents.map(rowGA => {
          agents_id.map(agente => {
            if(agente== rowGA.id && validar_hora_dentro_de_rango(rowGA,rowGA.rules_hour_from,rowGA.rules_hour_to,turno.time_from, turno.time_to)==0){
    
              
              ver_mensaje_modal("Revisar la asignación. El Agente "+rowGA.agents+" no está disponible para este rango de horas. Regla aplicada: "+rowGA.rules_hour_from+" - "+rowGA.rules_hour_to+" - Tipo de Regla Hora: "+rowGA.type_rule)
    
            }
          });
        });

      }
    });

    

  }

  function mostrar_alerta_dia_de_la_semana_no_disponible(agents_id, day){
    valuesPlanificationData.groupsAndAgents.map(rowGA => {
      agents_id.map(agente => {
        if((
              (rowGA.monday==0 && day==1) || 
              (rowGA.tuesday==0 && day==2) || 
              (rowGA.wednesday==0 && day==3) || 
              (rowGA.thursday==0 && day==4) || 
              (rowGA.friday==0 && day==5) || 
              (rowGA.saturday==0 && day==6) || 
              (rowGA.sunday==0 && day==7) 
              
            ) 
            
            && agente== rowGA.id){
          ver_mensaje_modal(
            "Revisar la asignación. El Agente "+rowGA.agents+" no está disponible para este día de la semana. Regla aplicada: "+rowGA.rules_day)
          return 0;
        }
      });
    });
  }
  function mostrar_alerta_trabajo_max_days(shift_id, day, agents_id, max_days){
    valuesPlanificationData.groupsAndAgents.map(rowGA => {
      agents_id.map(agente => {

        const n_day_actual = rowGA.total_dia_1 + rowGA.total_dia_2 + rowGA.total_dia_3 +rowGA.total_dia_4 + rowGA.total_dia_5 + rowGA.total_dia_6 + rowGA.total_dia_7;
        
        if(n_day_actual>max_days && agente== rowGA.id){
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
                valuesNewHorasExtras.hextras_lunch_time = row.lunch_time;

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
    });
  }

  function mostrar_alerta_vacaciones_dias_no_disponibles(agents_id, day){
    valuesPlanificationData.groupsAndAgents.map(rowGA => {
      agents_id.map(agente => {
        if(rowGA['vacaciones_'+day]==1 && agente== rowGA.id){
          ver_mensaje_modal("Revisar la asignación. El Agente "+rowGA.agents+" tiene programada vacaciones. No está disponible el día "+valuesPlanificationData['date_day_'+day])
          return 0;
        }
        if(rowGA['dias_no_disponible_'+day]==1 && agente== rowGA.id){
          ver_mensaje_modal("Revisar la asignación. El Agente "+rowGA.agents+" no está disponible para esta fecha. No está disponible el día "+valuesPlanificationData['date_day_'+day])
          return 0;

        }
      });
    });
  }

  function actualizarChipAgent(shift_id, name_field, day, agents_id){
    /*VERIFICAR DESCANSAN*/
    //alert(agents_id);
    agents_id.map(rowGA => {
      if(day==1){
        valuesPlanificationData.shifts_1.map((row) => {
            if(row.id != shift_id){
              row[name_field] = row[name_field].filter(function(filter) {
                return filter !== rowGA; 
              });
            }
          }
        );
      }else if(day==2){
        valuesPlanificationData.shifts_2.map((row) => {
            if(row.id != shift_id){
              row[name_field] = row[name_field].filter(function(filter) {
                return filter !== rowGA; 
              });
            }
          }
        );
      }else if(day==3){
        valuesPlanificationData.shifts_3.map((row) => {
            if(row.id != shift_id){
              row[name_field] = row[name_field].filter(function(filter) {
                return filter !== rowGA; 
              });
            }
          }
        );
      }else if(day==4){
        valuesPlanificationData.shifts_4.map((row) => {
            if(row.id != shift_id){
              row[name_field] = row[name_field].filter(function(filter) {
                return filter !== rowGA; 
              });
            }
          }
        );
      }else if(day==5){
        valuesPlanificationData.shifts_5.map((row) => {
            if(row.id != shift_id){
              row[name_field] = row[name_field].filter(function(filter) {
                return filter !== rowGA; 
              });
            }
          }
        );
      }else if(day==6){
        valuesPlanificationData.shifts_6.map((row) => {
            if(row.id != shift_id){
              row[name_field] = row[name_field].filter(function(filter) {
                return filter !== rowGA; 
              });
            }
          }
        );
      }else if(day==7){
        valuesPlanificationData.shifts_7.map((row) => {
            if(row.id != shift_id){
              row[name_field] = row[name_field].filter(function(filter) {
                return filter !== rowGA; 
              });
            }
          }
        );
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
      
            valuesPlanificationData.shifts_1.map((row) => {
                row.selected_groups_agents.map((rowVGA) => {
                  if(rowVGA == rowGA.id){
                    descansa_1 = 0;
                  }
              });
            });
            valuesPlanificationData.shifts_2.map((row) => {
                row.selected_groups_agents.map((rowVGA) => {
                  if(rowVGA == rowGA.id){
                    descansa_2 = 0;
                  }
              });
            });
            valuesPlanificationData.shifts_3.map((row) => {
                row.selected_groups_agents.map((rowVGA) => {
                  if(rowVGA == rowGA.id){
                    descansa_3 = 0;
                  }
              });
            });
            valuesPlanificationData.shifts_4.map((row) => {
                row.selected_groups_agents.map((rowVGA) => {
                  if(rowVGA == rowGA.id){
                    descansa_4 = 0;
                  }
              });
            });
            valuesPlanificationData.shifts_5.map((row) => {
                row.selected_groups_agents.map((rowVGA) => {
                  if(rowVGA == rowGA.id){
                    descansa_5 = 0;
                  }
              });
            });
            valuesPlanificationData.shifts_6.map((row) => {
                row.selected_groups_agents.map((rowVGA) => {
                  if(rowVGA == rowGA.id){
                    descansa_6 = 0;
                  }
              });
            });
            valuesPlanificationData.shifts_7.map((row) => {
                row.selected_groups_agents.map((rowVGA) => {
                  if(rowVGA == rowGA.id){
                    descansa_7 = 0;
                  }
              });
            });
      
      
      
      
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

  function validar_agentes_disponibles_por_dia(dia_a_consultar){
    let disponible_x_dia = 0;
    let necesarios_x_dia = 0;

    if(dia_a_consultar==1){

      for (let i = 0; i < valuesPlanificationData.shifts_1.length; i++) {
        necesarios_x_dia += valuesPlanificationData.shifts_1[i].num_agentes_necesarios;
      }
    

      for (let i = 0; i < groupsAndAgents.length; i++) {
        if(groupsAndAgents[i].available==1 && groupsAndAgents[i].vacaciones_1==0 && groupsAndAgents[i].dias_no_disponible_1==0){
          if(groupsAndAgents[i].monday==1){
            disponible_x_dia++
  
          }
        }
      }

      
      if(disponible_x_dia < necesarios_x_dia){
        const factor_conversion = disponible_x_dia / necesarios_x_dia;

        for (let i = 0; i < valuesPlanificationData.shifts_1.length; i++) {
          valuesPlanificationData.shifts_1[i].num_agentes_necesarios = Math.floor(valuesPlanificationData.shifts_1[i].num_agentes_necesarios * factor_conversion);

          if(valuesPlanificationData.shifts_1[i].num_agentes_necesarios==0){
            valuesPlanificationData.shifts_1[i].num_agentes_necesarios =1;
          }
        }

       
        
        
      }

    }

    if(dia_a_consultar==2){

      for (let i = 0; i < valuesPlanificationData.shifts_2.length; i++) {
        necesarios_x_dia += valuesPlanificationData.shifts_2[i].num_agentes_necesarios;
      }
    

      for (let i = 0; i < groupsAndAgents.length; i++) {
        if(groupsAndAgents[i].available==1 && groupsAndAgents[i].vacaciones==0 && groupsAndAgents[i].dias_no_disponible==0){
          if(groupsAndAgents[i].tuesday==1){
            disponible_x_dia++
  
          }
        }
      }

      
      if(disponible_x_dia < necesarios_x_dia){
        const factor_conversion = disponible_x_dia / necesarios_x_dia;

        for (let i = 0; i < valuesPlanificationData.shifts_2.length; i++) {
          valuesPlanificationData.shifts_2[i].num_agentes_necesarios = Math.floor(valuesPlanificationData.shifts_2[i].num_agentes_necesarios * factor_conversion);

          if(valuesPlanificationData.shifts_2[i].num_agentes_necesarios==0){
            valuesPlanificationData.shifts_2[i].num_agentes_necesarios =1;
          }
        }

       
        
        
      }

    }

    if(dia_a_consultar==3){

      for (let i = 0; i < valuesPlanificationData.shifts_3.length; i++) {
        necesarios_x_dia += valuesPlanificationData.shifts_3[i].num_agentes_necesarios;
      }
    

      for (let i = 0; i < groupsAndAgents.length; i++) {
        if(groupsAndAgents[i].available==1 && groupsAndAgents[i].vacaciones==0 && groupsAndAgents[i].dias_no_disponible==0){
          if(groupsAndAgents[i].wednesday==1){
            disponible_x_dia++
  
          }
        }
      }

      
      if(disponible_x_dia < necesarios_x_dia){
        const factor_conversion = disponible_x_dia / necesarios_x_dia;

        for (let i = 0; i < valuesPlanificationData.shifts_3.length; i++) {
          valuesPlanificationData.shifts_3[i].num_agentes_necesarios = Math.floor(valuesPlanificationData.shifts_3[i].num_agentes_necesarios * factor_conversion);

          if(valuesPlanificationData.shifts_3[i].num_agentes_necesarios==0){
            valuesPlanificationData.shifts_3[i].num_agentes_necesarios =1;
          }
        }

       
        
        
      }

    }

    if(dia_a_consultar==4){

      for (let i = 0; i < valuesPlanificationData.shifts_4.length; i++) {
        necesarios_x_dia += valuesPlanificationData.shifts_4[i].num_agentes_necesarios;
      }
    

      for (let i = 0; i < groupsAndAgents.length; i++) {
        if(groupsAndAgents[i].available==1 && groupsAndAgents[i].vacaciones==0 && groupsAndAgents[i].dias_no_disponible==0){
          if(groupsAndAgents[i].thursday==1){
            disponible_x_dia++
  
          }
        }
      }

      
      if(disponible_x_dia < necesarios_x_dia){
        const factor_conversion = disponible_x_dia / necesarios_x_dia;

        for (let i = 0; i < valuesPlanificationData.shifts_4.length; i++) {
          valuesPlanificationData.shifts_4[i].num_agentes_necesarios = Math.floor(valuesPlanificationData.shifts_4[i].num_agentes_necesarios * factor_conversion);

          if(valuesPlanificationData.shifts_4[i].num_agentes_necesarios==0){
            valuesPlanificationData.shifts_4[i].num_agentes_necesarios =1;
          }
        }

       
        
        
      }

    }

    if(dia_a_consultar==5){

      for (let i = 0; i < valuesPlanificationData.shifts_5.length; i++) {
        necesarios_x_dia += valuesPlanificationData.shifts_5[i].num_agentes_necesarios;
      }
    

      for (let i = 0; i < groupsAndAgents.length; i++) {
        if(groupsAndAgents[i].available==1 && groupsAndAgents[i].vacaciones==0 && groupsAndAgents[i].dias_no_disponible==0){
          if(groupsAndAgents[i].friday==1){
            disponible_x_dia++
  
          }
        }
      }

      
      if(disponible_x_dia < necesarios_x_dia){
        const factor_conversion = disponible_x_dia / necesarios_x_dia;

        for (let i = 0; i < valuesPlanificationData.shifts_5.length; i++) {
          valuesPlanificationData.shifts_5[i].num_agentes_necesarios = Math.floor(valuesPlanificationData.shifts_5[i].num_agentes_necesarios * factor_conversion);

          if(valuesPlanificationData.shifts_5[i].num_agentes_necesarios==0){
            valuesPlanificationData.shifts_5[i].num_agentes_necesarios =1;
          }
        }

       
        
        
      }

    }

    if(dia_a_consultar==6){

      for (let i = 0; i < valuesPlanificationData.shifts_6.length; i++) {
        necesarios_x_dia += valuesPlanificationData.shifts_6[i].num_agentes_necesarios;
      }
    

      for (let i = 0; i < groupsAndAgents.length; i++) {
        if(groupsAndAgents[i].available==1 && groupsAndAgents[i].vacaciones==0 && groupsAndAgents[i].dias_no_disponible==0){
          if(groupsAndAgents[i].saturday==1){
            disponible_x_dia++
  
          }
        }
      }

      
      if(disponible_x_dia < necesarios_x_dia){
        const factor_conversion = disponible_x_dia / necesarios_x_dia;

        for (let i = 0; i < valuesPlanificationData.shifts_6.length; i++) {
          valuesPlanificationData.shifts_6[i].num_agentes_necesarios = Math.floor(valuesPlanificationData.shifts_6[i].num_agentes_necesarios * factor_conversion);

          if(valuesPlanificationData.shifts_6[i].num_agentes_necesarios==0){
            valuesPlanificationData.shifts_6[i].num_agentes_necesarios =1;
          }
        }

       
        
        
      }

    }

    if(dia_a_consultar==7){

      for (let i = 0; i < valuesPlanificationData.shifts_7.length; i++) {
        necesarios_x_dia += valuesPlanificationData.shifts_7[i].num_agentes_necesarios;
      }
    

      for (let i = 0; i < groupsAndAgents.length; i++) {
        if(groupsAndAgents[i].available==1 && groupsAndAgents[i].vacaciones==0 && groupsAndAgents[i].dias_no_disponible==0){
          if(groupsAndAgents[i].sunday==1){
            disponible_x_dia++
  
          }
        }
      }

      
      if(disponible_x_dia < necesarios_x_dia){
        const factor_conversion = disponible_x_dia / necesarios_x_dia;

        for (let i = 0; i < valuesPlanificationData.shifts_7.length; i++) {
          valuesPlanificationData.shifts_7[i].num_agentes_necesarios = Math.floor(valuesPlanificationData.shifts_7[i].num_agentes_necesarios * factor_conversion);

          if(valuesPlanificationData.shifts_7[i].num_agentes_necesarios==0){
            valuesPlanificationData.shifts_7[i].num_agentes_necesarios =1;
          }
        }

       
        
        
      }

    }
  }


  

  function limpiarTodosTurnos(){
    const limpiar_array = [];

    //console.log("  ***  INICIA LIMPIADO  *** ")

    for (const element of valuesPlanificationData.shifts_1) {
      try {

        element.selected_groups_agents = limpiar_array;
        setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: limpiar_array });
        
      } catch (error) {
        
      }

    }

    for (const element of valuesPlanificationData.shifts_2) {
      try {

        element.selected_groups_agents = limpiar_array;
        setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: limpiar_array });
        
      } catch (error) {
        
      }

    }
    for (const element of valuesPlanificationData.shifts_3) {
      try {

        element.selected_groups_agents = limpiar_array;
        setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: limpiar_array });
        
      } catch (error) {
        
      }

    }
    for (const element of valuesPlanificationData.shifts_4) {
      try {

        element.selected_groups_agents = limpiar_array;
        setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: limpiar_array });
        
      } catch (error) {
        
      }

    }
    for (const element of valuesPlanificationData.shifts_5) {
      try {

        element.selected_groups_agents = limpiar_array;
        setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: limpiar_array });
        
      } catch (error) {
        
      }

    }
    for (const element of valuesPlanificationData.shifts_6) {
      try {

        element.selected_groups_agents = limpiar_array;
        setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: limpiar_array });
        
      } catch (error) {
        
      }

    }
    for (const element of valuesPlanificationData.shifts_7) {
      try {

        element.selected_groups_agents = limpiar_array;
        setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: limpiar_array });
        
      } catch (error) {
        
      }

    }

    for (let index = 1; index < 8; index++) {
      clear_add_hsuplem(valuesPlanificationData['date_day_'+index]);
      clear_add_hextras(valuesPlanificationData['date_day_'+index]);

    }

    
    //console.log("  ***  FIN LIMPIADO  *** ")

    
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function BalancearTurnosRestantes(max_days_per_day){

    /********* BALANCEAR POR TURNOS ******** */
    for (let index = 1; index < 8; index++) {
      for (const SHIFT_ROW_COLUMN of valuesPlanificationData['shifts_'+index]) {
        try {
          if((SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && (SHIFT_ROW_COLUMN.soporte == 0 || index>5) && SHIFT_ROW_COLUMN.horas_extras==0 &&  SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length){
           

            for (const elementDescansan of valuesPlanificationData['agents_descansa_'+index]) {

              for (const element of valuesPlanificationData.groupsAndAgents.sort((a,b) => a.rules_day_order - b.rules_day_order || a.rules_hour_order - b.rules_hour_order || a.order - b.order)) {
                const total_dia = element.total_dia_1 + element.total_dia_2 + element.total_dia_3 + element.total_dia_4 + element.total_dia_5 + element.total_dia_6 + element.total_dia_7;
                if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && element.available==1 && element['vacaciones_'+index]==0 && element['dias_no_disponible_'+index] == 0 && elementDescansan==element.id &&  SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length){
                  if(element['total_dia_'+index] == 0 && total_dia<max_days_per_day && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                    const array_flag:any[] = [];
  
                    for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                      array_flag.push(elementFlag);
                    }
                    
                    array_flag.push(element.id);
          
                    handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', index , SHIFT_ROW_COLUMN.id+'_groups_agents_'+index,array_flag)
                      
                  }
                }
              }
              
            }
         
            
          }
          
          
        } catch (error) {
          
        } 
      }
      
      
    }


    /********* BALANCEAR POR AGENTES ******** */ 
    for (let index = 1; index < 8; index++) {
      for (const element of valuesPlanificationData.groupsAndAgents.sort((a,b) => a.rules_day_order - b.rules_day_order || a.rules_hour_order - b.rules_hour_order || a.order - b.order)) {
        const total_dia = element.total_dia_1 + element.total_dia_2 + element.total_dia_3 + element.total_dia_4 + element.total_dia_5 + element.total_dia_6 + element.total_dia_7;

        if(total_dia<max_days_per_day && element['total_dia_'+index] == 0 && element.available==1 && element['vacaciones_'+index]==0 && element['dias_no_disponible_'+index] == 0 ){

          let num_suge = 0;
          let shift_id_asig = 0;
          for (const SHIFT_ROW_COLUMN of valuesPlanificationData['shifts_'+index]) {

            if(
              (SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && 
              ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) &&
              (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && 
              SHIFT_ROW_COLUMN.soporte == 0 && 
              SHIFT_ROW_COLUMN.horas_extras==0 && 
              validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1 && 
              SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length 
              ){
              num_suge = SHIFT_ROW_COLUMN.num_agentes_sugeridos;
              shift_id_asig = SHIFT_ROW_COLUMN.id;

            }

          }

          if(shift_id_asig>0){
            for (const SHIFT_ROW_COLUMN of valuesPlanificationData['shifts_'+index]) {
              if(SHIFT_ROW_COLUMN.id == shift_id_asig){
                const array_flag:any[] = [];
  
                for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                  array_flag.push(elementFlag);
                }
                
                array_flag.push(element.id);

                handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', index , SHIFT_ROW_COLUMN.id+'_groups_agents_'+index,array_flag)
                  
              }
            }
          }

        }

      }
    }


    BalancearQuitandoTurnosSuperiores();
    

    /********* BALANCEAR POR AGENTES TURNOS MAYORES******** */
    
    for (let index = 1; index < 8; index++) {
      let last_shift_id_asig = 0;
      for (const element of valuesPlanificationData.groupsAndAgents.sort((a,b) => a.rules_day_order - b.rules_day_order || a.rules_hour_order - b.rules_hour_order || a.order - b.order)) {
        const total_dia = element.total_dia_1 + element.total_dia_2 + element.total_dia_3 + element.total_dia_4 + element.total_dia_5 + element.total_dia_6 + element.total_dia_7;

        if(total_dia<max_days_per_day && element['total_dia_'+index] == 0 && element.available==1 && element['vacaciones_'+index]==0 && element['dias_no_disponible_'+index]  == 0 ){

          let num_suge = 0;
          let shift_id_asig = 0;
          for (const SHIFT_ROW_COLUMN of valuesPlanificationData['shifts_'+index]) {

            if(
              last_shift_id_asig != SHIFT_ROW_COLUMN.id && 
              (SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && 
              ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) &&
              (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && 
              SHIFT_ROW_COLUMN.soporte == 0 && 
              SHIFT_ROW_COLUMN.horas_extras==0 && 
              validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1 && 
              SHIFT_ROW_COLUMN.num_agentes_sugeridos > num_suge 
              ){
              num_suge = SHIFT_ROW_COLUMN.num_agentes_sugeridos;
              shift_id_asig = SHIFT_ROW_COLUMN.id;

            }

          }

          if(shift_id_asig>0){
            for (const SHIFT_ROW_COLUMN of valuesPlanificationData['shifts_'+index]) {
              if(SHIFT_ROW_COLUMN.id == shift_id_asig){
                const array_flag:any[] = [];
  
                for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                  array_flag.push(elementFlag);
                }
                
                array_flag.push(element.id);
                last_shift_id_asig = shift_id_asig;

                handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', index , SHIFT_ROW_COLUMN.id+'_groups_agents_'+index,array_flag)
                  
              }
            }
          }

        }

      }
    }
    
    

  }

  function BalancearQuitandoTurnosSuperiores(){
    /********* BALANCEAR POR TURNOS QUITANDO A MAYORES ******** */
    for (let index = 1; index < 8; index++) {
          

      for (const SHIFT_ROW_COLUMN of valuesPlanificationData['shifts_'+index]) {
        try {
          if(
            (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && 
            SHIFT_ROW_COLUMN.soporte == 0 && 
            SHIFT_ROW_COLUMN.horas_extras==0 && 
            SHIFT_ROW_COLUMN.selected_groups_agents.length == 0
            ){

              let num_suge = 0;
              let shift_id_asig = 0;
              let agente_quitado = 0;
              for (const SHIFT_ROW_COLUMN_QUITAR of valuesPlanificationData['shifts_'+index]) {
                try {
                  if(
                    (SHIFT_ROW_COLUMN_QUITAR.velada == 0 || values.turno_velada_por_orden==0 ) && 
                    SHIFT_ROW_COLUMN_QUITAR.soporte == 0 && 
                    SHIFT_ROW_COLUMN_QUITAR.horas_extras==0 && 
                    SHIFT_ROW_COLUMN_QUITAR.num_agentes_sugeridos > num_suge &&
                    SHIFT_ROW_COLUMN_QUITAR.selected_groups_agents.length > 1 

                    ){
                    num_suge = SHIFT_ROW_COLUMN_QUITAR.num_agentes_sugeridos;
                    shift_id_asig = SHIFT_ROW_COLUMN_QUITAR.id;

                  }
                  
                  
                } catch (error) {
                  
                } 
              }

              if(shift_id_asig>0){
                for (const SHIFT_ROW_COLUMN_QUITADO of valuesPlanificationData['shifts_'+index]) {
                  if(SHIFT_ROW_COLUMN_QUITADO.id == shift_id_asig){
                    const array_flag:any[] = [];

                    for (const elementFlag of SHIFT_ROW_COLUMN_QUITADO.selected_groups_agents) {
                      if(agente_quitado==0){
                        agente_quitado = elementFlag;
                      }else{
                        array_flag.push(elementFlag);
                      }
                    }

                    handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN_QUITADO.id, 'selected_groups_agents', index , SHIFT_ROW_COLUMN_QUITADO.id+'_groups_agents_'+index,array_flag)
                  }
                }

              }

              if(agente_quitado>0){

                const array_flag:any[] = [];

                for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                  array_flag.push(elementFlag);
                }
                
                array_flag.push(agente_quitado);

                handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', index , SHIFT_ROW_COLUMN.id+'_groups_agents_'+index,array_flag)
                  
              }
                
                  
            

          }
          
          
        } catch (error) {
          
        } 
      }
      
      
      
    }
  }

  function llenadoAutomaticoTurnos(max_days_per_day){
    //console.log("  ***  INICIA LLENADO  *** ")

    /********************* LLENADO DE DIAS *********************** */

    for (const element_group of valuesPlanificationData.groups.sort((a,b) => a.order - b.order)) {
      try {
        //console.log("  ***  INICIA "+element_group.name+"   *** ")

        const array_dia_por_grupo:any[] = [];

        array_dia_por_grupo.push(
          {
            dia: 1,
            order: element_group.monday_order
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 2,
            order: element_group.tuesday_order
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 3,
            order: element_group.wednesday_order
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 4,
            order: element_group.thursday_order
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 5,
            order: element_group.friday_order
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 6,
            order: element_group.saturday_order
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 7,
            order: element_group.sunday_order
          }
        );

        let posicion_aleatoria_descanso_flag = 0;
        if(element_group.descansos_por_dia.length>0){
          //posicion_aleatoria_descanso_flag = element_group.descansos_por_dia.length - 1;
        }

        for (const element of valuesPlanificationData.groupsAndAgents.sort((a,b) => a.rules_day_order - b.rules_day_order || a.rules_hour_order - b.rules_hour_order || a.order - b.order)) {

          try {
  
            if((element.skip_order_group_day == false || element.skip_order_group_hour == false) && element_group.id == element.group_id && element.available==1 ){


              let flag_asignacion = element.total_dia_1 + element.total_dia_2 + element.total_dia_3 + element.total_dia_4 + element.total_dia_5 + element.total_dia_6 + element.total_dia_7;

              //const posicion_aleatoria_descanso = getRandomIntInclusive(0,(element_group.descansos_por_dia.length-1));

              if(posicion_aleatoria_descanso_flag >= element_group.descansos_por_dia.length){
                posicion_aleatoria_descanso_flag = 0;
              }
              const posicion_aleatoria_descanso = posicion_aleatoria_descanso_flag;
              for (const dia_de_la_semana_element of array_dia_por_grupo.sort((a,b) => a.order - b.order)) {

                if(flag_asignacion< max_days_per_day && element['vacaciones_'+dia_de_la_semana_element.dia]==0 && element['dias_no_disponible_'+dia_de_la_semana_element.dia]==0){
                  let asignado = 0;
                  const array_flag:any[] = [];

                  //console.log("  ***  INICIA DIA "+dia_de_la_semana_element.dia+"   *** ")

                  //console.log("  ***  INICIA AGENTE "+element.name+"   *** ")

                  if((element_group.descansos_por_dia[posicion_aleatoria_descanso].monday==0 || values.grupo_feriado_1==element_group.id) &&  element.monday==1 && ((element_group.monday==1 && values.grupo_feriado_1==0) || values.grupo_feriado_1==element_group.id) && dia_de_la_semana_element.dia == 1){
                    

                    for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_1) {
                      try {
                        if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && ((element_group.holiday==false && SHIFT_ROW_COLUMN.holiday==false) || element_group.holiday==true) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 )  && SHIFT_ROW_COLUMN.horas_extras==0 &&  asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                          if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
            
                            for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                              array_flag.push(elementFlag);
                            }
                            array_flag.push(element.id);
            
                            
                            
                            asignado= 1;
                            
                            flag_asignacion ++
                            handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)

                            

                            break;
                          }
                          
                          
                          //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                          //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                          
                        }
                        
                        
                      } catch (error) {
                        
                      } 
                    }

                    
                  }else if((element_group.descansos_por_dia[posicion_aleatoria_descanso].tuesday==0 || values.grupo_feriado_2==element_group.id) && element.tuesday==1 && ((element_group.tuesday==1 && values.grupo_feriado_2==0) || values.grupo_feriado_2==element_group.id) && dia_de_la_semana_element.dia == 2){
                    for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_2) {
                      try {
                        if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && ((element_group.holiday==false && SHIFT_ROW_COLUMN.holiday==false) || element_group.holiday==true) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 )  && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                          if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
            
                            for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                              array_flag.push(elementFlag);
                            }
                            array_flag.push(element.id);
            
                            
                            
                            asignado= 1;
                            
                            flag_asignacion ++
                            handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)
                            
                            break;
                          }
                          
                          
                          //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                          //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                          
                        }
                        
                        
                      } catch (error) {
                        
                      } 
                    }

                  }else if((element_group.descansos_por_dia[posicion_aleatoria_descanso].wednesday==0 || values.grupo_feriado_3==element_group.id) && element.wednesday==1 && ((element_group.wednesday==1 && values.grupo_feriado_3==0) || values.grupo_feriado_3==element_group.id) && dia_de_la_semana_element.dia == 3){
                    for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_3) {
                      try {
                        if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && ((element_group.holiday==false && SHIFT_ROW_COLUMN.holiday==false) || element_group.holiday==true) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 )  && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                          if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
            
                            for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                              array_flag.push(elementFlag);
                            }
                            array_flag.push(element.id);
            
                            
                            
                            asignado= 1;
                            
                            flag_asignacion ++
                            handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)
                            
                            break;
                          }
                          
                          
                          //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                          //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                          
                        }
                        
                        
                      } catch (error) {
                        
                      } 
                    }

                  }else if((element_group.descansos_por_dia[posicion_aleatoria_descanso].thursday==0 || values.grupo_feriado_4==element_group.id) && element.thursday==1 && ((element_group.thursday==1 && values.grupo_feriado_4==0) || values.grupo_feriado_4==element_group.id) && dia_de_la_semana_element.dia == 4){
                    for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_4) {
                      try {
                        if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && ((element_group.holiday==false && SHIFT_ROW_COLUMN.holiday==false) || element_group.holiday==true) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 )  && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                          if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
            
                            for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                              array_flag.push(elementFlag);
                            }
                            array_flag.push(element.id);
            
                            
                            
                            asignado= 1;
                            
                            flag_asignacion ++
                            handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)
                            
                            break;
                          }
                          
                          
                          //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                          //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                          
                        }
                        
                        
                      } catch (error) {
                        
                      } 
                    }

                  }else if((element_group.descansos_por_dia[posicion_aleatoria_descanso].friday==0 || values.grupo_feriado_5==element_group.id) && element.friday==1 && ((element_group.friday==1 && values.grupo_feriado_5==0) || values.grupo_feriado_5==element_group.id) && dia_de_la_semana_element.dia == 5){
                    for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_5) {
                      try {
                        if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && ((element_group.holiday==false && SHIFT_ROW_COLUMN.holiday==false) || element_group.holiday==true) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 )  && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                          if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
            
                            for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                              array_flag.push(elementFlag);
                            }
                            array_flag.push(element.id);
            
                            
                            
                            asignado= 1;
                            
                            flag_asignacion ++
                            handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)
                            
                            break;
                          }
                          
                          
                          //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                          //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                          
                        }
                        
                        
                      } catch (error) {
                        
                      } 
                    }

                  }else if((element_group.descansos_por_dia[posicion_aleatoria_descanso].saturday==0 || values.grupo_feriado_6==element_group.id) && element.saturday==1 && ((element_group.saturday==1 && values.grupo_feriado_6==0) || values.grupo_feriado_6==element_group.id) && dia_de_la_semana_element.dia == 6){
                    for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_6) {
                      try {
                        if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && ((element_group.holiday==false && SHIFT_ROW_COLUMN.holiday==false) || element_group.holiday==true) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && SHIFT_ROW_COLUMN.soporte == 0 && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                          if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
            
                            for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                              array_flag.push(elementFlag);
                            }
                            array_flag.push(element.id);
            
                            
                            
                            asignado= 1;
                            
                            flag_asignacion ++
                            handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)
                            
                            break;
                          }
                          
                          
                          //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                          //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                          
                        }
                        
                        
                      } catch (error) {
                        
                      } 
                    }

                  }else if((element_group.descansos_por_dia[posicion_aleatoria_descanso].sunday==0 || values.grupo_feriado_7==element_group.id) && element.sunday==1 && ((element_group.sunday==1 && values.grupo_feriado_7==0) || values.grupo_feriado_7==element_group.id) && dia_de_la_semana_element.dia == 7){
                    for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_7) {
                      try {
                        if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && ((element_group.holiday==false && SHIFT_ROW_COLUMN.holiday==false) || element_group.holiday==true) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && SHIFT_ROW_COLUMN.soporte == 0 && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                          if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
            
                            for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                              array_flag.push(elementFlag);
                            }
                            array_flag.push(element.id);
            
                            
                            
                            asignado= 1;
                            
                            flag_asignacion ++
                            handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)
                            
                            break;
                          }
                          
                          
                          //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                          //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                          
                        }
                        
                        
                      } catch (error) {
                        
                      } 
                    }

                  }





                }
                
    
                  
                

                //console.log("  ***  FIN AGENTE "+element.name+"   *** ")
      
                
                
                //console.log("  ***  FIN DIA "+dia_de_la_semana_element.dia+"   *** ")
      
      
              }
              
            }
            
           
          } catch (error) {
            
          } 
          posicion_aleatoria_descanso_flag++;

        }

        

        //console.log("  ***  FIN "+element_group.name+"   *** ")

        
      } catch (error) {
        
      }

    }



    
    //console.log("  ***  FIN LLENADO  *** ")
  }
  function llenadoAutomaticoTurnosSkip(max_days_per_day){
    //console.log("  ***  INICIA LLENADO  *** ")

    /********************* LLENADO DE DIAS *********************** */
    const array_dia_por_grupo:any[] = [];

        array_dia_por_grupo.push(
          {
            dia: 1,
            order: 1
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 2,
            order: 2
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 3,
            order: 3
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 4,
            order: 4
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 5,
            order: 5
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 6,
            order: 6
          }
        );
        array_dia_por_grupo.push(
          {
            dia: 7,
            order: 7
          }
        );

    for (const element of valuesPlanificationData.groupsAndAgents.sort((a,b) => a.rules_day_order - b.rules_day_order || a.rules_hour_order - b.rules_hour_order || a.order - b.order)) {

      try {

        if( (element.skip_order_group_day == true || element.skip_order_group_hour == true) && element.available==1){

          let flag_asignacion = 0;

          for (const dia_de_la_semana_element of array_dia_por_grupo.sort((a,b) => a.order - b.order)) {

            if(flag_asignacion< max_days_per_day && element['vacaciones_'+dia_de_la_semana_element.dia]==0 && element['dias_no_disponible_'+dia_de_la_semana_element.dia]==0){
              let asignado = 0;
              const array_flag:any[] = [];

              //console.log("  ***  INICIA DIA "+dia_de_la_semana_element.dia+"   *** ")

              //console.log("  ***  INICIA AGENTE "+element.name+"   *** ")

              if( element.monday==1 && dia_de_la_semana_element.dia == 1){
                

                for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_1) {
                  try {
                    if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && SHIFT_ROW_COLUMN.soporte == 0 && SHIFT_ROW_COLUMN.horas_extras==0 &&  asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                      if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
        
                        for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                          array_flag.push(elementFlag);
                        }
                        array_flag.push(element.id);
        
                        
                        
                        asignado= 1;
                        flag_asignacion ++
                        handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)

                        break;
                      }
                      
                      
                      //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                      //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                      
                    }
                    
                    
                  } catch (error) {
                    
                  } 
                }

                
              }else if( element.tuesday==1 && dia_de_la_semana_element.dia == 2){
                for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_2) {
                  try {
                    if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && SHIFT_ROW_COLUMN.soporte == 0 && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                      if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
        
                        for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                          array_flag.push(elementFlag);
                        }
                        array_flag.push(element.id);
        
                        
                        
                        asignado= 1;
                        flag_asignacion ++
                        handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)

                        break;
                      }
                      
                      
                      //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                      //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                      
                    }
                    
                    
                  } catch (error) {
                    
                  } 
                }

              }else if( element.wednesday==1  && dia_de_la_semana_element.dia == 3){
                for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_3) {
                  try {
                    if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && SHIFT_ROW_COLUMN.soporte == 0 && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                      if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
        
                        for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                          array_flag.push(elementFlag);
                        }
                        array_flag.push(element.id);
        
                        
                        
                        asignado= 1;
                        flag_asignacion ++
                        handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)

                        break;
                      }
                      
                      
                      //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                      //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                      
                    }
                    
                    
                  } catch (error) {
                    
                  } 
                }

              }else if(element.thursday==1 && dia_de_la_semana_element.dia == 4){
                for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_4) {
                  try {
                    if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && SHIFT_ROW_COLUMN.soporte == 0 && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                      if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
        
                        for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                          array_flag.push(elementFlag);
                        }
                        array_flag.push(element.id);
        
                        
                        
                        asignado= 1;
                        flag_asignacion ++
                        handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)

                        break;
                      }
                      
                      
                      //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                      //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                      
                    }
                    
                    
                  } catch (error) {
                    
                  } 
                }

              }else if( element.friday==1 && dia_de_la_semana_element.dia == 5){
                for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_5) {
                  try {
                    if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && SHIFT_ROW_COLUMN.soporte == 0 && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                      if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
        
                        for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                          array_flag.push(elementFlag);
                        }
                        array_flag.push(element.id);
        
                        
                        
                        asignado= 1;
                        flag_asignacion ++
                        handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)

                        break;
                      }
                      
                      
                      //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                      //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                      
                    }
                    
                    
                  } catch (error) {
                    
                  } 
                }

              }else if( element.saturday==1 && dia_de_la_semana_element.dia == 6){
                for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_6) {
                  try {
                    if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && SHIFT_ROW_COLUMN.soporte == 0 && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                      if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
        
                        for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                          array_flag.push(elementFlag);
                        }
                        array_flag.push(element.id);
        
                        
                        
                        asignado= 1;
                        flag_asignacion ++
                        handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)

                        break;
                      }
                      
                      
                      //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                      //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                      
                    }
                    
                    
                  } catch (error) {
                    
                  } 
                }

              }else if( element.sunday==1 && dia_de_la_semana_element.dia == 7){
                for (const SHIFT_ROW_COLUMN of valuesPlanificationData.shifts_7) {
                  try {
                    if((SHIFT_ROW_COLUMN.type_of_agents_id.includes(element.type_of_agent_id)) && ((element.place_id == SHIFT_ROW_COLUMN.place) || element.place_id==0) && (SHIFT_ROW_COLUMN.velada == 0 || values.turno_velada_por_orden==0 ) && SHIFT_ROW_COLUMN.soporte == 0 && SHIFT_ROW_COLUMN.horas_extras==0 && asignado==0 && SHIFT_ROW_COLUMN.num_agentes_sugeridos > SHIFT_ROW_COLUMN.selected_groups_agents.length && validar_hora_dentro_de_rango(element, element.rules_hour_from, element.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                      if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(element.id)) {
        
                        for (const elementFlag of SHIFT_ROW_COLUMN.selected_groups_agents) {
                          array_flag.push(elementFlag);
                        }
                        array_flag.push(element.id);
        
                        
                        
                        asignado= 1;
                        flag_asignacion ++
                        handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element.dia , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element.dia,array_flag)

                        break;
                      }
                      
                      
                      //setValuesPlanificationData({...valuesPlanificationData, ['selected_groups_agents']: element.selected_groups_agents });
                      //actualizarChipAgent(element.id, 'selected_groups_agents', dia, element.selected_groups_agents);
                      
                    }
                    
                    
                  } catch (error) {
                    
                  } 
                }

              }





            }
            

              
            

            //console.log("  ***  FIN AGENTE "+element.name+"   *** ")
  
            
            
            //console.log("  ***  FIN DIA "+dia_de_la_semana_element.dia+"   *** ")
  
  
          }
          
          

        }
        
       
      } catch (error) {
        
      } 


    }



    
    //console.log("  ***  FIN LLENADO  *** ")
  }
    
  function automaticAgents(){

    limpiarTodosTurnos();    
    validar_usuarios_descansan();

    buscarAgentesVeladaAnterior();


    llenadoAutomaticoTurnosSkip(5);
    llenadoAutomaticoTurnos(5);

    if(
      values.grupo_feriado_1==0 &&
      values.grupo_feriado_2==0 &&
      values.grupo_feriado_3==0 &&
      values.grupo_feriado_4==0 &&
      values.grupo_feriado_5==0 &&
      values.grupo_feriado_6==0 &&
      values.grupo_feriado_7==0 
      ){
        BalancearTurnosRestantes(5);
    }else{
      BalancearQuitandoTurnosSuperiores();
    }

    if(MAX_DIAS_AGENTE_SEMANA==3 && values.grupo_feriado_1 > 0 &&values.grupo_feriado_2 > 0  ){
      marcarMayorDiasComoHE();

    }
    
    validar_usuarios_descansan();
      

      


    ver_mensaje_modal("Se han asignado los agentes");

  }

  function marcarMayorDiasComoHE(){
    let MAX_DIAS_AGENTE_SEMANA_FLAG = MAX_DIAS_AGENTE_SEMANA;
    if(MAX_DIAS_AGENTE_SEMANA_FLAG==3){
      MAX_DIAS_AGENTE_SEMANA_FLAG++;
    }
    for (let index = 7; index < 8; index++) {

      valuesPlanificationData['shifts_'+index].map(SHIFT_ROW_COLUMN => {

        SHIFT_ROW_COLUMN.selected_groups_agents.map(elementGA => {

          valuesPlanificationData.groupsAndAgents.map(element => {

            if(elementGA==element.id){
              const total_dia = element.total_dia_1 + element.total_dia_2 + element.total_dia_3 + element.total_dia_4 + element.total_dia_5 + element.total_dia_6 + element.total_dia_7;
              if(total_dia>MAX_DIAS_AGENTE_SEMANA_FLAG){
                const agentes_he: FormDataHExtra[]=[];
          
                valuesPlanificationData['agents_hextras_'+index].map((HEXTRA) => {
                  if(HEXTRA.selected_groups_agents!=element.id){
                    agentes_he.push(HEXTRA);
                  }
                });
          
                agentes_he.push(
                  {
                    date: valuesPlanificationData['date_day_'+index],
                    lunch_time: SHIFT_ROW_COLUMN.lunch_time,
                    time_from: SHIFT_ROW_COLUMN.time_from,
                    time_to: SHIFT_ROW_COLUMN.time_to,
                    observations: '',
                    selected_groups_agents: element.id,
                    shift: SHIFT_ROW_COLUMN.id
          
                  }
                );
          
                valuesPlanificationData['agents_hextras_'+index] = agentes_he;

                try {
                  const DEFAULT_AGENTS: HTMLElement = document.getElementById(index+"_CHIP_"+element.id) as HTMLElement
                  DEFAULT_AGENTS.style.backgroundColor  = 'yellow';
                } catch (error) {
                  
                }
          
          
              }
            }
      
            
          });
          
          
        });


        

      })



      
      
    }
    
    setValuesPlanificationData({...valuesPlanificationData});
    
  }

  function sugerirNumAgents(){
    try{
      validar_agentes_disponibles_por_dia(1);
      validar_agentes_disponibles_por_dia(2);
      validar_agentes_disponibles_por_dia(3);
      validar_agentes_disponibles_por_dia(4);
      validar_agentes_disponibles_por_dia(5);
      validar_agentes_disponibles_por_dia(6);
      validar_agentes_disponibles_por_dia(7);
    }catch(error){

    }
    ver_mensaje_modal("Se han asignado sugerido el número de Agente por turno.");

  }

  function automaticAgentsExtra(){
    ver_mensaje_modal("Se han asignado los agentes Horas Extras.");

  }

  const [valuesInfoDialogText, setValuesInfo] = useState<InfoElementDialogText>({
    dialog_title: '',
    showProgress: false,
    showButton: true,
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

      

      const DEFAULT_AGENTS: HTMLElement = document.getElementById(dia+"_CHIP_"+valuesNewHorasExtras.hextras_agent_id) as HTMLElement
      DEFAULT_AGENTS.style.backgroundColor  = 'yellow';
      
      
    } catch (error) {
      
    }
    executeHExtras();
    handleCloseModalMaxHExtra();

  };

  const fieldRefHExtrasObs = useRef(null);
  const fieldRefHSuplemenObs = useRef(null);
  const [fieldValueHExtrasObs, setFieldValueHExtrasObs] = useState('');
  const [fieldValueHSuplemenObs, setFieldValueHSuplemenObs] = useState('');
  

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
    setFieldValueHExtrasObs(valuesNewHorasExtras.hextras_observations);
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

    try{
      valuesNewHorasExtras.hextras_observations = fieldRefHExtrasObs.current.value;
    }catch (error) {
    
    }

    
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
    try {
      setFieldValueHSuplemenObs(valuesNewHorasSuplem.hsuplem_observations);
    } catch (error) {
      
    }
  };

  const handleCloseHSuplem = () => {
    setOpenHSuplem(false);
  };

  const handleSubmitHSuplem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      valuesNewHorasSuplem.hsuplem_observations = fieldRefHSuplemenObs.current.value;
    } catch (error) {
      
    }
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
      let selected_groups_agents: any[]=[];

  
      try {

        for (let index = 1; index < 8; index++) {
          valuesPlanificationData['shifts_'+index].map((SHIFT) => {

            selected_groups_agents = [];
            for (let i5 = 0; i5 < responseScheduleDayTurns.data.length; i5++) {

              try {
                const row5 =       responseScheduleDayTurns.data[i5];
                const rowGA5 =       responseScheduleDayTurns.data[i5].attributes.groups_and_agents.data;
    
                const fecha = new Date(row5.attributes.date);

                let dia_de_la_semana = fecha.getDay() + 1;
                if(dia_de_la_semana==0){
                  dia_de_la_semana = 7;
                }
              

                



                if(index == dia_de_la_semana){
                  //console.log("fecha "+row5.attributes.date+"| dia_de_la_semana "+dia_de_la_semana+" | index "+index)

                }
                //console.log()

                if(row5.attributes.shift.data.id==SHIFT.id && index == dia_de_la_semana){
                  for (let i6 = 0; i6 < rowGA5.length; i6++) {
                    selected_groups_agents.push(rowGA5[i6].id);
                  }
                }
              } catch (error) {
                
              }
              
  
              
  
            
              
  
            }
            SHIFT.selected_groups_agents = selected_groups_agents;
  
  
            
          });

          setValuesPlanificationData({...valuesPlanificationData});

          
        }
        
    
          
        
        
    
      } catch (ex) {
        
      }
    }else{
      ver_mensaje_modal("Seleccione el horario anterior para cargar.");

    }
    


  }

  const buscarAgentesVeladaAnterior = async () => {
    const res = await fetch(StrapiUrl+"schedules-day-turns?populate=%2A"+
    "&filters[velada]=true&filters[schedule][deleted]=false&filters[schedule][id]="+values.schedule_anterior+"&filters[schedule][date_to][$lte]="+valuesPlanificationData.date_day_1+"&sort[0]=date%3Aasc"
    
    );
    const response = await res.json();
    const agentes_velada_anterior: AgentesVeladaAnterior[]= [];

    try {

      const max_length = response.data.length;

      for (let i = 0; i < max_length; i++) {

        //const dia_de_la_semana_element = i+1;

        

        const row =       response.data[i];
        //console.log(row);

        const fecha = new Date(row.attributes.date);

        let dia_de_la_semana_element = fecha.getDay()+1;
        if(dia_de_la_semana_element==0){
          dia_de_la_semana_element = 7;
        }

        try {

          for (let i2 = 0; i2 < row.attributes.groups_and_agents.data.length; i2++) {

            try {
              const rowData =       row.attributes.groups_and_agents.data[i2];

            
              const group_id_validate = 0;

              for (const SHIFT_ROW_COLUMN of valuesPlanificationData['shifts_'+dia_de_la_semana_element]) {
                try {
                  if(SHIFT_ROW_COLUMN.soporte == 1 && values.turno_velada_por_orden==1 ){
                    if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(rowData.id)) {

                      const array_flag:any[] = [];
                      array_flag.push(rowData.id);
      
                      
                      handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element, array_flag)
    
                      break;
                    }
                                    
                  }
                  
                  
                } catch (error) {
                  
                } 
              }
              for (const SHIFT_ROW_COLUMN of valuesPlanificationData['shifts_'+dia_de_la_semana_element]) {
                try {
                  if(SHIFT_ROW_COLUMN.velada == 1 && values.turno_velada_por_orden==1 ){

                    let group_id_validate = 0;

                    for (const ROW_GROUP_AGENT of valuesPlanificationData.groupsAndAgents.sort((a,b) => a.order - b.order)) {
                      if(ROW_GROUP_AGENT.id==rowData.id){
                        group_id_validate = ROW_GROUP_AGENT.group_id;
                        
                      }
                      
                    }

                    for (const ROW_GROUP_AGENT of valuesPlanificationData.groupsAndAgents.sort((a,b) => a.order - b.order)) {
                      if(group_id_validate== ROW_GROUP_AGENT.group_id && ROW_GROUP_AGENT.agent_id!=rowData.id && ROW_GROUP_AGENT.order > rowData.attributes.order && validar_hora_dentro_de_rango(ROW_GROUP_AGENT, ROW_GROUP_AGENT.rules_hour_from, ROW_GROUP_AGENT.rules_hour_to,SHIFT_ROW_COLUMN.time_from, SHIFT_ROW_COLUMN.time_to)==1){
                        if (!SHIFT_ROW_COLUMN.selected_groups_agents.includes(ROW_GROUP_AGENT.id)) {

                          const array_flag:any[] = [];
                          array_flag.push(ROW_GROUP_AGENT.id);
          
                          
                          handleChangeTurnosAutomatic(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', dia_de_la_semana_element , SHIFT_ROW_COLUMN.id+'_groups_agents_'+dia_de_la_semana_element, array_flag)
        
                          break;
                        }
                      }
                      
                    }
                    
                                    
                  }
                  
                  
                } catch (error) {
                  
                } 
              }

            
            
            } catch (ex) {
        
            }
          }

        } catch (ex) {
      
        }
    
        
      }
    
    

  } catch (ex) {
    
  }


  }

  const crear_horario_total = async(production_value, planificado_value) =>{
    const 
    res = 
    await fetch(StrapiUrl+"schedules", 
      {
        method: "POST",
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
            production: production_value,
            planificado: planificado_value,
            deleted: false
          }
        }),
      }
    );

    const response = await res.json();

    if(res.status==200){
      if(response.data.id>0){


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

        for (let index = 1; index < 8; index++) {
          /***************** CREAR LOS REGISTROS AGENTES QUE DESCANSAN**********/
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
                    date: valuesPlanificationData['date_day_'+index],
                    groups_and_agents: valuesPlanificationData['agents_descansa_'+index]
                  }
                }),
              }
            );
                            
            const response2 = await res2.json();
            if(response2.data.id>0){
              
            }
          } catch (error) {
            
          }
          
          /***************** CREAR LOS REGISTROS H SUPLEMENTARIAS**********/
          try {
            valuesPlanificationData['agents_hsuplementarias_'+index].map(async element => {
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
          } catch (error) {
            
          }
          
          /***************** CREAR LOS REGISTROS H EXTRAS **********/
          try {
            valuesPlanificationData['agents_hextras_'+index].map(async element => {
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
          } catch (error) {
            
          }
          
          /***************** CREAR LOS REGISTROS TURNOS **********/
          try {
            valuesPlanificationData['shifts_'+index].map(async element => {
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
                        date: valuesPlanificationData['date_day_'+index],
                        shift: element.id,
                        name: element.name,
                        time_from: element.time_from,
                        time_to: element.time_to,
                        agentes_necesarios: element.num_agentes_necesarios,
                        schedule: response.data.id,
                        groups_and_agents: element.selected_groups_agents,
                        agents: element.selected_agents,
                        lunch_time: element.lunch_time,
                        color: element.color,
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
          } catch (error) {
            
          }
        }

      }
      
    }
  }
  

  const handleSubmitElementSchedule = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      for (let index = 1; index < 8; index++) {
        valuesPlanificationData['agents_hextras_'+index].map(element => {
          const Splitelementtime_from = element.time_from.split(":");
          const Splitelementtime_to = element.time_to.split(":");

          if(Splitelementtime_from.length > 2){
            if (!element.time_from.endsWith(".000")) {
              element.time_from = element.time_from+".000";
            }
          }else{
            element.time_from = element.time_from+":00.000";
          }

          if(Splitelementtime_to.length > 2){
            if (!element.time_to.endsWith(".000")) {
              element.time_to = element.time_to+".000";
            }
          }else{
            element.time_to = element.time_to+":00.000";
          }

        });

        valuesPlanificationData['agents_hsuplementarias_'+index].map(element => {
          const Splitelementtime_from = element.time_from.split(":");
          const Splitelementtime_to = element.time_to.split(":");

          if(Splitelementtime_from.length > 2){
            if (!element.time_from.endsWith(".000")) {
              element.time_from = element.time_from+".000";
            }
          }else{
            element.time_from = element.time_from+":00.000";
          }

          if(Splitelementtime_to.length > 2){
            if (!element.time_to.endsWith(".000")) {
              element.time_to = element.time_to+".000";
            }
          }else{
            element.time_to = element.time_to+":00.000";
          }

        });
        
      }
      
    } catch (error) {
      
    }

    try {
      for (let index = 1; index < 8; index++) {
        valuesPlanificationData['shifts_'+index].map(SHIFT => {
          const selected_agents:any[] = [];
          SHIFT.selected_groups_agents.map(GA => {
            valuesPlanificationData.groupsAndAgents.map(groupsAndAgent => {
              if(groupsAndAgent.id == GA){
                selected_agents.push(groupsAndAgent.agent_id);
              }
            });
          });

          SHIFT.selected_agents = selected_agents;

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

          crear_horario_total(false, true);


          crear_horario_total(true, false);

          
          setTimeout(() => {
            valuesInfoDialogText.showProgress = false;
            router.push("/schedules/");
          }, 15000);
                          

          
        
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
    

    for (let i = 0; i < valuesPlanificationData.groupsAndAgents.length; i++) {
      try{

        if(row_id==valuesPlanificationData.groupsAndAgents[i].id){

      
          
          valuesInfoInfoAgent.dialog_title  = ""+valuesPlanificationData.groupsAndAgents[i].agents+"";

          if(valuesPlanificationData.groupsAndAgents[i].available){
            valuesInfoInfoAgent.available  = "Sí";
          }else{
            valuesInfoInfoAgent.available  = "No";

          }
          valuesInfoInfoAgent.rules_day  = valuesPlanificationData.groupsAndAgents[i].rules_day;
          valuesInfoInfoAgent.rules_hour  = valuesPlanificationData.groupsAndAgents[i].rules_hour;
          valuesInfoInfoAgent.rules_hour_from  = valuesPlanificationData.groupsAndAgents[i].rules_hour_from;
          valuesInfoInfoAgent.rules_hour_to  = valuesPlanificationData.groupsAndAgents[i].rules_hour_to;
          if(valuesPlanificationData.groupsAndAgents[i].vacaciones==1){
            valuesInfoInfoAgent.vacaciones  = "Sí";
          }else{
            valuesInfoInfoAgent.vacaciones  = "No";

          }
          if(valuesPlanificationData.groupsAndAgents[i].dias_no_disponible==1){
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
            Nueva Planificación de Horario
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableBody>
                  <TableRow>
                    <TableCell>
                        
                      <Button component='a' size='large' variant='contained' style={{background: '#ffc107', color: 'white'}} onClick={() => automaticAgents()}>
                        Asignar Agentes Automaticamente
                      </Button>
                      &nbsp;
                      <Button component='a' size='large' variant='contained' style={{background: '#dc3545', color: 'white'}} onClick={() => limpiarTodosTurnos()}>
                        Limpiar Todo
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>


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
                          {valuesPlanificationData.groupsAndAgents.map(row => (
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
                          id='hextras_observations'
                          inputProps={{ maxLength: 2000 }}
                          type='text'
                          fullWidth
                          multiline
                          inputRef={fieldRefHExtrasObs}
                          defaultValue={fieldValueHExtrasObs}
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
                          {valuesPlanificationData.groupsAndAgents.map(row => (
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
                          id='hsuplem_observations'
                          inputProps={{ maxLength: 2000 }}
                          type='text'
                          inputRef={fieldRefHSuplemenObs}
                          defaultValue={fieldValueHSuplemenObs}
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
                    <Button style={{ display: valuesInfoDialogText.showButton ? undefined : 'none' }} onClick={aceptarMaxHExtra}>Marcar como Horas Extras</Button>
                    
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModalMaxHExtra}>Cerrar</Button>
              </DialogActions>
            </Dialog>

            <form onSubmit={handleSubmitElementSchedule}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
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
                <Grid item xs={2} style={{display: 'none'}}>
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
                <Grid item xs={4}>
                  <InputLabel>Agente de Turno de velada por Orden</InputLabel>
                  <Select 
                    value = {values.turno_velada_por_orden}
                    id='turno_velada_por_orden'
                    onChange={handleChange('turno_velada_por_orden')}
                    fullWidth
                  >
                    <MenuItem value={false}>No</MenuItem>
                    <MenuItem value={true}>Sí</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel >Escoger Horario Anterior para Velada</InputLabel>
                  <Select 
                    
                    value = {values.schedule_anterior}
                    id='schedule_anterior'
                    onChange={handleChange('schedule_anterior')}
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
                  
                </Grid>
                
                <Grid item xs={4}>
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
                        <TableCell>TURNO</TableCell>
                        <TableCell colSpan={2}>
                          <br />
                          <Grid style={{ display: values.show_gferiado_1 ? undefined : 'none' }}>
                            <InputLabel >Grupo Feriado</InputLabel>
                            <Select 
                              
                              value = {values.grupo_feriado_1}
                              id='grupo_feriado_1'
                              onChange={handleChange('grupo_feriado_1')}
                              fullWidth
                              required
                            >
                              <MenuItem key={0} value={0}></MenuItem>
                              {valuesPlanificationData.groups.length > 0 ? (

                                valuesPlanificationData.groups.map((row) => (
                                  <MenuItem key={row.id} value={row.id}>{row.name} </MenuItem>

                                ))

                                ):(

                                  <MenuItem key={0} value={0}></MenuItem>

                                )}

                            </Select>                            
                          </Grid>

                          <b>LUNES</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_1}
                            id='date_day_1'
                            onChange={handleChangePlanification('date_day_1')}
                            type='date'
                            required
                          />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={2}>
                          <br />
                          <Grid style={{ display: values.show_gferiado_2 ? undefined : 'none' }}>
                            <InputLabel >Grupo Feriado</InputLabel>
                            <Select 
                              
                              value = {values.grupo_feriado_2}
                              id='grupo_feriado_2'
                              onChange={handleChange('grupo_feriado_2')}
                              fullWidth
                              required
                            >
                              <MenuItem key={0} value={0}></MenuItem>
                              {valuesPlanificationData.groups.length > 0 ? (

                                valuesPlanificationData.groups.map((row) => (
                                  <MenuItem key={row.id} value={row.id}>{row.name} </MenuItem>

                                ))

                                ):(

                                  <MenuItem key={0} value={0}></MenuItem>

                                )}

                            </Select>                            
                          </Grid>
                          <b>Martes</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_2}
                            id='date_day_2'
                            onChange={handleChangePlanification('date_day_2')}
                            type='date'
                            required
                          />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={2}>
                          <br />
                          <Grid style={{ display: values.show_gferiado_3 ? undefined : 'none' }}>
                            <InputLabel >Grupo Feriado</InputLabel>
                            <Select 
                              
                              value = {values.grupo_feriado_3}
                              id='grupo_feriado_3'
                              onChange={handleChange('grupo_feriado_3')}
                              fullWidth
                              required
                            >
                              <MenuItem key={0} value={0}></MenuItem>
                              {valuesPlanificationData.groups.length > 0 ? (

                                valuesPlanificationData.groups.map((row) => (
                                  <MenuItem key={row.id} value={row.id}>{row.name} </MenuItem>

                                ))

                                ):(

                                  <MenuItem key={0} value={0}></MenuItem>

                                )}

                            </Select>                            
                          </Grid>
                          <b>Miércoles</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_3}
                            id='date_day_3'
                            onChange={handleChangePlanification('date_day_3')}
                            type='date'
                            required
                          />
                        </TableCell>
                        <TableCell></TableCell>

                        <TableCell colSpan={2}>
                          <br />
                          <Grid style={{ display: values.show_gferiado_4 ? undefined : 'none' }}>
                            <InputLabel >Grupo Feriado</InputLabel>
                            <Select 
                              
                              value = {values.grupo_feriado_4}
                              id='grupo_feriado_4'
                              onChange={handleChange('grupo_feriado_4')}
                              fullWidth
                              required
                            >
                              <MenuItem key={0} value={0}></MenuItem>
                              {valuesPlanificationData.groups.length > 0 ? (

                                valuesPlanificationData.groups.map((row) => (
                                  <MenuItem key={row.id} value={row.id}>{row.name} </MenuItem>

                                ))

                                ):(

                                  <MenuItem key={0} value={0}></MenuItem>

                                )}

                            </Select>                            
                          </Grid>
                          <b>Jueves</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_4}
                            id='date_day_4'
                            onChange={handleChangePlanification('date_day_4')}
                            type='date'
                            required
                          />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={2}>
                          <br />
                          <Grid style={{ display: values.show_gferiado_5 ? undefined : 'none' }}>
                            <InputLabel >Grupo Feriado</InputLabel>
                            <Select 
                              
                              value = {values.grupo_feriado_5}
                              id='grupo_feriado_5'
                              onChange={handleChange('grupo_feriado_5')}
                              fullWidth
                              required
                            >
                              <MenuItem key={0} value={0}></MenuItem>
                              {valuesPlanificationData.groups.length > 0 ? (

                                valuesPlanificationData.groups.map((row) => (
                                  <MenuItem key={row.id} value={row.id}>{row.name} </MenuItem>

                                ))

                                ):(

                                  <MenuItem key={0} value={0}></MenuItem>

                                )}

                            </Select>                            
                          </Grid>
                          <b>Viernes</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_5}
                            id='date_day_5'
                            onChange={handleChangePlanification('date_day_5')}
                            type='date'
                            required
                          />
                        </TableCell>
                        <TableCell>TURNO</TableCell>
                        <TableCell colSpan={2}>
                          <br />
                          <Grid style={{ display: values.show_gferiado_6 ? undefined : 'none' }}>
                            <InputLabel >Grupo Feriado</InputLabel>
                            <Select 
                              
                              value = {values.grupo_feriado_6}
                              id='grupo_feriado_6'
                              onChange={handleChange('grupo_feriado_6')}
                              fullWidth
                              required
                            >
                              <MenuItem key={0} value={0}></MenuItem>
                              {valuesPlanificationData.groups.length > 0 ? (

                                valuesPlanificationData.groups.map((row) => (
                                  <MenuItem key={row.id} value={row.id}>{row.name} </MenuItem>

                                ))

                                ):(

                                  <MenuItem key={0} value={0}></MenuItem>

                                )}

                            </Select>                            
                          </Grid>
                          <b>Sábado</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_6}
                            id='date_day_6'
                            onChange={handleChangePlanification('date_day_6')}
                            type='date'
                            required
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <br />
                          <Grid style={{ display: values.show_gferiado_7 ? undefined : 'none' }}>
                            <InputLabel >Grupo Feriado</InputLabel>
                            <Select 
                              
                              value = {values.grupo_feriado_7}
                              id='grupo_feriado_7'
                              onChange={handleChange('grupo_feriado_7')}
                              fullWidth
                              required
                            >
                              <MenuItem key={0} value={0}></MenuItem>
                              {valuesPlanificationData.groups.length > 0 ? (

                                valuesPlanificationData.groups.map((row) => (
                                  <MenuItem key={row.id} value={row.id}>{row.name} </MenuItem>

                                ))

                                ):(

                                  <MenuItem key={0} value={0}></MenuItem>

                                )}

                            </Select>                            
                          </Grid>
                          <b>Domingo</b>
                          <br />
                          <OutlinedInput
                            value={valuesPlanificationData.date_day_7}
                            id='date_day_7'
                            onChange={handleChangePlanification('date_day_7')}
                            type='date'
                            required
                          />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {valuesPlanificationData.shifts_row.length > 0 ? (

                        

                      valuesPlanificationData.shifts_row.map((SHIFT_ROW) => (
                        <TableRow key={SHIFT_ROW.id}>

                          {
                            valuesPlanificationData.shifts_1.length > 0 ? (
                              <TableCell>
                                {
                                valuesPlanificationData.shifts_1.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid style={{backgroundColor: SHIFT_ROW_COLUMN.color}}>
                                        <b>{SHIFT_ROW_COLUMN.place_name}</b>
                                        <br />
                                        {SHIFT_ROW_COLUMN.time_from} - {SHIFT_ROW_COLUMN.time_to}
                                        <br/><b>{SHIFT_ROW_COLUMN.name}</b>
                                        {SHIFT_ROW_COLUMN.velada == 1 &&
                                          <b><br/>Velada</b>
                                        }
                                        {SHIFT_ROW_COLUMN.horas_extras == 1 &&
                                          <b><br/>Horas Extras</b>
                                        }
                                        {SHIFT_ROW_COLUMN.soporte == 1 &&
                                          <b><br/>Cuenta de Soporte</b>
                                        }
                                      </Grid>

                                ))
                                }
                              </TableCell>
                            ):
                            (
                              <TableCell></TableCell>
                            )
                          }
                          
                          {
                            /************** SHIFTS NUMEROS LUNES************* */
                            valuesPlanificationData.shifts_1.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_1.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid>
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          readOnly={true} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_necesarios_1'}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_necesarios', 1 ,SHIFT_ROW_COLUMN.id+'agentes_necesarios_1')}
                                          type='number'
                                          value={SHIFT_ROW_COLUMN.num_agentes_necesarios}
                                          fullWidth
                                        />
                                        <br />Sugeridos:<br />
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_1'}
                                          name={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_1'}
                                          value={SHIFT_ROW_COLUMN.num_agentes_sugeridos}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_sugeridos', 1 , SHIFT_ROW_COLUMN.id+'agentes_sugeridos_1')}
                                          type='number'
                                          fullWidth
                                        />
                                      </Grid>
  
  
                                  ))

                                }
                              </TableCell>
                              
                            ):(
                                <TableCell></TableCell>
                            )
                          }
                          {
                            /************** SHIFTS SELECT AGENTES LUNES************* */
                            valuesPlanificationData.shifts_1.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_1.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                    <Grid>
                                      <Select 
                                        fullWidth
                                        multiple
                                        id={SHIFT_ROW_COLUMN.id+"_groups_agents_1"}
                                        value={SHIFT_ROW_COLUMN.selected_groups_agents}
                                        onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', 1 , SHIFT_ROW_COLUMN.id+'_groups_agents_1')}
                                        renderValue={(selected) => (
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                              valuesPlanificationData.groupsAndAgents.map(rowElement => (
  
                                                rowElement.id == value &&
                                                <Chip className={"CHIP_"+rowElement.id} id={"1_CHIP_"+rowElement.id} label={rowElement.name} />
                                                  
                                                
            
                                                
                                                  
                                                
                                                ))
                                            ))}
                                          </Box>
                                        )}
                                        MenuProps={MenuProps}
                                        >
                                        {valuesPlanificationData.groupsAndAgents.map(row => (
                                          (((row.place_id == SHIFT_ROW_COLUMN.place) || row.place_id==0) && SHIFT_ROW_COLUMN.type_of_agents_id.includes(row.type_of_agent_id)) &&
                                          <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>
  
                                          ))}
                                      </Select>
                                    </Grid>
  
                                  ))

                                }
                              </TableCell>
                              
                            ):(
                              <TableCell></TableCell>
                            )
                          }

                          {
                            (valuesPlanificationData.shifts_2.length > 0 )  ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_2.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid style={{backgroundColor: SHIFT_ROW_COLUMN.color}}>
                                        <b>{SHIFT_ROW_COLUMN.place_name}</b>
                                        <br />
                                        {SHIFT_ROW_COLUMN.time_from} - {SHIFT_ROW_COLUMN.time_to}
                                        <br/><b>{SHIFT_ROW_COLUMN.name}</b>
                                        {SHIFT_ROW_COLUMN.velada == 1 &&
                                          <b><br/>Velada</b>
                                        }
                                        {SHIFT_ROW_COLUMN.horas_extras == 1 &&
                                          <b><br/>Horas Extras</b>
                                        }
                                        {SHIFT_ROW_COLUMN.soporte == 1 &&
                                          <b><br/>Cuenta de Soporte</b>
                                        }
                                      </Grid>
  
                                  ))

                                }
                              </TableCell>
                              
                            ):
                            (
                              <TableCell></TableCell>
                            )
                          }




                          {
                            /************** SHIFTS NUMEROS MARTES************* */
                            valuesPlanificationData.shifts_2.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_2.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid>
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          readOnly={true} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_necesarios_2'}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_necesarios', 2 ,SHIFT_ROW_COLUMN.id+'agentes_necesarios_2')}
                                          type='number'
                                          value={SHIFT_ROW_COLUMN.num_agentes_necesarios}
                                          fullWidth
                                        />
                                        <br />Sugeridos:<br />
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_2'}
                                          name={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_2'}
                                          value={SHIFT_ROW_COLUMN.num_agentes_sugeridos}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_sugeridos', 2 , SHIFT_ROW_COLUMN.id+'agentes_sugeridos_2')}
                                          type='number'
                                          fullWidth
                                        />
                                      </Grid>
  
  
                                  ))

                                }
                              </TableCell>
                              
                            ):(
                                <TableCell></TableCell>
                            )
                          }
                          {
                            /************** SHIFTS SELECT AGENTES MARTES ************* */
                            valuesPlanificationData.shifts_2.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_2.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                    <Grid>
                                      <Select 
                                        fullWidth
                                        multiple
                                        id={SHIFT_ROW_COLUMN.id+"_groups_agents_2"}
                                        value={SHIFT_ROW_COLUMN.selected_groups_agents}
                                        onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', 2 , SHIFT_ROW_COLUMN.id+'_groups_agents_2')}
                                        renderValue={(selected) => (
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                              valuesPlanificationData.groupsAndAgents.map(rowElement => (
  
                                                rowElement.id == value &&
                                                <Chip className={"CHIP_"+rowElement.id} id={"2_CHIP_"+rowElement.id} label={rowElement.name} />
                                                  
                                                
            
                                                
                                                  
                                                
                                                ))
                                            ))}
                                          </Box>
                                        )}
                                        MenuProps={MenuProps}
                                        >
                                        {valuesPlanificationData.groupsAndAgents.map(row => (
                                          (((row.place_id == SHIFT_ROW_COLUMN.place) || row.place_id==0) && SHIFT_ROW_COLUMN.type_of_agents_id.includes(row.type_of_agent_id)) &&
                                          <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>
  
                                          ))}
                                      </Select>
                                    </Grid>
  
                                  ))

                                }
                              </TableCell>
                              
                            ):(
                              <TableCell></TableCell>
                            )
                          }

                          {
                            (valuesPlanificationData.shifts_3.length > 0 )  ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_3.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid style={{backgroundColor: SHIFT_ROW_COLUMN.color}}>
                                        <b>{SHIFT_ROW_COLUMN.place_name}</b>
                                        <br />
                                        {SHIFT_ROW_COLUMN.time_from} - {SHIFT_ROW_COLUMN.time_to}
                                        <br/><b>{SHIFT_ROW_COLUMN.name}</b>
                                        {SHIFT_ROW_COLUMN.velada == 1 &&
                                          <b><br/>Velada</b>
                                        }
                                        {SHIFT_ROW_COLUMN.horas_extras == 1 &&
                                          <b><br/>Horas Extras</b>
                                        }
                                        {SHIFT_ROW_COLUMN.soporte == 1 &&
                                          <b><br/>Cuenta de Soporte</b>
                                        }
                                      </Grid>
  
                                  ))

                                }
                              </TableCell>
                              
                            ):
                            (
                              <TableCell></TableCell>
                            )
                          }



                          {
                            /************** SHIFTS NUMEROS MIERCOLES ************* */
                            valuesPlanificationData.shifts_3.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_3.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid>
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          readOnly={true} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_necesarios_3'}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_necesarios', 3 ,SHIFT_ROW_COLUMN.id+'agentes_necesarios_3')}
                                          type='number'
                                          value={SHIFT_ROW_COLUMN.num_agentes_necesarios}
                                          fullWidth
                                        />
                                        <br />Sugeridos:<br />
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_3'}
                                          name={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_3'}
                                          value={SHIFT_ROW_COLUMN.num_agentes_sugeridos}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_sugeridos', 3 , SHIFT_ROW_COLUMN.id+'agentes_sugeridos_3')}
                                          type='number'
                                          fullWidth
                                        />
                                      </Grid>
  
  
                                  ))

                                }
                              </TableCell>

                              
                            ):(
                                <TableCell></TableCell>
                            )
                          }
                          {
                            /************** SHIFTS SELECT AGENTES MIERCOLES ************* */
                            valuesPlanificationData.shifts_3.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_3.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                    <Grid>
                                      <Select 
                                        fullWidth
                                        multiple
                                        id={SHIFT_ROW_COLUMN.id+"_groups_agents_3"}
                                        value={SHIFT_ROW_COLUMN.selected_groups_agents}
                                        onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', 3 , SHIFT_ROW_COLUMN.id+'_groups_agents_3')}
                                        renderValue={(selected) => (
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                              valuesPlanificationData.groupsAndAgents.map(rowElement => (
  
                                                rowElement.id == value &&
                                                <Chip className={"CHIP_"+rowElement.id} id={"3_CHIP_"+rowElement.id} label={rowElement.name} />
                                                  
                                                
            
                                                
                                                  
                                                
                                                ))
                                            ))}
                                          </Box>
                                        )}
                                        MenuProps={MenuProps}
                                        >
                                        {valuesPlanificationData.groupsAndAgents.map(row => (
                                          (((row.place_id == SHIFT_ROW_COLUMN.place) || row.place_id==0) && SHIFT_ROW_COLUMN.type_of_agents_id.includes(row.type_of_agent_id)) &&
                                          <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>
  
                                          ))}
                                      </Select>
                                    </Grid>
  
                                  ))

                                }
                              </TableCell>
                              
                            ):(
                              <TableCell></TableCell>
                            )
                          }

                          {
                            (valuesPlanificationData.shifts_4.length > 0 )  ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_4.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid style={{backgroundColor: SHIFT_ROW_COLUMN.color}}>
                                        <b>{SHIFT_ROW_COLUMN.place_name}</b>
                                        <br />
                                        {SHIFT_ROW_COLUMN.time_from} - {SHIFT_ROW_COLUMN.time_to}
                                        <br/><b>{SHIFT_ROW_COLUMN.name}</b>
                                        {SHIFT_ROW_COLUMN.velada == 1 &&
                                          <b><br/>Velada</b>
                                        }
                                        {SHIFT_ROW_COLUMN.horas_extras == 1 &&
                                          <b><br/>Horas Extras</b>
                                        }
                                        {SHIFT_ROW_COLUMN.soporte == 1 &&
                                          <b><br/>Cuenta de Soporte</b>
                                        }
                                      </Grid>
  
                                  ))

                                }
                              </TableCell>
                              
                            ):
                            (
                              <TableCell></TableCell>
                            )
                          }




                          {
                            /************** SHIFTS NUMEROS JUEVES ************* */
                            valuesPlanificationData.shifts_4.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_4.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid>
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          readOnly={true} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_necesarios_4'}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_necesarios', 4 ,SHIFT_ROW_COLUMN.id+'agentes_necesarios_4')}
                                          type='number'
                                          value={SHIFT_ROW_COLUMN.num_agentes_necesarios}
                                          fullWidth
                                        />
                                        <br />Sugeridos:<br />
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_4'}
                                          name={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_4'}
                                          value={SHIFT_ROW_COLUMN.num_agentes_sugeridos}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_sugeridos', 4 , SHIFT_ROW_COLUMN.id+'agentes_sugeridos_4')}
                                          type='number'
                                          fullWidth
                                        />
                                      </Grid>
  
  
                                  ))

                                }
                              </TableCell>

                              
                            ):(
                                <TableCell></TableCell>
                            )
                          }
                          {
                            /************** SHIFTS SELECT AGENTES JUEVES ************* */
                            valuesPlanificationData.shifts_4.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_4.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                    <Grid>
                                      <Select 
                                        fullWidth
                                        multiple
                                        id={SHIFT_ROW_COLUMN.id+"_groups_agents_4"}
                                        value={SHIFT_ROW_COLUMN.selected_groups_agents}
                                        onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', 4 , SHIFT_ROW_COLUMN.id+'_groups_agents_4')}
                                        renderValue={(selected) => (
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                              valuesPlanificationData.groupsAndAgents.map(rowElement => (
  
                                                rowElement.id == value &&
                                                <Chip className={"CHIP_"+rowElement.id} id={"4_CHIP_"+rowElement.id} label={rowElement.name} />
                                                  
                                                
            
                                                
                                                  
                                                
                                                ))
                                            ))}
                                          </Box>
                                        )}
                                        MenuProps={MenuProps}
                                        >
                                        {valuesPlanificationData.groupsAndAgents.map(row => (
                                          (((row.place_id == SHIFT_ROW_COLUMN.place) || row.place_id==0) && SHIFT_ROW_COLUMN.type_of_agents_id.includes(row.type_of_agent_id)) &&
                                          <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>
  
                                          ))}
                                      </Select>
                                    </Grid>
  
                                  ))

                                }
                              </TableCell>
                              
                            ):(
                              <TableCell></TableCell>
                            )
                          }

                          {
                            (valuesPlanificationData.shifts_5.length > 0 )  ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_5.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid style={{backgroundColor: SHIFT_ROW_COLUMN.color}}>
                                        <b>{SHIFT_ROW_COLUMN.place_name}</b>
                                        <br />
                                        {SHIFT_ROW_COLUMN.time_from} - {SHIFT_ROW_COLUMN.time_to}
                                        <br/><b>{SHIFT_ROW_COLUMN.name}</b>
                                        {SHIFT_ROW_COLUMN.velada == 1 &&
                                          <b><br/>Velada</b>
                                        }
                                        {SHIFT_ROW_COLUMN.horas_extras == 1 &&
                                          <b><br/>Horas Extras</b>
                                        }
                                        {SHIFT_ROW_COLUMN.soporte == 1 &&
                                          <b><br/>Cuenta de Soporte</b>
                                        }
                                      </Grid>
  
                                  ))

                                }
                              </TableCell>
                              
                            ):
                            (
                              <TableCell></TableCell>
                            )
                          }


                          {
                            /************** SHIFTS NUMEROS VIERNES ************* */
                            valuesPlanificationData.shifts_5.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_5.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid>
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          readOnly={true} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_necesarios_5'}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_necesarios', 5 ,SHIFT_ROW_COLUMN.id+'agentes_necesarios_5')}
                                          type='number'
                                          value={SHIFT_ROW_COLUMN.num_agentes_necesarios}
                                          fullWidth
                                        />
                                        <br />Sugeridos:<br />
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_5'}
                                          name={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_5'}
                                          value={SHIFT_ROW_COLUMN.num_agentes_sugeridos}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_sugeridos', 5 , SHIFT_ROW_COLUMN.id+'agentes_sugeridos_5')}
                                          type='number'
                                          fullWidth
                                        />
                                      </Grid>
  
  
                                  ))



                                }
                              </TableCell>

                              
                            ):(
                                <TableCell></TableCell>
                            )
                          }
                          {
                            /************** SHIFTS SELECT AGENTES VIERNES ************* */
                            valuesPlanificationData.shifts_5.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_5.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                    <Grid>
                                      <Select 
                                        fullWidth
                                        multiple
                                        id={SHIFT_ROW_COLUMN.id+"_groups_agents_5"}
                                        value={SHIFT_ROW_COLUMN.selected_groups_agents}
                                        onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', 5 , SHIFT_ROW_COLUMN.id+'_groups_agents_5')}
                                        renderValue={(selected) => (
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                              valuesPlanificationData.groupsAndAgents.map(rowElement => (
  
                                                rowElement.id == value &&
                                                <Chip className={"CHIP_"+rowElement.id} id={"5_CHIP_"+rowElement.id} label={rowElement.name} />
                                                  
                                                
            
                                                
                                                  
                                                
                                                ))
                                            ))}
                                          </Box>
                                        )}
                                        MenuProps={MenuProps}
                                        >
                                        {valuesPlanificationData.groupsAndAgents.map(row => (
                                          (((row.place_id == SHIFT_ROW_COLUMN.place) || row.place_id==0) && SHIFT_ROW_COLUMN.type_of_agents_id.includes(row.type_of_agent_id)) &&
                                          <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>
  
                                          ))}
                                      </Select>
                                    </Grid>
  
                                  ))

                                }
                              </TableCell>
                              
                            ):(
                              <TableCell></TableCell>
                            )
                          }




                          {
                            /************** SHIFTS TIMES SABADOS Y DOMINGOS ************* */
                            valuesPlanificationData.shifts_6.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_6.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid style={{backgroundColor: SHIFT_ROW_COLUMN.color}}>
                                        <b>{SHIFT_ROW_COLUMN.place_name}</b>
                                        <br />
                                        {SHIFT_ROW_COLUMN.time_from} - {SHIFT_ROW_COLUMN.time_to}
                                        <br/><b>{SHIFT_ROW_COLUMN.name}</b>
                                        {SHIFT_ROW_COLUMN.velada == 1 &&
                                          <b><br/>Velada</b>
                                        }
                                        {SHIFT_ROW_COLUMN.horas_extras == 1 &&
                                          <b><br/>Horas Extras</b>
                                        }
                                        {SHIFT_ROW_COLUMN.soporte == 1 &&
                                          <b><br/>Cuenta de Soporte</b>
                                        }
                                      </Grid>
  
                                  ))

                                }
                              </TableCell>

                              
                            ):
                            (
                              <TableCell></TableCell>
                            )
                          }






                          {
                            /************** SHIFTS NUMEROS SABADOS  ************* */
                            valuesPlanificationData.shifts_6.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_6.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid>
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          readOnly={true} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_necesarios_6'}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_necesarios', 6 ,SHIFT_ROW_COLUMN.id+'agentes_necesarios_6')}
                                          type='number'
                                          value={SHIFT_ROW_COLUMN.num_agentes_necesarios}
                                          fullWidth
                                        />
                                        <br />Sugeridos:<br />
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_6'}
                                          name={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_6'}
                                          value={SHIFT_ROW_COLUMN.num_agentes_sugeridos}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_sugeridos', 6 , SHIFT_ROW_COLUMN.id+'agentes_sugeridos_6')}
                                          type='number'
                                          fullWidth
                                        />
                                      </Grid>
  
  
                                  ))

                                }
                              </TableCell>

                              
                            ):(
                                <TableCell></TableCell>
                            )
                          }
                          {
                            /************** SHIFTS SELECT AGENTES SABADOS ************* */
                            valuesPlanificationData.shifts_6.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_6.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                    <Grid>
                                      <Select 
                                        fullWidth
                                        multiple
                                        id={SHIFT_ROW_COLUMN.id+"_groups_agents_6"}
                                        value={SHIFT_ROW_COLUMN.selected_groups_agents}
                                        onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', 6 , SHIFT_ROW_COLUMN.id+'_groups_agents_6')}
                                        renderValue={(selected) => (
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                              valuesPlanificationData.groupsAndAgents.map(rowElement => (
  
                                                rowElement.id == value &&
                                                <Chip className={"CHIP_"+rowElement.id} id={"6_CHIP_"+rowElement.id} label={rowElement.name} />
                                                  
                                                
            
                                                
                                                  
                                                
                                                ))
                                            ))}
                                          </Box>
                                        )}
                                        MenuProps={MenuProps}
                                        >
                                        {valuesPlanificationData.groupsAndAgents.map(row => (
                                          (((row.place_id == SHIFT_ROW_COLUMN.place) || row.place_id==0) && SHIFT_ROW_COLUMN.type_of_agents_id.includes(row.type_of_agent_id)) &&
                                          <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>
  
                                          ))}
                                      </Select>
                                    </Grid>
  
                                  ))

                                }
                              </TableCell>
                              
                            ):(
                              <TableCell></TableCell>
                            )
                          }





                          {
                            /************** SHIFTS NUMEROS DOMINGOS  ************* */
                            valuesPlanificationData.shifts_7.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_7.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                      <Grid>
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          readOnly={true} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_necesarios_7'}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_necesarios', 7 ,SHIFT_ROW_COLUMN.id+'agentes_necesarios_7')}
                                          type='number'
                                          value={SHIFT_ROW_COLUMN.num_agentes_necesarios}
                                          fullWidth
                                        />
                                        <br />Sugeridos:<br />
                                        <OutlinedInput
                                          style={{width: 60 + 'px'}} 
                                          id={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_7'}
                                          name={SHIFT_ROW_COLUMN.id+'agentes_sugeridos_7'}
                                          value={SHIFT_ROW_COLUMN.num_agentes_sugeridos}
                                          onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'num_agentes_sugeridos', 7 , SHIFT_ROW_COLUMN.id+'agentes_sugeridos_7')}
                                          type='number'
                                          fullWidth
                                        />
                                      </Grid>
  
  
                                  ))

                                }
                              </TableCell>

                              
                            ):(
                                <TableCell></TableCell>
                            )
                          }
                          {
                            /************** SHIFTS SELECT AGENTES DOMINGOS ************* */
                            valuesPlanificationData.shifts_7.length > 0 ? (
                              <TableCell>
                                {
                                  valuesPlanificationData.shifts_7.map((SHIFT_ROW_COLUMN) => (
                                    (SHIFT_ROW.id == SHIFT_ROW_COLUMN.id || SHIFT_ROW.position_row == SHIFT_ROW_COLUMN.position_row) &&
                                    <Grid>
                                      <Select 
                                        fullWidth
                                        multiple
                                        id={SHIFT_ROW_COLUMN.id+"_groups_agents_7"}
                                        value={SHIFT_ROW_COLUMN.selected_groups_agents}
                                        onChange={handleChangeTurnos(SHIFT_ROW_COLUMN.id, 'selected_groups_agents', 7 , SHIFT_ROW_COLUMN.id+'_groups_agents_7')}
                                        renderValue={(selected) => (
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                              valuesPlanificationData.groupsAndAgents.map(rowElement => (
  
                                                rowElement.id == value &&
                                                <Chip className={"CHIP_"+rowElement.id} id={"7_CHIP_"+rowElement.id} label={rowElement.name} />
                                                  
                                                
            
                                                
                                                  
                                                
                                                ))
                                            ))}
                                          </Box>
                                        )}
                                        MenuProps={MenuProps}
                                        >
                                        {valuesPlanificationData.groupsAndAgents.map(row => (
                                          (((row.place_id == SHIFT_ROW_COLUMN.place) || row.place_id==0) && SHIFT_ROW_COLUMN.type_of_agents_id.includes(row.type_of_agent_id)) &&
                                          <MenuItem key={row.id} value={row.id}>{row.name} - {row.agents} </MenuItem>
  
                                          ))}
                                      </Select>
                                    </Grid>
  
                                  ))

                                }
                              </TableCell>
                              
                            ):(
                              <TableCell></TableCell>
                            )
                          }

                          
                        </TableRow>

                      ))

                      ):(
                        <TableRow>
                          <TableCell></TableCell>
                        </TableRow>

                          


                      )}
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
                                  valuesPlanificationData.groupsAndAgents.map(rowElement => (

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
                        <TableCell colSpan={3}>
                          <Select 
                            fullWidth
                            multiple
                            id={"agents_descansa_2"}
                            value={valuesPlanificationData.agents_descansa_2}
                            onChange={handleChangeDescansan( 'agents_descansa_2', 2 ,'agents_descansa_2')}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  valuesPlanificationData.groupsAndAgents.map(rowElement => (

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
                        <TableCell colSpan={3}>
                          <Select 
                            fullWidth
                            multiple
                            id={"agents_descansa_3"}
                            value={valuesPlanificationData.agents_descansa_3}
                            onChange={handleChangeDescansan( 'agents_descansa_3', 3 ,'agents_descansa_3')}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  valuesPlanificationData.groupsAndAgents.map(rowElement => (

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
                        <TableCell colSpan={3}>
                          <Select 
                            fullWidth
                            multiple
                            id={"agents_descansa_4"}
                            value={valuesPlanificationData.agents_descansa_4}
                            onChange={handleChangeDescansan( 'agents_descansa_4', 4 ,'agents_descansa_4')}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  valuesPlanificationData.groupsAndAgents.map(rowElement => (

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
                        <TableCell colSpan={3}>
                          <Select 
                            fullWidth
                            multiple
                            id={"agents_descansa_5"}
                            value={valuesPlanificationData.agents_descansa_5}
                            onChange={handleChangeDescansan( 'agents_descansa_5', 5 ,'agents_descansa_5')}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  valuesPlanificationData.groupsAndAgents.map(rowElement => (

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
                        <TableCell>DESCANSAN</TableCell>
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
                                  valuesPlanificationData.groupsAndAgents.map(rowElement => (

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
                                  valuesPlanificationData.groupsAndAgents.map(rowElement => (

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
                        <TableCell><b># TRABAJAN</b></TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.date_day_1_total_trabajan}

                        </TableCell>
                        <TableCell colSpan={3}>
                          { valuesPlanificationData.date_day_2_total_trabajan}

                        </TableCell>
                        <TableCell colSpan={3}>
                          {valuesPlanificationData.date_day_3_total_trabajan}

                        </TableCell>
                        <TableCell colSpan={3}>
                          { valuesPlanificationData.date_day_4_total_trabajan}

                        </TableCell>
                        <TableCell colSpan={3}>
                          { valuesPlanificationData.date_day_5_total_trabajan}

                        </TableCell>
                        
                        <TableCell><b># TRABAJAN</b></TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.date_day_6_total_trabajan}

                        </TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.date_day_7_total_trabajan}

                        </TableCell>

                      </TableRow>
                      <TableRow>
                        <TableCell><b># DESCANSAN</b></TableCell>
                        <TableCell colSpan={2}>
                          { valuesPlanificationData.agents_descansa_1.length}

                        </TableCell>
                        <TableCell colSpan={3}>
                          { valuesPlanificationData.agents_descansa_2.length}

                        </TableCell>
                        <TableCell colSpan={3}>
                          { valuesPlanificationData.agents_descansa_3.length}

                        </TableCell>
                        <TableCell colSpan={3}>
                          { valuesPlanificationData.agents_descansa_4.length}

                        </TableCell>
                        <TableCell colSpan={3}>
                          { valuesPlanificationData.agents_descansa_5.length}

                        </TableCell>
                        
                        <TableCell><b># DESCANSAN</b></TableCell>
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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 1)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={3}>
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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 2)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={3}>
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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 3)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={3}>
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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 4)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={3}>
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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHSuplem(rowElement.id, 5)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell>H. SUPLEMENTARIAS</TableCell>
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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 1)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>
                          

                        </TableCell>
                        <TableCell colSpan={3}>
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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 2)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={3}>
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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 3)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={3}>
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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 4)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell colSpan={3}>
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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

                                rowElement.id == value.selected_groups_agents &&
                                <Chip onClick={()=>editHExtras(rowElement.id, 5)} className={"CHIP_"+rowElement.id} label={rowElement.name} />

                                ))
                            ))}
                          </Box>

                        </TableCell>
                        <TableCell>H. EXTRAS</TableCell>
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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

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
                              valuesPlanificationData.groupsAndAgents.map(rowElement => (

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
                                      {valuesPlanificationData.groupsAndAgents.map(row => (
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
                                      {valuesPlanificationData.groupsAndAgents.map(row => (
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
                                      {valuesPlanificationData.groupsAndAgents.map(row => (
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
                                      {valuesPlanificationData.groupsAndAgents.map(row => (
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
                    Crear HORARIO
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
                    {valuesPlanificationData.vacationAgents
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
                    {valuesPlanificationData.unavailableDateAgents
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
            <br />
            <br />
            <Grid item xs={12}>
              <Typography variant='h5'>
                Grupos y Agentes:
              </Typography>
            </Grid>
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
            <Grid item xs={12}>  
              {valuesPlanificationData.groups.sort((a,b) => a.order - b.order)
                .map((rowGroup) => {
                  return (
                    <Grid item xs={12} key={rowGroup.id}>
                      <Accordion>
                        <AccordionSummary
                          aria-controls="panel2a-content"
                        >
                          <Typography>{rowGroup.name}</Typography>

                          
                        </AccordionSummary>
                        <AccordionDetails>
                        <Card> 
                        <Grid container spacing={5}>
                            <Grid item xs={8}>
                              <InputLabel >Orden / Prioridad del GRUPO</InputLabel>
                              <OutlinedInput
                                value={rowGroup.order}
                                id= {rowGroup.id+'order'}
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'order', rowGroup.id+'order')}
                                type='number'
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <InputLabel >Feriados</InputLabel>
                              <Select 
                                value = {rowGroup.holiday}
                                id= {rowGroup.id+'holiday'}
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'holiday', rowGroup.id+'holiday')}
                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Lunes</InputLabel>
                              <Select 
                                value = {rowGroup.monday}
                                id= {rowGroup.id+'monday'}
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'monday', rowGroup.id+'monday')}
                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Martes</InputLabel>
                              <Select 
                                value = {rowGroup.tuesday}
                                id= {rowGroup.id+'tuesday'}
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'tuesday', rowGroup.id+'tuesday')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Miércoles</InputLabel>
                              <Select 
                                value = {rowGroup.wednesday}
                                id= {rowGroup.id+'wednesday'}
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'wednesday', rowGroup.id+'wednesday')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Jueves</InputLabel>
                              <Select 
                                value = {rowGroup.thursday}
                                id= {rowGroup.id+'thursday'}
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'thursday', rowGroup.id+'thursday')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Viernes</InputLabel>
                              <Select 
                                value = {rowGroup.friday}
                                id= {rowGroup.id+'friday'}
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'friday', rowGroup.id+'friday')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Sábado</InputLabel>
                              <Select 
                                value = {rowGroup.saturday}
                                id= {rowGroup.id+'saturday'}
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'saturday', rowGroup.id+'saturday')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Domingo</InputLabel>
                              <Select 
                                value = {rowGroup.sunday}
                                id= {rowGroup.id+'sunday'}
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'sunday', rowGroup.id+'sunday')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            

                            <Grid item xs={1.7}>
                              <InputLabel >Orden Prioridad / Lunes</InputLabel>
                              <OutlinedInput
                                
                                value={rowGroup.monday_order}
                                id='monday_order'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'monday_order', rowGroup.id+'monday_order')}

                                type='number'
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Orden Prioridad / Martes</InputLabel>
                              <OutlinedInput
                                
                                value={rowGroup.tuesday_order}
                                id='tuesday_order'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'tuesday_order', rowGroup.id+'tuesday_order')}

                                type='number'
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Orden Prioridad / Miércoles</InputLabel>
                              <OutlinedInput
                                
                                value={rowGroup.wednesday_order}
                                id='wednesday_order'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'wednesday_order', rowGroup.id+'wednesday_order')}

                                type='number'
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Orden Prioridad / Jueves</InputLabel>
                              <OutlinedInput
                                
                                value={rowGroup.thursday_order}
                                id='thursday_order'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'thursday_order', rowGroup.id+'thursday_order')}

                                type='number'
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Orden Prioridad / Viernes</InputLabel>
                              <OutlinedInput
                                
                                value={rowGroup.friday_order}
                                id='friday_order'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'friday_order', rowGroup.id+'friday_order')}

                                type='number'
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Orden Prioridad / Sábado</InputLabel>
                              <OutlinedInput
                                
                                value={rowGroup.saturday_order}
                                id='saturday_order'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'saturday_order', rowGroup.id+'saturday_order')}

                                type='number'
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Orden Prioridad / Domingo</InputLabel>
                              <OutlinedInput
                                
                                value={rowGroup.sunday_order}
                                id='sunday_order'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'sunday_order', rowGroup.id+'sunday_order')}

                                type='number'
                                fullWidth
                                required
                              />
                            </Grid>

                            <Grid item xs={1.7}>
                              <InputLabel >Ver Lunes Descansan</InputLabel>
                              <Select 
                                value = {rowGroup.view_monday_rest}
                                id='view_monday_rest'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'view_monday_rest', rowGroup.id+'view_monday_rest')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Ver Martes Descansan</InputLabel>
                              <Select 
                                value = {rowGroup.view_tuesday_rest}
                                id='view_tuesday_rest'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'view_tuesday_rest', rowGroup.id+'view_tuesday_rest')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Ver Miércoles Descansan</InputLabel>
                              <Select 
                                value = {rowGroup.view_wednesday_rest}
                                id='view_wednesday_rest'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'view_wednesday_rest', rowGroup.id+'view_wednesday_rest')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Ver Jueves Descansan</InputLabel>
                              <Select 
                                value = {rowGroup.view_thursday_rest}
                                id='view_thursday_rest'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'view_thursday_rest', rowGroup.id+'view_thursday_rest')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Ver Viernes Descansan</InputLabel>
                              <Select 
                                value = {rowGroup.view_friday_rest}
                                id='view_friday_rest'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'view_friday_rest', rowGroup.id+'view_friday_rest')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Ver Sábado Descansan</InputLabel>
                              <Select 
                                value = {rowGroup.view_saturday_rest}
                                id='view_saturday_rest'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'view_saturday_rest', rowGroup.id+'view_saturday_rest')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1.7}>
                              <InputLabel >Ver Domingo Descansan</InputLabel>
                              <Select 
                                value = {rowGroup.view_sunday_rest}
                                id='view_sunday_rest'
                                onChange={handleChangePlanificationGroups(rowGroup.id, 'view_sunday_rest', rowGroup.id+'view_sunday_rest')}

                                fullWidth
                              >
                                <MenuItem value={true}>Sí</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </Grid>





                          
                          </Grid>
                          <Table aria-label='simple table'>
                            <TableHead>
                              <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Agente</TableCell>
                                <TableCell>L</TableCell>
                                <TableCell>M</TableCell>
                                <TableCell>X</TableCell>
                                <TableCell>J</TableCell>
                                <TableCell>V</TableCell>
                                <TableCell>S</TableCell>
                                <TableCell>D</TableCell>
                                <TableCell>T</TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {valuesPlanificationData.groupsAndAgents.sort((a,b) => a.rules_day_order - b.rules_day_order || a.rules_hour_order - b.rules_hour_order || a.order - b.order).map(row => (
                                
                                
                                row.group_id == rowGroup.id &&
                                  <TableRow key={row.id}  id={"AGENTE_"+row.id}>
                                    <TableCell>
                                      <Button variant="outlined"  onClick={e => findChip(row.id)} sx={{ px: 5.5 }}>
                                        {row.name}
                                      </Button>
                                    </TableCell>
                                    <TableCell id={"NOMBRE_AGENTE_"+row.id}>
                                      {row.agents}
                                      <br />
                                      {row.type_of_agent_name}
                                    </TableCell>

                                    <TableCell id={"L_"+row.id}>{row.total_dia_1}</TableCell>
                                    <TableCell id={"M_"+row.id}>{row.total_dia_2}</TableCell>
                                    <TableCell id={"X_"+row.id}>{row.total_dia_3}</TableCell>
                                    <TableCell id={"J_"+row.id}>{row.total_dia_4}</TableCell>
                                    <TableCell id={"V_"+row.id}>{row.total_dia_5}</TableCell>
                                    <TableCell id={"S_"+row.id}>{row.total_dia_6}</TableCell>
                                    <TableCell id={"D_"+row.id}>{row.total_dia_7}</TableCell>
                                    <TableCell id={"T_"+row.id}>{(row.total_dia_1+row.total_dia_2+row.total_dia_3+row.total_dia_4+row.total_dia_5+row.total_dia_6+row.total_dia_7)}</TableCell>
                                    <TableCell>
                                      <Button variant="outlined" onClick={e => ver_info_agente(row.id)}>
                                        INFO
                                      </Button>
                                    </TableCell>

                                  </TableRow>
                              
                              
                              ))}
                            </TableBody>
                          </Table>
                        </Card>
                        </AccordionDetails>
                      </Accordion>
                      <br />
                      
                    </Grid>
                    
                  );
                })}
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



  const resScheduleAnterior = await fetch(StrapiUrl+"schedules?populate=%2A&filters[production]=false&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado+"&sort[0]=date_from%3Adesc");
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
            holiday: true,
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

        let type_of_agent_id = 0;
        let type_of_agent_name = '';

       

       


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

        try{
          if(agent_id>0){
            const resDataAgent = await fetch(StrapiUrl+"agents/"+agent_id+"?populate=%2A");
            const responseDataAgent= await resDataAgent.json();
  
            type_of_agent_id= responseDataAgent.data.attributes.type_of_agent.data.id;
            type_of_agent_name= responseDataAgent.data.attributes.type_of_agent.data.attributes.name;
  
          }
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
              place_id: row.attributes.place ? row.attributes.place.data.id : 0,
              type_of_agent_id:type_of_agent_id,
              type_of_agent_name:type_of_agent_name,
              place_name: row.attributes.place ? row.attributes.place.data.attributes.name : '',
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

              vacaciones_1: 0,
              vacaciones_2: 0,
              vacaciones_3: 0,
              vacaciones_4: 0,
              vacaciones_5: 0,
              vacaciones_6: 0,
              vacaciones_7: 0,


              dias_no_disponible_1: 0,
              dias_no_disponible_2: 0,
              dias_no_disponible_3: 0,
              dias_no_disponible_4: 0,
              dias_no_disponible_5: 0,
              dias_no_disponible_6: 0,
              dias_no_disponible_7: 0,

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

  


  

  const date_day_1_value = retornarFechaDeLaSemanaActual(1);
  const date_day_2_value = retornarFechaDeLaSemanaActual(2);
  const date_day_3_value = retornarFechaDeLaSemanaActual(3);
  const date_day_4_value = retornarFechaDeLaSemanaActual(4);
  const date_day_5_value = retornarFechaDeLaSemanaActual(5);
  const date_day_6_value = retornarFechaDeLaSemanaActual(6);
  const date_day_7_value = retornarFechaDeLaSemanaActual(7);



  const vacationAgents: VacationAgents[]=[];
  const unavailableDateAgents: UnavailableDateAgentsData[]=[];

  const planificationData: PlanificationData={ 
    date_day_1: date_day_1_value.getFullYear()+'-'+('0'+(date_day_1_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_1_value.getDate()).slice(-2) , 
    date_day_2: date_day_2_value.getFullYear()+'-'+('0'+(date_day_2_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_2_value.getDate()).slice(-2) ,
    date_day_3: date_day_3_value.getFullYear()+'-'+('0'+(date_day_3_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_3_value.getDate()).slice(-2) ,
    date_day_4: date_day_4_value.getFullYear()+'-'+('0'+(date_day_4_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_4_value.getDate()).slice(-2) ,
    date_day_5: date_day_5_value.getFullYear()+'-'+('0'+(date_day_5_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_5_value.getDate()).slice(-2) ,
    date_day_6: date_day_6_value.getFullYear()+'-'+('0'+(date_day_6_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_6_value.getDate()).slice(-2) ,
    date_day_7: date_day_7_value.getFullYear()+'-'+('0'+(date_day_7_value.getMonth() + 1)).slice(-2)+'-'+('0'+date_day_7_value.getDate()).slice(-2) , 
    groups: groups,    
    type_liders: type_liders,
    type_standbies: type_standbies,
    vacationAgents: vacationAgents,
    unavailableDateAgents: unavailableDateAgents,
    groupsAndAgents: groupsAndAgents,

    shifts_row: shifts_1,
    shifts_hextras: shifts_1,
    shifts_1: shifts_1,
    shifts_2: shifts_2,
    shifts_3: shifts_3,
    shifts_4: shifts_4,
    shifts_5: shifts_5,
    shifts_6: shifts_6,
    shifts_7: shifts_7,
    agents_descansa_1: agents_descansa_1,
    agents_descansa_2: agents_descansa_1,
    agents_descansa_3: agents_descansa_1,
    agents_descansa_4: agents_descansa_1,
    agents_descansa_5: agents_descansa_1,
    agents_descansa_6: agents_descansa_1,
    agents_descansa_7: agents_descansa_1,

    date_day_1_total_trabajan: 0,
    date_day_2_total_trabajan: 0,
    date_day_3_total_trabajan: 0,
    date_day_4_total_trabajan: 0,
    date_day_5_total_trabajan: 0,
    date_day_6_total_trabajan: 0,
    date_day_7_total_trabajan: 0,


    agents_hsuplementarias_1: [],
    agents_hsuplementarias_2: [],
    agents_hsuplementarias_3: [],
    agents_hsuplementarias_4: [],
    agents_hsuplementarias_5: [],
    agents_hsuplementarias_6: [],
    agents_hsuplementarias_7: [],

    agents_hextras_1: [],
    agents_hextras_2: [],
    agents_hextras_3: [],
    agents_hextras_4: [],
    agents_hextras_5: [],
    agents_hextras_6: [],
    agents_hextras_7: [],


  };

  const date_from_value = planificationData.date_day_1;
  const date_to_value = planificationData.date_day_7;
  const observations_value = '';
  const internal_code_value = 'Horario '+date_from_value+' hasta '+date_to_value;

  


  const data: ScheduleData={ 
    date_from: date_from_value, 
    date_to: date_to_value, 
    observations: observations_value,
    internal_code: internal_code_value,
    production: false,
    planificado: true,
    turno_velada_por_orden: false,
    schedule_anterior: 0,
    schedule_anterior_cargar: 0,
    coordinator: 0,
    grupo_feriado_1: 0,
    grupo_feriado_2: 0,
    grupo_feriado_3: 0,
    grupo_feriado_4: 0,
    grupo_feriado_5: 0,
    grupo_feriado_6: 0,
    grupo_feriado_7: 0,

    show_gferiado_1: false,
    show_gferiado_2: false,
    show_gferiado_3: false,
    show_gferiado_4: false,
    show_gferiado_5: false,
    show_gferiado_6: false,
    show_gferiado_7: false,
  };
  


 



  

  return {
    props: { schedules_anterior, site_id_logueado, unavailableDateAgents, vacationAgents, groups, shifts, groupsAndAgents, data, planificationData,coordinators },
  };
};

export default FormLayouts


