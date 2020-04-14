import React,{ useState, useReducer, useCallback, useEffect } from 'react';
import { 
     ScrollView,View,
     StyleSheet,Button,
     ActivityIndicator ,Alert, KeyboardAvoidingView
    } from 'react-native';

import { useDispatch } from 'react-redux';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';
import { LinearGradient } from 'expo-linear-gradient';
import * as authAction from '../../store/actions/Auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = ( state, action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues ={
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };

        let updatedFormIsValid = true;
        for( const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return{
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state;
}


const AuthScreen = props => {
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password:''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect( () => {
        if(error) {
            Alert.alert('An Error Occurred !', error ,[{text:'Okay'}]);
        }
    },[error]);

    const authHandler = async () => {
        let action;
        if(isSignUp) {
            action = authAction.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else{
            action = authAction.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        };

        setError(null);
        setisLoading(true);
        try{
            await dispatch(action);
            props.navigation.navigate('Shop');
        }catch(err){
            setError(err.message);
            setisLoading(false);
        }
    };

   const inputChangeHandler= useCallback(
        (inputIdentifier , inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState],
    );

    return (
        <KeyboardAvoidingView
         behavior="padding"
         keyboardVerticalOffset={10}
         style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="Email"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address "
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                         {isLoading 
                          ? (
                                <ActivityIndicator size="small" color={Colors.primary}/>
                            )
                            : <Button 
                                    title={!isSignUp? `Login` : `Sign Up`}
                                    color={Colors.primary}
                                    onPress={authHandler} 
                                />
                        }
                        </View>
                        <View  style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignUp ? 'Login': 'Sign Up'}`}
                                color={Colors.accent}
                                onPress={()=>{
                                    setIsSignUp(prevState => !prevState);
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}
AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
};
const styles= StyleSheet.create({
screen:{
    flex: 1
},
gradient:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
authContainer:{
    width:'80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
},
buttonContainer:{
    marginTop:10
}
});

export default AuthScreen;