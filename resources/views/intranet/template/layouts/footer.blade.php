<footer id="footer">
    @if(get_reclamos() > 0)
    <div class="show-fixed pad-rgt pull-right">
        Tienes <a href="#" class="text-main"><span class="badge badge-danger">{{ get_reclamos() }} </span> reclamos sin responder</a>
    </div>
    @endif
    <p class="pad-lft">&#0169; {{ date('Y')}} <a target="_blank" href="https://anticonceptivo.cl/">Anticonceptivo</a></p>
</footer>