import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CustomModal from 'components/Modal/CustomModal'

const DownloadConfirmModal = ({ downloadFile, setDownloadFile, setFile, tableName, FileExtension }) => {
  const confirm = () => {
    setDownloadFile(false)
    setFile(true)
    setTimeout(() => {
      setFile(false)
    }, 500)
  }
  return (
    <CustomModal
      title='Exportar Archivo'
      open={downloadFile}
      setOpen={setDownloadFile}
      acceptHandler={confirm}
      acceptText='OK'
    >
      <GridContainer>
        <GridItem xs={12}>
          <h4>
            ¡Vas a exportar la Lista de {tableName} a {FileExtension}!
          </h4>
        </GridItem>
      </GridContainer>
    </CustomModal>
  )
}

export default DownloadConfirmModal
