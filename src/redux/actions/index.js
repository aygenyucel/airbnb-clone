export const GET_USER = 'GET_USER';
export const GET_USER_ID = 'GET_USER_ID'

const BE_DEV_URL = process.env.REACT_APP_BE_DEV_URL


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
                const {JWTToken} = data;
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