# [![](./logo.svg)](https://BytePlatform.github.io/react-native-echarts-kit/)

[![npm version](https://img.shields.io/npm/v/react-native-echarts-kit.svg?style=flat)](https://www.npmjs.com/package/react-native-echarts-kit)
[![npm downloads](https://img.shields.io/npm/dm/react-native-echarts-kit)](https://www.npmjs.com/package/react-native-echarts-kit)
[![issues](https://img.shields.io/github/issues/BytePlatform/react-native-echarts-kit.svg?style=flat)](https://github.com/BytePlatform/react-native-echarts-kit/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/BytePlatform/react-native-echarts-kit.svg?style=flat)](https://github.com/BytePlatform/react-native-echarts-kit/graphs/contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/BytePlatform/react-native-echarts-kit/pulls)
[![license](https://img.shields.io/github/license/BytePlatform/react-native-echarts-kit.svg?style=flat)](https://github.com/BytePlatform/react-native-echarts-kit/blob/main/LICENSE)


[React Native](https://reactnative.dev/) version of [Apache Echarts](https://github.com/apache/echarts), based on [react-native-svg](https://github.com/software-mansion/react-native-svg). This awesome library offers significantly improved performance compared to WebView-based solutions.

Checkout the full documentation [here](https://BytePlatform.github.io/react-native-echarts-kit/) or [https://bit-sudo.com/open-source/react-native-echarts-kit](https://bit-sudo.com/open-source/react-native-echarts-kit).
## About

- 🔥 The same usage as Apache ECharts
- 🎨 Rich charts, covering almost all usage scenarios
- ✨ Optional rendering library: [SVG](https://github.com/software-mansion/react-native-svg)
- 📱 Support gestures such as tapping, dragging and zooming

## Installation

```sh
yarn add react-native-echarts-kit echarts react-native-gesture-handler zrender
```

Install [react-native-svg](https://github.com/software-mansion/react-native-svg#installation) according to your needs.

> The latest versions of echarts, react-native-svg are recommended

## Usage

![example](https://raw.githubusercontent.com/BytePlatform/react-native-echarts-kit/main/screenshots/example.jpg)

### Example

```js
import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {
  ChartApp,
  ChartContainer,
  ChartViewRer,
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
  const refChart = React.useRef<ChartViewRer>(null);
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
```
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](./LICENSE)
