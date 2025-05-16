import { animations } from '@/constants';
import { MoodBotProps } from '@/types/type';
import * as GoogleGenerativeAI from '@google/generative-ai';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
const GOOGLE_AI_API_KEY = 'AIzaSyBT-P6MZ1hmRryl-a8prXIgSs7TAI9x8WE';

const MoodJournalBot = ({
  mood,
  description,
}: MoodBotProps) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [aiResponse, setAiResponse] = useState('');
  const [promptingAI, setPromptingAI] = useState(false);
  const tooltipTimeout = aiResponse ? 60000 : 11000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, tooltipTimeout);

    return () => clearTimeout(timer);
  }, []);

  const handleLinkPress = async () => {
    if (GOOGLE_AI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(
          GOOGLE_AI_API_KEY
        );
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
        });

        const prompt = `This journal entry is about my mood: ${mood} and my description: ${description}. What do you think about it? Any thoughts or suggestions? Please keep the response short and concise, around 50 words.`;

        setPromptingAI(true);

        const result = await model.generateContent(prompt);

        // Assuming `result.content` holds the generated response.
        if (result && result.response) {
          setPromptingAI(false);
          setAiResponse(result.response.text());
        } else {
          setPromptingAI(false);
          console.error('No content received from the model.');
        }
      } catch (error) {
        setPromptingAI(false);
        console.error('Error generating content:', error);
      }
    }
  };

  return (
    <View className="absolute bottom-4 right-4">
      {showTooltip && (
        <View className="bg-white p-4 rounded-lg shadow-md mb-[-24] w-64 bottom-[120px] absolute right-0">
          {aiResponse && !promptingAI &&  (
            <Text className="text-gray-800 text-sm">{aiResponse}</Text>
          )}

          {!aiResponse && !promptingAI && (
            <Text className="text-gray-800 text-sm">
              Hi 👋🏻, my name is Nash, and I can tell you what I think about your
              journal! Want to know what I think? 🤔💭{' '}
              <Text
                className="text-blue-500 underline"
                onPress={handleLinkPress}
              >
                click here
              </Text>
              .
            </Text>
          )}

          {promptingAI && (
            <Text className="text-gray-800 text-sm">
              Hold on, let me think 🤔...
            </Text>
          )}

          <View className="absolute bottom-[-6px] right-4 w-4 h-4 bg-white rotate-45" />
        </View>
      )}

      <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)} className='' >
        <LottieView
          loop
          source={animations.star}
          autoPlay
          style={{
            height: 100,
            marginTop: 20,
            width: 100,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MoodJournalBot;
