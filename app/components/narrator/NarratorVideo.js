import React, { useRef, useMemo, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import colors from '../../config/colors';

const screenWidth = Dimensions.get('window').width;

function NarratorVideo({ videoMsg, videoDirection }) {
  const video = useRef(null);

  const videoUrl = 'http://api.xstudio-mclub.url.tw/images/update/' + videoMsg;

  const videoStyle = useMemo(
    () =>
      videoDirection === '橫'
        ? { width: screenWidth, height: screenWidth * (9 / 16) }
        : { width: screenWidth, height: screenWidth * (16 / 9) },
    [videoDirection]
  );

  const onLoad = useCallback(async () => {
    if (!video.current) {
      console.warn('[NarratorVideo] video ref is null onLoad');
      return;
    }
    console.log('[NarratorVideo] onLoad fired, try playAsync');
    try {
      const status = await video.current.playAsync();
      console.log('[NarratorVideo] playAsync success:', status);
    } catch (error) {
      console.error('[NarratorVideo] playAsync error:', error);
    }
  }, []);

  const onPlaybackStatusUpdate = useCallback(status => {
    //console.log('[NarratorVideo] onPlaybackStatusUpdate:', status);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={videoStyle}
        source={{ uri: videoUrl }}
        resizeMode="contain"
        shouldPlay={false}
        onLoad={onLoad}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
  },
});

export default React.memo(NarratorVideo);
