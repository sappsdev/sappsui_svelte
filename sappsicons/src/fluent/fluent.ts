import type { IconData, ParsedIcon } from "../types";

export async function parseFluentIcons() {
  try {
    const fileContent = Bun.file("src/fluent/fluent.json");
    const data = await fileContent.json();

    const regularIcons: Record<string, ParsedIcon> = {};
    const filledIcons: Record<string, ParsedIcon> = {};

    const defaultWidth = data.width || 24;
    const defaultHeight = data.height || 24;
    const defaultViewBox = `0 0 ${defaultWidth} ${defaultHeight}`;

    // Función helper para obtener viewBox
    const getViewBox = (icon: IconData): string => {
      if (icon.viewBox) {
        return icon.viewBox;
      } else if (icon.width && icon.height) {
        return `0 0 ${icon.width} ${icon.height}`;
      }
      return defaultViewBox;
    };

    // Parsear todos los iconos según su sufijo
    for (const [iconName, iconData] of Object.entries(data.icons)) {
      const icon = iconData as IconData;
      const viewBox = getViewBox(icon);
      const parsedIcon: ParsedIcon = {
        body: icon.body,
        viewBox: viewBox,
      };

      if (iconName.endsWith("24-regular")) {
        regularIcons[iconName] = parsedIcon;
      } else if (iconName.endsWith("24-filled")) {
        filledIcons[iconName] = parsedIcon;
      }
    }

    // Función helper para generar nombre de exportación
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

    // Función helper para generar contenido del archivo
    const generateFileContent = (
      icons: Record<string, ParsedIcon>,
      prefix: string,
      objectName: string,
    ): string => {
      let content = "";

      // Exportar constantes individuales
      for (const [iconName, iconDef] of Object.entries(icons)) {
        const exportName = getExportName(iconName);
        content += `export const ${exportName} = ${JSON.stringify(iconDef, null, 2)};\n\n`;
      }

      // Exportar objeto con todos los iconos
      content += `export const ${objectName} = {\n`;
      for (const iconName of Object.keys(icons)) {
        const exportName = getExportName(iconName);
        content += `  "${prefix}:${iconName}": ${exportName},\n`;
      }
      content += "} as const;\n\n";

      return content;
    };

    // Generar archivos para cada tipo de icono
    const iconTypes = [
      {
        icons: regularIcons,
        file: "fluent-regular.ts",
        name: "fluentRegularIcons",
      },
      {
        icons: filledIcons,
        file: "fluent-filled.ts",
        name: "fluentFilledIcons",
      },
    ];

    for (const { icons, file, name } of iconTypes) {
      if (Object.keys(icons).length > 0) {
        const content = generateFileContent(icons, "fluent", name);
        await Bun.write(`out/icons/${file}`, content);
      }
    }

    // Resumen de resultados
    console.log("✅ Process completed!");
    console.log(`📊 Total fluent icons:`);
    console.log(`   - Regular: ${Object.keys(regularIcons).length}`);
    console.log(`   - Filled: ${Object.keys(filledIcons).length}`);
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
