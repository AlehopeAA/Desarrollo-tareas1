import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Assignment, Visibility } from '@mui/icons-material'
import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardIcon from 'components/Card/CardIcon'
import CardHeader from 'components/Card/CardHeader'
import ReactTable from 'components/ReactTable/ReactTable'

const ObjectivesTable = ({ data }) => {
  const [columns, setColumns] = useState([
    {
      Header: 'Perfiles',
      accessor: 'codigo_perfil',
      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
    },
    { 
      Header: 'Tarea', 
      accessor: 'descripcion_tarea',
      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
    },
    { Header: 'Dificultad', accessor: 'dificultad' },
    { Header: 'Compartida', accessor: 'compartida' },
    { Header: 'Uds. mín/med/max', accessor: 'fullUnidades' },
    { Header: 'M. Temp', accessor: 'magnitud_temporal' },
    { Header: '% E. mín/med/max', accessor: 'fullEntrada' },
    { Header: 'T. mín/med/max', accessor: 'fullTiempo' },
    { Header: '% J. mín/med/max', accessor: 'fullJornada' },
  ])

  return (
    <GridContainer>
      <GridItem xs={12}>
        <h3>Mis Objetivos</h3>
        <Card>
          <CardHeader color='primary' icon>
            <CardIcon color='primary'>
              <Assignment />
            </CardIcon>
          </CardHeader>
          <CardBody>
            {!!data.length ? <ReactTable columns={columns} data={data} /> : <h3>No hay objetivos para mostrar</h3>}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>    
  )
}
export default ObjectivesTable
