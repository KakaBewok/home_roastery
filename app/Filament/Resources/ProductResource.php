<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-archive-box';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')->required()
                    ->maxLength(255),

                Select::make('category_id')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload()
                    ->required()
                    ->createOptionForm([
                        TextInput::make('name')->required()
                            ->maxLength(255)->label('Category'),
                        Textarea::make('description')->rows(10)
                            ->cols(20),
                    ]),

                Repeater::make('photos')
                    ->relationship('photos')
                    ->schema([
                        FileUpload::make('image_url')
                            ->label('Upload image')
                            ->image()
                            ->directory('photos')
                            ->maxSize(1024)
                            ->acceptedFileTypes(['image/jpeg', 'image/png'])
                    ])
                    ->label('Product images'),
                MarkdownEditor::make('description'),
                Toggle::make('is_publish')
                    ->label('Show in online store?')
                    ->default(true)
                    ->inline(false),
                Repeater::make('sizes')
                    ->label('Product Size/Weight')
                    ->relationship('sizes')
                    ->schema([
                        TextInput::make('size')
                            ->label('Size/Weight')
                            ->required()->columns(1),

                        Repeater::make('variants')
                            ->label('Variant')
                            ->relationship('variants')
                            ->schema([
                                TextInput::make('type')
                                    ->label('Type')
                                    ->required(),
                                TextInput::make('color')
                                    ->label('Color'),
                                TextInput::make('stock')
                                    ->numeric()
                                    ->required()
                                    ->label('Stock')
                                    ->minValue(0),
                                TextInput::make('price')
                                    ->label('Price')
                                    ->numeric()
                                    ->required()
                                    ->minValue(0),
                                TextInput::make('original_price')
                                    ->label('Strikethrough Price')
                                    ->numeric()
                                    ->minValue(0),

                            ])
                            ->required()->columns(3),
                    ])
                    ->columnSpan('full')
                    ->columns(2)
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->query(
                Product::query()
                    ->select('products.*')
                    ->selectRaw('(
                        SELECT SUM(product_variants.stock) 
                        FROM product_variants 
                        JOIN product_sizes ON product_variants.product_size_id = product_sizes.id
                        WHERE product_sizes.product_id = products.id
                    ) AS total_stock')
                    ->selectRaw('(
                        SELECT MIN(product_variants.price) 
                        FROM product_variants 
                        JOIN product_sizes ON product_variants.product_size_id = product_sizes.id
                        WHERE product_sizes.product_id = products.id
                    ) AS starting_price')
            )
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('total_stock')
                    ->label('Total Stock')
                    ->sortable(query: function ($query, $direction) {
                        return $query->orderBy('total_stock', $direction);
                    }),

                TextColumn::make('starting_price')
                    ->label('Starting Price')
                    ->formatStateUsing(fn($state) => 'Rp ' . number_format($state, 0, ',', '.'))
                    ->sortable(query: function ($query, $direction) {
                        return $query->orderBy('starting_price', $direction);
                    }),

                IconColumn::make('is_publish')
                    ->boolean()
            ])->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('is_out_of_stock')
                    ->label('Stock Status')
                    ->options([
                        'out of stock' => 'Out of Stock',
                        'in stock' => 'In Stock'
                    ])
                    ->query(function (Builder $query, array $data) {
                        if (!isset($data['value'])) {
                            return;
                        }
                        if ($data['value'] === 'out of stock') {
                            $query->whereDoesntHave('sizes.variants', function (Builder $query) {
                                $query->where('stock', '>', 0);
                            });
                        } elseif ($data['value'] === 'in stock') {
                            $query->whereHas('sizes.variants', function (Builder $query) {
                                $query->where('stock', '>', 0);
                            });
                        }
                    })
            ])
            ->actions([
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
