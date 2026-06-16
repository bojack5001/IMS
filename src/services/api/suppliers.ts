import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type Supplier = Database['public']['Tables']['suppliers']['Row'];
type SupplierInsert = Database['public']['Tables']['suppliers']['Insert'];
type SupplierUpdate = Database['public']['Tables']['suppliers']['Update'];

export const suppliersApi = {
  async getAll(): Promise<Supplier[]> {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .order('company_name');
    if (error) throw error;
    return data;
  },

  async getById(id: string): Promise<Supplier> {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(supplier: SupplierInsert): Promise<Supplier> {
    const { data, error } = await supabase
      .from('suppliers')
      .insert(supplier as any)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, supplier: SupplierUpdate): Promise<Supplier> {
    const { data, error } = await supabase
      .from('suppliers')
      // @ts-ignore
      .update(supplier as any)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('suppliers')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};
