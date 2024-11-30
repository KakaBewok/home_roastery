<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
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
                Forms\Components\TextInput::make('price')->required()
                    ->numeric()
                    ->prefix('IDR')
                    ->required(),
                Forms\Components\Select::make('unit')->required()->options([
                    'gram' => 'Gram',
                    'kilogram' => 'Kilogram',
                    'pcs' => 'Pcs',
                ]),
                Forms\Components\TextInput::make('stock')->required()
                    ->numeric()
                    ->required(),
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
                Forms\Components\Repeater::make('photos')
                    ->relationship('photos')
                    ->schema([
                        Forms\Components\FileUpload::make('image_url')
                            ->label('Product image')
                            ->image()
                            ->directory('photos')
                            ->required(),
                    ])
                    ->columns(1) // Tampilkan satu kolom
                    ->label('Foto Produk'),
                Forms\Components\Textarea::make('description')->rows(10)
                    ->cols(20),

            ]);

        // 'category_id', ===
        // 'name', === xxx
        // 'description', === xxx
        // 'price', === xxx
        // 'unit', === xxx
        // 'stock', === xxx
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->sortable(),
                Tables\Columns\TextColumn::make('unit'),
                Tables\Columns\TextColumn::make('stock')
                    ->sortable(),
            ])
            ->filters([
                Filter::make('stock')
                    ->label('Out of stock')
                    ->query(fn(Builder $query): Builder => $query->where('stock', '<', 1)),
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
