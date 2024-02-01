import { supabase } from '~/utils/supabase';
import { $, type Signal } from '@builder.io/qwik';

export const getAdminUserId = $(async (adminUserId: Signal<string>): Promise<string> => {
  const { data, error } = await supabase.from('shop').select('user_id').limit(1);
  if (error) console.error(error);
  adminUserId.value = data?.[0].user_id;
  return adminUserId.value;
});
