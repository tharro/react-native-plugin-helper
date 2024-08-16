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
    style,
    children,
    tintColor,
    colors,
    scrollStyle,
  } = props;

  return (
    <View style={[style, { flex: 1 }]}>
      <ScrollView
        contentContainerStyle={scrollStyle}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={colors}
            refreshing={isRefreshing ?? false}
            onRefresh={onRefresh}
            tintColor={tintColor}
          />
        }
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default RefreshingControlCustom;
