/**
 * AssemblyScript Loader Wrapper
 * This file loads the WebAssembly module and exports it
 */

import loader from '@assemblyscript/loader';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the WebAssembly module
const wasmModule = loader.instantiateSync(
  readFileSync(join(__dirname, 'release.wasm'))
);

// Export the module
export default wasmModule.exports;
export const { multiplyScalar, transpose, memory } = wasmModule.exports;

