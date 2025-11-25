import type { IconData, ParsedIcon } from "../types";

export async function parseCircleFlagsIcons() {
  try {
    const fileContent = Bun.file("src/circle-flags/circle-flags.json");
    const data = await fileContent.json();

    const filteredIcons: Record<string, ParsedIcon> = {};

    const defaultWidth = data.width || 512;
    const defaultHeight = data.height || 512;
    const defaultViewBox = `0 0 ${defaultWidth} ${defaultHeight}`;

    for (const [iconName, iconData] of Object.entries(data.icons)) {
      const icon = iconData as IconData;

      let viewBox: string;

      if (icon.viewBox) {
        viewBox = icon.viewBox;
      } else if (icon.width && icon.height) {
        viewBox = `0 0 ${icon.width} ${icon.height}`;
      } else {
        viewBox = defaultViewBox;
      }

      filteredIcons[iconName] = {
        body: icon.body,
        viewBox: viewBox,
      };
    }

    let tsContent = "";

    for (const [iconName, iconDef] of Object.entries(filteredIcons)) {
      let exportName =
        "cf_" +
        iconName.replace(/-([a-z0-9])/g, (_, letter) => letter.toUpperCase());

      if (/^\d/.test(exportName)) {
        exportName =
          "icon" + exportName.charAt(0).toUpperCase() + exportName.slice(1);
      }

      tsContent += `export const ${exportName} = ${JSON.stringify(iconDef, null, 2)};\n\n`;
    }

    tsContent += "export const circleFlagsIcons = {\n";

    for (const iconName of Object.keys(filteredIcons)) {
      let exportName =
        "cf_" +
        iconName.replace(/-([a-z0-9])/g, (_, letter) => letter.toUpperCase());

      if (/^\d/.test(exportName)) {
        exportName =
          "icon" + exportName.charAt(0).toUpperCase() + exportName.slice(1);
      }

      tsContent += `  "circle-flags:${iconName}": ${exportName},\n`;
    }

    tsContent += "} as const;\n\n";

    await Bun.write("out/icons/circle-flags.ts", tsContent);

    console.log("✅ Process completed!");
    console.log(
      `📊 Total svg spinners icons: ${Object.keys(filteredIcons).length}`,
    );
    console.log("📁 Generated files:");
    console.log("   - out/icons/circle-flags.ts");
  } catch (error) {
    console.error("❌ Error processing file:", error);
    process.exit(1);
  }
}
