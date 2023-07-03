import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Tooltip } from '@material-ui/core'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import Button from '../CustomButtons/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import GridItem from 'components/Grid/GridItem'
import ConfirmDeleteInvestmentModal from './component/ConfirmDeleteInvestmentModal'
import { useDispatch, useSelector } from 'react-redux'
import { getInvestmentsByProfileAndProject } from 'redux/actions/investmentActions'

export default function InvestmentList({ infoModalData, locationForDecline, investmentModalComponent }) {
  const dispatch = useDispatch()

  const [investmentModal, setInvestmentModal] = useState(false)
  const [showInvestmentInfo, setShowInvestmentInfo] = useState({})

  const { loadingInvestmentsByProfileAndProject , investmentsByProfileAndProjectData } = useSelector(
    (state) => state.investmentsByProfileAndProject
  )

  useEffect(() => {
    if (!investmentsByProfileAndProjectData) {
      dispatch(getInvestmentsByProfileAndProject(infoModalData._id, infoModalData.profileId))
    }
  }, [infoModalData])


  const columns = [
    { id: 'created', label: 'Fecha de Inversión' },
    { id: 'amount', label: 'Importe' },
  ]

  if (locationForDecline) {
    columns.push({ id: 'action', label: 'Acciónes' })
  } else {
    columns.push({ id: '' })
  }
  const showInvestmentHandler = (id) => {
    const project = infoModalData.find((project) => project._id === id)
    setShowInvestmentInfo(project)
    setInvestmentModal(true)
  }

  const handleCloseInvestmentModal = () => {
    setInvestmentModal(false)
    setShowInvestmentInfo({})
  }
  return (
    <GridItem xs={12}>
      {loadingInvestmentsByProfileAndProject  ? (
        <>Cargando...</>
      ) : investmentsByProfileAndProjectData?.length ? (
        <>
        {
          investmentModalComponent &&
          <Typography >Inversiones Anteriores</Typography>
        }
          <TableContainer component={Paper}>
            <Table aria-label='custom pagination table'>
              <TableBody>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
                {investmentsByProfileAndProjectData?.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component='th' scope='row'>
                      {new Date(row.investmentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>
                      {locationForDecline && row.statusRequestToDeclineInvestment === 'none' ? (
                        <Button
                          justIcon
                          color='github'
                          disabled={row.project.status === 'finished' || row.project.status === 'reserved'}
                          onClick={(e) => showInvestmentHandler(row._id)}
                        >
                          <Tooltip id='tooltip-top' title='Retirar Inversión' placement='bottom' color='primary'>
                            <KeyboardReturnIcon />
                          </Tooltip>
                        </Button>
                      ) : locationForDecline && row.statusRequestToDeclineInvestment === 'pending' ? (
                        <Typography color='tomato'>Solicitud Pendiente</Typography>
                      ) : locationForDecline && row.statusRequestToDeclineInvestment === 'resolved' ? (
                        <Typography color='green'>Retiro Exitoso</Typography>
                      ) : (
                        locationForDecline &&
                        row.statusRequestToDeclineInvestment === 'reject' && (
                          <Typography color='ThreeDShadow'>Contactanos</Typography>
                        )
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {investmentModal && (
              <ConfirmDeleteInvestmentModal
                handleCloseInvestmentModal={handleCloseInvestmentModal}
                investmentModal={investmentModal}
                showInvestmentInfo={showInvestmentInfo}
              />
            )}
          </TableContainer>
        </>
      ) : (
        <GridItem xs={12}></GridItem>
      )}
    </GridItem>
  )
}
