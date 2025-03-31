import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
}

const languages = [
  { id: 'javascript', name: 'JavaScript', icon: 'language-javascript' },
  { id: 'python', name: 'Python', icon: 'language-python' },
  { id: 'java', name: 'Java', icon: 'language-java' },
  { id: 'cpp', name: 'C++', icon: 'language-cpp' },
  { id: 'html', name: 'HTML', icon: 'code' },
  { id: 'css', name: 'CSS', icon: 'css3' },
  { id: 'sql', name: 'SQL', icon: 'storage' },
  { id: 'r', name: 'R', icon: 'functions' },
  { id: 'csharp', name: 'C#', icon: 'language-csharp' },
  { id: 'go', name: 'Go', icon: 'language-go' },
  { id: 'kotlin', name: 'Kotlin', icon: 'code' },
  { id: 'swift', name: 'Swift', icon: 'language-swift' },
  { id: 'dsa', name: 'DSA', icon: 'account-tree' },
  { id: 'numpy', name: 'NumPy', icon: 'analytics' },
  { id: 'pandas', name: 'Pandas', icon: 'bar-chart' },
  { id: 'rust', name: 'Rust', icon: 'language-rust' }
];

export default function LanguageSelector({
  selectedLanguage,
  onSelectLanguage,
}: LanguageSelectorProps) {  return (
    <View style={styles.outerContainer}>
      <Text style={styles.sectionTitle}>Select Language</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.id}
            style={[
              styles.languageButton,
              selectedLanguage === lang.id && styles.selectedLanguage,
            ]}
            onPress={() => onSelectLanguage(lang.id)}
          >
            <MaterialIcons 
              name={lang.icon as any} 
              size={16} 
              color={selectedLanguage === lang.id ? '#fff' : '#aaa'} 
            />
            <Text
              style={[
                styles.languageText,
                selectedLanguage === lang.id && styles.selectedLanguageText,
              ]}
            >
              {lang.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#444',
  },
  selectedLanguage: {
    backgroundColor: '#4CAF50',
    borderColor: '#5DBF61',
  },
  languageText: {
    color: '#fff',
    fontSize: 14,
  },
  selectedLanguageText: {
    fontWeight: 'bold',
  },
});