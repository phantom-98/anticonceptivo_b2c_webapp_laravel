<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
        <loc>https://www.anticonceptivo.cl</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>https://www.anticonceptivo.cl/sobre-nosotros</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>https://www.anticonceptivo.cl/contactanos</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>https://www.anticonceptivo.cl/preguntas-frecuentes</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>https://www.anticonceptivo.cl/responsabilidad-empresarial/politicas-de-privacidad</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>https://www.anticonceptivo.cl/responsabilidad-empresarial/carta-de-desabastecimiento</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>https://www.anticonceptivo.cl/responsabilidad-empresarial/plazos-y-costos-entrega</loc>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>https://www.anticonceptivo.cl/terminos-y-condiciones</loc>
        <changefreq>daily</changefreq>
    </url>
    @foreach($categories as $category)
        <url>
            <loc>https://www.anticonceptivo.cl/tienda/{{ $category->slug }}</loc>
            <changefreq>daily</changefreq>
        </url>
        @foreach($category->subcategories as $sub)
            <url>
                <loc>https://www.anticonceptivo.cl/tienda/{{ $category->slug }}/{{ $sub->slug }}</loc>
                <changefreq>daily</changefreq>
            </url>
        @endforeach
        @if($category->slug == "pastillas")
            @foreach($laboratories as $laboratory)
                <url>
                    <loc>https://www.anticonceptivo.cl/tienda/{{ $category->slug }}/laboratorio/{{ \Str::slug($laboratory->name) }}</loc>
                    <changefreq>daily</changefreq>
                </url>
            @endforeach
        @endif
    @endforeach
    @foreach($products as $product)
        <url>
            <loc>https://www.anticonceptivo.cl/producto/{{ $product->slug }}</loc>
            <changefreq>daily</changefreq>
        </url>
    @endforeach
    @foreach($post_types as $type)
        <url>
            <loc>https://www.anticonceptivo.cl/blog/{{ $type->slug }}</loc>
            <changefreq>daily</changefreq>
        </url>
        @foreach($type->active_posts as $post)
            <url>
                <loc>https://www.anticonceptivo.cl/blog/{{ $type->slug }}/post/{{$post->slug}}</loc>
                <changefreq>daily</changefreq>
            </url>
        @endforeach
    @endforeach
</urlset>