// AnimatedSection.jsx
import { motion } from 'framer-motion';

const AnimatedSection = ({ id, children }) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            {children}
        </motion.section>
    );
};

export default AnimatedSection;