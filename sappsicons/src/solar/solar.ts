import type { IconData, ParsedIcon } from "../types";

export async function parseSolarIcons() {
  try {
    const fileContent = Bun.file("src/solar/solar.json");
    const data = await fileContent.json();

    const outlineIcons: Record<string, ParsedIcon> = {};
    const linearIcons: Record<string, ParsedIcon> = {};
    const lineDuotoneIcons: Record<string, ParsedIcon> = {};
    const brokenIcons: Record<string, ParsedIcon> = {};
    const boldIcons: Record<string, ParsedIcon> = {};
    const boldDuotoneIcons: Record<string, ParsedIcon> = {};

    const defaultWidth = data.width || 24;
    const defaultHeight = data.height || 24;
    const defaultViewBox = `0 0 ${defaultWidth} ${defaultHeight}`;

    const getViewBox = (icon: IconData): string => {
      if (icon.viewBox) {
        return icon.viewBox;
      } else if (icon.width && icon.height) {
        return `0 0 ${icon.width} ${icon.height}`;
      }
      return defaultViewBox;
    };

    for (const [iconName, iconData] of Object.entries(data.icons)) {
      const icon = iconData as IconData;
      const viewBox = getViewBox(icon);
      const parsedIcon: ParsedIcon = {
        body: icon.body,
        viewBox: viewBox,
      };

      if (iconName.endsWith("bold-duotone")) {
        boldDuotoneIcons[iconName] = parsedIcon;
      } else if (iconName.endsWith("bold")) {
        boldIcons[iconName] = parsedIcon;
      } else if (iconName.endsWith("line-duotone")) {
        lineDuotoneIcons[iconName] = parsedIcon;
      } else if (iconName.endsWith("linear")) {
        linearIcons[iconName] = parsedIcon;
      } else if (iconName.endsWith("broken")) {
        brokenIcons[iconName] = parsedIcon;
      } else if (iconName.endsWith("outline")) {
        outlineIcons[iconName] = parsedIcon;
      }
    }

    const getExportName = (iconName: string): string => {
      let exportName = iconName.replace(/-([a-z0-9])/g, (_, letter) =>
        letter.toUpperCase(),
      );

      if (/^\d/.test(exportName)) {
        exportName =
          "icon" + exportName.charAt(0).toUpperCase() + exportName.slice(1);
      }

      return exportName;
    };

    const generateFileContent = (
      icons: Record<string, ParsedIcon>,
      prefix: string,
      objectName: string,
    ): string => {
      let content = "";

      for (const [iconName, iconDef] of Object.entries(icons)) {
        const exportName = getExportName(iconName);
        content += `export const ${exportName} = ${JSON.stringify(iconDef, null, 2)};\n\n`;
      }

      content += `export const ${objectName} = {\n`;
      for (const iconName of Object.keys(icons)) {
        const exportName = getExportName(iconName);
        content += `  "solar:${iconName}": ${exportName},\n`;
      }
      content += "} as const;\n\n";

      return content;
    };

    const iconTypes = [
      {
        icons: outlineIcons,
        file: "solar-outline.ts",
        name: "solarOutlineIcons",
      },
      { icons: linearIcons, file: "solar-linear.ts", name: "solarLinearIcons" },
      {
        icons: lineDuotoneIcons,
        file: "solar-line-duotone.ts",
        name: "solarLineDuotoneIcons",
      },
      { icons: brokenIcons, file: "solar-broken.ts", name: "solarBrokenIcons" },
      { icons: boldIcons, file: "solar-bold.ts", name: "solarBoldIcons" },
      {
        icons: boldDuotoneIcons,
        file: "solar-bold-duotone.ts",
        name: "solarBoldDuotoneIcons",
      },
    ];

    for (const { icons, file, name } of iconTypes) {
      if (Object.keys(icons).length > 0) {
        const content = generateFileContent(icons, "solar", name);
        await Bun.write(`out/icons/${file}`, content);
      }
    }

    console.log("✅ Process completed!");
    console.log(`📊 Total solar icons:`);
    console.log(`   - Outline: ${Object.keys(outlineIcons).length}`);
    console.log(`   - Linear: ${Object.keys(linearIcons).length}`);
    console.log(`   - Line Duotone: ${Object.keys(lineDuotoneIcons).length}`);
    console.log(`   - Broken: ${Object.keys(brokenIcons).length}`);
    console.log(`   - Bold: ${Object.keys(boldIcons).length}`);
    console.log(`   - Bold Duotone: ${Object.keys(boldDuotoneIcons).length}`);
    console.log("📁 Generated files:");
    iconTypes.forEach(({ icons, file }) => {
      if (Object.keys(icons).length > 0) {
        console.log(`   - out/icons/${file}`);
      }
    });
  } catch (error) {
    console.error("❌ Error processing file:", error);
    process.exit(1);
  }
}
