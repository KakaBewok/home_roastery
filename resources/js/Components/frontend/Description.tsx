import { Product } from "@/types/frontend/product";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Description = ({ product }: { product: Product }) => {
    const descriptionRef = useRef<HTMLDivElement>(null);
    const [showReadMore, setShowReadMore] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    useEffect(() => {
        if (descriptionRef.current) {
            const lineHeight = parseFloat(
                getComputedStyle(descriptionRef.current).lineHeight
            );
            const maxHeight = lineHeight * 5;
            setShowReadMore(descriptionRef.current.scrollHeight > maxHeight);
        }
    }, [product.description]);

    return (
        <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">Description</h3>

            {product.description?.trim() ? (
                <>
                    <div
                        ref={descriptionRef}
                        className={`prose-sm prose text-pretty text-xs/5 md:text-sm/6 text-slate-500 ${
                            isExpanded ? "" : "line-clamp-5"
                        }`}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {product.description}
                        </ReactMarkdown>
                    </div>
                    {showReadMore && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-1 text-xs underline text-slate-500"
                        >
                            {isExpanded ? "Show less" : "Read more"}
                        </button>
                    )}
                </>
            ) : (
                <p className="text-sm font-light text-slate-400">
                    No description.
                </p>
            )}
        </div>
    );
};
