<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Show Post</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100">
    <div id="vue-app" data-component="ShowPost" data-props="{{ json_encode([
        'post' => $post,
        'indexUrl' => route('posts.index')
    ]) }}"></div>
</body>
</html>
