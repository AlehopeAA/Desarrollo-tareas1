import {
    Modal,
    Backdrop,
    Fade,
    Grid,
    IconButton,
    Button,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import modalStyles from './styles/modalStyles'

const useStyles = makeStyles(modalStyles)

const DeleteModal = ({ aria, deleteHandler, open, setOpen }) => {
    const classes = useStyles()

    return (
        <Modal
            aria-labelledby={'delete-' + aria}
            aria-describedby={'delete-this-' + aria}
            className={classes.modal}
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Grid container spacing={3} className={classes.paper}>
                    <Grid item xs={12} className={classes.header}>
                        <h4>Delete {aria}?</h4>
                        <IconButton
                            aria-label='close'
                            className={classes.closeIcon}
                            onClick={() => setOpen(false)}
                        >
                            <Close fontSize='small' />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        Are you sure you want to delete this {aria}?
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant='contained'
                            className='w-100'
                            color='secondary'
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant='contained'
                            className='w-100'
                            color='primary'
                            onClick={deleteHandler}
                        >
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    )
}

export default DeleteModal
