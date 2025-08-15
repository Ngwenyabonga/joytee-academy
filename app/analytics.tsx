import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type DownloadEntry = {
  title: string;
  timestamp: string;
};

const profileNames = [
  'Strategic Organizer',
  'Messenger',
  'Visionary',
  'Builder',
  'Connector',
  // Add more profiles here
];

export default function AnalyticsScreen() {
  const [analyticsData, setAnalyticsData] = useState<Record<string, DownloadEntry[]>>({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      const data: Record<string, DownloadEntry[]> = {};
      for (const profile of profileNames) {
        const key = `downloads_${profile}`;
        const raw = await SecureStore.getItemAsync(key);
        data[profile] = raw ? JSON.parse(raw) : [];
      }
      setAnalyticsData(data);
    };

    fetchAnalytics();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 JoyTee Academy Analytics</Text>
      {profileNames.map((profile) => {
        const downloads = analyticsData[profile] || [];
        return (
          <View key={profile} style={styles.section}>
            <Text style={styles.profileTitle}>{profile}</Text>
            {downloads.length === 0 ? (
              <Text style={styles.empty}>No downloads yet.</Text>
            ) : (
              downloads.map((item, index) => (
                <Text key={index} style={styles.item}>
                  • {item.title} ({new Date(item.timestamp).toLocaleString()})
                </Text>
              ))
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#007AFF',
  },
  item: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  empty: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#999',
  },
});