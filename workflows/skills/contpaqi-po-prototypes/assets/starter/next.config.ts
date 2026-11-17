import type { NextConfig } from 'next';
import path from 'node:path';
const config: NextConfig = {
  output: 'export',
  devIndicators: false,
  images: { unoptimized: true },
  webpack(config, { webpack }) {
    // Pinned Next 16.4 reads currentScript.src to discover its asset prefix.
    // A data URI has no /_next/ path; the exporter retains it in an attribute.
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/^\.\/asset-prefix$/, (resource: { context: string; request: string }) => {
      if (resource.context.replaceAll('\\', '/').endsWith('/next/dist/client')) {
        resource.request = path.join(process.cwd(), 'scripts/offline-asset-prefix.js');
      }
    }));
    return config;
  },
};
export default config;
