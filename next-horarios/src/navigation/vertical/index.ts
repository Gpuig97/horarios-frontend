// ** Icon imports
import Table from 'mdi-material-ui/Table'
import HomeOutline from 'mdi-material-ui/HomeOutline'


// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import StrapiUrl from 'src/confignl/StrapiUrl';
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
interface Element {
  menu: any[];
};


const Navigation =  (): VerticalNavItemsType => {
  const [values, setValues] = useState<Element>({menu:[]})

  const GetMenu = async () => {

    if(values.menu.length==0){
      const menuNavigation:any[]=[];

      const menuNavigationGeneral:any[]=[];
      const menuNavigationCanal:any[]=[];
      const menuNavigationDDias:any[]=[];
      const menuNavigationVDatos:any[]=[];
    
      const rol_id_consult = getCookie('rol_id_consult');
    
      const resPermisos = await fetch(StrapiUrl+"permisos?populate=%2A&filters[read]=true&filters[rol][id]="+rol_id_consult+"&sort[0]=[module][id]%3Aasc");
      const responsePermisos = await resPermisos.json();
      console.log(responsePermisos);
    
      for (let i = 0; i < responsePermisos.data.length; i++) {
        const row =       responsePermisos.data[i];
        const code_menu = row.attributes.module.data.attributes.code;
        const code_title = row.attributes.module.data.attributes.name;
        
        if(
          code_menu=='rols' ||
          code_menu=='sites' ||
          code_menu=='regions' ||
          code_menu=='cities' ||
          code_menu=='types-of-holidays' ||
          code_menu=='holidays' ||
          code_menu=='configuracion-horas-nocturnas' ||
          code_menu=='coordinators' 
          ){
            menuNavigationGeneral.push({
              title: ''+code_title,
              icon: Table,
              path: '/'+code_menu
            })
        }else if(
          code_menu=='areas' ||
          code_menu=='places' ||
          code_menu=='groups' ||
          code_menu=='group-and-grouped-day' ||
          code_menu=='site-configurations' ||
          code_menu=='type_of_agents' ||
          code_menu=='type-of-shifts' ||
          code_menu=='shifts' ||
          code_menu=='agentes-necesarios-por-dia-por-turnos' ||
          code_menu=='agents' ||
          code_menu=='rules-days' ||
          code_menu=='rules-hours' 
  
        ){
          menuNavigationCanal.push({
            title: ''+code_title,
            icon: Table,
            path: '/'+code_menu
          })
         
        }else if(
          code_menu=='unavailable-dates-by-agents' ||
          code_menu=='vacation-date-by-agents' 
          ){
            menuNavigationDDias.push({
              title: ''+code_title,
              icon: Table,
              path: '/'+code_menu
            })
        }else if(
          code_menu=='importar-registros-de-atencion' ||
          code_menu=='tipo-liders' ||
          code_menu=='tipo-standbies' ||
          code_menu=='groups-and-agents' ||
          code_menu=='schedules' ||
          code_menu=='schedules-final' ||
          code_menu=='reporte-horas-agentes' ||
          code_menu=='reporte-horas-agentes-por-dia' 
          ){
  
           
            menuNavigationVDatos.push({
              title: ''+code_title,
              icon: Table,
              path: '/'+code_menu
            })
        }
  
        
      }
    
      menuNavigation.push({
        title: 'Seleccionar Canal',
        icon: Table,
        path: '/select-site'
      });
      menuNavigation.push({
        sectionTitle: 'Resumen'
      });
      menuNavigation.push({
        title: 'Inicio',
        icon: HomeOutline,
        path: '/'
      });
      menuNavigation.push({
        sectionTitle: 'Configuración General'
      });
      menuNavigationGeneral.map((row=>{
        menuNavigation.push(row);
      }));
      menuNavigation.push({
        sectionTitle: 'Registros por Canal'
      });
      menuNavigationCanal.map((row=>{
        menuNavigation.push(row);
      }));
      menuNavigation.push({
        sectionTitle: 'Disponibilidad de Días'
      });
      menuNavigationDDias.map((row=>{
        menuNavigation.push(row);
      }));
      menuNavigation.push({
        sectionTitle: 'Vinculación de Datos'
      });
      menuNavigationVDatos.map((row=>{
        menuNavigation.push(row);
      }));
  
      values.menu = menuNavigation;
  
      setValues({...values});
    }
    

  
  }

  GetMenu();



  return values.menu;
  
  
}

export default Navigation
