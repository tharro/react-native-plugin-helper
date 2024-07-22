import React from 'react';
import { RefreshControl, ScrollView, StyleProp, ViewStyle } from 'react-native';

interface Props {
  isRefreshing?: boolean | undefined;
  onRefresh: () => void;
  wrapScrollView?: boolean | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  children?: React.ReactElement | undefined;
  tintColor?: string | undefined;
  colors?: string[] | undefined;
}

const RefreshingControlCustom = (props: Props) => {
  const {
    isRefreshing,
    onRefresh,
    wrapScrollView,
    style,
    children,
    tintColor,
    colors,
  } = props;

  const refreshingBuilder = (
    <RefreshControl
      colors={colors}
      refreshing={isRefreshing ?? false}
      onRefresh={onRefresh}
      tintColor={tintColor}
    />
  );

  if (wrapScrollView) {
    return (
      <ScrollView
        contentContainerStyle={style}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshingBuilder}
      >
        {children}
      </ScrollView>
    );
  }

  return refreshingBuilder;
};

export default RefreshingControlCustom;
