import Page from 'components/Page';
import React from 'react';
import Axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
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



class LogBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distUsers: [],
      cmbUsers: [],
      koliOpt: [],
      logDate: [],
      searchRes: [],
      noPLUsers: [],

      //ScanNomorKoli
      inputNoKoli: '',

      //ScanNomorPL
      inputNoPL: '',

      //BeratReal
      BeratRealPL: 0,

      //InputSearch
      inputSearch: '',

      //noPL

      modalDetailPLIsOpen: false,
      modalBeratTimbang: false,
    };
  }

  // Fungsi yang dipanggil ketika Page load pertama kali
  componentDidMount() {
    this.pilihDist();
    this.pilihCMBDist();
    this.jenisKoli();
    this.dateLog();
    this.searchLog();
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

  pilihDist = () => {
    var url = '';
    Axios.get(url).then(response => {
      if (response.data.data) {
        this.setState({
          distUsers: response.data.data,
        });
      }
    });
  };

  pilihCMBDist = () => {
    var url = '';
    Axios.get(url).then(response => {
      if (response.data.data) {
        this.setState({
          cmbUsers: response.data.data,
        });
      }
    });
  };

  jenisKoli = () => {
    var url = '';
    Axios.get(url).then(response => {
      if (response.data.data) {
        this.setState({
          koliOpt: response.data.data,
        });
      }
    });
  };

  nomorPL = () => {
    var url = 'http://10.0.111.94:1234/updateData?typePut=PutUpdateData';
    var body = {
      Bri_NoPL: this.state.inputNoPL,
      THP_BeratTotalReal: parseInt(this.state.BeratRealPL),
    };
    Axios.put(url, body).then(response => {
      if (response.data.data) {
        console.log(JSON.stringify(response.data.data));
        this.setState({
          modalBeratTimbang: false,
          noPLUsers: response.data.data,
        });
      }
    });
  };

  dateLog = () => {
    var url = '';
    Axios.get(url).then(response => {
      if (response.data.data) {
        this.setState({
          logDate: response.data.data,
        });
      }
    });
  };

  searchLog = () => {
    var url = '';
    Axios.get(url).then(response => {
      if (response.data.data) {
        this.setState({
          searchRes: response.data.data,
        });
      }
    });
  };

  scanNomorKoli = () => {
    var url = '';
    var body = {
      noKoli: this.state.inputNoKoli,
    };

    Axios.post(url, body)
      .then(() => {
        this.scanNomorKoli();
        console.log('Masuk No Koli');
      })
      .catch(error => {
        console.log('ErrorMsg: ' + error.message);
      });
  };

  scanNomorPL = () => {
    var url = '';
    var body = {
      noPL: this.state.inputNoPL,
    };

    Axios.post(url, body)
      .then(() => {
        this.scanNomorPL();
        console.log('Masuk No PL');
      })
      .catch(error => {
        console.log('ErrorMsg: ' + error.message);
      });
  };

  search = () => {
    var url = '';
    var body = {
      search: this.state.inputSearch,
    };

    Axios.post(url, body)
      .then(() => {
        this.search();
        console.log('Masuk');
      })
      .catch(error => {
        console.log('ErrorMsg: ' + error.message);
      });
  };

  onScanKoliInputTextChange = (inputName, event) => {
    const value = event.target.value;

    this.setState({
      ['inputNoKoli' + inputName]: value,
    });
  };

  onScanPLInputTextChange = event => {
    const value = event.target.value;

    this.setState({
      inputNoPL: value,
    });
  };

  onBeratRealPLInputTextChange = event => {
    const value = event.target.value;

    this.setState({
      BeratRealPL: value,
    });
  };

  onScanPLInputEnterPressed = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      event.preventDefault();
      // Function To Do
      this.toggleBeratTambangModal();
    }
  };

  onSearchInputTextChange = (inputName, event) => {
    const value = event.target.value;

    this.setState({
      ['inputSearch' + inputName]: value,
    });
  };

  toggleDetailPLModal = () => {
    this.setState({
      modalDetailPLIsOpen: !this.state.modalDetailPLIsOpen,
    });
  };

  toggleBeratTambangModal = () => {
    this.setState({
      modalBeratTimbang: !this.state.modalBeratTimbang,
    });
  };

  //render biasa nya di-isi untuk desain HTML
  render() {
    return (
      <Page
        title="Program Logbook"
        breadcrumbs={[{ name: 'Logbook', active: true }]}
      >
        <Card className="mb-3">
          <NotificationSystem
            dismissible={false}
            ref={notificationSystem =>
              (this.notificationSystem = notificationSystem)
            }
            style={NOTIFICATION_SYSTEM_STYLE}
          />
          <CardHeader className="d-flex justify-content-between align-items-center">
            <Label>Logbook</Label>
          </CardHeader>

          <CardBody>
            <Form>
              <Table>
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pilih DIST:</td>

                    <td>
                      <Input type="select">
                        <option>Select Your Option</option>
                        <option>1</option>
                      </Input>
                    </td>
                  </tr>

                  <tr>
                    <td>Pilih CAB DIST:</td>
                    <td>
                      <Input type="select">
                        <option>Select Your Option For CMB DIST</option>
                        <option>1</option>
                      </Input>
                    </td>
                  </tr>
                  {/*<tr>
										<td>Jenis Koli:</td>
										<td>
											<Input type="select">
												<option>
													Select Your Option
												</option>
												<option>1</option>
											</Input>
										</td>
									</tr>

									<tr>
										<td>Scan Nomor Koli:</td>
										<td>
											<Input
												placeholder="Nomor Koli"
												value={this.state.scanNomorKoli}
												onInput={event =>
													this.onScanKoliInputTextChange(
														"scanNomorKoli",
														event
													)
												}
											></Input>
										</td>
										<td>
											<Button color="primary">
												Change Koli
											</Button>
										</td>
									</tr>
                                            */}

                  <tr>
                    <td>Scan Nomor PL:</td>
                    <td>
                      <Input
                        placeholder="Nomor PL"
                        value={this.state.inputNoPL}
                        onInput={event => this.onScanPLInputTextChange(event)}
                        onKeyPress={event =>
                          this.onScanPLInputEnterPressed(event)
                        }
                      ></Input>
                    </td>
                    <td>
                      <Button
                        color="primary"
                        onClick={() => this.toggleDetailPLModal()}
                      >
                        Detail PL
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <td>Tanggal:</td>
                    <td>
                      <Input type="select">
                        <option>16 - 03 - 2020</option>
                      </Input>
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>
                      <Input type="checkbox" className="ml-1" />
                      <Label className="ml-4">Search</Label>
                    </td>
                    <td>
                      <Input type="select">Search Here</Input>
                      <Input
                        className="mt-3"
                        value={this.state.searchRes}
                        onInput={event =>
                          this.onSearchInputTextChange('searchRes')
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <hr color="primary" />
              <Table striped bordered hover variant="dark" size="sm">
                <thead>
                  <tr>
                    <th>Nomor PL</th>
                    <th>Tanggal PL</th>
                    <th>Nomor DO</th>
                    <th>Depo</th>
                    <th>Tujuan</th>
                    <th>Penerima</th>
                    <th>Cab Distributor</th>
                    <th>Total Berat Coli</th>
                    <th>Total Proc</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    <tr>
                      <td>{this.state.noPLUsers.Bri_NoPL}</td>
                      <td>{this.state.noPLUsers.THP_BeratTotalReal}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td align="center">{0}</td>
                      <td></td>
                      <td align="center">
                        <Button
                          size="sm"
                          color="warning"
                          style={{
                            marginRight: '1%',
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          style={{ marginLeft: '1%' }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  }
                  {
                    // this.state.noPLUsers.map((user, index)=>
                    //     <tr>
                    //         <td>{index + 1}</td>
                    //         <td>{user.Bri_NoPL}</td>
                    //         <td>{user.BeratRealPL}</td>
                    //         <td align='center'>
                    //             <Button size= 'sm' color= 'warning' style={{ marginRight:'1%' }}>Edit</Button>
                    //             <Button size= 'sm' color= 'danger'style={{ marginLeft:'1%' }}>Delete</Button>
                    //             </td>
                    //     </tr>
                    // )
                  }
                </tbody>
              </Table>
            </Form>
          </CardBody>

          <CardFooter className="d-flex justify-content-center">
            <Button color="primary">Add</Button>
            <Button className="ml-5" color="primary">
              Save
            </Button>
            <Button className="ml-5" color="secondary">
              Print
            </Button>
            <Button className="ml-5" color="secondary">
              Print Label
            </Button>
            <Button className="ml-5" color="warning">
              Cancel
            </Button>
          </CardFooter>
        </Card>
        {/*Modal Detail PL*/}
        <Modal centered isOpen={this.state.modalDetailPLIsOpen} size="lg">
          <ModalHeader>
            <h3>Input Berat Real</h3>
          </ModalHeader>
          <ModalBody className="m-3">
            <Form>
              <FormGroup>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>No PL</th>
                      <th>Tanggal PL</th>
                      <th>No DO</th>
                      <th>No Coli</th>
                      <th>Berat PL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#####</td>
                      <td>#####</td>
                      <td>#####</td>
                      <td>#####</td>
                      <td>#####</td>
                    </tr>
                  </tbody>
                </Table>
              </FormGroup>
              <FormGroup>
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <Label>Total PL</Label>
                      </td>
                      <td>
                        <Input placeholder="Total PL"></Input>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Label>Total Procode</Label>
                      </td>
                      <td>
                        <Input placeholder="Total Procode"></Input>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Label>Total Berat</Label>
                      </td>
                      <td>
                        <Input placeholder="Total Berat"></Input>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Label>Total Berat Real</Label>
                      </td>
                      <td>
                        <Input placeholder="Total Berat Real"></Input>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </FormGroup>
              <ModalFooter>
                <Button color="success" className="mr-2">
                  OK
                </Button>
                <Button
                  color="danger"
                  onClick={() => this.toggleDetailPLModal()}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>

        {/*Modal Enter Input Scan No PL*/}
        <Modal centered size="md" isOpen={this.state.modalBeratTimbang}>
          <ModalHeader>
            <h3>Input Berat Timbang</h3>
          </ModalHeader>
          <ModalBody>
            <Form>
              <Input
                placeholder="Berat Timbang"
                value={this.state.BeratRealPL}
                onInput={event => this.onBeratRealPLInputTextChange(event)}
              ></Input>
              <Button
                color="success"
                onClick={() => this.nomorPL()}
                className="mt-2 mr-2"
              >
                Add
              </Button>
              <Button
                color="danger"
                onClick={() => this.toggleBeratTambangModal()}
                className="mt-2"
              >
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Page>
    );
  }
}

export default LogBook;
