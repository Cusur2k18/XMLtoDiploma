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

import * as APP_CONSTANTS from '../../utils/constants';


class Home extends Component {
  state = {
    finished: false,
    stepIndex: 0,
    userCode: '',
    error: '',
    loading: false,
    userType: APP_CONSTANTS.CONGRESS_TYPE,
    form: {
      event: {
        props: {
          id: '',
          name: '',
          diplomaUrl: '',
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
  * @description This method renders the pdf
  * 1.- We need to check what type of diploma we want to render
  *
  * 2.- After that we calculate the user and the diploma url for cloudinary
  *     in this step we apply a transformation and add some text to the cloudinary image
  *
  * 3.- If we found a user, we get the data uri of the cloudinary image and we append that to
  *     the document that renders the pdf.
  *
  * 4.- if the user is not found we show a nice alert.
  */
  createPdf = () => {
    this.setState({ loading: true })
    const {stepIndex, userType} = this.state;
    let diplomaUser = null,
        eventDiploma = null;
    if (userType === APP_CONSTANTS.WORKSHOP_TYPE) {
      diplomaUser = this.state.form.event.props.users.find( u => u.id === this.state.userCode);
      //t_diploma/l_text:Verdana_25:<NAME>,g_center,y_60
      console.log(' this.state.form.event',  this.state.form.event);
      eventDiploma = this.state.form.event.props.diplomaUrl.split('upload').join(`upload/t_diploma/l_text:Verdana_25:${diplomaUser.name},g_center,y_60`);
    } else {
      diplomaUser = this.props.congressmen.find( u => u.code === this.state.userCode);
      eventDiploma = APP_CONSTANTS.DEFAULT_DIPLOMA_URL.replace(/<NAME>/g, diplomaUser.name)
    }
  
    if (diplomaUser) {
      let doc = new jsPDF('l', 'pt', 'a4'),
          filename = `Contancia - ${diplomaUser.name.replace(/[\. ,:-]+/g, '-')}`,
          realImage = '';

          //'https://res.cloudinary.com/demo/image/upload/w_500/l_text:Arial_80:Flowers/flowers.jpg'
      this.getDataUri(eventDiploma, 1000, 1000, (dataUri, cw, ch) => {
        realImage = dataUri;
        doc.addImage(realImage, 'PNG', 0, 0, 850, 600);
        doc.save(filename);
        this.setState({ stepIndex: stepIndex + 1, finished: true, loading: false });
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
              diplomaUrl: selectedEvent.diploma_url,
              users: [...selectedEvent.users]
            }
          }
        }
      })
    }
  }

  resetValues = (tabValue) => {
    this.setState((state, props) => {
      return {
        finished: false,
        stepIndex: 0,
        userCode: '',
        userType: typeof tabValue === 'string' ? tabValue : state.userType,
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
      }
    })
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
      let canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      canvas.getContext('2d').drawImage(this, 0, 0, width, height);

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
                <Tabs 
                  value={this.state.userType}
                  tabItemContainerStyle={{ backgroundColor: '#28A0D1' }} 
                  inkBarStyle={{ backgroundColor: '#103E51'}} 
                  onChange={this.resetValues}>

                  <Tab label="Congresista" value={APP_CONSTANTS.CONGRESS_TYPE} >
                    <Attendees 
                      userCode={this.state.userCode}
                      stepIndex={this.state.stepIndex}
                      onCreatePdf={this.createPdf}
                      onHandleNextStep={this.handleNextStep}
                      handlePrevStep={this.handlePrevStep}
                      finished={this.state.finished}
                      onChangeUserCode={this.setUserCode}
                      onResetValues={this.resetValues}
                      loading={this.state.loading}
                      validation={{ required: true }}
                    />
                  </Tab>

                  <Tab label="Asistencia a taller" value={APP_CONSTANTS.WORKSHOP_TYPE} >
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
                      userValidation={{ required: true }}
                      loading={this.state.loading}/>
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
  congressmen: state.congressmen,
  error: state.error,
  loading: state.loading
})

const mapDispatchToProps = dispatch => {
  return {
    onInit: () => dispatch(homeActions.initData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)