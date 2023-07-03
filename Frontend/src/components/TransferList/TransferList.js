import * as React from 'react'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { Divider } from '@material-ui/core'

function not(a, b) {
  return a.filter((value) => b.map((bId) => bId.id).indexOf(value.id) === -1)
}

function intersection(a, b) {
  return a.filter((value) => b.map((bId) => bId.id).indexOf(value.id) !== -1)
}

const TransferList = (props) => {
  const { titleRigth, titleLeft, dataRight, dataLeft, setDataLeft, setDataRight } = props
  const [checked, setChecked] = React.useState([])

  const leftChecked = intersection(checked, dataLeft)
  const rightChecked = intersection(checked, dataRight)

  const handleToggle = (value) => () => {
    const currentIndex = checked.map((check) => check.id).indexOf(value.id)

    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleAllRight = () => {
    setDataRight(dataRight.concat(dataLeft))
    setDataLeft([])
  }

  const handleCheckedRight = () => {
    setDataRight(dataRight.concat(leftChecked))
    setDataLeft(not(dataLeft, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setDataLeft(dataLeft.concat(rightChecked))
    setDataRight(not(dataRight, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleAllLeft = () => {
    setDataLeft(dataLeft.concat(dataRight))
    setDataRight([])
  }

  const customList = (items, title) => (
    <Paper sx={{ width: 400, height: 350, overflow: 'auto' }}>
      <h3
        style={{
          fontSize: 20,
          textAlign: 'center',
          textDecoration: 'underline #326799',
          color: '#326799',
          fontWeight: 'bold',
        }}
      >
        {title}
      </h3>
      <Divider />
      <List dense component='div' role='list'>
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.fullName}-label`

          return (
            <ListItem
              key={value.id}
              role='listitem'
              button
              onClick={handleToggle({
                id: value.id,
                fullName: value.fullName,
              })}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.map((check) => check.id).indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.fullName} />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Paper>
  )
  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item>{customList(dataLeft, titleLeft)}</Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleAllRight}
            disabled={dataLeft.length === 0}
            aria-label='move all right'
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected left'
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleAllLeft}
            disabled={dataRight.length === 0}
            aria-label='move all left'
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(dataRight, titleRigth)}</Grid>
    </Grid>
  )
}

export default TransferList
