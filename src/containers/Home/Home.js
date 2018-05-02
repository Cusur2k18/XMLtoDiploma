import React, { Component } from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import {
  Step,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import SelectField from 'material-ui/SelectField';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import VerticalStepper from '../../components/UI/VerticalStepper/VerticalStepper';

export default class Home extends Component {
  state = {
    userInfo: {
      eventName: 'Congreso Veterinario del Sur 2018',
      userName: null
    },
    finished: false,
    stepIndex: 0,
    users: [
      { id: '1', name: 'Jaunito 1' },
      { id: '2', name: 'Jaunito 2' },
      { id: '3', name: 'Jaunito 3' },
      { id: '4', name: 'Jaunito 4' }
    ]
  }

  handleNextStep = () => {
    const {stepIndex} = this.state;
    this.setState({
      ...this.state,
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrevStep = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        ...this.state, 
        stepIndex: stepIndex - 1
      });
    }
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Descargar pdf' : 'Siguiente'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          labelPosition="before"
          primary={true}
          onClick={this.handleNextStep}
          style={{marginRight: 12}}
          icon={stepIndex === 2 ? <FontIcon className="fas fa-download" /> : null}
        />
        {step > 0 && (
          <FlatButton
            label="Regresar"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrevStep}
          />
        )}
      </div>
    );
  }

  selectUserhandler = (e) => {
    console.log(e.target.value);
  }

  selectEventHandler = (e) => {
    console.log(e.target.value);
  }

  resetValues = () => {
    this.setState({
      ...this.state,
      userInfo: {
        eventName: 'Congreso Veterinario del Sur 2018',
        userName: null
      },
      finished: false,
      stepIndex: 0,
    })
  }

  render() {
    let enrolledUsers = this.state.users.map( user => user.name);
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7 mt-5">
            <Card>
              <CardHeader
                title="Obten tu constancia"
                subtitle="Porfavor sigue los pasos para obtener tu constancia"
              />
              <CardText>
                <div className="">
                  <VerticalStepper stepIndex={this.state.stepIndex} finished={this.state.finished} onReset={this.resetValues}>

                    <Step>
                      <StepLabel>Selecciona el evento al que asististe:</StepLabel>
                      <StepContent>
                        <div className="col-xs-12 col-lg-12">
                        <SelectField floatingLabelText="Evento"
                            value={this.state.userInfo.eventName}
                            onChange={this.selectEventHandler}>
                            <MenuItem value={this.state.userInfo.eventName} primaryText={this.state.userInfo.eventName} />
                        </SelectField>
                        </div>
                        {this.renderStepActions(0)}
                      </StepContent>
                    </Step>

                    <Step>
                      <StepLabel>Busca tu nombre en la siguiente lista</StepLabel>
                      <StepContent>
                        <div className="col-xs-12 col-lg-12">
                        <AutoComplete
                            floatingLabelText="Escribe tu nombre"
                            filter={AutoComplete.fuzzyFilter}
                            dataSource={enrolledUsers}
                            maxSearchResults={10}
                          />
                        </div>
                        {this.renderStepActions(1)}
                      </StepContent>
                    </Step>

                    <Step>
                      <StepLabel>Listo!</StepLabel>
                      <StepContent>
                        <p>
                          Todo esta perfecto! Solo da click en el boton de abajo y tendras tu constancia
                          en PDF.
                          <br/><b>Gracias por asistir!</b>
                        </p>
                        {this.renderStepActions(2)}
                      </StepContent>
                    </Step>

                  </VerticalStepper>
                </div>
              </CardText>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}
