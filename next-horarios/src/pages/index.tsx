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
import CardContent from '@mui/material/CardContent'
import { useRouter } from "next/router";
import StrapiUrl from 'src/confignl/StrapiUrl'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

interface ElementData {
  id: number;
  date_from: any;
  date_to: any;
  days_before_to_remind: number;
  observations: string;
  createdAt: any;
  updatedAt: any;
  publishedAt: any;
  agents: any;
};


interface Props {
  elements: ElementData[];
}

const MUITable = ({ elements = [] }: Props) => {
  const { push } = useRouter();

  if (typeof window !== 'undefined') {
    //console.log('You are on the browser')
    // 👉️ can use localStorage here
    //console.log("id_coodinador: "+localStorage.getItem('id_coodinador')); // "auth"
    //console.log("id_area: "+localStorage.getItem('id_area')); // "id_area"

  } else {
    //console.log('You are on the server')
    // 👉️ can't use localStorage
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Recordatorio de Vacaciones por Agente
        </Typography>
      </Grid>
      <Grid item xs={8}>

        <Card> 
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Fecha Desde</TableCell>
                  <TableCell>Fecha Hasta</TableCell>
                  <TableCell>Agente</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {elements.length > 0 ? (

                elements.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date_from}</TableCell>
                    <TableCell>{row.date_to}</TableCell>
                    <TableCell>{row.agents}</TableCell>
                  </TableRow>
                ))
              
              ):(
                  <TableRow>
                    <TableCell>No hay datos...</TableCell>
                    
                  </TableRow>


              )}
                        
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={4}>
      <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: 'primary.main' }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Typography
              variant='h6'
              sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
            >
              
              No hay agentes próximos a vacaciones...
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
              
            </Typography>
            
          </CardContent>
        </Card>
      </Grid>


        

    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const site_id_logueado = getCookie('site_id', context);

  const res = await fetch(StrapiUrl+"vacation-date-by-agents?populate=%2A&filters[deleted][$not]=true&filters[site][id]="+site_id_logueado);
  const response = await res.json();
  const elements: ElementData[]=[];

    try {

      for (let i = 0; i < response.data.length; i++) {

        const fechaActual = new Date();

        const VacaDateFrom = response.data[i].attributes.date_from;
        const VacaDateTo = response.data[i].attributes.date_to;

        const fechaAnterior = new Date(""+VacaDateFrom+"");
        fechaAnterior.setDate(fechaAnterior.getDate() - response.data[i].attributes.days_before_to_remind);


        const fechaActualNew = fechaActual.getFullYear()+'-'+('0'+(fechaActual.getMonth() + 1)).slice(-2)+'-'+('0'+fechaActual.getDate()).slice(-2);
        const fechaAnteriorNew = fechaAnterior.getFullYear()+'-'+('0'+(fechaAnterior.getMonth() + 1)).slice(-2)+'-'+('0'+fechaAnterior.getDate()).slice(-2);

        

        const fechaActualValidate = Date.parse(fechaActualNew);
        const fechaAnteriorNewValidate = Date.parse(fechaAnteriorNew);
        const VacaDateToValidate = Date.parse(VacaDateTo);


        //console.log(fechaAnteriorNew)
        //console.log(VacaDateTo)
        //console.log(fechaActualNew)

        if(fechaActualValidate>=fechaAnteriorNewValidate && fechaActualValidate <= VacaDateToValidate){
          elements.push(
            {
              id: response.data[i].id,
              date_from: response.data[i].attributes.date_from,
              date_to: response.data[i].attributes.date_to,
              days_before_to_remind: response.data[i].attributes.days_before_to_remind,
              observations: response.data[i].attributes.observations,
              createdAt: response.data[i].attributes.createdAt,
              updatedAt: response.data[i].attributes.updatedAt,
              publishedAt: response.data[i].attributes.publishedAt,
              agents: response.data[i].attributes.agents.data.attributes.names+" "+response.data[i].attributes.agents.data.attributes.surnames
            }
          );
        }
        
      }
      
      

    } catch (ex) {
      
    }

    
  

  return {
    props: { elements },
  };
};

export default MUITable
