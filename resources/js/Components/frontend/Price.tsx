interface PriceProps {
    currency: string;
    nominal: number;
    className: string;
}

function Price({ currency, nominal, className }: PriceProps) {
    const formattedNominal = new Intl.NumberFormat("id-ID").format(nominal);
    return (
        <p className={className}>
            {currency}
            <span>{formattedNominal}</span>
        </p>
    );
}

export default Price;
