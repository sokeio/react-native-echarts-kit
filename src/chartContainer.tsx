import { EChartsOption } from 'echarts';
import React, { ForwardedRef, forwardRef, memo } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import ViewChart from './chartView';

export type ChartContainerProps = ViewProps & {
  option?: EChartsOption;
  theme?: string;
  height?: number | Function;
  width?: number | Function;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  lazyloading?: boolean;
};

const ChartContainer = (
  {
    style,
    option,
    theme = 'light',
    height,
    width,
    containerStyle,
    lazyloading,
  }: ChartContainerProps,
  ref: ForwardedRef<(echarts.ECharts & any) | null>
) => {
  return (
    <View style={containerStyle}>
      <ViewChart
        ref={ref}
        style={style}
        option={option}
        theme={theme}
        height={height}
        width={width}
        lazyloading={lazyloading}
      />
    </View>
  );
};
export default memo(forwardRef(ChartContainer));
