import React from 'react'
import { Button } from '@d-edge/overnight-hotelier-react';
import { useEffect } from 'react';
import { fetchBookingsData } from '../utils/api';
import { formatDate } from '../utils/api';
import Loading from '../components/Loading';


export default function BookingList({
    setOpen
}) {
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const loadData = async () => {
            
            setIsLoading(true);
            setError(null);
            try {
                const result = await fetchBookingsData("https://jeuumtt27yzqwwd443ope7dcea0vnrca.lambda-url.us-east-1.on.aws/?date=2025-05-22");
                setData(result);
                console.log("API Response:", result);
            } catch (err) {
                setError(err.message || 'Failed to fetch data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

  return (
    <div id="booking-list">
      <div className="huih-u-container huih-title-wrapper">
        <div className="htl-u-flex-row htl-u-gap-8 htl-u-align-items-center">
        <p class="huih-title">Bookings 
        </p>
            <Button
                type="button"
                variation="solid"
                className="htl-u-margin-inline-24"
                onClick={() => setOpen(true)}
            >
            Discover my day
          </Button>
        </div>
        <div class="avp-header__module__top__action">
            <a class="huih-button huih-button--help" target="_blank" onclick="onHelpButtonClick(event, 'https://extranet.help-center.staging.d-edge.app/fr-fr/Content/Extranet/Reservations/Bookings.htm');">
              Need help?
            </a>
        </div>
      </div>
        {isLoading && <Loading />}
        {error && <p>Error: {error}</p>}
        { !isLoading && !error && data && (
            <table className="htl-table">
            <caption>
                <p className="htl-u-typography-body-1-default">
                Showing {" "}
                <span className="htl-u-typography-body-1-strong htl-u-color-text-brand-strong">
                    {data.length} bookings {" "}
                </span> 
                {/* for a total of {" "}
                <span className="htl-u-typography-body-1-strong htl-u-color-text-brand-strong">
                    €3,189,00, NZ$178,00
                </span>. */}
                </p>
            </caption>
            <thead className="htl-table__head">
                <tr>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Status
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"                         className="fa-memo-circle-info fa-solid htl-icon" 
                        style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
                        >
                            <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 141.3 128 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96zm352 333.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L448 370.7 448 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96z"/></svg>
                    </button>
                </th>
                <th className="" scope="col"></th>
                <th className="" scope="col">Reference</th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Purchased
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"                         className="fa-memo-circle-info fa-solid htl-icon" 
                        style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
                        >
                            <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 141.3 128 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96zm352 333.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L448 370.7 448 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96z"/></svg>
                    </button>
                </th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Check-In
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"                         className="fa-memo-circle-info fa-solid htl-icon" 
                        style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
                        >
                            <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 141.3 128 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96zm352 333.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L448 370.7 448 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96z"/></svg>
                    </button>
                </th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Check-Out
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"                         className="fa-memo-circle-info fa-solid htl-icon" 
                        style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
                        >
                            <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 141.3 128 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96zm352 333.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L448 370.7 448 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96z"/></svg>
                    </button>
                </th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Customer details
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"                         className="fa-memo-circle-info fa-solid htl-icon" 
                        style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
                        >
                            <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 141.3 128 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96zm352 333.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L448 370.7 448 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96z"/></svg>
                    </button>
                </th>
                <th className="" scope="col">Basket detail</th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Origin
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"                         className="fa-memo-circle-info fa-solid htl-icon" 
                        style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
                        >
                            <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 141.3 128 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96zm352 333.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L448 370.7 448 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96z"/></svg>
                    </button>
                </th>
                <th className="" scope="col">Rate</th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Amount
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"                         className="fa-memo-circle-info fa-solid htl-icon" 
                        style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
                        >
                            <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 141.3 128 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96zm352 333.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L448 370.7 448 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96z"/></svg>
                    </button>
                </th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Guarantee
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"                         className="fa-memo-circle-info fa-solid htl-icon" 
                        style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
                        >
                            <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 141.3 128 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96zm352 333.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L448 370.7 448 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96z"/></svg>
                    </button>
                </th>
                <th className="" scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    
                <tr key={index}>
                <td className="">
                    <span className="two-line-clamp">
                    {/* <FontAwesomeIcon icon={faCrown} size="lg" className="htl-table-vip htl-u-margin-inline-end-16" /> */}
                    {
                        item.status === "Cancelled" ? (
                            <span className="htl-badge htl-badge--color-blue">{item.status}</span>
                        ) : item.status === "Confirmed" ? (
                            <span className="htl-badge htl-badge--color-green">{item.status}</span>
                        ) : item.status === "Pending" ? (
                            <span className="htl-badge htl-badge--color-yellow">{item.status}</span>
                        ) : (
                            <span className="htl-badge htl-badge--color-red">{item.status}</span>
                        )
                    }
                    
                    </span>
                </td>
                <td className="htl-u-color-text-neutral-default">
                    <svg 
                        className="fa-memo-circle-info fa-solid htl-icon htl-u-color-text-neutral-default" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 576 512"
                        style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px' }}
                    >
                    <path d="M0 64C0 28.7 28.7 0 64 0L320 0c35.3 0 64 28.7 64 64l0 134.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7L64 512c-35.3 0-64-28.7-64-64L0 64zm64 80c0 8.8 7.2 16 16 16l224 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L80 128c-8.8 0-16 7.2-16 16zm16 80c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L80 224zm0 96c-8.8 0-16 7.2-16 16s7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0zm352-96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm0 96a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm-32 48c0 8.8 7.2 16 16 16c0 0 0 0 0 0l0 48s0 0 0 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l16 0 16 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l0-64c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16z"/></svg>
                </td>
                <td className="htl-u-typography-body-2-strong">
                    <span className="two-line-clamp">{item.reference}</span>
                </td>
                <td className="">
                    <span className="two-line-clamp">
                    <span>{formatDate(item.purchaseDate)}</span>
                    </span>
                </td>
                <td className="">
                    <span className="two-line-clamp">
                    <span className="htl-u-typography-body-2-strong">May 25, 2025 {formatDate(item.checkInDate)}</span>
                    </span>
                </td>
                <td className="">
                    <span className="two-line-clamp">
                    <span className="htl-u-typography-body-2-strong">May 26, 2025 {formatDate(item.checkOutDate)}</span>
                    </span>
                </td>
                <td className="">
                    <span className="two-line-clamp">{item.customer}</span>
                </td>
                <td className="">
                    <span className="two-line-clamp">{item.basketDetails}</span>
                </td>
                <td className="">
                    <span className="two-line-clamp">{item.origin}</span>
                </td>
                <td className="">
                    <span className="two-line-clamp">
                    <span
                        className="single-value htl-u-typography-body-2-strong two-line-clamp"
                        data-state="closed"
                    >
                        {item.rate}
                    </span>
                    </span>
                </td>
                <td className="htl-u-text-align-end">
                    <span className="two-line-clamp">{item.totalPrice}</span>
                </td>
                <td className="htl-u-text-align-end">
                    <span className="two-line-clamp">{item.guarantee}</span>
                </td>
                <td className="htl-u-text-align-end">
                    <span className="two-line-clamp">
                    <a
                        className="htl-button htl-button--ghost"
                        href="/Booking/fr/13893/bookinglist/details/6810ac12ec5e85ee8b3ea625?mode=hotel"
                        data-discover="true"
                    >
                        View<span role="status" className="htl-u-visually-hidden"></span>
                    </a>
                    </span>
                </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
      </div>
  )
}