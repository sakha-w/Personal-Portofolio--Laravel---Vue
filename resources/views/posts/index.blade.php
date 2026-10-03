<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Posts</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100">
    <div id="vue-app" data-component="Posts" data-props="{{ json_encode([
        'posts' => $posts->map(function($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'show_url' => route('posts.show', $post->id),
                'edit_url' => route('posts.edit', $post->id),
                'delete_url' => route('posts.destroy', $post->id),
            ];
        }),
        'csrfToken' => csrf_token(),
    ]) }}"></div>
</body>
</html>
