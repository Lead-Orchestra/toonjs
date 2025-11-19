import pino from 'pino';

/**
 * ToonJS Logger - EXTREME PERFORMANCE VERSION
 * 
 * Minimal overhead, maximum speed.
 * Designed to beat console.log in all scenarios.
 */

// Configure UTF-8 for Windows
if (process.platform === 'win32' && process.stdout.isTTY) {
  try {
    process.stdout.setEncoding('utf8');
  } catch (e) {
    // Ignore
  }
}

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  
  // EXTREME optimizations
  timestamp: false,        // No timestamps = faster
  base: null,              // No pid/hostname = faster
  
  formatters: {
    level: () => ({}),     // No level formatting = faster
    log: (obj) => {
      // Direct message extraction - zero overhead
      return { msg: obj.msg || '' };
    }
  },
  
  // Write directly to stdout - no intermediate processing
  serializers: {},
});

export default logger;
