import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: {
				index: 'src/main.js',          // 整包入口（全部元件）
				'nu-time-range': 'src/nu-time-range.js',
				'nu-time-input': 'src/nu-time-input.js',
				'nu-checkbox': 'src/nu-checkbox.js',
			},
			formats: ['es'],
		},
		rollupOptions: {
			entryFileNames: '[name].js',
			format: 'systemjs',
			output: {
			},
		}
	}
});
