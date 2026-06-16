import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type PurchaseOrder = Database['public']['Tables']['purchase_orders']['Row'];
type PurchaseOrderInsert = Database['public']['Tables']['purchase_orders']['Insert'];
type PurchaseOrderUpdate = Database['public']['Tables']['purchase_orders']['Update'];

export const purchasesApi = {
  async getAll(): Promise<(PurchaseOrder & { supplier?: any })[]> {
    const { data, error } = await supabase
      .from('purchase_orders')
      .select(`
        *,
        supplier:suppliers(company_name)
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(po: PurchaseOrderInsert): Promise<PurchaseOrder> {
    const { data, error } = await supabase
      .from('purchase_orders')
      .insert(po as any)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, po: PurchaseOrderUpdate): Promise<PurchaseOrder> {
    const { data, error } = await supabase
      .from('purchase_orders')
      // @ts-ignore
      .update(po as any)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};
