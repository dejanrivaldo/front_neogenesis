import Page from 'components/Page';
import React from 'react';
import Typography from 'components/Typography';
import { MdSearch, MdLoyalty, MdDelete, MdDateRange,MdTagFaces,MdPermIdentity } from 'react-icons/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';
import {
  Button,
  Card,
  CardBody,
  CardHeader,

  Col,
  Row,
  Table,
  Modal,
  ListGroup,
  ListGroupItem,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  Form,
  Alert,
  ButtonGroup,
  InputGroupText,
  FormGroup,
} from 'reactstrap';

const hostUrl = 'http://10.0.111.143:8083';

class DiscountAM extends React.Component {
  //special method
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      suppliers: [],
      searchOutletList: [],
outletList:[],
      isLoading: false,
      flagisi: true,
      flagaddbtn: true,
      flagsavebtn: true,
      flagcancelbtn: true,

      inputtedName: '',
      supplierName: '',
      supplierAddress1: '',
      supp_id: '',
      labelPercent: 'd-none',
      inputValue: true,
      out_allowcredityndisabled: true,
      disabledInputNilai: true,
      centuryInputdisabled: true,
      supplierInputdisabled: true,
      rowStatusMove:'d-none',
      rowBrand:'d-none',
      rowProcode:'d-none',
      rowKotaOutlet:'d-none',
      rowBrandOutlet:'d-none',
      rowKotaBesar:'d-none',
      rowTanggunganPerusahaan:'d-none',
      rowKerjasamaSupplier:'d-none',
      listProdukDiskon:'d-none'
    };
  }

  // -----------------------------------------------  SHOW ALL DATA ---------------------------------------------------------

  enableField = () => {
    if (this.state.flagisi === true) {
      var url = hostUrl + `/TampilSupplierFinance`;
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let suppApi = data.map(suppdata => {
            return {
              value: suppdata.sup_id,
              display: '[' + suppdata.sup_id + '] ' + suppdata.sup_nama,
            };
          });
          this.setState({
            suppliers: [{ value: '', display: '- Pilih Supplier -' }].concat(
              suppApi,
            ),
          });
        });
    }

    var currFlagisi = this.state.flagisi;
    this.setState({
      flagisi: !currFlagisi,
    });

    var currFlagSave = this.state.flagsavebtn;
    this.setState({
      flagsavebtn: !currFlagSave,
    });

    var currFlagCancel = this.state.flagcancelbtn;
    this.setState({
      flagcancelbtn: !currFlagCancel,
    });

    var currFlagAdd = this.state.flagaddbtn;
    this.setState({
      flagaddbtn: !currFlagAdd,
    });
  };

  handleSik2StartDateInputChange = event => {
    const value = event.target.value;
    const startDate = new Date(value);
    const endDate = new Date(this.state.dateclose);

    try {
      if (startDate >= endDate) {
        this.setState({
          dateopen: startDate.toISOString().substr(0, 10),
          hostout_tglefektifmesinInvalid: true,
          hostout_tglefektifmesinValid: false,
        });
      } else {
        this.setState({
          disabledtanggalTutup: false,
          dateopen: startDate.toISOString().substr(0, 10),
          hostout_tglefektifmesinInvalid: false,
          hostout_tglefektifmesinValid: true,
        });
      }
    } catch (error) {
      this.setState({
        hostout_tglefektifmesinInvalid: true,
        hostout_tglefektifmesinValid: false,
      });
    }
  };

  openModalSearchProcode() {
    this.setState({
      modal_procodeSearch: true,
    });
  }


  clickTableRow(){

this.setState({
  tableRowHeadID:'d-none',
  listProdukDiskon:'inline'
})
  }
  openModalSearchOutlet() {
    this.setState({
      modal_searchOutlet: true,
    });
  }

  handleSik2EndDateInputChange = event => {
    const value = event.target.value;
    const startDate = new Date(this.state.dateopen);
    const endDate = new Date(value);

    console.log('SIA: StartDate: ' + startDate);
    console.log('SIA: EndDate: ' + endDate);

    try {
      if (startDate >= endDate) {
        this.setState({
          dateclose: endDate.toISOString().substr(0, 10),
          hostout_penarikanmesinInvalid: true,
          hostout_penarikanmesinValid: false,
          disabledButtonNext: true,
        });
      } else {
        this.setState({
          dateclose: endDate.toISOString().substr(0, 10),
          hostout_penarikanmesinInvalid: false,
          hostout_penarikanmesinValid: true,
          disabledButtonNext: false,
          buttonSimpanEdit: false,
        });
      }
    } catch (error) {
      this.setState({
        dateclose: endDate,
        hostout_penarikanmesinInvalid: true,
        hostout_penarikanmesinValid: false,
        disabledButtonNext: true,
      });
    }
  };

  enableFieldCondition = () => {
    var url = hostUrl + `/TampilSupplierFinance`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let suppApi = data.map(suppdata => {
          return {
            value: suppdata.sup_id,
            display: '[' + suppdata.sup_id + '] ' + suppdata.sup_nama,
          };
        });
        this.setState({
          suppliers: [{ value: '', display: '- Pilih Supplier -' }].concat(
            suppApi,
          ),
        });
      });

    var currFlagisi = this.state.flagisi;
    this.setState({
      flagisi: !currFlagisi,
      modal_supplierNotFound: false,
      flagsavebtn: false,
      flagcancelbtn: false,
    });
  };

  updateInputValueSearchOutlet = evt => {
    console.log(evt.target);
    this.setState({
      outletSearch: evt.target.value.replace(/[^\w\s]/gi, '').toUpperCase(),
    });
  };

  updateInputValueSupplier = evt => {
    this.setState(
      {
        supp_id: evt.target.value,
      },
      this.getSupplierData(evt.target.value),
    );
  };

  getSupplierData = param => {
    var url = hostUrl + `/TampilDataSupplierFinance/${param}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          supplierName: data.sup_nama,
          supplierAddress1: data.sup_alamat1,
          supplierAddress2: data.sup_alamat2,
        });
      });
  };

  cancelButton() {
    this.searchInputValue(this.state.inputtedName);
    this.enableField();
    this.setState({
      modal_nested: false,
      supp_id: '',
      supplierName: '',
      supplierAddress1: '',
      supplierAddress2: '',
    });
  }

  cancelCariOutlet() {
    this.setState({
      outletSearch: '',
      searchOutletList: [],
      modal_outletSearch: false,
    });
  }
  clickCancelApprove(){
    this.setState({
      tableRowHeadID:'inline',
      listProdukDiskon:'d-none'
    })
  }

  refreshPage() {
    window.location.reload();
  }

  valueClicked() {
    this.setState({
      colorValue: 'danger',
      colorPercent: 'primary',
      labelPercent: 'd-none',
      inputValue: false,
      disabledInputNilai: false,
    });
  }

  percentClicked() {
    this.setState({
      colorPercent: 'danger',
      colorValue: 'primary',
      labelPercent: 'inline',
      inputValue: false,
      disabledInputNilai: false,
    });
  }

  valueClickedCentury() {
    this.setState({
      colorValueCentury: 'danger',
      colorPercentCentury: 'primary',
      labelPercentCentury: 'd-none',
      outlineButtonPercentCentury: true,
      outlineButtonValueCentury: false,
      centuryynChecked: true,
      centuryInputdisabled: false,
    });
  }

  percentClickedCentury() {
    this.setState({
      colorPercentCentury: 'danger',
      colorValueCentury: 'primary',
      labelPercentCentury: 'inline',
      outlineButtonPercentCentury: false,
      outlineButtonValueCentury: true,
      centuryynChecked: true,
      centuryInputdisabled: false,
    });
  }

  valueClickedSupplier() {
    this.setState({
      colorValueSupplier: 'danger',
      colorPercentSupplier: 'primary',
      labelPercentSupplier: 'd-none',
      outlineButtonPercentSupplier: true,
      outlineButtonValueSupplier: false,
      supplierynChecked: true,
      supplierInputdisabled: false,
    });
  }

  percentClickedSupplier() {
    this.setState({
      colorPercentSupplier: 'danger',
      colorValueSupplier: 'primary',
      labelPercentSupplier: 'inline',
      outlineButtonPercentSupplier: false,
      outlineButtonValueSupplier: true,
      supplierynChecked: true,
      supplierInputdisabled: false,
    });
  }
  
  checkStatusMove(e) {
 
    if (e.target.checked === true) {
      this.setState({
        rowStatusMove: 'inline',
  
      });
    } else {
      this.setState({
        rowStatusMove: "d-none",
      });
    }
  }
  
  
  checkBrandProcode(e) {

    if (e.target.checked === true) {
      this.setState({
        rowProcode: 'd-none',
        rowBrand: 'inline',
        brandChecked:true,
        procodeChecked:false,
      });
    } else {
      this.setState({
        brandChecked:false,
        rowBrand: "d-none",
      });
    }
  }

  
  checkProcode(e) {
    console.log("MASUKKK WOII")
    if (e.target.checked === true) {
      this.setState({
        rowProcode: 'inline',
        rowBrand:'d-none',
        procodeChecked:true,
        brandChecked:false
      });
    } else {
      this.setState({
        rowProcode: "d-none",
        procodeChecked:false,
      });
    }
  }
  
  checkBrandOutlet(e) {
 
    if (e.target.checked === true) {
      console.log("MASUK GANN")
      this.setState({
        rowBrandOutlet: 'inline',
        rowKotaOutlet: "d-none",
        brandChecked: true,
        kotaChecked:false
      });
    } else {
      this.setState({
        rowBrandOutlet: "d-none",
        brandChecked: false
      });
    }
  }

  checkKota(e) {

    if (e.target.checked === true) {
      this.setState({
        rowKotaOutlet: 'inline',
        rowBrandOutlet: "d-none",
        kotaChecked:true,
        brandChecked:false
      });
    } else {
      this.setState({
        kotaChecked:false,
        rowKotaOutlet: "d-none"
      });
    }
  }

  checkOutletkotaBesar(e) {
    console.log("MASUKKK WOII")
    if (e.target.checked === true) {
      this.setState({
        rowKotaBesar: 'inline'
      });
    } else {
      this.setState({
        rowKotaBesar: "d-none",
      });
    }
  }


  
    
  checkTanggunganPerusahaan(e) {
 
    if (e.target.checked === true) {
      this.setState({
        rowTanggunganPerusahaan: 'inline',
  
      });
    } else {
      this.setState({
        rowTanggunganPerusahaan: "d-none",
      });
    }
  }
  checkKerjasamaSupplier(e) {
 
    if (e.target.checked === true) {
      this.setState({
        rowKerjasamaSupplier: 'inline',
  
      });
    } else {
      this.setState({
        rowKerjasamaSupplier: "d-none",
      });
    }
  }

  // valueClickedPrincipal() {
  //   this.setState({
  //     colorValuePrincipal: 'danger',
  //     colorPercentPrincipal: 'primary',
  //     labelPercentPrincipal: 'd-none',
  //     outlineButtonPercentPrincipal:true,
  //     outlineButtonValuePrincipal:false,
  //     principalynChecked:true
  //   });
  // }

  // percentClickedPrincipal() {
  //   this.setState({
  //     colorPercentPrincipal:'danger',
  //     colorValuePrincipal:'primary',
  //     labelPercentPrincipal:'inline',
  //     outlineButtonPercentPrincipal:false,
  //     outlineButtonValuePrincipal:true,
  //     principalynChecked:true
  //   });
  // }
  // -----------------------------------------------  INSERT ---------------------------------------------------------

  addSupplierOutlet = (out_code, param) => async () => {
    var url = hostUrl + `/TambahSupplierOutlet/${out_code}`;

    var payload = {
      supout_supplierid: param,
      supout_userid: '0',
    };

    console.log(JSON.stringify(payload));
    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      json: true,
      body: JSON.stringify(payload),
    }).then(response => {
      if (response.ok) {
        this.state.jumlahJenisCamera = '';
        this.isLoading = false;
        this.componentDidMount();
        return response.json();
      }
    });

    if (data) {
      this.setState({
        modal_nested: false,
        supp_id: '',
        supplierName: '',
        supplierAddress1: '',
        supplierAddress2: '',
      });
      this.isLoading = true;
      this.showNotification('Data Berhasil Disimpan');
      this.searchInputValue(this.state.inputtedName);
      this.enableField();
    } else {
      alert('Data Sudah Pernah Ada');
    }
  };

  //fungsi notification
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

  //fungsi untuk mengambil semua data dimana memanggil current page dan perpage
  componentDidMount() {}

  //state awal pada saat membuka suatu page tsb nanti dicari langsung di render()
  state = {
    modal: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false,
    modal_delete: false,
    modal_update: false,
    modal_outletNotFound: false,
    modal_supplierNotFound: false,
    backdrop: true,
  };

  //fungsi untuk membuka suatu toggle di page tsb
  toggle = modalType => () => {
    if (!modalType) {
      return this.setState({
        modal: !this.state.modal,
      });
    }

    //pembuatan setState disemua function, dimana hanya memanggil nama nya saja ex modal_delete , maka di render hanya panggil delete saja
    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    });
  };

  addNotNull = () => {
    if (this.state.supp_id === '') {
      alert('Harus Pilih Supplier');
    } else {
      this.setState({
        modal_nested: true,
      });
    }
  };

  // --------------------------------------------------------- SEARCH --------------------------------------------------------- EDITED BY RICHARD & DANIEL & KRISS

  //mengambil parameter yang telah diinput di inputtedName . lalu dilempar ke Backend
  searchInputValue = outcode => {
    var url = hostUrl + `/TampilSupplierOutlet/${outcode}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ result: data, isLoading: false });

        // KALAU OUTLETNYA TIDAK ADA
        if (data[0] && data[0].outlet_exists === false) {
          this.setState({
            // modal_outletNotFound : true
          });
        }

        // KALAU OUTLET ADA, TAPI DATA PAJAK TIDAK ADA
        else if (data[0] && data[0].supplier_exists === false) {
          this.setState({
            modal_supplierNotFound: true,
            flagaddbtn: true,
          });
        }

        // KALAU OUTLET ADA DAN DATA PAJAK ADA
        else {
          this.setState({
            flagaddbtn: false,
          });
        }
      });

    this.setState({
      isLoading: true,
      modal_outletSearch: false,
      outletSearch: '',
      searchOutletList: [],
      inputtedName: outcode,
    });
  };

  getsearchOutletList = () => {
    this.setState({
      isLoading: true,
    });

    var url = hostUrl + `/CariDataOutletTanpaKota/${this.state.outletSearch}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            searchOutletList: data,
            isLoading: false,
          },
          () => console.log('searchOutletList: Data: ' + JSON.stringify(data)),
        );
      });
  };

  //function untuk melakukan search pada saat menekan enter
  enterPressed = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      event.preventDefault();
      this.getsearchOutletList();
    }
  };

  //ketika melakukan search, state input-an yang masuk harus uppercase dan tidak boleh special character
  setSearchInputState = evt => {
    this.setState({
      inputtedName: evt.target.value.replace(/[^\w\s]/gi, '').toUpperCase(),
    });
  };

  editTanggunganCentury = event => {
    const checked = event.target.checked;
    var yn = this.state.tanggunganCentury;

    if (checked) {
      yn = 'Y';
    } else {
      yn = 'N';
    }

    this.setState({
      [event.target.name]: yn,
      [event.target.name + 'Checked']: checked,
      [event.target.name + 'disabled']: !checked,
    });

    if (checked) {
      this.setState({
        centuryInputdisabled: false,
      });
    } else {
      this.setState({
        centuryInputdisabled: true,
      });
    }
  };

  editTanggunganSupplier = event => {
    const checked = event.target.checked;
    var yn = this.state.tanggunganSupplier;

    if (checked) {
      yn = 'Y';
    } else {
      yn = 'N';
    }

    this.setState({
      [event.target.name]: yn,
      [event.target.name + 'Checked']: checked,
      [event.target.name + 'disabled']: !checked,
    });

    if (checked) {
      this.setState({
        supplierInputdisabled: false,
      });
    } else {
      this.setState({
        supplierInputdisabled: true,
      });
    }
  };
  clickDiskon(){
    this.setState({
      modal_discount:true
    })
}

  //--------------------------------------------------------- DELETE ---------------------------------------------------------

  // 1.Pelemparan parameter ke Backend dimana data apa saja yang akan di hapus
  deleteSupplierOutlet = () => async () => {
    var url = hostUrl + `/HapusDataSupplier/${this.state.activeID}`;

    var payload = {
      user_id: '0',
    };

    let data = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      //2.Ketika sudah terespond oleh backend , maka frontend akan melakukan hal ini
      .then(response => {
        if (response.ok) {
          this.state.modal_delete = false;
          this.state.modal_nested = false;
          this.state.backdrop = false;
          this.componentDidMount();
          return response.json();
        }
      });

    if (data) {
      this.setState({
        modal_delete: false,
      });
      this.isLoading = true;
      this.showNotification('Data Berhasil Dihapus');
      this.searchInputValue(this.state.inputtedName);
    }
  };

  // set awal pada saat membuka delete
  openModalWithItemID(idSupplier) {
    this.setState({
      modal_delete: true,
      activeID: idSupplier,
    });
  }

  //--------------------------------------------------------- DESAIN HALAMAN ---------------------------------------------------------

  //render biasa nya di-isi untuk desain HTML
  render() {
    const { result, isLoading } = this.state;
    var currOpen = new Date();
    var currClose = new Date();
    currOpen.setDate(currOpen.getDate()+1);
    currClose.setDate(currClose.getDate());

    var dateOpen = currOpen.toISOString().substr(0, 10);
    var dateClose = currClose.toISOString().substr(0, 10);
    return (
      <Page
        title="Approval Program Discount AM"
        breadcrumbs={[{ name: 'Program Discount / Approval AM', active: true }]}
        className="Program Discount"
      >
        {/* ---------------------------------------- MODAL CARI OUTLET --------------------------------------------- */}

        <Modal
          // Modal untuk search Outlet
          isOpen={this.state.modal_outletSearch}
          toggle={this.toggle('outletSearch')}
          className="modal-dialog-scrollable modal-dialog-centered"
          size="lg"
          backdrop="static"
        >
          <ModalHeader>Search AM</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input
                name="outletSearchInput"
                placeholder="Ketik NIP atau Nama AM"
                value={this.state.outletSearchInput}
                disabled={this.state.isLoading}
                onKeyPress={event =>
                  this.handleOutletSearchOnEnterPressed(event, true)
                }
                onChange={event => this.handleInputChange(event)}
              />
              <InputGroupAddon addonType="append">
                <Button
                  disabled={this.state.isLoading}
                  onClick={() =>
                    this.getOutletList(this.state.outletSearchInput)
                  }
                >
                  <MdSearch />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <ListGroup className="mt-3">
              <ListGroupItem className="d-none">
                <p class="text-center font-weight-bold">Pilih salah satu</p>
              </ListGroupItem>
              {this.state.outletList.map(outlet => (
                <ListGroupItem
                  tag="button"
                  action
                  disabled={this.state.isLoading}
                  name={outlet.out_code}
                  onClick={event => this.cariOutlet(event.target.name)}
                >
                  {outlet.out_code + ' - ' + outlet.out_name}
                </ListGroupItem>
              ))}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              disabled={this.state.isLoading}
              onClick={this.toggle('outletSearch')}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.modal_discount}
          toggle={this.toggle('discount')}
          className="modal-dialog-scrollable modal-dialog-centered"
          size="lg"
        >
          <ModalHeader toggle={this.toggle('discount')}>Diskon</ModalHeader>
          <ModalBody>
            <Card outline color="primary">
              <Row className="d-flex justify-content-center mt-3">
                <Col xs={5} md={5} className="d-flex flex-column">
                  <ButtonGroup size="sm">
                    <Button
                      outline={this.state.outlineButtonPercentCentury}
                      xs={5}
                      md={5}
                      id="colorPercent"
                      color={this.state.colorPercentCentury}
                      onClick={() => this.percentClickedCentury()}
                    >
                      %
                    </Button>
                    <Button
                      outline={this.state.outlineButtonValueCentury}
                      xs={5}
                      md={5}
                      id="colorValue"
                      disabled={this.state.disabledColorValue}
                      color={this.state.colorValueCentury}
                      onClick={() => this.valueClickedCentury()}
                    >
                      Value
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center mb-3">
                <Col xs={5} md={5}>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input
                          value={this.state.tanggunganCentury}
                          name="centuryyn"
                          onClick={event => this.editTanggunganCentury(event)}
                          checked={this.state.centuryynChecked}
                          id="creditYNChecbox"
                          addon
                          type="checkbox"
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="tanggunganInputCentury"
                      name="centuryInput"
                      disabled={this.state.centuryInputdisabled}
                      placeholder="Century"
                    ></Input>

                    <InputGroupAddon addonType="append">
                      <InputGroupText
                        disabled
                        className={this.state.labelPercentCentury}
                      >
                        %
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button>Save</Button>
            <Button
              onClick={this.toggle('discount')}
              style={{
                background: '#FF0000',
                borderStyle: 'none',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* // -------------------------------------------------- MODAL PROCODE ------------------------------------------- // */}

        <Modal
          isOpen={this.state.modal_procodeSearch}
          toggle={this.toggle('procodeSearch')}
          className="modal-dialog-scrollable modal-dialog-centered"
          size="lg"
        >
          <ModalHeader toggle={this.toggle('procodeSearch')}>
            Pilih Procode
          </ModalHeader>
          <ModalBody>
            <Card outline color="primary">
              <Row>
                <Col xs={3} md={3} className="ml-5 mt-3 ">
                  <InputGroup>
                    <Input
                      value={this.state.brand}
                      checked={this.state.brandChecked}
                      onChange={evt => this.checkBrandProcode(evt)}
                      className="mt-1"
                      type="checkbox"
                    ></Input>
                    <Label>Brand</Label>
                  </InputGroup>
                </Col>

                <Col xs={3} md={3} className="ml-5 mt-3">
                  <Form>
                    <Input
                      id="procodeChecked"
                      value={this.state.procode}
                      checked={this.state.procodeChecked}
                      onChange={evt => this.checkProcode(evt)}
                      className="mt-1"
                      type="checkbox"
                    ></Input>
                    <Label>Procode</Label>
                  </Form>
                </Col>
              </Row>
            </Card>

            <Row className={this.state.rowBrand + ' mt-3'}>
              <Col>
                <Label>Brand</Label>
              </Col>
              <Col>
                <Input type="select">
                  <option>-- Pilih Brand --</option>
                  <option>CENTURY HEALTHCARE</option>
                  <option>CENTURY PHARMA</option>
                  <option>APOTEK GENERIK</option>
                  <option>TOKO OBAT</option>
                </Input>
              </Col>
            </Row>
            <Row className={this.state.rowProcode + ' mt-3'}>
              <Col>
                <Label>Procode</Label>
              </Col>
              <Col>
                <Input type="number" placeholder="Cari Product"></Input>
              </Col>
            </Row>

            <Card></Card>
          </ModalBody>
          <ModalFooter>
            <Button>OK</Button>
            <Button
              onClick={this.toggle('procodeSearch')}
              style={{
                background: '#FF0000',
                borderStyle: 'none',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* // -------------------------------------------------- MODAL OUTLET ------------------------------------------- // */}

        {/* // -------------------------------------------------- TAMPILAN DATA ------------------------------------------- // */}

        <Card className="mb-1">
          <NotificationSystem
            dismissible={false}
            ref={notificationSystem =>
              (this.notificationSystem = notificationSystem)
            }
            style={NOTIFICATION_SYSTEM_STYLE}
          />
          <CardBody id="selectedAccSupplier">
            <Form>
              {/* // -------------------------------------------------- TAMPILAN DATA SUPPLIER ------------------------------------------- // */}
              <Table
              className = {" table table-striped  table-bordered table-sm " +this.state.tableRowHeadID}
                responsive
                id="selectedColumn"
                hover
              
                bordered="3"
              >
                <thead >
                  <tr align="center">
                    <th class="th-sm">ID</th>
                    <th class="th-sm">User ID</th>
                    <th className="th-sm">
                    <MdPermIdentity
                    color = '#FF7F00'
                    size= '20px'
                    className = {'mr-2'}
                    ></MdPermIdentity>
                    Nama</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                  style={{cursor:'pointer'}}
                  onClick = {() => this.clickTableRow()}
                  >
                    <td align="center">
                          <Label> 1</Label>
                    </td>
                    <td align="center">
                          <Label> 190179P</Label>
                    </td>
                    <td align="center">

                          <Label> NARUTO </Label>
                    </td>
                  </tr>

                  <tr
                  style={{cursor:'pointer'}}
                  onClick = {() => this.clickTableRow()}
                  >
                    <td align="center">
                          <Label> 2</Label>
                    </td>
                    <td align="center">
                          <Label> 190180P</Label>
                    </td>
                    <td align="center">
                          <Label> SASUKE </Label>
                    </td>
                  </tr>
                  <tr
                  style={{cursor:'pointer'}}
                  onClick = {() => this.clickTableRow()}
                  >
                    <td align="center">
                          <Label> 3</Label>
                    </td>
                    <td align="center">
                          <Label> 190181P</Label>
                    </td>
                    <td align="center">
                          <Label> SAKURA </Label>
                    </td>
                  </tr>

                  <tr
                  style={{cursor:'pointer'}}
                  onClick = {() => this.clickTableRow()}
                  >
                    <td align="center">
                          <Label> 4</Label>
                    </td>
                    <td align="center">
                          <Label> P190591</Label>
                    </td>
                    <td align="center">
                          <Label> KAKASHI </Label>
                    </td>
                  </tr>
                </tbody>

                
              </Table>

            <Card  className={"font-weight-bold mb-3 " + this.state.listProdukDiskon} outline color = "primary">
            <InputGroup className = "justify-content-center" >
            <Input  placeholder = "1" disabled>
            
            </Input>
         
           
            <Input placeholder = "190179P" disabled>
            
            </Input>
         
            <Input  placeholder = "NARUTO" disabled>
            
            </Input>
         
            </InputGroup>
            </Card>
            <Row className ={this.state.listProdukDiskon}>
            <Col className={"d-flex justify-content-end "}>
            <Label className = "mr-2 mt-2">Total Estimasi Diskon Bulanan </Label>
            <Card outline color ='primary'>
            <InputGroup>
           
            <InputGroupAddon addonType='prepend'>
            
             <InputGroupText
             className = {
              'font-weight-bold'
            }
             >Rp</InputGroupText>
            </InputGroupAddon>
            <Input 
            className = {
               "text-success"
             }

            disabled 
            value = '25,000,000'
           />

            </InputGroup>
            </Card>
            </Col>
           
            </Row>
             <Row className ={ this.state.listProdukDiskon}>

             
             <Col className={"d-flex justify-content-end "}>
             <Label className = "mr-2 mt-2">Total Akumulasi Diskon</Label>
             <Card outline color ='primary'>
             <InputGroup>
            
             <InputGroupAddon addonType='prepend'>
             
              <InputGroupText
              className = {
                'font-weight-bold'
              }
              >Rp</InputGroupText>
             </InputGroupAddon>
             <Input 
              disabled 
              className = {
              "text-danger"
              }
              value = '14,000,000'
              
           >
          
           </Input>

             </InputGroup>
             </Card>
             </Col>
             
             <MdTagFaces 
           color = '#0000FF'
             size = "25px"
             className ={
              "mt-2 mr-1" 

             }></MdTagFaces>
            
             </Row>

              <Label className={"font-weight-bold m-2 "+this.state.listProdukDiskon}>
                LIST PRODUK DISCOUNT
              </Label>
              <Table
                responsive
                id="selectedColumn"
                className={"table table-striped table-bordered table-sm "+ this.state.listProdukDiskon}
                bordered="3"
              >
                <thead>
                  <tr align="center">
                    <Button className="mt-2 mr-1 mb-1" size="sm">
                      {' '}
                      Pilih Semua
                    </Button>
                    <th class="th-sm">ID Diskon</th>
                    <th class="th-sm">Kode Produk</th>
                    <th class="th-sm">Nama Produk</th>
                    <th class="th-sm">Harga Sebelum Diskon</th>
                    <th class="th-sm">Value Diskon</th>
                    <th class="th-sm">Harga Setelah Diskon</th>
                    <th class="th-sm">Periode Diskon</th>

                    <th class="th-sm"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
               
                    <Col className="d-flex justify-content-center ml-3 mt-3">
                      <Input type="checkbox"> </Input>
                    </Col>
                    <td align="center">1</td>
                    <td align="center">0201784</td>
                    <td align="center">POLYSILANE SUSPENSI 100 ML</td>
                    <td align="center">22,500</td>
                    <td align="center">6,000</td>
                    <td align="center">16,500</td>
                    <td align="center">
                      <Col>
                        <Label>14-Maret-1998</Label>
                      </Col>
                      <Col>
                        <Label className="font-weight-bold">s/d</Label>
                      </Col>
                      <Col>
                        <Label>14-Maret-2020</Label>
                      </Col>
                    </td>
                    <td align="center">
                      <Button
                        style={{
                          borderStyle: 'none',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onClick={() => this.clickDiskon()}
                        size="sm"
                      >
                        <MdLoyalty></MdLoyalty>
                      </Button>
                      <Button
                        style={{
                          background: '#FF0000',
                          borderStyle: 'none',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        size="sm"
                      >
                        <MdDelete></MdDelete>
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <Col className="d-flex justify-content-center ml-3 mt-3">
                      <Input type="checkbox"> </Input>
                    </Col>
                    <td align="center">1</td>
                    <td align="center">0103625</td>
                    <td align="center">ALBOTHYL CONCENTRATE 10 ML</td>
                    <td align="center">100,000</td>
                    <td align="center">25%</td>
                    <td align="center">75,000</td>
                    <td align="center">
                      <Col>
                        <Label>14-Maret-1998</Label>
                      </Col>
                      <Col>
                        <Label className="font-weight-bold">s/d</Label>
                      </Col>
                      <Col>
                        <Label>14-Maret-2020</Label>
                      </Col>
                    </td>

                    <td align="center">
                      <Button
                        style={{
                          borderStyle: 'none',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onClick={() => this.clickDiskon()}
                        size="sm"
                      >
                        <MdLoyalty></MdLoyalty>
                      </Button>
                      <Button
                        style={{
                          background: '#FF0000',
                          borderStyle: 'none',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        size="sm"
                      >
                        <MdDelete></MdDelete>
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <Col className="d-flex justify-content-center ml-3 mt-3">
                      <Input type="checkbox"> </Input>
                    </Col>
                    <td align="center">1</td>
                    <td align="center">0302478</td>
                    <td align="center">FRUIT 18JR FRUITS EXTRACTS 30</td>
                    <td align="center">12,000</td>
                    <td align="center">5%</td>
                    <td align="center">11,400</td>
                    <td align="center">
                      <Col>
                        <Label>14-Maret-1998</Label>
                      </Col>
                      <Col>
                        <Label className="font-weight-bold">s/d</Label>
                      </Col>
                      <Col>
                        <Label>14-Maret-2020</Label>
                      </Col>
                    </td>
                    <td align="center">
                      <Button
                        style={{
                          borderStyle: 'none',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onClick={() => this.clickDiskon()}
                        size="sm"
                      >
                        <MdLoyalty></MdLoyalty>
                      </Button>
                      <Button
                        style={{
                          background: '#FF0000',
                          borderStyle: 'none',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        size="sm"
                      >
                        <MdDelete></MdDelete>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Row className={this.state.listProdukDiskon}
              >

              <Col>
              <Button>
              Back
              </Button>
              </Col>
            
           
      <Col className =" d-flex justify-content-end">
      <Button      className ="mr-1" >APPROVE</Button>
      <Button 
 
         
      style={{ 
   
        background: '#FF0000',
        borderStyle: 'none',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick = {()=> this.clickCancelApprove()}>CANCEL</Button>
    
      </Col>
              
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Page>
    );
  }
}
export default DiscountAM;
