import React, { useEffect } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

import { motion } from '@/constants/theme';

type Props = {
  size?: number;
  float?: boolean;
};

export function StackMark({ size = 148, float = true }: Props) {
  const y = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!float) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(y, {
          toValue: -10,
          duration: motion.homeFloat / 2,
          useNativeDriver: true,
        }),
        Animated.timing(y, {
          toValue: 0,
          duration: motion.homeFloat / 2,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [float, y]);

  return (
    <Animated.View style={{ transform: [{ translateY: float ? y : 0 }] }}>
      <View style={[styles.glow, { width: size * 1.15, height: size * 1.15 }]} />
      <Image
        source={require('../../assets/logo-mark.png')}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    alignSelf: 'center',
    top: '8%',
    borderRadius: 999,
    backgroundColor: 'rgba(45,212,191,0.18)',
  },
});
