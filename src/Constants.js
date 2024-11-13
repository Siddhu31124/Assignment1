export const INITIAL_ROUTE='/'
export const LOGIN_ROUTE='/login'
export const ADMIN_LOGIN_ROUTE='/admin/login'
export const TRANSACTION_ROUTE='/transaction'
export const CREDIT_ROUTE='/transaction/credit'
export const DEBIT_ROUTE='/transaction/debit'

export const LOGIN_ERROR="Please Enter Valid Details"
export const ERROR_PAGE_MSG="The page Is Not found Enter Valid URL"
export const FAIL_ERROR="Fail to Fetch Data"

export const QUERY_KEY="transaction"
export const LOCAL_TOKEN="token"
export const LOCAL_ADMIN='admin'

export const ROLE="user"
export const CONTENT_TYPE="application/json"
export const SECRETE_KEY="g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"

export const ALL_TRANSACTION_API= "https://bursting-gelding-24.hasura.app/api/rest/all-transactions/?limit=100&offset=0"
export const TOTAL_TRANSACTION_API= 'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals'
export const DELETE_TRANSACTION_API="https://bursting-gelding-24.hasura.app/api/rest/delete-transaction?id="
export const ADD_TRANSACTION_API="https://bursting-gelding-24.hasura.app/api/rest/add-transaction"
export const UPDATE_TRANSACTION_API='https://bursting-gelding-24.hasura.app/api/rest/update-transaction'
export const LOGIN_API="https://bursting-gelding-24.hasura.app/api/rest/get-user-id"
export const PROFILE_API='https://bursting-gelding-24.hasura.app/api/rest/profile'

export const LIMIT_OF_ALL_TRANSACTION=100
export const OFFSET_OF_ALL_TRANSACTION=0

export const DATA_FORMAT="YYYY-MM-DD"
export const TYPE_OF_TRANSACTION_CREDIT="credit"


export const TRANSACTION_TYPE=[{name:"credit"},{name:"debit"}]
export const TRANSACTION_CATEGORY=[{name:'shopping'},{name:'Transfer'},{name:'food'},{name:'Rent'},{name:'Service'}]
