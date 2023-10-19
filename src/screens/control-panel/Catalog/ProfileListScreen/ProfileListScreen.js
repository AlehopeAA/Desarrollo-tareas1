import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { Assignment, Visibility, Delete } from '@mui/icons-material'
import ReactTable from 'components/ReactTable/ReactTable'
import GridContainer from 'components/Grid/GridContainer'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardIcon from 'components/Card/CardIcon'
import Button from 'components/CustomButtons/Button'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
//import styles from './styles/teamWorkListStyles'
//import UpdateProfileModal from './components/UpdateProfileModal'
import DeleteProfileModal from './components/DeleteProfileModal.js'
import UpdateProfileModal from './components/UpdateProfileModal.js'
import SweetAlert from 'react-bootstrap-sweetalert'
//const useStyles = makeStyles(styles)
const profiles = [
  {
    _id: 1,
    codeProfile: 'SGT-SRG-JNEGOCIADO1',
    description: 'software developer',
    subdirection: 'employee',
    service: '8 horas',
    departament: 'active',
    unit: 'Auxiliar Oficina',
    role: '000000',
    status: 'active',
  },
  {
    _id: 1234,
    codeProfile: 'SGT-SRG-JNEGOCIADO2',
    description: 'software developer',
    subdirection: 'employee',
    service: '8 horas',
    departament: 'active',
    unit: 'Auxiliar Oficina',
    role: '000000',
    status: 'active',
  },
  {
    _id: 12341,
    codeProfile: 'SGT-SRG-JNEGOCIADO3',
    description: 'software developer',
    subdirection: 'employee',
    service: '8 horas',
    departament: 'active',
    unit: 'Auxiliar Oficina',
    role: '000000',
    status: 'active',
  },
]
const ProfileListScreen = () => {
  const classes = {}
  const [data, setData] = useState([])
  const [updateProfileModal, setUpdateProfileModal] = useState(false)
  const [deleteProfileModal, setDeleteProfileModal] = useState(false)
  const [showUpdateProfile, setShowUpdateProfile] = useState({})
  const [showDeleteProfileInfo, setShowDeleteProfileInfo] = useState({})
  const [isdelete, setIsDelete] = useState(false)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    if (profiles) {
      const list = profiles.map((profile) => {
        return {
          _id: profile._id,
          codeProfile: profile.codeProfile,
          description: profile.description,
          subdirection: profile.subdirection,
          service: profile.service,
          departament: profile.departament,
          unit: profile.unit,
          role: profile.role,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => showUpdateProfileHandler(profile._id)}
                color='success'
                className='edit'
              >
                <Visibility />
              </Button>
              <Button
                justIcon
                round
                simple
                onClick={() => showDeleteProfileHandler(profile._id)}
                color='danger'
                className='delete'
              >
                <Delete />
              </Button>
            </div>
          ),
        }
      })
      setData(list)
    }
  }, [])

  useEffect(() => {
    if (isdelete) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Eliminado!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
          El grupo de trabajo se ha eliminado correctamente
        </SweetAlert>
      )
      return
    }
  }, [isdelete])

  const confirmSuccess = () => {
    setDeleteProfileModal(false)
    setIsDelete(false)
    setAlert(null)
  }
  const hideAlert = () => {
    setDeleteProfileModal(false)
    setIsDelete(false)
    setAlert(null)
  }

  const handleCloseModal = () => {
    setUpdateProfileModal(false)
    setShowUpdateProfile({})
  }
  const showUpdateProfileHandler = (id) => {
    const profile = profiles.find((el) => el._id === id)
    setShowUpdateProfile(profile)
    setUpdateProfileModal(true)
  }

  const showDeleteProfileHandler = (id) => {
    const profile = profiles.find((el) => el._id === id)
    setShowDeleteProfileInfo(profile)
    setDeleteProfileModal(true)
  }

  const handleCloseDeleteProfileModal = () => {
    setDeleteProfileModal(false)
    setShowDeleteProfileInfo({})
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardHeader color='primary' icon>
              <CardIcon color='primary'>
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Lista de Perfiles</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                columns={[
                  {
                    Header: 'CODIGO DE PERFIL',
                    accessor: 'codeProfile',
                  },
                  {
                    Header: 'DESCRIPCION',
                    accessor: 'description',
                  },
                  {
                    Header: 'SUBDIRECCION',
                    accessor: 'subdirection',
                  },
                  {
                    Header: 'SERVICIO',
                    accessor: 'service',
                  },
                  {
                    Header: 'UNIDAD',
                    accessor: 'unit',
                  },
                  {
                    Header: 'ROL',
                    accessor: 'role',
                  },
                  {
                    Header: 'ACCIONES',
                    accessor: 'actions',
                  },
                ]}
                data={data}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {alert}
      {updateProfileModal && (
        <UpdateProfileModal
          handleCloseModal={handleCloseModal}
          updateProfileModal={updateProfileModal}
          showUpdateProfile={showUpdateProfile}
        />
      )}
      {deleteProfileModal && (
        <DeleteProfileModal
          handleCloseDeleteProfileModal={handleCloseDeleteProfileModal}
          deleteProfileModal={deleteProfileModal}
          showDeleteProfileInfo={showDeleteProfileInfo}
          setIsDelete={setIsDelete}
        />
      )}
    </>
  )
}

export default ProfileListScreen
