import { useState, createRef } from 'react'
import PropTypes from 'prop-types'
import Button from 'components/CustomButtons/Button.js'
import defaultImage from 'assets/img/image_placeholder.jpg'
import defaultAvatar from 'assets/img/placeholder.jpg'

const ImageUpload = ({ avatar, addButtonProps, changeButtonProps, removeButtonProps }) => {
  let fileInput = createRef()

  const [file, setFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(avatar ? defaultAvatar : defaultImage)

  const handleImageChange = (e) => {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      setFile(file)
      setImagePreviewUrl(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  const handleClick = () => {
    fileInput.current.click()
  }
  const handleRemove = () => {
    setFile(null)
    setImagePreviewUrl(avatar ? defaultAvatar : defaultImage)
    fileInput.current.value = null
  }

  return (
    <div className='fileinput text-center'>
      <input type='file' onChange={handleImageChange} ref={fileInput} />
      <div className={'thumbnail' + (avatar ? ' img-circle' : '')}>
        <img src={imagePreviewUrl} alt='...' />
      </div>
      <div>
        {file === null ? (
          <Button {...addButtonProps} onClick={() => handleClick()}>
            {avatar ? 'Add Photo' : 'Select image'}
          </Button>
        ) : (
          <span>
            <Button {...changeButtonProps} onClick={() => handleClick()}>
              Change
            </Button>
            {avatar ? <br /> : null}
            <Button {...removeButtonProps} onClick={() => handleRemove()}>
              <i className='fas fa-times' /> Remove
            </Button>
          </span>
        )}
      </div>
    </div>
  )
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object,
}
export default ImageUpload
