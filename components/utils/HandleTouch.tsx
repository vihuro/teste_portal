interface Props {
    touchTimeout: any,
    action?: Function
}

const handleTouchStart = ({ touchTimeout, action }: Props) => {
    touchTimeout.current = setTimeout(() => {
        if (action) {
            action()
        }
    }, 1000);
}
const handleTouchEnd = ({ touchTimeout }: Props) => {
    clearTimeout(touchTimeout.current);
    touchTimeout.current = null;
}

export { handleTouchStart, handleTouchEnd }