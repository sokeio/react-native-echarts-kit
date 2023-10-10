import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {
  ChartApp,
  ChartContainer,
  ChartViewRef,
} from 'react-native-echarts-kit';
import { BarChart } from 'echarts/charts';
import { EChartsOption } from 'echarts';

// register extensions
ChartApp.setup([
  // ...
  BarChart,
]);

const option: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
  ],
};
function App() {
  const refChart = React.useRef<ChartViewRef>(null);
  return (
    <View style={styles.container}>
      <ChartContainer
        ref={refChart}
        containerStyle={styles.viewChart}
        option={option}
      />
      <Button
        title="123"
        onPress={() =>
          refChart.current?.setOption({
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
              type: 'value',
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}',
            },
            series: [
              {
                data: [
                  Math.random() * 1000,
                  Math.random() * 1000,
                  Math.random() * 1000,
                  Math.random() * 1000,
                  Math.random() * 1000,
                  Math.random() * 1000,
                  Math.random() * 1000,
                ],
                type: 'bar',
              },
            ],
          })
        }
      >
        Tesst
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewChart: { height: 250, width: '100%' },
});
export default gestureHandlerRootHOC(App);
