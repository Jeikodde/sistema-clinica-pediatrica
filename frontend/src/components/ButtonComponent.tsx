import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps, ComponentType } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type ButtonType = 'primary' | 'edit' | 'danger';

interface Props<T extends ComponentType<any>> {
    text: string;
    type?: ButtonType;
    IconComponent?: T;
    iconName?: ComponentProps<T>['name'];
    iconColor?: string,
    iconSize?: number;
    onPress?: () => void;
}

const buttonStyles: Record<ButtonType, ViewStyle> = {
    'primary': { backgroundColor: '#005187', },
    'edit': { backgroundColor: '#f59e0b' },
    'danger': { backgroundColor: '#dc3545' },
}

const ButtonComponent = <T extends ComponentType<any>>({ 
    text, 
    type = 'primary',
    IconComponent,
    iconName,
    iconColor = '#fff',
    iconSize = 18,
    onPress 
}: Props<T>) => {
    return (
        <TouchableOpacity style={ [styles.button, buttonStyles[type]] } onPress={ onPress }>
            { IconComponent && iconName && (
                <MaterialCommunityIcons name={ iconName } size={ iconSize } color={ iconColor } />
            )}
            <Text style={ styles.buttonText }>{ text }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 10,
        padding: 16,
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff'
    }
})

export default ButtonComponent;