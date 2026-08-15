import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type ButtonType = 'primary' | 'edit' | 'danger';

interface Props {
    text: string;
    type?: ButtonType;

    onPress?: () => void;
}

const buttonStyles: Record<ButtonType, ViewStyle> = {
    'primary': { backgroundColor: '#005187', },
    'edit': { backgroundColor: '#f59e0b' },
    'danger': { backgroundColor: '#dc3545' },
}

const ButtonComponent = ({ text, type = 'primary', onPress }: Props) => {
    return (
        <TouchableOpacity style={ [styles.button, buttonStyles[type]] } onPress={ onPress }>
            <Text style={ styles.buttonText }>{ text }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        padding: 16,
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff'
    },
})

export default ButtonComponent;