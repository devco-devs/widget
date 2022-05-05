import React from 'react';
import { Text, View } from 'react-native';

import { feedbackTypes } from '../../utils/feedbackTypes';

import { FeedbackType } from '../Widget';
import { Option } from '../Option';
import { Copyright } from '../Copyright';

import { styles } from './styles';

type Props = {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
};

export function Options({ onFeedbackTypeChanged }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
          />
        ))}
      </View>

      <Copyright />
    </View>
  );
}
