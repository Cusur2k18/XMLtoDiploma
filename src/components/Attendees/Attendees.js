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
import CircularProgress from 'material-ui/CircularProgress';


import checkvalidity from '../../utils/validation';
import VerticalStepper from '../../components/UI/VerticalStepper/VerticalStepper';

export default (props) => {

  /**
  * @description We render the different action buttons depending on the step.
  * @param{string} step Current step on the stepper.
  */
  const onRenderStepActions = (step) => {
    const action = props.stepIndex === 1 ? props.onCreatePdf : props.onHandleNextStep
    let valid = checkvalidity(props.userCode, props.validation)

    if (props.loading) {

      return <CircularProgress />
    } else {

      return (
        <div style={{margin: '12px 0'}}>
          <RaisedButton
            label={props.stepIndex === 1 ? 'Descargar pdf' : 'Siguiente'}
            disableTouchRipple={true}
            disableFocusRipple={true}
            labelPosition="before"
            disabled={!valid}
            primary={true}
            onClick={action}
            style={{marginRight: 12}}
            icon={props.stepIndex === 1 ? <FontIcon className="fas fa-download" /> : null}
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

  return (
    <div style={{ marginTop: '20px' }}>
      <VerticalStepper stepIndex={props.stepIndex} finished={props.finished}>

        <Step>
          <StepLabel>Introduce tu codigo:</StepLabel>
          <StepContent>
            <div className="col-xs-12 col-lg-12">
            <TextField floatingLabelText="Codigo"
              value={props.userCode}
              onChange={props.onChangeUserCode}
              style={{"width": "100%"}} 
            />
            </div>
            {onRenderStepActions(0)}
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
            {onRenderStepActions(1)}
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
