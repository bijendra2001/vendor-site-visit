import UserService from '../service/UserService';

export const RUBIX = "Rubix";

export const GET = "GET";
export const POST = "POST";

export const DESC = "DESC";

export const VENDOR_SITE_VISIT="vendor-site-visit";
export const VENDOR_SITE_VISIT_CLIENT="vendor_site_visit_client";

//Template Tag Name
export const PHOTOGRAPHS = "photographs";
export const SITE_VISIT_TATA_AIG = "SiteVisitforTATAAIG";

export const HTTP_HEADERS_FORMDATA = {
    'Content-Type': 'multipart/form-data'
};

export const HTTP_HEADERS_RESPONSE_TYPE_ARRAYBUFFER = {
    'Accept': 'application/json',
    'Content-Type': 'application/octet-stream',
    'Authorization': `Bearer ${UserService.token}`
};

export const HTTP_HEADERS_AUTHENTICATED_FORMDATA = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${UserService.token}`
};

export const HTTP_HEADERS_CONTENT_TYPE_LIST = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${UserService.token}`
}


export const HTTP_RESPONSE_TYPE_ARRAYBUFFER = 'arraybuffer';