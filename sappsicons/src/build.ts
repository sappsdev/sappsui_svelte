import { parseCircleFlagsIcons } from "./circle-flags/circle-flags";
import { parseFluentIcons } from "./fluent/fluent";
import { parseLogosIcons } from "./logos/logos";
import { parseSolarIcons } from "./solar/solar";
import { parseSvgSpinnersIcons } from "./svg-spinners/svg-spinners";

async function buildLibrary() {
  try {
    console.log("🧹 Cleaning previous build...");
    await Bun.spawn(["rm", "-rf", "dist"]).exited;
    await Bun.spawn(["rm", "-rf", "out"]).exited;

    console.log("🔨 Building SappsIcons...");

    await parseSvgSpinnersIcons();
    await parseFluentIcons();
    await parseCircleFlagsIcons();
    await parseSolarIcons();
    await parseLogosIcons();

    const indexContent = `import { circleFlagsIcons } from "./icons/circle-flags";
import { fluentFilledIcons } from "./icons/fluent-filled";
import { fluentRegularIcons } from "./icons/fluent-regular";
import { logosIcons } from "./icons/logos";
import { solarBoldIcons } from "./icons/solar-bold";
import { solarBoldDuotoneIcons } from "./icons/solar-bold-duotone";
import { solarBrokenIcons } from "./icons/solar-broken";
import { solarLineDuotoneIcons } from "./icons/solar-line-duotone";
import { solarLinearIcons } from "./icons/solar-linear";
import { solarOutlineIcons } from "./icons/solar-outline";
import { svgSpinnersIcons } from "./icons/svg-spinners";

export {
  circleFlagsIcons,
  fluentFilledIcons,
  fluentRegularIcons,
  logosIcons,
  solarBoldIcons,
  solarBoldDuotoneIcons,
  solarBrokenIcons,
  solarLineDuotoneIcons,
  solarLinearIcons,
  solarOutlineIcons,
  svgSpinnersIcons,
};`;

    await Bun.write("out/index.ts", indexContent);

    await Bun.build({
      entrypoints: ["./out/index.ts"],
      outdir: "./dist",
      format: "esm",
      target: "bun",
      minify: true,
    });

    await Bun.spawn([
      "bunx",
      "tsc",
      "--declaration",
      "--emitDeclarationOnly",
      "--outDir",
      "dist",
      "out/index.ts",
    ]).exited;

    console.log("✅ Build completed successfully");
    console.log("📦 Generated files in ./dist/");
  } catch (error) {
    console.error("❌ Error during build:", error);
    process.exit(1);
  }
}

buildLibrary();
