import React, { useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';
import { h } from '../../extensions';

interface Props<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  flatListProps?: FlatListProps<any>;
  onLoadMore?: () => void;
  renderItemSeparator?: React.ReactElement | null | undefined;
  itemSeparator?: number;
  isLoadMore?: boolean;
  ActivityIndicator: React.ReactElement | null | undefined;
  onRefresh?: () => void;
  refreshColor: string[];
  refreshTintColor: string;
  refreshing: boolean;
}

const ComponentFlatListCustom = <T,>(props: Props<T>) => {
  const [startOffset, setStartOffset] = useState<number>(0);

  const itemSeparatorComponent = () => {
    if (props.renderItemSeparator) {
      return props.renderItemSeparator;
    } else {
      return <>{h(props.itemSeparator ?? 8)}</>;
    }
  };

  const checkBeginScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setStartOffset(e.nativeEvent.contentOffset.y);
  };

  const isScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const endOffset = contentOffset.y;
    if (endOffset <= startOffset) {
      return false;
    }
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const doLoadMore = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const canLoadMore = isScrollEnd(e);
    if (canLoadMore) {
      if (props.onLoadMore) {
        props.onLoadMore();
      }
    }
  };

  const keyExtractor = (item: T, index: number) =>
    `${index}_${JSON.stringify(item)}`;

  const renderLoadMoreIndicator = () => {
    if (!props.isLoadMore) {
      return null;
    }
    return props.ActivityIndicator;
  };

  return (
    <FlatList
      renderItem={props.renderItem}
      data={props.data}
      refreshControl={
        props.onRefresh ? (
          <RefreshControl
            colors={props.refreshColor}
            tintColor={props.refreshTintColor}
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
          />
        ) : undefined
      }
      keyboardShouldPersistTaps={'handled'}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderLoadMoreIndicator()}
      ItemSeparatorComponent={itemSeparatorComponent}
      onScrollBeginDrag={checkBeginScroll}
      scrollEventThrottle={15}
      onScroll={props.onLoadMore ? doLoadMore : undefined}
      {...props.flatListProps}
    />
  );
};

export default ComponentFlatListCustom;
