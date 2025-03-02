import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (size: string, type: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
}) => {
    const [size, setSize] = useState("M");
    const [type, setType] = useState("Standard");

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Pilih Ukuran dan Tipe Produk</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* <div>
              <h3 className="mb-2 font-semibold">Pilih Ukuran:</h3>
              <RadioGroup value={size} onValueChange={setSize}>
                <RadioGroupItem value="S">S</RadioGroupItem>
                <RadioGroupItem value="M">M</RadioGroupItem>
                <RadioGroupItem value="L">L</RadioGroupItem>
                <RadioGroupItem value="XL">XL</RadioGroupItem>
              </RadioGroup>
            </div> */}

                    {/* <div>
              <h3 className="mb-2 font-semibold">Pilih Tipe:</h3>
              <RadioGroup value={type} onValueChange={setType}>
                <RadioGroupItem value="Standard">Standard</RadioGroupItem>
                <RadioGroupItem value="Premium">Premium</RadioGroupItem>
              </RadioGroup>
            </div> */}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Batal
                    </Button>
                    <Button onClick={() => onConfirm(size, type)}>
                        Konfirmasi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
