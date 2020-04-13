import React,{useEffect,useCallback,useReducer,useState} from 'react';
import { View,ScrollView,StyleSheet,Platform,
         Alert,KeyboardAvoidingView,ActivityIndicator} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector,useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as actionProducts from '../../store/actions/product';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state,action) => {
    if(action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input] : action.value
        };
        const upadatedValidities = {
            ...state.inputValidites,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for( const key in upadatedValidities) {
            updatedFormIsValid = updatedFormIsValid && upadatedValidities[key];
        }

        return{
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidites: upadatedValidities
        };
    }
    return state;
};


const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector( state => state.products.userProducts.find(prod => prod.id === prodId));
    const dispatch = useDispatch();

    const [formState , dispatchFormState] = useReducer(formReducer,{
        inputValues : {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price : ''
        },
        inputValidites: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description : editedProduct ? true : false,
            price : editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    const inputChangeHandler = useCallback(
        ( inputIdentifier, inputValue, inputValidity ) => {
            console.log("Hello i InputChangleHandler from EditScreen being fired" + " : "+inputIdentifier+" : "+inputValue+" , "+ inputValidity);
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
    },[dispatchFormState])

    const submitHandler = useCallback(async () => {
            
            if (!formState.formIsValid) {
                Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                  { text: 'Okay' }
                ]);
                return;
            }
            setError(null);
            setIsLoading(true);
            console.log('I am SubmitHandler from EditScreen'); 
            console.log(formState.inputValues.title + " "+ formState.inputValidites.title + " form is Valid: "+ formState.formIsValid);
            try{ 
                if(editedProduct){
                    dispatch(
                        actionProducts.updateProduct(
                            prodId,
                            formState.inputValues.title,
                            formState.inputValues.imageUrl,
                            formState.inputValues.description
                        )
                    );
                }else{
                    dispatch(
                        actionProducts.createProduct(
                            formState.inputValues.title,
                            formState.inputValues.description,
                            formState.inputValues.imageUrl,
                            +formState.inputValues.price
                        )
                    );
            } 
            props.navigation.goBack();
         }catch(error){
             setError(error.message);
         }

         setIsLoading(false);

    },[dispatch,formState,prodId]);
    
    useEffect(() => {
        props.navigation.setParams({'submit': submitHandler})
    }, [submitHandler]);
    
    if(isLoading){
        return (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          );
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={Platform.select({ios: 0, android:10})}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title" 
                        label="Title"
                        errorText="Please enter a valid title"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id="imageUrl"
                        label="Image Url"
                        errorText="Please enter a valid image url!"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (
                     <Input
                        id="price"
                        label="Price"
                        errorText="Please enter a valid price!"
                        keyboardType="decimal-pad"
                        retu rnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        min={0.1}
                     />
                    )}
                   <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>);
}


EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
      headerTitle: navData.navigation.getParam('productId')
        ? 'Edit Product'
        : 'Add Product',
      headerRight:()=> (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
           onPress={submitFn}/>
        </HeaderButtons>
      )
    };
  };
const styles = StyleSheet.create({
    form:{
       margin: 20 
    },
   
})
export default EditProductScreen;