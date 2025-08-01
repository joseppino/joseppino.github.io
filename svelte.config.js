import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build/',
			fallback: 'index.html'
		}),
		paths: {
			base: ''
		}
	}
};

export default config;