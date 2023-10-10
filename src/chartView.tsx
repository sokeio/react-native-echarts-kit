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
import { ChartViewRef } from './types';
export type ChartViewProps = ViewProps & {
  option?: EChartsOption;
  theme?: string;
  height?: number | Function;
  width?: number | Function;
  lazyloading?: boolean;
};
const LazyLoadingChartView = memo(
  forwardRef(
    (
      { option, width, height, theme }: any,
      ref: ForwardedRef<ChartViewRef>
    ) => {
      const [chart, setChart] = useState<echarts.ECharts | undefined>();
      const chartRef = useRef<any>(null);
      useEffect(() => {
        let _chart: echarts.ECharts;
        if (chartRef.current) {
          if (!chart) {
            // @ts-ignore
            _chart = echarts.init(chartRef.current, theme, {
              renderer: 'svg',
              height,
              width,
            });
            _chart.setOption<EChartsOption>(option ?? {});
            setChart(_chart);
          }
        }
      }, [option, theme, chart, chartRef, height, width]);
      useEffect(() => {
        if (chart) {
          chart.setOption<EChartsOption>(option ?? {});
        }
      }, [chart, option]);
      useEffect(() => {
        if (chart) {
          chart.resize({
            height,
            width,
          });
        }
      }, [height, width, chart]);
      useImperativeHandle(
        ref,
        () => ({
          // eslint-disable-next-line @typescript-eslint/no-shadow
          setOption: (option: any, ops: any = undefined) => {
            chart?.setOption(option, ops);
          },
          getChart: () => chart,
        }),
        [chart]
      );
      return <SvgChart ref={chartRef} />;
    }
  )
);
const ChartView = (
  {
    style,
    option,
    theme = 'light',
    height = ({ _height }: any) => _height,
    width = ({ _width }: any) => _width,
    lazyloading = true,
  }: ChartViewProps,
  ref: ForwardedRef<ChartViewRef>
) => {
  const chartRef = useRef<any>(null);
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const [LazyLoadingFlg, setLazyLoadingFlg] = useState(lazyloading);
  useEffect(() => {
    if (LazyLoadingFlg) {
      setTimeout(() => {
        setLazyLoadingFlg(false);
      }, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setOption: (option: any, ops: any = undefined) => {
        chartRef.current?.setOption(option, ops);
      },
      getChart: () => chartRef.current?.getChart(),
    }),
    [chartRef]
  );

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
      {!LazyLoadingFlg && chartWidth && chartHeight ? (
        <LazyLoadingChartView
          option={option}
          theme={theme}
          width={chartWidth}
          height={chartHeight}
          ref={chartRef}
        />
      ) : null}
    </View>
  );
};
export default memo(forwardRef(ChartView));
