import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  StyleSheet,
  FlatList,
  Pressable,
  ImageBackground,
  Platform,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import colors from '../config/colors';
import routes from '../navigations/routes';
import Narrator from '../components/narrator/Narrator';
import StoryHeader from '../components/StoryHeader';
import Chat from '../components/chat/Chat';
import storage from '../storage/storage';
import { useRoute } from '@react-navigation/native';
import _ from 'lodash';
import useStore from '../store/story';
import { useIsFocused } from '@react-navigation/native';

const domain = 'http://api.xstudio-mclub.url.tw/images/update/';
const initStoryIdx = null;

// 假設每個故事項目高度（請依實際item調整）
const ITEM_HEIGHT = 120;

function StoryScreen({ route, navigation }) {
  const router = useRoute();
  const isFocus = useIsFocused();
  const {
    storyId = 1,
    chapterId,
    author = '',
    name = '',
    storyData,
    nochapter = [],
    cachedIndex = null,
    read_range_end,
  } = router.params;

  const [index, setIndex] = useState({
    story: initStoryIdx,
    screen: 0,
  });

  const [story, setStory] = useState([]);

  const [queryInfo, setQueryInfo] = useState({
    config: [],
    screenings: {},
    content: null,
    role: {},
    imageUrl: '',
  });

  const flatlistRef = useRef(null);
  const choseRef = useRef(false);

  const [shouldScrollInit, setShouldScrollInit] = useState(false);

  const cacheData = useMemo(
    () => ({
      storyId,
      chapterId,
      storyData,
      read_range_end,
      nochapter,
      cachedIndex: {
        story: index.story,
        screen: index.screen,
      },
    }),
    [queryInfo.screenings, index, router.params]
  );

  const onPressOption = (idx) => {
    if (idx) {
      if (choseRef.current) {
        return;
      } else {
        let id = 0;
        queryInfo.content?.find((e, i) => {
          if (+e.order === +idx) {
            id = i;
          }
        });
        setIndex((prev) => ({
          ...prev,
          story: id,
        }));
        choseRef.current = true;
      }
    } else {
      setIndex((prev) => ({
        ...prev,
        story: index.story === null ? 0 : index.story + 1,
      }));
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const _id = queryInfo.screenings?.[index.screen]?.id;
        if (_id) {
          const content = await axios.get(
            `http://api.xstudio-mclub.url.tw/api/v1/admin/content/${storyId}/${chapterId}/${_id}`
          );
          if (content?.data?.length) {
            const storyContent = content?.data
              ?.slice()
              .sort((a, b) => a?.order - b?.order);

            setQueryInfo((prev) => ({
              ...prev,
              content: storyContent,
              imageUrl: domain + queryInfo?.screenings?.[index.screen]?.bg_view,
            }));
            setStory([]);
          }
        } else if (!_id && index.screen >= queryInfo.screenings.length) {
          if (storyData?.chapter_type === '章節') {
            navigation.navigate(routes.CHAPTER, {
              name,
              author,
              storyId,
              storyData,
            });
          } else {
            storage.deleteStory({ storyId }, 'continueStory');
            storage.storeStory(
              { storyId, storyData, nochapter },
              'finishStory'
            );
            navigation.navigate(routes.MAIN);
          }
        }
      } catch (error) {
        console.error('API 請求失敗：', error);
      }
    };
    if (queryInfo.screenings) fetchStories();
  }, [index.screen, queryInfo.screenings]);

  useEffect(() => {
    if (!queryInfo?.content || index?.story === null) return;

    if (queryInfo?.content?.[index.story]?.contentPresent === '結尾') {
      setIndex((prev) => ({
        story: initStoryIdx,
        screen: prev.screen + 1,
      }));
    } else {
      if (shouldScrollInit) {
        console.log('開始初始化滑動');
        console.log('index.story:', index.story);
        console.log('queryInfo.content length:', queryInfo?.content?.length);
        console.log('FlatList data length:', story.length);
        console.log('滑動目標 item:', queryInfo?.content?.[index.story]);

        setStory(queryInfo?.content?.slice(0, index.story + 1));
        setShouldScrollInit(false);

        let attempts = 0;
        const maxAttempts = 5;

        const tryScroll = () => {
          if (flatlistRef.current) {
            console.log('執行 scrollToIndex, index.story:', index.story);
            flatlistRef.current.scrollToIndex({
              index: index.story,
              animated: true,
              viewPosition: 0,
            });
          } else if (attempts < maxAttempts) {
            attempts++;
            console.log(`flatlistRef 尚未就緒，重試第 ${attempts} 次`);
            setTimeout(tryScroll, 150);
          } else {
            console.log('flatlistRef 仍未就緒，放棄滑動');
          }
        };
        setTimeout(tryScroll, 100);
      } else {
        setStory((prev) => {
          const newItem = queryInfo?.content?.[index.story];
          const lastItem = prev[prev.length - 1];
          if (lastItem?.id === newItem?.id) {
            return prev;
          }
          return [...prev, newItem];
        });

        storage.storeStory(
          {
            ...cacheData,
            cachedIndex: {
              story: index.story,
              screen: index.screen,
            },
          },
          'continueStory'
        );
      }
    }
  }, [index.story, queryInfo?.content, cachedIndex?.story, shouldScrollInit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await axios.get(
          `http://api.xstudio-mclub.url.tw/api/v1/admin/setup-story-list`
        );
        const screenings = await axios.get(
          `http://api.xstudio-mclub.url.tw/api/v1/admin/screenings/${storyId}/${chapterId}`
        );

        const role = await axios.get(
          `http://api.xstudio-mclub.url.tw/api/v1/admin/role`
        );
        const roleConf = await axios.get(
          `http://api.xstudio-mclub.url.tw/api/v1/admin/setup-story-role`
        );

        const screenData = screenings?.data?.[cachedIndex?.screen ?? 0];

        setQueryInfo({
          config: config?.data[0] ?? {},
          screenings: read_range_end
            ? screenings?.data.slice(0, +read_range_end)
            : screenings?.data ?? [],
          role: role?.data ?? {},
          imageUrl: domain + screenData?.bg_view,
          roleConf: roleConf?.data?.[0],
        });
      } catch (error) {
        console.error('API 請求失敗：', error);
      }
    };
    if (cachedIndex) setShouldScrollInit(true);
    fetchData();
    setIndex({
      story: cachedIndex?.story ?? initStoryIdx,
      screen: cachedIndex?.screen ?? 0,
    });
  }, [read_range_end]);

  return (
    <ImageBackground
      fadeDuration={2000}
      style={[styles.container]}
      resizeMode="cover"
      source={
        queryInfo?.imageUrl
          ? {
            uri: queryInfo?.imageUrl,
          }
          : null
      }
    >
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        <StoryHeader
          storyName={name}
          author={author}
          config={queryInfo?.config}
        />
        <Pressable
          onPress={_.debounce(() => onPressOption(null), 200)}
          style={{
            flex: 1,
          }}
        >
          <FlatList
            data={story}
            ref={flatlistRef}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            onScrollToIndexFailed={({ index }) => {
              console.log('scrollToIndexFailed, index:', index);
              setTimeout(() => {
                flatlistRef.current?.scrollToIndex({
                  index,
                  animated: true,
                  viewPosition: 0,
                });
              }, 100);
            }}
            renderItem={({ item, index }) => {
              return (
                <>
                  {item?.contentPresent === '對話' ? (
                    <Chat
                      {...item}
                      textMsg={item?.textContent}
                      imgMsg={item?.graphy}
                      soundMsg={item?.voice}
                      videoMsg={item?.video}
                      roleList={queryInfo?.role}
                      onPressOption={onPressOption}
                      index={index}
                      roleConf={queryInfo?.roleConf}
                    />
                  ) : (
                    <Narrator
                      {...item}
                      textMsg={item?.textContent}
                      imgMsg={item?.graphy}
                      soundMsg={item?.voice}
                      videoMsg={item?.video}
                      videoDirection={item?.videoFormat}
                      index={index}
                      onPressOption={onPressOption}
                      choseRef={choseRef}
                    />
                  )}
                </>
              );
            }}
          />
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 20,
    paddingBottom: 20,
    backgroundColor: colors.dark,
  },
});

export default StoryScreen;
