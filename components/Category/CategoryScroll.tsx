import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useAppSelector } from '~/redux/hooks';
import { RootState } from '~/redux/store';
import { Category } from '~/redux/slices/categories/categorySlice';

interface CategoryScrollProps {
  onCategorySelect: (categories: string[]) => void;
}

const CategoryScroll: React.FC<CategoryScrollProps> = ({ onCategorySelect }) => {
  const categoriesState = useAppSelector((state: RootState) => state.categories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((c) => c !== categoryId)
        : [...prevCategories, categoryId];
      onCategorySelect(updatedCategories);
      return updatedCategories;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {categoriesState.allIds.map((categoryId) => {
          const category: Category = categoriesState.byId[categoryId];
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategories.includes(category.id) && styles.selectedButton,
              ]}
              onPress={() => handleCategoryPress(category.id)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategories.includes(category.id) && styles.selectedText,
                ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  scrollContent: {
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
});

export default CategoryScroll;
