import Page from 'components/Page';
import {
    Col, Row, Label, Input, Button, ButtonGroup, Card
} from 'reactstrap';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import dateFormat from 'dateformat';
import Purchase_Order_Agreement from './Purchase_Order_Agreement';
import Purchase_Order_Detail from './Purchase_Order_Detail';
import Purchase_Order_History from './Purchase_Order_History';
import { MdDateRange } from 'react-icons/md';

class Purchase_Order_Tab extends React.Component {

    constructor(props) {
        super(props);
        this.state  = {
            modal_response     : false,
            responseHeader     : "",
            responseMessage    : "",
            resultPODetail     : [],
            resultPOHeader     : [],
            
        };
    }

    componentDidMount(){
        this.getLastPO()
    }

    getLastPO()
    {   
        const option = {
            method  : "GET",
            json    : true,
            headers : {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Authorization" : window.localStorage.getItem('tokenLogin')
                    },
            }

            fetch("http://localhost:8888/po?type=lastinput",option)
            .then(response => response.json())
            .then(data =>{ 
                    if(data.data[0] === null)  {
                        console.log("Data PO Detail Kosong")             
                        this.setState({ resultPODetail: [], resultPOHeader : []})
                    }
                    else{
                        console.log("Data PO Detail Tidak Kosong") 
                        this.setState({ 
                            resultPOHeader  : data.data[0].T_PurchaseOrder.T_POHeader,
                            activeNomorPO   : data.data[0].T_PurchaseOrder.T_POHeader.POH_NoPO,
                            activeTop       : data.data[0].T_PurchaseOrder.T_POHeader.POH_TOP,
                            activeTglPo     : data.data[0].T_PurchaseOrder.T_POHeader.POH_TglPO,
                            activeTypePOCode: data.data[0].T_PurchaseOrder.T_POHeader.POH_TipePO,
                            activeSuplierCode : data.data[0].T_PurchaseOrder.T_POHeader.POH_Nosup,
                            activeJmlPrint : data.data[0].T_PurchaseOrder.T_POHeader.POH_JmlPrint,
                            activeTypePOName  : data.data[0].M_TipePO.TipePO_Nama,
                        
                            resultPODetail : data.data[0].T_PurchaseOrder.T_PODetail
                        })
                        if(this.state.resultPODetail === null){
                            console.log("resultpodetail kosong")
                            this.setState({
                                resultPOHeader  : data.data[0].T_PurchaseOrder.T_POHeader,
                                activeNomorPO   : data.data[0].T_PurchaseOrder.T_POHeader.POH_NoPO,
                                activeTop       : data.data[0].T_PurchaseOrder.T_POHeader.POH_TOP,
                                activeTglPo     : data.data[0].T_PurchaseOrder.T_POHeader.POH_TglPO,
                                activeTypePOCode: data.data[0].T_PurchaseOrder.T_POHeader.POH_TipePO,
                                activeSuplierCode : data.data[0].T_PurchaseOrder.T_POHeader.POH_Nosup,
                                activeJmlPrint : data.data[0].T_PurchaseOrder.T_POHeader.POH_JmlPrint,
                                activeTypePOName  : data.data[0].M_TipePO.TipePO_Nama,

                                resultPODetail : []
                            })
                        }
                        console.log(this.state.resultPODetail) 
                        this.getSupplierName()  
                        this.getSupplierMinValue()
                    }
                        
                });
            
    }

    getSupplierName(){
        var payload = {
            Sup_Code : this.state.activeSuplierCode
        }
        const option = {
            method  : "POST",
            json    : true,
            headers : 
                    {
                    "Content-Type": "application/json;charset=UTF-8"
                    },
            body: JSON.stringify(payload)
            }

            fetch("https://api.docnet.id/CHCMasterD/MasterSupplier/CariKodeSupplier",option)
            .then(response => response.json())
            .then(data =>{ 
                    if(data.Data === null)  {
                        console.log("Data Supplier Kosong")
                    }
                    else{
                        console.log("Data Supplier Tidak Kosong") 
                        this.setState({ 
                            activeSuplierName :  data.Data[0].Sup_Name,
                        })
                        console.log(this.state.activeSuplierName)   
                    }
                        
                });
    }

    getSupplierMinValue(){
        var payload = {
            PurSup_SupCode : this.state.activeSuplierCode,
            PurSup_GrpCode : 1
        }
        const option = {
            method  : "POST",
            json    : true,
            headers : {
                    "Content-Type": "application/json;charset=UTF-8"
                    },
            body: JSON.stringify(payload)
            }

            fetch("https://api.docnet.id/CHCMasterD/MasterSupplierPurchasing/TampilkanSupplierPurchasingbyCode",option)
            .then(response => response.json())
            .then(data =>{ 
                    if(data.Data === null)  {
                        console.log("Data Supplier Min Value Kosong")
                    }
                    else{
                        console.log("Data Supplier Min Value Tidak Kosong") 
                        this.setState({ 
                            activeSuplierMinValue :  data.Data[0].PurSup_MinPOVal,
                        })
                        console.log(this.state.activeSuplierMinValue)   
                    }
                        
                });
    }

    
    render(){
        return(
            <Page
            title       = "Purchase Order"
            className   = "Purchase Order">
                
                <Row className ={"ml-2"}>
                    <Col xs={1}>
                        <Label>NO PO</Label>
                    </Col>
                    <Col xs={2}>
                        <Input type="text" value = {this.state.activeNomorPO}></Input>
                    </Col>

                    <Col xs={0.1}>
                        <Label>TOP</Label>
                    </Col>
                    <Col xs={1}>
                        <Input type="text" value = {this.state.activeTop}></Input>
                    </Col>

                    <Col xs={0.1}>
                        <Label>TGL PO</Label>
                    </Col>
                    <Col xs={2}>
                        <Input type="date" value = {dateFormat(this.state.activeTglPo, "yyyy-mm-dd")}></Input>
                    </Col>

                    <Col xs={0.1}>
                        <Label>TYPE PO</Label>
                    </Col>
                    <Col xs={2} >
                        <Input type="text" value = {this.state.activeTypePOName}></Input>
                    </Col>
                </Row>

                <Row className ={"ml-2"}>
                    <Col xs={1}>
                        <Label>SUPLIER</Label>
                    </Col>
                    <Col xs={1}>
                        <Input type="text" value={this.state.activeSuplierCode}></Input>
                    </Col>
                    <Col xs={5}>
                        <Input type="text" value={this.state.activeSuplierName}></Input>
                    </Col>
                    <Col>
                    {
                        this.state.activeJmlPrint == 0
                        ?
                        <Label>NOT PRINT</Label>
                        :
                        <Label>PRINT</Label>
                    }
                    </Col>

                </Row>

                <Row className ={"ml-2"}>
                    <Col xs={1}>
                        <Label>MIN VALUE</Label>
                    </Col>
                    <Col xs={2}>
                        <Input value={this.state.activeSuplierMinValue} type="text"></Input>
                    </Col>
                    <Col xs={1}>
                        <Label>GD RECEIVE</Label>
                    </Col>
                    <Col xs={3}>
                        <Input type="text"></Input>
                    </Col>
                </Row>

                <Col className ={"mt-3"}>    
                    <Tabs
                        selectedIndex={this.state.selectedTabs}
                        style={{
                            display: this.state.displayTabs
                        }}>

                            <TabList tabIndex={0}>
                                <Tab style={{width:300}}>Detail</Tab>
                                <Tab style={{width:300}}>Agreement</Tab>
                                <Tab style={{width:300}}>History</Tab>
                              
                            </TabList>
                                
                            <TabPanel>
                                <Purchase_Order_Detail typePOCode={this.state.activeTypePOCode} />
                            </TabPanel>

                            <TabPanel>
                                <Purchase_Order_Agreement/>
                            </TabPanel>
                    
                            <TabPanel>
                                <Purchase_Order_History />
                            </TabPanel>
                    </Tabs>
                               
                </Col>
                
                <Row >
                    <Col className ={"mt-3"}>
                        <Row className ={"justify-content-center"}>
                            <ButtonGroup  size="sm">
                                <Button style={{width : "75px"}} variant="secondary">Find</Button>
                                <Button style={{width : "75px"}} variant="secondary">Add</Button>
                                <Button style={{width : "75px"}} variant="secondary">Edit</Button>
                                <Button style={{width : "75px"}} variant="secondary">Save</Button>
                                <Button style={{width : "75px"}} variant="secondary">Cancel</Button>
                            </ButtonGroup>
                        </Row>
                        <Row className ={"justify-content-center"}>
                            <ButtonGroup size="sm">
                                <Button style={{width : "75px"}} variant="secondary">Print</Button>
                                <Button style={{width : "75px"}} disabled variant="secondary">AutoFax</Button>
                                <Button style={{width : "75px"}} variant="secondary">Delete</Button>
                                <Button style={{width : "75px"}} disabled variant="secondary">Tarik OR</Button>
                                <Button style={{width : "75px"}} variant="secondary">Exit</Button>
                            </ButtonGroup>
                        </Row>
                    </Col>


                    <Col> 
                        <Row>
                            <Col xs={2}>
                                <Label>Sub Total :</Label>
                            </Col>
                            <Col xs={4}>
                                <Input type="text"></Input>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={2}>
                                <Label>PPN :</Label>
                            </Col>
                            <Col xs={4}>
                                <Input type="text"></Input>
                            </Col>
                        </Row>
                        <Card></Card>
                        <Row className = {"mt-3"}>
                            <Col xs={2}>
                                <Label>Total : </Label>
                            </Col>
                            <Col xs={4}>
                                <Input type="text"></Input>
                            </Col>
                        </Row>     
                    </Col>

                </Row>
            
            </Page>
        )
    }
}
export default Purchase_Order_Tab;