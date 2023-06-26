import {
  CREATEPROFILE,
  ADDUSER,
  EXPORTTRANSACTION,
  TRANSACTION,
  UPDATESETTLEMENTACCT,
  CREATESETTLEMENTACCT,
  EXPORTSETTLEMENT,
  GETSETTLEMENTRECORD,
  CREATEACCESS,
  SETPIN,
  GETPROFILE,
  GETSETTLEMENTACCOUNT,
  GENERATEKEY,
  DASHBOARDOVERVIEW,
  GETUSER,
  GETBANK,
  GETCOUNTRY,
  GETCURRENCY,
} from "../utils/config";
import { apiGet, apiGetCSV, apiPost, apiPut } from "../utils/utils";

// Merchant Profile
export function createProfile(data) {
  return apiPut(CREATEPROFILE, data);
}
export function createTransactionAccess(data) {
  return apiPut(CREATEACCESS, data);
}
export function getMerchantProfile(data = null) {
  return apiGet(GETPROFILE, data);
}
export function createPin(data) {
  return apiPost(SETPIN, data);
}

//dashboard
export function getDashboardTransactions(data = null) {
  return apiGet(DASHBOARDOVERVIEW, data);
}

//settlement
export function exportSettlement(data) {
  return apiGetCSV(EXPORTSETTLEMENT, data);
}
export function getSettlement(data = null) {
  return apiGet(GETSETTLEMENTRECORD, data);
}

//transaction
export function exportTransaction(data) {
  return apiGetCSV(EXPORTTRANSACTION, data);
}
export function getTransaction(data = null) {
  return apiGet(TRANSACTION, data);
}

//settle account
export function createSettlementAcct(data) {
  return apiPost(CREATESETTLEMENTACCT, data);
}
export function updateSettlementAcct(data) {
  return apiPut(UPDATESETTLEMENTACCT, data);
}
export function getSettlementAcct(data = null) {
  return apiGet(GETSETTLEMENTACCOUNT, data);
}

// user Management
export function addUser(data) {
  return apiPost(ADDUSER, data);
}
export function getUser(data) {
  return apiGet(GETUSER, data);
}
// Aplication Profile

export function generatekey(data) {
  return apiPost(GENERATEKEY, data);
}

//All countries
export function getContries(data) {
  return apiGet(GETCOUNTRY, data);
}

//All Currency

export function getCurrency(data) {
  return apiGet(GETCURRENCY, data);
}

//All Bank
export function getBank(data) {
  return apiGet(GETBANK, data);
}