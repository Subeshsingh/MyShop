import { AsyncStorage } from 'react-native';


export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT ='LOGOUT';

let timer;

export const authenticate = ( userId, token, expiryTime) => {
    console.log("User : "+userId);
    console.log("expiryTime : "+ expiryTime);
    console.log("Token : " + token);


    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({type: AUTHENTICATE, userId: userId, token: token});
    };
}

export const signup = (email, password) =>{
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-0G9voXXg-mDEXUKbmL31zrwNjSDP7Sk',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );
        
        if(!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went Wrong!';
            if(errorId === 'EMAIL_EXISTS'){
                message="This Email exists already!";
            }
            throw new Error(message);
        };

        const resData = await response.json();
        console.log(resData);

        dispatch(
            authenticate(
                resData.localId,
                resData.idToken,
                parseInt(resData.expiresIn) * 1000
            )
        );

        const expirationDate =  new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        
        saveDataToStorage( resData.idToken, resData.localId, expirationDate);
    };
};

export const login = (email, password) =>{
    return async dispatch=>{
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-0G9voXXg-mDEXUKbmL31zrwNjSDP7Sk',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );
        
        if(!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went Wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
              } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
              }
            throw new Error(message);
        };

        const resData = await response.json();
        console.log(resData);

        dispatch(
            authenticate(
                resData.localId,
                resData.idToken,
                parseInt(resData.expiresIn) * 1000
            )
        );

        const expirationDate =  new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        
        saveDataToStorage( resData.idToken, resData.localId, expirationDate);
    };
};

export const logout = () =>{
    console.log('Logging out !!')
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return{ type: LOGOUT}
}

const clearLogoutTimer = () =>{
    if(timer){
        clearTimeout(timer);
    }
}

const setLogoutTimer = expirationDate => {
    return dispatch => {
        timer = setTimeout(()=>{
            dispatch(logout());
        },expirationDate);
    };
};

const saveDataToStorage = ( token, userId, expirationDate) =>{
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        })
    );
};
