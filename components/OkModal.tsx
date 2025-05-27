import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
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
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onOk}
    >
      <View style={styles.centeredView}>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
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
