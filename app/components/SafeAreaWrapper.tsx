// SafeAreaWrapper.tsx
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    children: ReactNode;
    style?: object;
    edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
    backgroundColor?: string;
}

export default function SafeAreaWrapper({
    children,
    style,
    edges = ['top', 'bottom'],
    backgroundColor = '#000000'
}: Props) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { backgroundColor }, style]} edges={edges}>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
