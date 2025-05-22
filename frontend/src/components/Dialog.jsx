import { Card, Dialog as OvernightDialog, DialogContent, DialogHeader, DialogBody, Icon } from '@d-edge/overnight-hotelier-react';
import { useState, useEffect } from 'react';
import CountCard from './CountCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react'; 

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

    const endpoint = 'https://jsonplaceholder.typicode.com/todos/1'; // Replace with your actual endpoint

    const dialogBodyRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!isOpen) return;
            
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isOpen]);

    const printDocument = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Document</title>
                        <style>
                            body { font-family: Arial, sans-serif; }
                            pre { white-space: pre-wrap; word-wrap: break-word; }
                        </style>
                    </head>
                    <body>
                        <h1>${formattedDate}</h1>
                        <div>${dialogBodyRef.current.innerHTML}</div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    }
    
    return (
        <OvernightDialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader closeLabel="Close">{formattedDate} 
                    <button  onClick={printDocument}><FontAwesomeIcon icon={faPrint} /></button>
                </DialogHeader>
                <DialogBody ref={dialogBodyRef}>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!isLoading && !error && data && (
                        <>
                            <div className='htl-u-flex-row htl-u-gap-48 htl-u-margin-block-start-24  htl-u-margin-inline-48'>
                                <CountCard title="Check-In" modificator={'success'} >
                                    <Icon
                                        name="plus"
                                        className="htl-u-margin-inline-end-8"
                                    /> 
                                    <span>15</span>
                                </CountCard>
                                <CountCard title="Check-Out" modificator={'critical'} >
                                    <Icon
                                        name="checkbox-indeterminate"
                                        className="htl-u-margin-inline-end-8"
                                    /> 
                                    <span>10</span>
                                </CountCard>
                            </div>
                            <div className='htl-u-flex-row htl-u-gap-48 htl-u-margin-block-24 htl-u-margin-inline-48'>
                                <Card style={{flex: 1}}>
                                    <h2 className="htl-u-margin-block-end-16 htl-u-text-align-center">Details</h2>
                                    <p>Segment, Loyalty member, Hotel Note,Special Request,
                                    business, leisure par client et avec la durée
                                    </p>
                                    <pre>{JSON.stringify(data, null, 2)}</pre>
                                </Card>
                            </div>
                        </>
                    )}
                </DialogBody>
            </DialogContent>
        </OvernightDialog>
    );
}