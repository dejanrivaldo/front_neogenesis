import Page from 'components/Page';
import React from 'react';
import Axios from 'axios'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
} from 'reactstrap';
import { MdAdd, MdAssignment, MdLoyalty } from 'react-icons/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';
import User from './UserPage';
import register from './../registerServiceWorker';

class ReminderPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modal_register: false,

            // Register
            registerUser_reminderName: '',
            registerUser_reminderDate: ''
        }
    }

    // Fungsi yang dipanggil ketika Page load pertama kali
    componentDidMount() {
       
    }

    // Untuk memunculkan Notification dengan pesan {currMessage}
    showNotification = currMessage => {
      setTimeout(() => {
        if (!this.notificationSystem) {
          return;
        }
        this.notificationSystem.addNotification({
          title: <MdLoyalty />,
          message: currMessage,
          level: 'info',
        });
      }, 100);
    };

    openRegisterModal = () => {
      this.setState({
        modal_register: true,
      });
    };

    closeRegisterModal = () => {
      this.setState({
        modal_register: false,
      });
    };

    registerUser = () => {
      var body = {
        user_id: 1,
        namaReminder: this.state.registerUser_reminderName,
        tanggal_lahir: this.state.registerUser_reminderDate + 'T00:00:00Z',
      };
      this.setState({
        modal_register: true,
      });
    };

    onRegisterInputTextChange = (inputName, event) => {
        const value = event.target.value;
    
         this.setState({
            ['registerUser_' + inputName]: value
         });
        }

    

    //render biasa nya di-isi untuk desain HTML
    render() {
        return (

            <Page
                title="Table"
                breadcrumbs={[{ name: 'Table', active: true }]}>
                <Card className="mb-3">
                    <NotificationSystem
                        dismissible={false}
                        ref={notificationSystem =>
                            (this.notificationSystem = notificationSystem)
                        }
                        style={NOTIFICATION_SYSTEM_STYLE} />
                    <CardHeader className='d-flex justify-content-between align-items-center'>
                        <Label>User</Label>
                        <Button onClick={() => this.openRegisterModal()}>Add Reminder</Button>
                    </CardHeader>

                    <CardBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Reminder Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map((user, index)=>
                                        <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><Button size="sm" color="danger">Edit</Button></td>
                                </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
                
                <Modal isOpen = {this.state.modal_register} size= 'lg'>
                       <ModalHeader>
                                <Label>Register</Label>
                       </ModalHeader>
                        <ModalBody>
                        <Form>
                        
                            <Row form>
                                <Col>
                                    <FormGroup>
                                        <Label>Reminder Name</Label> 
                                        <Input placeholder="Reminder" value={this.state.registerUser_reminderName} onInput={(event) => this.onRegisterInputTextChange('reminderName', event)} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col>
                                    <FormGroup>
                                        <Label>Date & Time</Label>
                                        <Input type='date' value={this.state.registerUser_reminderDate} onInput={(event) => this.onRegisterInputTextChange('reminderDate', event)}/>
                                    </FormGroup>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='success' onClick={() => this.registerUser()}>Register</Button>
                            <Button color='danger' onClick={() => this.closeRegisterModal()}>Cancel</Button>>
                                
                        </ModalFooter>

                </Modal>
            </Page>
        );
    }
}

export default ReminderPage;