import React from 'react';

import {
  Step,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

import checkvalidity from '../../utils/validation';
import VerticalStepper from '../../components/UI/VerticalStepper/VerticalStepper';


export default (props) => {

  /**
  * @description We render the different action buttons depending on the step.
  * @param{string} step Current step on the stepper.
  */
  const onRenderStepActions = (step) => {
    const action = props.stepIndex === 2 ? props.onCreatePdf : props.onHandleNextStep

    let valid = checkvalidity(props.selectedEvent.props.name, props.selectedEvent.validation)
    if (props.stepIndex === 1) {
      valid = checkvalidity(props.userCode, props.userValidation)
    }
    if (props.loading) {
      return <CircularProgress />
    } else {
      return (
        <div style={{margin: '12px 0'}}>
          <RaisedButton
            label={props.stepIndex === 2 ? 'Descargar pdf' : 'Siguiente'}
            disableTouchRipple={true}
            disableFocusRipple={true}
            labelPosition="before"
            primary={true}
            disabled={!valid}
            onClick={action}
            style={{marginRight: 12}}
            icon={props.stepIndex === 2 ? <FontIcon className="fas fa-download" /> : null}
          />
          {step > 0 && (
            <FlatButton
              label="Regresar"
              disabled={props.stepIndex === 0}
              disableTouchRipple={true}
              disableFocusRipple={true}
              onClick={props.handlePrevStep}
            />
          )}
        </div>
      );
    }
  }

  const events = props.events.map( event => {
    return <MenuItem key={event.id} value={`${event.id}`} primaryText={event.name} />
  })
  
  return (
    <div style={{ marginTop: '20px' }}>
      <VerticalStepper stepIndex={props.stepIndex} finished={props.finished}>

        <Step>
          <StepLabel>Selecciona el evento al que asististe:</StepLabel>
          <StepContent>
            <div className="col-xs-12 col-lg-12">
            <SelectField floatingLabelText="Selecciona el evento"
              value={props.selectedEvent.props.id}
              onChange={props.onSelectEvent}
              style={{"width": "100%"}}>
              {events}
            </SelectField>
            </div>
            {onRenderStepActions(0)}
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Ingresa tu codigo</StepLabel>
          <StepContent>
            <div className="col-xs-12 col-lg-12">
            <TextField 
              floatingLabelText="Codigo"
              value={props.userCode}
              onChange={props.onSelectUser}
              style={{"width": "100%"}}
            />
            </div>
            {onRenderStepActions(1)}
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Listo!</StepLabel>
          <StepContent>
            <p>
              Solo da click en el boton de abajo y tendras tu constancia
              en PDF.
              <br/>
              <br/>
              <small className="d-block d-sm-block d-md-none"><b>*(Ese proceso puede tardar un poco y se recomienda estar conectado a una red WiFi)</b></small>
            </p>
            {onRenderStepActions(2)}
          </StepContent>
        </Step>
      </VerticalStepper>
      {props.finished && (<div style={{ margin: "20px 0", textAlign: "center"}}>
        <h2>Gracias por asistir!</h2>
        <FlatButton label="Descargar otr a contancia" fullWidth onClick={props.onResetValues}/>
      </div>)}
    </div>
  )
}