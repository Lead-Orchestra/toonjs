/**
 * Type definitions for the WebAssembly module
 */

export interface WasmExports {
  multiplyScalar: (ptr: number, length: number, scalar: number) => void;
  transpose: (srcPtr: number, rows: number, cols: number) => void;
  memory: WebAssembly.Memory;
}

declare const exports: WasmExports;
export default exports;
export const multiplyScalar: WasmExports['multiplyScalar'];
export const transpose: WasmExports['transpose'];
export const memory: WasmExports['memory'];

