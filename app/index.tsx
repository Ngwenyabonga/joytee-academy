import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import logo from '../assets/logo.png'; // Make sure this path matches your actual logo location

export default function HomeScreen() {
  const router = useRouter();
  const [lastProfile, setLastProfile] = useState<string | null>(null);
  const [dailyTip, setDailyTip] = useState<string>("");

  const tips = [
    "Your clarity is your compass. Trust it.",
    "You don’t need to know everything — just your next step.",
    "God doesn’t call the qualified. He qualifies the called.",
    "Progress is better than perfection. Keep building.",
    "Your voice matters. Speak with boldness and grace.",
  ];

  useEffect(() => {
    const loadProfile = async () => {
      const stored = await SecureStore.getItemAsync('lastProfile');
      if (stored) setLastProfile(stored);
    };

    const pickTip = () => {
      const random = Math.floor(Math.random() * tips.length);
      setDailyTip(tips[random]);
    };

    loadProfile();
    pickTip();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>Welcome to JoyTee Academy</Text>
      <Text style={styles.subtitle}>Empowering clarity, confidence, and calling</Text>

      <View style={styles.tipBox}>
        <Text style={styles.tipLabel}>💡 Daily Tip</Text>
        <Text style={styles.tipText}>{dailyTip}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/quiz')}
      >
        <Text style={styles.buttonText}>Start Career Clarity Quiz</Text>
      </TouchableOpacity>

      {lastProfile && (
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/results')}
        >
          <Text style={styles.secondaryButtonText}>View Last Results</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.scripture}>
        “Commit to the Lord whatever you do, and He will establish your plans.” — Proverbs 16:3
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  tipBox: {
    backgroundColor: '#FFF7E6',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  tipLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#FF9500',
  },
  tipText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#E5E5EA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 15,
    textAlign: 'center',
  },
  scripture: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 30,
  },
});