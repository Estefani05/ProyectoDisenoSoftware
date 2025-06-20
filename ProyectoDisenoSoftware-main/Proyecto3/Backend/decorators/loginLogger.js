function withLoginLogging(originalFunction, logFn) {
  return async function (...args) {
    const result = await originalFunction(...args);

    if (result.success && typeof logFn === 'function') {
      await logFn(result.usuario); // Pasamos el usuario para el log
    }

    return result;
  };
}

module.exports = { withLoginLogging };
