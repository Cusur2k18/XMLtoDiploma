import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as homeActions from '../../store/actions';
import checkvalidity from '../../utils/validation';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import {
  Step,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import VerticalStepper from '../../components/UI/VerticalStepper/VerticalStepper';
import Diploma from '../../components/UI/Diploma/Diploma';

class Home extends Component {
  state = {
    finished: false,
    stepIndex: 0,
    form: {
      user: {
        props: {
          id: null,
          name: ''
        },
        validation: { required: true }
      },
      event: {
        props: {
          id: null,
          name: '',
          users: []
        },
        validation: { required: true }
      }
    }
  }


  componentDidMount = () => {
    this.props.onInit();
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

  createPdf = () => {
    console.log('state', this.state);
  }

  renderStepActions(step) {
    const {stepIndex} = this.state;
    const action = stepIndex === 2 ? this.createPdf : this.handleNextStep
    let valid = checkvalidity(this.state.form.event.props.name, this.state.form.event.validation)
    if (stepIndex === 1) {
      valid = checkvalidity(this.state.form.user.props.name, this.state.form.user.validation)
    }
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Descargar pdf' : 'Siguiente'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          labelPosition="before"
          primary={true}
          disabled={!valid}
          onClick={action}
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

  selectUserhandler = (evt, index, value) => {
    const selectedUser = {...this.state.form.event.props.users.find( u => u.id === value)};
    this.props.onSetUser(selectedUser);
    this.setState({ 
      ...this.state,
      form: {
        ...this.state.form,
        user: {
          ...this.state.form.event,
          props: {
            id: selectedUser.id,
            name: selectedUser.name + ' ' + selectedUser.lastname
          }
        }
      }
    })
  }

  selectEventHandler = (evt, index, value) => {
    const selectedEvent = this.props.events.find( e => e.id === value);

    if (selectedEvent) {
      this.setState({ 
        ...this.state,
        form: {
          ...this.state.form,
          event: {
            ...this.state.form.event,
            props: {
              id: selectedEvent.id,
              name: selectedEvent.name,
              users: [...selectedEvent.users]
            }
          }
        }
      })
    }
  }

  resetValues = () => {
    this.setState({
      ...this.state,
      finished: false,
      stepIndex: 0,
    })
  }

  render() {
    const events = this.props.events.map( event => {
      return <MenuItem key={event.id} value={`${event.id}`} primaryText={event.name} />
    })

    const enrolledUsers = this.state.form.event.props.id ?
    this.props.events.find( e => e.id === this.state.form.event.props.id)
      .users.map( u => <MenuItem key={u.id} value={`${u.id}`} primaryText={`${u.name} ${u.lastname}`} />) : [];

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
                <div>
                  <VerticalStepper stepIndex={this.state.stepIndex} finished={this.state.finished} onReset={this.resetValues}>

                    <Step>
                      <StepLabel>Selecciona el evento al que asististe:</StepLabel>
                      <StepContent>
                        <div className="col-xs-12 col-lg-12">
                        <SelectField floatingLabelText="Selecciona el evento"
                          value={this.state.form.event.props.id}
                          onChange={this.selectEventHandler}
                          style={{"width": "100%"}}>
                          {events}
                        </SelectField>
                        </div>
                        {this.renderStepActions(0)}
                      </StepContent>
                    </Step>

                    <Step>
                      <StepLabel>Busca tu nombre en la siguiente lista</StepLabel>
                      <StepContent>
                        <div className="col-xs-12 col-lg-12">
                        <SelectField floatingLabelText="Encuentra tu nombre en la lista"
                          value={this.state.form.user.props.id}
                          onChange={this.selectUserhandler}
                          style={{"width": "100%"}}>
                          {enrolledUsers}
                        </SelectField>
                        </div>
                        {this.renderStepActions(1)}
                      </StepContent>
                    </Step>

                    <Step>
                      <StepLabel>Listo!</StepLabel>
                      <StepContent>
                        <p>
                          Solo da click en el boton de abajo y tendras tu constancia
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
const mapStateToProps = (state) => ({
  events: state.events,
  user: state.user,
  error: state.error,
  loading: state.loading,
  eventId: state.eventId
})

const mapDispatchToProps = dispatch => {
  return {
    onInit: () => dispatch(homeActions.initData()),
    onSetUser: (user) => dispatch(homeActions.setUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)