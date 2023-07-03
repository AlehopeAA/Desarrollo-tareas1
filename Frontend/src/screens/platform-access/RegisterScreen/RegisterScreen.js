import { useState, useEffect } from 'react'
import { InputAdornment, Checkbox, FormControlLabel, Icon, makeStyles } from '@material-ui/core'
import { Timeline, Code, Group, Face, AlternateEmail, Check } from '@material-ui/icons'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import CustomInput from 'components/CustomInput/CustomInput'
import InfoArea from 'components/InfoArea/InfoArea'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardBody from 'components/Card/CardBody'
import styles from './styles/registerPageStyle'

const useStyles = makeStyles(styles)

const RegisterScreen = () => {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState([])
  const [cardAnimaton, setCardAnimation] = useState('cardHidden')

  useEffect(() => {
    let id = setTimeout(function () {
      setCardAnimation('')
    }, 200)

    return function cleanup() {
      window.clearTimeout(id)
    }
  })

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

  const registerHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className={classes.container}>
      <GridContainer justifyContent='center'>
        <GridItem xs={12} sm={12} md={10}>
          <Card loginRegister className={`${classes.cardSignup} ${classes[cardAnimaton]}`}>
            <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color='primary'>
              <h4 className={classes.cardTitle}>Sign Up in Visit Control</h4>
            </CardHeader>
            <CardBody>
              <GridContainer justifyContent='center'>
                <GridItem xs={12} sm={8} md={5}>
                  <div className={classes.center}>
                    <h4 className={classes.socialTitle}>Evaluación y Desempeño </h4>
                  </div>
                  <form className={classes.form} onSubmit={registerHandler}>
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        type: 'text',
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        startAdornment: (
                          <InputAdornment position='start' className={classes.inputAdornment}>
                            <Face className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: 'Name...',
                      }}
                    />
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        type: 'email',
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        startAdornment: (
                          <InputAdornment position='start' className={classes.inputAdornment}>
                            <AlternateEmail className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: 'Email...',
                      }}
                    />
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        type: 'password',
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        startAdornment: (
                          <InputAdornment position='start' className={classes.inputAdornment}>
                            <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                          </InputAdornment>
                        ),
                        placeholder: 'Password...',
                      }}
                    />
                    <FormControlLabel
                      classes={{
                        root: classes.checkboxLabelControl,
                        label: classes.checkboxLabel,
                      }}
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(1)}
                          checkedIcon={<Check className={classes.checkedIcon} />}
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      label={
                        <span>
                          I agree to the <a href='#pablo'>terms and conditions</a>.
                        </span>
                      }
                    />
                    <div className={classes.center}>
                      <Button type='submit' round color='github'>
                        Get Started
                      </Button>
                    </div>
                  </form>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <InfoArea
                    title='Take Control'
                    description='Register your visits and get more control of your working day.'
                    icon={Timeline}
                    iconColor='primaryCG'
                  />
                  <InfoArea
                    title='Group Work'
                    description='Check every visit registered by the team in a simple environment'
                    icon={Group}
                    iconColor='primaryCG'
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default RegisterScreen
