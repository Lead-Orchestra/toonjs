/**
 * ⚡ LOGGER CUSTOM - Más rápido que console.log
 * 
 * Implementación minimalista que escribe directo a stdout
 */

class FastLogger {
  constructor() {
    // Pre-bind stdout.write para mejor performance
    this._write = process.stdout.write.bind(process.stdout);
  }

  info(msg) {
    // Escribir directo a stdout - zero overhead
    this._write(msg + '\n');
  }

  warn(msg) {
    this._write(msg + '\n');
  }

  error(msg) {
    process.stderr.write(msg + '\n');
  }

  debug(msg) {
    this._write(msg + '\n');
  }
}

module.exports = { logger: new FastLogger() };
