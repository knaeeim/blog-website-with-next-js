import { Navbar } from "@/components/layout/Navbar";

const Commonlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default Commonlayout;
