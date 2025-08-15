import { useLocalSearchParams } from 'expo-router';
import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const allResources: Record<string, { title: string; url: string; thumbnail: string }[]> = {
  Visionary: [
    {
      title: 'Startup Idea Sketchpad',
      url: 'https://example.com/startup-sketchpad.pdf',
      thumbnail: 'https://img.icons8.com/color/60/lightbulb--v1.png',
    },
    {
      title: 'Creative Brief Template',
      url: 'https://example.com/creative-brief.docx',
      thumbnail: 'https://img.icons8.com/color/60/paint-palette.png',
    },
  ],
  Builder: [
    {
      title: 'Beginner Coding Guide',
      url: 'https://example.com/coding-guide.pdf',
      thumbnail: 'https://img.icons8.com/color/60/source-code.png',
    },
    {
      title: 'GitHub Starter Kit',
      url: 'https://example.com/github-kit.zip',
      thumbnail: 'https://img.icons8.com/color/60/github.png',
    },
  ],
  Nurturer: [
    {
      title: 'Coaching Worksheet',
      url: 'https://example.com/coaching-worksheet.pdf',
      thumbnail: 'https://img.icons8.com/color/60/handshake.png',
    },
    {
      title: 'Encouragement Post Template',
      url: 'https://example.com/post-template.docx',
      thumbnail: 'https://img.icons8.com/color/60/heart-with-ribbon.png',
    },
  ],
  Strategist: [
    {
      title: 'Business Plan Template',
      url: 'https://example.com/business-plan.docx',
      thumbnail: 'https://img.icons8.com/color/60/strategy-board.png',
    },
    {
      title: 'Workflow Builder',
      url: 'https://example.com/workflow-builder.xlsx',
      thumbnail: 'https://img.icons8.com/color/60/process.png',
    },
  ],
  Messenger: [
    {
      title: 'Podcast Starter Kit',
      url: 'https://example.com/podcast-kit.pdf',
      thumbnail: 'https://img.icons8.com/color/60/microphone.png',
    },
    {
      title: 'Storytelling Script Template',
      url: 'https://example.com/story-script.docx',
      thumbnail: 'https://img.icons8.com/color/60/storytelling.png',
    },
  ],
  "Strategic Organizer": [
  {
    title: '🧠 Decision-Making & Learning Pack',
    url: 'https://example.com/strategic-learning-pack.pdf',
    thumbnail: 'https://img.icons8.com/color/60/open-book--v2.png',
  },
  {
    title: '🗂️ Planning & Organization Toolkit',
    url: 'https://example.com/planning-toolkit.pdf',
    thumbnail: 'https://img.icons8.com/color/60/task.png',
  },
  {
    title: '📊 Templates & Frameworks Pack',
    url: 'https://example.com/templates-pack.zip',
    thumbnail: 'https://img.icons8.com/color/60/template.png',
  },
  {
    title: '🌐 Networking & Mastermind Guide',
    url: 'https://example.com/networking-guide.pdf',
    thumbnail: 'https://img.icons8.com/color/60/conference-call.png',
  },
  {
    title: '⏳ Personal Effectiveness System',
    url: 'https://example.com/effectiveness-system.pdf',
    thumbnail: 'https://img.icons8.com/color/60/time-management.png',
  },
],
};

export default function DownloadsScreen() {
  const { profile } = useLocalSearchParams();
  const resources = allResources[profile as string] || [];

  const handleDownload = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      alert("Sorry, we couldn't open this file.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Resources for {profile}</Text>
      {resources.length === 0 ? (
        <Text style={styles.subtitle}>No resources found for this profile.</Text>
      ) : (
        <FlatList
          data={resources}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleDownload(item.url)}>
              <View style={styles.row}>
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                <Text style={styles.buttonText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});