const totalCreditAndDebit = (data)=>{
    if(data.length>1){
        return {credit:data[1].sum,debit:data[0].sum}
    }
    else if (data.length===0){
        return {credit:0,debit:0}
    }
    else if(data.type==='credit'){
        return {credit:data[0].sum,debit:0}
    }
    return {credit:0,debit:data[0].sum}
}
export default totalCreditAndDebit