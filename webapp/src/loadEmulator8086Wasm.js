/**
 * wasm-bindgen "web" output loads the .wasm via fetch.
 * We pass an explicit emitted asset URL so initialization stays stable across
 * local dev and production builds.
 */
import wasmAsset from "emulator_8086/emulator_8086_web_bg.wasm";

function wasmUrlFromLoader(module) {
  if (typeof module === "string") return module;
  if (module && typeof module.default === "string") return module.default;
  return undefined;
}

export async function loadEmulator8086Wasm() {
  const mod = await import(
    /* webpackChunkName: "emulator8086" */ "emulator_8086"
  );
  const init = mod.default;
  const url = wasmUrlFromLoader(wasmAsset);
  if (typeof init !== "function") {
    return mod;
  }
  if (typeof url !== "string") {
    throw new Error(
      "emulator_8086_web_bg.wasm did not resolve to a URL string."
    );
  }
  await init(url);
  return mod;
}
