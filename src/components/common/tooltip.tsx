import { MDBIcon, MDBTooltip, placement } from "mdb-react-ui-kit";
import React from "react";

interface TooltipProps {
    tip: string;
    placement?: placement;
    className?: string;
    key?: number;
    wrapperProps?: Record<string, unknown>;
    children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
    tip,
    placement = "right",
    className,
    key = 0,
    wrapperProps,
    children,
}) => {
    return (
        <MDBTooltip
            key={key}
            tag="div"
            placement={placement}
            wrapperProps={wrapperProps}
            title={tip}
            className={className}
        >
            <>
                {children && children}
                {!children && (
                    <MDBIcon
                        color="white"
                        fas
                        icon="info-circle"
                        className="m-0"
                    />
                )}
            </>
        </MDBTooltip>
    );
};

export default Tooltip;
