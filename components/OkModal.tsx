import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView, ThemedViewProps } from './ThemedView';

export interface OkModalProps extends ThemedViewProps {
  visible: boolean;
  onOk: () => void;
  title?: string;
  children?: React.ReactNode;
}

export function OkModal({ 
  visible, 
  onOk, 
  title, 
  children, 
  lightColor, 
  darkColor, 
  ...otherProps
}: OkModalProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <View style={styles.centeredView} pointerEvents="box-none">
        <ThemedView
          lightColor={lightColor}
          darkColor={darkColor}
          style={styles.modalView}
          {...otherProps}
        >
          {title && (
            <ThemedText type="subtitle" style={styles.title}>
              {title}
            </ThemedText>
          )}
          
          <View style={styles.content}>
            {children}
          </View>
          
          <Pressable
            style={styles.button}
            onPress={onOk}
          >
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              OK
            </ThemedText>
          </Pressable>
        </ThemedView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  content: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
