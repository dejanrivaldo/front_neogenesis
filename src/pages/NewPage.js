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

var BACKEND;

class NewPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modal_register: false,

            // Register
            registerUser_nama_lengkap: '',
            registerUser_tanggal_lahir: '',
            registerUser_jabatan: '',
            registerUser_email: '',
            registerUser_nip: '',


            modal_edit: false,
            //
            editUser_user_id: 1,
            editUser_nama_lengkap: '',
            editUser_tanggal_lahir: '',
            editUser_jabatan: '',
            editUser_email: '',
            editUser_nip: '',
        }
        BACKEND = 'http://10.0.112.22:8888';
    }

    // Fungsi yang dipanggil ketika Page load pertama kali
    componentDidMount() {
         this.getDataUser()
    }

    // Untuk memunculkan Notification dengan pesan {currMessage}
    showNotification = (currMessage) => {
        setTimeout(() => {
            if (!this.notificationSystem) {
                return;
            }
            this.notificationSystem.addNotification({
                title: <MdLoyalty />,
                message:
                    currMessage,
                level: 'info',
            });
        }, 100);
    }

    getDataUser = () => {
        var url = BACKEND + "/users?firebasedb"
        Axios.get(url)
        .then((response) => {
            if (response.data.data) {
                this.setState({
                    users: response.data.data
                })
            }
        })
    }

 
    toggleRegisterModal = () => {
        this.setState({
            modal_register:!this.state.modal_register
        })
    }

    openEditModal = (index) =>{
        var user = this.state.users[index];
        this.setState({
            modal_edit: true,
            editUser_user_id: user.user_id,
            editUser_nama_lengkap: user.nama_lengkap,
            editUser_tanggal_lahir: new Date(user.tanggal_lahir).toISOString().substr(0, 10),
            editUser_jabatan: user.jabatan,
            editUser_email: user.email,
            editUser_nip: user.nip,
        })
    }



    closeEditModal = () =>{
        this.setState({
            modal_edit: false
        })
    }

    onRegisterInputTextChange = (inputName, event) => {
        const value = event.target.value;

        this.setState({
            ['registerUser_' + inputName]: value
        });
    }

    onEditInputTextChange = (inputName, event) => {
        const value = event.target.value;

        this.setState({
            ['editUser_' + inputName]: value
        });
    }

    registerUser = () => {
        var url= BACKEND + "/usersInsert?Insert=firebase"
        var body = {
            user_id: 1,
            nip: this.state.registerUser_nip,
            nama_lengkap: this.state.registerUser_nama_lengkap,
            tanggal_lahir: this.state.registerUser_tanggal_lahir + "T00:00:00Z",
            jabatan: this.state.registerUser_jabatan,
            email: this.state.registerUser_email
        }

        this.setState({
            modal_register: false
        })

        Axios.post(url, body)
            .then(() => {
                this.getDataUser();  
                console.log('MASUK')
            })
            .catch(error => {
                console.log('ErrorMsg: ' + error.message)
            })
    }

    editUser = () => {
        var url= BACKEND + "/usersUpdate?NIP=" + this.state.editUser_nip
        var body = {
            user_id: this.state.editUser_user_id,
            nip: this.state.editUser_nip,
            nama_lengkap: this.state.editUser_nama_lengkap,
            tanggal_lahir: this.state.editUser_tanggal_lahir + "T00:00:00Z",
            jabatan: this.state.editUser_jabatan,
            email: this.state.editUser_email
        }

        this.setState({
            modal_edit: false
        })

        Axios.put(url, body)
            .then(() => {
                this.getDataUser();
                console.log('MASUK')
            })
            .catch(error => {
                console.log('ErrorMsg: ' + error.message)
            })
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
                        <Button onClick={() => this.toggleRegisterModal()}>Register</Button>
                    </CardHeader>

                    <CardBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>NIP</th>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Jabatan</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map((user, index)=>
                                        <tr>
                                        <td>{index + 1}</td>
                                        <td>{user.nip}</td>
                                        <td>{user.nama_lengkap}</td>
                                        <td>{user.email}</td>
                                        <td>{user.jabatan}</td>
                                        <td><Button size="sm" color="danger" onClick={(user) => this.openEditModal(index)}>Edit</Button></td>
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
                                        <Label>Nama Lengkap</Label> 
                                        <Input placeholder="Nama" value={this.state.registerUser_nama_lengkap} onInput={(event) => this.onRegisterInputTextChange('nama_lengkap', event)} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>NIP</Label>
                                        <Input value={this.state.registerUser_nip} onInput={(event) => this.onRegisterInputTextChange('nip', event)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col>
                                    <FormGroup>
                                        <Label>Tgl Lahir</Label>
                                        <Input type='date' value={this.state.registerUser_tanggal_lahir} onInput={(event) => this.onRegisterInputTextChange('tanggal_lahir', event)}/>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>Jabatan</Label>
                                        <Input value={this.state.registerUser_jabatan} onInput={(event) => this.onRegisterInputTextChange('jabatan', event)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                            <Col>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input placeholder="example@gmail.com" value={this.state.registerUser_email} onInput={(event) => this.onRegisterInputTextChange('email', event)}/>
                                    </FormGroup>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                                <Button color='success' onClick={() => this.registerUser()}>Register</Button>
                                <Button color='danger' onClick={() => this.toggleRegisterModal()}>Cancel</Button>
                        </ModalFooter>

                </Modal>

                <Modal isOpen = {this.state.modal_edit} size= 'lg'>
                       <ModalHeader>
                                <Label>Edit</Label>
                       </ModalHeader>
                        <ModalBody>
                        <Form>
                        
                            <Row form>
                                <Col>
                                    <FormGroup>
                                        <Label>Nama Lengkap</Label> 
                                        <Input placeholder="Nama" value={this.state.editUser_nama_lengkap} onInput={(event) => this.onEditInputTextChange('nama_lengkap', event)} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>NIP</Label>
                                        <Input value={this.state.editUser_nip} onInput={(event) => this.onEditInputTextChange('nip', event)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col>
                                    <FormGroup>
                                        <Label>Tgl Lahir</Label>
                                        <Input type='date' value={this.state.editUser_tanggal_lahir} onInput={(event) => this.onEditInputTextChange('tanggal_lahir', event)}/>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>Jabatan</Label>
                                        <Input value={this.state.editUser_jabatan} onInput={(event) => this.onEditInputTextChange('jabatan', event)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                            <Col>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input placeholder="example@gmail.com" value={this.state.editUser_email} onInput={(event) => this.onEditInputTextChange('email', event)}/>
                                    </FormGroup>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                                <Button color='success' onClick={() => this.editUser()}>Register</Button>
                                <Button color='danger' onClick={() => this.closeEditModal()}>Cancel</Button>
                        </ModalFooter>

                </Modal>
            </Page>
        );
    }
}

export default NewPage;