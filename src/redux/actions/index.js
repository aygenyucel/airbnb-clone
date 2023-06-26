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