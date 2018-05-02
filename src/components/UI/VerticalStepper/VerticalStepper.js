import React from 'react';
import { Stepper } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';

export default (props) => {
  return (
    <div>
      <Stepper activeStep={props.stepIndex} orientation="vertical">
        {props.children}
        {props.finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <h1>Gracias por asistir!</h1>
            <FlatButton label="Descargar otra contancia" fullWidth={true} onClick={props.onReset}/>
          </p>
        )}
      </Stepper>
    </div>
  )
}
