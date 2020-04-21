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
const textStyle = {margin: '30px' }
const widthStyle = {margin: "10px"}

class PrintLabel extends React.Component {

	render() {
		return (
			<Card className="m-1 p-4">
				<CardHeader>
					<Row className='mb-2 d-flex justify-content-center'>
							<Label className='mr-3 font-weight-bold'><span style={fontStyle}>Log Book</span></Label>
							<Label><span style={fontStyle}>{this.props.dir_kode}</span></Label>
					</Row>
				</CardHeader>
				<CardBody>
					<Row>
						<Col>
							<Label className='font-weight-bold'><span style={fontStyle}>LogID</span></Label>
							<Label><span style={fontStyle}><span className='font-weight-bold'>:</span>{this.props.thp_logID}</span></Label>
							<Label className='d-flex justify-content-end'><span style={fontStyle}>Date</span></Label>
						</Col>
					</Row>

					<Table className='mr-3 font-weight-bold' style={fontStyle}>
						<thead>
							<tr>
								<th>No.</th>
								<th>Nomor DO</th>
								<th>Nomor PL</th>
								<th>Penerima</th>
								<th>No Koli</th>
									
										<th>Tujuan</th>
										<th>Berat</th>
								
						
								<th>Jenis Koli</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>{this.props.thp_nodo}</td>
								<td>{this.props.thp_nopl}</td>
								<td>{this.props.thp_distname}</td>
								<td>No Koli</td>
								<td>Pekanbaru (AMS)</td>
								<td>1230</td>
								<td>Jenis Koli</td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td>Total Berat</td>
								<td>1230</td>
								<td></td>
							</tr>	
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td>Total Procod</td>
								<td>1</td>
								<td></td>
							</tr>	
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td>Total PL</td>
								<td>1</td>
								<td></td>
							</tr>	
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td>Total Koli</td>
								<td>1</td>
								<td></td>
							</tr>	
						</tbody>
					</Table>

					<Row className='d-flex justify-content-center'>
							<Label style={widthStyle} className='font-weight-bold'><span style={fontStyle}>(</span></Label>
							<Label style={textStyle} className='mt-10 font-weight-bold'><span style={fontStyle}>PEMBUAT</span></Label>
							<Label style={widthStyle}><span style={fontStyle}><span className='mr-3 font-weight-bold'>)</span></span></Label>
	
							<Label style={widthStyle} className='font-weight-bold'><span style={fontStyle}>(</span></Label>
							<Label style={textStyle} className='mt-10 font-weight-bold'><span style={fontStyle}>PENJALURAN</span></Label>
							<Label style={widthStyle}><span style={fontStyle}><span className='mr-3 font-weight-bold'>)</span></span></Label>

							<Label style={widthStyle} className='font-weight-bold'><span style={fontStyle}>(</span></Label>
							<Label style={textStyle} className='mt-10 font-weight-bold'><span style={fontStyle}>EKSPEDISI</span></Label>
							<Label style={widthStyle}><span style={fontStyle}><span className='mr-3 font-weight-bold'>)</span></span></Label>

							<Label style={widthStyle} className='font-weight-bold'><span style={fontStyle}>(</span></Label>
							<Label style={textStyle} className='mt-10 font-weight-bold'><span style={fontStyle}>IC</span></Label>
							<Label style={widthStyle}><span style={fontStyle}><span className='mr-3 font-weight-bold'>)</span></span></Label>

							<Label style={widthStyle} className='font-weight-bold'><span style={fontStyle}>(</span></Label>
							<Label style={textStyle} className='mt-10 font-weight-bold'><span style={fontStyle}>SECURITY</span></Label>
							<Label style={widthStyle}><span style={fontStyle}><span className='mr-3 font-weight-bold'>)</span></span></Label>
					</Row>
{/* 
					<Row className='d-flex justify-content-center'>
							<Label style={widthStyle} className='font-weight-bold'><span style={fontStyle}>PEMBUAT</span></Label>
							<Label style={widthStyle} className='font-weight-bold'><span style={fontStyle}>PENJALURAN</span></Label>
							<Label style={widthStyle} className='font-weight-bold'><span style={fontStyle}>EKSPEDISI</span></Label>
							<Label style={widthStyle} className='font-weight-bold'><span style={fontStyle}>IC</span></Label>
							<Label style={widthStyle} className='font-weight-bold'><span style={fontStyle}>SECURITY</span></Label>
					</Row> */}
							
		
				

				</CardBody>
			</Card>
		);
	}
}

export default PrintLabel;
