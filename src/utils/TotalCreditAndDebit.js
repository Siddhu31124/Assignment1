const totalCreditAndDebit = (totals_credit_debit_transactions)=>{
    let debitData=totals_credit_debit_transactions[0].sum
    if(totals_credit_debit_transactions.length>1){
        let creditData=totals_credit_debit_transactions[1].sum 
        let debitData=totals_credit_debit_transactions[0].sum
        return { credit:creditData,
                  debit:debitData}
    }
    else if (totals_credit_debit_transactions.length===0){
        return {credit:0,debit:0}
    }
    else if(totals_credit_debit_transactions[0].type==='credit'){
        let creditData=totals_credit_debit_transactions[0].sum 
        return {credit:creditData,debit:0}
    }
    return {credit:0,debitData}
}
export default totalCreditAndDebit