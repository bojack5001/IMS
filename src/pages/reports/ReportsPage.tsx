import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { productsApi } from '@/services/api/products';
import { transactionsApi } from '@/services/api/transactions';
import { purchasesApi } from '@/services/api/purchases';
import { suppliersApi } from '@/services/api/suppliers';

export default function ReportsPage() {
  const { toast } = useToast();
  const [exporting, setExporting] = useState<string | null>(null);

  const downloadCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast({ title: 'No data to export', variant: 'destructive' });
      return;
    }
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(value => {
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
           return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    ).join('\n');
    
    const csvContent = headers + '\n' + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({ title: 'Export Successful', description: `${filename}.csv has been downloaded.` });
  };

  const handleExport = async (type: string) => {
    try {
      setExporting(type);
      let data = [];
      
      switch(type) {
        case 'inventory':
          data = await productsApi.getAll();
          break;
        case 'low-stock':
          const products = await productsApi.getAll();
          data = products.filter(p => p.stock_quantity <= p.minimum_stock);
          break;
        case 'movement':
          data = await transactionsApi.getAll();
          break;
        case 'purchases':
          data = await purchasesApi.getAll();
          break;
        case 'suppliers':
          data = await suppliersApi.getAll();
          break;
        default:
          throw new Error('Unknown report type');
      }
      
      downloadCSV(data, `report_${type}`);
    } catch (error: any) {
      toast({ title: 'Export Failed', description: error.message, variant: 'destructive' });
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Generate and export business intelligence reports.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Report</CardTitle>
            <CardDescription>Current stock levels and valuation.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => handleExport('inventory')} disabled={exporting === 'inventory'}>
              {exporting === 'inventory' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />} Export CSV
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
            <CardDescription>Items at or below minimum stock level.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => handleExport('low-stock')} disabled={exporting === 'low-stock'}>
              {exporting === 'low-stock' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />} Export CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock Movement</CardTitle>
            <CardDescription>Historical stock in/out transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => handleExport('movement')} disabled={exporting === 'movement'}>
              {exporting === 'movement' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />} Export CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Purchase History</CardTitle>
            <CardDescription>Completed and pending purchase orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => handleExport('purchases')} disabled={exporting === 'purchases'}>
              {exporting === 'purchases' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />} Export CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suppliers List</CardTitle>
            <CardDescription>Current active supplier details and history.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => handleExport('suppliers')} disabled={exporting === 'suppliers'}>
              {exporting === 'suppliers' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />} Export CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
