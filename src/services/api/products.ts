import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

export const productsApi = {
  async getAll(): Promise<(Product & { category?: any, supplier?: any })[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(name),
        supplier:suppliers(company_name)
      `)
      .order('name');
    if (error) throw error;
    return data;
  },

  async getById(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        supplier:suppliers(*)
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(product: ProductInsert): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product as any)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, product: ProductUpdate): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      // @ts-ignore
      .update(product as any)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};
