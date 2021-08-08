import './User.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, userSignIn } from '../actions/signInAction';
import {useState} from 'react';
import { postApiCall, getApiCall } from '../api';
import Graph from './Graph';
import Table from './Table';

export default function User(props) {
    const [destination, setDestination] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.user);

    const sendAmount = async function () {
        let postResult = await postApiCall(userInfo.name, destination, amount);
        console.log("== ", destination, amount);
        if(postResult.status === "OK") {
            setAmount('');
            setDestination('');
            setError(false);
            setErrorMsg('');
            updateUserData();
        } else {
            setError(true);
            setErrorMsg(postResult.error);
        }    
    }

    const updateUserData = async function() {
        let data = await getApiCall(userInfo.name);
        if((data.transactions).length > 0) {
            dispatch(userSignIn(data, userInfo.name));
        }
    }

    // re-route to SignIn page
    const handleSignOut = () => {
        dispatch(clearUser());
        props.history.push("/");
    }

    // don't accept non-numeric values
    const validateAmount = (amt) => {
        if(!isNaN(amt)) {
            setAmount(amt);
        }
    }

    const enabled = (amount.length > 0) && (destination.length > 0);

    return (
        <div className="home">
             {/* header */}
            <div className="header">
                <p className="userName">{userInfo.name}</p>
                <p className="out" align="right" onClick={() => handleSignOut()} > Sign Out </p>
            </div>

            <div className="clearfix">
                {/* column one for balance and sending coin */}
                <div className="column menu">
                    <ul>
                        {/* user balance  */}
                        <div className="row1">
                           <h2> Jobcoin Balance </h2>
                           <h3> {userInfo.userData.balance} </h3>
                        </div>

                        {/* send jobcoin */}
                        <div className="row2">
                            <h2> Send Jobcoin </h2>
                            <div className="send">
                                <input type="text" value={destination} className="dest" placeholder="Destination Address" onChange={(e) => setDestination(e.target.value)} />
                                <input type="text" value={amount} className="amt" placeholder="Amount To Send" onChange={(e) => validateAmount(e.target.value)} />
                                <button className="btn" align="center" onClick={() => sendAmount()} disabled={!enabled}> Send Jobcoin </button>
                            </div>

                            {
                                error &&
                                <div>
                                    <h4> {errorMsg} </h4>
                                </div>
                            }
                        </div>
                    </ul>
                </div>

                {/* column two for history graph */}
                <div className="column content">
                    <h1> {userInfo.name}'s Transaction History </h1>
                    <Graph />
                    <Table />
                </div>
            </div>
        </div>
    );
}