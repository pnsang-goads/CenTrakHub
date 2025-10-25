@extends ('layouts.in')

@section ('body')

<div class="box flex items-center px-5">
    <div class="nav nav-tabs flex overflow-auto whitespace-nowrap" role="tablist">
        <a href="{{ route('server.update', $row->id) }}" class="p-4 {{ ($ROUTE === 'server.update') ? 'active' : '' }}" role="tab">{{ $row->port }} - {{ $row->protocol }}</a>
        <a href="{{ route('server.update.parser', $row->id) }}" class="p-4 {{ ($ROUTE === 'server.update.parser') ? 'active' : '' }}" role="tab">{{ __('server-update.parser') }}</a>
    </div>
</div>

<div class="tab-content">
    <div class="tab-pane active" role="tabpanel">
        @yield('content')
    </div>
</div>

@stop
