// apps/distributor/build.js
import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./server.js"], // 빌드 대상 파일
    outfile: "./dist/server.js", // 빌드 결과 파일
    bundle: true, // 번들링
    platform: "node", // Node.js 환경
    target: "node20", // Node.js 버전
    format: "esm", // ES 모듈 형식으로 빌드
    sourcemap: true, // 디버깅을 위한 소스맵 생성
  })
  .then(() => {
    console.log("Distributor built successfully.");
  })
  .catch((e) => {
    console.error("Build failed:", e);
  });
