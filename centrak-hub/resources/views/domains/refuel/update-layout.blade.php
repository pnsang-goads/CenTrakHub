@extends ('layouts.in')

@section ('body')

<div class="box flex items-center px-5">
    <div class="nav nav-tabs flex overflow-auto whitespace-nowrap" role="tablist">
        <a href="{{ route('refuel.update', $row->id) }}" class="p-4 {{ ($ROUTE === 'refuel.update') ? 'active' : '' }}" role="tab">{{ $row->date_at }}</a>
    </div>
</div>

<div class="tab-content">
    <div class="tab-pane active" role="tabpanel">
        @yield('content')
    </div>
</div>

@stop
