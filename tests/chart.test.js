const { initProgressChart, initIncomeChart } = require('../js/script');

describe('chart initialization', () => {
  beforeEach(() => {
    global.Chart = jest.fn();
  });

  test('initProgressChart uses correct data', () => {
    document.body.innerHTML = `
      <span id="paidAmount"></span>
      <span id="remainingAmount"></span>
      <canvas id="progressChart"></canvas>
    `;

    initProgressChart();

    expect(global.Chart).toHaveBeenCalled();
    const args = global.Chart.mock.calls[0][1];
    expect(args.data.datasets[0].data).toEqual([3000, 6000]);
  });

  test('initIncomeChart uses correct data', () => {
    document.body.innerHTML = `
      <span id="totalIncome"></span>
      <span id="pendingIncome"></span>
      <canvas id="incomeChart"></canvas>
    `;

    initIncomeChart();

    expect(global.Chart).toHaveBeenCalled();
    const args = global.Chart.mock.calls[0][1];
    expect(args.data.datasets[0].data).toEqual([9000, 1500]);
  });
});
