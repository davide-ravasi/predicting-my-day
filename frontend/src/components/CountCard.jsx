import { Card as OvernightCard } from '@d-edge/overnight-hotelier-react';

export default function CountCard({
    title,
    modificator,
    children,
}) {

const countClassName = `htl-u-typography-highlight-2-strong htl-u-text-align-center htl-u-color-text-${modificator}-strong`;    

return (
    <OvernightCard style={{flex: 1}}>
        <h2 className="htl-u-margin-block-end-16 htl-u-text-align-center">{title}</h2>
        <p className={countClassName}>
            {children}
        </p>
    </OvernightCard>
  )
}