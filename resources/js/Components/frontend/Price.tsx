interface PriceProps {
    currency: string;
    nominal: number;
    className: string;
}

function Price({ currency, nominal, className }: PriceProps) {
    const formattedNominal = new Intl.NumberFormat("id-ID").format(nominal);
    return (
        <>
            {currency}
            <span className={className}>{formattedNominal}</span>
        </>
    );
}

export default Price;
