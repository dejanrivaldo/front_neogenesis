import React from 'react';

//OUTLET
function url_tampildataOutlet(currPage,currLimit) {
    return `http://10.0.111.143:8083/TampilSemuaDataOutlet/page?page=${currPage}&size=${currLimit}`
}
//Untuk View Outlet
function url_tampilDetailDataOutlet(param) {
    return `http://10.0.111.143:8083/TampilDetailDataOutlet/${param}`
}
function url_ubahdataOutlet(first_param){
    return `http://10.0.111.143:8083/UbahEkspedisi/${first_param}`
}
var url_insertdataOutlet = `http://10.0.111.143:8083/TambahOutlet`





//TELPON
var url_insertdataTelponOutlet = `http://10.0.111.143:8083/TambahTeleponOutlet`
function url_tampildataTeleponOutlet(param){
    return `http://10.0.111.143:8083/TampilDataTeleponOutlet/${param}`;
}


//KOTA
function url_tampildataKota(param){
    return `http://10.0.111.143:8089/MasterKota?page=0&length=0`;
}



//CITRIX
function url_bridgingServer(param){
    return `http://10.0.111.143:8083/TampilDataBridgingServer/${param}`;
}

//STOCKTAKE

// function url_tampilStocktake(){
//     return `http://10.0.111.31:8083/TampilDataStockTakeOutlet/${this.state.searchInputtedName}`;
// }

export{
    url_tampildataOutlet,url_insertdataOutlet,url_tampildataTeleponOutlet,
    url_ubahdataOutlet,url_insertdataTelponOutlet,url_tampildataKota,url_bridgingServer,
    url_tampilDetailDataOutlet
    
};