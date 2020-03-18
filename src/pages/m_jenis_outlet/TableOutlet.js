import React from 'react';
import { Input, Col,InputGroup,InputGroupAddon,Row,
    Table, Pagination, PaginationItem, PaginationLink, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import style from './mystyle.css'


class TableOutlet extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            page: -1,
            totalShown:5,
            totalPages: -1,
            modal: false
            
        };
    }

    handleSelect(event) {
      
        if(event.target.value === '5'){
           
            this.showFive()
        }
       if(event.target.value === "10"){
        this.show10()
        }
         if(event.target.value === "20"){
            this.show20()
        }
      }
      handleFirst(event) {
        this.setState({
            page: 1,
        });
      }

      handleLast(event) {
    
console.log(this.state.totalPages)
let nowPage = this.state.page + 1 > this.state.totalPages ? this.state.totalPages : this.state.page + 1;
        this.setState({
            page: nowPage,
            totalShown : this.state.totalShown,
            totalPages : Math.ceil(this.props.data.length / this.state.totalShown),
          currentPage: this.state.totalPages,
        });
       
      }
    changeBackdrop(e) {
        let value = e.target.value;
        if (value !== 'static') {
        value = JSON.parse(value);
        }
        this.setState({ backdrop: value });
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.data != prevProps.data){
            this.setState({
                data: this.props.data,
                page: 1,
                totalPages: Math.ceil(this.props.data.length / this.state.totalShown)
            });
        }
    }

    prevPage = () => {
        let nowPage = this.state.page - 1 < 1 ? 1 : this.state.page - 1;
        this.setState({
            page: nowPage
        });
    }

    nextPage = () => {
        let nowPage = this.state.page + 1 > this.state.totalPages ? this.state.totalPages : this.state.page + 1;
        this.setState({
            page: nowPage,
            totalShown : 5,
            totalPages : Math.ceil(this.props.data.length / this.state.totalShown)
        });

        console.log('Page : ' +this.state.page)
        console.log('total show : ' + this.state.totalShown)
        console.log('total pages : ' + this.state.totalPages)
    }
    showAll()
    {
        this.setState(
            {
                totalShown :Math.ceil(this.props.data.length),
                page : 1
               
            })

            console.log('Page : ' +this.state.page)
            console.log('total show : ' + this.state.totalShown)
            console.log('total pages : ' + this.state.totalPages)
            console.log('panjang data : ' + this.props.data.length)
    }
    showFive()
   
    {

        this.setState({
            totalShown : 5,
            page : 1
        });
        console.log('Page : ' +this.state.page)
        console.log('total show : ' + this.state.totalShown)
        console.log('total pages : ' + this.state.totalPages)
        console.log('panjang data : ' + this.props.data.length)
        
       
        
    }
    show10()
   
    {

        this.setState({
            totalShown : 10,
            page : 1
        });
        console.log('Page : ' +this.state.page)
        console.log('total show : ' + this.state.totalShown)
        console.log('total pages : ' + this.state.totalPages)
        console.log('panjang data : ' + this.props.data.length)
        
       
        
    }
    show20()
   
    {

        this.setState({
            totalShown : 20,
            page : 1
        });
        console.log('Page : ' +this.state.page)
        console.log('total show : ' + this.state.totalShown)
        console.log('total pages : ' + this.state.totalPages)
        console.log('panjang data : ' + this.props.data.length)
        
       
        
    }


//ini tombol delete yang benar
// <td><Button color="danger" size = "sm"onClick={() => this.props.onItemClick(v.jnsout_Name)}>Delete</Button></td>   




    render()
    {
        let startData = (this.state.page - 1) * this.state.totalShown;
        let endData = this.state.page * this.state.totalShown;
        return(
            <>
                {
                    this.state.data && this.state.data.length > 0 && 
                    <div>
                        <Table hover>
                            <thead >
                                <tr>
                                    <th>NO</th>
                                    <th>Kode Outlet</th>
                                    <th>Nama Jenis Outlet</th>
                                    {!this.props.showAll && <th>Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                             {!this.props.showAll && this.state.data.map((v, i) => 
                                    startData <= i && i < endData &&
                                    <tr key={i}>
                                        <td scope="row" >{i+1}</td>
                                        <td>{v.jnsout_Code}</td>
                                        <td>{v.jnsout_Name}</td>
                                        <td><Button color="danger" size = "sm"onClick={() => this.props.onItemClick(v.jnsout_Name)}>Delete</Button></td>     
                                        
                                    </tr>
                                )}
                                {this.props.showAll && this.state.data.map((v,i) =>
                                    <tr key={i}>
                                    <td scope="row">{i+1}</td>
                                    <td>{v.jnsout_Code}</td>
                                    <td>{v.jnsout_Name}</td>    
                                </tr>
                                )}                           
                            </tbody>
                        </Table>
                       

                        <Row>
                        {/* ====================================== PEMBERIAN LIMIT DATA PER HALAMAN============================== */}
                        <Col md="6" sm="12" xs="12">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              Data per Halaman
                            </InputGroupAddon>
                            <select
                              name="todosPerPage"
                              style={{ height: '38px' }}
                              value={this.state.value}
                              onChange={e => this.handleSelect(e)}
                            >
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="20">20</option>
                            </select>
                          </InputGroup>
                        </Col>
          
                        <Col md="6" sm="12" xs="12" >
                        {!this.props.showAll &&  
                          <InputGroup style={{ width: '243px' }}>
                            <div className="input-group-prepend pagination-wrapper">
                           
                            {/* ====================================== FIRST PAGE ============================== */}
                              <Button
                                style={{
                                  background: '#2CB7A4',
                                  borderStyle: 'none',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                className="btn btn-info"
                                value={this.state.currentPage}
                                onClick={e => this.handleFirst(e, -1)}
                              >
                                &lt;&lt;
                              </Button>
                              {/* ====================================== BACK ============================== */}
                              <Button
                                style={{
                                  background: '#2CB7A4',
                                  borderStyle: 'none',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                className="btn btn-info"
                                value={this.state.currentPage}
                              
                                onClick={() => this.prevPage()}
                                
                              >
                                &lt;
                              </Button>
                            </div>
          
                            <span
                              className="text-muted p-2 "
                              style={{
                                height: '10px',
                                width: '100px',
                                textAlign: 'center',
                              }}
                            >
                              {this.state.page}
                            </span>
                            {/* ====================================== NEXT  ============================== */}
                            <div className="input-group-append">
                              <Button
                                style={{
                                  background: '#2CB7A4',
                                  borderStyle: 'none',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                className="btn btn-info"
                                value={this.state.currentPage}
                                    onClick={() => this.nextPage()}
                              >
                                &gt;
                              </Button>
                              {/* ====================================== LAST PAGE  ============================== */}
                              <Button
                                style={{
                                  background: '#2CB7A4',
                                  borderStyle: 'none',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                className="btn btn-info"
                                value={this.state.currentPage}
                                onClick={e => this.handleLast(e)}
                              >
                                &gt;&gt;
                              </Button>
                            
                            </div>
                          </InputGroup>
                            }
                        </Col>
                      </Row>


                            
                    </div>
                            
                }
                {
                    (!this.state.data || this.state.data.length < 1) &&
                    <h2 style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '10px'
                    }}>No Data</h2>
                }
            </>
        );
    }
}

export default TableOutlet;