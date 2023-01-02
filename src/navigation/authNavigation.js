import { createStackNavigator } from 'react-navigation-stack';
import ForgotPassword from '../screens/auth/forgot/forgotpassword';
import Login from '../screens/auth/login/login';
import ValidateOtp from '../screens/auth/otp/validate-otp';
import Register from '../screens/auth/register/register';

const AuthStack = createStackNavigator({

    Login:
    {
        screen: Login,
    },
    Register:
    {
        screen: Register
    },
    ForgotPasswordPage:
    {
        screen: ForgotPassword
    },
    ValidateOtp:
    {
        screen: ValidateOtp
    },
    // PostTask1 :{
    //     screen:PostTask1,
        
    // },
    // PostTask2 :{
    //     screen:PostTask2,
        
    // },
    // PostTask3 :{
    //     screen:PostTask3,
        
    // },
    // PostTask4 :{
    //     screen:PostTask4,
        
    // },
},
    {
        initialRouteName: 'Login',
        headerMode:"none"
    }

)
export default AuthStack;