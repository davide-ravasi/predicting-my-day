import { Card, Dialog as OvernightDialog, DialogContent, DialogHeader, DialogBody, Icon } from '@d-edge/overnight-hotelier-react';
import { useState, useEffect } from 'react';
import CountCard from './CountCard'

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
                            <div className='htl-u-flex-row htl-u-gap-48 htl-u-margin-block-start-24 htl-u-margin-inline-48'>
                                <Card style={{flex: 1}}>
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