import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CodeEditor from '../components/CodeEditor';
import LanguageSelector from '../components/LanguageSelector';
import OutputConsole from '../components/OutputConsole';

export default function HomeScreen() {  const getInitialCode = (lang: string) => {
    const snippets = {
      javascript: `// JavaScript Example
console.log("Hello, World!");`,
      python: `# Python Example
print("Hello, World!")`,
      java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      cpp: `// C++ Example
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      html: `<!-- HTML Example -->
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
      css: `/* CSS Example */
body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
}

h1 {
    color: #333;
    text-align: center;
}`,
      sql: `-- SQL Example
CREATE TABLE greetings (
    id INT PRIMARY KEY,
    message VARCHAR(50)
);

INSERT INTO greetings VALUES (1, 'Hello, World!');

SELECT message FROM greetings;`,
      r: `# R Example
greeting <- "Hello, World!"
print(greeting)`,
      csharp: `// C# Example
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
      go: `// Go Example
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
      kotlin: `// Kotlin Example
fun main() {
    println("Hello, World!")
}`,
      swift: `// Swift Example
print("Hello, World!")`,
      dsa: `// Data Structures Example
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Create a simple linked list
let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);`,
      numpy: `# NumPy Example
import numpy as np

# Create an array
arr = np.array([1, 2, 3, 4, 5])
print("Array:", arr)

# Basic operations
print("Mean:", np.mean(arr))
print("Sum:", np.sum(arr))`,
      pandas: `# Pandas Example
import pandas as pd

# Create a simple DataFrame
data = {
    'Name': ['John', 'Anna', 'Peter'],
    'Age': [28, 22, 35],
    'City': ['New York', 'Paris', 'London']
}
df = pd.DataFrame(data)
print(df)`,
      rust: `// Rust Example
fn main() {
    println!("Hello, World!");
}`,
    };
    return snippets[lang as keyof typeof snippets] || snippets.javascript;
  };

  const [code, setCode] = useState(getInitialCode('javascript'));  const [language, setLanguage] = useState('javascript');
  
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(getInitialCode(newLanguage));
  };
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCompile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.a0.dev/ai/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are a Dex Code Compiler. Execute the following ${language} code and return ONLY the output. If there's an error, return the error message.`,
            },
            {
              role: 'user',
              content: code,
            },
          ],
        }),
      });
      const data = await response.json();
      setOutput(data.completion);
    } catch (error) {
      setOutput('Error: Failed to compile code');
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Dex Code Compiler</Text>        <LanguageSelector
          selectedLanguage={language}
          onSelectLanguage={handleLanguageChange}
        />
      </View>

      <ScrollView style={styles.content}>
        <CodeEditor
          code={code}
          onChangeCode={setCode}
          language={language}
        />

        <TouchableOpacity
          style={styles.runButton}
          onPress={handleCompile}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <MaterialIcons name="play-arrow" size={24} color="white" />
              <Text style={styles.runButtonText}>Run Code</Text>
            </>
          )}
        </TouchableOpacity>

        <OutputConsole output={output} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  runButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    margin: 16,
  },
  runButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});