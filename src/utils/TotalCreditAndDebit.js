const totalCreditAndDebit = (totals_credit_debit_transactions)=>{

    //Avoid using totals_credit_debit_transactions[1]
    if(totals_credit_debit_transactions.length>1){
        return { credit:totals_credit_debit_transactions[1].sum,
                  debit:totals_credit_debit_transactions[0].sum }
    }
    else if (totals_credit_debit_transactions.length===0){
        return {credit:0,debit:0}
    }
    else if(totals_credit_debit_transactions.type==='credit'){
        return {credit:totals_credit_debit_transactions[0].sum,debit:0}
    }
    return {credit:0,debit:totals_credit_debit_transactions[0].sum}
}
export default totalCreditAndDebit