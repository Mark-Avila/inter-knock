import { motion, scale, AnimatePresence } from "motion/react";

function FairyNotification({ notifications }) {
    const textBoxVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
    };

    const imgVariants = {
        hidden: { opacity: 0, scale: 0.2 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.2, transition: { delay: 0.4 } },
    };

    return (
        <div className="fixed top-0 right-0 z-50 flex h-8 w-fit flex-col gap-4">
            <AnimatePresence>
                {notifications.map(({ id, message }) => (
                    <div
                        key={id}
                        className="relative flex items-center justify-end px-4 py-2"
                    >
                        <motion.div
                            variants={textBoxVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{
                                duration: 0.8,
                                type: "spring",
                                delay: 0.2,
                                exit: { delay: 0 },
                            }}
                            className="bg-stripes inner-border z-10 -mr-14 w-fit rounded-full border-2 border-zinc-800 py-2 pr-20 pl-4"
                        >
                            <p className="font-montserrat font-bold text-nowrap text-white">
                                {message}
                            </p>
                        </motion.div>

                        <motion.div
                            variants={imgVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{
                                type: "spring",
                                bounce: 0.5,
                                duration: 1,
                            }}
                            className="z-40 h-14 w-14 overflow-hidden rounded-full"
                        >
                            <img
                                src="src/assets/ik-fairy.png"
                                className="h-full w-full object-cover shadow-lg"
                                alt="fairy-zzz"
                            />
                        </motion.div>
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
}

export default FairyNotification;
