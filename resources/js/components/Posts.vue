<template>
  <div class="p-6">
    <Navbar />
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Posts</h1>
      </div>
      
      <table class="w-full bg-white shadow rounded">
        <thead>
          <tr class="border-b">
            <th class="p-4 text-left">ID</th>
            <th class="p-4 text-left">Title</th>
            <th class="p-4 text-left">Content</th>
            <th class="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id" class="border-b">
            <td class="p-4">{{ post.id }}</td>
            <td class="p-4">{{ post.title }}</td>
            <td class="p-4">{{ post.content }}</td>
            <td class="p-4 flex gap-2">
              <a :href="post.edit_url" class="text-blue-600 hover:underline">Edit</a>
              <a :href="post.show_url" class="text-green-600 hover:underline">Show</a>
              <form :action="post.delete_url" method="POST">
                <input type="hidden" name="_token" :value="csrfToken">
                <input type="hidden" name="_method" value="DELETE">
                <button type="submit" class="text-red-600 hover:underline">Delete</button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue';

defineProps({
  posts: {
    type: Array,
    required: true
  },
  csrfToken: {
    type: String,
    required: true
  }
});
</script>
