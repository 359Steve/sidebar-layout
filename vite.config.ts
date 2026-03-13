import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, 'packages'),
		},
	},
	plugins: [
		vue(),
		tailwindcss(),
		AutoImport({
			imports: ['vitepress', 'vue', '@vueuse/core', 'pinia'],
			dirs: ['./packages/theme/store'],
			dts: './packages/theme/types/auto-imports.d.ts',
		}),

		Components({
			dirs: ['./packages/theme/components'],
			extensions: ['vue'],
			dts: './packages/theme/types/auto-components.d.ts',
		}),
		dts({
			include: ['packages/theme/**/*.ts', 'packages/theme/**/*.vue'],
			exclude: ['node_modules/**'],
			outDir: 'dist',
			insertTypesEntry: true,
			skipDiagnostics: true,
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'packages/theme/index.ts'),
			name: 'VitepressSidebarLayout',
			fileName: 'index',
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: [
				'vue',
				'vitepress',
				'pinia',
				/^vitepress\//,
				/^@localSearchIndex/,
				/^@siteData/,
				/^@theme/,
				/\.data(\.[jt]s)?$/,
			],
			output: {
				globals: {
					vue: 'Vue',
					vitepress: 'VitePress',
					pinia: 'Pinia',
				},
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === 'style.css') return 'style.css'
					return assetInfo.name ?? 'asset'
				},
			},
		},
	},
})
