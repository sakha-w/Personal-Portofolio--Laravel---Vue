<template>
  <Navbar />
  <div class="p-6 max-w-2xl mx-auto bg-white shadow rounded">
    <h1 class="text-2xl font-bold mb-6">{{ isEdit ? 'Edit Post' : 'Create Post' }}</h1>
    <form :action="actionUrl" method="POST" class="space-y-4">
      <input type="hidden" name="_token" :value="csrfToken">
      <input v-if="isEdit" type="hidden" name="_method" value="PUT">
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input type="text" name="title" :value="post?.title" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Content</label>
        <textarea name="content" rows="4" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">{{ post?.content }}</textarea>
      </div>
      
      <div class="flex items-center gap-4">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {{ isEdit ? 'Update' : 'Submit' }}
        </button>
        <a href="/posts" class="text-gray-600 hover:underline">Back</a>
      </div>
    </form>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue';

defineProps({
  actionUrl: String,
  csrfToken: String,
  post: Object,
  isEdit: Boolean
});
</script>
