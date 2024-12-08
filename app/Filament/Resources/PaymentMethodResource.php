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
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PaymentMethodResource extends Resource
{
    protected static ?string $model = PaymentMethod::class;

    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar';

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
                Toggle::make('status')->label('Is Active'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('bank_name'),
                Tables\Columns\TextColumn::make('account_number'),
                IconColumn::make('status')
                    ->label('Is active')
                    ->boolean()
                    ->trueColor('info')
                    ->falseColor('warning'),
            ])
            ->filters([
                //
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

    // protected $fillable = [
    //     'name',
    //     'bank_name',
    //     'bank_logo',
    //     'account_number',
    //     'account_holder',
    //     'qr_image',
    //     'status'
    // ];

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
