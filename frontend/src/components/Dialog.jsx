import { Card, Dialog as OvernightDialog, DialogContent, DialogHeader, DialogBody } from '@d-edge/overnight-hotelier-react';
import { useState, useEffect } from 'react';
import CountCard from './CountCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingDashedLineArrowRight, faPersonWalkingLuggage, faPrint } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { printDocument } from '../utils/printUtils';
import { fetchData } from '../utils/api';

export default function Dialog({
    isOpen,
    setOpen
}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    const dialogBodyRef = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            if (!isOpen) return;
            
            setIsLoading(true);
            setError(null);
            try {
                // https://q6da6o3op4dirpctuohcph5gia0ddkxo.lambda-url.us-east-1.on.aws/
                const result = await fetchData("https://q6da6o3op4dirpctuohcph5gia0ddkxo.lambda-url.us-east-1.on.aws/");
                //const result = await fetchData("https://bvsqurrdgswa6wytinw3cbyd4i0jvwip.lambda-url.us-east-1.on.aws/");
                setData(result);
            } catch (err) {
                setError(err.message || 'Failed to fetch data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [isOpen]);

    const handlePrint = () => {
        if (data) {
            printDocument(formattedDate, data);
        }
    };
    
    return (
        <OvernightDialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader closeLabel="Close" className="htl-u-flex-row htl-u-justify-content-between htl-u-align-items-center">
                    {formattedDate} 
                    <button className="htl-button htl-button--ghost htl-u-margin-inline-start-12" onClick={handlePrint}>
                        <FontAwesomeIcon icon={faPrint} size="xl" />
                    </button>
                </DialogHeader>
                <DialogBody ref={dialogBodyRef}>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!isLoading && !error && data && (
                        <>
                            <div className='htl-u-flex-row htl-u-gap-48 htl-u-margin-block-start-24  htl-u-margin-inline-48'>
                                <CountCard title="Check-In" modificator={'success'} >
                                    <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} size="lg" />
                                    <span className='htl-u-margin-inline-start-16 htl-u-typography-highlight-1-default'>{data.CheckIn}</span>
                                </CountCard>
                                <CountCard title="Check-Out" modificator={'blue'} >
                                    <FontAwesomeIcon icon={faPersonWalkingLuggage} size="lg" />
                                    <span className='htl-u-margin-inline-start-16 htl-u-typography-highlight-1-default'>{data.CheckOut}</span>
                                </CountCard>
                            </div>
                            <div className='htl-u-flex-row htl-u-gap-48 htl-u-margin-block-24 htl-u-margin-inline-48'>
                                <Card style={{flex: 1}}>
                                    <h2 className="htl-u-margin-block-end-16">Details</h2>
                                    <div>
                                        {data.Summary.map((item, index) => {
                                            const [name, details] = item.split(': ');
                                            const detailsList = details.split(',').map(detail => detail.trim());
                                            return (
                                            <div key={index} className="htl-u-margin-block-end-16">
                                                <h3 className="htl-u-margin-block-end-8 htl-u-typography-body-1-strong">{name}</h3> 
                                                <ul className="htl-u-margin-0 htl-u-padding-inline-start-16">
                                                    {detailsList.map((detail, detailIndex) => (
                                                        <li key={detailIndex} className="htl-u-typography-body-default">{detail}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )})}
                                        {/* {data.Summary && (
                                            <>
                                                {data.Summary['Additional Notes']?.Promotions && (
                                                    <div className="htl-u-margin-block-end-24">
                                                        <h3 className="htl-u-margin-block-end-8">Promotions</h3>
                                                        <div className="htl-u-flex-row htl-u-gap-16">
                                                            {data.Summary['Additional Notes'].Promotions.map((promo, index) => (
                                                                <div key={index} className="htl-u-flex-1 htl-u-padding-8 htl-u-background-color-neutral-subtle htl-u-border-radius-4">
                                                                    <p className="htl-u-margin-block-end-4 htl-u-typography-caption-default">{promo}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {data.Summary['Arrival Time Distribution'] && (
                                                    <div className="htl-u-margin-block-end-24">
                                                        <h3 className="htl-u-margin-block-end-8">Arrival Time Distribution</h3>
                                                        <div className="htl-u-flex-row htl-u-gap-16">
                                                            {Object.entries(data.Summary['Arrival Time Distribution']).map(([time, count]) => (
                                                                <div key={time} className="htl-u-flex-1 htl-u-padding-8 htl-u-background-color-neutral-subtle htl-u-border-radius-4">
                                                                    <p className="htl-u-margin-block-end-4 htl-u-typography-caption-default">{time}</p>
                                                                    <p className="htl-u-typography-highlight-1-strong">{count}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {data.Summary['Additional Notes']?.['Special Booking Details'] && (
                                                    <div className="htl-u-margin-block-end-24">
                                                        <h3 className="htl-u-margin-block-end-8">Special Booking Details</h3>
                                                        <div className="htl-u-padding-8 htl-u-background-color-neutral-subtle htl-u-border-radius-4">
                                                            {Object.entries(data.Summary['Additional Notes']['Special Booking Details']).map(([key, value]) => (
                                                                <div key={key} className="htl-u-margin-block-end-8">
                                                                    <p className="htl-u-typography-body-strong">{key}</p>
                                                                    <p>{Array.isArray(value) ? value.join(', ') : value}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )} */}
                                    </div>
                                </Card>
                            </div>
                        </>
                    )}
                </DialogBody>
            </DialogContent>
        </OvernightDialog>
    );
}