import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // 入口文件
  format: ['esm', 'cjs'], // 同时支持 ESM 和 CJS
  dts: true, // 生成类型声明文件
  splitting: true, // 适用于 ESM
  clean: true, // 清理旧的构建产物
  platform: "node",
  shims: true,
  sourcemap: false, // 禁用 source map 生成
  // 或者你也可以设置为 true (生成) 或 'inline' (内联)
  // sourcemap: true, // 生成 .map 文件
  // sourcemap: 'inline', // 内联到 js 文件中
  // outExtension({ format }) {
  //   return {
  //     js: format === 'esm' ? '.mjs' : '.cjs',
  //     dts: format === 'esm' ? '.mts' : '.cts'
  //   }
  // }
});