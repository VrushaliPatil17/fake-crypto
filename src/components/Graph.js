import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import './Graph.css';

export default function Graph() {
    const userInfo = useSelector((state) => state.user);

    const getData = () => {
        let dates = [];
        let amounts = []; 
        let transactions = userInfo.userData.transactions;
        let user = userInfo.name;

        for(let t of transactions) {
            let date = new Date(t.timestamp).toISOString().slice(0,10);
            let amount = parseFloat(t.amount);
            let type = (t.toAddress === user) ? "Credit" : "Debit";

            if(dates.includes(date)) {
                let index = dates.indexOf(date);
                if(type === "Credit") {
                    amount = amounts[index] + amount;
                } else {
                    amount = amounts[index] - amount;
                }
                amounts[index] = amount;
            } else {
                dates.push(date);
                amounts.push(amount);
            }
           
        }

        return {
            labels: dates,
            datasets: [
              {
                label: 'Balance',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: amounts
              }
            ]
        }
    }

    return (
        <div className="graph">
            <h5> Graph : <p> Following graph shows the user's balance at the end of each transaction date.</p></h5>
            
            <Bar
            data={getData()}
            options={{
                title:{
                display:true,
                text:'Balance at the end of transaction date',
                fontSize:20
                },
                legend:{
                display:true,
                position:'right'
                }
            }}
            />
      </div>
    );
}