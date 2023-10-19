import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import MultiSelectJobPosition from 'components/MultiSelectProfiles/MultiSelectProfiles'
import { PROFILE_LIST_RESET } from 'redux/constants/profileConstants'
import { getProfiles } from 'redux/actions/profileActions'
import styles from '../styles/responsibleMultiSelectStyles'

const useStyles = makeStyles(styles)

const ProfileMultiSelect = ({ profilesData, setProfilesData }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const { successProfileList, loadingProfileList, profiles, errorProfileList } = useSelector(
    (state) => state.profileList
  )

  useEffect(() => {
    return () => dispatch({ type: PROFILE_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!successProfileList) {
      dispatch(getProfiles())
    } else {
      const filteredProfiles = profiles.filter((p) => p.activo === 'SI')
      setData(filteredProfiles)
    }
  }, [successProfileList])

  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (profilesData.map((profile) => profile.id_perfil).indexOf(value[value.length - 1].id_perfil) === -1) {
      setProfilesData(value)
    } else {
      setProfilesData(profilesData.filter((profile) => profile.id_perfil !== value[value.length - 1]?.id_perfil))
    }
  }

  return (
    <GridItem xs={12}>
      <MultiSelectJobPosition
        label={'Perfiles'}
        data={data}
        multiData={profilesData}
        handleChangeMultiData={handleChangeMultiData}
      />
    </GridItem>
  )
}

export default ProfileMultiSelect
