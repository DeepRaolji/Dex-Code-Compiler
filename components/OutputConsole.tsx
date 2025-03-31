import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface OutputConsoleProps {
  output: string;
}

export default function OutputConsole({ output }: OutputConsoleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Output</Text>
      <ScrollView style={styles.outputScroll}>
        <Text style={styles.output}>{output || 'Run your code to see the output...'}</Text>
      </ScrollView>
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
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
    backgroundColor: '#333',
  },
  outputScroll: {
    maxHeight: 200,
  },
  output: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
    padding: 16,
  },
});