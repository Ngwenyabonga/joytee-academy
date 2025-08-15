import { Link, router, useLocalSearchParams } from 'expo-router';
import { Button, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResultsScreen() {
  const { profile } = useLocalSearchParams();

  const careerPaths: Record<string, string[]> = {
    Visionary: [
      "Startup Founder — build what doesn’t exist yet",
      "Creative Director — shape stories that move hearts",
      "Innovation Consultant — help others think beyond limits"
    ],
    Nurturer: [
      "Life Coach — guide others toward healing and growth",
      "HR Specialist — create safe, thriving workplaces",
      "Community Organizer — uplift voices and build unity"
    ],
    Strategist: [
      "Project Manager — turn vision into action",
      "Operations Analyst — optimize systems with precision",
      "Business Strategist — align purpose with profit"
    ],
    Builder: [
      "Software Developer — solve problems with code",
      "Engineer — design solutions that last",
      "Data Scientist — uncover truth through numbers"
    ],
    Messenger: [
      "Content Creator — inspire through words and visuals",
      "Brand Strategist — give ideas a powerful voice",
      "Public Speaker — move audiences with truth and passion"
    ]
  };

  const paths = careerPaths[profile as string] || [];

  const handleShare = () => {
    const message = `JoyTee Academy helped me discover my career clarity.\n\nTop paths for me:\n• ${paths.map(p => p.split(' — ')[0]).join('\n• ')}\n\nReady to find yours?`;
    Share.share({ message });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 You’re a {profile}!</Text>
      <Text style={styles.description}>
        This means you shine when you lean into your strengths. Here's how to take your next step:
      </Text>

      {renderCareerPaths(profile as string)}
      {renderNextSteps(profile as string)}

      <Text style={styles.scripture}>
        “Commit to the Lord whatever you do, and He will establish your plans.” — Proverbs 16:3
      </Text>

      <Button title="🔁 Retake Quiz" onPress={() => router.replace('/quiz')} />
      <Button title="📤 Share Your Career Clarity" onPress={handleShare} />

      <Link href={{ pathname: '/downloads', params: { profile } }} asChild>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>📥 View Downloadable Resources</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/analytics" asChild>
        <TouchableOpacity style={styles.analyticsButton}>
          <Text style={styles.analyticsButtonText}>📊 View Analytics Tracker</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

function renderCareerPaths(profile: string) {
  const careerPaths: Record<string, string[]> = {
    Visionary: [
      "Startup Founder — build what doesn’t exist yet",
      "Creative Director — shape stories that move hearts",
      "Innovation Consultant — help others think beyond limits"
    ],
    Nurturer: [
      "Life Coach — guide others toward healing and growth",
      "HR Specialist — create safe, thriving workplaces",
      "Community Organizer — uplift voices and build unity"
    ],
    Strategist: [
      "Project Manager — turn vision into action",
      "Operations Analyst — optimize systems with precision",
      "Business Strategist — align purpose with profit"
    ],
    Builder: [
      "Software Developer — solve problems with code",
      "Engineer — design solutions that last",
      "Data Scientist — uncover truth through numbers"
    ],
    Messenger: [
      "Content Creator — inspire through words and visuals",
      "Brand Strategist — give ideas a powerful voice",
      "Public Speaker — move audiences with truth and passion"
    ]
  };

  const paths = careerPaths[profile] || [];

  return (
    <>
      <Text style={styles.subtitle}>Career paths to explore:</Text>
      {paths.map((path, index) => (
        <Text key={index} style={styles.career}>• {path}</Text>
      ))}
    </>
  );
}

function renderNextSteps(profile: string) {
  switch (profile) {
    case 'Visionary':
      return (
        <>
          <Text style={styles.subtitle}>What to do next:</Text>
          <Text style={styles.career}>• Sketch an app idea or product you wish existed</Text>
          <Text style={styles.career}>• Explore tools like Figma or Canva</Text>
          <Text style={styles.career}>• Follow a founder or innovator on LinkedIn</Text>
        </>
      );
    case 'Strategist':
    case 'Strategic Organizer':
      return (
        <>
          <Text style={styles.subtitle}>What to do next:</Text>
          <Text style={styles.career}>• Map out a simple business plan or workflow</Text>
          <Text style={styles.career}>• Learn Notion, Trello, or Airtable</Text>
          <Text style={styles.career}>• Join a productivity or finance community and follow a leader on LinkedIn</Text>
        </>
      );
    case 'Nurturer':
      return (
        <>
          <Text style={styles.subtitle}>What to do next:</Text>
          <Text style={styles.career}>• Write a short blog or post that encourages someone</Text>
          <Text style={styles.career}>• Explore coaching or mentoring platforms</Text>
          <Text style={styles.career}>• Follow a therapist, coach, or educator on Instagram and LinkedIn</Text>
        </>
      );
    case 'Builder':
      return (
        <>
          <Text style={styles.subtitle}>What to do next:</Text>
          <Text style={styles.career}>• Try a free coding or DIY tutorial</Text>
          <Text style={styles.career}>• Explore platforms like GitHub or Makerpad</Text>
          <Text style={styles.career}>• Follow a builder or engineer on YouTube or LinkedIn</Text>
        </>
      );
    case 'Messenger':
      return (
        <>
          <Text style={styles.subtitle}>What to do next:</Text>
          <Text style={styles.career}>• Record a voice note or video sharing your story</Text>
          <Text style={styles.career}>• Explore podcasting or public speaking groups</Text>
          <Text style={styles.career}>• Follow a storyteller or speaker on TikTok or LinkedIn</Text>
        </>
      );
    default:
      return (
        <>
          <Text style={styles.subtitle}>Hmm...</Text>
          <Text style={styles.career}>We couldn’t find your profile — try retaking the quiz!</Text>
        </>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#444',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  career: {
    fontSize: 16,
    marginBottom: 6,
    textAlign: 'center',
  },
  scripture: {
    fontSize: 14,
    marginTop: 30,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
  downloadButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  analyticsButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    width: '100%',
  },
  analyticsButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});