/**
 * 🚀 ANÁLISIS EMPRESARIAL - VERSION LOGGER EXTREMO
 * 
 * Usa logger-extreme.ts para máximo rendimiento
 */

const { ToonFactory } = require('./dist/factory');
const { Toon } = require('./dist/toon');
const fs = require('fs');

// Importar logger extremo
const pino = require('pino');

// Logger ultra-optimizado - solo mensaje, sin overhead
const logger = pino({
  level: 'info',
  timestamp: false,
  base: null,
  formatters: {
    level: () => ({}),
    log: (obj) => obj.msg || ''
  }
});

// Wrapper para imitar console.log exactamente
const log = {
  info: (msg) => {
    // Write directo a stdout - bypass completamente el formateo de Pino
    process.stdout.write(msg + '\n');
  }
};

// Usar el wrapper
global.logger = log;

// Copiar todo el código de analisis-empresarial.js pero usando el logger directo
