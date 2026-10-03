<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Post</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100">
    <div id="vue-app" data-component="PostForm" data-props="{{ json_encode([
        'actionUrl' => route('posts.store'),
        'csrfToken' => csrf_token(),
        'isEdit' => false
    ]) }}"></div>
</body>
</html>
