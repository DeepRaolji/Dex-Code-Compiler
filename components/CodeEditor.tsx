import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface CodeEditorProps {
  code: string;
  onChangeCode: (text: string) => void;
  language: string;
}

export default function CodeEditor({ code, onChangeCode, language }: CodeEditorProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.editor}
        value={code}
        onChangeText={onChangeCode}
        multiline
        numberOfLines={10}
        textAlignVertical="top"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Write your code here..."
        placeholderTextColor="#666"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: '#2D2D2D',
    borderRadius: 8,
    overflow: 'hidden',
  },
  editor: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
    padding: 16,
    minHeight: 200,
  },
});