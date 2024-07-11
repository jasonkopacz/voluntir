import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setCategoryIds,
  setAvailableDays,
  setPreferredDistance,
  setNotificationPreferences,
} from '../../redux/slices/users/userPreferencesSlice';
import { setOnboardingComplete } from '../../redux/slices/users/userSlice';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const OnboardingQuestionnaire: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.ids);
  const [step, setStep] = useState(0);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [distance, setDistance] = useState(10);
  const [notifications, setNotifications] = useState({ email: true, push: true });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      dispatch(setCategoryIds(selectedCategoryIds));
      dispatch(setAvailableDays(selectedDays));
      dispatch(setPreferredDistance(distance));
      dispatch(setNotificationPreferences(notifications));

      dispatch(setOnboardingComplete());
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View>
            <Text style={styles.questionText}>What categories of volunteer work interest you?</Text>
            {Object.values(categories).map((category) => (
              <TouchableOpacity
                key={category.id}
                testID={category.id}
                style={[
                  styles.optionButton,
                  selectedCategoryIds.includes(category.id) && styles.selectedOption,
                ]}
                onPress={() =>
                  setSelectedCategoryIds((prev) =>
                    prev.includes(category.id)
                      ? prev.filter((id) => id !== category.id)
                      : [...prev, category.id]
                  )
                }>
                <Text
                  style={[
                    styles.optionText,
                    selectedCategoryIds.includes(category.id) && styles.selectedOptionText,
                  ]}>
                  {category.name}
                </Text>
                {selectedCategoryIds.includes(category.id) && (
                  <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        );
      case 1:
        return (
          <View>
            <Text style={styles.questionText}>Which days are you usually available?</Text>
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                testID={day}
                style={[styles.optionButton, selectedDays.includes(day) && styles.selectedOption]}
                onPress={() =>
                  setSelectedDays((prev) =>
                    prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
                  )
                }>
                <Text
                  style={[
                    styles.optionText,
                    selectedDays.includes(day) && styles.selectedOptionText,
                  ]}>
                  {day}
                </Text>
                {selectedDays.includes(day) && (
                  <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.questionText}>How far are you willing to travel for events?</Text>
            {[5, 10, 25, 50].map((d) => (
              <TouchableOpacity
                key={d}
                testID={d.toString()}
                style={[styles.optionButton, distance === d && styles.selectedOption]}
                onPress={() => setDistance(d)}>
                <Text style={[styles.optionText, distance === d && styles.selectedOptionText]}>
                  {d} miles
                </Text>
                {distance === d && <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />}
              </TouchableOpacity>
            ))}
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.questionText}>Notification preferences:</Text>
            <TouchableOpacity
              style={[styles.optionButton, notifications.email && styles.selectedOption]}
              testID="email"
              onPress={() => setNotifications((prev) => ({ ...prev, email: !prev.email }))}>
              <Text style={[styles.optionText, notifications.email && styles.selectedOptionText]}>
                Email notifications
              </Text>
              {notifications.email && (
                <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, notifications.push && styles.selectedOption]}
              testID="push"
              onPress={() => setNotifications((prev) => ({ ...prev, push: !prev.push }))}>
              <Text style={[styles.optionText, notifications.push && styles.selectedOptionText]}>
                Push notifications
              </Text>
              {notifications.push && <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />}
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>Let's personalize your experience</Text>
        <View style={styles.progressContainer}>
          {[0, 1, 2, 3].map((s) => (
            <View key={s} style={[styles.progressDot, s <= step && styles.activeDot]} />
          ))}
        </View>
        {renderStep()}
      </ScrollView>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>{step < 3 ? 'Next' : 'Finish'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D1D1D1',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    padding: 15,
    margin: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingQuestionnaire;
