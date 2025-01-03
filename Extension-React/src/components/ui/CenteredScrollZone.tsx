import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CenteredScrollZoneProps {
    children: React.ReactNode;
}

const CenteredScrollZone: React.FC<CenteredScrollZoneProps> = ({ children }) => {
    const ToggleDropdown = () => {
        return () => {
            const dropdown = document.querySelector('.drop') as HTMLDivElement;
            dropdown.classList.toggle('hidden');
        };
    }
    return (
        <div className='drop hidden w-screen h-screen fixed top-0 left-0 bg-background/80 z-100 flex flex-col justify-center items-center gap-1'>
            <Button variant='ghost' size='icon' onClick={ToggleDropdown()} className='rounded-full'><X></X></Button>
            <ScrollArea className='w-[100%] h-[70%]'>
                <div className='flex justify-center items-center p-4'>
                    {children}
                </div>
            </ScrollArea>
        </div>
    );
};

export default CenteredScrollZone;