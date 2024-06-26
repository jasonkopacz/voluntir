import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreatePostScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>
      <Text>Here you can create a new post.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CreatePostScreen;
