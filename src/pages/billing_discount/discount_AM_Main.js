import Page from 'components/Page';
import SearchInput from 'components/SearchInput';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  Form,
  Spinner,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { MdSearch, MdLoyalty, MdFormatAlignRight,MdRemoveRedEye,MdAdd } from 'react-icons/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';
import DropdownPage from '../template/DropdownPage';
import { timingSafeEqual } from 'crypto';

const hostUrl = 'http://10.0.111.143:8080';
class GPLPage extends React.Component {
  //special method
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      isLoading: false,
      inputtedName: '',
      inputtedName2: '',
      searchInputtedName: '',
      currentPage: 0,
      todosPerPage: 5,
      flag: 0,
      totalPage: '',
      hidePagination: 'flex-row',
      selectedDropdown:'Show All',
      inputSearch:'d-none',


    };
  }
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

  // ----------------------------------------------- PAGINATION SHOW ALL DATA --------------------------------------------------------- EDITED BY RICHARD & DANIEL & KRIS

  //Memberikan semua list data pada page tersebut dimana diBack end mempunyai data Current limit maupun Current Page

  getListbyPaging(currPage, currLimit) {
     
    this.state.isLoading = true ; 
    if (this.state.searchType==="NO DO"){
        console.log('Masuk NO DO')
        var url = hostUrl +`/TampilSemuaDataGPL/page?size=${currLimit}&page=${currPage}`;
        console.log(url);
        var payload = {
            Pri_Name        : this.state.keyword,
            Pri_Group       : parseInt(this.state.groupStatus),
            Start           : parseInt(currPage),
            Length          : parseInt(currLimit),
        }

        fetch(url, {
            method : "POST",
            body   : JSON.stringify(payload),
            json   : true,
            headers:{
                     "Content-type": "application/json; charset=UTF-8"
                    }
            })
            .then(response => response.json())
            .then(data => {
                if(data.Data === null)  {
                    console.log("data kosong")             
                    this.setState({ result: [], isLoading: false})
                    this.state.responseHeader  = "Warning";
                    this.state.responseMessage = "Nama tidak ada"; 
                    this.state.modal_response  = true;  
                }
                else{
                    console.log("data count : "+data.Data.length)
                    console.log("data tidak kosong")  
                    this.setState({ result: data.Data, isLoading: false})
                }
            })
    }
    else if(this.state.searchType==="NO SP"){
        console.log('Masuk NO SP')
       
        var url = hostUrl +`/TampilSemuaDataGPL/page?size=${currLimit}&page=${currPage}`;
        console.log(url);
        var payload = {

            Pri_Code        : this.state.keyword,
            Pri_Group       : parseInt(this.state.groupStatus),
            Start           : parseInt(currPage),
            Length          : parseInt(currLimit),
        }

        fetch(url, {
            method : "POST",
            body   : JSON.stringify(payload),
            json   : true,
            headers: {
                 "Content-type": "application/json; charset=UTF-8"
            }
         })
        .then(response => response.json())
        .then(data => {
            if(data.Data === null)  {
                    
                this.setState({ 
                    result: [], 
                    isLoading: false,
                    responseHeader:"Warning",
                    responseMessage:"Kode tidak ada"
                })
             
            }
            else{
                this.setState({ result: data.Data, isLoading: false})
            }
            
        }
    )}
    else{
        
    var url = hostUrl+`/TampilDeliveryOrder/page?page=${currPage}&size=${currLimit}`;

    console.log('masuk TampilDeliveryOrder Show All')
    console.log(url)
    this.isLoading = true;
    fetch(url)
      .then(response => response.json())
      .then(data =>{ 
        if(data.transfD === null)  {
            this.setState({ result: [], isLoading: false, totalPage: data.totalPages
            
            })
         
        }
        else{
            
            this.setState({ result: data.content, isLoading: false,totalPage: data.totalPages})
          
        }
    });

    }
  }

  //fungsi untuk mengambil semua data dimana memanggil current page dan perpage
  componentDidMount() {
    this.getListbyPaging(this.state.currentPage, this.state.todosPerPage);
  }

  handleSelect(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.getListbyPaging(this.state.currentPage, this.state.todosPerPage);
    });
  }

  handleWrite(event, flag) {
    if (
      this.state.currentPage + flag < 0 ||
      this.state.currentPage + flag > this.state.totalPage - 1
    ) {
      return;
    }
    this.setState(
      {
        currentPage: Number(event.target.value) + flag,
      },
      () => {
        if (flag !== 0) {
          this.getListbyPaging(this.state.currentPage, this.state.todosPerPage);
        }
      },
    );
  }

  //fungsi yang mengarah kan ke arah first page
  handleFirst(event) {
    this.setState({
      currentPage: 0,
    });
    this.getListbyPaging(0, this.state.todosPerPage);
  }

  //fungsi yang mengarah ke arah last page
  handleLast(event) {
    this.setState({
      currentPage: this.state.totalPage - 1,
    });
    this.getListbyPaging(this.state.totalPage - 1, this.state.todosPerPage);
  }

  handleClose = () => {
    this.setState({
      inputtedName2: '',
    });
  };
  //state awal pada saat membuka suatu page tsb nanti dicari langsung di render()
  state = {
    modal: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false,
    modal_delete: false,
    modal_update: false,
    backdrop: true,
    inputtedName2: '',
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

  // --------------------------------------------------------- INSERT --------------------------------------------------------- EDITED BY RICHARD & DANIEL & KRISS

  //melakukan insert data dimana melempar parameter ke backend
  insertGPL = param => async () => {
    this.setState({ isLoading: true });
    var url = `http://10.0.111.143:8083/TambahGPL`;
    var payload = {
      gpl_nama: param,
      gpl_userid: '0',
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
        this.state.inputtedName2 = '';
        this.isLoading = false;
        this.state.modal_nested = false;
        this.state.modal_nested_parent = false;
        this.componentDidMount();
        return response.json();
      }
    });
    if (data) {
      this.showNotification('Data ' + param + ' Berhasil Disimpan');
    } else {
      alert('Data ' + param + ' Sudah Pernah Ada');
    }
  };

  //Insert state awal nya dimana tidak boleh special character dan harus semua huruf besar
  insertInputValue = evt => {
    this.setState({
      inputtedName2: evt.target.value.replace(/[^\w\s]/gi, '').toUpperCase(),
    });
  };

  // --------------------------------------------------------- UPDATE --------------------------------------------------------- EDITED BY RICHARD & DANIEL & KRISS

  //pada saat melakukan edit yang akan di lempar ke backend adalah first_param = nama yang telah di edit, second_param adalah yang didapatkan
  setEditGPL = (first_param, second_param, third_param) => async () => {
    this.setState({ isLoading: true });
    var url = `http://10.0.111.143:8083/UbahGPL/${first_param}`;

    var payload = {
      gpl_nama: second_param,
      gpl_userid: '0',
      gpl_kode: third_param,
    };

    let data = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      json: true,
      body: JSON.stringify(payload),
    })
      //2.Ketika sudah terespond oleh backend , maka kita akan melakukan hal ini
      .then(response => {
        if (response.ok) {
          this.isLoading = false;
          //state ini diawal dibuat false
          this.state.modal_update = false;
          this.state.modal_nested = false;
          this.state.backdrop = false;
          this.componentDidMount();
          return response.json();
        }
      });
    if (data) {
      this.showNotification(
        'Data Berhasil di Ubah Menjadi ' + second_param + '',
      );
      this.isLoading = true;
    } else {
      alert('Data yang Diubah sama !');
    }
  };
  boolean = false;

  //ketika melakukan update, input an yang masuk harus uppercase dan tidak boleh special character
  updateInputValue = evt => {
    this.setState({
      inputtedName: evt.target.value.replace(/[^\w\s]/gi, '').toUpperCase(),
    });
  };
  // set awal pada saat membuka update

  //(first_param,second_param,third_param)
  updateModalWithItemID(idUpdateGPL, namaUpdateGPL, kodeUpdateGPL) {
    this.setState({
      modal_update: true,
      activeItem_Id2: idUpdateGPL,
      inputtedName: namaUpdateGPL,
      inputtedKode: kodeUpdateGPL,
    });
  }

  // --------------------------------------------------------- SEARCH --------------------------------------------------------- EDITED BY RICHARD & DANIEL & KRISS

  //mengambil parameter yang telah diinput di searchInputtedName . lalu dilempar ke Backend
  searchInputted = () => {

        if (this.state.searchType==="SP DO"){
            console.log("SP DO SEARCH")
            this.setState({ isLoading: true });
            var url = `http://10.0.111.143:8083/CariGPL/${this.state.searchInputtedName}`;
            fetch(url)
              .then(response => response.json())
              .then(data => this.setState({ result: data, isLoading: false }));
            //pada saat melakukan search, pagination yang dibawah di matikan sehingga tidak ada pagination
            //d-none itu display none cari di documentation bootstrap
            this.setState({
              hidePagination: 'd-none',
            })
        }
        else if (this.state.searchType==="NO DO"){
            console.log("NO DO SEARCH")
            this.setState({ isLoading: true });
            var url = `http://10.0.111.143:8083/CariGPL/${this.state.searchInputtedName}`;
            fetch(url)
              .then(response => response.json())
              .then(data => this.setState({ result: data, isLoading: false }));
            //pada saat melakukan search, pagination yang dibawah di matikan sehingga tidak ada pagination
            //d-none itu display none cari di documentation bootstrap
            this.setState({
              hidePagination: 'd-none',
            })
            
        }

 
   else {
      this.componentDidMount();
      this.setState({
        isLoading : false,
     
      })
    }
  };

  //function untuk melakukan search pada saat menekan enter
  enterPressed = (event, search) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      event.preventDefault();
      if (search === true) {
          this.setState({
            currentPage:1
          })
            this.searchInputted(
                this.state.currentPage,this.state.searchInputtedName,
          );
      } else {
        this.componentDidMount();
      }
        }
    };
  




  updateSelectionValue(evt){
    this.setState({
        [evt.target.name]: evt.target.value,
        selectedDropdown : evt.target.value
    });

    if(evt.target.value==="NO DO")
    {
        this.setState({
            inputSearch:'inline',
            searchType:"NO DO",
            displayStatus: 'inline-flex'
        })   
    }

    else if(evt.target.value==="NO SP")
    {
        this.setState({
            inputSearch:'inline',
            searchType:"NO SP",
            displayStatus: 'inline-flex'
        }) 
    }

    else if(evt.target.value === "Show All"){
       
        this.setState({
            inputSearch:'d-none',
            currentPage: 1,
            keyword: "",
            displayStatus: 'none'
        },() => {
        this.componentDidMount();
        });
    }
}

  //ketika melakukan search, state input-an yang masuk harus uppercase dan tidak boleh special character
  setSearchInputState = evt => {
    this.setState({
      searchInputtedName: evt.target.value
        .replace(/[^\w\s]/gi, '')
        .toUpperCase(),
    });
  };

  //--------------------------------------------------------- DELETE --------------------------------------------------------- EDITED BY RICHARD & DANIEL & KRISS


  openModalOnClick() {
    var namaLokasied = document.getElementById('namaLokasi');

    this.setState({});
    if (this.state.inputtedName2.length >> 0) {
      this.setState({ modal_nested: true });
    } else {
      namaLokasied.oninvalid = true;
      this.setState({ modal_nested: false });
    }
  }

  //render biasa nya di-isi untuk desain HTML
  render() {
    const { result, isLoading } = this.state;
    return (
      <Page
      title="Program Discount AM"
      breadcrumbs={[{ name: 'Program Discount / AM ', active: true }]}
      className="Program Discount"
      >
        <Card className="mt-5 mb-5">
        <Button
        size = "lg"
        color="primary"
        href = {'/programdiscount/am/view'} 
        >
        <MdRemoveRedEye className =" mb-1 mr-3"></MdRemoveRedEye>
        LIHAT DISKON AM
        </Button>
        
        </Card>
        <Card
        className ='mt-5 mb-5'
        >
        <Button 
      size = "lg"
        color="primary"
        href = {'/programdiscount/am/add'} 
        >

        <MdAdd className =" mb-1 mr-3"></MdAdd>
        TAMBAH DISKON AM

        </Button>
        </Card>
      </Page>
    );
  }
}
export default GPLPage;
