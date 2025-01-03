<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
        <loc>{{ env('APP_URL_SITEMAP') }}</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>{{ env('APP_URL_SITEMAP') }}/sobre-nosotros</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>{{ env('APP_URL_SITEMAP') }}/contactanos</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>{{ env('APP_URL_SITEMAP') }}/preguntas-frecuentes</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>{{ env('APP_URL_SITEMAP') }}/responsabilidad-empresarial/politicas-de-privacidad</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>{{ env('APP_URL_SITEMAP') }}/responsabilidad-empresarial/carta-de-desabastecimiento</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>{{ env('APP_URL_SITEMAP') }}/responsabilidad-empresarial/plazos-y-costos-entrega</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>{{ env('APP_URL_SITEMAP') }}/terminos-y-condiciones</loc>
        <changefreq>daily</changefreq>
    </url>
    @foreach($categories as $category)
        <url>
            <loc>{{ env('APP_URL_SITEMAP') }}/tienda/{{ $category->slug }}</loc>
            <changefreq>daily</changefreq>
        </url>
        @if($category->slug != "pastillas")
            @foreach($category->subcategories as $sub)
                <url>
                    <loc>{{ env('APP_URL_SITEMAP') }}/tienda/{{ $category->slug }}/{{ $sub->slug }}</loc>
                    <changefreq>daily</changefreq>
                </url>
            @endforeach
        @endif
        @if($category->slug == "pastillas")
            @foreach($formats as $format)
                <url>
                    <loc>{{ env('APP_URL_SITEMAP') }}/tienda/{{ $category->slug }}/formato/{{ $format }}</loc>
                    <changefreq>daily</changefreq>
                </url>
            @endforeach
            @foreach($subscriptions as $subscription)
                <url>
                    <loc>{{ env('APP_URL_SITEMAP') }}/tienda/{{ $category->slug }}/suscripcion/{{ $subscription->months }}</loc>
                    <changefreq>daily</changefreq>
                </url>
            @endforeach
            @foreach($laboratories as $laboratory)
                <url>
                    <loc>{{ env('APP_URL_SITEMAP') }}/tienda/{{ $category->slug }}/laboratorio/{{ \Str::slug($laboratory->name) }}</loc>
                    <changefreq>daily</changefreq>
                </url>
            @endforeach
        @endif
    @endforeach
    @foreach($products as $product)
        <url>
            <loc>{{ env('APP_URL_SITEMAP') }}/producto/{{ $product->slug }}</loc>
            <changefreq>daily</changefreq>
        </url>
    @endforeach
    @foreach($post_types as $type)
        <url>
            <loc>{{ env('APP_URL_SITEMAP') }}/blog/{{ $type->slug }}</loc>
            <changefreq>daily</changefreq>
        </url>
        @foreach($type->active_posts as $post)
            <url>
                <loc>{{ env('APP_URL_SITEMAP') }}/blog/{{ $type->slug }}/post/{{$post->slug}}</loc>
                <changefreq>daily</changefreq>
            </url>
        @endforeach
    @endforeach
</urlset>