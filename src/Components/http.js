import axios from "axios"
import { QueryClient } from "@tanstack/react-query";
import 
{ AllTransactionApi,
  LocalToken,
  ContentType,
  Secret,Role,
  TotalTransactionApi,
  DeleteTransactionApi,
  AddTransactionApi,
  UpdateTransactionApi,
  LoginApi,LocalAdmin,ProfileApi} from "../Constants";

export const queryClient = new QueryClient();

export async function fetchData(){
  let token_id=(JSON.parse(localStorage.getItem(LocalToken)))
    const res = await axios({
        method: "get",
            baseURL: AllTransactionApi,
            params: {
                limit: 100,
                offset: 0,
            },
            headers: {
            "Content-Type": ContentType,
            "x-hasura-admin-secret":Secret,
            "x-hasura-role": Role,
            "x-hasura-user-id": token_id,
             },
          });
        return res.data
        }

export async function fetchLastTransaction(){
  let token_id=(JSON.parse(localStorage.getItem(LocalToken)))
    const res=await axios({
        method:"get",
        params: {
            limit: 3,
            offset:1
        },
        baseURL:AllTransactionApi,
        headers: {
        "Content-Type": ContentType,
        "x-hasura-admin-secret":Secret,
        "x-hasura-role": Role,
        "x-hasura-user-id": token_id,
        },

    })
    return res.data 
}

export async function fetchTotalTransaction(){
  let token_id=(JSON.parse(localStorage.getItem(LocalToken)))
    const res=await axios({
        method:"get",
        baseURL:TotalTransactionApi,
        headers: {
        "Content-Type": ContentType,
        "x-hasura-admin-secret":Secret,
        "x-hasura-role": Role,
        "x-hasura-user-id": token_id,
        },

    })
    return res.data 
}

export const handleTransactionDelete = async ({id}) => {
  let token_id=(JSON.parse(localStorage.getItem(LocalToken)))
      const url = DeleteTransactionApi+id;
        const res = await axios.delete(url, {
            headers: {
                "x-hasura-admin-secret":Secret,
                "x-hasura-role": Role,
                "x-hasura-user-id": token_id,
              },
            });  
  };

export async function handelAddTransaction({data}){
  let token_id=(JSON.parse(localStorage.getItem(LocalToken)))
  const url =AddTransactionApi
  const res = await axios.post(
    url,
    {...data,user_id:token_id},
    {
      headers: {
        "x-hasura-admin-secret":Secret,
        "x-hasura-role": Role,
        "x-hasura-user-id": token_id,
      },
    }
  );
}

export async function handelEditTransaction({data,id}){
  let token_id=(JSON.parse(localStorage.getItem(LocalToken)))
    const url = UpdateTransactionApi;

  const res = await axios.post(
    url,
    {...data,id:id},
    {
      headers: {
        "x-hasura-admin-secret":Secret,
        "x-hasura-role": Role,
        "x-hasura-user-id": token_id,
      },
    }
  ); 
}

export async function loginToken({data,admin}){
  const url =
    LoginApi;

  const res = await axios.post(url,data,
    {
      headers: {
        "x-hasura-admin-secret":
          Secret,
      },
    }
  );
  if(res.status === 200){
    localStorage.setItem(LocalToken, JSON.stringify(res.data.get_user_id[0].id));
    if(admin){
      localStorage.setItem(LocalAdmin,admin)
    }
  }

}
export const fetchUserProfile = async () => {
  let token_id=(JSON.parse(localStorage.getItem(LocalToken)))
    const url = ProfileApi;
    const res = await axios.get(url, {
      headers: {
        "x-hasura-admin-secret": Secret,
        "x-hasura-role": Role,
        "x-hasura-user-id": token_id,
      },
});
return res.data.users[0]
}