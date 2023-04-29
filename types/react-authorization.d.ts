import * as React from "react";
import IfAllGrantedProps = ReactAuthorization.IfAllGrantedProps;
import IfAnyGrantedProps = ReactAuthorization.IfAnyGrantedProps;
import IfGrantedProps = ReactAuthorization.IfGrantedProps;
import IfNoneGrantedProps = ReactAuthorization.IfNoneGrantedProps;
import IfAuthorizedProps = ReactAuthorization.IfAuthorizedProps;

export namespace ReactAuthorization {
    interface CommonProps {
        actual?: string | string[];
        unauthorized?: React.ReactNode | null;
        children?: React.ReactNode | React.ReactNode[];
    }

    interface IfAllGrantedProps extends CommonProps {
        expected: string[];
    }

    interface IfAnyGrantedProps extends CommonProps {
        expected: string[];
    }

    interface IfGrantedProps extends CommonProps {
        expected: string;
    }

    interface IfNoneGrantedProps extends CommonProps {
        expected?: string | string[];
    }

    interface IfAuthorizedProps {
        isAuthorized?: boolean | (() => boolean);
        unauthorized?: React.ReactNode | null;
    }
}

declare const IfAllGranted: React.FC<IfAllGrantedProps>;

declare const IfAnyGranted: React.FC<IfAnyGrantedProps>;

declare const IfGranted: React.FC<IfGrantedProps>;

declare const IfNoneGranted: React.FC<IfNoneGrantedProps>;

declare const IfAuthorized: React.FC<IfAuthorizedProps>;

export {IfAllGranted, IfAnyGranted, IfGranted, IfNoneGranted, IfAuthorized};
