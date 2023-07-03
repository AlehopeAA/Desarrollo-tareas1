import * as React from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'

export default function ChangePasswordAlert({ changePasswordAlert, setChangePasswordAlert }) {
  const [state, setState] = React.useState({
    vertical: 'bottom',
    horizontal: 'right',
  })

  const action = (
    <Button color='secondary' size='small' onClick={() => setChangePasswordAlert(false)}>
      Ok
    </Button>
  )
  const { vertical, horizontal, open } = state

  return (
    <div>
      {typeof changePasswordAlert === 'boolean' && (
        <Snackbar
          action={action}
          anchorOrigin={{
            vertical,
            horizontal,
          }}
          open={changePasswordAlert}
          onClose={setChangePasswordAlert}
          message='Debes cambiar la contraseña por defecto'
          key={vertical + horizontal}
        />
      )}
    </div>
  )
}
