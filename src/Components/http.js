import axios from "axios"
import { QueryClient } from "@tanstack/react-query";
import 
{ ALL_TRANSACTION_API,
  LOCAL_TOKEN,
  CONTENT_TYPE,
  SECRETE_KEY,ROLE,
  TOTAL_TRANSACTION_API,
  DELETE_TRANSACTION_API,
  ADD_TRANSACTION_API,
  UPDATE_TRANSACTION_API,
  LOGIN_API,LOCAL_ADMIN,PROFILE_API} from "../Constants";

export const queryClient = new QueryClient();

export async function fetchData(){
  let token_id=(JSON.parse(localStorage.getItem(LOCAL_TOKEN)))
    const res = await axios({
        method: "get",
            baseURL: ALL_TRANSACTION_API,
            params: {
                limit: 100,
                offset: 0,
            },
            headers: {
            "Content-Type": CONTENT_TYPE,
            "x-hasura-admin-secret":SECRETE_KEY,
            "x-hasura-role": ROLE,
            "x-hasura-user-id": token_id,
             },
          });
        return res.data
        }

export async function fetchLastTransaction(){
  let token_id=(JSON.parse(localStorage.getItem(LOCAL_TOKEN)))
    const res=await axios({
        method:"get",
        params: {
            limit: 3,
            offset:1
        },
        baseURL:ALL_TRANSACTION_API,
        headers: {
        "Content-Type": CONTENT_TYPE,
        "x-hasura-admin-secret":SECRETE_KEY,
        "x-hasura-role": ROLE,
        "x-hasura-user-id": token_id,
        },

    })
    return res.data 
}

export async function fetchTotalTransaction(){
  let token_id=(JSON.parse(localStorage.getItem(LOCAL_TOKEN)))
    const res=await axios({
        method:"get",
        baseURL:TOTAL_TRANSACTION_API,
        headers: {
        "Content-Type": CONTENT_TYPE,
        "x-hasura-admin-secret":SECRETE_KEY,
        "x-hasura-role": ROLE,
        "x-hasura-user-id": token_id,
        },

    })
    return res.data 
}

export const handleTransactionDelete = async ({id}) => {
  let token_id=(JSON.parse(localStorage.getItem(LOCAL_TOKEN)))
      const url = DELETE_TRANSACTION_API+id;
        const res = await axios.delete(url, {
            headers: {
                "x-hasura-admin-secret":SECRETE_KEY,
                "x-hasura-role": ROLE,
                "x-hasura-user-id": token_id,
              },
            });  
  };

export async function handelAddTransaction({data}){
  let token_id=(JSON.parse(localStorage.getItem(LOCAL_TOKEN)))
  const url =ADD_TRANSACTION_API
  const res = await axios.post(
    url,
    {...data,user_id:token_id},
    {
      headers: {
        "x-hasura-admin-secret":SECRETE_KEY,
        "x-hasura-role": ROLE,
        "x-hasura-user-id": token_id,
      },
    }
  );
}

export async function handelEditTransaction({data,id}){
  let token_id=(JSON.parse(localStorage.getItem(LOCAL_TOKEN)))
    const url = UPDATE_TRANSACTION_API;

  const res = await axios.post(
    url,
    {...data,id:id},
    {
      headers: {
        "x-hasura-admin-secret":SECRETE_KEY,
        "x-hasura-role": ROLE,
        "x-hasura-user-id": token_id,
      },
    }
  ); 
}

export async function loginToken({data,admin}){
  const url =
    LOGIN_API;

  const res = await axios.post(url,data,
    {
      headers: {
        "x-hasura-admin-secret":
          SECRETE_KEY,
      },
    }
  );
  if(res.status === 200){
    localStorage.setItem(LOCAL_TOKEN, JSON.stringify(res.data.get_user_id[0].id));
    if(admin){
      localStorage.setItem(LOCAL_ADMIN,admin)
    }
  }

}
export const fetchUserProfile = async () => {
  let token_id=(JSON.parse(localStorage.getItem(LOCAL_TOKEN)))
    const url = PROFILE_API;
    const res = await axios.get(url, {
      headers: {
        "x-hasura-admin-secret": SECRETE_KEY,
        "x-hasura-role": ROLE,
        "x-hasura-user-id": token_id,
      },
});
return res.data.users[0]
}