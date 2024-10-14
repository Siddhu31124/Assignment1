import axios from "axios"
import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();
export async function fetchData(){
  let token_id=(JSON.parse(localStorage.getItem('token')))
    const res = await axios({
        method: "get",
            baseURL: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions",
            params: {
                limit: 100,
                offset: 0,
            },
            headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "user",
            "x-hasura-user-id": token_id,
             },
          });
        return res.data
        }
export async function fetchLastTransaction(){
  let token_id=(JSON.parse(localStorage.getItem('token')))
    const res=await axios({
        method:"get",
        params: {
            limit: 3,
            offset:1
        },
        baseURL:'https://bursting-gelding-24.hasura.app/api/rest/all-transactions',
        headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": token_id,
        },

    })
    return res.data 
}
export async function fetchTotalTransaction(){
  let token_id=(JSON.parse(localStorage.getItem('token')))
    const res=await axios({
        method:"get",
        baseURL:' https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals',
        headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": token_id,
        },

    })
    return res.data 
}
export const handleTransactionDelete = async ({id}) => {
  let token_id=(JSON.parse(localStorage.getItem('token')))
      const url =
        "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction?id="+id;
        const res = await axios.delete(url, {
            headers: {
                "x-hasura-admin-secret":
                  "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
                "x-hasura-role": "user",
                "x-hasura-user-id": token_id,
              },
            });  
  };
export async function handelAddTransaction({data}){
  let token_id=(JSON.parse(localStorage.getItem('token')))
    const url =
    "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";

  const res = await axios.post(
    url,
    {...data,user_id:token_id},
    {
      headers: {
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": token_id,
      },
    }
  );

   
}
export async function handelEditTransaction({data,id}){
  let token_id=(JSON.parse(localStorage.getItem('token')))
    const url =
    "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";

  const res = await axios.post(
    url,
    {...data,id:id},
    {
      headers: {
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": token_id,
      },
    }
  ); 
}
export async function loginToken({data,admin}){
  console.log(admin,data)
  const url =
    "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";

  const res = await axios.post(url,data,
    {
      headers: {
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      },
    }
  );
  if(res.status === 200){
    localStorage.setItem("token", JSON.stringify(res.data.get_user_id[0].id));
    if(admin){
      localStorage.setItem("admin",admin)
    }
  }
  
}