'use client'

import Image from 'next/image'
import { MouseEventHandler } from 'react'
import { Expand, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'

import Currency from '@/components/ui/currency'
import usePreviewModal from '@/hooks/usePreviewModal'
import useCart from '@/hooks/useCart'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'

interface ProductCard {
  data: Product
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const previewModal = usePreviewModal()
  const cart = useCart()
  const router = useRouter()

  const handleClick = () => {
    router.push(`/product/${data?.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    previewModal.onOpen(data)
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    cart.addItem(data)
  }

  return (
    <div
      onClick={handleClick}
      className=' group cursor-pointer rounded-xl border p-3 space-y-4'
    >
      {/* Image & actions */}
      <div className='aspect-square rounded-xl  relative'>
        <Image
          src={data?.images?.[0]?.url}
          alt=''
          fill
          className='aspect-square object-cover rounded-md'
        />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            <Button onClick={onPreview}>
            <Expand size={20} className='' />
            </Button>
            <Button onClick={onAddToCart} size='icon'>
              <ShoppingCart size={20} className='' />
            </Button>
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className='font-semibold text-lg'>{data.name}</p>
        <p className='text-sm '>{data.category?.name}</p>
      </div>
      {/* Price & Reiew */}
      <div className='flex items-center justify-between'>
        <Currency value={data?.price} />
      </div>
    </div>
  )
}

export default ProductCard
