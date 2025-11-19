/**
 * 🏎️ BENCHMARK: Fast Logger (Custom) vs Console.log vs Pino.js
 */

const { execSync } = require('child_process');

function runBenchmark() {
  const iterations = 5;
  
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║   ⚡ BENCHMARK: Fast Logger vs Console vs Pino               ║');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('');
  console.log('');
  
  // Benchmark Fast Logger
  console.log('⚡ Ejecutando: Fast Logger (stdout directo)...');
  console.log('─'.repeat(70));
  const fastTimes = [];
  
  for (let i = 0; i < iterations; i++) {
    const output = execSync('node analisis-empresarial-fast.js 2>&1', { 
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024, // 50MB buffer
      env: { ...process.env, NODE_ENV: 'production' }
    });
    const match = output.match(/Tiempo total: (\d+\.\d+)/);
    if (match) {
      const time = parseFloat(match[1]);
      fastTimes.push(time);
      console.log(`   Iteración ${i + 1}/5... ✅ ${time.toFixed(2)} ms`);
    } else {
      console.log(`   Iteración ${i + 1}/5... ❌ No se encontró el tiempo`);
    }
  }
  console.log('');
  
  // Benchmark Console.log
  console.log('📊 Ejecutando: Console.log (estándar)...');
  console.log('─'.repeat(70));
  const consoleTimes = [];
  
  for (let i = 0; i < iterations; i++) {
    const output = execSync('node analisis-empresarial-console.js 2>&1', { 
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024 // 50MB buffer
    });
    const match = output.match(/Tiempo total: (\d+\.\d+)/);
    if (match) {
      const time = parseFloat(match[1]);
      consoleTimes.push(time);
      console.log(`   Iteración ${i + 1}/5... ✅ ${time.toFixed(2)} ms`);
    } else {
      console.log(`   Iteración ${i + 1}/5... ❌ No se encontró el tiempo`);
    }
  }
  console.log('');
  
  // Benchmark Pino.js
  console.log('📊 Ejecutando: Pino.js (JSON mode)...');
  console.log('─'.repeat(70));
  const pinoTimes = [];
  
  for (let i = 0; i < iterations; i++) {
    const output = execSync('node analisis-empresarial.js 2>&1', { 
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024, // 50MB buffer
      env: { ...process.env, NODE_ENV: 'production' }
    });
    const match = output.match(/Tiempo total: (\d+\.\d+)/);
    if (match) {
      const time = parseFloat(match[1]);
      pinoTimes.push(time);
      console.log(`   Iteración ${i + 1}/5... ✅ ${time.toFixed(2)} ms`);
    } else {
      console.log(`   Iteración ${i + 1}/5... ❌ No se encontró el tiempo`);
    }
  }
  console.log('');
  console.log('');
  
  // Calcular estadísticas
  const calcStats = (times) => {
    const sorted = [...times].sort((a, b) => a - b);
    return {
      avg: times.reduce((a, b) => a + b, 0) / times.length,
      median: sorted[Math.floor(sorted.length / 2)],
      min: Math.min(...times),
      max: Math.max(...times),
      stdDev: Math.sqrt(
        times.reduce((sum, time) => sum + Math.pow(time - (times.reduce((a, b) => a + b, 0) / times.length), 2), 0) / times.length
      )
    };
  };
  
  const fastStats = calcStats(fastTimes);
  const consoleStats = calcStats(consoleTimes);
  const pinoStats = calcStats(pinoTimes);
  
  // Resultados
  console.log('═'.repeat(70));
  console.log('📈 RESULTADOS DEL BENCHMARK');
  console.log('═'.repeat(70));
  console.log('');
  
  console.log('┌─────────────────────────┬──────────────┬──────────────┬──────────────┐');
  console.log('│ Métrica                 │ Fast Logger  │  Console.log │  Pino.js     │');
  console.log('├─────────────────────────┼──────────────┼──────────────┼──────────────┤');
  console.log(`│ Promedio                │ ${fastStats.avg.toFixed(2).padStart(9)} ms │ ${consoleStats.avg.toFixed(2).padStart(9)} ms │ ${pinoStats.avg.toFixed(2).padStart(9)} ms │`);
  console.log(`│ Mediana                 │ ${fastStats.median.toFixed(2).padStart(9)} ms │ ${consoleStats.median.toFixed(2).padStart(9)} ms │ ${pinoStats.median.toFixed(2).padStart(9)} ms │`);
  console.log(`│ Mínimo                  │ ${fastStats.min.toFixed(2).padStart(9)} ms │ ${consoleStats.min.toFixed(2).padStart(9)} ms │ ${pinoStats.min.toFixed(2).padStart(9)} ms │`);
  console.log(`│ Máximo                  │ ${fastStats.max.toFixed(2).padStart(9)} ms │ ${consoleStats.max.toFixed(2).padStart(9)} ms │ ${pinoStats.max.toFixed(2).padStart(9)} ms │`);
  console.log(`│ Desviación estándar     │ ${fastStats.stdDev.toFixed(2).padStart(9)} ms │ ${consoleStats.stdDev.toFixed(2).padStart(9)} ms │ ${pinoStats.stdDev.toFixed(2).padStart(9)} ms │`);
  console.log('└─────────────────────────┴──────────────┴──────────────┴──────────────┘');
  console.log('');
  console.log('═'.repeat(70));
  console.log('🎯 ANÁLISIS COMPARATIVO');
  console.log('═'.repeat(70));
  console.log('');
  
  // Fast vs Console
  const fastVsConsole = fastStats.avg / consoleStats.avg;
  const fastVsConsolePercent = ((fastStats.avg - consoleStats.avg) / consoleStats.avg * 100).toFixed(1);
  
  if (fastVsConsole < 1) {
    console.log(`🚀 Fast Logger es ${(1/fastVsConsole).toFixed(2)}x más rápido que Console.log`);
    console.log(`   Mejora de rendimiento: ${Math.abs(fastVsConsolePercent)}% más rápido`);
  } else {
    console.log(`⚠️  Console.log es ${fastVsConsole.toFixed(2)}x más rápido que Fast Logger`);
    console.log(`📉 Fast Logger es ${Math.abs(fastVsConsolePercent)}% más lento`);
  }
  console.log('');
  
  // Fast vs Pino
  const fastVsPino = fastStats.avg / pinoStats.avg;
  const fastVsPinoPercent = ((fastStats.avg - pinoStats.avg) / pinoStats.avg * 100).toFixed(1);
  
  if (fastVsPino < 1) {
    console.log(`🚀 Fast Logger es ${(1/fastVsPino).toFixed(2)}x más rápido que Pino.js`);
    console.log(`   Mejora de rendimiento: ${Math.abs(fastVsPinoPercent)}% más rápido`);
  } else {
    console.log(`⚠️  Pino.js es ${fastVsPino.toFixed(2)}x más rápido que Fast Logger`);
    console.log(`📉 Fast Logger es ${Math.abs(fastVsPinoPercent)}% más lento`);
  }
  console.log('');
  
  // Console vs Pino
  const consolVsPino = consoleStats.avg / pinoStats.avg;
  const consolVsPinoPercent = ((pinoStats.avg - consoleStats.avg) / consoleStats.avg * 100).toFixed(1);
  
  console.log(`Console.log vs Pino.js: Console es ${consolVsPino.toFixed(2)}x más rápido`);
  console.log(`Pino.js overhead: ${Math.abs(consolVsPinoPercent)}%`);
  console.log('');
  
  console.log('═'.repeat(70));
  console.log('✅ BENCHMARK COMPLETADO');
  console.log('═'.repeat(70));
}

runBenchmark();
