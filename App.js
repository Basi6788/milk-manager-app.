import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

// Dummy Data (Test ke liye)
const DEFAULT_ROUTINE = [
  { id: '1', name: 'Person A', rate: 130, status: 'pending' },
  { id: '2', name: 'Chacho Aslam', rate: 135, status: 'pending' },
  { id: '3', name: 'Bhai Sagheer', rate: 130, status: 'pending' },
];

export default function App() {
  const [routine, setRoutine] = useState(DEFAULT_ROUTINE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [weight, setWeight] = useState('');

  const handleSave = () => {
    if (!weight) return Alert.alert("Ruko!", "Wazan (Weight) likhna bhool gye!");
    
    // Agla banda
    setWeight('');
    if (currentIndex < routine.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert("Collection Complete!", "Sab ka doodh jama ho gya.");
    }
  };

  const currentCustomer = routine[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.liveIndicator}>
          <View style={styles.dot} /> 
          <Text style={styles.liveText}>Live Sync</Text>
        </View>
        <Text style={styles.time}>09:10 AM</Text>
      </View>

      {/* Main Card Section */}
      <View style={styles.cardContainer}>
        {/* Customer Name */}
        <Text style={styles.label}>Customer:</Text>
        <Text style={styles.customerName}>{currentCustomer.name}</Text>
        
        {/* Progress Bar (Visual Design) */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentIndex + 1) / routine.length) * 100}%` }]} />
        </View>

        {/* Input Field (Bilkul Image jaisa) */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#555"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            autoFocus={true}
          />
          <Text style={styles.unitText}>KG</Text>
        </View>

        <TouchableOpacity>
           <Text style={styles.moreOptions}>Weight KG ▼</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Button Section */}
      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {routine.map((_, index) => (
             <View key={index} style={[styles.pageDot, index === currentIndex ? styles.activeDot : null]} />
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.btnText}>SAVE & NEXT</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// STYLES - Ye wohi hain jo Image 2 me hain
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115', // Deep Black/Grey background
    padding: 20,
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    alignItems: 'center'
  },
  liveIndicator: {
    flexDirection: 'row',
    backgroundColor: '#1a1d21',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#00e676', // Neon Green
    borderRadius: 4,
    marginRight: 6
  },
  liveText: { color: '#00e676', fontWeight: 'bold', fontSize: 12 },
  time: { color: '#666', fontSize: 14 },
  
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500'
  },
  customerName: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 20
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 40,
    width: '30%'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00e676',
    borderRadius: 2
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  input: {
    color: '#fff',
    fontSize: 80, // Bara font size jaise image me hai
    fontWeight: 'bold',
    minWidth: 100
  },
  unitText: {
    color: '#444',
    fontSize: 40,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  moreOptions: {
    color: '#888',
    fontSize: 16,
    marginTop: 10
  },

  footer: {
    marginBottom: 30
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
  },
  pageDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#333',
    marginHorizontal: 4
  },
  activeDot: {
    backgroundColor: '#00e676', // Green active dot
    width: 8,
    height: 8
  },
  saveBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#00e676', // Green Border outline button
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: "#00e676",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1
  }
});

