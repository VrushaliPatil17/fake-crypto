
// API calls 
const getURL = "http://jobcoin.gemini.com/possibly-earlobe/api/addresses/";

export async function getApiCall(user) {
    let url = getURL + user;
    let userDetails = await fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            return data;
                        })
                        .catch(error => {
                            console.log("Error in fetching api = ", error);
                        })

    return userDetails;
}

export const postApiCall = async function(name, destination, amount) {
    let postURL = new URL("http://jobcoin.gemini.com/possibly-earlobe/api/transactions");
    const params = {
        fromAddress: name,
        toAddress: destination,
        amount: amount
    };
    Object.keys(params).forEach(key => postURL.searchParams.append(key, params[key]))
 
    let result = fetch(postURL, {
                    method: 'POST'  
                })
                .then(response => response.json())
                .then(data => {
                    return data;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    
    return result;
}