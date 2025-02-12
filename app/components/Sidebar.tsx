'use client'
import { sidebarLinks } from '@/constants';
import React from 'react';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Ensure cn is correctly imported

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <section className="sticky left-0 top-0 flex h-screen w-fit flex-col
                justify-between bg-dark-1 p-6 pt-28 text-white max-sm:lg:w-[264px]">
            <div className='flex flex-col gap-6'>

                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(link.route);

                    return (
                        <a
                            href={link.route}
                            key={link.label}
                            className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                                'bg-blue-1': isActive,
                            })}
                        >
                           
                        </a>
                    );
                })}

            </div>
        </section>
    );
};

export default Sidebar;
