import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build/',
			fallback: '404.html'
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/joseppino.github.io' : ''
		}
	}
};

export default config;