<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Writers App</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

  <!-- Styles -->

  <style>
    body {
      font-family: 'Nunito', sans-serif;
    }
  </style>

</head>

<body class="antialiased">

  <div id="isra-app"></div>

	<script>
		 window.lara_url = "{{ url('') }}";
		 window.lara_env = "{{ env('MIX_WEB_URL') }}";
  </script>

  @if(url('') === env('MIX_WEB_URL') || url('') === 'http://nwt-me.ddns.net')
    <script src="/js/app.js" defer></script>
  @else
    <script src="{{ asset('js/app.js') }}" defer></script>
  @endif

</body>

</html>
