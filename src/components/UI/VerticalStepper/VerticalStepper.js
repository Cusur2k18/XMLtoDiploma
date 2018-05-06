import React from 'react';
import { Stepper } from 'material-ui/Stepper';

export default (props) => {
  return (
    <div>
      <Stepper activeStep={props.stepIndex} orientation="vertical">
        {props.children}
      </Stepper>
    </div>
  )
}
