<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PaymentMethodResource\Pages;
use App\Filament\Resources\PaymentMethodResource\RelationManagers;
use App\Models\PaymentMethod;
use Filament\Forms;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PaymentMethodResource extends Resource
{
    protected static ?string $model = PaymentMethod::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('bank_name')->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('account_number')->required()
                    ->numeric()
                    ->required(),
                Forms\Components\TextInput::make('account_holder')->required()
                    ->maxLength(255),
                Forms\Components\FileUpload::make('qr_image')
                    ->label('Upload QR image')
                    ->image()
                    ->directory('photos')
                    ->maxSize(1024)
                    ->acceptedFileTypes(['image/jpeg', 'image/png']),
                Forms\Components\FileUpload::make('bank_logo')
                    ->label('Upload bank logo')
                    ->image()
                    ->directory('photos')
                    ->maxSize(1024)
                    ->acceptedFileTypes(['image/jpeg', 'image/png']),
                Toggle::make('Is active'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListPaymentMethods::route('/'),
            'create' => Pages\CreatePaymentMethod::route('/create'),
            'edit' => Pages\EditPaymentMethod::route('/{record}/edit'),
        ];
    }
}
