import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to JoyTee Academy</Text>
      <Text style={styles.subtitle}>Find your career clarity profile</Text>
      <Text style={styles.description}>
        This short quiz will help you feel confident, clear, and ready to grow.
      </Text>
      <Button title="Start Quiz" onPress={() => router.replace('/quiz')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 30 }
});