import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Card, makeStyles, Tooltip } from '@material-ui/core'
import { Visibility, Delete, Edit } from '@material-ui/icons'
import { Lightbulb, LightbulbOutlined, Calculate, DataObject } from '@mui/icons-material'
import SweetAlert from 'react-bootstrap-sweetalert'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ReactTable from 'components/ReactTable/ReactTable'
import Button from 'components/CustomButtons/Button'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import ViewTaskInfoModal from './components/ViewTaskOtherInfoModal'
import ActiveAndDesactiveTaskModal from './components/ActiveAndDesactiveTaskOtherModal'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import UpdateTaskModal from './components/UpdateTaskOtherModal'
import DeleteTaskModal from './components/DeleteTaskOtherModal'
import ViewHistorical from './components/ViewHistoricalModal'
import ViewObjectiveTask from 'components/Modal/ObjectivesModals/ViewObjectiveTaskInfo'
import { getTaskOthers } from 'redux/actions/taskOtherActions'
import { TASK_OTHER_LIST_RESET } from 'redux/constants/taskOtherConstants'
import { TASK_HISTORICAL_RESET } from 'redux/constants/taskOtherConstants'
import styles from './styles/taskOtherListScreenStyles'
import { getObjetivesByTask } from 'redux/actions/objetivesSpecificActions'

const useStyles = makeStyles(styles)

const TaskOtherListScreen = () => {
  const ExcelFile = ReactExport.ExcelFile
  const dispatch = useDispatch()
  const classes = useStyles()

  const [data, setData] = useState([])
  const [viewInfo, setViewInfo] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const [desactiveModal, setDesactiveModal] = useState(false)
  const [showActiveInfo, setShowActiveInfo] = useState({})
  const [showDesactiveInfo, setShowDesactiveInfo] = useState({})
  const [showUpdateTask, setShowUpdateTask] = useState({})
  const [showViewInfo, setShoeViewInfo] = useState({})
  const [showDeleteTask, setShowDeleteTask] = useState({})
  const [updateTaskModal, setUpdateTaskModal] = useState(false)
  const [deleteTaskModal, setDeleteTaskModal] = useState(false)
  const [downloadExcel, setDownloadExcel] = useState(false)
  const [downloadPdf, setDownloadPdf] = useState(false)
  const [excel, setExcel] = useState(false)
  const [pdf, setPdf] = useState(false)
  const [viewHistoricalModal, setViewHistoricalModal] = useState(false)
  const [viewListModal, setViewListModal] = useState(true)
  const [showHistorical, setShowHistorical] = useState({})
  const [viewObjetives, setViewObjetives] = useState(false)
  const [showObjetives, setShowObjetives] = useState({})

  const [alert, setAlert] = useState(null)

  const { loadingTaskOtherList, taskOthers, successTaskOtherList, errorTaskOtherList } = useSelector((state) => state.taskOtherList)

  const { loadingObjetivesByTask, objetivesByTask, successObjetivesByTask, errorObjetivesByTask, } = useSelector((state) => state.objetivesByTask)
  console.log('here');
  console.log(objetivesByTask)
  // useEffect(()=>{
  //   console.log(successObjetivesByTask)
  //   if (successObjetivesByTask) {
  //     setViewObjetives(true)
  //     setShowObjetives(objetivesByTask)
  //   }
  // },[successObjetivesByTask])

  // const confirmSuccess = () => {
  //   setAlert(null)
  //   // dispatch({ type: PROFILE_LIST_RESET })
  //   // dispatch({ type: TASK_REGISTER_RESET })
  //   // setTaskType('')
  //   // dispatch({ type: TASK_LIST_BY_PROFILE_ID_RESET })
  //   // dispatch({ type: TASK_LIST_DUPLICATE_BY_PROFILE_CLEAN })    
  // }

  // const hideAlert = () => {
  //   setAlert(null)
  // }

  useEffect(() => {
    // console.log(objetivesByTask)
    if (successObjetivesByTask && objetivesByTask[0] != null) {
      verObjetivos()
    } else if (successObjetivesByTask && objetivesByTask[0] == null) {


      // console.log(objetivesByTask)
      window.alert('Esta tarea no tiene objetivos asignados')
    }


  }, [successObjetivesByTask])

  useEffect(() => {

    if (successTaskOtherList) {
      const list = taskOthers.map((item) => {
        return {

          ...item,
          profile: item?.codigo_perfil?.toString().replaceAll(',', ' ; ') || '',
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                size='sm'
                simple
                onClick={() => 
                  handleObjetive(item)
               
                  //   .then(() => {
                  //   setShowObjetives(objetivesByTask) 
                  //   setViewObjetives(true)
                  // })
                
                }

                color='behance'
                className='edit'
              >
                <Tooltip title='Ver objetivos'>
                  <DataObject />
                </Tooltip>
              </Button>
              <Button
                justIcon
                round
                size='sm'
                simple
                onClick={() => handlerActiveAndDesactive(item)}
                color='warning'
                className='active-deactive'
              >
                <Tooltip title='activar/desactivar'>
                  {item.activo === 'SI' ? <Lightbulb /> : <LightbulbOutlined />}
                </Tooltip>
              </Button>
              <Button
                justIcon
                round
                size='sm'
                simple
                onClick={() => showUpdateTaskHandler(item.id_tarea)}
                color='primary'
                className='edit'
              >
                <Tooltip title='Editar Información'>
                  <Edit />
                </Tooltip>
              </Button>
              <Button
                justIcon
                round
                size='sm'
                simple
                onClick={() => showViewTaskHandler(item.id_tarea)}
                color='success'
                className='edit'
              >
                <Tooltip title='Ver Información'>
                  <Visibility />
                </Tooltip>
              </Button>
              <Button
                justIcon
                round
                size='sm'
                simple
                onClick={() => showDeleteTaskHandler(item.id_tarea)}
                color='danger'
                className='delete'
              >
                <Tooltip title='Borrar'>
                  <Delete />
                </Tooltip>
              </Button>
              <Button justIcon round simple size='sm' onClick={() => historicalHandler(item)} color='info' className='view'>
                <Tooltip title='Ver histórico'>
                  <Calculate />
                </Tooltip>
              </Button>
            </div>
          ),
        }
      })
      setData(list)
      return
    }
    dispatch(getTaskOthers())
  }, [dispatch, successTaskOtherList])

  useEffect(() => {
    return () => dispatch({ type: TASK_OTHER_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a2")
    doc.text('Tareas', 20, 10)
    doc.autoTable({
      body: data,
      columns: [
        {
          header: 'ID TAREA',
          dataKey: 'id_tarea'
        },
        {
          header: 'PERFIL',
          dataKey: 'profile'
        },
        {
          header: 'DESCRIPCION',
          dataKey: 'descripcion_tarea'
        },
        {
          header: 'TIPO DE TAREA',
          dataKey: 'id_tipo_tarea'
        },
        {
          header: 'INDICADOR',
          dataKey: 'indicador'
        },
        {
          header: 'CUANTIFICABLE',
          dataKey: 'cuantificable',
        },
        {
          header: 'ENTRADA',
          dataKey: 'entrada',
        },
        {
          header: 'COMPARTIDA',
          dataKey: 'compartida',
        },
        {
          header: 'DIFICULTAD',
          dataKey: 'dificultad',
        },
        {
          header: 'ACUMULATIVA',
          dataKey: 'acumulativa',
        },
        {
          header: 'COD. TRAZABILIDAD',
          dataKey: 'codigo_trazabilidad',
        },
      ],
    })
    doc.save('tareas.pdf')
  }

  const handlerActiveAndDesactive = (task) => {
    if (task.activo === 'SI') {
      showDesactiveTaskHandler(task.id_tarea)
      return
    }
    showActiveTaskHandler(task.id_tarea)
  }

  const showUpdateTaskHandler = (id) => {
    const task = taskOthers.find((task) => task.id_tarea === id)
    setShowUpdateTask(task)
    setUpdateTaskModal(true)
  }

  const handleCloseModal = () => {
    setUpdateTaskModal(false)
    setShowUpdateTask({})
  }

  const showDeleteTaskHandler = (id) => {
    const task = taskOthers.find((task) => task.id_tarea === id)
    setShowDeleteTask(task)
    setDeleteTaskModal(true)
  }

  const closeDeleteTaskModal = () => {
    setDeleteTaskModal(false)
    setShowDeleteTask({})
  }

  const handleObjetive = (tarea) => {


    dispatch(getObjetivesByTask(tarea.id_tarea))
    // setTimeout(() => {
    //   test()
    // }, 3000);
    //     console.log('here');
    // console.log(objetivesByTask)
    // console.log('tareatareatarea')
    // console.log(showObjetives)
    // .then(() => {
    // })
    // if (objetivesByTask) {

    // .then( test())

    // }


    // setShowObjetives(objetivesByTask)


    //   setViewObjetives(true)


  }

  const verObjetivos = () => {
    setShowObjetives(objetivesByTask[0])
    setViewObjetives(true)
  }
  const closeObjetives = () => {
    console.log(showObjetives)
    setViewObjetives(false)
    setShowObjetives({})
    console.log('cierra')
  }
  const showViewTaskHandler = (id) => {
    const task = taskOthers.find((task) => task.id_tarea === id)
    setShoeViewInfo(task)
    setViewInfo(true)
  }


  const closeViewInfoModal = () => {
    setViewInfo(false)
    setShoeViewInfo({})
  }

  const showActiveTaskHandler = (id) => {
    const task = taskOthers.find((task) => task.id_tarea === id)
    setShowActiveInfo(task)
    setActiveModal(true)
  }

  const closeActiveModal = () => {
    setActiveModal(false)
    setShowActiveInfo({})
  }
  const showDesactiveTaskHandler = (id) => {
    const task = taskOthers.find((task) => task.id_tarea === id)
    setShowDesactiveInfo(task)
    setDesactiveModal(true)
  }

  const closeDesactiveModal = () => {
    setDesactiveModal(false)
    setShowDesactiveInfo({})
  }

  const historicalHandler = (data) => {
    setViewHistoricalModal(true)
    setViewListModal(false)
    setShowHistorical(data)
    dispatch({ type: TASK_OTHER_LIST_RESET })
    dispatch({ type: TASK_HISTORICAL_RESET })
  }
  const closeHistoricalModal = () => {
    setViewHistoricalModal(false)
    setViewListModal(true)
    setShowHistorical({})
  }

  return (
    <>
      {/* {alert} */}
      {viewListModal && (
        <GridContainer>
          <GridItem xs={12} className={classes.rootItem}>
            <Card>
              <CardBody>
                {loadingTaskOtherList ? (
                  'Cargando Tareas...'
                ) : (
                  <ReactTable
                    columns={[
                      {
                        Header: 'PERFILES',
                        accessor: 'profile',
                        Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                      },
                      {
                        Header: 'DESCRIPCION',
                        accessor: 'descripcion_tarea',
                        Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                      },
                      {
                        Header: 'INDICADOR',
                        accessor: 'indicador',
                      },
                      {
                        Header: 'CUANTIFICABLE',
                        accessor: 'cuantificable',
                      },
                      {
                        Header: 'ENTRADA',
                        accessor: 'entrada',
                      },
                      {
                        Header: 'COMPARTIDA',
                        accessor: 'compartida',
                      },
                      {
                        Header: 'DIFICULTAD',
                        accessor: 'dificultad',
                      },
                      {
                        Header: 'ACUMULATIVA',
                        accessor: 'acumulativa',
                      },
                      {
                        Header: 'COD. TRAZABILIDAD',
                        accessor: 'codigo_trazabilidad',
                      },
                      {
                        Header: 'ACCIONES',
                        accessor: 'actions',
                      },
                    ]}
                    data={data}
                  />
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  {excel && (
                    <ExcelFile
                      element={<Button color='primary'>Exportar Excel</Button>}
                      filename='tareas'
                      hideElement={true}
                    >
                      <ExcelFile.ExcelSheet data={data} name='Tareas'>
                        <ExcelFile.ExcelColumn label='ID TAREA' value='id_tarea' />
                        <ExcelFile.ExcelColumn label='PERFIL' value='profile' />
                        <ExcelFile.ExcelColumn label='DESCRIPCION' value='descripcion_tarea' />
                        <ExcelFile.ExcelColumn label='TIPO DE TAREA' value='id_tipo_tarea' />
                        <ExcelFile.ExcelColumn label='INDICADOR' value='indicador' />
                        <ExcelFile.ExcelColumn label='CUANTIFICABLE' value='cuantificable' />
                        <ExcelFile.ExcelColumn label='ENTRADA' value='entrada' />
                        <ExcelFile.ExcelColumn label='DIFICULTAD' value='dificultad' />
                        <ExcelFile.ExcelColumn label='ACUMULATIVA' value='acumulativa' />
                        <ExcelFile.ExcelColumn label='CÓDIGO TRAZABILIDAD' value='codigo_trazabilidad' />
                      </ExcelFile.ExcelSheet>
                    </ExcelFile>
                  )}
                  <Button color='primary' onClick={() => setDownloadExcel(true)} style={{ marginLeft: '10px' }}>
                    Exportar EXCEL
                  </Button>
                  <Button color='primary' onClick={() => setDownloadPdf(true)} style={{ marginLeft: '10px' }}>
                    Exportar PDF
                  </Button>
                </div>
              </CardBody>
              {errorTaskOtherList && (
                <GridContainer>
                  <GridItem xs={12}>
                    <SnackbarContent message={errorTaskOtherList} color='danger' />
                  </GridItem>
                </GridContainer>
              )}
            </Card>
          </GridItem>
        </GridContainer>
      )}
      {activeModal && (
        <ActiveAndDesactiveTaskModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          info={showActiveInfo}
          active={true}
        />
      )}
      {desactiveModal && (
        <ActiveAndDesactiveTaskModal
          activeModal={desactiveModal}
          closeActiveModal={closeDesactiveModal}
          info={showDesactiveInfo}
          active={false}
        />
      )}
      {updateTaskModal && (
        <UpdateTaskModal
          handleCloseModal={handleCloseModal}
          updateTaskModal={updateTaskModal}
          showUpdateTask={showUpdateTask}
        />
      )}
      {/* <ViewTaskInfoModal viewInfo={viewInfo} closeViewInfoModal={closeViewInfoModal} info={showViewInfo} /> */}
      {viewInfo && (
        <ViewTaskInfoModal
          viewInfo={viewInfo}
          closeViewInfoModal={closeViewInfoModal}
          info={showViewInfo}
        />
      )}
      {/* {console.log(showObjetives)} */}
      {viewObjetives && (
        <ViewObjectiveTask
          closeViewActivityInfoModal={closeObjetives}
          viewActivityInfo={handleObjetive}
          info={showObjetives}
        />
      )}
      {deleteTaskModal && (
        <DeleteTaskModal
          deleteTaskModal={deleteTaskModal}
          handleCloseDeleteTaskModal={closeDeleteTaskModal}
          showDeleteTaskInfo={showDeleteTask}
        />
      )}
      {downloadExcel && (
        <DownloadConfirmModal
          downloadFile={downloadExcel}
          setDownloadFile={setDownloadExcel}
          setFile={setExcel}
          tableName='Tareas'
          FileExtension='Excel'
        />
      )}
      {downloadPdf && (
        <DownloadConfirmModal
          downloadFile={downloadPdf}
          setDownloadFile={setDownloadPdf}
          setFile={setPdf}
          tableName='Tareas'
          FileExtension='PDF'
        />
      )}
      {viewHistoricalModal && (
        <ViewHistorical
          closeViewActivityInfoModal={closeHistoricalModal}
          info={showHistorical}
          label='Ord / Ext'
        />
      )}
    </>
  )
}

export default TaskOtherListScreen
