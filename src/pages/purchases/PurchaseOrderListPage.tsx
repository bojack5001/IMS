import { useQuery } from '@tanstack/react-query';
import { purchasesApi } from '@/services/api/purchases';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const INR = '\u20B9';

export default function PurchaseOrderListPage() {
  const { data: pos, isLoading } = useQuery({
    queryKey: ['purchases'],
    queryFn: purchasesApi.getAll,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Purchase Orders</h2>
          <p className="text-muted-foreground">
            Manage your purchase orders and supplier deliveries.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create PO
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO Number</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : !pos?.length ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No purchase orders found.
                </TableCell>
              </TableRow>
            ) : (
              pos.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">{po.po_number}</TableCell>
                  <TableCell>{po.supplier?.company_name || 'Unknown'}</TableCell>
                  <TableCell>{format(new Date(po.created_at), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{INR}{po.total_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={
                      po.status === 'received' ? 'default' : 
                      po.status === 'pending' ? 'secondary' : 
                      po.status === 'cancelled' ? 'destructive' : 'outline'
                    }>
                      {po.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
