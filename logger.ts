import pino from 'pino';

/**
 * ToonJS Logger - Optimized logging with Pino.js
 * 
 * Usage:
 *   Production: Set NODE_ENV=production for JSON output
 *   Development: Colored output with proper UTF-8 encoding
 * 
 * Performance: ~5x faster than console.log in production
 */

// Configure Windows console for UTF-8 if on Windows
if (process.platform === 'win32' && process.stdout.isTTY) {
  try {
    // Set UTF-8 encoding for proper emoji/unicode display
    process.stdout.setEncoding('utf8');
  } catch (e) {
    // Silently fail if encoding cannot be set
  }
}

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // In production, use fast binary serialization
  // In development, use colorized pretty printing
  ...(process.env.NODE_ENV === 'production' 
    ? {
        // Fast structured logging for production
        formatters: {
          level: (label) => ({ level: label }),
        },
      }
    : {
        // Development: colorized pretty output with UTF-8 support
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
            singleLine: false,
            messageFormat: '{msg}',
          },
        },
      }),
});

export default logger;
