import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const questions = [
  {
    question: "What excites you most?",
    options: [
      { text: "Building something from scratch", profile: "Visionary" },
      { text: "Helping others grow", profile: "Nurturer" },
      { text: "Organizing systems", profile: "Strategic Organizer" },
      { text: "Solving tough problems", profile: "Builder" },
      { text: "Exploring new ideas", profile: "Messenger" }
    ]
  },
  {
    question: "Which environment energizes you?",
    options: [
      { text: "Creative and flexible", profile: "Visionary" },
      { text: "Supportive and people-focused", profile: "Nurturer" },
      { text: "Structured and goal-oriented", profile: "Strategic Organizer" },
      { text: "Fast-paced and analytical", profile: "Builder" },
      { text: "Dynamic and ever-changing", profile: "Messenger" }
    ]
  },
  {
    question: "What’s your superpower?",
    options: [
      { text: "Vision and innovation", profile: "Visionary" },
      { text: "Empathy and encouragement", profile: "Nurturer" },
      { text: "Planning and execution", profile: "Strategic Organizer" },
      { text: "Critical thinking", profile: "Builder" },
      { text: "Curiosity and adaptability", profile: "Messenger" }
    ]
  }
];

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (profile: string) => {
    setScores(prev => ({
      ...prev,
      [profile]: (prev[profile] || 0) + 1
    }));

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  useEffect(() => {
    if (quizComplete) {
      const entries = Object.entries(scores);
      if (entries.length === 0) return;

      const topEntry = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
      const topProfile = topEntry[0];
      router.replace({ pathname: '/results', params: { profile: topProfile } });
    }
  }, [quizComplete, scores]);

  const question = questions[currentQuestion];

  return (
  <View style={styles.container}>
    <Text style={styles.progress}>
      Question {currentQuestion + 1} of {questions.length}
    </Text>
    <Text style={styles.question}>{question.question}</Text>
    {question.options.map((option, index) => (
      <View key={index} style={styles.button}>
        <Button title={option.text} onPress={() => handleAnswer(option.profile)} />
      </View>
    ))}
  </View>
);
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  progress: { fontSize: 16, color: '#666', marginBottom: 10, textAlign: 'center' },
  question: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: { marginVertical: 5 }
});