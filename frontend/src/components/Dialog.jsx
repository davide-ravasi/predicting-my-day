import { Dialog as OvernightDialog, DialogContent, DialogHeader, DialogBody, Card } from '@d-edge/overnight-hotelier-react';
import { useState, useEffect } from 'react';

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
    
    return (
        <OvernightDialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader closeLabel="Close">My day: {formattedDate}</DialogHeader>
                <DialogBody>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!isLoading && !error && data && (
                        <>
                            <div>
                                <pre>{JSON.stringify(data, null, 2)}</pre>
                            </div>
                            <div className='htl-u-flex-row htl-u-gap-48 htl-u-margin-inline-48'>
                                <Card style={{flex: 1}}>
                                    <h2 className="htl-u-margin-block-end-16 htl-u-align-center">Check-In</h2>
                                    <p className="htl-u-background-color-success-default">10</p>
                                </Card>
                                <Card style={{flex: 1}}>
                                    <h2>Check-Out</h2>
                                    <p className="htl-u-text-color-critical-strong">15</p>
                                </Card>
                            </div>
                        </>
                    )}
                </DialogBody>
            </DialogContent>
        </OvernightDialog>
    );
}