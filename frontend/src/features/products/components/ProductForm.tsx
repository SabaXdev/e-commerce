'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Textarea } from '@/shared/components/ui/Textarea';
import { AppRoute } from '@/shared/constants/app-routes.enum';
import { useCreateProduct, useUpdateProduct } from '../hooks/useProductMutations';
import {
  createProductSchema,
  type CreateProductFormValues,
} from '../schemas/create-product.schema';
import type { Product } from '../types/product.types';

type ProductFormProps = {
  product?: Product;
};

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct(product?.id ?? '');
  const isEditing = Boolean(product);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description ?? '',
          price: Number(product.price),
          stockQuantity: product.stockQuantity,
        }
      : undefined,
  });

  const mutation = isEditing ? updateMutation : createMutation;

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async (values) => {
        if (isEditing) {
          await updateMutation.mutateAsync(values);
          router.push(AppRoute.AdminProducts);
          return;
        }

        await createMutation.mutateAsync(values);
        router.push(AppRoute.AdminProducts);
      })}
    >
      <Input label="Name" error={errors.name?.message} {...register('name')} />
      <Textarea
        label="Description"
        rows={4}
        error={errors.description?.message}
        {...register('description')}
      />
      <Input
        label="Price"
        type="number"
        step="0.01"
        error={errors.price?.message}
        {...register('price')}
      />
      <Input
        label="Stock quantity"
        type="number"
        error={errors.stockQuantity?.message}
        {...register('stockQuantity')}
      />

      {mutation.error ? (
        <p className="text-sm text-red-600">{mutation.error.message}</p>
      ) : null}

      <div className="flex gap-3">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : isEditing ? 'Update product' : 'Create product'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
