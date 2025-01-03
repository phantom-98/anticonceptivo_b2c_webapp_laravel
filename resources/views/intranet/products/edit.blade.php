@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

@if ($config['blade']['showBreadcrumb'])
@section('breadcrumb')
    @php(array_push($config['breadcrumb'], ['link'=>'', 'name' =>  $config['blade']['viewEdit']]))
    @foreach($config['breadcrumb'] as $key => $data)
        <li><a href="{{ $data['link'] }}"
               class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">{{ $data['name'] }}</a></li>
    @endforeach
@endsection
@endif

@section('toolbar-buttons')
    <a href="{{route($config['route'] . 'index')}}" class="btn btn-default"><i
            class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}</a>
    <button class="btn btn-primary" type="button" onclick="doSubmit('form-edit')"><i
            class="fa fa-save"></i> {{ $config['blade']['btnUpdate']}}</button>
@endsection

@section('content')
    <form id="form-edit" action="{{ route($config['route'] . 'update', [$object->id]) }}"
          enctype="multipart/form-data" method="POST">

        <button type="submit" class="hide"></button>
        <input type="hidden" name="_method" value="PUT">
        @csrf()

        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel">
                    <div class="panel-body">
                        <div class="col-md-4" >
                            <div class="row">
                                
                                <div class="col-md-12" >
                                    <div class="form-group" id="group-error-imagen" >
                                        <label for="avatar"><h3>{{$object->name}}</h3></label>
                                        <div class="image-product" >
                                            @if(isset($object->images[0]))
                                            <img id="image-product" src="{{$object->images[0]->public_file }}">
                                            @else
                                            <img id="image-product" src="/images/producto-default.png">
                                            @endif
                                        </div>
                                        {{-- <input type="file" name="image[]" id="file-image-product"
                                            class="inputfile" accept="image/x-png,image/gif,image/jpeg" multiple />
                                        <label for="file-image-product">Seleccione una imagen o más imagenes</label>
                                        <span class="help-block" id="label-error-image"></span>
                                        <div class="link-del" id="link-del" onclick="deleteImg();"></div> --}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8" style="display: none;">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('name') ? 'has-error':'' }}">
                                        <label for="name">Nombre (*)</label>
                                        <input type="text"
                                            class="form-control"
                                            id="name"
                                            name="name"
                                            placeholder="Nombre"
                                            value="{{ old('name') ?? $object->name }}">
                                        {!! $errors->first('name', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('sku') ? 'has-error':'' }}">
                                        <label for="sku">SKU (*)</label>
                                        <input type="text"
                                            class="form-control"
                                            id="sku"
                                            name="sku"
                                            placeholder="SKU"
                                            value="{{ old('sku') ?? $object->sku }}">
                                        {!! $errors->first('sku', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('subcategory_id') ? 'has-error':'' }}">
                                        <label for="subcategory_id">Subcategoría (*)</label>
                                        <select class="form-control"
                                                name="subcategory_id"
                                                id="subcategory_id">
                                            <option value="">Seleccione una subcategoría</option>
                                            @foreach( $subcategories as $sub)
                                                <option value="{{ $sub->id }}" {{ $sub->id == $object->subcategory_id ? 'selected' : ''}}>{{ $sub->name }}</option>
                                            @endforeach
                                        </select>
                                        {!! $errors->first('subcategory_id', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('price') ? 'has-error':'' }}">
                                        <label for="price">Precio de Producto (*)</label>
                                        <input type="number"
                                            class="form-control "
                                            id="price"
                                            name="price"
                                            placeholder="Ingrese el precio del producto"
                                            value="{{ old('price') ?? $object->price }}">
                                        {!! $errors->first('price', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('offer_price') ? 'has-error':'' }}">
                                        <label for="offer_price">Precio Oferta</label>
                                        <input type="number"
                                            class="form-control "
                                            id="offer_price"
                                            name="offer_price"
                                            placeholder="Ingrese el precio oferta"
                                            value="{{ old('offer_price') ?? str_replace(",",".",$object->offer_price) }}">
                                        {!! $errors->first('offer_price', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('laboratory_id') ? 'has-error':'' }}">
                                        <label for="laboratory_id">Laboratorio (*)</label>
                                        <select class="form-control"
                                                name="laboratory_id"
                                                id="laboratory_id">
                                            <option value="">Seleccione un laboratorio</option>
                                            @foreach( $laboratories as $lab)
                                                <option value="{{ $lab->id }}" {{ $lab->id == $object->laboratory_id ? 'selected' : ''}}>{{ $lab->name }}</option>
                                            @endforeach
                                        </select>
                                        {!! $errors->first('laboratory_id', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('width') ? 'has-error':'' }}">
                                        <label for="width">Ancho</label>
                                        <input type="number"
                                            class="form-control "
                                            id="width"
                                            name="width"
                                            placeholder="Ingrese el ancho"
                                            value="{{ old('width') ?? str_replace(",",".",$object->width) }}">
                                        {!! $errors->first('width', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('height') ? 'has-error':'' }}">
                                        <label for="height">Alto</label>
                                        <input type="number"
                                            class="form-control "
                                            id="height"
                                            name="height"
                                            placeholder="Ingrese el alto"
                                            value="{{ old('height') ?? str_replace(",",".",$object->height) }}">
                                        {!! $errors->first('height', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>


                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('long') ? 'has-error':'' }}">
                                        <label for="long">Largo</label>
                                        <input type="number"
                                            class="form-control "
                                            id="long"
                                            name="long"
                                            placeholder="Ingrese el largo"
                                            value="{{ old('long') ?? $object->long }}">
                                        {!! $errors->first('long', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>


                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('weigth') ? 'has-error':'' }}">
                                        <label for="weigth">Peso</label>
                                        <input type="number"
                                            class="form-control "
                                            id="weigth"
                                            name="weigth"
                                            placeholder="Ingrese el peso"
                                            value="{{ old('weigth') ?? $object->weigth }}">
                                        {!! $errors->first('weigth', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group {{ $errors->has('consumption_typology') ? 'has-error':'' }}">
                                        <label for="consumption_typology">Tipología consumo (*)</label>
                                        <select class="form-control"
                                                name="consumption_typology"
                                                id="consumption_typology">
                                            <option value="">Seleccione una tipología</option>
                                            @foreach( $consumptions as $con)
                                                <option value="{{ $con }}" {{ $con == $object->consumption_typology ? 'selected' : ''}}>{{ $con }}</option>
                                            @endforeach
                                        </select>
                                        {!! $errors->first('consumption_typology', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>

                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label for="is_bioequivalent">¿Es bioequivalente?</label>
                                        <br/>
                                        <input class="js-switch" name="is_bioequivalent" id="is_bioequivalent" type="checkbox" value="1" {{ $object->is_bioequivalent == 1 ? 'checked' : '' }}>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label for="is_generic">¿Es Generico?</label>
                                        <br/>
                                        <input class="js-switch" name="is_generic" id="is_generic" type="checkbox" value="1" {{ $object->is_generic == 1 ? 'checked' : '' }}>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="format">Formato</label>
                                        <select id="format" name="format" class="form-control">
                                            <option value="" {{$object->format == null ? "selected" : ""}}>Sin formato</option>
                                            <option value="2" {{$object->format == "2" ? "selected" : ""}}>2</option>
                                            <option value="3" {{$object->format == "3" ? "selected" : ""}}>3</option>
                                            <option value="3.5" {{$object->format == "3.5" ? "selected" : ""}}>3.5</option>
                                            <option value="4" {{$object->format == "4" ? "selected" : ""}}>4</option>
                                            <option value="5" {{$object->format == "5" ? "selected" : ""}}>5</option>
                                            <option value="6" {{$object->format == "6" ? "selected" : ""}}>6</option>
                                            <option value="7" {{$object->format == "7" ? "selected" : ""}}>7</option>
                                            <option value="8" {{$object->format == "8" ? "selected" : ""}}>8</option>
                                            <option value="10" {{$object->format == "10" ? "selected" : ""}}>10</option>
                                            <option value="12" {{$object->format == "12" ? "selected" : ""}}>12</option>
                                            <option value="14" {{$object->format == "14" ? "selected" : ""}}>14</option>
                                            <option value="15" {{$object->format == "15" ? "selected" : ""}}>15</option>
                                            <option value="16" {{$object->format == "16" ? "selected" : ""}}>16</option>
                                            <option value="20" {{$object->format == "20" ? "selected" : ""}}>20</option>
                                            <option value="21" {{$object->format == "21" ? "selected" : ""}}>21</option>
                                            <option value="24" {{$object->format == "24" ? "selected" : ""}}>24</option>
                                            <option value="25" {{$object->format == "25" ? "selected" : ""}}>25</option>
                                            <option value="28" {{$object->format == "28" ? "selected" : ""}}>28</option>
                                            <option value="30" {{$object->format == "30" ? "selected" : ""}}>30</option>
                                            <option value="35" {{$object->format == "35" ? "selected" : ""}}>35</option>
                                            <option value="40" {{$object->format == "40" ? "selected" : ""}}>40</option>
                                            <option value="45" {{$object->format == "45" ? "selected" : ""}}>45</option>
                                            <option value="50" {{$object->format == "50" ? "selected" : ""}}>50</option>
                                            <option value="56" {{$object->format == "56" ? "selected" : ""}}>56</option>
                                            <option value="60" {{$object->format == "60" ? "selected" : ""}}>60</option>
                                            <option value="80" {{$object->format == "80" ? "selected" : ""}}>80</option>
                                            <option value="90" {{$object->format == "90" ? "selected" : ""}}>90</option>
                                            <option value="91" {{$object->format == "91" ? "selected" : ""}}>91</option>
                                            <option value="100" {{$object->format == "100" ? "selected" : ""}}>100</option>
                                            <option value="133" {{$object->format == "133" ? "selected" : ""}}>133</option>
                                            <option value="180" {{$object->format == "180" ? "selected" : ""}}>180</option>
                                            <option value="200" {{$object->format == "200" ? "selected" : ""}}>200</option>
                                            <option value="250" {{$object->format == "250" ? "selected" : ""}}>250</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('barcode') ? 'has-error':'' }}">
                                        <label for="barcode">Código de Barras </label>
                                        <input type="text"
                                            class="form-control "
                                            id="barcode"
                                            name="barcode"
                                            placeholder="Código de Barras"
                                            value="{{ old('barcode') ?? $object->barcode }}">
                                        {!! $errors->first('barcode', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('unit_format') ? 'has-error':'' }}">
                                        <label for="unit_format">Formato unidad </label>
                                        <input type="text"
                                            class="form-control "
                                            id="unit_format"
                                            name="unit_format"
                                            placeholder="Formato unidad"
                                            value="{{ old('unit_format')  ?? $object->unit_format }}">
                                        {!! $errors->first('unit_format', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('recipe_type') ? 'has-error':'' }}">
                                        <label for="recipe_type">Tipo de Receta </label>
                                        <select id="recipe_type" name="recipe_type" class="form-control">
                                            <option value="Venta Directa" {{$object->recipe_type == "Venta Directa" ? "selected" : ""}}>Venta Directa</option>
                                            <option value="Receta Simple (R)" {{$object->recipe_type == "Receta Simple (R)" ? "selected" : ""}}>Receta Simple (R)</option>
                                            <option value="Receta Simple Obligatoria (RO)" {{$object->recipe_type == "Receta Simple Obligatoria (RO)" ? "selected" : ""}}>Receta Simple Obligatoria (RO)</option>
                                            <option value="Receta Retenida (RR)" {{$object->recipe_type == "Receta Retenida (RR)" ? "selected" : ""}}>Receta Retenida (RR)</option>
                                            <option value="Receta Cheque (RCH)" {{$object->recipe_type == "Receta Cheque (RCH)" ? "selected" : ""}}>Receta Cheque (RCH)</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('state_of_matter') ? 'has-error':'' }}">
                                        <label for="state_of_matter">Estado </label>
                                        <select id="state_of_matter" name="state_of_matter" class="form-control">
                                            <option value="Sólido" {{$object->state_of_matter == "Sólido" ? "selected" : ""}}>Sólido</option>
                                            <option value="Líquido" {{$object->state_of_matter == "Líquido" ? "selected" : ""}}>Líquido</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('is_medicine') ? 'has-error':'' }}">
                                        <label for="is_medicine">¿Es medicamento? </label>
                                        <select id="is_medicine" name="is_medicine" class="form-control">
                                            <option value="1" {{$object->is_medicine == "1" ? "selected" : ""}}>Si</option>
                                            <option value="0" {{$object->is_medicine == "0" ? "selected" : ""}}>No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('is_indexable') ? 'has-error':'' }}">
                                        <label for="is_indexable">¿Es Indexable? </label>
                                        <select id="is_indexable" name="is_indexable" class="form-control">
                                            <option value="1" {{$object->is_indexable == "1" ? "selected" : ""}}>Si</option>
                                            <option value="0" {{$object->is_indexable == "0" ? "selected" : ""}}>No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="days_protection">Días de Protección</label>
                                        <input type="number" name="days_protection" id="days_protection" class="form-control"
                                        oninput="checkKeyByClass(this)" value="{{ $object->days_protection ?? old('days_protection') }}">
                                    </div>
                                </div>
                                <div class="clearfix"></div>


                            </div>
                        </div>
                        <div class="col-md-12 mt-2" style="display: none;">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="description">Descripción</label>
                                        <textarea id="description" name="description" class="form-control summernote"
                                        >{!! old('description') ?? $object->description !!}</textarea>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="compound">Composición</label>
                                        <textarea id="compound" name="compound" class="form-control summernote"
                                        >{!! old('compound') ?? $object->compound !!}</textarea>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="benefits">Beneficios</label>
                                        <textarea id="benefits" name="benefits" class="form-control summernote"
                                        >{!! old('benefits') ?? $object->benefits !!}</textarea>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="data_sheet">Ficha técnica</label>
                                        <textarea id="data_sheet" name="data_sheet" class="form-control summernote"
                                        >{!! old('data_sheet') ?? $object->data_sheet !!}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div class="clearfix"></div>
                        <div class="col-md-4">
                            Seo
                        </div>
                        <div class="clearfix"></div>
                        <br/>
                        <div class="row">
                        <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="meta_title">Titulo</label>
                                        <textarea  name="meta_title" class="form-control"
                                        >{{ old('meta_title') ?? $object->meta_title }}</textarea>
                                    </div>
                                </div>
                        <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="meta_description">Meta tag Descripción</label>
                                        <textarea  name="meta_description" class="form-control"
                                        >{{ old('meta_description') ?? $object->meta_description }}</textarea>
                                    </div>
                                </div>
                        </div>
                        
                        
                        <div class="clearfix"></div>
                        <div class="col-md-4">
                            Detalle de planes
                        </div>
                        <div class="clearfix"></div>
                        <br/>
                        @forelse($object->plans as $plan)
                            <div class="clone">
                                
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="price">Plan</label>
                                        <select name="plan_id[{{$loop->iteration}}][]" class="form-control plan_id" data-width="100%">
                                            <option value="">Seleccione un plan (periodos)</option>
                                            @foreach($plans as $c)
                                                <option value="{{ $c->id }}" {{ $c->id == $plan->subscription_plan_id ? "selected" : ""}}>{{ $c->months }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="price">Precio unitario</label>
                                        <input type="text" name="price_plan[{{$loop->iteration}}][]" class="form-control price" value="{{ $plan->price }}"
                                        oninput="checkKeyByClass(this)" >
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="price">Días</label>
                                        <input type="text" name="days[{{$loop->iteration}}][]" class="form-control days" value="{{ $plan->days }}"
                                        oninput="checkKeyByClass(this)" >
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="price">Posición</label>
                                        <select name="position[{{$loop->iteration}}][]" class="form-control position" data-width="100%">
                                            <option value="">Seleccione una posición</option>
                                            @foreach($plans as $key => $c)
                                                <option value="{{ $key+1 }}" {{ $key+1 == $plan->position ? "selected" : ""}}>{{ $key+1 }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                

                                {{-- <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="avatar">Imagen</label>
                                        <div class="image-product">
                                            <img class="image-plan" id="image-plan-{{$loop->iteration}}" src="{{ $plan->public_image ? $plan->public_image : '/themes/intranet/img/image-default.jpeg' }}">
                                        </div>
                                        <input type="file" name="plan_image[{{$loop->iteration}}][]" id="file-image-plan-{{$loop->iteration}}"
                                            class="inputfile form-control image file-image-plan" accept="image/x-png,image/gif,image/jpeg" />
                                        <label class="label" for="file-image-plan-{{$loop->iteration}}">Seleccione una imagen</label>
                                        <span class="help-block" id="label-error-image"></span>
                                        <div class="link-del" id="link-del-{{$loop->iteration}}" onclick="deleteImgLoop({{$loop->iteration}});"></div>
                                    </div>
                                </div> --}}

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="avatar">Imagen</label>
                                        <div class="image-product">
                                            <img class="image-plan" id="image-plan-{{$loop->iteration}}" src="{{ $plan->public_image ? $plan->public_image : '/themes/intranet/img/image-default.jpeg' }}">
                                        </div>
                                        <input type="file"
                                            name="plan_image[{{$loop->iteration}}][]"
                                            class="inputfile form-control image file-image-plan"
                                            id="file-image-plan-{{$loop->iteration}}"
                                            accept="image/x-png,image/gif,image/jpeg"
                                            onchange="inputFileChange(this)"
                                        />
                                        <label class="label" for="file-image-plan-{{$loop->iteration}}">Seleccione una imagen</label>
                                        <span class="help-block" id="label-error-image"></span>
                                        <div class="link-del" id="link-del-{{$loop->iteration}}" onclick="deleteImgLoopStatic(this);"></div>
                                    </div>
                                </div>
                               
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="warnings">Disclaimer</label>
                                        <textarea name="warnings[{{$loop->iteration}}][]" class="form-control warnings summernote">{!! $plan->warnings !!}</textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="is_active_plan">¿Esta activo?</label>
                                        <br/>
                                        <input class="js-switch is_active_plan" id="is_active_plan{{$loop->iteration}}" name="is_active_plan[{{$loop->iteration}}][]" type="checkbox" value="1" {{ $plan->active == 1 ? 'checked' : '' }}>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <button class="btn btn-block btn-success" type="button" style="margin-top:22px" onclick="addNewRowStatic()"><i
                                        class="fa fa-plus"></i> Añadir otro plan</button>
                                </div>

                                <div class="clearfix"></div>
                                <hr/>
                            </div>
                        @empty
                            <div class="clone">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="price">Plan</label>
                                        <select name="plan_id[1][]" class="form-control plan_id" data-width="100%">
                                            <option value="">Seleccione un plan (periodos)</option>
                                            @foreach($plans as $c)
                                                <option value="{{ $c->id }}">{{ $c->months }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="price">Precio unitario</label>
                                        <input type="text" name="price_plan[1][]" class="form-control price"
                                        oninput="checkKeyByClass(this)" >
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="days">Días</label>
                                        <input type="number" name="days[1][]" min="7" class="form-control days"
                                        oninput="checkKeyByClass(this)" >
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="price">Posición</label>
                                        <select name="position[1][]" class="form-control position" data-width="100%">
                                            <option value="">Seleccione una Posición</option>
                                            @foreach($plans as $key => $c)
                                                <option value="{{ $key+1 }}">{{ $key+1 }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                 <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="avatar">Imagen</label>
                                        <div class="image-product">
                                            <img class="image-plan" id="image-plan-1" src="/images/image-default.jpeg">
                                        </div>
                                        <input type="file"
                                            name="plan_image[1][]"
                                            class="inputfile form-control image file-image-plan"
                                            id="file-image-plan-1"
                                            accept="image/x-png,image/gif,image/jpeg"
                                            onchange="inputFileChange(this)"
                                        />
                                        <label class="label" for="file-image-plan-1">Seleccione una imagen</label>
                                        <span class="help-block" id="label-error-image"></span>
                                        <div class="link-del" id="link-del-1" onclick="deleteImgLoopStatic(this);"></div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="warnings">Disclaimer</label>
                                        <textarea type="text" name="warnings[1][]" class="form-control warnings summernote"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="is_active_plan">¿Esta activo?</label>
                                        <br/>
                                        <input class="js-switch is_active_plan" id="is_active_plan1" name="is_active_plan[1][]" type="checkbox" value="1" checked>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <button class="btn btn-block btn-success" type="button" style="margin-top:22px" onclick="addNewRowStatic()"><i
                                        class="fa fa-plus"></i> Añadir otro plan</button>
                                </div>

                                <div class="clearfix"></div>
                                <hr/>
                            </div>
                        @endforelse

                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-12" style="font-style: italic;">
                                    Los campos con (*) son obligatorios.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-6">
                                <a href="{{route($config['route'] . 'index')}}" class="btn btn-default"><i
                                        class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}</a>
                            </div>
                            <div class="col-xs-6 text-right">
                                <button class="btn btn-primary" type="submit"><i
                                        class="fa fa-save"></i> {{ $config['blade']['btnUpdate']}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection

@section('styles')
    <!--Bootstrap Select [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/select2/css/select2.min.css" rel="stylesheet">
    <style>
        .image-product {
            width: 100%;
            height: 235px;
            border: 1px solid #c5c5c5;
            padding: 5px;
            margin-bottom: 10px;
            display: flex;
            background: #f5f5f5;
        }

        a.cke_dialog_ui_button_ok {
            color: #fff;
            background-color: #0869A6;
            border-color: rgb(25, 118, 210);
        }

        .image-product img {
            width: 100%;
            object-fit: cover;
        }

        .image-product:after {
            content: "";
            display: block;
            padding-bottom: 100%;
        }

        .inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        }

        .inputfile + label {
            font-size: 1.25em;
            font-weight: 700;
            color: white !important;
            width: 100%;
            background-color: #0869A6;
            border-color: #0869A6;
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            border: 1px solid transparent;
        }

        .inputfile:focus + label,
        .inputfile + label:hover {
            background-color: #0869A6;
            border-color: #0869A6;
        }

        .link-del {
            text-align: center;
            color: #0869A6;
            margin-top: 5px;
            cursor: pointer;
        }
    </style>
    <link href="/themes/intranet/plugins/summernote/summernote.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/switchery/switchery.min.css" rel="stylesheet">
@endsection

@section('scripts')
    <script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>
    <script src="/themes/intranet/plugins/rut/jquery.rut.js"></script>
    <script src="/themes/intranet/plugins/summernote/summernote.min.js"></script>

    <script src="/themes/intranet/plugins/switchery/switchery.min.js"></script>

    <script>
        $(document).ready(function () {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

            elems.forEach(function (html) {
                let switchery = new Switchery(html);
            });
        });
    </script>

    <script>

        /* password generator */
        function generatePassword() {
            var pass = Math.random().toString(36).substring(2);
            $('#password').val(pass);
        }
    </script>

    <script>
        function checkKey(name) {
            var clean = $('#' + name).val().replace(/[^0-9kK]/g, "");
            // don't move cursor to end if no change
            if (clean !== $('#' + name).val()) $('#' + name).val(clean);
        }

        function checkKeyByClass(element){
            var clean = $(element).val().replace(/[^0-9]/g, "");
            // don't move cursor to end if no change
            if (clean !== $(element).val()) $(element).val(clean);
        }
    </script>

    <script>
        function addNewRowStatic(){
            $(".clone").last().clone().insertAfter("div.clone:last");
            let count = $('.clone').length;
            $(".plan_id").last().val("");
            $(".plan_id").last().attr('name', 'plan_id[' + count + '][]');
            $(".plan_id").last().removeAttr("required");
            $(".position").last().val("");
            $(".position").last().attr('name', 'position[' + count + '][]');
            $(".position").last().removeAttr("required");
            $(".price").last().val("");
            $(".price").last().attr('name', 'price_plan[' + count + '][]');
            $(".days").last().val("");
            $(".days").last().attr('name', 'days[' + count + '][]');

            $(".is_active_plan").last().val(1);
            $(".is_active_plan").last().attr('name', 'is_active_plan[' + count + '][]');
            $(".is_active_plan").last().attr('id', 'is_active_plan' + count);
            $(".is_active_plan").last().prop('checked', true);
            $(".is_active_plan").last().removeData('switchery');
            $(".switchery").last().remove();
            active_plan = new Switchery(document.querySelector('input[name="is_active_plan[' + count + '][]"]'));


            $(".file-image-plan").last().attr('id', 'file-image-plan-'+count);
            $(".file-image-plan").last().val('');
            $(".file-image-plan").last().attr('name','plan_image['+count+'][]');
            $(".link-del").last().attr('id', 'link-del-'+count);
            $(".image-plan").last().attr('id', 'image-plan-'+count);
            $(".image-plan").last().attr('src', '/themes/intranet/img/image-default.jpeg');
            $(".label").last().attr('for', 'file-image-plan-'+count);

            $(".warnings").last().html('');

            $(".note-editor").last().remove();
            $(".warnings").last().attr('name', 'warnings[' + count + '][]');
            $(".warnings").last().removeAttr("required");

            let object = $(".warnings").last();
            $(object).summernote({

                height: 100,
                callbacks: {
                    onFocus: function (contents) {
                        if($(object).summernote('isEmpty')){
                            $(object).html('');
                        }
                    }
                }
            })
            $(object).summernote('reset');
        }
    </script>

    <script>
        $(document).ready(function() {
            $('.summernote').summernote({
                height: 200
            });

        });
    </script>

    <script>
        $(function () {
            $("input#rut").rut({
                formatOn: 'keyup',
                validateOn: 'change' // si no se quiere validar, pasar null
            }).on('rutInvalido', function () {
                alert("El rut " + $(this).val() + " es inválido");
                $(this).parents(".form-group").addClass("has-error");
                $(this).val("");
            }).on('rutValido', function () {
                $(this).parents(".form-group").removeClass("has-error")
            });


            $('.image-product').css('height', $('.image-product').innerWidth())
        });
    </script>

    <script>
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image-product').attr('src', e.target.result);
                    $('#link-del').html($('<i class="fa fa-trash"></i> <span>Eliminar</span>'));
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#file-image-product").change(function () {
            readURL(this);
        });

        function deleteImg() {
            $('#image-product').attr('src', '/images/producto-default.png');
            $('#link-del').html('');
            $("#file-image-product").val('');
        }

        function readPlanURL(input) {
            let slug = input.id.split('file-').pop();
            let loop = input.id.split('-').pop();
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#'+slug).attr('src', e.target.result);
                    $('#link-del-'+loop).html($('<i class="fa fa-trash"></i> <span>Eliminar</span>'));
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $(".file-image-plan").change(function () {
            readPlanURL(this);
        });

        function deleteImgLoop(loop) {
            $('#image-plan-'+loop).attr('src', '/themes/intranet/img/image-default.jpeg');
            $('#link-del-'+loop).html('');
            $("#file-image-plan-"+loop).val('');
        }

        function inputFileChange(el){
            readPlanURL(el);
        }

        function deleteImgLoopStatic(el) {
            let loop = el.id.split('-').pop();
            $('#image-plan-'+loop).attr('src', '/themes/intranet/img/image-default.jpeg');
            $('#link-del-'+loop).html('');
            $("#file-image-plan-"+loop).val('');
        }
    </script>

    <script>
        $(document).ready(function(){
            $(".amount").keyup(function () {
                $(this).val(function(){
                    var num = $(this).val().replace(/\./g, '');
                    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                });
            });

            $(".amount").on("input", function () {
                var clean = $(this).val().replace(/[^0-9]/g, "");
                // don't move cursor to end if no change
                if (clean !== $(this).val()) $(this).val(clean);
            });

            $(".amount").each(function () {
                $(this).val(function(){
                    var num = $(this).val().replace(/\./g, '');
                    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                });
            });

        });
    </script>
@endsection
