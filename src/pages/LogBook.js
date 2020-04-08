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

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

  const initialState = {
    DISTAddError: '',
    CABDistAddError: '',
    ScanAddError: '',
    ScanEmptyError: '',
    SearchError: ''
  };

  
  const baseUrl = 'http://10.0.111.94:3254';


class LogBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distUsers: [],
      cabUsers: [],
      koliOpt: [],
      logDate: [],
      searchRes: [],
      noPLUsers: [],
      tablePL: [],
      distTable: [],
      cabDistTable: [],
      getTableData: [],
      tableData: [],
      filterDist: '',
      filterCabDist: '',
      filterNoPL: '',

      dir_distributor: '',
      dir_kddistributor: '',

      dir_kode: '',
      thp_tglpl: '',

      //SearchInput
      searchHere: 'Search Here',
      searchLogbook: 'Nomor Logbook',
      searchDO: 'Nomor DO',
      searchPL: 'Nomor PL',

      //Table Modal Search
      tableSearchLogbook: [],
      tableSearchDO: [],
      tableSearchPL: [],

      //ScanNomorPL
      inputNoPL: '',

      //BeratReal
      beratrealpl: 0,

      //Delete
      deleteTable: true,
      deleteAll: true,

      //InputSearch
      inputSearch: '',
      inputSearchType: '',

      //ErrorAdd
      ScanEmptyError: '',
      DISTAddError: '',
      CABDistAddError: '',
      ScanAddError: '',
      SearchError: '',

      initialState,

      modalDetailPLIsOpen: false,
      modalBeratTimbang: false,
      modalSearchLogbook: false,
      modalSearchDO: false,
      modalSearchPL: false,
    };
  }

  // Fungsi yang dipanggil ketika Page load pertama kali
  componentDidMount() {
    this.getDist();
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

  pilihDist = async () => {
    var url = 'http://10.0.111.94:3254/getData?typeGet=GetPLLB';
    Axios.get(url).then(response => {
      if (response.data.data) {
        this.setState({
          distUsers: response.data.data,
        });
      }
    });
  };

  pilihCMBDist = async () => {
    var url = 'http://10.0.111.94:3254/getData?typeGet=GetPLLB';
    Axios.get(url).then(response => {
      if (response.data.data) {
        this.setState({
          cabUsers: response.data.data,
        });
      }
    });
  };

  nomorPL = async () => {
    var url = baseUrl + '/updateData?typePut=PutUpdateData';
    var body = this.state.getTableData;

    Axios.put(url, body).then(response => {
      if (response.data.data) {
        // console.log(JSON.stringify(response.data.data));
        // var data = response.data.data;
        // var tempTableData = this.state.tableData;
        // tempTableData.push(data);
        // console.log('TempTableData:', JSON.stringify(tempTableData));
        // this.setState({
        //   tableData: tempTableData,

        //   filterDist: this.state.dir_distributor,
        //   filterCabDist: this.state.dir_kode,
        //   filterNoPL: this.state.inputNoPL,
        // });
        this.processInsertLogbook(response.data.data);
        this.showNotification('Save Data Sukses');
      }
    });
  };

  processInsertLogbook = async payload => {
    var noPLList = '';
    var noDOList = '';
    var totBerat = 0;
    var totProcod = 0;

    payload.map(data => {
      noPLList = noPLList + data.thp_nopl + ',';
      noDOList = noDOList + data.bri_nodo + ',';
      totBerat = totBerat + data.thp_berattotalreal;
    });

    noPLList = noPLList.substr(0, noPLList.length - 1);
    noDOList = noDOList.substr(0, noDOList.length - 1);

    var cabAms = this.state.cabDistTable[this.state.dir_kode];

      var logbookObj = {
        log_ID: '',
        log_Date: new Date(),
        log_CabAms: cabAms,
        log_PLNum: noPLList,
        log_DONum: noDOList,
        log_OutDest: '981', // Tujuan
        log_OutName: 'adqw', // Penerima
        log_TotBerat: totBerat,
        log_TotProcod: totProcod, // Belum
        log_LastUpdate: new Date(),
        log_ActiveYN: 'Y',
        scan_OutNumber: 30, // Belum
        scan_OutDate: new Date(),
        scan_OutCabDist: cabAms,
        scan_OutBeratKoli: totBerat,
        scan_OutPLNum: noPLList,
        scan_OutDONum: noDOList,
        scan_OutOutletDest: 'asd', // Tujuan
        scan_OutOutletName: 'pqwoe', // Penerima
        scan_OutNIP: payload.thp_updateid,
        scan_OutActiveYN: 'Y',
        scan_OutLastUpdate: new Date(),
        scan_InNumber: null,
        scan_InDate: null,
        scan_InActiveYN: null,
        scan_InLastUpdate: null,
      };
    

    this.insertLogbook(logbookObj);
  };

  insertLogbook = async payload => {
    var url = 'http://10.0.111.94:3254/insertData?typePost=FirebaseLB';
    var body = payload;

    Axios.post(url, body).then(response => {
      this.showNotification('Post Logbook Sukses');
    });
  };

  getTableData = async () => {
    var url =
      'http://10.0.111.94:3254/getData?typeGet=GetByNoPL&NoPL=' +
      this.state.inputNoPL;

    const isValid = this.validateAdd();
    if (!isValid) {
      return;
    }

    console.log(this.state);

    this.setState(initialState);

    Axios.get(url)
      .then(response => {
        if (response.data.data) {
          var data = response.data.data;
          data.thp_berattotalreal = parseInt(this.state.beratrealpl + '');

          var tempTableData = this.state.getTableData;
          tempTableData.push(data);
          this.setState({
            getTableData: tempTableData,
          });
        }
      })
      .catch(error => console.log('ERROR: ', error));
  };

  getDist = async () => {
    var url = 'http://10.0.111.94:3254//getData?typeGet=GetDistSql';

    Axios.get(url)
      .then(response => {
        if (response.data.data) {
          console.log(JSON.stringify(response.data.data));
          this.setState({
            distTable: response.data.data,
          });
        }
      })
      .catch(error => console.log('ERROR: ', error));
  };

  getCabDist = async dir_distributor => {
    var url =
      'http://10.0.111.94:3254//getData?typeGet=GetCabDistributorSql&Dir_Distributor=' +
      dir_distributor;

    Axios.get(url)
      .then(response => {
        if (response.data.data) {
          console.log(JSON.stringify(response.data.data));
          this.setState({
            cabDistTable: response.data.data,
          });
        }
      })
      .catch(error => console.log('ERROR: ', error));
  };

  getTablePL = async dir_kode => {
    var url =
      'http://10.0.111.94:3254/getData?typeGet=GetPLLB&dist=' +
      dir_kode;

    Axios.get(url)
      .then(response => {
        if (response.data.data) {
          this.setState({
            tablePL: response.data.data,
          });
        }
      })
      .catch(error => console.log('ERROR: ', error));
  };

  onDISTInputChange = event => {
    const value = event.target.value;

    if (value.length > 0) {
      this.getCabDist(value);
    }

    this.setState(
      {
        dir_distributor: value,
      },
      () => {
        console.log(this.state.dir_distributor);
      },
    );
  };

  onCABDISTInputChange = event => {
    const value = event.target.value;

    if (value.length > 0) {
      this.getTablePL(this.state.cabDistTable[value]);
    }

    this.setState(
      {
        dir_kode: value,
      },
      () => console.log(this.state.dir_kode),
    );
  };

  onDateInputChange = event => {
    const value = event.target.value;

    this.setState(
      {
        thp_tglpl: value,
      },
      () => console.log(this.state.thp_tglpl),
    );
  };

  onScanPLInputTextChange = event => {
    const value = event.target.value;

    this.setState(
      {
        inputNoPL: value,
      },
      () => console.log(this.state.inputNoPL),
    );
  };

  onBeratRealPLInputTextChange = event => {
    const value = event.target.value;

    this.setState(
      {
        beratrealpl: value,
      },
      () => console.log(this.state.beratrealpl),
    );
  };

  onInputBeratTimbangAddButtonClick = () => {
    this.setState({
      modalBeratTimbang: false,
    });
    this.getTableData();
  };

  onScanPLInputEnterPressed = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      event.preventDefault();
      // Function To Do
      this.toggleBeratTambangModal();
    }
  };

  onSearchInputTypeChange = event => {
    const value = event.target.value;

    this.setState({
      inputSearchType: value,
    });
  };

  onSearchInputTextChange = event => {
    const value = event.target.value;

    this.setState(
      {
        inputSearch: value,
      },
      () => console.log(this.state.inputSearch),
    );
  };

  onSearchInputPressed = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      event.preventDefault();
      //Function To Do
      if (this.state.inputSearchType === this.state.searchLogbook) {
        this.toggleSearchLogbookModal();
        this.searchByLogbook();
      } else if (this.state.inputSearchType === this.state.searchDO) {
        this.toggleSearchDOModal();
        this.searchByDO();
      } else if (this.state.inputSearchType === this.state.searchPL) {
        this.toggleSearchPLModal();
        this.searchByPL();
      } else {
        alert('Please select search type!');
      }
    }
  };

  onSaveClick = () => {
    this.nomorPL();
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

  toggleSearchLogbookModal = () => {
    this.setState({
      modalSearchLogbook: !this.state.modalSearchLogbook,
    });
  };

  toggleSearchDOModal = () => {
    this.setState({
      modalSearchDO: !this.state.modalSearchDO,
    });
  };

  toggleSearchPLModal = () => {
    this.setState({
      modalSearchPL: !this.state.modalSearchPL,
    });
  };

  validateSearch = () => {
    let SearchError = '';

    if (!this.state.inputSearch) {
      SearchError = 'Search must be fill';
    }

    if (SearchError.length > 0) {
      this.setState({ SearchError });

      return false;
    }
    return true;
  };

  validateAdd = () => {
    let ScanAddError = '';
    let CABDistAddError = '';
    let DISTAddError = '';
    let ScanEmptyError = '';

    if (!this.state.dir_distributor) {
      DISTAddError = 'DIST must be fill';
    }

    if (!this.state.dir_kode) {
      CABDistAddError = 'CAB Dist must be fill';
    }

    if (this.state.inputNoPL.length !== 12) {
      ScanAddError = 'Invalid Nomor PL';
    }

    if (
      DISTAddError.length > 0 ||
      ScanEmptyError.length > 0 ||
      CABDistAddError.length > 0
    ) {
      this.setState({
        ScanAddError,
        CABDistAddError,
        ScanEmptyError,
        DISTAddError,
      });
      return false;
    }

    return true;
  };

  deleteOperation = getTableDataIndex => {
    const deleteTable = this.state.getTableData;
    deleteTable.splice(getTableDataIndex, 1);
    this.setState({ getTableData: deleteTable });
  };

  undoForm = () => {
    this.setState({
      dir_distributor: '',
      dir_kddistributor: '',
      dir_kode: '',
      thp_tglpl: '',
      inputNoPL: '',
      inputSearchType: '',
      inputSearch: '',
    });
  };

  resetForm = () => {
    this.setState({
      getTableData: [],
    });
  };

  searchByLogbook = () => {
    var url =
      'http://10.0.111.94:3254/getData?typeGet=GetByLogID&LogID=' +
      this.state.inputSearch;

    const isValid = this.validateSearch();
    if (!isValid) {
      return;
    }

    console.log(this.state);

    this.setState(initialState);

    Axios.get(url)
      .then(response => {
        if (response.data.data) {
          var data = response.data.data;
          var tempTableLogbook = [];
          tempTableLogbook.push(data);

          console.log(JSON.stringify(tempTableLogbook));

          this.setState(
            {
              tableSearchLogbook: tempTableLogbook,
            },
            () => console.log(this.state.tableSearchLogbook),
          );
        }
      })
      .catch(error => console.log('ERROR: ', error));
  };

  searchByDO = () => {
    var url =
      'http://10.0.111.94:3254/getData?typeGet=GetByDONum&Log_DONum=' +
      this.state.inputSearch;

    Axios.get(url)
      .then(response => {
        console.log(JSON.stringify(response));
        if (response.data.data) {
          this.setState(
            {
              tableSearchDO: response.data.data,
            },
            () => console.log(this.state.tableSearchDO),
          );
        }
      })
      .catch(error => console.log('ERROR: ', error));
  };

  searchByPL = () => {
    var url =
      'http://10.0.111.94:3254/getData?typeGet=GetByPLNum&Log_PLNum=' +
      this.state.inputSearch;

    Axios.get(url)
      .then(response => {
        console.log(JSON.stringify(response));
        if (response.data.data) {
          this.setState(
            {
              tableSearchPL: response.data.data,
            },
            () => console.log(this.state.tab),
          );
        }
      })
      .catch(error => console.log('ERROR: ', error));
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
                      <Input
                        type="select"
                        value={this.state.dir_distributor}
                        onInput={event => this.onDISTInputChange(event)}
                      >
                        <option value="">Select Your Option</option>
                        {this.state.distTable.map(distTable => (
                          <option value={distTable.dir_distributor}>
                            {distTable}
                          </option>
                        ))}
                      </Input>
                      <div style={{ color: 'red' }}>
                        {this.state.DISTAddError}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>Pilih CAB DIST:</td>
                    <td>
                      <Input
                        type="select"
                        value={this.state.dir_kode}
                        onInput={event => this.onCABDISTInputChange(event)}
                      >
                        <option value="">
                          Select Your Option For CAB DIST
                        </option>
                        {this.state.cabDistTable.map((cabDistTable, index) => (
                          <option value={index}>
                            {cabDistTable}
                          </option>
                        ))}
                      </Input>
                      <div style={{ color: 'red' }}>
                        {this.state.CABDistAddError}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Scan Nomor PL:</td>
                    <td>
                      <Input
                        class="nomorPL"
                        type="text"
                        placeholder="Nomor PL"
                        value={this.state.inputNoPL}
                        onInput={event => this.onScanPLInputTextChange(event)}
                        onKeyPress={event =>
                          this.onScanPLInputEnterPressed(event)
                        }
                      ></Input>
                      <div style={{ color: 'red' }}>
                        {this.state.ScanAddError}
                      </div>
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
                      <Input
                        type="select"
                        value={this.state.thp_tglpl}
                        onInput={event => this.onDateInputChange(event)}
                      >
                        <option>Select Your Date</option>
                        {this.state.tablePL.map(tablePL => (
                          <option value={tablePL.thp_tglpl}>
                            {tablePL.thp_tglpl.substr(8, 2) +
                              '-' +
                              MONTHS[
                                new Date(
                                  tablePL.thp_tglpl.substr(0, 10),
                                ).getMonth()
                              ] +
                              '-' +
                              tablePL.thp_tglpl.substr(0, 4)}
                          </option>
                        ))}
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
                      <Input
                        type="select"
                        value={this.state.inputSearchType}
                        onInput={event => this.onSearchInputTypeChange(event)}
                      >
                        <option>{this.state.searchHere}</option>
                        <option>{this.state.searchLogbook}</option>
                        <option>{this.state.searchDO}</option>
                        <option>{this.state.searchPL}</option>
                      </Input>
                      <Input
                        className="mt-3"
                        value={this.state.inputSearch}
                        onInput={event => this.onSearchInputTextChange(event)}
                        onKeyPress={event => this.onSearchInputPressed(event)}
                      />
                      <div style={{ color: 'red' }}>
                        {this.state.SearchError}
                      </div>
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
                  {this.state.getTableData.map(
                    (getTableData, Index) => (
                      //  getTableData.thp_distname.includes(this.state.filterDist) &&
                      //   getTableData.dir_kode.includes(this.state.filterCabDist) &&
                      //   getTableData.thp_nopl.includes(this.state.filterNoPL) &&
                      <tr>
                        <td>{getTableData.thp_nopl}</td>
                        <td>
                          {getTableData.thp_tglpl.substr(8, 2) +
                            '-' +
                            MONTHS[
                              new Date(
                                getTableData.thp_tglpl.substr(0, 10),
                              ).getMonth()
                            ] +
                            '-' +
                            getTableData.thp_tglpl.substr(0, 4)}
                        </td>
                        <td>{getTableData.tdpd_nodo}</td>
                        <td>{getTableData.dir_kode}</td>
                        <td>{getTableData.thp_tujuanid}</td>
                        <td>{getTableData.thp_pemesanid}</td>
                        <td>{getTableData.thp_distname}</td>
                        <td>{getTableData.thp_berattotalreal}</td>
                        <td>{}</td>

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
                            style={{
                              marginLeft: '1%',
                            }}
                            onClick={() => this.deleteOperation(Index)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ),
                    // ),
                  )}
                </tbody>
              </Table>
            </Form>
          </CardBody>

          <CardFooter className="d-flex justify-content-center">
            <Button
              className="ml-5"
              color="primary"
              onClick={() => this.onSaveClick()}
            >
              Save
            </Button>
            <Button className="ml-5" color="secondary">
              Print
            </Button>
            <Button className="ml-5" color="secondary">
              Print Label
            </Button>
            <Button className="ml-5" color="warning" onClick={this.undoForm}>
              Undo
            </Button>
            <Button className="ml-5" color="danger" onClick={this.resetForm}>
              Reset
            </Button>
          </CardFooter>
        </Card>
        {/*Modal Detail PL*/}
        <Modal centered isOpen={this.state.modalDetailPLIsOpen} size="lg  ">
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
                value={this.state.beratrealpl}
                onInput={event => this.onBeratRealPLInputTextChange(event)}
              ></Input>
              <Button
                color="success"
                onClick={() => this.onInputBeratTimbangAddButtonClick()}
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

        {/*Modal Search by Logbook*/}
        <Modal centered isOpen={this.state.modalSearchLogbook} size="lg  ">
          <ModalHeader>
            <h3>Search by Nomor Logbook</h3>
          </ModalHeader>
          <ModalBody className="m-3">
            <Form>
              <FormGroup>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Nomor Logbook</th>
                      <th>Tanggal Logbook</th>
                      <th>Cabang</th>
                      <th>Berat Koli</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tableSearchLogbook.map(tableSearchLogbook => (
                      <tr>
                        <td>{tableSearchLogbook.log_id}</td>
                        <td>
                          {tableSearchLogbook.log_date.substr(8, 2) +
                            '-' +
                            MONTHS[
                              new Date(
                                tableSearchLogbook.log_date.substr(0, 10),
                              ).getMonth()
                            ] +
                            '-' +
                            tableSearchLogbook.log_date.substr(0, 4)}
                        </td>
                        <td>{tableSearchLogbook.log_cabams}</td>
                        <td>{tableSearchLogbook.scan_outberatcoli}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </FormGroup>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => this.toggleSearchLogbookModal()}
                >
                  Close
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>

        {/*Modal Search by DO*/}
        <Modal centered isOpen={this.state.modalSearchDO} size="lg  ">
          <ModalHeader>
            <h3>Search by Nomor DO</h3>
          </ModalHeader>
          <ModalBody className="m-3">
            <Form>
              <FormGroup>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Nomor DO</th>
                      <th>Tanggal DO</th>
                      <th>Cabang</th>
                      <th>Berat Koli</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tableSearchDO.map(tableSearchDO => (
                      <tr>
                        <td>{tableSearchDO.log_donum}</td>
                        <td>
                          {tableSearchDO.log_date.substr(8, 2) +
                            '-' +
                            MONTHS[
                              new Date(
                                tableSearchDO.log_date.substr(0, 10),
                              ).getMonth()
                            ] +
                            '-' +
                            tableSearchDO.log_date.substr(0, 4)}
                        </td>
                        <td>{tableSearchDO.log_cabams}</td>
                        <td>{tableSearchDO.scan_outberatcoli}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </FormGroup>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => this.toggleSearchDOModal()}
                >
                  Close
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>

        {/*Modal Search by PL*/}
        <Modal centered isOpen={this.state.modalSearchPL} size="lg  ">
          <ModalHeader>
            <h3>Search by Nomor PL</h3>
          </ModalHeader>
          <ModalBody className="m-3">
            <Form>
              <FormGroup>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Nomor PL</th>
                      <th>Tanggal PL</th>
                      <th>Cabang</th>
                      <th>Berat Koli</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tableSearchPL.map(tableSearchPL => (
                      <tr>
                        <td>{tableSearchPL.log_plnum}</td>
                        <td>
                          {tableSearchPL.log_date.substr(8, 2) +
                            '-' +
                            MONTHS[
                              new Date(
                                tableSearchPL.log_date.substr(0, 10),
                              ).getMonth()
                            ] +
                            '-' +
                            tableSearchPL.log_date.substr(0, 4)}
                        </td>
                        <td>{tableSearchPL.log_cabams}</td>
                        <td>{tableSearchPL.scan_outberatcoli}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </FormGroup>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => this.toggleSearchPLModal()}
                >
                  Close
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </Page>
    );
  }
}

export default LogBook;
