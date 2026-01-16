import Link from "next/link";
import { ReactNode } from "react";

const PracticeLayout = ({ children, marketingSlot, salesSlot }: { children: ReactNode, marketingSlot : ReactNode, salesSlot : ReactNode }) => {
    return <div>
        <div className="h-16 bg-green-900 flex items-center justify-center gap-10">
            <Link href="/development">Development</Link>
            <Link href="/marketing">Marketing</Link>
            <Link href="/marketing/settings">Settings</Link>
            <Link href="/sales">Sales</Link>
        </div>
        <div className="flex justify-center items-center gap-10 mt-20">
            {marketingSlot}
            {salesSlot}
        </div>
        <div className="mt-20 flex justify-center items-center border-2 border-green-600 h-40">
            {children}
        </div>
    </div>;
};

export default PracticeLayout;
