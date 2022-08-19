import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import {
  ChevronDownIcon,
  UserIcon,
  SearchIcon,
  AdjustmentsIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity.js';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient.fetch(
      `
        *[_type == "featured"] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->
          }
        }
      `
    )
    .then((data) => {
      setFeaturedCategories(data);
    })
  }, []);

  return (
    <SafeAreaView className="bg-white pt-3">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Locations
            <ChevronDownIcon size={18} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={28} color="#00CCBB" />
      </View>
      {/* End Header */}

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 px-3 items-center space-x-2 bg-gray-200">
          <SearchIcon color="gray" />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>

        <AdjustmentsIcon color="#00CCBB" />
      </View>
      {/* End Search */}

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
        {/* Categories */}
        <Categories />
        {/* End Categories */}

        {/* Featured Rows */}
        {
          featuredCategories?.map(category => {
            return (
              <FeaturedRow
                key={category._id}
                id={category._id}
                title={category.name}
                description={category.short_description}
              />
            )
          })
        }

        {/* End Featured Rows */}
      </ScrollView>
      {/* End Body */}
    </SafeAreaView>
  );
};

export default HomeScreen;
