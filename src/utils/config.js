//production server
// export const API_BASE_URL = 'http://94.229.79.27:55412/api/v1';

//live server
export const API_BASE_URL = 'https://pgmerchantsapi.paylodeservices.com/api/v1';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint



export const CREATEPROFILE = getApiUrl('/merchant/update');
export const GETPROFILE = getApiUrl('/merchant/profile');
export const SETPIN= getApiUrl('/merchant/setpin');
export const DASHBOARDOVERVIEW = getApiUrl('/dashboard/overview');
export const CREATEACCESS = getApiUrl('/merchant/access');
export const GETSETTLEMENTRECORD = getApiUrl('/settlement/getall');
export const EXPORTSETTLEMENT = getApiUrl('/settlement/export');
export const CREATESETTLEMENTACCT = getApiUrl('/settlementaccount/create');
export const UPDATESETTLEMENTACCT = getApiUrl('/settlementaccount/update');
export const GETSETTLEMENTACCOUNT = getApiUrl('/settlementaccount');
export const TRANSACTION = getApiUrl('/transaction/getall');
export const EXPORTTRANSACTION = getApiUrl('/transaction/export');
export const ADDUSER= getApiUrl('/usermanagement/adduser');
export const GETUSER= getApiUrl('/usermanagement/users');
export const GETBANK= getApiUrl('/supportedservices/getallbanks');
export const GETCOUNTRY= getApiUrl('/supportedservices/getallcountries');
export const GETCURRENCY= getApiUrl('/supportedservices/getallcurrencies');

export const GENERATEKEY = getApiUrl('/applicationprofile/generate');
export const GETALLKEYS = getApiUrl('/transaction/export');






// export const ALLCLIENTS = getApiUrl('/client/getall');
// export const CLIENT = getApiUrl('/client');
// export const LISTCLIENT = getApiUrl('/client/list');
// export const ACTIVATECLIENT = getApiUrl('/client/activate');
// export const DEACTIVATECLIENT = getApiUrl('/client/deactivate');
// export const ALLVENDORS = getApiUrl('/vendor/getall');
// export const VENDOR = getApiUrl('/vendor');
// export const LISTVENDOR = getApiUrl('/vendor/list');
// export const TOPUPVENDOR = getApiUrl('/vendor/topup');
// export const VENDORTYPES = getApiUrl('/vendor/vendortypes');
// export const ACTIVATEVENDOR = getApiUrl('/vendor/activate');
// export const DEACTIVATEVENDOR = getApiUrl('/vendor/deactivate');
// export const ALLBILLERS = getApiUrl('/biller/getall');
// export const BILLERCATEGORY = getApiUrl('/biller/category');
// export const BILLERSUBCATEGORY = getApiUrl('/biller/subcategory/');
// export const BILLER = getApiUrl('/biller');
// export const LISTBILLER = getApiUrl('/biller/list');
// export const ALLCLIENTBILLERS = getApiUrl('/clientbiller/getall');
// export const CLIENTBILLER = getApiUrl('/clientbiller');
// export const ALLWALLETS = getApiUrl('/wallet/getall');
// export const ALLWALLETHISTORY = getApiUrl('/wallethistory/getall');
// export const ALLTRANSACTION = getApiUrl('/transaction/getall');
// export const EXPORTTRANSACTION = getApiUrl('/transaction/export');
// export const ALLWALLETTOPUP = getApiUrl('/wallettopup/getall');
// export const WALLETTOPUP = getApiUrl('/wallettopup');
// export const APPROVEWALLETTOPUP = getApiUrl('/wallettopup/approve');
// export const REJECTWALLETTOPUP = getApiUrl('/wallettopup/reject');
// export const ALLVENDORBILLER = getApiUrl('/vendorbiller/getall');
// export const VENDORBILLER = getApiUrl('/vendorbiller');
// export const ACTIVATEVENDORBILLER = getApiUrl('/vendorbiller/activate');
// export const VENDORBILLERSUPPORTEDTYPES = getApiUrl('/vendorbiller/supportedtypes');
// export const ALLUSERMANAGEMENT = getApiUrl('/usermanagement/getall');
// export const APPROVEUSER = getApiUrl('/usermanagement/approve/permission');
// export const ASSIGNUSER = getApiUrl('/usermanagement/assign/permission')
// export const REMOVEUSER = getApiUrl('/usermanagement/remove/permission');
// export const ALLSTOCKUSAGE = getApiUrl('/stockusage/getall');
// export const ALLELECTRICITY = getApiUrl('/electricity/getall');
// export const DASHBOARDTRANSACTIONS = getApiUrl('/dashboard/transactions');
// export const BILLERCOUNT = getApiUrl('/dashboard/billers');
// export const GENERATEKEY = getApiUrl('/clients/generatekey');
// export const ALLPERMISSION = getApiUrl('/permission/getall')
// export const ACTIVATEBILLER = getApiUrl('/biller/activate')
// export const DEACTIVATEBILLER = getApiUrl('/biller/deactivate')
// export const EXPORTWALLETHISTORY = getApiUrl('/walletHistory/export');
// export const REGISTERUSER = getApiUrl('/usermanagement/register-user');
