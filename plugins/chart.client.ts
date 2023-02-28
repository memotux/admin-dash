import { Chart, registerables } from 'chart.js';

export default defineNuxtPlugin(() => {
  Chart.defaults.font.size = 16
  Chart.defaults.color = '#fff'
  Chart.register(...registerables);
});
