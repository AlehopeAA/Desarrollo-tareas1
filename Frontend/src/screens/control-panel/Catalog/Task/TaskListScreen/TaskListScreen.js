import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactExport from 'react-data-export'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Card, makeStyles, Tooltip } from '@material-ui/core'
import { Visibility, Delete, Edit } from '@material-ui/icons'
import { Lightbulb, LightbulbOutlined } from '@mui/icons-material'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ReactTable from 'components/ReactTable/ReactTable'
import Button from 'components/CustomButtons/Button'
import DownloadConfirmModal from 'components/DownloadConfirmModal/DownloadConfirmModal'
import ViewTaskInfoModal from './components/ViewInfoModal/ViewTaskInfoModal'
import ActiveAndDesactiveTaskModal from './components/ActiveAndDesactiveModal/ActiveAndDesactiveTaskModal'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import UpdateTaskModal from './components/UpdateModal/UpdateTaskModal'
import DeleteTaskModal from './components/DeleteModal/DeleteTaskModal'
import { getTasks } from 'redux/actions/taskActions'

import styles from './styles/taskListScreenStyles'

const useStyles = makeStyles(styles)

const TaskListScreen = () => {
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

  const { loadingTaskList, tasks, successTaskList, errorTaskList } = useSelector((state) => state.taskList)

  useEffect(() => {
    if (successTaskList) {
      const list = tasks.map((item) => {
        return {
          ...item,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
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
                simple
                onClick={() => showDeleteTaskHandler(item.id_tarea)}
                color='danger'
                className='delete'
              >
                <Tooltip title='Borrar'>
                  <Delete />
                </Tooltip>
              </Button>
            </div>
          ),
        }
      })
      setData(list)
      return
    }
    dispatch(getTasks())
  }, [dispatch, successTaskList])

  useEffect(() => {
    if (pdf) {
      exportPDF()
    }
  }, [pdf])

  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a3")
    doc.text('Tareas', 20, 10)
    doc.autoTable({
      body: data,
      columns: [
        { header: 'ID TAREA', dataKey: 'id_tarea' },
        { 
          header: 'DESCRIPCION', 
          dataKey: 'descripcion_tarea',
          Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
         },
        { header: 'TIPO DE TAREA', dataKey: 'id_tipo_tarea' },
        { header: 'INDICADOR', dataKey: 'indicador' },
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
    const task = tasks.find((task) => task.id_tarea === id)
    setShowUpdateTask(task)
    setUpdateTaskModal(true)
  }

  const handleCloseModal = () => {
    setUpdateTaskModal(false)
    setShowUpdateTask({})
  }

  const showDeleteTaskHandler = (id) => {
    const task = tasks.find((task) => task.id_tarea === id)
    setShowDeleteTask(task)
    setDeleteTaskModal(true)
  }

  const closeDeleteTaskModal = () => {
    setDeleteTaskModal(false)
    setShowDeleteTask({})
  }

  const showViewTaskHandler = (id) => {
    const task = tasks.find((task) => task.id_tarea === id)
    setShoeViewInfo(task)
    setViewInfo(true)
  }
  const closeViewInfoModal = () => {
    setViewInfo(false)
    setShoeViewInfo({})
  }

  const showActiveTaskHandler = (id) => {
    const task = tasks.find((task) => task.id_tarea === id)
    setShowActiveInfo(task)
    setActiveModal(true)
  }

  const closeActiveModal = () => {
    setActiveModal(false)
    setShowActiveInfo({})
  }
  const showDesactiveTaskHandler = (id) => {
    const task = tasks.find((task) => task.id_tarea === id)
    setShowDesactiveInfo(task)
    setDesactiveModal(true)
  }

  const closeDesactiveModal = () => {
    setDesactiveModal(false)
    setShowDesactiveInfo({})
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingTaskList ? (
                'Cargando Unidades...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'ID TAREA',
                      accessor: 'id_tarea',
                    },
                    {
                      Header: 'DESCRIPCION',
                      accessor: 'descripcion_tarea',
                    },
                    {
                      Header: 'TIPO DE TAREA',
                      accessor: 'id_tipo_tarea',
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
                      <ExcelFile.ExcelColumn label='DESCRIPCION' value='descripcion_tarea' />
                      <ExcelFile.ExcelColumn label='TIPO DE TAREA' value='id_tipo_tarea' />
                      <ExcelFile.ExcelColumn label='INDICADOR' value='indicador' />
                      <ExcelFile.ExcelColumn label='CUANTIFICABLE' value='cuantificable' />
                      <ExcelFile.ExcelColumn label='ENTRADA' value='entrada' />
                      <ExcelFile.ExcelColumn label='DIFICULTAD' value='dificultad' />
                      <ExcelFile.ExcelColumn label='ACUMULATIVA' value='acumulativa' />
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
            {errorTaskList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorTaskList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
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
      {viewInfo && (
        <ViewTaskInfoModal viewInfo={viewInfo} closeViewInfoModal={closeViewInfoModal} info={showViewInfo} />
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
    </>
  )
}

export default TaskListScreen
