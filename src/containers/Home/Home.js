import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';

import * as homeActions from '../../store/actions';
import * as jsPDF from 'jspdf'
import * as canvg from 'canvg/canvg';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Diploma from '../../components/UI/Diploma/Diploma';
import Congressman from '../../components/Congressman/Congressman';
import Attendees from '../../components/Attendees/Attendees';


class Home extends Component {
  state = {
    finished: false,
    stepIndex: 0,
    userCode: '',
    error: '',
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
    this.setState({ stepIndex: stepIndex + 1, finished: stepIndex >= 2 });
  };

  handlePrevStep = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };


  /**
  * @description This method create a pdf of a React Component
  *     1.- Create a canvas element so we can put our react component in there
  *     2.- Using canvg we create a canvas based on a svg that's why we call 'renderToStaticMarkup'
  *     3.- Get data url of the canvas
  *     4.- Render the canvas with jsPDF
  */
  createPdf = () => {
    const {stepIndex} = this.state;
    let canvas = document.createElement('canvas'),
        diplomaUser = this.state.form.event.props.users.find( u => u.id === this.state.userCode);
  
    if (diplomaUser) {
      canvg(canvas, ReactDOMServer.renderToStaticMarkup(<Diploma name={diplomaUser.name} />), {});
      let imgData = canvas.toDataURL('image/png'), 
          doc = new jsPDF('l', 'pt', 'a4'),
          filename = `Contancia - ${diplomaUser.name.replace(/[\. ,:-]+/g, '-')}`;

      doc.addImage(imgData, 'PNG', 0, 0, canvas.width * .53, canvas.height * .49);
      doc.save(filename);
      this.setState({ stepIndex: stepIndex + 1, finished: true });
    } else {
      const errorText = `El codigo no aparece en los registros del evento! Porfavor intenta de nuevo`;
      this.setState({ error: errorText })
    }
  }
 
  selectUserhandler = (evt, index, value) => {
    const selectedUser = {...this.state.form.event.props.users.find( u => u.id === value)};
    this.props.onSetUser(selectedUser);
    this.setState({ 
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
      finished: false,
      stepIndex: 0,
      userCode: '',
      error: '',
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
    })
    this.props.onSetUser(null);
  }

  setUserCode = (evt, value) => {
    this.setState({ 
      userCode: value,
      form: {
        ...this.state.form,
        event: {
          ...this.state.form.event,
          props: {
            ...this.state.form.event.props,
            id: this.props.events[0].id,
            name: this.props.events[0].name,
            users: [
              ...this.props.events[0].users
            ]
          }
        }
      }
    })
  }

  render() {
    const modalActions = [
      <RaisedButton
        label="Intentar de nuevo"
        secondary={true}
        onClick={this.resetValues}
      />
    ];

    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7 mt-5">
            <Card>
              <CardHeader
                title="Obten tu constancia"
                subtitle="Porfavor sigue los pasos para obtener tu constancia"
              />
              <CardText>
                <Tabs tabItemContainerStyle={{ backgroundColor: '#28A0D1' }} inkBarStyle={{ backgroundColor: '#103E51'}} onChange={this.resetValues}>

                  <Tab label="Congresista" >
                    <Attendees 
                      userCode={this.state.userCode}
                      stepIndex={this.state.stepIndex}
                      onCreatePdf={this.createPdf}
                      onHandleNextStep={this.handleNextStep}
                      handlePrevStep={this.handlePrevStep}
                      finished={this.state.finished}
                      onChangeUserCode={this.setUserCode}
                      onResetValues={this.resetValues}
                    />
                  </Tab>

                  <Tab label="Asistencia a taller" >
                    <Congressman 
                      events={this.props.events}
                      eventId={this.state.form.event.props.id}
                      stepIndex={this.state.stepIndex}
                      finished={this.state.finished}
                      onCreatePdf={this.createPdf}
                      onHandleNextStep={this.handleNextStep}
                      handlePrevStep={this.handlePrevStep}
                      onSelectEvent={this.selectEventHandler}
                      onSelectUser={this.selectUserhandler}
                      onResetValues={this.resetValues}
                      selectedEvent={this.state.form.event}
                      selectedUser={this.state.form.user}/>
                  </Tab>
                </Tabs>
              </CardText>
            </Card>
            <Dialog 
              modal={false}
              open={!!this.state.error}
              actions={modalActions}
              onRequestClose={this.resetValues}
            >
            {this.state.error}
            </Dialog>
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