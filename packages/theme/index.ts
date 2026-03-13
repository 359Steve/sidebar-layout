import type { Theme } from 'vitepress';
import { Icon } from '@iconify/vue';
import { createPinia } from 'pinia';
import { preview } from './directives/preview';
import { unwrap } from './directives/unwrap';
import DocTable from './components/DocTable.vue';
import ContentImage from './components/md/ContentImage.vue';
import Layout from './Layout.vue';
import 'vitepress/theme';
import '../theme/css/style.css';

export default {
	Layout,
	enhanceApp({ app }) {
		app.use(createPinia());
		app.directive('unwrap', unwrap).directive('preview', preview);
		app.component('Icon', Icon).component('DocTable', DocTable).component('ContentImage', ContentImage);
	},
} satisfies Theme;
