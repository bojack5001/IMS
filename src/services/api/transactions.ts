import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type Transaction = Database['public']['Tables']['inventory_transactions']['Row'];
type TransactionInsert = Database['public']['Tables']['inventory_transactions']['Insert'];

export const transactionsApi = {
  async getAll(): Promise<(Transaction & { product?: any, user?: any })[]> {
    const { data, error } = await supabase
      .from('inventory_transactions')
      .select(`
        *,
        product:products(name, sku),
        user:profiles(full_name, email)
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(transaction: TransactionInsert): Promise<Transaction> {
    const { data, error } = await supabase
      .from('inventory_transactions')
      .insert(transaction as any)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};
