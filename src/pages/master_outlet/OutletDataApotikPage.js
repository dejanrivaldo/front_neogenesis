import Page from 'components/Page';
import SearchInput from 'components/SearchInput';
import React from 'react';
import * as api from './api';
import ReactDOM from 'react-dom'
import Typography from 'components/Typography';
import { Redirect } from 'react-router';
import {
    Button, Badge, Card, CardBody, CardHeader, CardFooter, Col, DatePicker, Row, Table, Modal, FormGroup,
    ModalBody, ModalFooter, ModalHeader, Input, Label, InputGroup, InputGroupAddon, Form, Spinner, Alert, ListGroup, ListGroupItem,
    UncontrolledTooltip
} from 'reactstrap';
import { MdSearch, MdLoyalty, MdFormatAlignRight, MdAdd, MdEdit, MdSave, MdDelete, MdAddBox, MdArrowDropDown, MdWarning, MdClose } from 'react-icons/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';
import DropdownPage from '../template/DropdownPage';
import { ENGINE_METHOD_NONE } from 'constants';
import { Route, NavLink } from 'react-router-dom';
import OutletPage from './OutletPage';

const hostUrl = 'http://10.0.111.143:8083'
class OutletDataApotikPage extends React.Component {
    //special method
    constructor(props) {
        super(props);
        this.state = {

            validateErrorMessage: [],

            //m_brand
            brandList: [],
            brandDisabled: true,

            bukaList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            bukaValue: 1,

            //m_apotik_outlet
            outletSearchInput: '',
            outletList: [],

            cariOutcodeInput: '',
            out_name: "",
            out_code: "",
            brand_name: "",
            apoout_runningid: '',
            apoout_outcode: '',
            apoout_apotikname: "",
            apoout_nipapoteker: "",
            apoout_apoteker: "",
            apoout_nohpapoteker: "",
            apoout_nipapoteker2: "",
            apoout_apoteker2: "",
            apoout_nohpapoteker2: "",
            apoout_sik: "",
            apoout_sipaapa: "",
            apoout_tglawalsipaapa: "1900-01-01",
            apoout_tglakhirsipaapa: "1900-01-01",
            apoout_sia: "",
            apoout_prdawalsia: '1900-01-01',
            apoout_prdakhirsia: "1900-01-01",
            apoout_sipaaping: '',
            apoout_tglawalsipaaping: '1900-01-01',
            apoout_tglakhirsipaaping: '1900-01-01',
            apoout_activeyn: "",
            apoout_userid: "",
            apoout_brandid: 1,
            apoout_nipasistenapoteker1: "",
            apoout_asistenapoteker1: "",
            apoout_nohpasistenapoteker1: "",
            apoout_tglawalsikaa1: "1900-01-01",
            apoout_tglakhirsikaa1: "1900-01-01",
            apoout_nipasistenapoteker2: "",
            apoout_asistenapoteker2: "",
            apoout_nohpasistenapoteker2: "",
            apoout_sikttk2: "",
            apoout_tglawalsikaa2: "1900-01-01",
            apoout_tglakhirsikaa2: "1900-01-01",
            apoout_nipasistenapoteker3: '',
            apoout_asistenapoteker3: '',
            apoout_nohpasistenapoteker3: '',
            apoout_sikttk3: '',
            apoout_tglawalsikaa3: '',
            apoout_tglakhirsikaa3: '',
            apoout_skdu: '',
            apoout_tglawalskdu: '',
            apoout_tglakhirskdu: '',
            apoout_suug: '',
            apoout_tglawalsuug: '',
            apoout_tglakhirsuug: '',
            apoout_situ: '',
            apoout_tglawalsitu: '',
            apoout_tglakhirsitu: '',
            apoout_siup: '',
            apoout_tglawalsiup: '',
            apoout_tglakhirsiup: '',
            apoout_imb: '',
            apoout_tipegedung: '',

            siaDisabled: true,
            sipaApaDisabled: true,
            sipaApingDisabled: true,
            sik1Disabled: true,
            sik2Disabled: true,

            // Invalid
            apoout_apotiknameInvalid: false,

            apoout_nipapotekerInvalid: false,
            apoout_apotekerInvalid: false,

            apoout_nipapoteker2Invalid: false,
            apoout_apoteker2Invalid: false,

            apoout_siaInvalid: false,
            apoout_prdawalsiaInvalid: false,
            apoout_prdakhirsiaInvalid: false,

            apoout_sipaapaInvalid: false,
            apoout_tglawalsipaapaInvalid: false,
            apoout_tglakhirsipaapaInvalid: false,

            apoout_sipaapingInvalid: false,
            apoout_tglawalsipaapingInvalid: false,
            apoout_tglakhirsipaapingInvalid: false,

            apoout_sikInvalid: false,
            apoout_tglawalsikaa1Invalid: false,
            apoout_tglakhirsikaa1Invalid: false,

            apoout_sikttk2Invalid: false,
            apoout_tglawalsikaa2Invalid: false,
            apoout_tglakhirsikaa2Invalid: false,

            // Valid
            apoout_apotiknameValid: false,

            apoout_nipapotekerValid: false,
            apoout_apotekerValid: false,

            apoout_nipapoteker2Valid: false,
            apoout_apoteker2Valid: false,

            apoout_siaValid: false,
            apoout_prdawalsiaValid: false,
            apoout_prdakhirsiaValid: false,

            apoout_sipaapaValid: false,
            apoout_tglawalsipaapaValid: false,
            apoout_tglakhirsipaapaValid: false,

            apoout_sipaapingValid: false,
            apoout_tglawalsipaapingValid: false,
            apoout_tglakhirsipaapingValid: false,

            apoout_sikValid: false,
            apoout_tglawalsikaa1Valid: false,
            apoout_tglakhirsikaa1Valid: false,

            apoout_sikttk2Valid: false,
            apoout_tglawalsikaa2Valid: false,
            apoout_tglakhirsikaa2Valid: false,
            // ---

            displayAddButton: 'd-none',
            displayEditButton: 'd-none',
            displaySimpanButton: 'd-none',
            displayOkButton: 'd-none',
            buttonAddDisabled: true,

            //Timbangan
            timbanganList: [],
            timout_namatimbangan: '',
            timout_tanggaltara: '1900-01-01',
            timout_masaberlaku: '',
            timout_userid: '0',

            //Item
            itemList: [],

            // Apoteker Penanggung Jawab (APA)
            apaKaryawanSearchInput: '',
            apaKaryawanList: [],

            // Apoteker Pendamping (APING)
            apingKaryawanSearchInput: '',
            apingKaryawanList: [],

            // Asisten Apoteker 1
            aa1KaryawanSearchInput: '',
            aa1KaryawanList: [],

            // Asisten Apoteker 2
            aa2KaryawanSearchInput: '',
            aa2KaryawanList: [],

            // Modal
            modal: false,
            modal_outletSearch: false,
            modal_apaKaryawanSearch: false,
            modal_apingKaryawanSearch: false,
            modal_aa1KaryawanSearch: false,
            modal_aa2KaryawanSearch: false,
            modal_konfirmasiSimpan: false,
            modal_konfirmasiOk: false,
            modal_taraTimbangan: false,
            modal_tambahTimbangan: false,
            modal_ubahTimbangan: false
        };
    }

    componentDidMount() {
        this.getBrandList();
        this.getItemList();
    }

    //fungsi notification
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

    //fungsi untuk membuka suatu toggle di page tsb
    toggle = modalType => () => {

        if (!modalType) {

            return this.setState({
                modal: !this.state.modal,

            });
        }

        //pembuatan setState disemua function, dimana hanya memanggil nama nya saja ex modal_delete , maka di render hanya panggil delete saja 
        this.setState({
            [`modal_${modalType}`]: !this.state[`modal_${modalType}`]
        });
    };

    getBrandList = async () => {
        const url = hostUrl+'/TampilSemuaDataBrand';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    brandList: data,
                    brandDisabled: false
                }, console.log('BrandList: ' + data))
            })
    }

    getItemList = async () => {
        const url = hostUrl+'/TampilSemuaDataItem';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    itemList: data,
                    timout_namatimbangan: data[0].itm_nama
                }, console.log('ItemList: '+ data))
            })
    }
    // --------------------------- INPUT HANDLER ---------------------------
    handleInputChange = (event) => {
        const regularExpression = /[^A-Za-z0-9\s]/gi;
        this.setState({
            [event.target.name]: event.target.value.replace(regularExpression, "").toUpperCase()
        });
    }

    handleInputValidateChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const regularExpression = /[^A-Za-z0-9\s]/gi;

        if(value.length === 0) {
            this.setState({
                [name]: value.replace(regularExpression, "").toUpperCase(),
                [name + 'Invalid']: true,
                [name + 'Valid']: false
            }, () => console.log('HandleInputValidateChange: Input:' + name + ' = ' + value));
        } else {
            this.setState({
                [name]: value.replace(regularExpression, "").toUpperCase(),
                [name + 'Invalid']: false,
                [name + 'Valid']: true
            }, () => console.log('HandleInputValidateChange: Input:' + name + ' = ' + value));
        }
    }
    
    handleInputDateChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, console.log('HandleInputChange: InputDate: ' + event.target.name + ' = ' + event.target.value));
    }

    // ---- SIA ----
    handleSiaInputChange = (event) => {
        const value = event.target.value;

        const regularExpression = /[^A-Za-z0-9\s\/\.]/gi;

        if (value.length === 0) {
            this.setState({
                apoout_sia: value.replace(regularExpression, "").toUpperCase(),
                apoout_siaInvalid: false,
                apoout_siaValid: false,
                apoout_prdawalsia: '1900-01-01',
                apoout_prdawalsiaInvalid: false,
                apoout_prdawalsiaValid: false,
                apoout_prdakhirsia: '1900-01-01',
                apoout_prdakhirsiaInvalid: false,
                apoout_prdakhirsiaValid: false,
                siaDisabled: true
            }, () => console.log('handleSiaInputChange: Input:' + value));
        } else {
            this.setState({
                apoout_sia: value.replace(regularExpression, "").toUpperCase(),
                apoout_siaInvalid: value.replace(regularExpression, "").length < 8,
                apoout_siaValid: value.replace(regularExpression, "").length >= 8,
                siaDisabled: false
            }, () => console.log('handleSiaInputChange: Input:' + value));
        }
    }

    handleSiaStartDateInputChange = (event) => {
        const value = event.target.value;
        const startDate = new Date(value);
        const endDate = new Date(this.state.apoout_prdakhirsia);

        console.log('SIA: StartDate: ' + startDate);
        console.log('SIA: EndDate: ' + endDate);

        try {
            if (startDate >= endDate) {
                this.setState({
                    apoout_prdawalsia: startDate.toISOString().substr(0, 10),
                    apoout_prdawalsiaInvalid: true,
                    apoout_prdawalsiaValid: false,
                    apoout_prdakhirsiaInvalid: true,
                    apoout_prdakhirsiaValid: false
                })
            } else {
                this.setState({
                    apoout_prdawalsia: startDate.toISOString().substr(0, 10),
                    apoout_prdawalsiaInvalid: false,
                    apoout_prdawalsiaValid: true,
                    apoout_prdakhirsiaInvalid: false,
                    apoout_prdakhirsiaValid: true
                })
            }
        } catch (error) {
            console.log('SIA: Error: ' + error.message);
            this.setState({
                apoout_prdawalsia: value,
                apoout_prdawalsiaInvalid: true,
                apoout_prdawalsiaValid: false,
                apoout_prdakhirsiaInvalid: true,
                apoout_prdakhirsiaValid: false
            })
        }
    }

    handleSiaEndDateInputChange = (event) => {
        const value = event.target.value;
        const startDate = new Date(this.state.apoout_prdawalsia);
        const endDate = new Date(value);

        console.log('SIA: StartDate: ' + startDate);
        console.log('SIA: EndDate: ' + endDate);

        try {
            if (startDate >= endDate) {
                this.setState({
                    apoout_prdakhirsia: endDate.toISOString().substr(0, 10),
                    apoout_prdawalsiaInvalid: true,
                    apoout_prdawalsiaValid: false,
                    apoout_prdakhirsiaInvalid: true,
                    apoout_prdakhirsiaValid: false
                })
            } else {
                this.setState({
                    apoout_prdakhirsia: endDate.toISOString().substr(0, 10),
                    apoout_prdawalsiaInvalid: false,
                    apoout_prdawalsiaValid: true,
                    apoout_prdakhirsiaInvalid: false,
                    apoout_prdakhirsiaValid: true
                })
            }
        } catch (error) {
            console.log('SIA: Error: ' + error.message);
            this.setState({
                apoout_prdakhirsia: value,
                apoout_prdawalsiaInvalid: true,
                apoout_prdawalsiaValid: false,
                apoout_prdakhirsiaInvalid: true,
                apoout_prdakhirsiaValid: false
            })
        }
    }
    // ----

    // ---- SIPA APA ----
    handleSipaApaInputChange = (event) => {
        const value = event.target.value;

        const regularExpression = /[^A-Za-z0-9\s\/\.]/gi;

        if (value.length === 0) {
            this.setState({
                apoout_sipaapa: value.replace(regularExpression, "").toUpperCase(),
                apoout_sipaapaInvalid: false,
                apoout_sipaapaValid: false,
                apoout_tglawalsipaapa: '1900-01-01',
                apoout_tglawalsipaapaInvalid: false,
                apoout_tglawalsipaapaValid: false,
                apoout_tglakhirsipaapa: '1900-01-01',
                apoout_tglakhirsipaapaInvalid: false,
                apoout_tglakhirsipaapaValid: false,
                sipaApaDisabled: true
            }, () => console.log('handleSipaApaInputChange: Input:' + value));
        } else {
            this.setState({
                apoout_sipaapa: value.replace(regularExpression, "").toUpperCase(),
                apoout_sipaapaInvalid: value.replace(regularExpression, "").length < 8,
                apoout_sipaapaValid: value.replace(regularExpression, "").length >= 8,
                sipaApaDisabled: false
            }, () => console.log('handleSipaApaInputChange: Input:' + value));
        }
    }

    handleSipaApaStartDateInputChange = (event) => {
        const value = event.target.value;
        const startDate = new Date(value);
        const endDate = new Date(this.state.apoout_tglakhirsipaapa);

        console.log('SIPA APA: StartDate: ' + startDate);
        console.log('SIPA APA: EndDate: ' + endDate);

        try {
            if (startDate >= endDate) {
                this.setState({
                    apoout_tglawalsipaapa: startDate.toISOString().substr(0, 10),
                    apoout_tglawalsipaapaInvalid: true,
                    apoout_tglawalsipaapaValid: false,
                    apoout_tglakhirsipaapaInvalid: true,
                    apoout_tglakhirsipaapaValid: false
                })
            } else {
                this.setState({
                    apoout_tglawalsipaapa: startDate.toISOString().substr(0, 10),
                    apoout_tglawalsipaapaInvalid: false,
                    apoout_tglawalsipaapaValid: true,
                    apoout_tglakhirsipaapaInvalid: false,
                    apoout_tglakhirsipaapaValid: true
                })
            }
        } catch (error) {
            console.log('SIPA APA: Error: ' + error.message);
            this.setState({
                apoout_tglawalsipaapa: value,
                apoout_tglawalsipaapaInvalid: true,
                apoout_tglawalsipaapaValid: false,
                apoout_tglakhirsipaapaInvalid: true,
                apoout_tglakhirsipaapaValid: false
            })
        }
    }

    handleSipaApaEndDateInputChange = (event) => {
        const value = event.target.value;
        const startDate = new Date(this.state.apoout_tglawalsipaapa);
        const endDate = new Date(value);

        console.log('SIA: StartDate: ' + startDate);
        console.log('SIA: EndDate: ' + endDate);

        try {
            if (startDate >= endDate) {
                this.setState({
                    apoout_tglakhirsipaapa: endDate.toISOString().substr(0, 10),
                    apoout_tglawalsipaapaInvalid: true,
                    apoout_tglawalsipaapaValid: false,
                    apoout_tglakhirsipaapaInvalid: true,
                    apoout_tglakhirsipaapaValid: false
                })
            } else {
                this.setState({
                    apoout_tglakhirsipaapa: endDate.toISOString().substr(0, 10),
                    apoout_tglawalsipaapaInvalid: false,
                    apoout_tglawalsipaapaValid: true,
                    apoout_tglakhirsipaapaInvalid: false,
                    apoout_tglakhirsipaapaValid: true
                })
            }
        } catch (error) {
            console.log('SIPA APA: Error: ' + error.message);
            this.setState({
                apoout_tglakhirsipaapa: value,
                apoout_tglawalsipaapaInvalid: true,
                apoout_tglawalsipaapaValid: false,
                apoout_tglakhirsipaapaInvalid: true,
                apoout_tglakhirsipaapaValid: false
            })
            
        }
    }
    // ---- 

    // ---- SIPA APING ----
    handleSipaApingInputChange = (event) => {
        const value = event.target.value;

        const regularExpression = /[^A-Za-z0-9\s\/\.]/gi;

        if (value.length === 0) {
            this.setState({
                apoout_sipaaping: value.replace(regularExpression, "").toUpperCase(),
                apoout_sipaapingInvalid: false,
                apoout_sipaapingValid: false,
                apoout_tglawalsipaaping: '1900-01-01',
                apoout_tglawalsipaapingInvalid: false,
                apoout_tglawalsipaapingValid: false,
                apoout_tglakhirsipaaping: '1900-01-01',
                apoout_tglakhirsipaapingInvalid: false,
                apoout_tglakhirsipaapingValid: false,
                sipaApingDisabled: true
            }, () => console.log('handleSipaApingInputChange: Input:' + value));
        } else {
            this.setState({
                apoout_sipaaping: value.replace(regularExpression, "").toUpperCase(),
                apoout_sipaapingInvalid: value.replace(regularExpression, "").length < 8,
                apoout_sipaapingValid: value.replace(regularExpression, "").length >= 0,
                sipaApingDisabled: false
            }, () => console.log('handleSipaApingInputChange: Input:' + value));
        }
    }

    handleSipaApingStartDateInputChange = (event) => {
        const value = event.target.value;
        const startDate = new Date(value);
        const endDate = new Date(this.state.apoout_tglakhirsipaaping);

        console.log('SIPA APING: StartDate: ' + startDate);
        console.log('SIPA APING: EndDate: ' + endDate);

        try {
            if (startDate >= endDate) {
                this.setState({
                    apoout_tglawalsipaaping: startDate.toISOString().substr(0, 10),
                    apoout_tglawalsipaapingInvalid: true,
                    apoout_tglawalsipaapingValid: false,
                    apoout_tglakhirsipaapingInvalid: true,
                    apoout_tglakhirsipaapingValid: false
                })
            } else {
                this.setState({
                    apoout_tglawalsipaaping: startDate.toISOString().substr(0, 10),
                    apoout_tglawalsipaapingInvalid: false,
                    apoout_tglawalsipaapingValid: true,
                    apoout_tglakhirsipaapingInvalid: false,
                    apoout_tglakhirsipaapingValid: true
                })
            }
        } catch (error) {
            console.log('SIPA APING: Error: ' + error.message);
            this.setState({
                apoout_tglawalsipaaping: value,
                apoout_tglawalsipaapingInvalid: true,
                apoout_tglawalsipaapingValid: false,
                apoout_tglakhirsipaapingInvalid: true,
                apoout_tglakhirsipaapingValid: false
            })
        }
    }

    handleSipaApingEndDateInputChange = (event) => {
        const value = event.target.value;
        const startDate = new Date(this.state.apoout_tglawalsipaaping);
        const endDate = new Date(value);

        console.log('SIPA APING: StartDate: ' + startDate);
        console.log('SIPA APING: EndDate: ' + endDate);

        try {
            if (startDate >= endDate) {
                this.setState({
                    apoout_tglakhirsipaaping: endDate.toISOString().substr(0, 10),
                    apoout_tglawalsipaapingInvalid: true,
                    apoout_tglawalsipaapingValid: false,
                    apoout_tglakhirsipaapingInvalid: true,
                    apoout_tglakhirsipaapingValid: false
                })
            } else {
                this.setState({
                    apoout_tglakhirsipaaping: endDate.toISOString().substr(0, 10),
                    apoout_tglawalsipaapingInvalid: false,
                    apoout_tglawalsipaapingValid: true,
                    apoout_tglakhirsipaapingInvalid: false,
                    apoout_tglakhirsipaapingValid: true
                })
            }
        } catch (error) {
            this.setState({
                apoout_tglakhirsipaaping: value,
                apoout_tglawalsipaapingInvalid: true,
                apoout_tglawalsipaapingValid: false,
                apoout_tglakhirsipaapingInvalid: true,
                apoout_tglakhirsipaapingValid: false
            })
        }
    }
    // ---- 

    // ---- SIK 1 ----
    handleSik1InputChange = (event) => {
        const value = event.target.value;

        const regularExpression = /[^A-Za-z0-9\s\/\.]/gi;

        if (value.length === 0) {
            this.setState({
                apoout_sik: value.replace(regularExpression, "").toUpperCase(),
                apoout_sikInvalid: false,
                apoout_sikValid: false,
                apoout_tglawalsikaa1: '1900-01-01',
                apoout_tglawalsikaa1Invalid: false,
                apoout_tglawalsikaa1Valid: false,
                apoout_tglakhirsikaa1: '1900-01-01',
                apoout_tglakhirsikaa1Invalid: false,
                apoout_tglakhirsikaa1Valid: false,
                sik1Disabled: true
            }, () => console.log('handleSik1InputChange: Input:' + value));
        } else {
            this.setState({
                apoout_sik: value.replace(regularExpression, "").toUpperCase(),
                apoout_sikInvalid: value.replace(regularExpression, "").length < 8,
                apoout_sikValid: value.replace(regularExpression, "").length >= 8,
                sik1Disabled: false
            }, () => console.log('handleSik1InputChange: Input:' + value));
        }
    }

    handleSik1StartDateInputChange = (event) => {
        const value = event.target.value;
        const startDate = new Date(value);
        const endDate = new Date(this.state.apoout_tglakhirsikaa1);

        console.log('SIK1: StartDate: ' + startDate);
        console.log('SIK1: EndDate: ' + endDate);

        try {
            if (startDate >= endDate) {
                this.setState({
                    apoout_tglawalsikaa1: startDate.toISOString().substr(0, 10),
                    apoout_tglawalsikaa1Invalid: true,
                    apoout_tglawalsikaa1Valid: false,
                    apoout_tglakhirsikaa1Invalid: true,
                    apoout_tglakhirsikaa1Valid: false
                })
            } else {
                this.setState({
                    apoout_tglawalsikaa1: startDate.toISOString().substr(0, 10),
                    apoout_tglawalsikaa1Invalid: false,
                    apoout_tglawalsikaa1Valid: true,
                    apoout_tglakhirsikaa1Invalid: false,
                    apoout_tglakhirsikaa1Valid: true
                })
            }
        } catch (error) {
            console.log('SIK1: Error: ' + error.message);
            this.setState({
                apoout_tglawalsikaa1: value,
                apoout_tglawalsikaa1Invalid: true,
                apoout_tglawalsikaa1Valid: false,
                apoout_tglakhirsikaa1Invalid: true,
                apoout_tglakhirsikaa1Valid: false
            })
        }
        
    }

    handleSik1EndDateInputChange = (event) => {
        const value = event.target.value;
        const startDate = new Date(this.state.apoout_tglawalsikaa1);
        const endDate = new Date(value);

        console.log('SIK1: StartDate: ' + startDate);
        console.log('SIK1: EndDate: ' + endDate);

        try {
            if (startDate >= endDate) {
                this.setState({
                    apoout_tglakhirsikaa1: endDate.toISOString().substr(0, 10),
                    apoout_tglawalsikaa1Invalid: true,
                    apoout_tglawalsikaa1Valid: false,
                    apoout_tglakhirsikaa1Invalid: true,
                    apoout_tglakhirsikaa1Valid: false
                })
            } else {
                this.setState({
                    apoout_tglakhirsikaa1: endDate.toISOString().substr(0, 10),
                    apoout_tglawalsikaa1Invalid: false,
                    apoout_tglawalsikaa1Valid: true,
                    apoout_tglakhirsikaa1Invalid: false,
                    apoout_tglakhirsikaa1Valid: true
                })
            }
        } catch (error) {
            console.log('SIK1: Error: ' + error.message);
            this.setState({
                apoout_tglakhirsikaa1: value,
                apoout_tglawalsikaa1Invalid: true,
                apoout_tglawalsikaa1Valid: false,
                apoout_tglakhirsikaa1Invalid: true,
                apoout_tglakhirsikaa1Valid: false
            })
        }
        
    }
    // ----

    // ---- SIK 2 ----
    handleSik2InputChange = (event) => {
        const value = event.target.value;

        const regularExpression = /[^A-Za-z0-9\s\/\.]/gi;

        if (value.length === 0) {
            this.setState({
                apoout_sikttk2: value.replace(regularExpression, "").toUpperCase(),
                apoout_sikttk2Invalid: false,
                apoout_sikttk2Valid: false,
                apoout_tglawalsikaa2: '1900-01-01',
                apoout_tglawalsikaa2Invalid: false,
                apoout_tglawalsikaa2Valid: false,
                apoout_tglakhirsikaa2: '1900-01-01',
                apoout_tglakhirsikaa2Invalid: false,
                apoout_tglakhirsikaa2Valid: false,
                sik2Disabled: true
            }, () => console.log('handleSik2InputChange: Input:' + value));
        } else {
            this.setState({
                apoout_sikttk2: value.replace(regularExpression, "").toUpperCase(),
                apoout_sikttk2Invalid: value.replace(regularExpression, "").length < 8,
                apoout_sikttk2Valid: value.replace(regularExpression, "").length >= 8,
                sik2Disabled: false
            }, () => console.log('handleSik2InputChange: Input:' + value));
        }
    }

    handleSik2StartDateInputChange = (event) => {
        const value = event.target.value;
        const startDate = new Date(value);
        const endDate = new Date(this.state.apoout_tglakhirsikaa2);

        console.log('SIK2: StartDate: ' + startDate);
        console.log('SIK2: EndDate: ' + endDate);

        try {
            if (startDate >= endDate) {
                this.setState({
                    apoout_tglawalsikaa2: startDate.toISOString().substr(0, 10),
                    apoout_tglawalsikaa2Invalid: true,
                    apoout_tglawalsikaa2Valid: false,
                    apoout_tglakhirsikaa2Invalid: true,
                    apoout_tglakhirsikaa2Valid: false
                })
            } else {
                this.setState({
                    apoout_tglawalsikaa2: value,
                    apoout_tglawalsikaa2Invalid: false,
                    apoout_tglawalsikaa2Valid: true,
                    apoout_tglakhirsikaa2Invalid: false,
                    apoout_tglakhirsikaa2Valid: true
                })
            }
        } catch (error) {
            console.log('SIK2: Error: ' + error.message);
            this.setState({
                apoout_tglawalsikaa2: value,
                apoout_tglawalsikaa2Invalid: true,
                apoout_tglawalsikaa2Valid: false,
                apoout_tglakhirsikaa2Invalid: true,
                apoout_tglakhirsikaa2Valid: false
            })
        }
    }

    handleSik2EndDateInputChange = (event) => {
        const value = event.target.value;
        const startDate = new Date(this.state.apoout_tglawalsikaa2);
        const endDate = new Date(value);

        console.log('SIA: StartDate: ' + startDate);
        console.log('SIA: EndDate: ' + endDate);

        try {
            if (startDate >= endDate) {
                this.setState({
                    apoout_tglakhirsikaa2: endDate.toISOString().substr(0, 10),
                    apoout_tglawalsikaa2Invalid: true,
                    apoout_tglawalsikaa2Valid: false,
                    apoout_tglakhirsikaa2Invalid: true,
                    apoout_tglakhirsikaa2Valid: false
                })
            } else {
                this.setState({
                    apoout_tglakhirsikaa2: endDate.toISOString().substr(0, 10),
                    apoout_tglawalsikaa2Invalid: false,
                    apoout_tglawalsikaa2Valid: true,
                    apoout_tglakhirsikaa2Invalid: false,
                    apoout_tglakhirsikaa2Valid: true
                })
            }
        } catch (error) {
            console.log('SIK2: Error: ' + error.message);
            this.setState({
                apoout_tglakhirsikaa2: value,
                apoout_tglawalsikaa2Invalid: true,
                apoout_tglawalsikaa2Valid: false,
                apoout_tglakhirsikaa2Invalid: true,
                apoout_tglakhirsikaa2Valid: false
            })
        }
    }
    // ----

    handleInputDropdownChange = (event) => {
        console.log('HandleInput: Name: ' + event.target.name);
        console.log('HandleInput: Value: ' + event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // END OF INPUT HANDLER ---------------------------

    // --------------------------- SEARCH ---------------------------
    handleOutletSearchOnEnterPressed = (event, search) => {
        const code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            //Do stuff in here
            event.preventDefault();
            if (search === true) {
                this.getOutletList(this.state.outletSearchInput);
            }
        }
    }

    getOutletList = (input) => {
        if(input.length === 0) {
            console.log('CariOutletList: ERROR: Must be filled');
            return;
        }

        this.setState({
            isLoading: true
        })

        const url = hostUrl+`/CariDataOutletTanpaKota/${input}`
        console.log('CariOutletList: Fetching data from ' + url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    outletList: data,
                    isLoading: false
                })
            })
    }

    //function untuk melakukan search pada saat menekan enter
    cariOutletOnEnterPressed = (event, search) => {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            //Do stuff in here
            event.preventDefault();
            if (search === true) {
                this.cariOutlet(this.state.cariOutcodeInput);
            }
        }
    }

    cariOutlet = (input) => {
        //mengambil data dari backend
        //apabila kosong dia tidak akan mencari 

        if (input.length === 0) {
            console.log('CariOutlet: ERROR: Must be filled');
            return;
        }

        this.setState({
            isLoading: true
        })

        var url = hostUrl+`/TampilMasterDataApotik/${input}`
        console.log('CariOutlet: Fetching data from ' + url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                try {
                    this.setState({
                        out_name: data[0].out_name,
                        out_code: data[0].out_code,

                        apoout_runningid: data[0].apoout_runningid,
                        apoout_outcode: data[0].apoout_outcode,
                        apoout_apotikname: data[0].apoout_apotikname,
                        apoout_nipapoteker: data[0].apoout_nipapoteker,
                        apoout_apoteker: data[0].apoout_apoteker,
                        apoout_nohpapoteker: data[0].apoout_nohpapoteker,
                        apoout_nipapoteker2: data[0].apoout_nipapoteker2,
                        apoout_apoteker2: data[0].apoout_apoteker2,
                        apoout_nohpapoteker2: data[0].apoout_nohpapoteker2,
                        apoout_sik: data[0].apoout_sik,
                        apoout_sipaapa: data[0].apoout_sipaapa,
                        apoout_tglawalsipaapa: new Date(data[0].apoout_tglawalsipaapa).toISOString().substr(0, 10),
                        apoout_tglakhirsipaapa: data[0].apoout_tglakhirsipaapa,
                        apoout_sia: data[0].apoout_sia,
                        apoout_prdawalsia: data[0].apoout_prdawalsia,
                        apoout_prdakhirsia: data[0].apoout_prdakhirsia,
                        apoout_sipaaping: data[0].apoout_sipaaping,
                        apoout_tglawalsipaaping: data[0].apoout_tglawalsipaaping,
                        apoout_tglakhirsipaaping: data[0].apoout_tglakhirsipaaping,
                        apoout_userid: data[0].apoout_userid,
                        apoout_brandid: data[0].apoout_brandid,
                        apoout_nipasistenapoteker1: data[0].apoout_nipasistenapoteker1,
                        apoout_asistenapoteker1: data[0].apoout_asistenapoteker1,
                        apoout_nohpasistenapoteker1: data[0].apoout_nohpasistenapoteker1,
                        apoout_tglawalsikaa1: data[0].apoout_tglawalsikaa1,
                        apoout_tglakhirsikaa1: data[0].apoout_tglakhirsikaa1,
                        apoout_nipasistenapoteker2: data[0].apoout_nipasistenapoteker2,
                        apoout_asistenapoteker2: data[0].apoout_asistenapoteker2,
                        apoout_nohpasistenapoteker2: data[0].apoout_nohpasistenapoteker2,
                        apoout_sikttk2: data[0].apoout_sikttk2,
                        apoout_tglawalsikaa2: data[0].apoout_tglawalsikaa2,
                        apoout_tglakhirsikaa2: data[0].apoout_tglakhirsikaa2,
                        apoout_nipasistenapoteker3: data[0].apoout_nipasistenapoteker3,
                        apoout_asistenapoteker3: data[0].apoout_asistenapoteker3,
                        apoout_nohpasistenapoteker3: data[0].apoout_nohpasistenapoteker3,
                        apoout_sikttk3: data[0].apoout_sikttk3,
                        apoout_tglawalsikaa3: data[0].apoout_tglawalsikaa3,
                        apoout_tglakhirsikaa3: data[0].apoout_tglakhirsikaa3,
                        apoout_skdu: data[0].apoout_skdu,
                        apoout_tglawalskdu: data[0].apoout_tglawalskdu,
                        apoout_tglakhirskdu: data[0].apoout_tglakhirskdu,
                        apoout_suug: data[0].apoout_suug,
                        apoout_tglawalsuug: data[0].apoout_tglawalsuug,
                        apoout_tglakhirsuug: data[0].apoout_tglakhirsuug,
                        apoout_situ: data[0].apoout_situ,
                        apoout_tglawalsitu: data[0].apoout_tglawalsitu,
                        apoout_tglakhirsitu: data[0].apoout_tglakhirsitu,
                        apoout_siup: data[0].apoout_siup,
                        apoout_tglawalsiup: data[0].apoout_tglawalsiup,
                        apoout_tglakhirsiup: data[0].apoout_tglakhirsiup,
                        apoout_imb: data[0].apoout_imb,
                        apoout_tipegedung: data[0].apoout_tipegedung,

                        // Invalid
                        apoout_apotiknameInvalid: false,

                        apoout_nipapotekerInvalid: false,
                        apoout_apotekerInvalid: false,

                        apoout_nipapoteker2Invalid: false,
                        apoout_apoteker2Invalid: false,

                        apoout_siaInvalid: false,
                        apoout_prdawalsiaInvalid: false,
                        apoout_prdakhirsiaInvalid: false,

                        apoout_sipaapaInvalid: false,
                        apoout_tglawalsipaapaInvalid: false,
                        apoout_tglakhirsipaapaInvalid: false,

                        apoout_tglawalsipaapingInvalid: false,
                        apoout_tglakhirsipaapingInvalid: false,

                        apoout_tglawalsikaa1Invalid: false,
                        apoout_tglakhirsikaa1Invalid: false,

                        apoout_tglawalsikaa2Invalid: false,
                        apoout_tglakhirsikaa2Invalid: false,

                        // Valid
                        apoout_apotiknameValid: true,

                        apoout_nipapotekerValid: true,
                        apoout_apotekerValid: true,

                        apoout_nipapoteker2Valid: true,
                        apoout_apoteker2Valid: true,

                        apoout_siaValid: true,
                        apoout_prdawalsiaValid: true,
                        apoout_prdakhirsiaValid: true,

                        apoout_sipaapaValid: true,
                        apoout_tglawalsipaapaValid: true,
                        apoout_tglakhirsipaapaValid: true,

                        apoout_tglawalsipaapingValid: this.sipaApingCariOutlet(data),
                        apoout_tglakhirsipaapingValid: this.sipaApingCariOutlet(data),

                        apoout_tglawalsikaa1Valid: this.sik1CariOutlet(data),
                        apoout_tglakhirsikaa1Valid: this.sik1CariOutlet(data),

                        apoout_tglawalsikaa2Valid: this.sik2CariOutlet(data),
                        apoout_tglakhirsikaa2Valid: this.sik2CariOutlet(data),
                        // ---

                        displayAddButton: 'd-none',
                        displayEditButton: '',
                        displaySimpanButton: 'd-none',
                        displayOkButton: 'd-none',
                        buttonAddDisabled: true,

                        modal_outletSearch: false,
                        isLoading: false
                    }, () => console.log('CariOutlet: Data successfuly set'));
                    this.getTimbanganList(input);
                } catch (err) {
                    console.log('CariOutlet: There is no outlet/apotik data');
                    console.log('CariOutlet: Error: ' + err.message);
                    this.handleNoApotik(data);
                    return;
                }
            });
    }

    sipaApingCariOutlet = (data) => {
        if (data[0].apoout_sipaaping.length === 0) {
            return false;
        }
        return true;
    }

    sik1CariOutlet = (data) => {
        if (data[0].apoout_sik.length === 0) {
            return false;
        }
        return true;
    }

    sik2CariOutlet = (data) => {
        if (data[0].apoout_sikttk2.length === 0) {
            return false;
        }
        return true;
    }

    handleNoApotik = (data) => {
        if (data[0].outlet_exist) {
            console.log('CariOutlet: Apotik does not exist');

            this.setState({
                out_code: data[0].out_code,
                out_name: data[0].out_name,

                apoout_outcode: data[0].out_code,
                apoout_apotikname: '',
                apoout_nipapoteker: '',
                apoout_apoteker: '',
                apoout_nohpapoteker: '',
                apoout_nipapoteker2: '',
                apoout_apoteker2: '',
                apoout_nohpapoteker2: '',
                apoout_sik: '',
                apoout_sipaapa: '',
                apoout_tglawalsipaapa: '1900-01-01',
                apoout_tglakhirsipaapa: '1900-01-01',
                apoout_sia: '',
                apoout_prdawalsia: '1900-01-01',
                apoout_prdakhirsia: '1900-01-01',
                apoout_sipaaping: '',
                apoout_tglawalsipaaping: '1900-01-01',
                apoout_tglakhirsipaaping: '1900-01-01',
                apoout_userid: '0',
                apoout_brandid: 1,
                apoout_nipasistenapoteker1: '',
                apoout_asistenapoteker1: '',
                apoout_nohpasistenapoteker1: '',
                apoout_tglawalsikaa1: '1900-01-01',
                apoout_tglakhirsikaa1: '1900-01-01',
                apoout_nipasistenapoteker2: '',
                apoout_asistenapoteker2: '',
                apoout_nohpasistenapoteker2: '',
                apoout_sikttk2: '',
                apoout_tglawalsikaa2: '1900-01-01',
                apoout_tglakhirsikaa2: '1900-01-01',
                apoout_nipasistenapoteker3: '',
                apoout_asistenapoteker3: '',
                apoout_nohpasistenapoteker3: '',
                apoout_sikttk3: '',
                apoout_tglawalsikaa3: '',
                apoout_tglakhirsikaa3: '',
                apoout_skdu: '',
                apoout_tglawalskdu: '',
                apoout_tglakhirskdu: '',
                apoout_suug: '',
                apoout_tglawalsuug: '',
                apoout_tglakhirsuug: '',
                apoout_situ: '',
                apoout_tglawalsitu: '',
                apoout_tglakhirsitu: '',
                apoout_siup: '',
                apoout_tglawalsiup: '',
                apoout_tglakhirsiup: '',
                apoout_imb: '',
                apoout_tipegedung: '',

                timbanganList: [],

                // Invalid
                apoout_apotiknameInvalid: false,

                apoout_nipapotekerInvalid: false,
                apoout_apotekerInvalid: false,

                apoout_nipapoteker2Invalid: false,
                apoout_apoteker2Invalid: false,

                apoout_siaInvalid: false,
                apoout_prdawalsiaInvalid: false,
                apoout_prdakhirsiaInvalid: false,

                apoout_sipaapaInvalid: false,
                apoout_tglawalsipaapaInvalid: false,
                apoout_tglakhirsipaapaInvalid: false,

                apoout_tglawalsipaapingInvalid: false,
                apoout_tglakhirsipaapingInvalid: false,

                apoout_tglawalsikaa1Invalid: false,
                apoout_tglakhirsikaa1Invalid: false,

                apoout_tglawalsikaa2Invalid: false,
                apoout_tglakhirsikaa2Invalid: false,

                // Valid
                apoout_apotiknameValid: false,

                apoout_nipapotekerValid: false,
                apoout_apotekerValid: false,

                apoout_nipapoteker2Valid: false,
                apoout_apoteker2Valid: false,

                apoout_siaValid: false,
                apoout_prdawalsiaValid: false,
                apoout_prdakhirsiaValid: false,

                apoout_sipaapaValid: false,
                apoout_tglawalsipaapaValid: false,
                apoout_tglakhirsipaapaValid: false,

                apoout_tglawalsipaapingValid: false,
                apoout_tglakhirsipaapingValid: false,

                apoout_tglawalsikaa1Valid: false,
                apoout_tglakhirsikaa1Valid: false,

                apoout_tglawalsikaa2Valid: false,
                apoout_tglakhirsikaa2Valid: false,
                // ---

                displayAddButton: '',
                displayEditButton: 'd-none',
                displaySimpanButton: 'd-none',
                displayOkButton: 'd-none',
                buttonAddDisabled: true,

                modal_outletSearch: false,
                isLoading: false
            })
        } else {
            console.log('CariOutlet: Outlet data: ' + data[0].outlet_exist);
            console.log('CariOutlet: Outlet does not exist');

            this.setState({
                isLoading: false
            })
        }
    }

    getTimbanganList = async (outcode) => {
        const url = hostUrl+'/TampilMasterTimbangan/' + outcode;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    timbanganList: data
                }, console.log('Timbangan: ' + JSON.stringify(data)))
            })
    }
    // END OF SEARCH ---------------------------

    // --------------------------- APA Karyawan Search ---------------------------
    handleApaKaryawanOnEnterPressed = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            //Do stuff in here
            event.preventDefault();
            this.getApaKaryawanList();
        }
    }

    getApaKaryawanList = () => {
        this.setState({
            isLoading: true
        })

        const url = hostUrl+`/TampilDataKaryawan/${this.state.apaKaryawanSearchInput}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    apaKaryawanList: data,
                    isLoading: false
                }, () => console.log('ApaKaryawan: Data: ' + JSON.stringify(data)))
            })
    }

    handleApaKaryawanClick = (event) => {
        const karyawanNip = event.target.name;
        const karyawanNama = event.target.value;

        this.setState({
            apoout_nipapoteker: karyawanNip,
            apoout_nipapotekerInvalid: false,
            apoout_nipapotekerValid: true,

            apoout_apoteker: karyawanNama,
            apoout_apotekerInvalid: false,
            apoout_apotekerValid: true,

            modal_apaKaryawanSearch: false
        })
    }
    // END OF APA ---------------------------

    // --------------------------- APING Karyawan Search ---------------------------
    handleApingKaryawanOnEnterPressed = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            //Do stuff in here
            event.preventDefault();
            this.getApingKaryawanList();
        }
    }

    getApingKaryawanList = () => {
        this.setState({
            isLoading: true
        })

        const url = hostUrl+`/TampilDataKaryawan/${this.state.apingKaryawanSearchInput}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    apingKaryawanList: data,
                    isLoading: false
                }, () => console.log('ApaKaryawan: Data: ' + JSON.stringify(data)))
            })
    }

    handleApingKaryawanClick = (event) => {
        const karyawanNip = event.target.name;
        const karyawanNama = event.target.value;

        this.setState({
            apoout_nipapoteker2: karyawanNip,
            apoout_nipapoteker2Invalid: false,
            apoout_nipapoteker2Valid: true,

            apoout_apoteker2: karyawanNama,
            apoout_apoteker2Invalid: false,
            apoout_apoteker2Valid: true,

            modal_apingKaryawanSearch: false
        })
    }
    // END OF APING ---------------------------

    // --------------------------- Asisten Apoteker 1 ---------------------------
    handleAa1KaryawanOnEnterPressed = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            //Do stuff in here
            event.preventDefault();
            this.getAa1KaryawanList();
        }
    }

    getAa1KaryawanList = () => {
        this.setState({
            isLoading: true
        })

        const url = hostUrl+`/TampilDataKaryawan/${this.state.aa1KaryawanSearchInput}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    aa1KaryawanList: data,
                    isLoading: false
                }, () => console.log('ApaKaryawan: Data: ' + JSON.stringify(data)))
            })
    }

    handleAa1KaryawanClick = (event) => {
        const karyawanNip = event.target.name;
        const karyawanNama = event.target.value;

        this.setState({
            apoout_nipasistenapoteker1: karyawanNip,
            apoout_asistenapoteker1: karyawanNama,
            modal_aa1KaryawanSearch: false
        })
    }
    // END OF ASISTEN APOTEKER 1 ---------------------------

    // --------------------------- Asisten Apoteker 2 ---------------------------
    handleAa2KaryawanOnEnterPressed = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            //Do stuff in here
            event.preventDefault();
            this.getAa2KaryawanList();
        }
    }

    getAa2KaryawanList = () => {
        this.setState({
            isLoading: true
        })

        const url = hostUrl+`/TampilDataKaryawan/${this.state.aa2KaryawanSearchInput}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    aa2KaryawanList: data,
                    isLoading: false
                }, () => console.log('ApaKaryawan: Data: ' + JSON.stringify(data)))
            })
    }

    handleAa2KaryawanClick = (event) => {
        const karyawanNip = event.target.name;
        const karyawanNama = event.target.value;

        this.setState({
            apoout_nipasistenapoteker2: karyawanNip,
            apoout_asistenapoteker2: karyawanNama,
            modal_aa2KaryawanSearch: false
        })
    }
    // END OF ASISTEN APOTEKER 2 ---------------------------

    // --------------------------- ADD ---------------------------
    handleAddButtonClick = () => {
        this.setState({
            isLoading: true,

            apoout_tglawalsipaapa: '1900-01-01',
            apoout_tglakhirsipaapa: '1900-01-01',

            apoout_prdawalsia: '1900-01-01',
            apoout_prdakhirsia: '1900-01-01',

            apoout_tglawalsipaaping: '1900-01-01',
            apoout_tglakhirsipaaping: '1900-01-01',

            apoout_tglawalsikaa2: '1900-01-01',
            apoout_tglakhirsikaa2: '1900-01-01',

            // Invalid
            // apoout_apotiknameInvalid: true,

            // apoout_nipapotekerInvalid: true,
            // apoout_apotekerInvalid: true,

            // apoout_nipapoteker2Invalid: true,
            // apoout_apoteker2Invalid: true,

            // apoout_siaInvalid: true,
            apoout_prdawalsiaInvalid: false,
            apoout_prdakhirsiaInvalid: false,

            // apoout_sipaapaInvalid: true,
            apoout_tglawalsipaapaInvalid: false,
            apoout_tglakhirsipaapaInvalid: false,

            apoout_tglawalsipaapingInvalid: false,
            apoout_tglakhirsipaapingInvalid: false,

            apoout_tglawalsikaa1Invalid: false,
            apoout_tglawalsikaa2Invalid: false,

            displayAddButton: 'd-none',
            displayEditButton: 'd-none',
            displaySimpanButton: '',
            displayOkButton: 'd-none',
            buttonAddDisabled: false,

            isLoading: false
        });
    }

    handleSimpanButtonClick = async () => {

        if (!this.validateSimpan()) {
            console.log('Validate: False');
            this.state.validateErrorMessage.unshift('Gagal menyimpan data, pastikan data yang dimasukkan sudah benar')

            this.state.validateErrorMessage.map((msg) => this.showNotification(msg))

            return;
        }

        console.log('Simpan: Starting...');

        this.setState({
            isLoading: true
        });

        const url = hostUrl+'/TambahMasterDataApotik/';
        var payload = {
            apoout_outcode: this.state.out_code,
            apoout_apotikname: this.state.apoout_apotikname,
            apoout_nipapoteker: this.state.apoout_nipapoteker,
            apoout_apoteker: this.state.apoout_apoteker,
            apoout_nohpapoteker: this.state.apoout_nohpapoteker,
            apoout_nipapoteker2: this.state.apoout_nipapoteker2,
            apoout_apoteker2: this.state.apoout_apoteker2,
            apoout_nohpapoteker2: this.state.apoout_nohpapoteker2,
            apoout_sik: this.state.apoout_sik,
            apoout_sipaapa: this.state.apoout_sipaapa,
            apoout_tglawalsipaapa: this.state.apoout_tglawalsipaapa,
            apoout_tglakhirsipaapa: this.state.apoout_tglakhirsipaapa,
            apoout_sia: this.state.apoout_sia,
            apoout_prdawalsia: this.state.apoout_prdawalsia,
            apoout_prdakhirsia: this.state.apoout_prdakhirsia,
            apoout_sipaaping: this.state.apoout_sipaaping,
            apoout_tglawalsipaaping: this.state.apoout_tglawalsipaaping,
            apoout_tglakhirsipaaping: this.state.apoout_tglakhirsipaaping,
            apoout_userid: '0',
            apoout_brandid: this.state.apoout_brandid,
            apoout_nipasistenapoteker1: this.state.apoout_nipasistenapoteker1,
            apoout_asistenapoteker1: this.state.apoout_asistenapoteker1,
            apoout_nohpasistenapoteker1: this.state.apoout_nohpasistenapoteker1,
            apoout_tglawalsikaa1: this.state.apoout_tglawalsikaa1,
            apoout_tglakhirsikaa1: this.state.apoout_tglakhirsikaa1,
            apoout_nipasistenapoteker2: this.state.apoout_nipasistenapoteker2,
            apoout_asistenapoteker2: this.state.apoout_asistenapoteker2,
            apoout_nohpasistenapoteker2: this.state.apoout_nohpasistenapoteker2,
            apoout_sikttk2: this.state.apoout_sikttk2,
            apoout_tglawalsikaa2: this.state.apoout_tglawalsikaa2,
            apoout_tglakhirsikaa2: this.state.apoout_tglakhirsikaa2
        };

        console.log('Simpan: Payload: ' + JSON.stringify(payload));
        console.log('Simpan: Inserting data...');
        let data = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            json: true,
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                this.setState({
                    isLoading: false
                })
            }
        });

        console.log('Simpan: Response: ' + data);

        if (data) {
            this.showNotification('Data Apotik untuk Outlet ' + this.state.out_name + ' berhasil disimpan');
        } else {
            alert('Data Apotik untuk Outlet ' + this.state.out_name + ' sudah pernah ada');
        }

        this.setState({
            modal_konfirmasiSimpan: false,
            isLoading: false
        })
    }

    validateSimpan = () => {

        this.state.validateErrorMessage.length = 0;

        var inputValid = [];

        // Data Apotik
        if (this.state.apoout_apotiknameValid
            || this.state.apoout_nipapotekerValid
            || this.state.apoout_apotekerValid
            || this.state.apoout_nipapoteker2Valid
            || this.state.apoout_apoteker2Valid
            || this.state.apoout_siaValid
            || this.state.apoout_sipaapaValid) {
                inputValid.push(true);
        } else {
            inputValid.push(false);
            this.state.validateErrorMessage.push('Data Apotik tidak diisi');
        }

        // ---- SIA ----
        inputValid.push(!this.state.apoout_siaInvalid);

        if (!this.state.siaDisabled) {
            inputValid.push(!this.state.apoout_prdawalsiaInvalid);
            inputValid.push(!this.state.apoout_prdakhirsiaInvalid);
        }

        if (this.state.apoout_prdawalsiaInvalid || this.state.apoout_prdakhirsiaInvalid) {
            this.state.validateErrorMessage.push('Periode Awal SIA tidak boleh lebih besar dari Periode Akhirnya');
        }
        // ---- 

        // ---- SIPA APA ----
        inputValid.push(!this.state.apoout_sipaapaInvalid);

        if (!this.state.sipaApaDisabled) {
            inputValid.push(!this.state.apoout_tglawalsipaapaInvalid);
            inputValid.push(!this.state.apoout_tglawalsipaapaInvalid);
        }

        if (this.state.apoout_tglawalsipaapaInvalid || this.state.apoout_tglawalsipaapaInvalid) {
            this.state.validateErrorMessage.push('Periode Awal SIPA APA tidak boleh lebih besar dari Periode Akhirnya');
        }
        // ---- 

        // ---- SIPA APING ----
        inputValid.push(!this.state.apoout_sipaapingInvalid);

        if (!this.state.sipaApingDisabled) {
            inputValid.push(!this.state.apoout_tglawalsipaapingInvalid);
            inputValid.push(!this.state.apoout_tglakhirsipaapingInvalid);
        }

        if (this.state.apoout_tglawalsipaapingInvalid || this.state.apoout_tglakhirsipaapingInvalid) {
            this.state.validateErrorMessage.push('Periode Awal SIPA APING tidak boleh lebih besar dari Periode Akhirnya');
        }
        // ---- 

        // ---- SIK 1 ----
        inputValid.push(!this.state.apoout_sikInvalid);

        if (!this.state.sik1Disabled) {
            inputValid.push(!this.state.apoout_tglawalsikaa1Invalid);
            inputValid.push(!this.state.apoout_tglakhirsikaa1Invalid);
        }

        if (this.state.apoout_tglawalsikaa1Invalid || this.state.apoout_tglakhirsikaa1Invalid) {
            this.state.validateErrorMessage.push('Periode Awal SIKTTK Asisten Apoteker 1 tidak boleh lebih besar dari Periode Akhirnya');
        }
        // ---- 

        // ---- SIK 2 ----
        inputValid.push(!this.state.apoout_sikttk2Invalid);

        if (!this.state.sik2Disabled) {
            inputValid.push(!this.state.apoout_tglawalsikaa2Invalid);
            inputValid.push(!this.state.apoout_tglakhirsikaa2Invalid);
        }

        if (this.state.apoout_tglawalsikaa2Invalid || this.state.apoout_tglakhirsikaa2Invalid) {
            this.state.validateErrorMessage.push('Periode Awal SIKTTK Asisten Apoteker 2 tidak boleh lebih besar dari Periode Akhirnya');
        }
        // ----

        console.log('ValidList: ' + inputValid);

        if (inputValid.includes(false)) {
            return false;
        } else {
            return true;
        }
    }
    // END OF ADD ---------------------------

    // --------------------------- UPDATE ---------------------------
    handleEditButtonClick = () => {
        const sia = this.state.apoout_sia;
        const sipaApa = this.state.apoout_sipaapa;
        const sipaAping = this.state.apoout_sipaaping;
        const sik1 = this.state.apoout_sik;
        const sik2 = this.state.apoout_sikttk2;

        this.setState({
            isLoading: true,
            displayAddButton: 'd-none',
            displayEditButton: 'd-none',
            displaySimpanButton: 'd-none',
            displayOkButton: '',

            buttonAddDisabled: false,

            siaDisabled: sia.length === 0,
            sipaApaDisabled: sipaApa.length === 0,
            sipaApingDisabled: sipaAping.length === 0,
            sik1Disabled: sik1.length === 0,
            sik2Disabled: sik2.length === 0,

            isLoading: false
        });
    }

    handleOkButtonClick = async () => {

        if (!this.validateSimpan()) {
            console.log('Validate: False');
            this.state.validateErrorMessage.unshift('Gagal menyimpan data, pastikan data yang dimasukkan sudah benar')

            this.state.validateErrorMessage.map((msg) => this.showNotification(msg))

            return;
        }

        console.log('OK: Starting...');

        this.setState({
            isLoading: true
        });

        const url = hostUrl + '/UbahMasterDataApotik/' + this.state.apoout_runningid;
        var payload = {
            apoout_outcode: this.state.out_code,
            apoout_apotikname: this.state.apoout_apotikname,
            apoout_nipapoteker: this.state.apoout_nipapoteker,
            apoout_apoteker: this.state.apoout_apoteker,
            apoout_nohpapoteker: this.state.apoout_nohpapoteker,
            apoout_nipapoteker2: this.state.apoout_nipapoteker2,
            apoout_apoteker2: this.state.apoout_apoteker2,
            apoout_nohpapoteker2: this.state.apoout_nohpapoteker2,
            apoout_sik: this.state.apoout_sik,
            apoout_sipaapa: this.state.apoout_sipaapa,
            apoout_tglawalsipaapa: this.state.apoout_tglawalsipaapa,
            apoout_tglakhirsipaapa: this.state.apoout_tglakhirsipaapa,
            apoout_sia: this.state.apoout_sia,
            apoout_prdawalsia: this.state.apoout_prdawalsia,
            apoout_prdakhirsia: this.state.apoout_prdakhirsia,
            apoout_sipaaping: this.state.apoout_sipaaping,
            apoout_tglawalsipaaping: this.state.apoout_tglawalsipaaping,
            apoout_tglakhirsipaaping: this.state.apoout_tglakhirsipaaping,
            apoout_userid: '0',
            apoout_brandid: this.state.apoout_brandid,
            apoout_nipasistenapoteker1: this.state.apoout_nipasistenapoteker1,
            apoout_asistenapoteker1: this.state.apoout_asistenapoteker1,
            apoout_nohpasistenapoteker1: this.state.apoout_nohpasistenapoteker1,
            apoout_tglawalsikaa1: this.state.apoout_tglawalsikaa1,
            apoout_tglakhirsikaa1: this.state.apoout_tglakhirsikaa1,
            apoout_nipasistenapoteker2: this.state.apoout_nipasistenapoteker2,
            apoout_asistenapoteker2: this.state.apoout_asistenapoteker2,
            apoout_nohpasistenapoteker2: this.state.apoout_nohpasistenapoteker2,
            apoout_sikttk2: this.state.apoout_sikttk2,
            apoout_tglawalsikaa2: this.state.apoout_tglawalsikaa2,
            apoout_tglakhirsikaa2: this.state.apoout_tglakhirsikaa2
        };

        console.log('OK: Payload: ' + JSON.stringify(payload));
        console.log('OK: Inserting data...');
        let data = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            json: true,
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                this.setState({
                    isLoading: false
                })
            }
        });

        console.log('OK: Response: ' + data);

        if (data) {
            this.showNotification('Data Apotik untuk Outlet ' + this.state.out_name + ' berhasil disimpan');
        } else {
            alert('Data Apotik untuk Outlet ' + this.state.out_name + ' sudah pernah ada');
        }

        this.setState({
            modal_konfirmasiOk: false,
            isLoading: false
        })
    }
    // END OF UPDATE ---------------------------

    // --------------------------- TIMBANGAN---------------------------
    handleTambahTimbanganButtonOnClick = () => {
        this.setState({
            timout_runningid: '',
            timout_namatimbangan: this.state.itemList[0].itm_nama,
            timout_tanggaltara: '1900-01-01',
            timout_masaberlaku: '',
            timout_userid: '0',
            modal_tambahTimbangan: true
        })
    }

    tambahTimbangan = async () => {
        this.setState({
            isLoading: true
        })

        console.log('TambahTimbangan: Starting...');

        const url = hostUrl+'/TambahMasterTimbangan/'
        var masaBerlaku = new Date(this.state.timout_tanggaltara);
        masaBerlaku.setFullYear(masaBerlaku.getFullYear() + 1);
        
        var payload = {
            timout_outcode: this.state.out_code,
            timout_namatimbangan: this.state.timout_namatimbangan,
            timout_tanggaltara: this.state.timout_tanggaltara,
            timout_masaberlaku: masaBerlaku.toISOString().substr(0, 10),
            timout_userid: this.state.timout_userid
        }

        console.log('TambahTimbangan: Payload: ' + JSON.stringify(payload));
        console.log('TambahTimbangan: Inserting data');

        let data = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            json: true,
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        });

        if (data) {
            this.showNotification('Data Timbangan ' + this.state.timout_namatimbangan + ' untuk Outlet ' + this.state.out_name + ' berhasil disimpan');
            this.getTimbanganList(this.state.out_code);
            this.setState({
                modal_tambahTimbangan: false,
                isLoading: false
            })
        } else {
            alert('Data Timbangan ' + this.state.timout_namatimbangan + ' untuk Outlet ' + this.state.out_name + ' sudah pernah ada');
            this.setState({
                isLoading: false
            })
        }

        console.log('TambahTimbangan: Response: ' + data);

    }

    handleUbahTimbanganButtonOnClick = (event) => {
        const name = event.currentTarget.name;
        const namaTimbangan = name.substr(0, name.indexOf('@'));
        const tanggalTaraTimbangan = name.substr(name.indexOf('@') + 1);
        console.log('UbahTimbangan: ' + event.currentTarget.name);

        this.setState({
            timout_runningid: event.currentTarget.value,
            timout_namatimbangan: namaTimbangan,
            timout_tanggaltara: tanggalTaraTimbangan,
            timout_masaberlaku: '',
            timout_userid:'0',
            modal_ubahTimbangan: true
        })
    }

    ubahTimbangan = async () => {
        this.setState({
            isLoading: true
        })

        console.log('UbahTimbangan: Starting...');

        const url = hostUrl+`/UbahMasterTimbangan/${this.state.timout_runningid}`
        var masaBerlaku = new Date(this.state.timout_tanggaltara);
        masaBerlaku.setFullYear(masaBerlaku.getFullYear() + 1);

        var payload = {
            timout_outcode: this.state.out_code,
            timout_namatimbangan: this.state.timout_namatimbangan,
            timout_tanggaltara: this.state.timout_tanggaltara,
            timout_masaberlaku: masaBerlaku.toISOString().substr(0, 10),
            timout_userid: this.state.timout_userid
        }

        console.log('UbahTimbangan: Payload: ' + JSON.stringify(payload));
        console.log('UbahTimbangan: Inserting data');

        let data = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            json: true,
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        });

        if (data) {
            this.showNotification('Data Timbangan ' + this.state.timout_namatimbangan + ' untuk Outlet ' + this.state.out_name + ' berhasil diubah');
            this.getTimbanganList(this.state.out_code);
            this.setState({
                modal_ubahTimbangan: false,
                isLoading: false
            })
        } else {
            alert('Data Timbangan ' + this.state.timout_namatimbangan + ' untuk Outlet ' + this.state.out_name + ' sudah pernah ada');
            this.setState({
                isLoading: false
            })
        }

        console.log('UbahTimbangan: Response: ' + data);
    }

    hapusTimbangan = async (event) => {

        console.log('Timbangan: Delete: Starting...');

        const timbanganRunningId = event.currentTarget.value;
        const timbanganName = event.currentTarget.name;
        this.setState({
            isLoading: true
        });
        
        const url = `http://10.0.111.143:8083/HapusMasterTimbangan/${timbanganRunningId}`;
        var payload = {
            timout_userid: '0'
        }

        console.log('Timbangan: Payload: ' + JSON.stringify(payload));
        console.log('Timbangan: Deleting data...')

        try {
            let data = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                json: true,
                body: JSON.stringify(payload)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                })

            console.log('Timbangan: Response: ' + data);


            if (data) {
                this.showNotification('Data Timbangan ' + timbanganName + ' berhasil dihapus');
                this.getTimbanganList(this.state.out_code);
            } else {
                alert('Data Timbangan ' + timbanganName + ' gagal dihapus');
            }
        } catch (err) {
            console.log('Timbangan: Error: ' + err.message);
        } finally {
            this.setState({
                isLoading: false
            })
        }
    }
    // END OF DELETE

    //render biasa nya di-isi untuk desain HTML
    render() {
        return (

            <Page
                title="Data Apotik"
                breadcrumbs={[{ name: 'OutletDataApotik', active: true }]}
                className="Data ApotikPage">

                <Card className="mb-3">
                    <NotificationSystem
                        dismissible={false}
                        ref={notificationSystem =>
                            (this.notificationSystem = notificationSystem)
                        }
                        style={NOTIFICATION_SYSTEM_STYLE} />
                    <CardHeader className="d-flex justify-content-end">
                        <Form inline className="cr-search-form d-none">
                            <MdSearch size="20" className="cr-search-form__icon-search text-secondary" />
                            <Card>
                                <InputGroup className='d-none' /*SEARCHING*/>
                                    <Input
                                        name='cariOutcodeInput'
                                        disabled={this.state.isLoading}
                                        onChange={evt => this.handleInputChange(evt)}
                                        value={this.state.cariOutcodeInput}
                                        onKeyPress={event => this.cariOutletOnEnterPressed(event, true)}
                                        className="d-inline cr-search-form_input"
                                        placeholder="Cari Outlet ID.."
                                        maxLength='3' />
                                    <InputGroupAddon addonType='append'>
                                        <Button
                                            disabled={this.state.isLoading}
                                            onSubmit={e => e.preventDefault()}
                                            onClick={() => this.cariOutlet(this.state.cariOutcodeInput)}>
                                            <MdSearch />
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Card>
                        </Form>

                        <Row >
                            <Col xs={8} md={4} >
                                <Button
                                    disabled={this.state.isLoading}
                                    onClick={() => this.handleEditButtonClick()}
                                    className={this.state.displayEditButton}>
                                    Edit
                                </Button>

                                <Button
                                    disabled={this.state.isLoading}
                                    color="success"
                                    className={this.state.displayOkButton}
                                    onClick={this.toggle('konfirmasiOk')}>
                                    OK
                                </Button>

                                <Button
                                    disabled={this.state.isLoading}
                                    className={this.state.displayAddButton}
                                    onClick={() => this.handleAddButtonClick()}>
                                    Add
                                </Button>

                                <Button
                                    disabled={this.state.isLoading}
                                    className={this.state.displaySimpanButton} 
                                    color='success'
                                    onClick={this.toggle('konfirmasiSimpan')}>
                                    Simpan
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>

                    <CardBody>
                        <Form>
                            <Row form>
                                <Label sm={3} md={2} style={{ fontWeight: "bold" }}>
                                    Outlet
                                </Label>

                                <Col md={10}>
                                    <InputGroup className='d-flex'>
                                        <Input
                                            // Outcode
                                            value={this.state.out_code}
                                            disabled
                                            maxLength="3" />

                                        <Input
                                            // Nama PT
                                            className='d-none'
                                            value=''
                                            disabled
                                            maxLength="2" />

                                        <Input
                                            // Outname
                                            className='flex-grow-1 w-50'
                                            value={this.state.out_name}
                                            disabled />

                                        <InputGroupAddon addonType='append'>
                                            <Button disabled={this.state.isLoading} onClick={this.toggle('outletSearch')}>
                                                <MdSearch/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row form className="mt-3">
                                <Label sm={3} style={{ fontWeight: "bold" }}>
                                    Data Apotik
                                </Label>
                            </Row>

                            <Row form className="mt-3">
                                <Col xs={4} md={2}>
                                    <Label>
                                        Brand
                                    </Label>
                                </Col>

                                <Col xs={10} md={10}>
                                    <Input
                                        name='apoout_brandid'
                                        type="select"
                                        value={this.state.apoout_brandid}
                                        onChange={event => this.handleInputDropdownChange(event)}
                                        disabled={this.state.buttonAddDisabled || this.state.brandDisabled}>
                                        {this.state.brandList.map((brand) =>
                                            <option
                                                name={brand.outbra_code}
                                                value={brand.outbra_code}>
                                                {brand.outbra_name}
                                            </option>
                                        )}
                                    </Input>
                                </Col>
                            </Row>

                            <Row form className="mt-3">
                                <Col xs={4} md={2}>
                                    <Label>
                                        Nama Cabang
                                    </Label>
                                </Col>

                                <Col xs={10} md={10}>
                                    <Input
                                        name='apoout_apotikname'
                                        onChange={evt => this.handleInputValidateChange(evt)}
                                        value={this.state.apoout_apotikname}
                                        disabled={this.state.buttonAddDisabled}
                                        valid={this.state.apoout_apotiknameValid}/>
                                </Col>
                            </Row>

                            <Row form className='d-flex mt-3 justify-content-around'>
                                <Col md={6}>
                                    <Card>
                                        <CardHeader>Apoteker Penanggung Jawab (APA)</CardHeader>
                                        <CardBody>
                                            <InputGroup className='d-flex'>
                                                <Input
                                                    placeholder="NIP"
                                                    onChange={evt => this.handleInputValidateChange(evt)}
                                                    value={this.state.apoout_nipapoteker}
                                                    name='apoout_nipapoteker'
                                                    disabled
                                                    valid={this.state.apoout_nipapotekerValid} />
                                                <Input
                                                    className='flex-grow-1 w-50'
                                                    placeholder="Nama Apoteker"
                                                    onChange={evt => this.handleInputValidateChange(evt)}
                                                    value={this.state.apoout_apoteker}
                                                    name='apoout_apoteker'
                                                    disabled
                                                    valid={this.state.apoout_apotekerValid} />
                                                <InputGroupAddon addonType='append'>
                                                    <Button disabled={this.state.buttonAddDisabled || this.state.isLoading} onClick={this.toggle('apaKaryawanSearch')}>
                                                        <MdSearch />
                                                    </Button>
                                                </InputGroupAddon>
                                            </InputGroup>

                                            <Input
                                                type='number'
                                                className='mt-3'
                                                placeholder="No Telephone"
                                                onChange={evt => this.handleInputChange(evt)}
                                                value={this.state.apoout_nohpapoteker}
                                                name='apoout_nohpapoteker'
                                                disabled={this.state.buttonAddDisabled} />
                                        </CardBody>
                                    </Card>
                                </Col> 

                                <Col md={6}>
                                    <Card>
                                        <CardHeader>Apoteker Pendamping (APING)</CardHeader>
                                        <CardBody>
                                            <InputGroup className='d-flex'>
                                                <Input
                                                    placeholder="NIP"
                                                    onChange={evt => this.handleInputValidateChange(evt)}
                                                    value={this.state.apoout_nipapoteker2}
                                                    name='apoout_nipapoteker2'
                                                    disabled
                                                    valid={this.state.apoout_nipapoteker2Valid} />
                                                <Input
                                                    className='flex-grow-1 w-50'
                                                    placeholder="Nama Apoteker"
                                                    onChange={evt => this.handleInputValidateChange(evt)}
                                                    value={this.state.apoout_apoteker2}
                                                    name='apoout_apoteker2'
                                                    disabled
                                                    valid={this.state.apoout_apoteker2Valid} />
                                                <InputGroupAddon addonType='append'>
                                                    <Button disabled={this.state.buttonAddDisabled || this.state.isLoading} onClick={this.toggle('apingKaryawanSearch')}>
                                                        <MdSearch />
                                                    </Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                            <Input
                                                type='number'
                                                placeholder="No Telephone"
                                                className='mt-3'
                                                onChange={evt => this.handleInputChange(evt)}
                                                value={this.state.apoout_nohpapoteker2}
                                                name='apoout_nohpapoteker2'
                                                disabled={this.state.buttonAddDisabled} />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row form className='d-flex justify-content-between mt-3'>
                                <Col xs={10} md={4}>
                                    <Label>
                                        Surat Izin Apotek (SIA)
                                    </Label>
                                    <Input
                                        type="textareat"
                                        placeholder="No SIA"
                                        onChange={evt => this.handleSiaInputChange(evt)}
                                        value={this.state.apoout_sia}
                                        name='apoout_sia'
                                        disabled={this.state.buttonAddDisabled}
                                        invalid={this.state.apoout_siaInvalid}
                                        valid={this.state.apoout_siaValid} />
                                </Col>

                                <Col xs={10} md={3}>
                                    <Label>
                                        Periode Awal
                                        <MdWarning color='#fee12b' className={this.state.siaDisabled ? 'd-none' : ''} />
                                    </Label>
                                    <Input
                                        type="date"
                                        onChange={evt => this.handleSiaStartDateInputChange(evt)}
                                        value={this.state.apoout_prdawalsia}
                                        name='apoout_prdawalsia'
                                        disabled={this.state.buttonAddDisabled || this.state.siaDisabled}
                                        invalid={this.state.apoout_prdawalsiaInvalid}
                                        valid={this.state.apoout_prdawalsiaValid} />
                                </Col>

                                <Col xs={10} md={3}>
                                    <Label>
                                        Periode Akhir
                                        <MdWarning color='#fee12b' className={this.state.siaDisabled ? 'd-none' : ''} />
                                    </Label>
                                    <Input
                                        type="date"
                                        onChange={evt => this.handleSiaEndDateInputChange(evt)}
                                        value={this.state.apoout_prdakhirsia}
                                        name='apoout_prdakhirsia'
                                        disabled={this.state.buttonAddDisabled || this.state.siaDisabled}
                                        invalid={this.state.apoout_prdakhirsiaInvalid}
                                        valid={this.state.apoout_prdakhirsiaValid} />
                                </Col>
                            </Row>

                            <Row form className='d-flex justify-content-between mt-3'>

                                <Col xs={10} md={4}>
                                    <Label>
                                        Surat Izin Praktek Apoteker (SIPA APA)
                                    </Label>
                                    <Input
                                        placeholder="No SIPA APA"
                                        onChange={evt => this.handleSipaApaInputChange(evt)}
                                        value={this.state.apoout_sipaapa}
                                        name='apoout_sipaapa'
                                        disabled={this.state.buttonAddDisabled}
                                        valid={this.state.apoout_sipaapaValid} />
                                </Col>

                                <Col xs={10} md={3}>
                                    <Label>
                                        Periode Awal
                                    <MdWarning color='#fee12b' className={this.state.sipaApaDisabled ? 'd-none' : ''} />
                                    </Label>
                                    <Input
                                        type = "date"
                                        onChange={evt => this.handleSipaApaStartDateInputChange(evt)}
                                        value={this.state.apoout_tglawalsipaapa}
                                        name='apoout_tglawalsipaapa'
                                        disabled={this.state.buttonAddDisabled || this.state.sipaApaDisabled}
                                        invalid={this.state.apoout_tglawalsipaapaInvalid}
                                        valid={this.state.apoout_tglawalsipaapaValid} />
                                </Col>

                                <Col xs={10} md={3}>
                                    <Label>
                                        Periode Akhir
                                        <MdWarning color='#fee12b' className={this.state.sipaApaDisabled ? 'd-none' : ''} />
                                    </Label>
                                    <Input
                                        type = "date"
                                        onChange={evt => this.handleSipaApaEndDateInputChange(evt)}
                                        value={this.state.apoout_tglakhirsipaapa}
                                        name='apoout_tglakhirsipaapa'
                                        disabled={this.state.buttonAddDisabled || this.state.sipaApaDisabled}
                                        invalid={this.state.apoout_tglakhirsipaapaInvalid}
                                        valid={this.state.apoout_tglakhirsipaapaValid} />
                                </Col>
                            </Row>

                            <Row form className='d-flex justify-content-between mt-3'>

                                <Col xs={10} md={4}>
                                    <Label>
                                        Surat Izin Praktek Apoteker (SIPA APING)
                                    </Label>
                                    <Input
                                        placeholder="No SIPA APING"
                                        onChange={evt => this.handleSipaApingInputChange(evt)}
                                        value={this.state.apoout_sipaaping}
                                        invalid={this.state.apoout_sipaapingInvalid}
                                        valid={this.state.apoout_sipaapingValid}
                                        name='apoout_sipaaping'
                                        disabled={this.state.buttonAddDisabled}/>
                                </Col>

                                <Col xs={10} md={3}>
                                    <Label>
                                        Periode Awal
                                        <MdWarning color='#fee12b' className={this.state.sipaApingDisabled ? 'd-none' : ''} />
                                    </Label>
                                    <Input
                                        type = "date"
                                        onChange={evt => this.handleSipaApingStartDateInputChange(evt)}
                                        value={this.state.apoout_tglawalsipaaping}
                                        name='apoout_tglawalsipaaping'
                                        disabled={this.state.buttonAddDisabled || this.state.sipaApingDisabled}
                                        invalid={this.state.apoout_tglawalsipaapingInvalid}
                                        valid={this.state.apoout_tglawalsipaapingValid} />
                                </Col>

                                <Col xs={10} md={3}>
                                    <Label>
                                        Periode Akhir
                                        <MdWarning color='#fee12b' className={this.state.sipaApingDisabled ? 'd-none' : ''} />
                                    </Label>
                                    <Input
                                        type = "date"
                                        onChange={evt => this.handleSipaApingEndDateInputChange(evt)}
                                        value={this.state.apoout_tglakhirsipaaping}
                                        name='apoout_tglakhirsipaaping'
                                        disabled={this.state.buttonAddDisabled || this.state.sipaApingDisabled}
                                        invalid={this.state.apoout_tglakhirsipaapingInvalid}
                                        valid={this.state.apoout_tglakhirsipaapingValid} />
                                </Col>
                            </Row>

                            <Row form className="mt-3">
                                <Label sm={3}>
                                    Surat Ijin Tenaga Kerja Teknik Kefarmasian (SIKTTK)
                                </Label>
                            </Row>

                            <Row form className='mt-3'>
                                <Col>
                                    <Card>
                                        <CardHeader>Asisten Apoteker 1</CardHeader>
                                        <CardBody>
                                            <Row form>
                                                <Col md={7}>
                                                    <Label>Identitas</Label>
                                                    <InputGroup className='d-flex'>
                                                        <Input
                                                            placeholder="NIP"
                                                            onChange={evt => this.handleInputChange(evt)}
                                                            value={this.state.apoout_nipasistenapoteker1}
                                                            name='apoout_nipasistenapoteker1'
                                                            disabled />
                                                        <Input
                                                            className='flex-grow-1 w-50'
                                                            placeholder="Nama Apoteker"
                                                            onChange={evt => this.handleInputChange(evt)}
                                                            value={this.state.apoout_asistenapoteker1}
                                                            name='apoout_asistenapoteker1'
                                                            disabled />
                                                        <InputGroupAddon addonType='append'>
                                                            <Button disabled={this.state.buttonAddDisabled || this.state.isLoading} onClick={this.toggle('aa1KaryawanSearch')} >
                                                                <MdSearch />
                                                            </Button>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                                <Col md={4} className='ml-auto'>
                                                    <Label>No Telephone</Label>
                                                    <Input
                                                        type='number'
                                                        placeholder="No Telephone"
                                                        onChange={evt => this.handleInputChange(evt)}
                                                        value={this.state.apoout_nohpasistenapoteker1}
                                                        name='apoout_nohpasistenapoteker1'
                                                        disabled={this.state.buttonAddDisabled} />
                                                </Col>
                                            </Row>

                                            <Row form className='d-flex mt-3 justify-content-between'>
                                                <Col md={4}>
                                                    <Label>SIKTTK</Label>
                                                    <Input
                                                        placeholder="No SIKTTK"
                                                        onChange={evt => this.handleSik1InputChange(evt)}
                                                        value={this.state.apoout_sik}
                                                        invalid={this.state.apoout_sikInvalid}
                                                        valid={this.state.apoout_sikValid}
                                                        name='apoout_sik'
                                                        disabled={this.state.buttonAddDisabled} />
                                                </Col>

                                                <Col md={3}>
                                                    <Label>
                                                        Periode Awal
                                                        <MdWarning color='#fee12b' className={this.state.sik1Disabled ? 'd-none' : ''} />
                                                    </Label>
                                                    <Input
                                                        type="date"
                                                        onChange={evt => this.handleSik1StartDateInputChange(evt)}
                                                        value={this.state.apoout_tglawalsikaa1}
                                                        name='apoout_tglawalsikaa1'
                                                        disabled={this.state.buttonAddDisabled || this.state.sik1Disabled}
                                                        invalid={this.state.apoout_tglawalsikaa1Invalid}
                                                        valid={this.state.apoout_tglawalsikaa1Valid} />
                                                </Col>

                                                <Col md={3}>
                                                    <Label>
                                                        Periode Akhir
                                                        <MdWarning color='#fee12b' className={this.state.sik1Disabled ? 'd-none' : ''} />
                                                    </Label>
                                                    <Input
                                                        type="date"
                                                        onChange={evt => this.handleSik1EndDateInputChange(evt)}
                                                        value={this.state.apoout_tglakhirsikaa1}
                                                        name='apoout_tglakhirsikaa1'
                                                        disabled={this.state.buttonAddDisabled || this.state.sik1Disabled}
                                                        invalid={this.state.apoout_tglakhirsikaa1Invalid}
                                                        valid={this.state.apoout_tglakhirsikaa1Valid} />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row form className='mt-4'>
                                <Col>
                                    <Card>
                                        <CardHeader>Asisten Apoteker 2</CardHeader>
                                        <CardBody>
                                            <Row form>
                                                <Col md={7}>
                                                    <Label>Identitas</Label>
                                                    <InputGroup className='d-flex'>
                                                        <Input
                                                            placeholder="NIP"
                                                            onChange={evt => this.handleSik2InputChange(evt)}
                                                            value={this.state.apoout_nipasistenapoteker2}
                                                            name='apoout_nipasistenapoteker2'
                                                            disabled />
                                                        <Input
                                                            placeholder="Nama Apoteker"
                                                            onChange={evt => this.handleInputChange(evt)}
                                                            value={this.state.apoout_asistenapoteker2}
                                                            name='apoout_asistenapoteker2'
                                                            disabled />
                                                        <InputGroupAddon addonType='append'>
                                                            <Button disabled={this.state.buttonAddDisabled || this.state.isLoading} onClick={this.toggle('aa2KaryawanSearch')} >
                                                                <MdSearch />
                                                            </Button>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                                <Col md={4} className='ml-auto'>
                                                    <Label>No Telephone</Label>
                                                    <Input
                                                        type='number'
                                                        placeholder="No Telephone"
                                                        onChange={evt => this.handleInputChange(evt)}
                                                        value={this.state.apoout_nohpasistenapoteker2}
                                                        name='apoout_nohpasistenapoteker2'
                                                        disabled={this.state.buttonAddDisabled} />
                                                </Col>
                                            </Row>

                                            <Row form className='d-flex mt-3 justify-content-between'>
                                                <Col md={4}>
                                                    <Label>SIKTTK</Label>
                                                    <Input
                                                        placeholder="No SIKTTK"
                                                        onChange={evt => this.handleSik2InputChange(evt)}
                                                        value={this.state.apoout_sikttk2}
                                                        invalid={this.state.apoout_sikttk2Invalid}
                                                        valid={this.state.apoout_sikttk2Valid}
                                                        name='apoout_sikttk2'
                                                        disabled={this.state.buttonAddDisabled} />
                                                </Col>

                                                <Col md={3}>
                                                    <Label>
                                                        Periode Awal
                                                        <MdWarning color='#fee12b' className={this.state.sik2Disabled ? 'd-none' : ''} />
                                                    </Label>
                                                    <Input
                                                        type="date"
                                                        onChange={evt => this.handleSik2StartDateInputChange(evt)}
                                                        value={this.state.apoout_tglawalsikaa2}
                                                        name='apoout_tglawalsikaa2'
                                                        disabled={this.state.buttonAddDisabled || this.state.sik2Disabled}
                                                        invalid={this.state.apoout_tglawalsikaa2Invalid}
                                                        valid={this.state.apoout_tglawalsikaa2Valid} />
                                                </Col>

                                                <Col md={3}>
                                                    <Label>
                                                        Periode Akhir
                                                        <MdWarning color='#fee12b' className={this.state.sik2Disabled ? 'd-none' : ''} />
                                                    </Label>
                                                    <Input
                                                        type="date"
                                                        onChange={evt => this.handleSik2EndDateInputChange(evt)}
                                                        value={this.state.apoout_tglakhirsikaa2}
                                                        name='apoout_tglakhirsikaa2'
                                                        disabled={this.state.buttonAddDisabled || this.state.sik2Disabled}
                                                        invalid={this.state.apoout_tglakhirsikaa2Invalid}
                                                        valid={this.state.apoout_tglakhirsikaa2Valid} />
                                                </Col>
                                            </Row>

                                            
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row form className='d-none mt-3'>
                                <Col xs={4} md={2}>
                                    <Label>
                                        Buka
                                    </Label>
                                </Col>

                                <Col xs={10} md={1}>
                                    <Input
                                        type="select"
                                        onChange={evt => this.handleInputDropdownChange(evt)}
                                        value={this.state.bukaValue}
                                        name='bukaValue'
                                        disabled={this.state.buttonAddDisabled}>
                                        {this.state.bukaList.map((buka) =>
                                            <option name={buka} value={buka}>
                                                {buka}
                                            </option>
                                        )}
                                    </Input>
                                </Col>

                                <Col xs={4} md={3}>
                                    <Label>
                                        Hari Kerja per Bulan
                                    </Label>
                                </Col>
                            </Row>

                            <Row form className='d-flex justify-content-end mt-5'>
                                <Button disabled={this.state.isLoading} onClick={this.toggle('taraTimbangan')}>Tara Timbangan</Button>
                            </Row>

                            <Modal
                                // Modal untuk search Outlet
                                isOpen={this.state.modal_outletSearch}
                                toggle={this.toggle('outletSearch')}
                                className='modal-dialog-scrollable modal-dialog-centered'
                                size='lg'
                                backdrop='static'>
                                <ModalHeader>Search Outlet</ModalHeader>
                                <ModalBody>
                                    <InputGroup>
                                        <Input
                                            name='outletSearchInput'
                                            placeholder='Ketik kode atau nama outlet'
                                            value={this.state.outletSearchInput}
                                            disabled={this.state.isLoading}
                                            onKeyPress={event => this.handleOutletSearchOnEnterPressed(event, true)}
                                            onChange={event => this.handleInputChange(event)} />
                                        <InputGroupAddon addonType='append'>
                                            <Button disabled={this.state.isLoading} onClick={() => this.getOutletList(this.state.outletSearchInput)}>
                                                <MdSearch />
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <ListGroup className='mt-3'>
                                        <ListGroupItem className={(this.state.outletList.length > 0 ? '' : 'd-none')}>
                                            <p class='text-center font-weight-bold'>Pilih salah satu</p>
                                        </ListGroupItem>
                                        {this.state.outletList.map((outlet) =>
                                            <ListGroupItem
                                                tag='button'
                                                action
                                                disabled={this.state.isLoading}
                                                name={outlet.out_code}
                                                onClick={event => this.cariOutlet(event.target.name)}>
                                                {outlet.out_code + ' - ' + outlet.out_name}
                                            </ListGroupItem>
                                        )}
                                    </ListGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='danger' disabled={this.state.isLoading} onClick={this.toggle('outletSearch')}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal
                                // Modal untuk search Apoteker Penanggung Jawab (APA)
                                isOpen={this.state.modal_apaKaryawanSearch}
                                toggle={this.toggle('apaKaryawanSearch')}
                                className='modal-dialog-scrollable modal-dialog-centered'
                                size='lg'
                                backdrop='static'>
                                <ModalHeader>Search Apoteker Penanggung Jawab (APA)</ModalHeader>
                                <ModalBody>
                                    <InputGroup>
                                        <Input 
                                            name='apaKaryawanSearchInput'
                                            placeholder='Ketik nama atau NIP karyawan'
                                            value={this.state.apaKaryawanSearchInput}
                                            disabled={this.state.isLoading}
                                            onKeyPress={event => this.handleApaKaryawanOnEnterPressed(event)}
                                            onChange={event => this.handleInputChange(event)} />
                                        <InputGroupAddon addonType='append'>
                                            <Button disabled={this.state.buttonAddDisabled || this.state.isLoading} onClick={() => this.getApaKaryawanList()}>
                                                <MdSearch />
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <ListGroup className='mt-3'>
                                        <ListGroupItem className={(this.state.apaKaryawanList.length > 0 ? '' : 'd-none')}>
                                            <p class='text-center font-weight-bold'>Pilih salah satu</p>
                                        </ListGroupItem>
                                        {this.state.apaKaryawanList.map((karyawan) =>
                                            <ListGroupItem
                                                tag='button'
                                                action
                                                disabled={this.state.isLoading}
                                                name={karyawan.kry_NIP}
                                                value={karyawan.kry_Nama}
                                                onClick={event => this.handleApaKaryawanClick(event)}>
                                                {karyawan.kry_NIP + ' - ' + karyawan.kry_Nama}
                                            </ListGroupItem>
                                        )}
                                    </ListGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='danger' disabled={this.state.isLoading} onClick={this.toggle('apaKaryawanSearch')}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal
                                // Modal untuk search Apoteker Pendamping (APING)
                                isOpen={this.state.modal_apingKaryawanSearch}
                                toggle={this.toggle('apingKaryawanSearch')}
                                className='modal-dialog-scrollable modal-dialog-centered'
                                size='lg'
                                backdrop='static'>
                                <ModalHeader>Search Apoteker Pendamping (APING)</ModalHeader>
                                <ModalBody>
                                    <InputGroup>
                                        <Input
                                            name='apingKaryawanSearchInput'
                                            placeholder='Ketik nama atau NIP karyawan'
                                            value={this.state.apingKaryawanSearchInput}
                                            disabled={this.state.isLoading}
                                            onKeyPress={event => this.handleApingKaryawanOnEnterPressed(event)}
                                            onChange={event => this.handleInputChange(event)} />
                                        <InputGroupAddon addonType='append'>
                                            <Button disabled={this.state.buttonAddDisabled || this.state.isLoading} onClick={() => this.getApingKaryawanList()}>
                                                <MdSearch />
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <ListGroup className='mt-3'>
                                        <ListGroupItem className={(this.state.apingKaryawanList.length > 0 ? '' : 'd-none')}>
                                            <p class='text-center font-weight-bold'>Pilih salah satu</p>
                                        </ListGroupItem>
                                        {this.state.apingKaryawanList.map((karyawan) =>
                                            <ListGroupItem
                                                tag='button'
                                                action
                                                disabled={this.state.isLoading}
                                                name={karyawan.kry_NIP}
                                                value={karyawan.kry_Nama}
                                                onClick={event => this.handleApingKaryawanClick(event)}>
                                                {karyawan.kry_NIP + ' - ' + karyawan.kry_Nama}
                                            </ListGroupItem>
                                        )}
                                    </ListGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='danger' disabled={this.state.isLoading} onClick={this.toggle('apingKaryawanSearch')}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal
                                // Modal untuk search Asisten Apoteker 1
                                isOpen={this.state.modal_aa1KaryawanSearch}
                                toggle={this.toggle('aa1KaryawanSearch')}
                                className='modal-dialog-scrollable modal-dialog-centered'
                                size='lg'
                                backdrop='static'>
                                <ModalHeader>Search Asisten Apoteker 1</ModalHeader>
                                <ModalBody>
                                    <InputGroup>
                                        <Input
                                            name='aa1KaryawanSearchInput'
                                            placeholder='Ketik nama atau NIP karyawan'
                                            value={this.state.aa1KaryawanSearchInput}
                                            disabled={this.state.isLoading}
                                            onKeyPress={event => this.handleAa1KaryawanOnEnterPressed(event)}
                                            onChange={event => this.handleInputChange(event)} />
                                        <InputGroupAddon addonType='append'>
                                            <Button disabled={this.state.buttonAddDisabled || this.state.isLoading} onClick={() => this.getAa1KaryawanList()}>
                                                <MdSearch />
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <ListGroup className='mt-3'>
                                        <ListGroupItem className={(this.state.aa1KaryawanList.length > 0 ? '' : 'd-none')}>
                                            <p class='text-center font-weight-bold'>Pilih salah satu</p>
                                        </ListGroupItem>
                                        {this.state.aa1KaryawanList.map((karyawan) =>
                                            <ListGroupItem
                                                tag='button'
                                                action
                                                disabled={this.state.isLoading}
                                                name={karyawan.kry_NIP}
                                                value={karyawan.kry_Nama}
                                                onClick={event => this.handleAa1KaryawanClick(event)}>
                                                {karyawan.kry_NIP + ' - ' + karyawan.kry_Nama}
                                            </ListGroupItem>
                                        )}
                                    </ListGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='danger' disabled={this.state.isLoading} onClick={this.toggle('aa1KaryawanSearch')}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal
                                // Modal untuk search Asisten Apoteker 2
                                isOpen={this.state.modal_aa2KaryawanSearch}
                                toggle={this.toggle('aa2KaryawanSearch')}
                                className='modal-dialog-scrollable modal-dialog-centered'
                                size='lg'
                                backdrop='static'>
                                <ModalHeader>Search Asisten Apoteker 2</ModalHeader>
                                <ModalBody>
                                    <InputGroup>
                                        <Input
                                            name='aa2KaryawanSearchInput'
                                            placeholder='Ketik nama atau NIP karyawan'
                                            value={this.state.aa2KaryawanSearchInput}
                                            disabled={this.state.isLoading}
                                            onKeyPress={event => this.handleAa2KaryawanOnEnterPressed(event)}
                                            onChange={event => this.handleInputChange(event)} />
                                        <InputGroupAddon addonType='append'>
                                            <Button disabled={this.state.buttonAddDisabled || this.state.isLoading} onClick={() => this.getAa2KaryawanList()}>
                                                <MdSearch />
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <ListGroup className='mt-3'>
                                        <ListGroupItem className={(this.state.aa2KaryawanList.length > 0 ? '' : 'd-none')}>
                                            <p class='text-center font-weight-bold'>Pilih salah satu</p>
                                        </ListGroupItem>
                                        {this.state.aa2KaryawanList.map((karyawan) =>
                                            <ListGroupItem
                                                tag='button'
                                                action
                                                disabled={this.state.isLoading}
                                                name={karyawan.kry_NIP}
                                                value={karyawan.kry_Nama}
                                                onClick={event => this.handleAa2KaryawanClick(event)}>
                                                {karyawan.kry_NIP + ' - ' + karyawan.kry_Nama}
                                            </ListGroupItem>
                                        )}
                                    </ListGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='danger' disabled={this.state.isLoading} onClick={this.toggle('aa2KaryawanSearch')}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal
                                // Modal untuk konfirmasi Insert
                                isOpen={this.state.modal_konfirmasiSimpan}
                                toggle={this.toggle('konfirmasiSimpan')}
                                className='modal-dialog-centered'
                                backdrop='static'>
                                <ModalHeader>Konfirmasi Tambah Data Apotik</ModalHeader>
                                <ModalBody>
                                    Apakah yakin ingin simpan data baru?
                                </ModalBody>
                                <ModalFooter className='d-flex justify-content-end'>
                                    <Button color='success' disabled={this.state.isLoading} onClick={() => this.handleSimpanButtonClick()}>Ya</Button>
                                    <Button color='danger' disabled={this.state.isLoading} onClick={this.toggle('konfirmasiSimpan')}>Batal</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal
                                // Modal untuk konfirmasi Edit
                                isOpen={this.state.modal_konfirmasiOk}
                                toggle={this.toggle('konfirmasiOk')}
                                className='modal-dialog-centered'
                                backdrop='static'>
                                <ModalHeader>Konfirmasi Edit Data Apotik</ModalHeader>
                                <ModalBody>
                                    Apakah yakin ingin edit data ini?
                                </ModalBody>
                                <ModalFooter className='d-flex justify-content-end'>
                                    <Button color='success' disabled={this.state.isLoading} onClick={() => this.handleOkButtonClick()}>Ya</Button>
                                    <Button color='danger' disabled={this.state.isLoading} onClick={this.toggle('konfirmasiOk')}>Batal</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal
                                // Modal untuk Tara Timbangan
                                isOpen={this.state.modal_taraTimbangan}
                                toggle={this.toggle('taraTimbangan')}
                                className='modal-dialog-centered modal-dialog-scrollable'
                                size='xl'
                                backdrop='static'>
                                <ModalHeader>Tara Timbangan</ModalHeader>
                                <ModalBody>
                                    <Table striped>
                                        <thead>
                                            <tr align="center">
                                                <th>Nama Timbangan</th>
                                                <th>Tanggal Tara</th>
                                                <th>Masa Berlaku</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.timbanganList.map((timbangan) =>
                                                <tr>
                                                    <td>
                                                        {timbangan.timout_namatimbangan}
                                                    </td>

                                                    <td align='center'>
                                                        <Input
                                                            // Tanggal Tara
                                                            className='w-75'
                                                            type="date"
                                                            disabled
                                                            value={new Date(timbangan.timout_tanggaltara).toISOString().substr(0, 10)} />
                                                    </td>

                                                    <td align='center'>
                                                        <Input
                                                            // Masa Berlaku
                                                            className='w-75'
                                                            type="date"
                                                            disabled
                                                            value={new Date(timbangan.timout_masaberlaku).toISOString().substr(0, 10)} />
                                                    </td>
                                                    <td align='center'>
                                                        <Button
                                                            name={timbangan.timout_namatimbangan + '@' + timbangan.timout_tanggaltara}
                                                            value={timbangan.timout_runningid}
                                                            className='mr-1'
                                                            color='warning'
                                                            size="sm"
                                                            disabled={this.state.isLoading}
                                                            onClick={event => this.handleUbahTimbanganButtonOnClick(event)}>
                                                            <MdEdit />
                                                        </Button>
                                                        <Button
                                                            name={timbangan.timout_namatimbangan}
                                                            value={timbangan.timout_runningid}
                                                            className='ml-1'
                                                            color='danger'
                                                            size="sm"
                                                            disabled={this.state.isLoading}
                                                            onClick={event => this.hapusTimbangan(event)}>
                                                            <MdDelete />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>

                                    </Table>

                                </ModalBody>
                                <ModalFooter className='d-flex justify-content-end'>
                                    <Button
                                        className='mr-2'
                                        disabled={this.state.out_code.length === 0}
                                        onClick={() => this.handleTambahTimbanganButtonOnClick()}>
                                        <MdAdd />
                                    </Button>
                                    <Button
                                        color='danger'
                                        onClick={this.toggle('taraTimbangan')}>
                                        <MdClose />
                                    </Button>
                                </ModalFooter>
                            </Modal>

                            <Modal
                                // Modal untuk Insert Timbangan
                                isOpen={this.state.modal_tambahTimbangan}
                                toggle={this.toggle('tambahTimbangan')}
                                className='modal-dialog-centered'
                                backdrop='static'>
                                <ModalHeader>Tambah Timbangan</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label>Nama Timbangan</Label>
                                        <Input
                                            name='timout_namatimbangan'
                                            type='select'
                                            value={this.state.timout_namatimbangan}
                                            disabled={this.state.isLoading}
                                            onChange={event => this.handleInputDropdownChange(event)}>
                                            {this.state.itemList.map((item) =>
                                                <option
                                                    value={item.itm_nama}>
                                                    {item.itm_nama}
                                                </option>
                                            )}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Tanggal Tara</Label>
                                        <Input
                                            name='timout_tanggaltara'
                                            type='date'
                                            value={this.state.timout_tanggaltara}
                                            disabled={this.state.isLoading}
                                            onChange={event => this.handleInputDateChange(event)} />
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        disabled={this.state.isLoading}
                                        onClick={() => this.tambahTimbangan()}>
                                        Save
                                    </Button>
                                    <Button
                                        disabled={this.state.isLoading}
                                        color='danger'
                                        onClick={this.toggle('tambahTimbangan')}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>

                            <Modal
                                // Modal untuk Edit Timbangan
                                isOpen={this.state.modal_ubahTimbangan}
                                toggle={this.toggle('ubahTimbangan')}
                                className='modal-dialog-centered'
                                backdrop='static'>
                                <ModalHeader>Ubah Timbangan</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label>Nama Timbangan</Label>
                                        <Input
                                            name='timout_namatimbangan'
                                            type='select'
                                            value={this.state.timout_namatimbangan}
                                            disabled={this.state.isLoading}
                                            onChange={event => this.handleInputDropdownChange(event)}>
                                            {this.state.itemList.map((item) =>
                                                <option
                                                    value={item.itm_nama}>
                                                    {item.itm_nama}
                                                </option>
                                            )}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Tanggal Tara</Label>
                                        <Input
                                            name='timout_tanggaltara'
                                            type='date'
                                            value={this.state.timout_tanggaltara}
                                            disabled={this.state.isLoading}
                                            onChange={event => this.handleInputDateChange(event)} />
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        disabled={this.state.isLoading}
                                        onClick={() => this.ubahTimbangan()}>
                                        Save
                                    </Button>
                                    <Button
                                        disabled={this.state.isLoading}
                                        color='danger'
                                        onClick={this.toggle('ubahTimbangan')}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>

                        </Form>
                    </CardBody>
                </Card>
            </Page>
        );
    }
}
export default OutletDataApotikPage; 