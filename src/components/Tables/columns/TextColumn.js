export default ({ property, className = 'tiny centered' }) => {
    return {
        property,
        cell: {
            props: {
                className,
            },
        },
    };
};
