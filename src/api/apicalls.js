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
} from "../utils/config";
import { apiGet, apiGetCSV, apiPost, apiPut } from "../utils/utils";

// Merchant Profile
export function createProfile(data) {
  return apiPost(CREATEPROFILE, data);
}
export function createTransactionAccess(data) {
  return apiPut(CREATEACCESS, data);
}
// export function getClients(data = null) {
//   return apiGet(ALLCLIENTS, data);
// }
// export function activateClient(data) {
//   return apiPut(ACTIVATECLIENT, data);
// }

// export const CREATEPROFILE = getApiUrl("/merchant/update");
// export const GETPROFILE = getApiUrl("/merchant/profile");
// export const SETPIN = getApiUrl("/merchant/setpin");
// export const CREATEACCESS = getApiUrl("/merchant/access");
// export const GETSETTLEMENTRECORD = getApiUrl("/settlement/getall");
// export const EXPORTSETTLEMENT = getApiUrl("/settlement/export");
// export const CREATESETTLEMENTACCT = getApiUrl("/merchant/create");
// export const UPDATESETTLEMENTACCT = getApiUrl("/merchant/create");
// export const TRANSACTION = getApiUrl("/transaction/getall");
// export const EXPORTTRANSACTION = getApiUrl("/transaction/export");
// export const ADDUSER = getApiUrl("/usermanagement/adduser");

// export function listClients(data = null) {
//   return apiGet(LISTCLIENT, data);
// }

// export function generateKey(data) {
//   return apiPost(GENERATEKEY, data);
// }

// export function createClient(data) {
//   return apiPost(CLIENT, data);
// }

// export function updateClient(data) {
//   return apiPut(CLIENT, data);
// }

// export function deactivateClient(data) {
//   return apiPut(DEACTIVATECLIENT, data);
// }

// // vendors

// export function getVendors(data = null) {
//   return apiGet(ALLVENDORS, data);
// }
// export function listVendors(data = null) {
//   return apiGet(LISTVENDOR, data);
// }
// export function createVendor(data) {
//   return apiPost(VENDOR, data);
// }
// export function updateVendor(data) {
//   return apiPut(VENDOR, data);
// }

// export function activateVendor(data) {
//   return apiPut(ACTIVATEVENDOR, data);
// }

// export function deactivateVendor(data) {
//   return apiPut(DEACTIVATEVENDOR, data);
// }

// export function topUpVendor(data) {
//   return apiPut(TOPUPVENDOR, data);
// }

// export function getVendorTypes(data = null) {
//   return apiGet(VENDORTYPES, data);
// }

// // billers
// export function getBillers(data = null) {
//   return apiGet(ALLBILLERS, data);
// }

// export function listBillers(data = null) {
//   return apiGet(LISTBILLER, data);
// }

// export function createBiller(data) {
//   return apiPost(BILLER, data);
// }

// export function updateBiller(data) {
//   return apiPut(BILLER, data);
// }

// export function getBillerCategory(data = null) {
//   return apiGet(BILLERCATEGORY, data);
// }

// export function getBillerSubCategory(category) {
//   return apiGet(BILLERSUBCATEGORY + category);
// }

// export function activateBiller(data) {
//   return apiPut(ACTIVATEBILLER, data);
// }

// export function deactivateBiller(data) {
//   return apiPut(DEACTIVATEBILLER, data);
// }

// // clientBiller
// export function getClientBiller(data = null) {
//   return apiGet(ALLCLIENTBILLERS, data);
// }
// export function createClientBiller(data) {
//   return apiPost(CLIENTBILLER, data);
// }

// export function updateClientBiller(data) {
//   return apiPut(CLIENTBILLER, data);
// }

// // wallets
// export function getWallets(data = null) {
//   return apiGet(ALLWALLETS, data);
// }
// export function getWalletHistory(data = null) {
//   return apiGet(ALLWALLETHISTORY, data);
// }
// export function getTransaction(data = null) {
//   return apiGet(ALLTRANSACTION, data);
// }

// export function exportTransactions(data = null) {
//   return apiGetCSV(EXPORTTRANSACTION, data);
// }
// export function exportWalletHistory(data = null) {
//   return apiGetCSV(EXPORTWALLETHISTORY, data);
// }
// // wallet topup
// export function getWalletTopup(data = null) {
//   return apiGet(ALLWALLETTOPUP, data);
// }
// export function createWalletTopup(data) {
//   return apiPost(WALLETTOPUP, data);
// }

// export function approveWalletTopup(data) {
//   return apiPut(APPROVEWALLETTOPUP, data);
// }

// export function rejectWalletTopup(data) {
//   return apiPut(REJECTWALLETTOPUP, data);
// }

// //vendor biller
// export function getVendorBiller(data = null) {
//   return apiGet(ALLVENDORBILLER, data);
// }

// export function createVendorBiller(data) {
//   return apiPost(VENDORBILLER, data);
// }

// export function updateVendorBiller(data) {
//   return apiPut(VENDORBILLER, data);
// }

// export function activateVendorBiller(data) {
//   return apiPut(ACTIVATEVENDORBILLER, data);
// }

// export function getVendorBillerSupportedTypes(data = null) {
//   return apiGet(VENDORBILLERSUPPORTEDTYPES, data);
// }

// //user Management
// export function getUserManagement(data = null) {
//   return apiGet(ALLUSERMANAGEMENT, data);
// }

// export function getUserApprove(data = null) {
//   return apiGet(APPROVEUSER, data);
// }
// export function getUserRemove(data = null) {
//   return apiGet(REMOVEUSER, data);
// }

// export function getUserAssign(data = null) {
//   return apiPost(ASSIGNUSER, data);
// }

// export function getRegisterUser(data = null) {
//   return apiPost(REGISTERUSER, data);
// }

// // stock Usage
// export function getStockUsage(data = null) {
//   return apiGet(ALLSTOCKUSAGE, data);
// }

// // electricity
// export function getElectricity(data = null) {
//   return apiGet(ALLELECTRICITY, data);
// }

// // dashboard
// export function getDashboardTransactions(data = null) {
//   return apiGet(DASHBOARDTRANSACTIONS, data);
// }

// export function getBillerCount(data = null) {
//   return apiGet(BILLERCOUNT, data);
// }

// // permission

// export function getPermission(data = null) {
//   return apiGet(ALLPERMISSION, data);
// }
