interface PriceProps {
    currency: string;
    nominal: number;
    className: string;
}

function Price({ currency, nominal, className }: PriceProps) {
    const formattedNominal = new Intl.NumberFormat("id-ID").format(nominal);
    return (
        <div className={className}>
            {currency}
            <span>{formattedNominal}</span>
        </div>
    );
}

export default Price;
