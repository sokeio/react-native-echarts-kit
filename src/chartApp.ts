import * as components from 'echarts/components';
import * as charts from 'echarts/charts';
import * as echarts from 'echarts/core';
import { SVGRenderer } from './SVGRenderer';
const ChartApp = {
  use: (ext: any[]) => {
    echarts.use(ext);
  },
  setup: (ext: any[] = []) => {
    ChartApp.use([
      SVGRenderer,
      components.TitleComponent,
      components.TooltipComponent,
      components.GridComponent,
      components.LegendComponent,
      components.MarkLineComponent,
      components.MarkPointComponent,
      ...ext,
    ]);
  },
  setupAll: () => {
    ChartApp.use([
      SVGRenderer,
      ...Object.values(components),
      ...Object.values(charts),
    ]);
  },
};

export { ChartApp };
