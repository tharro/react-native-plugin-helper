import React from 'react';
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
  data: Array<T>;
  renderItem: ListRenderItem<T>;
  flatListProps?: FlatListProps<any>;
  onLoadMore?: () => void;
  renderItemSeparator?: React.ReactElement | null | undefined;
  itemSeparator?: number;
  isLoadMore?: boolean;
  ActivityIndicator: React.ReactElement | null | undefined;
  renderListEmpty: React.ReactElement | null | undefined;
  onRefresh?: () => void;
  refreshColor: Array<string>;
  refreshTintColor: string;
}

interface State {
  startOffset: number;
}

export default class ComponentFlatListCustom<T> extends React.Component<
  Props<T>,
  State
> {
  constructor(props: any) {
    super(props);
    this.state = {
      startOffset: 0,
    };
  }

  render() {
    return (
      <FlatList
        renderItem={this.props.renderItem}
        data={this.props.data}
        refreshControl={
          this.props.onRefresh ? (
            <RefreshControl
              colors={this.props.refreshColor}
              tintColor={this.props.refreshTintColor}
              refreshing={false}
              onRefresh={this.props.onRefresh}
            />
          ) : undefined
        }
        keyboardShouldPersistTaps={'handled'}
        keyExtractor={this._keyExtractor}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={this._renderLoadMoreIndicator()}
        ListEmptyComponent={this._renderListEmpty()}
        ItemSeparatorComponent={this._itemSeparatorComponent}
        onScrollBeginDrag={this._checkBeginScroll}
        scrollEventThrottle={15}
        onScroll={this.props.onLoadMore ? this._doLoadMore : undefined}
        {...this.props.flatListProps}
      />
    );
  }

  _itemSeparatorComponent = () => {
    if (this.props.renderItemSeparator) {
      return this.props.renderItemSeparator;
    } else {
      return <>{h(this.props.itemSeparator ?? 8)}</>;
    }
  };

  _checkBeginScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.setState({
      startOffset: e.nativeEvent.contentOffset.y,
    });
  };

  _isScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const endOffset = contentOffset.y;
    if (endOffset <= this.state.startOffset) {
      return false;
    }
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  _doLoadMore = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const canLoadMore = this._isScrollEnd(e);
    if (canLoadMore) {
      if (this.props.onLoadMore) {
        this.props.onLoadMore();
      }
    }
  };

  _keyExtractor = (item: T, index: number) =>
    `${index}_${JSON.stringify(item)}`;

  _renderLoadMoreIndicator = () => {
    if (!this.props.isLoadMore) {
      return null;
    }
    return this.props.ActivityIndicator;
  };

  _renderListEmpty = () => {
    return this.props.renderListEmpty;
  };
}
