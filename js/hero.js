// Mostrar valor del rango de precio
const rango = document.querySelector('.price-range input[type="range"]');
const salida = document.querySelector('output[name="precio-output"]');
if (rango && salida) {
  rango.addEventListener('input', () => {
    salida.value = `${rango.value} €`;
  });
}
