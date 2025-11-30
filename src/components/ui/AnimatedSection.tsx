'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
};

export const AnimatedSection = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Cambié once:true para mejor rendimiento
        >
            {children}
        </motion.div>
    );
};