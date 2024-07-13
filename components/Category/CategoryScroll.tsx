import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { useAppSelector } from '~/redux/hooks';
import { RootState } from '~/redux/store';
import { Category } from '~/redux/slices/categories/categorySlice';

interface CategoryScrollProps {
  onCategorySelect: (categories: string[]) => void;
  scrollY: Animated.Value;
}

const HEADER_MIN_HEIGHT = 60;
const SELECTED_ROW_HEIGHT = 40;

const CategoryScroll: React.FC<CategoryScrollProps> = ({ onCategorySelect, scrollY }) => {
  const categoriesState = useAppSelector((state: RootState) => state.categories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [containerHeight] = useState(new Animated.Value(HEADER_MIN_HEIGHT));

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((c) => c !== categoryId)
        : [...prevCategories, categoryId];
      onCategorySelect(updatedCategories);
      return updatedCategories;
    });
  };

  useEffect(() => {
    Animated.timing(containerHeight, {
      toValue:
        selectedCategories.length > 0 ? HEADER_MIN_HEIGHT + SELECTED_ROW_HEIGHT : HEADER_MIN_HEIGHT,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [selectedCategories.length]);

  const unselectedCategories = categoriesState.allIds.filter(
    (id) => !selectedCategories.includes(id)
  );

  console.log(categoriesState.byId);

  return (
    <Animated.View style={[styles.container, { height: containerHeight }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {unselectedCategories.map((categoryId) => {
          const category: Category = categoriesState.byId[categoryId];
          return (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryButton}
              onPress={() => handleCategoryPress(category.id)}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {selectedCategories.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectedCategoriesContent}>
          {selectedCategories.map((categoryId) => {
            const category: Category = categoriesState.byId[categoryId];
            return (
              <TouchableOpacity
                key={category.id}
                style={styles.selectedCategoryButton}
                onPress={() => handleCategoryPress(category.id)}>
                <Text style={styles.selectedCategoryText}>{category.name}</Text>
                <Text style={styles.removeIcon}>×</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
    zIndex: 1000,
    overflow: 'hidden',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 10,
    height: HEADER_MIN_HEIGHT,
  },
  selectedCategoriesContent: {
    alignItems: 'center',
    paddingHorizontal: 10,
    height: SELECTED_ROW_HEIGHT,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: '#007AFF',
  },
  selectedCategoryText: {
    fontSize: 12,
    color: '#fff',
    marginRight: 4,
  },
  removeIcon: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CategoryScroll;
