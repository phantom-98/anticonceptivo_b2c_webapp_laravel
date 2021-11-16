<?php


namespace App\Http\Controllers;


use App\Models\Product;
use App\Packages\InnovaSEO;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SEOController extends Controller
{
//    protected $metas;
//    protected $preload;
    protected $seo;

    public function __construct()
    {
        $this->seo = new InnovaSEO(
            'Anticonceptivo',
            'Anticonceptivo',
            '¡Aprovecha tu tiempo en lo que más te gusta! Compra en línea y recibe en casa. Conoce nuestros planes de suscripción y cuídate de forma periódica y segura. Opción de suscripción.',
            'https://www.anticonceptivo.cl',
            'https://www.anticonceptivo.cl/images/logo-default.png',
            'anticonceptivos, ecommerce, tienda, pastillas, nora, condones, durex',
            'Anticonceptivo',
            'Anticonceptivo',
        );
//        $this->metas = $this->seo->getFullMeta();
//        $this->preload = $this->seo->getPreload();
    }

    public function index(Request $request)
    {
        $url = $request->url();

        if (strpos($url, 'producto') !== false) {
            $this->buildProduct($url);
        }

        return view('webapp.base_react_seo')->with([
            'metas' => $this->seo->getFullMeta(),
            'preload' => $this->seo->getPreload()
        ]);
    }

    private function buildProduct($url)
    {
        $explode = explode('/', $url);

        $slug = $explode[count($explode) - 1];
        if (!$slug) {
            $slug = $explode[count($explode) - 2];
        }

        $product = Product::where('slug', $slug)->first();

        if ($product) {

            $image = env('APP_URL') . Storage::url($product->images[0]->file);

            $this->seo->setTitle($product->name);
            $this->seo->setDescription(strip_tags($product->description) . ' - ' . strip_tags($product->benefits) . ' - ' . strip_tags($product->data_sheet) . ' - ' . strip_tags($product->unit_format) . ' - ' . strip_tags($product->state_of_matter));
            $this->seo->setUrl($url);
            $this->seo->setImage($image);
        }

    }
}
