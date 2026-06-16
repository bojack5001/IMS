import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import LoginPage from '@/pages/auth/LoginPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ProductListPage from '@/pages/products/ProductListPage';
import CategoryListPage from '@/pages/categories/CategoryListPage';
import SupplierListPage from '@/pages/suppliers/SupplierListPage';
import TransactionListPage from '@/pages/transactions/TransactionListPage';
import PurchaseOrderListPage from '@/pages/purchases/PurchaseOrderListPage';
import ReportsPage from '@/pages/reports/ReportsPage';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'products',
            element: <ProductListPage />,
          },
          {
            path: 'categories',
            element: <CategoryListPage />,
          },
          {
            path: 'suppliers',
            element: <SupplierListPage />,
          },
          {
            path: 'transactions',
            element: <TransactionListPage />,
          },
          {
            path: 'purchases',
            element: <PurchaseOrderListPage />,
          },
          {
            path: 'reports',
            element: <ReportsPage />,
          },
        ],
      }
    ],
  },
]);
