import {ifIphoneX} from 'react-native-iphone-x-helper'
import Colors from "./Colors";


const Styles = {
    container: {
        flex: 1,
        ...ifIphoneX({
            paddingTop: 50
        }, {
            paddingTop: 20
        })
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        marginTop: 20,
        flexDirection: 'row'
    },
    welcomeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightGreen
    },
};

export default Styles;