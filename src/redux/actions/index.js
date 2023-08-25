export const GET_USER = 'GET_USER';
export const GET_USER_ID = 'GET_USER_ID'

const BE_DEV_URL = process.env.REACT_APP_BE_DEV_URL;

export const checkEmailExistAction = (email) => {
    
        return new Promise(async(resolve,reject) => {
            const options = {
                method: "POST",
                body: JSON.stringify({email: email}),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            try {
                const response = await fetch(`${BE_DEV_URL}/users/checkEmailExist`, options)

                if(response.ok){
                    const data = await response.json();
                    const email = data;
                    console.log("email exist! =>", email)
                    resolve({email})
                } else {
                    console.log("email not exist! =>", email);
                    resolve(null)
                    // response.text()
                    
                    // .then(text => {
                    //     throw new Error(text)
                    // })
                }
                
            } catch (error) {
                console.log("🚀 error", error)
                reject(error)
            }
        })
}

export const signupLoginEmailAction = (user) => {
    return new Promise( async (resolve, reject) => {
        const options = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch(`${BE_DEV_URL}/users/signupLoginEmail`, options)
            if(response.ok) {
                const data = await response.json();
                const {JWTToken, refreshToken} = data;
                // console.log("GET TOKEN res:", data);
                if(JWTToken) {
                    const options = {
                        method: "GET",
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + JWTToken
                        }
                    }
                    try {
                        const response = await fetch(`${BE_DEV_URL}/users/me`, options)
                        if(response.ok) {
                            const user = await response.json()
                            if(user) {
                                localStorage.setItem("JWTToken", JWTToken)
                                localStorage.setItem("refreshToken", refreshToken)
                                const dispatchAction1 = {
                                    type: GET_USER,
                                    payload: user
                                }
                                    
                                const dispatchAction2 = {
                                    type: GET_USER_ID,
                                    payload: user._id
                                }

                                resolve({dispatchAction1, dispatchAction2})
                            }
                        }
                        
                    } catch (error) {
                        console.log("🚀 error", error)
                        reject(error)
                    }
                } else {

                }

            } else {
                response.text().then(text => {
                    throw new Error(text)
                })

                console.log("Ops, something went wrong")
            }
        } catch (error) {
            console.log("🚀 error", error)
            reject(error)
        }
    })
}

export const isAuthorizedAction = (userData, dispatch) => {
    return new Promise(async (resolve, reject) => {
        const JWTToken = localStorage.getItem("JWTToken");
        if(JWTToken) {
            if(userData){
                resolve(true)
            } else {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer "+ JWTToken
                    }
                }

                try {
                    const response = await fetch(`${BE_DEV_URL}/users/me`, options)

                    if (response.ok) {
                        //user is fetched and available in redux state

                        const userData = await response.json();
                        // console.log("actionnn", userData)
                        dispatch({
                            type: GET_USER,
                            payload: userData
                        })
                        dispatch({
                            type: GET_USER_ID,
                            payload: userData._id
                        })

                        resolve(true)

                    } else {
                        console.log(response);
                         if(response.status === 401) {
                            //JWT token is invalid, try to get new access token using refresh token
                            const refreshToken = localStorage.getItem("refreshToken");
                            console.log("!!!!!!!!!!!!!!!", refreshToken)
                            if(refreshToken) {
                                console.log("refresssh")
                                //refreshtoken is available
                                const response2 = await fetch(
                                    `${BE_DEV_URL}/users/signupLogin/refresh`,
                                    {
                                        method: "POST",
                                        headers: {
                                            //json
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            currentRefreshToken: refreshToken,
                                        }),
                                    }
                                );

                                if(response2.ok) {
                                    
                                    //new access token is fetched
                                    const data = await response2.json();
                                    // console.log(data);
                                    //update access token in local storage
                                    localStorage.setItem(
                                        "JWTToken",
                                        data.JWTToken
                                    );

                                    //fetch user info
                                    const response = await fetch(
                                        `${BE_DEV_URL}/users/me`,
                                        {
                                            method: "GET",
                                            headers: {
                                                //json
                                                "Content-Type": "application/json",
                                                //access token
                                                Authorization:
                                                    "Bearer " + data.JWTToken,
                                            },
                                        }
                                    );

                                    if (response.ok) {
                                        //user is fetched and available in redux state
                                        const data = await response.json();
                                        console.log(data);
                                        //dispatch action to update redux state
                                        
                                        dispatch({
                                            type: GET_USER,
                                            payload: data
                                        })
                                        dispatch({
                                            type: GET_USER_ID,
                                            payload: data._id
                                        })
                
                                    } else {
                                        console.log(response);
                                        //redirect to login page
                                        resolve(false)
                                    }
                                } else {
                                    resolve(false)
                                }
                            } else {
                                //refreshtoken is not available
                                resolve(false)
                            }

                         } else {
                            resolve(false)
                         }
                    }
                    
                } catch (error) {
                    console.log("Error: ", error)
                    reject(error)
                }
            }
        } else {
            resolve(false)
        }
    })
}