import React from 'react';
import Barcode from 'react-barcode';
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Form,
	Input,
	Label,
	Row,
	Table,
	FormGroup,
} from 'reactstrap';

const fontStyle = { 'font-family': 'Courier New' }

class PrintRegular extends React.Component {

	render() {
		return (
			<Card className="m-1 p-4">
				<CardBody>
					<Row>
						<Col>
							<Label className='w-25 font-weight-bold'><span style={fontStyle}>CABANG</span></Label>
							<Label><span style={fontStyle}><span className= 'mr-3 font-weight-bold'>:</span>{this.props.dir_kode}</span></Label>
						</Col>
					</Row>
				</CardBody>
				<CardBody>
                    <Row>
                        <Col>
                            <Label className='w-25 font-weight-bold'><span style={fontStyle}>ALAMAT</span> </Label>
                            {/*Alamat dari Master Outlet*/
                             <Label><span style={fontStyle}><span className= 'mr-3 font-weight-bold'>:</span>{this.props.dir_kode}</span></Label> }
                        </Col>
                    </Row>
                </CardBody>
                <CardBody>
					<Row>
						<Col>
							<Label className="w-25 font-weight-bold"><span style={fontStyle}>NO. PL</span></Label>
							<Label><span style={fontStyle}><span className='mr-3 font-weight-bold'>:</span>{this.props.thp_nopl}</span></Label>
						</Col>
					</Row>
				</CardBody>

				<CardBody>
					<Row>
                        <Col>
                            <Label className="w-25 font-weight-bold"><span style={fontStyle}>Total Berat</span></Label>
                            <Label><span style={fontStyle}><span className='mr-3 font-weight-bold'>: </span>{}</span></Label>
                            <Label className= 'mb-4 d-flex justify-content-end'>
                                <Barcode format='CODE39' height={50} displayValue={false} value={this.props.dir_kode} /></Label>
                            <Label className='d-flex justify-content-end'>NO. BOX / COLI:</Label>
                            <Label className='d-flex justify-content-end'><span style={fontStyle}>{}</span></Label>
                        </Col>
                    </Row>
				</CardBody>
			</Card>
		);
	}
}

export default PrintRegular;
