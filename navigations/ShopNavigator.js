import { createStackNavigator} from  'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native'
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colors';

const ProductNavigator = createStackNavigator({
    ProductsOverview : ProductOverviewScreen
}, {
    defaultNavigationOptions: {
        backgroundColor: 'red'
    },
    headerTintColor: Platform.OS ==='android' ? 'white' : Colors.primary
});

export default createAppContainer(ProductNavigator);