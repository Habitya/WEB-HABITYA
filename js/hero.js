document.addEventListener('DOMContentLoaded', () => {
  const range = document.querySelector('.price-range input[type="range"]');
  const output = document.querySelector('output[name="precio-output"]');
  if (range && output) {
    output.value = `${range.value} €`;
    range.addEventListener('input', () => {
      output.value = `${range.value} €`;
    });
  }
});
