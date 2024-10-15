import { CONTENT_TYPE,SECRETE_KEY,ROLE,LOCAL_TOKEN } from "./Constants"
const token_id=(JSON.parse(localStorage.getItem(LOCAL_TOKEN)))
export const header={
    "Content-Type": CONTENT_TYPE,
    "x-hasura-admin-secret": SECRETE_KEY,
    "x-hasura-role": ROLE,
    "x-hasura-user-id": token_id,
  }