import { useContext } from 'react';
import DrawerCard from './DrawerCard';
import { AppContext } from '../App';

export default function DrawerSneakers ( {items, DeleteCard, onClickOrder} ) {
    const { drawerCard } = useContext(AppContext);

    const totalDrawerPrice = drawerCard.reduce((prev, obj) => obj.price + prev, 0);
    const summTax = (totalDrawerPrice / 100 * 5).toFixed(0);
    const totalSumm = Number(totalDrawerPrice) + Number(summTax)

    return (
        <>
            <div className='flex flex-col gap-3'>
                {items.map((obj, index) => (
                <DrawerCard
                    key={index}
                    {...obj}
                    DeleteCard={DeleteCard} />
                ))}
            </div>
        <div className='absolute bottom-4 mt-7 flex flex-col gap-3'>
            <div className='flex items-end justify-between'>
                <p>Цена: </p>
                <span className='span-border'></span>
                <p className='font-medium'>{totalDrawerPrice} руб.</p>
            </div>
            <div className='flex items-end justify-between'>
                <p>Налог 5%:</p>
                <span className='span-border'></span>
                <p className='font-medium'>{summTax} руб.</p>
            </div>
            <div className='flex items-end justify-between'>
                <p>Итого:</p>
                <span className='span-border'></span>
                <p className='font-medium'>{totalSumm} руб.</p>
            </div>
            <button 
            onClick={onClickOrder}  
            className='w-full h-14 rounded-2xl bg-lime-500 opacity-80 transition hover:opacity-100'>
                
                <div className='flex items-center justify-center'>
                    <p className='text-white font-medium mr-10'>Оформить заказ</p>
                    <span>
                        <img src="./src/assets/btn-arrow.svg" alt="arrow" />
                    </span>
                </div>
            </button>
        </div>
        </>
        )
    }