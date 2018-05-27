import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as homeActions from '../../store/actions';
import * as jsPDF from 'jspdf'

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Congressman from '../../components/Congressman/Congressman';
import Attendees from '../../components/Attendees/Attendees';


class Home extends Component {
  state = {
    finished: false,
    stepIndex: 0,
    userCode: '',
    error: '',
    form: {
      event: {
        props: {
          id: '',
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
    let diplomaUser = this.state.form.event.props.users.find( u => u.id === this.state.userCode);
  
    if (diplomaUser) {
      // canvg(canvas, <img src="https://res.cloudinary.com/demo/image/upload/w_500/l_text:Arial_80:Flowers/flowers.jpg" alt="diploma"/>, {});
      let doc = new jsPDF('l', 'pt', 'a4'),
          filename = `Contancia - ${diplomaUser.name.replace(/[\. ,:-]+/g, '-')}`,
          realImage = '';
          
      this.getDataUri('https://res.cloudinary.com/demo/image/upload/w_500/l_text:Arial_80:Flowers/flowers.jpg', 500, 500, (dataUri) => {
        realImage = dataUri;
        doc.addImage(realImage, 'PNG', 15, 40, 180, 160);
        doc.save(filename);
        this.setState({ stepIndex: stepIndex + 1, finished: true });
      })
      // doc.addImage(realImage, 'PNG', -100, -100, 0, 0);
    } else {
      const errorText = `El codigo no aparece en los registros del evento! Porfavor intenta de nuevo`;
      this.setState({ error: errorText })
    }
  }
 
  selectUserhandler = (evt, value) => {
    this.setState({ userCode: value })
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
            id: '',
            name: ''
          },
          validation: { required: true }
        },
        event: {
          props: {
            id: '',
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

  getDataUri(url, width=100, height=100, callback) {
    let image = new Image();
    image.crossOrigin='Anonymous';   // See: https://stackoverflow.com/questions/22710627/tainted-canvases-may-not-be-exported
    image.onload = function() {
      console.log('exec on load');
      let canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      canvas.getContext('2d').drawImage(this, 0, 0);

      callback(canvas.toDataURL('image/png'));
    }
    image.src = url;
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
                      userCode={this.state.userCode}
                      userValidation={{ required: true }}/>
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