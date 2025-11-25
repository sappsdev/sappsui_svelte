import type { IconData, ParsedIcon } from "../types";

export async function parseSvgSpinnersIcons() {
  try {
    const fileContent = Bun.file("src/svg-spinners/svg-spinners.json");
    const data = await fileContent.json();

    const filteredIcons: Record<string, ParsedIcon> = {};

    const defaultWidth = data.width || 24;
    const defaultHeight = data.height || 24;
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
      let exportName = iconName.replace(/-([a-z0-9])/g, (_, letter) =>
        letter.toUpperCase(),
      );

      if (/^\d/.test(exportName)) {
        exportName =
          "icon" + exportName.charAt(0).toUpperCase() + exportName.slice(1);
      }

      tsContent += `export const ${exportName} = ${JSON.stringify(iconDef, null, 2)};\n\n`;
    }

    tsContent += "export const svgSpinnersIcons = {\n";

    for (const iconName of Object.keys(filteredIcons)) {
      let exportName = iconName.replace(/-([a-z0-9])/g, (_, letter) =>
        letter.toUpperCase(),
      );

      if (/^\d/.test(exportName)) {
        exportName =
          "icon" + exportName.charAt(0).toUpperCase() + exportName.slice(1);
      }

      tsContent += `  "svg-spinners:${iconName}": ${exportName},\n`;
    }

    tsContent += "} as const;\n\n";

    await Bun.write("out/icons/svg-spinners.ts", tsContent);

    console.log("✅ Process completed!");
    console.log(
      `📊 Total svg spinners icons: ${Object.keys(filteredIcons).length}`,
    );
    console.log("📁 Generated files:");
    console.log("   - out/icons/svg-spinners.ts");
  } catch (error) {
    console.error("❌ Error processing file:", error);
    process.exit(1);
  }
}
