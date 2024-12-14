function PageTitle({ text }: { text: string }) {
    return (
        <h1 className="py-2 mt-4 text-4xl font-extrabold leading-relaxed text-center font-primary text-palette-primary sm:py-4">
            {text}
        </h1>
    );
}

export default PageTitle;
