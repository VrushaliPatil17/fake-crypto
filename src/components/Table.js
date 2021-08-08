import { useSelector } from 'react-redux';
import './Table.css';

export default function Table() {

    const userInfo = useSelector((state) => state.user);
    let transactions;

    const getTransactionHistory = () => {
        let transactions = userInfo.userData.transactions;
        let transactionsArray = [];
   
        for(let t of transactions) {
            let transactionType = (t.toAddress === userInfo.name) ? "Credit" : "Debit";
            console.log("Trans = ", t, transactionType);

            transactionsArray.push({
                time: t.timestamp,
                sender: !t.fromAddress ? "Market" : t.fromAddress,
                receiver: t.toAddress,
                type: transactionType,
                amount: t.amount
            })
        }

        console.log("Array = ", transactionsArray);
        return transactionsArray;
    }

    const renderTableData = () => { 
        transactions = getTransactionHistory();

        return transactions.map((t, index) => {
            const { time, sender, receiver, type, amount } = t //destructuring
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{time}</td>
                    <td>{sender}</td>
                    <td>{receiver}</td>
                    <td>{type}</td>
                    <td data-stat={type}>{amount}</td>
                </tr>
            )
        })
         
    }

    const renderHeader = () => {
        return (
            <tr key="head">
                <th>ID</th>
                <th>TIME STAMP</th>
                <th>SENDER ADDRESS</th>
                <th>RECEIVER ADDRESS</th>
                <th>TRANSACTION TYPE</th>
                <th>AMOUNT</th>
            </tr>
        )
    }

    return (
        <div className="table">
            <h5> Table : <p> Following table displays user's transaction activity </p> </h5>
            <table id='history'>
                <tbody>
                    {renderHeader()}
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    );
}