<table>
    <thead>
    <tr>
        <th>Email</th>
    </tr>
    </thead>
    <tbody>
    @foreach($newsletters as $newsletter)
        <tr>
            <td>{{ $newsletter->email }}</td>
        </tr>
    @endforeach
    </tbody>
</table>