<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
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
                Forms\Components\TextInput::make('name')->required()
                    ->maxLength(255),
                Forms\Components\Select::make('category_id')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload()
                    ->required()
                    ->createOptionForm([
                        Forms\Components\TextInput::make('name')->required()
                            ->maxLength(255)->label('Category'),
                        Forms\Components\Textarea::make('description')->rows(10)
                            ->cols(20),
                    ]),
                Forms\Components\Repeater::make('sizes')
                    ->label('Product Sizes')
                    ->relationship('sizes')
                    ->schema([
                        Forms\Components\TextInput::make('size')
                            ->label('Size')
                            ->required()
                            ->unique('product_sizes', 'size', function ($query) {
                                $query->where('product_id', request()->route('record'));
                            }),
                        Forms\Components\TextInput::make('price')
                            ->label('Price')
                            ->numeric()
                            ->required()
                            ->minValue(0),
                        TextInput::make('original_price')
                            ->label('Strikethrough Price')
                            ->numeric()
                            ->minValue(0),
                        Forms\Components\Select::make('unit')
                            ->required()
                            ->options([
                                'Gram' => 'Gram',
                                'Kilogram' => 'Kilogram',
                            ]),
                        TextInput::make('stock')
                            ->numeric()
                            ->required()
                            ->label('Stock')
                            ->minValue(0),
                    ])
                    ->columns(2),
                Forms\Components\Repeater::make('photos')
                    ->relationship('photos')
                    ->schema([
                        Forms\Components\FileUpload::make('image_url')
                            ->label('Upload image')
                            ->image()
                            ->directory('photos')
                            ->maxSize(1024)
                            ->acceptedFileTypes(['image/jpeg', 'image/png'])
                    ])
                    ->columns(1)
                    ->label('Product images'),
                Forms\Components\MarkdownEditor::make('description'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('startingPrice')
                    ->label('Starting Price')
                    ->formatStateUsing(fn($state) => 'Rp ' . number_format($state, 0, ',', '.')),
                Tables\Columns\TextColumn::make('totalStock')
                    ->label('Total Stock'),
            ])
            ->filters([
                SelectFilter::make('out_of_stock')
                    ->label('Out of Stock')
                    ->options([
                        1 => 'Out of Stock',
                        0 => 'In Stock'
                    ])
                    ->query(function (Builder $query, $value) {
                        if ($value == 1) {
                            $query->whereHas('sizes', function (Builder $query) {
                                $query->havingRaw('SUM(stock) = 0');
                            });
                        } else {
                            $query->whereHas('sizes', function (Builder $query) {
                                $query->havingRaw('SUM(stock) > 0');
                            });
                        }
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
