import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  isRefreshing?: boolean | undefined;
  onRefresh: () => void;
  wrapScrollView?: boolean | undefined;
  scrollStyle?: StyleProp<ViewStyle> | undefined;
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
    scrollStyle,
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
      <View style={[style, { flex: 1 }]}>
        <ScrollView
          style={scrollStyle}
          contentContainerStyle={scrollStyle}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={refreshingBuilder}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return refreshingBuilder;
};

export default RefreshingControlCustom;
