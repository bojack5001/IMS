import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/services/api/products';
import { categoriesApi } from '@/services/api/categories';
import { suppliersApi } from '@/services/api/suppliers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import ProductFormModal from '@/components/products/ProductFormModal';
import type { Database } from '@/types/database.types';

const INR = '₹';

type Product = Database['public']['Tables']['products']['Row'];

export default function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  });

  const { data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: suppliersApi.getAll,
  });

  const getCategoryName = (id: string | null) => {
    if (!id) return '-';
    return categories?.find(c => c.id === id)?.name || '-';
  };

  const getSupplierName = (id: string | null) => {
    if (!id) return '-';
    return suppliers?.find(s => s.id === id)?.company_name || '-';
  };

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your inventory products and stock levels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : !filteredProducts?.length ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{getCategoryName(product.category_id)}</TableCell>
                  <TableCell>{getSupplierName(product.supplier_id)}</TableCell>
                  <TableCell className="text-right">{INR}{product.selling_price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <span className={product.stock_quantity <= product.minimum_stock ? 'text-destructive font-bold' : ''}>
                      {product.stock_quantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    {product.stock_quantity <= 0 ? (
                      <Badge variant="destructive">Out of Stock</Badge>
                    ) : product.stock_quantity <= product.minimum_stock ? (
                      <Badge variant="outline" className="text-orange-500 border-orange-500">Low Stock</Badge>
                    ) : (
                      <Badge variant="default" className="bg-green-500">In Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProductFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={selectedProduct}
      />
    </div>
  );
}
