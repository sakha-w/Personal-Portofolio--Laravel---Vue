import { createApp, h } from 'vue';
import Posts from './components/Posts.vue';
import PostForm from './components/PostForm.vue';
import ShowPost from './components/ShowPost.vue';
import App from './App.vue';

// Handle specialized Vue-app mounting
const el = document.getElementById('vue-app');
if (el) {
    const componentName = el.dataset.component;
    const props = JSON.parse(el.dataset.props || '{}');
    
    const components = { Posts, PostForm, ShowPost };
    
    createApp({
        render: () => h(components[componentName], props)
    }).mount('#vue-app');
} 
// Handle generic App mounting
else {
    const appEl = document.getElementById('app');
    if (appEl) {
        createApp(App).mount('#app');
    }
}
