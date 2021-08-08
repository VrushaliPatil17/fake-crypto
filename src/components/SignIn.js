import './SignIn.css';
import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { userSignIn } from '../actions/signInAction';
import { getApiCall } from '../api';

export default function SignIn(props) {
    const [address, setAddress] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const url = "https://jobcoin.gemini.com/possibly-earlobe"; // Jobcoin API

    const handleLogin = async function() {
        if(address){
            let data = await getApiCall(address);
            if((data.transactions).length > 0) {
                dispatch(userSignIn(data, address));
                props.history.push("/user");
                setError(false);
            } else {
                setError(true);
                console.warn("User not found");
        }
        }
    }

    return (
        <div className="sign">
            {
                error &&
                <div className="error" >
                    <h4> Invalid User Address </h4>
                    <a href={url} target="_blank" rel="noreferrer"> Click here to find valid user address </a>
                </div>
            } 
            <div className="main">
                <h1 className="heading" align="center"> Welcome! Sign in with your Jobcoin address </h1>
                <form className="form1" >
                    <p> Jobcoin Address</p>
                    <input className="user" type="text" align="center" onChange={(e) => setAddress(e.target.value)} />
                    <span className="submit" align="center" onClick={() => handleLogin()}> SIGN IN </span>   
                </form>        
            </div>
        </div>
    );
}