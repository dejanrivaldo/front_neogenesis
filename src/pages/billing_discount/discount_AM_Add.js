import Page from 'components/Page';
import React from 'react';
import Typography from 'components/Typography';
import {
  MdSearch,
  MdLoyalty,
  MdDelete,
  MdDateRange,
  MdHome,
  MdCheckCircle,
  MdLibraryAdd,
} from 'react-icons/md';
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
  ButtonGroup,
  InputGroupText,
  FormGroup,
  UncontrolledTooltip,
  Spinner,
} from 'reactstrap';

const hostUrl = 'http://10.0.111.143:8083';
var tempListProduct = [];
class DiscountAM extends React.Component {
  //special method
  constructor(props) {
    var currOpen = new Date();
    var currClose = new Date();
    
    
    var d = new Date();
    var insertedDate =
      d.toISOString().substr(0, 10) + ' ' + d.toISOString().substr(11, 8);

    currOpen.setDate(currOpen.getDate() + 1);
    currClose.setDate(currClose.getDate());

    var dateOpen = currOpen.toISOString().substr(0, 10);

    var dateClose = currClose.toISOString().substr(0, 10);
    const tanggal = new Date().toISOString().substr(8, 2);
    const tahun = new Date().toISOString().substr(0, 4);
    const bulan = new Date().toISOString().substr(5, 2);

    super(props);
    this.state = {
      Brands: [],
      ListProduct: [],
      discountList: [],
      discountPercentShow: [],
      discountHJAList: [],
      discountListUninputted: [],
      discountPercentShowUninputted: [],
      discountHJAListUninputted: [],
      searchProcodeBrandList: [],
      searchProcodeList: [],
      searchBrandCheckList: [],
      searchProcodeCheckList: [],
      dataInputteds: [],
      dataUninputteds: [],
      isLoading: false,
      disabledtanggalTutup: true,
      addProcodeProduct: true,
      inputValue: true,
      disabledInputNilai: true,
      centuryInputdisabled: true,
      supplierInputdisabled: true,
      selectBrand: true,
      labelPercent: 'd-none',
      rowBrand: 'd-none',
      rowProcode: 'd-none',
      listsearchProcodeList: 'd-none',
      listsearchProcodeBrandList: 'd-none',
      rowListProduct: 'd-none',
      rowListProductUninputted: 'd-none',
      rowListProductInputted: 'd-none',
      Rpinputted: 'd-none',
      RpUninputted: 'd-none',
      isLoadingFind: 'true',
      insertedDate: insertedDate,
      tanggal: tanggal,
      tahun: tahun,
      bulan: bulan,
      dateopen: dateOpen,
      dateclose: dateClose,
      discountId: 0,
      discountIdUninputted: 0,

    };

    this.getTotalDiscountPerMonth(this.state.bulan, this.state.tahun);
  }

  // -----------------------------------------------  SHOW ALL DATA ---------------------------------------------------------

  //tanggal yang dimasukan pada saat pertama kali input
  handleSik2StartDateInputChange = event => {
    const value = event.target.value;
    const startDate = new Date(event.target.value);
    const endDate = new Date(this.state.dateclose);

    const tanggal = new Date(value).toISOString().substr(8, 2);
    const tahun = new Date(value).toISOString().substr(0, 4);
    const bulan = new Date().toISOString().substr(5, 2);
    try {
      if (startDate >= endDate) {
        this.setState({
          bulan: bulan,
          tanggal: tanggal,
          tahun: tahun,
          disabledtanggalTutup: false,
          dateopen: startDate.toISOString().substr(0, 10),
          hostout_tglefektifmesinInvalid: true,
          hostout_tglefektifmesinValid: false,
        });
      } else {
        this.setState({
          tanggal: tanggal,
          bulan: bulan,
          tahun: tahun,
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
    this.getTotalDiscountPerMonth(this.state.bulan, this.state.tahun);
  };   

  openModalSearchProcode() {
    this.getTypeBrand();
    this.setState({
      rowCardBrandandProcode:'d-none',
      brand: '',
      procodeSearch: '',
      modal_procodeSearch: true,
    });
  }

  handleSik2EndDateInputChange = event => {
    const value = event.target.value;

    const startDate = new Date(this.state.dateopen);
    const endDate = new Date(value);

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
          addProcodeProduct: false,
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

  createCsv = () => {
    let rows = [
      ['Kode Produk', 'Nama Produk', 'HJA', 'Diskon', 'HJA Setelah Diskon'],
    ];
    const currentTodos = this.state.ListProduct;

    currentTodos.forEach((product, index) => {
      rows.push([
        product.pro_code,
        product.pro_name2,
        product.pro_saleprice,
        this.state.discountList[index] + this.state.discountPercentShow[index],
        this.state.discountHJAList[index],
      ]);
    });

    let csvContent =
      'data:text/csv;charset=utf-8,' + rows.map(r => r.join(',')).join('\n');

    let uri = encodeURI(csvContent);
    let link = document.createElement('a');
    link.download = 'outlet.csv';
    link.href = uri;
    link.click();

    this.toggle();
  };

  valueClickedCentury() {
    this.setState({
      clickOptionDiscount: 'value',
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
      clickOptionDiscount: 'percent',
      colorPercentCentury: 'danger',
      colorValueCentury: 'primary',
      labelPercentCentury: 'inline',
      outlineButtonPercentCentury: false,
      outlineButtonValueCentury: true,
      centuryynChecked: true,
      centuryInputdisabled: false,
    });
  }

  checkBrandProcode(e) {
    if (e.target.checked === true) {
      this.setState({
        rowProcode: 'd-none',
        rowBrand: 'inline',
        listsearchProcodeList: 'd-none',
        brandChecked: true,
        procodeChecked: false,
      });
    } else {
      this.setState({
        listsearchProcodeBrandList: 'd-none',
        brandChecked: false,
        rowBrand: 'd-none',
      });
    }
  }
  changeProcode(evt) {
    var procodeSearch = evt.target.value;
    this.setState({
      procodeSearch: procodeSearch,
    });
  }


  clickOKPilihOutlet(){

    this.setState({
      rowCardBrandandProcode:'inline'
    })
  }
  changeBrandSearch(evt) {
    var brand = evt.target.value;
    if (evt.target.value !== null) {
      var url = `http://10.0.111.37:8067/masterpromosi?type=TampilkanDataByBrandcode&brandcode=${brand}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.setState({
            searchProcodeBrandList: data.data,
            searchBrandCheckList: [],
            listsearchProcodeBrandList: 'inline',
            isLoading: false,
          });
        });
    }
  }

  changeProcodeSearch(procodeSearch) {
    this.setState({
      listsearchProcodeBrandList: 'd-none',
    });
    var url = `http://10.0.111.37:8067/masterpromosi?type=TampilkanDataByProcode&procode=${procodeSearch}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          listsearchProcodeList: 'inline',
          searchProcodeList: data.data,
          error: data.error,
        });
      });
  }

  checkProcode(e) {
    if (e.target.checked === true) {
      this.setState({
        rowProcode: 'inline',
        rowBrand: 'd-none',
        listsearchProcodeBrandList: 'd-none',
        procodeChecked: true,
        brandChecked: false,
      });
    } else {
      this.setState({
        listsearchProcodeList: 'd-none',
        rowProcode: 'd-none',
        procodeChecked: false,
      });
    }
  }

  handleBrandCheckboxClick(event, brand, index) {
    const checked = event.target.checked;
    var searchBrandCheckList = this.state.searchBrandCheckList;

    if (checked === true) {
      tempListProduct.push(brand['pro_code']);
      searchBrandCheckList[index] = true;
      this.setState({
        searchBrandCheckList: searchBrandCheckList,
        isLoadingFind: false,
      });
    } else {
      tempListProduct.splice(tempListProduct.indexOf(brand), 1);
      searchBrandCheckList[index] = false;
      this.setState({
        searchBrandCheckList: searchBrandCheckList,
        isLoadingFind: false,
      });
    }
  }

  handleProcodeCheckboxClick(event, procode, index) {
    const checked = event.target.checked;
    var searchProcodeCheckList = this.state.searchProcodeCheckList;

    if (checked === true) {
      tempListProduct.push(procode);
      searchProcodeCheckList[index] = true;
      this.setState({
        searchBrandCheckList: searchProcodeCheckList,
        isLoadingFind: false,
      });
    } else {
      tempListProduct.splice(tempListProduct.indexOf(procode), 1);
      searchProcodeCheckList[index] = false;
      this.setState({
        searchProcodeCheckList: searchProcodeCheckList,
        isLoadingFind: false,
      });
    }
  }

  clickSelectAllBrand() {
    var searchBrandCheckList = this.state.searchBrandCheckList;

    tempListProduct = [];

    this.state.searchProcodeBrandList.map((brand, index) => {
      tempListProduct.push(brand['pro_code']);
      searchBrandCheckList[index] = true;
    });
    this.setState({
      searchBrandCheckList: searchBrandCheckList,
      isLoadingFind: false,
    });
  }

  clickUnselectAllBrand() {
    var searchBrandCheckList = this.state.searchBrandCheckList;
    tempListProduct = [];

    this.state.searchProcodeBrandList.map((brand, index) => {
      tempListProduct.push(brand['pro_code']);
      searchBrandCheckList[index] = false;
    });

    this.setState({
      searchBrandCheckList: searchBrandCheckList,
      isLoadingFind: true,
    });
  }

  clickSelectAllProcode() {
    var searchProcodeCheckList = this.state.searchProcodeCheckList;
    tempListProduct = [];

    this.state.searchProcodeList.map((procode, index) => {
      tempListProduct.push(procode['pro_code']);
      searchProcodeCheckList[index] = true;
    });

    this.setState({
      searchProcodeCheckList: searchProcodeCheckList,
      isLoadingFind: false,
    });
  }

  clickUnselectAllProcode() {
    var searchProcodeCheckList = this.state.searchProcodeCheckList;
    tempListProduct = [];

    this.state.searchProcodeList.map((brand, index) => {
      tempListProduct.push(brand['pro_code']);
      searchProcodeCheckList[index] = false;
    });

    this.setState({
      searchBrandCheckList: searchProcodeCheckList,
      isLoadingFind: true,
    });
  }

  handleOKButtonClick = async () => {
    var currListProduct = this.state.ListProduct;
    this.setState(
      {
        ListProduct: currListProduct.concat(tempListProduct),
        modal_procodeSearch: false,
      },
      () => this.postListProduct(),
    );
  };

  postListProduct = async () => {
    var url = `http://10.0.111.37:8067/masterpromosi?type=TampilkanDataInputtedByProcode&bulan=${this.state.bulan}&tahun=${this.state.tahun}`;

    var payload = {
      Procodes: this.state.ListProduct,
    };

    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      json: true,
      body: JSON.stringify(payload),
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
    });

    if (data.data.DataInputted != null) {
      this.setState({
        rowListProductInputted: 'inline',
        dataInputteds: data.data.DataInputted,
        rowListProduct: 'inline',
      });
    } else {
      this.setState({
        rowListProductInputted: 'd-none',
      });
    }
    if (data.data.DataUninputted != null) {
      this.setState({
        rowListProduct: 'inline',
        dataUninputteds: data.data.DataUninputted,
        rowListProductUninputted: 'inline',
      });
    } else {
      this.setState({
        rowListProductUninputted: 'd-none',
        DataUninputted: [],
      });
    }
  };

  //mengambil untuk dropdown pada pemilihan type brand
  getTypeBrand() {
    var url = 'http://10.0.111.37:8067/masterpromosi?type=TampilkanDataBrand';

    try {
      fetch(url)
        .then(response => {
          if (response.ok) {
            console.log('RESPONSE OK');
            return response.json();
          } else {
            console.log('RESPONSE NOT FOUND');
          }
        })
        .then(data => {
          let resultBrand = data.data.map(brand => {
            return {
              value: brand.Bra_BrandedCode,
              display: brand.Bra_BrandedName,
            };
          });
          this.setState({
            selectBrand: false,
            Brands: [{ value: '0', display: 'Pilih Brand' }]
              .concat(resultBrand)
              .sort((a, b) => a.display > b.display),
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  
  getTotalDiscountPerMonth(tanggal, tahun) {
    var url = `http://10.0.111.37:8067/masterpromosi?type=TampilkanDataInputtedByProcode&bulan=${this.state.bulan}&tahun=${this.state.tahun}`;
    console.log(url + ' totalDiscountBulananTSB');
    try {
      fetch(url)
        .then(response => response.json())
        .then(data =>
          this.setState({
            resultTotalDiscountPerMonth: data.data,
            isLoading: false,
            totalPage: data.totalPages,
          }),
        );
    } catch (error) {
      console.log(error);
    }
  }
  // -----------------------------------------------  INSERT ---------------------------------------------------------

  //when insert discount
  insertDiscount = async () => {
    this.setState({
      isLoading: true,
      modal_submitDiscountSuccess: true,
    });
    var url = `http://10.0.111.37:8067/masterpromosi?type=AddNewData`;

    var discountHeaders = [];
    var discountDetails = [];
    var CashReg_ProgramPromosiList = [];
    var payload = [];

    this.state.dataInputteds.map((product, index, error) => {
      const productObjHeader = {
        TDH_D_TglAwal: this.state.insertedDate,
        TDH_D_TglAkhir: this.state.insertedDate,
        TDH_C_NoSup: '',
        TDH_C_NoPrin: product.pro_princode,
        TDH_C_Procod: product.pro_code,
        TDH_C_TipeDisc: 'M',
        TDH_C_KDBrand: product.pro_brandcode,
        TDH_C_TagihKe: '',
        TDH_C_KirimKe: '',
        TDH_D_TglDel: this.state.insertedDate,
        TDH_C_Confirm: '190179P',
        TDH_D_DateConfirm: this.state.insertedDate,
        TDH_C_UpdateID: '',
        TDH_D_UpdateTime: this.state.insertedDate,
      };

      const productObj = {
        TDD_C_Procod: product.pro_code,
        TDD_N_Disc: '',
        TDD_M_DiscRPH: '',
        TDD_N_DiscSupplier: this.state.discountList[index],
        TDD_M_DiscRPHSupl: this.state.discountList[index],
        TDD_C_Progressive: 'Y',
        TDD_D_TglDel: this.state.insertedDate,
      };

      const CashReg_ProgramPromosi = {
        Cash_Code: product.pro_code,
        Cash_TglAwal: this.state.insertedDate,
        Cash_TglAkhir: this.state.insertedDate,

        Cash_HJA: this.state.discountHJAList[index],
        Cash_MinBeli: '',
        Cash_CekPoin: '',
        Cash_Discount: this.state.discountList[index],
        Cash_DiscSup: '',
        Cash_DiscCent: this.state.discountList[index],

        Cash_DiscMember: '',
        Cash_ActiveYN: 'Y',
        Cash_LastUpdate: this.state.insertedDate,
        Cash_EDYN: 'N',
        Cash_KetED: 'ASD',
      };
      discountHeaders.push(productObjHeader);
      discountDetails.push(productObj);
      CashReg_ProgramPromosiList.push(CashReg_ProgramPromosi);
    });

    this.state.dataUninputteds.map((product, indexUninputted) => {
      const productObjHeaderUninputted = {
        TDH_D_TglAwal: this.state.insertedDate,
        TDH_D_TglAkhir: this.state.insertedDate,
        TDH_C_NoSup: '',
        TDH_C_NoPrin: product.pro_princode,
        TDH_C_Procod: product.pro_code,
        TDH_C_TipeDisc: 'M',
        TDH_C_KDBrand: product.pro_brandcode,
        TDH_C_TagihKe: '',
        TDH_C_KirimKe: '',
        TDH_D_TglDel: this.state.insertedDate,
        TDH_C_Confirm: '190179P',
        TDH_D_DateConfirm: this.state.insertedDate,
        TDH_C_UpdateID: '',
        TDH_D_UpdateTime: this.state.insertedDate,
      };

      const productObjUninputted = {
        TDD_C_Procod: product.pro_code,
        TDD_N_Disc: '',
        TDD_M_DiscRPH: '',
        TDD_N_DiscSupplier: this.state.discountListUninputted[indexUninputted],
        TDD_M_DiscRPHSupl: this.state.discountListUninputted[indexUninputted],
        TDD_C_Progressive: 'Y',
        TDD_D_TglDel: this.state.insertedDate,
      };

      const CashReg_ProgramPromosiUninputted = {
        Cash_Code: product.pro_code,
        Cash_TglAwal: this.state.insertedDate,
        Cash_TglAkhir: this.state.insertedDate,

        Cash_HJA: this.state.discountHJAListUninputted[indexUninputted],
        Cash_MinBeli: '',
        Cash_CekPoin: '',
        Cash_Discount: this.state.discountListUninputted[indexUninputted],
        Cash_DiscSup: '',
        Cash_DiscCent: this.state.discountListUninputted[indexUninputted],

        Cash_DiscMember: '',
        Cash_ActiveYN: 'Y',
        Cash_LastUpdate: this.state.insertedDate,
        Cash_EDYN: 'N',
        Cash_KetED: 'ASD',
      };

      discountHeaders.push(productObjHeaderUninputted);
      discountDetails.push(productObjUninputted);
      CashReg_ProgramPromosiList.push(CashReg_ProgramPromosiUninputted);
    });

    discountHeaders.map((header, index) => {
      var obj = {
        T_Discount_Header: discountHeaders[index],
        T_Discount_Detail: discountDetails[index],
        T_Discount_Outlet: {
          TDO_D_TglDel: this.state.insertedDate,
          TDO_D_TglModem: this.state.insertedDate,
        },
        T_CashReg_ProgramPromosi: CashReg_ProgramPromosiList[index],
      };
      payload.push(obj);
    });

    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      json: true,
      body: JSON.stringify(payload),
    }).then(response => {
      if (response.ok) {
        this.setState({
          isLoading: false,
        });
        window.location.reload();
        return response.json();
      }
    });
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

  // --------------------------------------------------------- SEARCH --------------------------------------------------------- EDITED BY RICHARD & DANIEL & KRISS

  //function untuk melakukan search pada saat menekan enter
  enterPressed = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      event.preventDefault();
    }
  };

  //ketika melakukan search, state input-an yang masuk harus uppercase dan tidak boleh special character

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

  clickDiskon(event) {
    const id = parseInt(event.currentTarget.id);
    this.setState({
      modal_discount: true,
      discountId: id,
    });
  }
  clickDiskonUninputted(event) {
    const id = parseInt(event.currentTarget.id);
    this.setState({
      modal_discount_uninputted: true,
      discountIdUninputted: id,
    });
  }

  clickDiscountSave = () => {
    const id = this.state.discountId + 0;
    const input = this.state.inputDiscount;
    const salePrice = this.state.dataInputteds[id].pro_saleprice;

    const discountList = this.state.discountList;
    const discountPercentShow = this.state.discountPercentShow;
    const clickOptionDiscount = this.state.clickOptionDiscount;


    const discountHJAList = this.state.discountHJAList;

    discountList[this.state.discountId] = input;

    if (clickOptionDiscount === 'percent') {
      discountPercentShow[this.state.discountId] = '%';
      discountHJAList[this.state.discountId] =
        salePrice - salePrice * (input / 100);
    } else {
      discountPercentShow[this.state.discountId] = '';
      discountHJAList[this.state.discountId] = salePrice - input;
    }

    this.setState({
      Rpinputted: 'inline',
      discountPercentShow: discountPercentShow,
      discountList: discountList,
      modal_discount: false,
    });
  };

  openModalAllDiscount() {
    this.setState({
      modal_all_discount: true,
    });
  }

  clickDiscountSaveUninputted = () => {
    const id = this.state.discountIdUninputted + 0;
    const input = this.state.inputDiscountUninputted;
    const salePrice = this.state.dataUninputteds[id].pro_saleprice;
    const discountListUninputted = this.state.discountListUninputted;
    const discountPercentShowUninputted = this.state
      .discountPercentShowUninputted;
    const clickOptionDiscount = this.state.clickOptionDiscount;

    const discountHJAListUninputted = this.state.discountHJAListUninputted;
    discountListUninputted[this.state.discountIdUninputted] = input;

    if (clickOptionDiscount === 'percent') {
      discountPercentShowUninputted[this.state.discountIdUninputted] = '%';
      discountHJAListUninputted[this.state.discountIdUninputted] =
        salePrice - salePrice * (input / 100);
    } else {
      discountPercentShowUninputted[this.state.discountIdUninputted] = '';
      discountHJAListUninputted[this.state.discountIdUninputted] =
        salePrice - input;
    }

    this.setState({
      RpUninputted: 'inline',
      discountPercentShowUninputted: discountPercentShowUninputted,
      discountListUninputted: discountListUninputted,
      modal_discount_uninputted: false,
    });
  };

  //when discount is clicked
  clickDiscountSaveAll() {
    const input = this.state.inputDiscount;
    const discountList = [];
    const discountHJAList = [];
 
    const discountPercentShow = [];
 

    this.state.dataInputteds.map((product, index) => {
      const salePrice = product.pro_saleprice;

      discountList[index] = input;

      if (this.state.clickOptionDiscount === 'percent') {
        discountPercentShow[index] = '%';
        discountHJAList[index] = salePrice - salePrice * (input / 100);
      } else {
        discountPercentShow[index] = '';
        discountHJAList[index] = salePrice - input;
      }
    });
    this.setState({
      Rpinputted: 'inline',
      discountPercentShow: discountPercentShow,
      discountHJAList: discountHJAList,
      discountList: discountList,
      modal_all_discount: false,
    });
  }

  clickDiscountSaveAllUninputted() {
    const input = this.state.inputDiscountUninputted;
    const discountListUninputted = [];
    const discountHJAListUninputted = [];
  
    const discountPercentShowUninputted = [];


    this.state.dataUninputteds.map((product, indexUninputted) => {
      const salePrice = product.pro_saleprice;

      discountListUninputted[indexUninputted] = input;

      if (this.state.clickOptionDiscount === 'percent') {
        discountPercentShowUninputted[indexUninputted] = '%';
        discountHJAListUninputted[indexUninputted] =
          salePrice - salePrice * (input / 100);
      } else {
        discountPercentShowUninputted[indexUninputted] = '';
        discountHJAListUninputted[indexUninputted] = salePrice - input;
      }
    });

    this.setState({
      RpUninputted: 'inline',
      discountPercentShowUninputted: discountPercentShowUninputted,
      discountHJAListUninputted: discountHJAListUninputted,
      discountListUninputted: discountListUninputted,
      modal_all_discount_uninputted: false,
    });
  }
  openModalAllDiscountUninputted() {
    this.setState({
      modal_all_discount_uninputted: true,
    });
  }

  clickDelete_Inputted_Row(index) {
   
    var ListProduct = this.state.dataInputteds;
    var discountList = this.state.discountList;
    var discountPercentShow = this.state.discountPercentShow;
    var discountHJAList = this.state.discountHJAList;

    ListProduct.splice(index, 1);
    discountList.splice(index, 1);
    discountPercentShow.splice(index, 1);
    discountHJAList.print(index, 1);
    this.setState({
      ListProduct: ListProduct,
      discountList: discountList,
      discountPercentShow: discountPercentShow,
      discountHJAList: discountHJAList,
    });
  }

  clickDelete_Uninputted_Row(indexUninputted) {
    
    var ListProduct = this.state.dataUninputteds;
    var discountListUninputted = this.state.discountListUninputted;
    var discountPercentShowUninputted = this.state
      .discountPercentShowUninputted;
    var discountHJAListUninputted = this.state.discountHJAListUninputted;

    ListProduct.splice(indexUninputted, 1);
    discountListUninputted.splice(indexUninputted, 1);
    discountPercentShowUninputted.splice(indexUninputted, 1);
    discountHJAListUninputted.splice(indexUninputted, 1);
    this.setState({
      ListProduct: ListProduct,
      discountListUninputted: discountListUninputted,
      discountPercentShowUninputted: discountPercentShowUninputted,
      discountHJAListUninputted: discountHJAListUninputted,
    });
  }

  checkInputDiscountUninputted(evt) {
    var inputDiscountUninputted = evt.target.value;
    if (this.state.clickOptionDiscount === 'percent') {
      this.setState({
        inputDiscountUninputted: inputDiscountUninputted,
      });
    } else {
      this.setState({
        inputDiscountUninputted: inputDiscountUninputted,
      });
    }
  }

  checkInputDiscount(evt) {
    var inputDiscount = evt.target.value;

    if (this.state.clickOptionDiscount === 'percent') {
      this.setState({
        inputDiscount: inputDiscount,
      });
    } else {
      this.setState({
        inputDiscount: inputDiscount,
      });
    }
  }

  //--------------------------------------------------------- DESAIN HALAMAN ---------------------------------------------------------

  //render biasa nya di-isi untuk desain HTML
  render() {
    const { isLoading } = this.state;
    var currOpen = new Date();
    var currClose = new Date();
    currOpen.setDate(currOpen.getDate() + 1);
    currClose.setDate(currClose.getDate());

    var dateOpen = currOpen.toISOString().substr(0, 10);
    var dateClose = currClose.toISOString().substr(0, 10);

    return (
      <Page
        title="Program Discount"
        breadcrumbs={[{ name: 'Program Discount ', active: true }]}
        className="Program Discount"
      >
        {/* ---------------------------------------- MODAL CARI OUTLET --------------------------------------------- */}

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
                      value={this.state.inputDiscount}
                      type="number"
                      onChange={evt => this.checkInputDiscount(evt)}
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
            <Button onClick={() => this.clickDiscountSave()}>Save</Button>
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

        <Modal
          isOpen={this.state.modal_discount_uninputted}
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
                      value={this.state.inputDiscountUninputted}
                      type="number"
                      onChange={evt => this.checkInputDiscountUninputted(evt)}
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
            <Button onClick={() => this.clickDiscountSaveUninputted()}>
              Save
            </Button>
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

        <Modal
          isOpen={this.state.modal_all_discount}
          toggle={this.toggle('all_discount_toggle_inputted')}
          className="modal-dialog-scrollable modal-dialog-centered"
          size="lg"
        >
          <ModalHeader toggle={this.toggle('discount')}>
            All Produk Diskon
          </ModalHeader>
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
                      value={this.state.inputDiscount}
                      type="number"
                      onChange={evt => this.checkInputDiscount(evt)}
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
            <Button onClick={() => this.clickDiscountSaveAll()}>Save</Button>
            <Button
              onClick={this.toggle('all_discount_toggle_inputted')}
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

        <Modal
          isOpen={this.state.modal_all_discount_uninputted}
          toggle={this.toggle('all_discount_uninputted')}
          className="modal-dialog-scrollable modal-dialog-centered"
          size="lg"
        >
          <ModalHeader toggle={this.toggle('discount')}>
            All Produk Diskon
          </ModalHeader>
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
                      value={this.state.inputDiscountUninputted}
                      type="number"
                      onChange={evt => this.checkInputDiscountUninputted(evt)}
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
            <Button onClick={() => this.clickDiscountSaveAllUninputted()}>
              Save
            </Button>
            <Button
              onClick={this.toggle('all_discount_uninputted')}
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
          isOpen={this.state.modal_submitDiscountSuccess}
          toggle={this.toggle('submitDiscountSuccess')}
          className="modal-dialog-centere"
          modalTransition={{ timeout: 500 }}
          backdropTransition={{ timeout: 300 }}
          backdrop="static"
        >
          <ModalBody>
            <Row className={'d-flex justify-content-center'}>
              <MdCheckCircle size="100px" color="#008000"></MdCheckCircle>
            </Row>
            <Row className={'d-flex justify-content-center'}>
              <Label className={'font-weight-bold'} size="md">
                Sukses Menambahkan Data!
              </Label>
            </Row>
            <Row className={'d-flex justify-content-end mr-3 mt-3'}>
              <Button
                disabled={this.state.isLoadingFind}
                onClick={this.toggle('submitDiscountSuccess')}
              >
                OK
              </Button>
            </Row>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.modal_procodeSearch}
          toggle={this.toggle('procodeSearch')}
          className="modal-dialog-scrollable"
          size="lg"
          backdrop="static"
        >
          <ModalHeader toggle={this.toggle('procodeSearch')}>
            Pilih Procode
          </ModalHeader>
          <ModalBody>
<Card outline color="primary " className = 'mb-1'>
          <Row className = ' font-weight-bold justify-content-center mb-2'>
            <Col xs={1} md={5}>
                      <Label className = ' mt-2 ml-5'>
                      Pilih Outlet
                      </Label>
                </Col>
            </Row>

            <ListGroupItem
            tag="button"
            action
      
          >
            <Row>
              <Col className="ml-3">
                <Input
               
                  type="checkbox"
                ></Input>
              001
              </Col>
              <Col>RUMAH DANIEL</Col>
            </Row>
          </ListGroupItem>

          <Row className = 'd-flex justify-content-end mt-2 mb-1 mr-2'>
         <Button size = 'sm'  onClick =  {()=> this.clickOKPilihOutlet()}>OK </Button>
         <Button size = 'sm'>CANCEL</Button>
          </Row>
            </Card>
            <Card outline color="primary" className = {this.state.rowCardBrandandProcode}>

            
              <Row>
                <Col xs={1} md={5} className="ml-5 mt-3 ">
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

                <Col xs={2} md={5} className="ml-5 mt-3">
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
                <Input
                  disabled={this.state.selectBrand}
                  type="select"
                  value={this.state.brand}
                  onChange={evt => this.changeBrandSearch(evt)}
                >
                  {this.state.Brands.map(Brand => (
                    <option key={Brand.value} value={Brand.value}>
                      {Brand.display}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
            <Row className={this.state.rowProcode + ' mt-3'}>
              <Col>
                <Label>Procode</Label>
              </Col>
              <Col>
                <InputGroup>
                  <Input
                    disabled={isLoading}
                    onChange={evt => this.changeProcode(evt)}
                    value={this.state.procodeSearch}
                    type="text"
                    placeholder="Cari Product"
                  ></Input>
                  <Button
                    onClick={() =>
                      this.changeProcodeSearch(this.state.procodeSearch)
                    }
                  >
                    <MdSearch></MdSearch>
                  </Button>
                </InputGroup>
              </Col>
            </Row>

            <ListGroup
              className={'mt-3 ' + this.state.listsearchProcodeBrandList}
            >
              <ListGroupItem>
                <p className={'text-center font-weight-bold '}>
                  Pilih Produk dari Brand
                </p>
                <Button size="sm" onClick={() => this.clickSelectAllBrand()}>
                  Select All
                </Button>
                <Button
                  className={'ml-3'}
                  size="sm"
                  onClick={() => this.clickUnselectAllBrand()}
                >
                  Unselect All
                </Button>
              </ListGroupItem>

              {this.state.searchProcodeBrandList.map((brand, index) => (
                <ListGroupItem
                  tag="button"
                  action
                  name={brand.pro_name}
                  value={brand.pro_code}
                >
                  <Row>
                    <Col className="ml-3">
                      <Input
                        checked={this.state.searchBrandCheckList[index]}
                        value={this.state.checkedBrand}
                        onClick={event =>
                          this.handleBrandCheckboxClick(event, brand, index)
                        }
                        type="checkbox"
                      ></Input>
                      {brand.pro_code}
                    </Col>
                    <Col>{brand.pro_name}</Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>

            <ListGroup className={'mt-3 ' + this.state.listsearchProcodeList}>
              <ListGroupItem>
                <p class="text-center font-weight-bold">
                  Pilih Produk dari Procode
                </p>
                <Button size="sm" onClick={() => this.clickSelectAllProcode()}>
                  Select All
                </Button>
                <Button
                  className={'ml-3'}
                  size="sm"
                  onClick={() => this.clickUnselectAllProcode()}
                >
                  Unselect All
                </Button>
              </ListGroupItem>
              {this.state.searchProcodeList.map((procode, index) => (
                <ListGroupItem
                  tag="button"
                  action
                  name={procode.pro_name}
                  value={procode.pro_code}
                >
                  <Row>
                    <Col className="ml-3">
                      <Input
                        value={this.state.checkedProcode}
                        checked={this.state.searchProcodeCheckList[index]}
                        onClick={event =>
                          this.handleProcodeCheckboxClick(event, procode, index)
                        }
                        type="checkbox"
                      ></Input>
                      {procode.pro_code}
                    </Col>
                    <Col>{procode.pro_name}</Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={this.state.isLoadingFind}
              onClick={() =>
                this.handleOKButtonClick(
                  this.state.brand,
                  this.state.procodeSearch,
                  this.state.procode,
                )
              }
            >
              OK
            </Button>
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

              <Col className="d-flex justify-content-end mb-3">
                <Button
                  class="ml-5 mt-2"
                  size="25px"
                  href={'/programdiscount/am'}
                >
                  MAIN MENU
                  <MdHome className="mb-1 ml-1" size="20px"></MdHome>
                </Button>
              </Col>

              <Card outline color="primary" className={'mt-1'}>
                <Row
                  className={
                    'd-flex justify-content-center mt-3 font-weight-bold '
                  }
                >
                  <Col xs={5} md={3} className="d-flex justify-content-center">
                    <Label>Periode Awal</Label>
                  </Col>
                  <Col xs={5} md={3} className="d-flex justify-content-center">
                    <Label>Periode Akhir</Label>
                  </Col>
                </Row>

                <Row
                  className={'d-flex justify-content-center font-weight-bold '}
                >
                  <MdDateRange size="25px" className="mt-1"></MdDateRange>
                  <Col xs={5} md={3}>
                    <FormGroup>
                      <Input
                        type="date"
                        onChange={evt =>
                          this.handleSik2StartDateInputChange(evt)
                        }
                        id="tanggalBuka"
                        name="tanggalBuka"
                        required
                        class="datepicker-input"
                        defaultValue={dateOpen}
                        value={this.state.dateopen}
                        disabled={this.state.disabledEfektifMesin}
                        invalid={this.state.hostout_tglefektifmesinInvalid}
                        valid={this.state.hostout_tglefektifmesinValid}
                      ></Input>
                    </FormGroup>
                  </Col>
                  <MdDateRange size="25px" className="mt-1"></MdDateRange>
                  <Col xs={5} md={3}>
                    <Input
                      onChange={evt => this.handleSik2EndDateInputChange(evt)}
                      type="date"
                      id="tanggalTutup"
                      defaultValue={dateClose}
                      name="tanggalTutup"
                      value={this.state.dateclose}
                      // disabled={this.state.disabledtanggalTutup}
                      invalid={this.state.hostout_penarikanmesinInvalid}
                      valid={this.state.hostout_penarikanmesinValid}
                    ></Input>
                  </Col>
                </Row>
             
                <Row form
                className={'d-flex justify-content-center font-weight-bold'}
              >
                <Col xs={1} md={3}>
                      <Label className = ' d-flex justify-content-center'>
                      Jenis Outlet
                      </Label>
                </Col>
              </Row>
                <Row form
                className={'d-flex justify-content-center font-weight-bold'}
              >
             
                <Col xs={1} md={3}>
                        <Input 
                        type = 'select'>
                        <option> Pilih Jenis Outlet</option>
                        <option> Mall Fokus</option>
                        <option> Generic </option>
                        </Input>
                </Col>
              </Row>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <Button
                      className="mt-3"
                      disabled={this.state.addProcodeProduct}
                      onClick={() => this.openModalSearchProcode()}
                    >
                      ADD PROCODE
                    </Button>

                    <Button
                      className="mt-3 ml-2"
                      disabled={this.state.printCSV}
                      onClick={() => this.createCsv()}
                    >
                      PRINT
                    </Button>
                  </Col>
                </Row>
              </Card>

              <Row className={this.state.rowListProductInputted}>
                <Label className={'font-weight-bold ml-3 mt-3'}>
                  LIST PRODUK YANG SUDAH PERNAH DI INPUT
                </Label>
              </Row>

              <Table
                responsive
                id="selectedColumn"
                className={
                  'table table-striped table-bordered table-sm  ' +
                  this.state.rowListProductInputted
                }
                bordered="3"
              >
                <thead>
                  <tr align="center">
                    <th class="th-sm">Kode Produk</th>
                    <th class="th-sm">Nama Produk</th>
                    <th class="th-sm">HJA</th>
                    <th className={'th-sm'}>
                      Diskon
                      <MdLibraryAdd
                        size="25px"
                        style={{ cursor: 'pointer' }}
                        className={'ml-2'}
                        color="#0000FF"
                        id="UncontrolledTooltipExample"
                        onClick={() => this.openModalAllDiscount()}
                      >
                        Add Diskon
                      </MdLibraryAdd>
                      <UncontrolledTooltip
                        placement="right"
                        target="UncontrolledTooltipExample"
                      >
                        Klik Untuk Memberikan Diskon Semua Produk!
                      </UncontrolledTooltip>
                    </th>
                    <th class="th-sm">HJA Setelah Diskon</th>
                    <th class="th-sm"></th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.dataInputteds.map((product, index) => (
                    <tr>
                      <td align="center">{product.pro_code}</td>
                      <td align="center">{product.pro_name2}</td>
                      <td align="center">
                        <Label className="mr-1">Rp </Label>
                        {parseInt(product.pro_saleprice).toLocaleString(
                          'en-US',
                        )}
                      </td>

                      <td align="center">
                        {this.state.discountList[index]}
                        {this.state.discountPercentShow[index]}
                      </td>

                      <td align="center">
                        <Label className={'mr-1 ' + this.state.Rpinputted}>
                          Rp
                        </Label>
                        {parseInt(
                          this.state.discountHJAList[index],
                        ).toLocaleString('en-US') === 'NaN'
                          ? ''
                          : parseInt(
                              this.state.discountHJAList[index],
                            ).toLocaleString('en-US')}
                      </td>

                      <td align="center">
                        <Button
                          id={index}
                          style={{
                            borderStyle: 'none',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onClick={event => this.clickDiskon(event)}
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
                          onClick={event =>
                            this.clickDelete_Inputted_Row(event, index, product)
                          }
                        >
                          <MdDelete></MdDelete>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card outline color="primary"></Card>

              <Row className={this.state.rowListProductUninputted}>
                <Label className={'font-weight-bold ml-3 mt-1 '}>
                  LIST PRODUK YANG BELUM PERNAH DI INPUT
                </Label>
              </Row>
              <Table
                responsive
                id="selectedColumn"
                className={
                  'table table-striped table-bordered table-sm ' +
                  this.state.rowListProductUninputted
                }
                bordered="3"
              >
                <thead>
                  <tr align="center">
                    <th class="th-sm">Kode Produk</th>
                    <th class="th-sm">Nama Produk</th>
                    <th class="th-sm">HJA</th>
                    <th className={'th-sm'}>
                      Diskon
                      <MdLibraryAdd
                        size="25px"
                        style={{ cursor: 'pointer' }}
                        className={'ml-2'}
                        color="#0000FF"
                        id="UncontrolledTooltipExample"
                        onClick={() => this.openModalAllDiscountUninputted()}
                      >
                        Add Diskon
                      </MdLibraryAdd>
                      <UncontrolledTooltip
                        placement="right"
                        target="UncontrolledTooltipExample"
                      >
                        Klik Untuk Memberikan Diskon Semua Produk!
                      </UncontrolledTooltip>
                    </th>
                    <th class="th-sm">HJA Setelah Diskon</th>
                    <th class="th-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.dataUninputteds.map(
                    (product, indexUninputted) => (
                      <tr>
                        <td align="center">{product.pro_code}</td>

                        <td align="center">{product.pro_name2}</td>

                        <td align="center">
                          {parseInt(product.pro_saleprice).toLocaleString(
                            'en-US',
                          )}
                        </td>

                        <td align="center">
                          {this.state.discountListUninputted[indexUninputted]}
                          {
                            this.state.discountPercentShowUninputted[
                              indexUninputted
                            ]
                          }
                        </td>

                        <td align="center">
                          <Label className={'mr-1 ' + this.state.RpUninputted}>
                            Rp
                          </Label>
                          {parseInt(
                            this.state.discountHJAListUninputted[
                              indexUninputted
                            ],
                          ).toLocaleString('en-US') === 'NaN'
                            ? ''
                            : parseInt(
                                this.state.discountHJAListUninputted[
                                  indexUninputted
                                ],
                              ).toLocaleString('en-US')}
                        </td>

                        <td align="center">
                          <Button
                            id={indexUninputted}
                            style={{
                              borderStyle: 'none',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onClick={event => this.clickDiskonUninputted(event)}
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
                            onClick={event =>
                              this.clickDelete_Uninputted_Row(
                                event,
                                indexUninputted,
                                product,
                              )
                            }
                          >
                            <MdDelete></MdDelete>
                          </Button>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </Table>

              <Row className={'justify-content-center'}>
                <Spinner
                  style={{ width: '3rem', height: '3rem' }}
                  color="primary"
                  className={this.state.isLoading ? ' ' : ' d-none '}
                />
              </Row>

              <Row className={this.state.rowListProduct}>
                <Col className={'d-flex justify-content-end ml-3 mt-3 '}>
                  <Button
                    onClick={() => this.insertDiscount(this.state.insertedDate)}
                  >
                    SAVE
                  </Button>

                  <Button
                    className="ml-3"
                    href={'/programdiscount/am'}
                    style={{
                      background: '#FF0000',
                      borderStyle: 'none',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    CANCEL
                  </Button>
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
