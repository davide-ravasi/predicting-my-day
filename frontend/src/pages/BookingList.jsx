import React from 'react'
import { Button } from '@d-edge/overnight-hotelier-react';
import { useEffect } from 'react';
import { fetchBookingsData } from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';


export default function BookingList({
    setOpen
}) {
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // useEffect(() => {
    //     const loadData = async () => {
            
    //         setIsLoading(true);
    //         setError(null);
    //         try {
    //             const result = await fetchBookingsData("https://q6da6o3op4dirpctuohcph5gia0ddkxo.lambda-url.us-east-1.on.aws/");
    //             setData(result);
    //         } catch (err) {
    //             setError(err.message || 'Failed to fetch data. Please try again later.');
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     loadData();
    // }, []);

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
        {/* {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>} */}
        { (
            <table className="htl-table">
            <caption>
                <p className="htl-u-typography-body-1-default">
                Showing {" "}
                <span className="htl-u-typography-body-1-strong htl-u-color-text-brand-strong">
                    7 bookings {" "}
                </span> 
                for a total of {" "}
                <span className="htl-u-typography-body-1-strong htl-u-color-text-brand-strong">
                    €3,189,00, NZ$178,00
                </span>.
                </p>
            </caption>
            <thead className="htl-table__head">
                <tr>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Status
                    <i
                        aria-hidden="true"
                        className="fa-arrow-up-arrow-down fa-solid htl-icon htl-icon--small htl-table-sort__icon htl-table-sort__icon--sort-none"
                    ></i>
                    </button>
                </th>
                <th className="" scope="col"></th>
                <th className="" scope="col">Reference</th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Purchased
                    <i
                        aria-hidden="true"
                        className="fa-arrow-up-arrow-down fa-solid htl-icon htl-icon--small htl-table-sort__icon htl-table-sort__icon--sort-descending"
                    ></i>
                    </button>
                </th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Check-In
                    <i
                        aria-hidden="true"
                        className="fa-arrow-up-arrow-down fa-solid htl-icon htl-icon--small htl-table-sort__icon htl-table-sort__icon--sort-none"
                    ></i>
                    </button>
                </th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Check-Out
                    <i
                        aria-hidden="true"
                        className="fa-arrow-up-arrow-down fa-solid htl-icon htl-icon--small htl-table-sort__icon htl-table-sort__icon--sort-none"
                    ></i>
                    </button>
                </th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Customer details
                    <i
                        aria-hidden="true"
                        className="fa-arrow-up-arrow-down fa-solid htl-icon htl-icon--small htl-table-sort__icon htl-table-sort__icon--sort-none"
                    ></i>
                    </button>
                </th>
                <th className="" scope="col">Détail du panier</th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Origin
                    <i
                        aria-hidden="true"
                        className="fa-arrow-up-arrow-down fa-solid htl-icon htl-icon--small htl-table-sort__icon htl-table-sort__icon--sort-none"
                    ></i>
                    </button>
                </th>
                <th className="" scope="col">Tarif</th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Amount
                    <i
                        aria-hidden="true"
                        className="fa-arrow-up-arrow-down fa-solid htl-icon htl-icon--small htl-table-sort__icon htl-table-sort__icon--sort-none"
                    ></i>
                    </button>
                </th>
                <th scope="col" aria-sort="none" className="htl-table__head--sortable">
                    <button type="button" className="htl-table-sort htl-table-sort--sort-none">
                    Guarantee
                    <i
                        aria-hidden="true"
                        className="fa-arrow-up-arrow-down fa-solid htl-icon htl-icon--small htl-table-sort__icon htl-table-sort__icon--sort-none"
                    ></i>
                    </button>
                </th>
                <th className="" scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr className="htl-u-color-background-success-weaker">
                <td className="">
                    <span className="two-line-clamp">
                    <FontAwesomeIcon icon={faCrown} size="lg" className="htl-table-vip htl-u-margin-inline-end-16" />
                    <span className="htl-badge htl-badge--color-blue">Confirmed</span>
                    
                    </span>
                </td>
                <td className="htl-u-color-text-neutral-default">
                    <i
                    aria-hidden="true"
                    className="fa-memo-circle-info fa-solid htl-icon htl-icon--medium htl-u-color-text-neutral-default"
                    data-state="closed"
                    ></i>
                </td>
                <td className="htl-u-typography-body-2-strong">
                    <span className="two-line-clamp">JH6DK6</span>
                </td>
                <td className="">
                    <span className="two-line-clamp">
                    <span>Apr 29, 2025, 12:38 PM</span>
                    </span>
                </td>
                <td className="">
                    <span className="two-line-clamp">
                    <span className="htl-u-typography-body-2-strong">May 25, 2025</span>
                    </span>
                </td>
                <td className="">
                    <span className="two-line-clamp">
                    <span className="htl-u-typography-body-2-strong">May 26, 2025</span>
                    </span>
                </td>
                <td className="">
                    <span className="two-line-clamp">Mrs TEST Alix</span>
                </td>
                <td className="">
                    <span className="two-line-clamp">1 Double room - Romantic with balcony</span>
                </td>
                <td className="">
                    <span className="two-line-clamp">UI Group</span>
                </td>
                <td className="">
                    <span className="two-line-clamp">
                    <span
                        className="single-value htl-u-typography-body-2-strong two-line-clamp"
                        data-state="closed"
                    >
                        RACKPRI
                    </span>
                    </span>
                </td>
                <td className="htl-u-text-align-end">
                    <span className="two-line-clamp">€100.00</span>
                </td>
                <td className="htl-u-text-align-end">
                    <span className="two-line-clamp">€42,00</span>
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
            </tbody>
            </table>
        )}
      </div>
  )
}