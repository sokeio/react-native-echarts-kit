import { EChartsOption } from 'echarts';
import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useImperativeHandle,
} from 'react';
import { useEffect, useRef, useState } from 'react';
import { View, ViewProps } from 'react-native';
import SvgChart from './svgChart';
import * as echarts from 'echarts/core';
export type ChartViewProps = ViewProps & {
  option?: EChartsOption;
  theme?: string;
  height?: number | Function;
  width?: number | Function;
};

const ChartView = (
  {
    style,
    option,
    theme = 'light',
    height = ({ _height }: any) => _height,
    width = ({ _width }: any) => _width,
  }: ChartViewProps,
  ref: ForwardedRef<(echarts.ECharts & any) | null>
) => {
  const chartRef = useRef<any>(null);
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const [chart, setChart] = useState<echarts.ECharts | undefined>();
  useEffect(() => {
    let _chart: echarts.ECharts;
    if (chartWidth > 0 && chartHeight > 0) {
      if (chartRef.current) {
        if (chart) {
          chart.setOption<EChartsOption>(option ?? {});
        } else {
          // @ts-ignore
          _chart = echarts.init(chartRef.current, theme, {
            renderer: 'svg',
            height: chartHeight,
            width: chartWidth,
          });
          _chart.setOption<EChartsOption>(option ?? {});
          setChart(_chart);
        }
      }
    }
  }, [option, theme, chartHeight, chartWidth, chart]);

  useImperativeHandle(ref, () => chart, [chart]);

  useEffect(() => {
    if (typeof height === 'number' && height > 0) {
      setChartHeight(height);
    } else if (typeof height === 'function') {
      let _h = height({ _width: viewWidth, _height: viewHeight });
      if (_h && _h > 0) setChartHeight(_h);
    } else {
      setChartHeight(viewHeight);
    }
  }, [height, viewHeight, viewWidth]);

  useEffect(() => {
    if (typeof width === 'number' && width > 0) {
      setChartWidth(width);
    } else if (viewWidth > 0 && typeof width === 'function') {
      let _w = width({ _width: viewWidth, _height: viewHeight });
      if (_w) setChartWidth(_w);
    } else {
      setChartWidth(viewWidth);
    }
  }, [width, viewWidth, viewHeight]);

  return (
    <View
      onLayout={(ev) => {
        setViewHeight(Math.round(ev.nativeEvent.layout.height));
        setViewWidth(Math.round(ev.nativeEvent.layout.width));
      }}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[style, { flex: 1, height: '100%', width: '100%' }]}
    >
      <SvgChart ref={chartRef} />
    </View>
  );
};
export default memo(forwardRef(ChartView));
