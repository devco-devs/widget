import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { api } from '../../libs/api';
import { feedbackTypes } from '../../utils/feedbackTypes';

import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { SubmitButton } from '../SubmitButton';

import { theme } from '../../theme';
import { styles } from './styles';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceleld: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceleld,
  onFeedbackSent,
}: Props) {
  const [screenshotURI, setScreenshotURI] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState('');
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then((uri) => setScreenshotURI(uri))
      .catch((err) => console.log(err));
  }

  function handleScreenshotRemove() {
    setScreenshotURI(null);
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) return;

    setIsSendingFeedback(true);

    const screenshot =
      screenshotURI &&
      (await FileSystem.readAsStringAsync(screenshotURI, {
        encoding: 'base64',
      }));

    try {
      await api
        .post('/feedbacks', {
          type: feedbackType,
          comment,
          screenshot: `data:image/png;base64,${screenshot}`,
        })
        .then((res) => console.log('res: ', res));

      onFeedbackSent();
      setIsSendingFeedback(false);
    } catch (err) {
      console.error(err);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceleld}>
          <ArrowLeft
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        onChangeText={setComment}
        placeholder='Conte com detalhes o que está acontecendo... '
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeScreenshot={handleScreenshot}
          onRemoveScreenshot={handleScreenshotRemove}
          screenshot={screenshotURI}
        />
        <SubmitButton
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>
    </View>
  );
}
