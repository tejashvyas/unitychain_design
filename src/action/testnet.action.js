
import axios from 'axios';

let URL = process.env.REACT_APP_TESTNET_API

export function generateTransaction(obj) {
    return dispatch => {
        let object = {
            NumberOfBatches: parseInt(obj['NumberOfBatches']),
            NumberOfTransactionInSingleBatch: parseInt(obj['NumberOfTransactionInSingleBatch'])
        }
        
        return axios.request({ method: 'post', url: `${URL}/create-data`, data: object, "Content-Type": "application/x-www-form-urlencoded", crossDomain: true })
    }
}

export function executeTransaction(obj) {
    return dispatch => {
        let object = {
            NumberOfBatches: parseInt(obj['NumberOfBatches']),
            NumberOfTransactionInSingleBatch: parseInt(obj['NumberOfTransactionInSingleBatch'])
        }
        
        return axios.request({ method: 'post', url: `${URL}/self-transaction-processor`, data: object, "Content-Type": "application/x-www-form-urlencoded", crossDomain: true })
    }
}

export function showTransactionLog(obj) {
    return async dispatch => {
        return await axios.request({ method: 'post', url: `${URL}/testnet-log`, data: obj, "Content-Type": "application/x-www-form-urlencoded", crossDomain: true });
    }
}

export function showTrancsation(obj) {
    return dispatch => {
        return axios.request({ method: 'post', url: `${URL}/transactions`, data: obj, "Content-Type": "application/x-www-form-urlencoded", crossDomain: true })
    }
}