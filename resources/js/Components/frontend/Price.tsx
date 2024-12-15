interface PriceProps {
    currency: string;
    nominal: number;
    className: string;
}

function Price({ currency, nominal, className }: PriceProps) {
    return (
        <>
            {currency}
            <span className={className}>{nominal}</span>
        </>
    );
}

export default Price;
