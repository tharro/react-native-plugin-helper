import React, { useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
  RefreshControl,
} from 'react-native';
import { h } from '../../extensions';
import ListModel from 'src/models/ListModel';
import Styles from './styles';
import RefreshingControlCustom from '../refreshingControl/RefreshingControlCustom';

interface Props<T> {
  data: ListModel<T>;
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
  errorBuilder: (error: string) => React.ReactElement;
  emptyBuilder: React.ReactElement;
  loadingBuilder: React.ReactElement;
  wrapScrollView?: boolean | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  scrollStyle?: StyleProp<ViewStyle> | undefined;
  onRef?: (r: FlatList<T> | null) => void;
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

  if (props.data?.isLoading) {
    return props.loadingBuilder;
  }

  if (
    props.data?.errorMessage != undefined &&
    props.data!.errorMessage!.length > 0
  ) {
    return (
      <RefreshingControlCustom
        style={[Styles.scroll, props.style]}
        scrollStyle={props.scrollStyle}
        colors={props.refreshColor}
        isRefreshing={props.refreshing}
        tintColor={props.refreshTintColor}
        onRefresh={() => {
          if (props.onRefresh != undefined) {
            props.onRefresh!();
          }
        }}
      >
        {props.errorBuilder(props.data!.errorMessage!)}
      </RefreshingControlCustom>
    );
  }

  if (props.data?.results != undefined && props.data!.results!.length == 0) {
    return (
      <RefreshingControlCustom
        isRefreshing={props.refreshing}
        scrollStyle={props.scrollStyle}
        colors={props.refreshColor}
        style={[Styles.scroll, props.style]}
        tintColor={props.refreshTintColor}
        onRefresh={() => {
          if (props.onRefresh != undefined) {
            props.onRefresh!();
          }
        }}
      >
        {props.emptyBuilder}
      </RefreshingControlCustom>
    );
  }

  return (
    <FlatList
      removeClippedSubviews
      initialNumToRender={20}
      renderItem={props.renderItem}
      data={props.data?.results ?? []}
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
      ref={(r) => {
        if (props.onRef) {
          props.onRef(r);
        }
      }}
    />
  );
};

export default ComponentFlatListCustom;
